<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        DB::table('skills')->delete();

        $skills = [
            'name' => 'Plumbing',
            'name' => 'Help Moving',
            'name' => 'Delivery Services',
            'name' => 'Shopping and Delivery',
            'name' => 'Yard Work',
            'name' => 'Painting',
            'name' => 'Laundry',
        ];

        DB::table('skills')->insert($skills);
    }
}
