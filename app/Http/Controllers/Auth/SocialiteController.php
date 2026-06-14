<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class SocialiteController extends Controller
{
    protected array $supportedProviders = ['facebook', 'google'];

    protected function getScopes(string $provider): array
    {
        return match ($provider) {
            'google' => ['openid', 'email', 'profile'],
            'facebook' => ['email'],
            default => ['email'],
        };
    }

    protected function getErrorKey(string $provider): string
    {
        return $provider;
    }

    protected function getFallbackEmail(string $provider, $providerUser): string
    {
        return match ($provider) {
            'google' => $providerUser->email ?? $providerUser->id . '@google-user.local',
            'facebook' => $providerUser->email ?? $providerUser->id . '@facebook-user.local',
            default => $providerUser->id . '@' . $provider . '-user.local',
        };
    }

    protected function getDisplayName(string $provider, $providerUser): string
    {
        return match ($provider) {
            'google' => $providerUser->name ?? 'Google user',
            'facebook' => $providerUser->name ?? 'Facebook user',
            default => $providerUser->name ?? ucfirst($provider) . ' user',
        };
    }

    public function redirect(Request $request, string $provider)
    {
        if (!in_array($provider, $this->supportedProviders)) {
            abort(404);
        }

        return Socialite::driver($provider)
            ->scopes($this->getScopes($provider))
            ->redirect();
    }

    public function callback(Request $request, string $provider)
    {
        if (!in_array($provider, $this->supportedProviders)) {
            abort(404);
        }

        try {
            $providerUser = Socialite::driver($provider)->stateless()->user();

            $email = $this->getFallbackEmail($provider, $providerUser);

            $user = User::where('provider_id', $providerUser->id)
                ->where('provider', $provider)
                ->first();

            if (!$user) {
                $user = User::where('email', $email)->first();
            }

            if (!$user) {
                $user = User::create([
                    'name' => $this->getDisplayName($provider, $providerUser),
                    'email' => $email,
                    'provider_id' => $providerUser->id,
                    'provider' => $provider,
                    'password' => bcrypt(Str::random(24)),
                    'email_verified_at' => now(),
                ]);
            } else {
                $updateData = [];
                if (!$user->provider_id) {
                    $updateData['provider_id'] = $providerUser->id;
                    $updateData['provider'] = $provider;
                }
                if (!$user->email_verified_at) {
                    $updateData['email_verified_at'] = now();
                }
                if (!empty($updateData)) {
                    $user->update($updateData);
                }
            }

            Auth::login($user, true);
            session()->regenerate();

            return redirect()->intended(route('home'));
        } catch (\Exception $e) {
            Log::error(ucfirst($provider) . ' OAuth Error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->route('landing-page')->withErrors([
                $this->getErrorKey($provider) => ucfirst($provider) . ' authentication failed: ' . $e->getMessage(),
            ]);
        }
    }
}
