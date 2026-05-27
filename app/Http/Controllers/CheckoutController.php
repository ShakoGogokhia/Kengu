<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\PaymentMethod;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $items = CartItem::query()
            ->with(['product.images'])
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        $paymentMethods = $user->paymentMethods()
            ->latest()
            ->get()
            ->map(fn (PaymentMethod $method) => [
                'id' => $method->id,
                'cardholder_name' => $method->cardholder_name,
                'last_four' => $method->last_four,
                'exp_month' => str_pad((string) $method->exp_month, 2, '0', STR_PAD_LEFT),
                'exp_year' => (string) $method->exp_year,
                'is_default' => $method->is_default,
            ])
            ->values();

        return Inertia::render('Checkout/Index', [
            'items' => $items,
            'paymentMethods' => $paymentMethods,
        ]);
    }

    public function savePaymentMethod(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'cardholder_name' => ['required', 'string', 'max:255'],
            'card_number' => ['required', 'string', 'min:12', 'max:23'],
            'exp_month' => ['required', 'integer', 'min:1', 'max:12'],
            'exp_year' => ['required', 'integer', 'min:'.date('Y'), 'max:'.(date('Y') + 20)],
            'is_default' => ['nullable', 'boolean'],
        ]);

        $normalizedCardNumber = preg_replace('/\D+/', '', $validated['card_number']);

        if (strlen($normalizedCardNumber) < 12 || strlen($normalizedCardNumber) > 19) {
            return back()->withErrors(['card_number' => 'Card number must be between 12 and 19 digits.']);
        }

        $user = $request->user();
        $makeDefault = (bool) ($validated['is_default'] ?? false) || $user->paymentMethods()->count() === 0;

        if ($makeDefault) {
            $user->paymentMethods()->update(['is_default' => false]);
        }

        $user->paymentMethods()->create([
            'cardholder_name' => $validated['cardholder_name'],
            'card_number' => $normalizedCardNumber,
            'exp_month' => (string) $validated['exp_month'],
            'exp_year' => (string) $validated['exp_year'],
            'last_four' => substr($normalizedCardNumber, -4),
            'is_default' => $makeDefault,
        ]);

        return redirect()
            ->route('checkout.index')
            ->with('success', 'Payment method saved.');
    }

    public function pay(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'payment_method_id' => ['required', 'integer'],
        ]);

        $user = $request->user();

        if (! $user->phone || ! $user->address) {
            return redirect()
                ->route('profile.edit')
                ->withErrors([
                    'profile' => 'Please add phone and address in your profile before payment.',
                ]);
        }

        $paymentMethod = $user->paymentMethods()
            ->where('id', $validated['payment_method_id'])
            ->first();

        if (! $paymentMethod) {
            return back()->withErrors(['payment_method_id' => 'Selected card is invalid.']);
        }

        $items = $user->cartItems()->with('product')->get();

        if ($items->isEmpty()) {
            return redirect()
                ->route('cart.index')
                ->with('success', 'Your cart is empty.');
        }

        DB::transaction(function () use ($user, $items, $paymentMethod): void {
            $total = $items->sum(fn ($item) => ((float) $item->product->price) * $item->quantity);

            $order = Order::create([
                'user_id' => $user->id,
                'payment_method_id' => $paymentMethod->id,
                'status' => 'pending',
                'total' => $total,
                'customer_name' => $user->name,
                'customer_email' => $user->email,
                'customer_phone' => $user->phone,
                'shipping_address' => $user->address,
                'payment_last_four' => $paymentMethod->last_four,
                'payment_cardholder_name' => $paymentMethod->cardholder_name,
            ]);

            foreach ($items as $item) {
                $unitPrice = (float) $item->product->price;
                $lineTotal = $unitPrice * $item->quantity;

                $order->items()->create([
                    'product_id' => $item->product_id,
                    'product_name' => $item->product->name,
                    'product_category' => $item->product->category,
                    'unit_price' => $unitPrice,
                    'quantity' => $item->quantity,
                    'line_total' => $lineTotal,
                ]);
            }

            $user->cartItems()->delete();
        });

        return redirect()
            ->route('profile.edit')
            ->with('success', 'Order submitted successfully. Awaiting admin review.');
    }
}
