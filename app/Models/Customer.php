<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'no_telp', 'saldo'];

    public function shipments()
    {
        return $this->hasMany(Shipment::class);
    }

    public function saldoHistories()
    {
        return $this->hasMany(SaldoHistory::class);
    }
}
