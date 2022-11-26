<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notes_tag', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("notes_id")->unsigned();
            $table->bigInteger("tag_id")->unsigned();
            $table->timestamps();
            $table->foreign("notes_id")
                ->references('id')
                ->on('notes')
                ->onDelete('cascade');
            $table->foreign("tag_id")
                ->references('id')
                ->on('tags')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('note_tag');
    }
};
