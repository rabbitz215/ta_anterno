<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminDriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => "Galang Putra",
            'email' => "galangputra376@gmail.com",
            'password' => Hash::make("ljtjdhgb21"),
            'role' => "admin",
        ]);

        User::create([
            'name' => "Gallant",
            'email' => "gallant@gmail.com",
            'password' => Hash::make("ljtjdhgb21"),
            'role' => "driver",
        ]);
    }
}
