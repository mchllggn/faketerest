<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class SocialiteController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('facebook')
            ->scopes(['email'])
            ->redirect();
    }

    public function callback()
    {
        try {
            $facebookUser = Socialite::driver('facebook')->stateless()->user();

            $email = $facebookUser->email ?? $facebookUser->id . '@Facebook-user.local';

            $user = User::where('provider_id', $facebookUser->id)->first();

            if (!$user) {
                $user = User::where('email', $email)->first();
            }

            if (!$user) {
                $user = User::create([
                    'name' => $facebookUser->name ?? 'Facebook user',
                    'email' => $email,
                    'provider_id' => $facebookUser->id,
                    'provider' => 'facebook',
                    'password' => bcrypt(Str::random(24)),
                    'email_verified_at' => now(),
                ]);
            } else {
                // Link Facebook provider to existing account if not already linked
                $updateData = [];
                if (!$user->provider_id) {
                    $updateData['provider_id'] = $facebookUser->id;
                    $updateData['provider'] = 'facebook';
                }
                // Auto-verify email since Facebook accounts always have a verified email
                if (!$user->email_verified_at) {
                    $updateData['email_verified_at'] = now();
                }
                if (!empty($updateData)) {
                    $user->update($updateData);
                }
            }

            Auth::login($user);
            return redirect()->route('home');
        } catch (\Exception $e) {
            Log::error('Facebook OAuth Error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->route('landing-page')->withErrors([
                'facebook' => 'Facebook authentication failed: ' . $e->getMessage(),
            ]);
        }
    }
}
