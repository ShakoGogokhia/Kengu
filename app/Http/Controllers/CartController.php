<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(Request $request): Response
    {
        $items = CartItem::query()
            ->with(['product.images'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return Inertia::render('Cart/Index', [
            'items' => $items,
        ]);
    }

    public function add(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['nullable', 'integer', 'min:1', 'max:20'],
        ]);

        $quantity = $validated['quantity'] ?? 1;

        $cartItem = CartItem::query()->firstOrCreate(
            [
                'user_id' => $request->user()->id,
                'product_id' => $validated['product_id'],
            ],
            ['quantity' => 0]
        );

        $cartItem->quantity = min(99, $cartItem->quantity + $quantity);
        $cartItem->save();

        return back()->with('success', 'პროდუქტი კალათაში დაემატა.');
    }

    public function remove(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
        ]);

        CartItem::query()
            ->where('user_id', $request->user()->id)
            ->where('product_id', $validated['product_id'])
            ->delete();

        return back();
    }
}
