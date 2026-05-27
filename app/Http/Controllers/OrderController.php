<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Orders/Index', [
            'orders' => Order::query()
                ->with('items')
                ->where('user_id', $request->user()->id)
                ->latest()
                ->get(),
        ]);
    }
}
