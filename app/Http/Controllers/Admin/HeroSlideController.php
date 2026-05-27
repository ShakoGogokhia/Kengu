<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use App\Models\SiteSetting;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HeroSlideController extends Controller
{
    public function image(HeroSlide $heroSlide): Response|\Symfony\Component\HttpFoundation\BinaryFileResponse
    {
        if (! $heroSlide->image) {
            abort(404);
        }

        if (str_starts_with($heroSlide->image, '/uploads/')) {
            $publicPath = public_path(ltrim($heroSlide->image, '/'));

            if (! file_exists($publicPath)) {
                abort(404);
            }

            return response()->file($publicPath);
        }

        if (! Storage::disk('public')->exists($heroSlide->image)) {
            abort(404);
        }

        return response(Storage::disk('public')->get($heroSlide->image), 200, [
            'Content-Type' => Storage::disk('public')->mimeType($heroSlide->image) ?? 'application/octet-stream',
            'Cache-Control' => 'public, max-age=31536000',
        ]);
    }

    public function index()
    {
        return Inertia::render('Admin/HeroSlides', [
            'slides' => HeroSlide::orderBy('order')->get(),
            'siteSettings' => SiteSetting::all()->pluck('value', 'key'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string',
            'image' => 'required|image|max:2048',
            'color' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('hero-slides', 'public');
        }

        HeroSlide::create($validated);

        return redirect()->back();
    }

    public function updateSettings(Request $request)
    {
        $settings = $request->input('settings', []);

        foreach ($settings as $key => $value) {
            if ($request->hasFile("settings.$key")) {
                $setting = SiteSetting::where('key', $key)->first();
                if ($setting && $setting->value) {
                    Storage::disk('public')->delete($setting->value);
                }
                $value = $request->file("settings.$key")->store('settings', 'public');
            }
            
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return redirect()->back();
    }

    public function update(Request $request, HeroSlide $heroSlide)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'color' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($heroSlide->image);
            $validated['image'] = $request->file('image')->store('hero-slides', 'public');
        }

        $heroSlide->update($validated);

        return redirect()->back();
    }

    public function destroy(HeroSlide $heroSlide)
    {
        Storage::disk('public')->delete($heroSlide->image);
        $heroSlide->delete();
        return redirect()->back();
    }
}
