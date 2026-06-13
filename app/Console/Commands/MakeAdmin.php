<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class MakeAdmin extends Command
{
    protected $signature = 'admin:make {email : The email of the user to promote}';
    protected $description = 'Assign admin role to a user by email';

    public function handle(): int
    {
        $email = $this->argument('email');

        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error("No user found with email: {$email}");
            return self::FAILURE;
        }

        if ($user->role === 'admin') {
            $this->warn("User {$user->name} ({$email}) is already an admin.");
            return self::SUCCESS;
        }

        $user->update(['role' => 'admin']);
        $this->info("✓ User {$user->name} ({$email}) has been promoted to admin.");

        return self::SUCCESS;
    }
}
