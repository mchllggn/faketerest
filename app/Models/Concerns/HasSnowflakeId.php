<?php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Model;

trait HasSnowflakeId
{
    public function initializeHasSnowflakeId(): void
    {
        $this->incrementing = false;
        $this->keyType = 'string';
    }

    protected static function bootHasSnowflakeId(): void
    {
        static::creating(function (Model $model): void {
            if ($model->getKey()) {
                return;
            }

            $model->setAttribute($model->getKeyName(), app('snowflake')->id());
        });
    }
}
