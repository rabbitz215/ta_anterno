<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaldoHistory extends Model
{
    use HasFactory;

    protected $fillable = ['customer_id', 'history_type', 'total'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
