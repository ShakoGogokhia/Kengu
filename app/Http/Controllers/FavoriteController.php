<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FavoriteController extends Controller
{
    public function index(Request $request): Response
    {
        $favorites = Favorite::query()
            ->with(['product.images'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return Inertia::render('Favorites/Index', [
            'favorites' => $favorites,
        ]);
    }

    public function toggle(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
        ]);

        $favorite = Favorite::query()
            ->where('user_id', $request->user()->id)
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($favorite) {
            $favorite->delete();
        } else {
            Favorite::create([
                'user_id' => $request->user()->id,
                'product_id' => $validated['product_id'],
            ]);
        }

        return back();
    }
}
