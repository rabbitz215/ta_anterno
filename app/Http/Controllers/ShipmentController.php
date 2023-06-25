<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Destination;
use App\Models\Shipment;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use function PHPUnit\Framework\isEmpty;

class ShipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $date = $request->input('date');
        $formattedDate = Carbon::parse($date)->format('Y-m-d');
        $data = Shipment::with(['customer', 'destinations' => function ($query) {
            $query->where('type', '<>', 'Pickup');
        }])
            ->whereDate('tanggal_kiriman', '=', $formattedDate)
            ->latest()
            ->get();

        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $shipment = Shipment::create([
            'alamat' => $request->alamat,
            'link_maps' => $request->link_maps,
            'customer_id' => $request->customer_id,
            'status_shipment' => $request->status_shipment,
            'total_harga' => $request->total_harga,
            'tanggal_kiriman' => $request->tanggal_kiriman,
        ]);

        return response()->json($shipment);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Shipment  $shipment
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Shipment $shipment)
    {
        $date = $request->input('date');
        $formattedDate = Carbon::parse($date)->format('Y-m-d');
        $destinations = Destination::where('shipment_id', $shipment->id)->whereDate('tanggal_kiriman', '=', $formattedDate)->count();

        return response()->json($destinations, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Shipment  $shipment
     * @return \Illuminate\Http\Response
     */
    public function edit(Shipment $shipment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Shipment  $shipment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Shipment $shipment)
    {
        DB::beginTransaction();
        try {
            $formattedDate = Carbon::parse($request->tanggal_kiriman)->format('Y-m-d');

            if ($request->latlng !== "") {
                $url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=$request->latlng&key=" . env('GOOGLE_MAPS_API_KEY');
                $getAddressDetails = Http::get($url);

                $kelurahan = "";
                $kecamatan = "";
                $kode_pos = "";

                if ($getAddressDetails->ok()) {
                    $data = $getAddressDetails->json();
                    $components = $data['results'][0]['address_components'];

                    foreach ($components as $component) {
                        $types = $component['types'];

                        if (in_array('postal_code', $types)) {
                            $kode_pos = $component['long_name'];
                        } else if (in_array('administrative_area_level_4', $types)) {
                            $kelurahan = $component['long_name'];
                        } else if (in_array('administrative_area_level_3', $types)) {
                            $kecamatan = $component['short_name'];
                        }
                    }
                }
            }

            $shipment->update([
                'alamat' => $request->alamat,
                'link_maps' => $request->link_maps,
                'total_harga' => $request->total_harga,
            ]);


            $destination = Destination::where('shipment_id', $shipment->id)->where('type', '=', 'Pickup')->first();

            $destination->update([
                'nama_penerima' => $request->nama,
                'no_telp_penerima' => $request->no_telp,
                'alamat' => $request->alamat,
                'link_maps' => $request->link_maps,
                'kelurahan' => $kelurahan,
                'kecamatan' => $kecamatan,
                'kode_pos' => $kode_pos,
            ]);

            $customer = Customer::where('id', $shipment->customer_id)->first();

            $customer->update([
                'nama' => $request->nama,
                'no_telp' => $request->no_telp,
                'tanggal_kiriman' => $formattedDate,
            ]);

            $destinations = Destination::where('shipment_id', $shipment->id)
                ->whereIn('type', ['Kirim', 'Kirim & Pickup'])
                ->get();

            $destinationIds = collect($request->updatedDestinations)->pluck('id')->toArray();

            foreach ($request->updatedDestinations as $destinationData) {
                $destination = Destination::find($destinationData['id']);

                $latlng = "";

                if ($destinationData['latitude'] !== null && $destinationData['longitude'] !== null) {
                    $latlng = $destinationData['latitude'] . "," . $destinationData['longitude'];
                }

                $kelurahanUpdate = "";
                $kecamatanUpdate = "";
                $kode_posUpdate = "";

                if ($latlng !== "") {
                    $url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=$latlng&key=" . env('GOOGLE_MAPS_API_KEY');
                    $getAddressDetails = Http::get($url);

                    if ($getAddressDetails->ok()) {
                        $data = $getAddressDetails->json();
                        $components = $data['results'][0]['address_components'];

                        foreach ($components as $component) {
                            $types = $component['types'];

                            if (in_array('postal_code', $types)) {
                                $kode_posUpdate = $component['long_name'];
                            } else if (in_array('administrative_area_level_4', $types)) {
                                $kelurahanUpdate = $component['long_name'];
                            } else if (in_array('administrative_area_level_3', $types)) {
                                $kecamatanUpdate = $component['short_name'];
                            }
                        }
                    }
                }

                if ($destination) {
                    $destination->update([
                        'nama_penerima' => $destinationData['nama_penerima'],
                        'no_telp_penerima' => $destinationData['no_telp_penerima'],
                        'alamat' => $destinationData['alamat'],
                        'link_maps' => $destinationData['link_maps'],
                        'type' => $destinationData['type'],
                        'status' => $destinationData['status'],
                        'latitude' => $destinationData['latitude'],
                        'longitude' => $destinationData['longitude'],
                        'kelurahan' => $kelurahanUpdate,
                        'kecamatan' => $kecamatanUpdate,
                        'kode_pos' => $kode_posUpdate,
                        'tanggal_kiriman' => $formattedDate,
                    ]);
                } else {
                    $destination = new Destination([
                        'shipment_id' => $shipment->id,
                        'nama_penerima' => $destinationData['nama_penerima'],
                        'no_telp_penerima' => $destinationData['no_telp_penerima'],
                        'alamat' => $destinationData['alamat'],
                        'link_maps' => $destinationData['link_maps'],
                        'type' => $destinationData['type'],
                        'status' => $destinationData['status'],
                        'latitude' => $destinationData['latitude'],
                        'longitude' => $destinationData['longitude'],
                        'urutan' => $destinationData['urutan'],
                        'kelurahan' => $kelurahanUpdate,
                        'kecamatan' => $kecamatanUpdate,
                        'kode_pos' => $kode_posUpdate,
                        'tanggal_kiriman' => $formattedDate,
                    ]);
                    $destination->save();
                }
            }

            foreach ($destinations as $destination) {
                if (!in_array($destination->id, $destinationIds)) {
                    $destination->delete();
                }
            }

            DB::commit();

            return response()->json($shipment, 200);
        } catch (\Throwable $th) {
            DB::rollBack();

            return response()->json($th, 409);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Shipment  $shipment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Shipment $shipment)
    {
        $shipment->delete();

        return response()->json(null, 200);
    }

    public function landingPage()
    {
        return Inertia::render('LandingPage');
    }

    public function cekPaket($no_telp)
    {
        try {
            $customer = Customer::where('no_telp', $no_telp)->firstOrFail();
            $shipments = $customer->shipments()->with(['destinations' => function ($query) {
                $query->where('type', '<>', 'Pickup');
            }])->whereDate('tanggal_kiriman', '=', Carbon::today())->get();
            return Inertia::render('CekPaket', [
                'customer' => $customer,
                'shipments' => $shipments
            ]);
        } catch (ModelNotFoundException $e) {
            return Inertia::render('PaketNotFound', [
                'notFound' => true,
            ]);
        }
    }

    public function cekPaketHistory($no_telp)
    {
        try {
            $customer = Customer::where('no_telp', $no_telp)->firstOrFail();
            $shipments = $customer->shipments()->with(['destinations' => function ($query) {
                $query->where('type', '<>', 'Pickup');
            }])->orderBy('tanggal_kiriman', 'desc')->get()->groupBy('tanggal_kiriman');

            return Inertia::render('CekPaketHistory', [
                'customer' => $customer,
                'shipments' => $shipments,
            ]);
        } catch (ModelNotFoundException $e) {
            return Inertia::render('PaketNotFound', [
                'notFound' => true,
            ]);
        }
    }
}
