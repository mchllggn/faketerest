<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->warn('No auto-admin assigned. Run "php artisan admin:make <email>" to promote a user.');
    }
}
