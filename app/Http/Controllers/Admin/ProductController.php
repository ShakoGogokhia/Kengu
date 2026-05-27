<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
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
        $validated = $this->validateProduct($request);

        $product = Product::create([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'is_active' => $validated['is_active'],
        ]);

        $this->syncProductImages($request, $product);

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'პროდუქტი წარმატებით დაემატა.');
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $this->validateProduct($request);

        $product->update([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'is_active' => $validated['is_active'],
        ]);

        $this->removeSelectedImages($product, $validated['remove_image_ids'] ?? []);
        $this->syncProductImages($request, $product);
        $this->refreshPrimaryImage($product);

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'პროდუქტი წარმატებით განახლდა.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->deleteProductImages($product);
        $product->delete();

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'პროდუქტი წარმატებით წაიშალა.');
    }

    protected function validateProduct(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:3000'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'images' => ['nullable', 'array', 'max:8'],
            'images.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'remove_image_ids' => ['nullable', 'array'],
            'remove_image_ids.*' => ['integer'],
            'is_active' => ['required', 'boolean'],
        ]);
    }

    protected function syncProductImages(Request $request, Product $product): void
    {
        if (! $request->hasFile('images')) {
            return;
        }

        $uploadDirectory = public_path('uploads/products');
        if (! is_dir($uploadDirectory)) {
            mkdir($uploadDirectory, 0755, true);
        }

        $nextSortOrder = (int) $product->images()->max('sort_order') + 1;

        foreach ($request->file('images') as $file) {
            $imageName = uniqid('product_', true).'.'.$file->getClientOriginalExtension();
            $file->move($uploadDirectory, $imageName);
            $path = '/uploads/products/'.$imageName;

            $product->images()->create([
                'path' => $path,
                'sort_order' => $nextSortOrder++,
            ]);
        }
    }

    protected function removeSelectedImages(Product $product, array $removeImageIds): void
    {
        if ($removeImageIds === []) {
            return;
        }

        $images = $product->images()->whereIn('id', $removeImageIds)->get();

        foreach ($images as $image) {
            $this->deleteImageFile($image);
            $image->delete();
        }
    }

    protected function deleteProductImages(Product $product): void
    {
        $product->loadMissing('images');

        foreach ($product->images as $image) {
            $this->deleteImageFile($image);
        }

        $product->images()->delete();
        $product->image_url = null;
        $product->save();
    }

    protected function refreshPrimaryImage(Product $product): void
    {
        $product->load('images');
        $product->image_url = $product->images->first()?->path;
        $product->save();
    }

    protected function deleteImageFile(ProductImage $image): void
    {
        $absolutePath = public_path(ltrim($image->path, '/'));

        if (File::exists($absolutePath)) {
            File::delete($absolutePath);
        }
    }
}
