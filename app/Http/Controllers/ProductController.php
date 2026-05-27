<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $filters = [
            'search' => (string) $request->string('search'),
            'category' => (string) $request->string('category'),
            'min_price' => $request->input('min_price'),
            'max_price' => $request->input('max_price'),
            'sort' => (string) $request->string('sort', 'newest'),
        ];

        $products = Product::query()
            ->with('images')
            ->active()
            ->when($filters['search'], fn ($query, $search) => $query->where(function ($inner) use ($search) {
                $inner->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            }))
            ->when($filters['category'], fn ($query, $category) => $query->where('category', $category))
            ->when(is_numeric($filters['min_price']), fn ($query) => $query->where('price', '>=', $filters['min_price']))
            ->when(is_numeric($filters['max_price']), fn ($query) => $query->where('price', '<=', $filters['max_price']))
            ->when(
                $filters['sort'] === 'price_asc',
                fn ($query) => $query->orderBy('price'),
                fn ($query) => $query->when(
                    $filters['sort'] === 'price_desc',
                    fn ($inner) => $inner->orderByDesc('price'),
                    fn ($inner) => $inner->when(
                        $filters['sort'] === 'name_asc',
                        fn ($nameQuery) => $nameQuery->orderBy('name'),
                        fn ($defaultQuery) => $defaultQuery->latest()
                    )
                )
            )
            ->paginate(12)
            ->withQueryString();

        $favoriteProductIds = $user
            ? $user->favorites()->pluck('product_id')->all()
            : [];

        $cartProductIds = $user
            ? $user->cartItems()->pluck('product_id')->all()
            : [];

        $categories = Product::query()
            ->active()
            ->select('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $filters,
            'favoriteProductIds' => $favoriteProductIds,
            'cartProductIds' => $cartProductIds,
        ]);
    }

    public function show(Request $request, Product $product): Response
    {
        $product->load('images');
        $user = $request->user();

        return Inertia::render('Products/Show', [
            'product' => $product,
            'isFavorite' => $user
                ? $user->favorites()->where('product_id', $product->id)->exists()
                : false,
            'isInCart' => $user
                ? $user->cartItems()->where('product_id', $product->id)->exists()
                : false,
        ]);
    }
}
