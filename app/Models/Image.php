<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'notes_id',
        'path',
    ];

    public function note() {
        return $this->belongsTo(Notes::class);
    }
}
