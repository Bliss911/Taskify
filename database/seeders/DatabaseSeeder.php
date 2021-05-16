<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        DB::table('skills')->delete();

        $skills = [
            ['name' => 'Plumbing',],
            ['name' => 'Help Moving',],
            ['name' => 'Delivery Services',],
            ['name' => 'Shopping and Delivery',],
            ['name' => 'Yard Work',],
            ['name' => 'Painting',],
            ['name' => 'Laundry',]
        ];

        DB::table('skills')->insert($skills);
    }
}
