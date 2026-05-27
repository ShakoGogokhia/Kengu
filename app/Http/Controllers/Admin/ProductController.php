<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Products/Index', [
            'products' => Product::query()->with('images')->latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:3000'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'images' => ['nullable', 'array', 'max:8'],
            'images.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'is_active' => ['required', 'boolean'],
        ]);

        $product = Product::create([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'is_active' => $validated['is_active'],
        ]);

        if ($request->hasFile('images')) {
            $uploadDirectory = public_path('uploads/products');
            if (! is_dir($uploadDirectory)) {
                mkdir($uploadDirectory, 0755, true);
            }

            $primaryImagePath = null;
            foreach ($request->file('images') as $index => $file) {
                $imageName = uniqid('product_', true).'.'.$file->getClientOriginalExtension();
                $file->move($uploadDirectory, $imageName);
                $path = '/uploads/products/'.$imageName;

                $product->images()->create([
                    'path' => $path,
                    'sort_order' => $index,
                ]);

                if ($primaryImagePath === null) {
                    $primaryImagePath = $path;
                }
            }

            $product->image_url = $primaryImagePath;
            $product->save();
        }

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'პროდუქტი წარმატებით დაემატა.');
    }
}
