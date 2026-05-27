<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Orders/Index', [
            'orders' => Order::query()
                ->with(['items', 'user'])
                ->latest()
                ->get(),
        ]);
    }

    public function accept(Order $order): RedirectResponse
    {
        $order->update([
            'status' => 'accepted',
            'reviewed_at' => now(),
            'admin_note' => null,
        ]);

        return back()->with('success', 'Order accepted.');
    }

    public function decline(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'admin_note' => ['nullable', 'string', 'max:1000'],
        ]);

        $order->update([
            'status' => 'declined',
            'reviewed_at' => now(),
            'admin_note' => $validated['admin_note'] ?? null,
        ]);

        return back()->with('success', 'Order declined.');
    }
}
