<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentMethod extends Model
{
    protected $fillable = [
        'user_id',
        'cardholder_name',
        'card_number',
        'exp_month',
        'exp_year',
        'last_four',
        'is_default',
    ];

    protected function casts(): array
    {
        return [
            'cardholder_name' => 'encrypted',
            'card_number' => 'encrypted',
            'exp_month' => 'encrypted',
            'exp_year' => 'encrypted',
            'is_default' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
