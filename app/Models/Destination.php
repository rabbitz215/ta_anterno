<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = ['nama_penerima', 'no_telp_penerima', 'alamat', 'link_maps', 'type', 'status', 'urutan', 'shipment_id', 'photo', 'latitude', 'longitude', 'kelurahan', 'kecamatan', 'kode_pos', 'tanggal_kiriman'];

    public function shipment()
    {
        return $this->belongsTo(Shipment::class);
    }

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::updated(function ($destination) {
            $shipment_id = $destination->shipment_id;

            $destinations = Destination::where('shipment_id', $shipment_id)->get();

            $all_destinations_sent = $destinations->every(function ($d) {
                return $d->status === 'Sudah Dikirim';
            });

            if ($all_destinations_sent) {
                $shipment = Shipment::find($shipment_id);

                $shipment->update([
                    'status_shipment' => "Completed"
                ]);
            }
        });

        static::created(function ($destination) {
            if ($destination->kecamatan != null || $destination->kecamatan != "") {
                $today = Carbon::today();

                // Get all the destinations created today
                $destinations = Destination::whereDate('created_at', $today)->get();

                // Group the destinations by kecamatan
                $destinationsByKecamatan = $destinations->groupBy('kecamatan');

                // Sort the kecamatans by the number of destinations in each kecamatan
                $kecamatans = $destinationsByKecamatan->keys()->sort(function ($a, $b) use ($destinationsByKecamatan) {
                    $countA = $destinationsByKecamatan[$a]->count();
                    $countB = $destinationsByKecamatan[$b]->count();
                    if ($countA === $countB) {
                        $minUrutanA = $destinationsByKecamatan[$a]->min('urutan');
                        $minUrutanB = $destinationsByKecamatan[$b]->min('urutan');
                        return $minUrutanA <=> $minUrutanB;
                    }
                    return $countB <=> $countA;
                })->values();

                // Iterate over the kecamatans and set the new urutan values based on the sorted destinations
                $newUrutan = 1;
                foreach ($kecamatans as $kecamatan) {
                    $destinations = $destinationsByKecamatan[$kecamatan];

                    // Handle the special case of the first destination in the group
                    $firstDest = $destinations->sortBy('urutan')->first();
                    if ($firstDest->urutan !== 1) {
                        $firstDest->urutan = 1;
                        $firstDest->save();
                    }

                    // Bubble sort algorithm for the rest of the destinations in the group
                    $len = count($destinations);
                    for ($i = 0; $i < $len - 1; $i++) {
                        for ($j = 0; $j < $len - $i - 1; $j++) {
                            if ($destinations[$j]->urutan > $destinations[$j + 1]->urutan) {
                                $temp = $destinations[$j];
                                $destinations[$j] = $destinations[$j + 1];
                                $destinations[$j + 1] = $temp;
                            }
                        }
                    }

                    // Set the new urutan values based on the sorted destinations
                    $prevUrutan = -1;
                    $lastUrutan = $destinations->last()->urutan;
                    foreach ($destinations as $dest) {
                        if ($dest->urutan > $prevUrutan) {
                            $dest->urutan = $newUrutan++;
                        } else {
                            $dest->urutan = $newUrutan - 1;
                        }
                        $prevUrutan = $dest->urutan;
                        $dest->save();

                        // If this is the last item in the kecamatan, set its urutan to be the same as the original last urutan
                        if ($dest->urutan === $lastUrutan) {
                            $dest->urutan = $lastUrutan;
                            $dest->save();
                        }
                    }
                }
            }
        });
    }
}
