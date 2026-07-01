<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PinController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\Auth\SocialiteController;
use Inertia\Inertia;

Route::get('/', [PinController::class, 'index'])->name('home');

Route::get('auth/{provider}/redirect', [SocialiteController::class, 'redirect'])->name('auth.redirect');
Route::get('auth/{provider}/callback', [SocialiteController::class, 'callback'])->name('auth.callback');

Route::get('/pins/{pin}', [PinController::class, 'show'])->name('pins.show');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/pins/create', [PinController::class, 'create'])->name('pins.create');
    Route::post('/pins', [PinController::class, 'store'])->name('pins.store');
    Route::match(['post', 'patch'], '/pins/{pin}', [PinController::class, 'update'])->name('pins.update');
    Route::delete('/pins/{pin}', [PinController::class, 'destroy'])->name('pins.delete');
});

Route::middleware('auth')->group(function () {
    Route::get('/settings', fn() => Inertia::render('Settings'))->name('settings.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/privacy-policy', [PageController::class, 'privacyPolicy'])->name('privacy.policy');

Route::middleware('auth')->group(function () {
    Route::get('/data-deletion', [PageController::class, 'dataDeletion'])->name('data.deletion');
    Route::delete('/data-deletion', [PageController::class, 'executeDataDeletion'])->name('data.deletion.execute');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';

// User profile by username (email prefix) — must be after all other routes
Route::get('/{username}', [\App\Http\Controllers\UserProfileController::class, 'show'])
    ->where('username', '[a-zA-Z0-9._-]+')
    ->name('user.profile');
