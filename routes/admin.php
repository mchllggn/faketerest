<?php

use App\Http\Controllers\Admin\ActivityLogController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PinController as AdminPinController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Users
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::patch('/users/{user}/role', [UserController::class, 'updateRole'])->name('users.role');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    // Pins
    Route::get('/pins', [AdminPinController::class, 'index'])->name('pins.index');
    Route::get('/pins/{pin}', [AdminPinController::class, 'show'])->name('pins.show');
    Route::delete('/pins/{pin}', [AdminPinController::class, 'destroy'])->name('pins.destroy');

    // Activity Logs
    Route::get('/activity', [ActivityLogController::class, 'index'])->name('activity.index');
});
