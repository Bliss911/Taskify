<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('payments', function (Blueprint $table) {
			$table->id();
			$table->foreignId('sender')->constrained('wallets')->onUpdate('cascade')->onDelete('cascade')->nullable();
			$table->foreignId('reciever')->constrained('wallets')->onUpdate('cascade')->onDelete('cascade');
			$table->integer('amount');
			$table->enum('type', ['DEPOSIT', 'TRANSFER']);
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
		Schema::dropIfExists('payments');
	}
}
