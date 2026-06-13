<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePinRequest;
use App\Http\Requests\UpdatePinRequest;
use App\Models\Pin;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PinController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Pins/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePinRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $uploadedFile = cloudinary()->uploadApi()->upload($request->file('image')->getRealPath(), [
            'folder' => 'pins',
            'transformation' => [
                'quality' => 'auto:best',
                'fetch_format' => 'auto',
                'width' => 1920,
                'crop' => 'limit',
            ]
        ]);

        Pin::create([
            'user_id' => Auth::user()->id,
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'image_path' => $uploadedFile['secure_url'],
            'public_id' => $uploadedFile['public_id'],
        ]);

        return redirect()->route('profile.edit')->with('success', 'Pin created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pin $pin)
    {
        return inertia('Pins/Show', [
            'pin' => $pin->load('user'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePinRequest $request, Pin $pin): RedirectResponse
    {
        abort_unless((string) $pin->user_id === (string) Auth::id(), 403);

        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($pin->image_path) {
                Storage::disk('public')->delete($pin->image_path);
            }

            $pin->image_path = $request->file('image')->store('pins', 'public');
        }

        $pin->title = $data['title'];
        $pin->description = $data['description'] ?? null;
        $pin->save();

        return redirect()->route('pins.show', $pin)->with('success', 'Pin updated.');
    }

    /**
     * Delete the specified resource from storage.
     */
    public function destroy(Pin $pin): RedirectResponse
    {
        abort_unless((string) $pin->user_id === (string) Auth::id(), 403);

        if ($pin->public_id) {
            cloudinary()->uploadApi()->destroy($pin->public_id);
        } elseif ($pin->image_path) {
            Storage::disk('public')->delete($pin->image_path);
        }

        $pin->delete($pin);

        return redirect()->route('profile.edit')->with('success', 'Pin deleted.');
    }
}
