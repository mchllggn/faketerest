<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    /**
     * Display the specified user's public profile.
     */
    public function show(string $username)
    {
        $user = User::where('email', 'like', "{$username}@%")->firstOrFail();

        $pins = $user->pins()->latest()->get();

        return Inertia::render('User/Show', [
            'profileUser' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'username' => explode('@', $user->email)[0],
            ],
            'pins' => $pins,
        ]);
    }
}
