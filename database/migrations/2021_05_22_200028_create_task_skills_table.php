<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskSkillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task')->constrained('tasks')->onUpdate('cascade')->onDelete('cascade');

            $table->foreignId('skill')->constrained('skills')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('task_skills');
    }
}
