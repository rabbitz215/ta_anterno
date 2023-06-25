<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    use HasFactory;

    protected $fillable = ['alamat', 'link_maps', 'customer_id', 'status_shipment', 'total_harga', 'tanggal_kiriman'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function destinations()
    {
        return $this->hasMany(Destination::class);
    }

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::updated(function ($shipment) {
            if ($shipment->status_shipment === "Completed") {
                $totalHarga = $shipment->total_harga;
                $customer_id = $shipment->customer_id;

                $customer = Customer::find($customer_id);
                $saldoCustomer = $customer->saldo;
                $customer->update([
                    'saldo' => $saldoCustomer - $totalHarga
                ]);

                SaldoHistory::create([
                    'customer_id' => $customer_id,
                    'history_type' => 'Pengiriman',
                    'total' => $totalHarga,
                ]);
            }
        });
    }
}
