<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role') && $request->input('role') !== 'all') {
            $query->where('role', $request->input('role'));
        }

        $users = $query->withCount('pins')
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    public function show(User $user)
    {
        $user->load(['pins' => fn($q) => $q->latest()->limit(20)]);
        $user->loadCount('pins');

        $activity = ActivityLog::where('user_id', $user->id)
            ->latest()
            ->limit(50)
            ->get();

        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
            'activity' => $activity,
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        // Only admins can change roles
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Only admins can change user roles.');
        }

        $validated = $request->validate([
            'role' => ['required', 'in:admin,moderator,user'],
        ]);

        // Prevent demoting the last admin
        if ($user->role === 'admin' && $validated['role'] !== 'admin') {
            $adminCount = User::where('role', 'admin')->count();
            if ($adminCount <= 1) {
                return back()->with('error', 'Cannot demote the last admin. Promote another user first.');
            }
        }

        $oldRole = $user->role;
        $user->update(['role' => $validated['role']]);

        ActivityLog::log(
            'user.role_changed',
            User::class,
            $user->id,
            ['role' => $oldRole],
            ['role' => $validated['role']],
        );

        return back()->with('success', "User role updated to {$validated['role']}.");
    }

    public function destroy(User $user)
    {
        // Only admins can delete users, and can't delete themselves
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Only admins can delete users.');
        }

        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        // Prevent deleting the last admin
        if ($user->role === 'admin') {
            $adminCount = User::where('role', 'admin')->count();
            if ($adminCount <= 1) {
                return back()->with('error', 'Cannot delete the last admin. Promote another user first.');
            }
        }

        ActivityLog::log(
            'user.deleted',
            User::class,
            $user->id,
            $user->toArray(),
            null,
        );

        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }
}
