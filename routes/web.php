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
});

Route::get('/home', function () {
    $pins = Pin::all();
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

require __DIR__ . '/auth.php';
