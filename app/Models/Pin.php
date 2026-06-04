<?php

namespace App\Models;

use App\Models\Concerns\HasSnowflakeId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Pin extends Model
{
    use HasFactory, HasSnowflakeId;

    protected $casts = [
        'id' => 'string',
        'user_id' => 'string',
    ];

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'image_path',
    ];

    protected static function booted()
    {
        static::deleting(function ($pin) {
            if ($pin->image_path) {
                Storage::delete($pin->image_path);
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
