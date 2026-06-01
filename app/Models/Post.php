<?php

namespace App\Models;

use App\Models\Concerns\HasSnowflakeId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
