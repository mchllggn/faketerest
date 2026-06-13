<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Pin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PinController extends Controller
{
    public function index(Request $request)
    {
        $query = Pin::with('user');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->input('user_id'));
        }

        $pins = $query->latest()
            ->paginate(24)
            ->withQueryString();

        return Inertia::render('Admin/Pins/Index', [
            'pins' => $pins,
            'filters' => $request->only(['search', 'user_id']),
        ]);
    }

    public function show(Pin $pin)
    {
        $pin->load('user');

        $activity = ActivityLog::where('model_type', Pin::class)
            ->where('model_id', $pin->id)
            ->with('user')
            ->latest()
            ->limit(50)
            ->get();

        return Inertia::render('Admin/Pins/Show', [
            'pin' => $pin,
            'activity' => $activity,
        ]);
    }

    public function destroy(Pin $pin)
    {
        ActivityLog::log(
            'pin.deleted',
            Pin::class,
            $pin->id,
            $pin->toArray(),
            null,
        );

        $pin->delete();

        return redirect()->route('admin.pins.index')->with('success', 'Pin deleted successfully.');
    }
}
