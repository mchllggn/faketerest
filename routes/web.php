<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PinController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Models\Pin;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('landing-page');

Route::get('/home', function () {
    $pins = Pin::with('user')->get();
    return Inertia::render('Home', [
        'pins' => $pins,
    ]);
})->middleware(['auth', 'verified'])->name('home');

Route::get('auth/redirect', [SocialiteController::class, 'redirect'])->name('auth.redirect');
Route::get('auth/callback', [SocialiteController::class, 'callback'])->name('auth.callback');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/pins/create', [PinController::class, 'create'])->name('pins.create');
    Route::post('/pins', [PinController::class, 'store'])->name('pins.store');
    Route::get('/pins/{pin}', [PinController::class, 'show'])->name('pins.show');
    Route::match(['post', 'patch'], '/pins/{pin}', [PinController::class, 'update'])->name('pins.update');
    Route::delete('/pins/{pin}', [PinController::class, 'destroy'])->name('pins.delete');
});

Route::middleware('auth')->group(function () {
    Route::get('/settings', fn() => Inertia::render('Settings'))->name('settings.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/debug/session', function () {
    return response()->json([
        'session_id' => session()->getId(),
        'session_driver' => config('session.driver'),
        'session_domain' => config('session.domain'),
        'secure_cookie' => config('session.secure_cookie'),
        'cookie_name' => config('session.cookie'),
        'csrf_token' => csrf_token(),
        'cookies_received' => request()->cookies->keys(),
        'headers_x_forwarded' => [
            'for' => request()->header('X-Forwarded-For'),
            'host' => request()->header('X-Forwarded-Host'),
            'proto' => request()->header('X-Forwarded-Proto'),
            'port' => request()->header('X-Forwarded-Port'),
        ],
        'is_secure' => request()->secure(),
        'url' => request()->url(),
        'user' => auth()->check() ? auth()->user()->only(['id', 'name', 'email']) : null,
    ]);
});

Route::get('/debug/login-check', function () {
    return response()->json([
        'authenticated' => auth()->check(),
        'user' => auth()->check() ? auth()->user()->only(['id', 'name', 'email', 'provider']) : null,
        'session_id' => session()->getId(),
    ]);
})->middleware('auth');

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
