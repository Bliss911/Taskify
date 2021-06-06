<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('messages', function (Blueprint $table) {
			$table->id();
			$table->foreignId('chat')->constrained('chats')->onUpdate('cascade')->onDelete('cascade');
			$table->foreignId('sender')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
			$table->foreignId('recipient')->constrained('users')->onUpdate('cascade')->onDelete('cascade');

			$table->text('message');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('messages');
	}
}
