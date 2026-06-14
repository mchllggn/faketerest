<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{
    public function privacyPolicy()
    {
        return inertia('PrivacyPolicy');
    }

    public function dataDeletion()
    {
        return inertia('DataDeletion');
    }

    public function executeDataDeletion(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        // Delete user's pins
        $user->pins()->delete();

        // Delete the user account
        $user->delete();

        // Log the user out
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('data.deletion');
    }
}
