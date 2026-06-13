<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    public function index(Request $request)
    {
        $query = ActivityLog::with('user');

        if ($request->filled('action')) {
            $query->where('action', 'like', "%{$request->input('action')}%");
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->input('user_id'));
        }

        if ($request->filled('model_type')) {
            $query->where('model_type', $request->input('model_type'));
        }

        $logs = $query->latest()
            ->paginate(50)
            ->withQueryString();

        // Get distinct action types for filter
        $actions = ActivityLog::select('action')->distinct()->pluck('action');

        return Inertia::render('Admin/ActivityLogs/Index', [
            'logs' => $logs,
            'actions' => $actions,
            'filters' => $request->only(['action', 'user_id', 'model_type']),
        ]);
    }
}
