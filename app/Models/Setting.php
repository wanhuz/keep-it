<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Services\SettingService;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'user_id'
    ];

    public $timestamps = false;

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
