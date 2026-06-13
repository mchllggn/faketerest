<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Pin;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $totalUsers = User::count();
        $totalPins = Pin::count();
        $usersToday = User::whereDate('created_at', today())->count();
        $pinsToday = Pin::whereDate('created_at', today())->count();
        $usersThisWeek = User::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count();
        $pinsThisWeek = Pin::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count();

        // Recent activity
        $recentActivity = ActivityLog::with('user')
            ->latest()
            ->limit(20)
            ->get();

        // Recent users
        $recentUsers = User::latest()->limit(10)->get(['id', 'name', 'email', 'role', 'created_at']);

        // Recent pins
        $recentPins = Pin::with('user')->latest()->limit(10)->get();

        // Pins per day for the last 7 days
        $pinsPerDay = Pin::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->whereBetween('created_at', [now()->subDays(6)->startOfDay(), now()->endOfDay()])
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Users per day for the last 7 days
        $usersPerDay = User::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->whereBetween('created_at', [now()->subDays(6)->startOfDay(), now()->endOfDay()])
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalPins' => $totalPins,
                'usersToday' => $usersToday,
                'pinsToday' => $pinsToday,
                'usersThisWeek' => $usersThisWeek,
                'pinsThisWeek' => $pinsThisWeek,
            ],
            'recentActivity' => $recentActivity,
            'recentUsers' => $recentUsers,
            'recentPins' => $recentPins,
            'pinsPerDay' => $pinsPerDay,
            'usersPerDay' => $usersPerDay,
        ]);
    }
}
