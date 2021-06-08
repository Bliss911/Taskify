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
		DB::table('users')->delete();

		$skills = [
			['name' => 'Plumbing',],
			['name' => 'Help Moving',],
			['name' => 'Delivery Services',],
			['name' => 'Shopping and Delivery',],
			['name' => 'Yard Work',],
			['name' => 'Painting',],
			['name' => 'Laundry',]
		];


		$admin = [
			[
				'firstname' => 'Admin',
				'lastname' => 'User',
				'email' => 'admin@admin.com',
				'role' => 'ADMIN',
				'password' => '$2y$10$txygzggJbP8fY3aH7xDsSOOSx9qdE63xldttcKkqamzOfgM1Ud3lq'
			]
		];

		DB::table('skills')->insert($skills);
		DB::table('users')->insert($admin);
	}
}
