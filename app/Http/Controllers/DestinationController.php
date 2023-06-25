<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Shipment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use RealRashid\SweetAlert\Facades\Alert;

class DestinationController extends Controller
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
        $data = Destination::whereDate('tanggal_kiriman', '=', $formattedDate)->count();

        return response()->json($data, 200);
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
        $destination = Destination::create([
            'nama_penerima' => $request->nama_penerima,
            'no_telp_penerima' => $request->no_telp_penerima,
            'alamat' => $request->alamat_penerima,
            'link_maps' => $request->link_maps,
            'type' => $request->type,
            'status' => $request->status,
            'urutan' => $request->urutan,
            'shipment_id' => $request->shipment_id,
            'kelurahan' => $kelurahan,
            'kecamatan' => $kecamatan,
            'kode_pos' => $kode_pos,
            'tanggal_kiriman' => $request->tanggal_kiriman,
        ]);

        $shipment = Shipment::find($request->shipment_id);
        $shipment->update([
            'total_harga' => $request->newTotalHarga,
        ]);

        return response()->json($destination, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Destination  $destination
     * @return \Illuminate\Http\Response
     */
    public function show($shipmentid)
    {
        $data = Destination::where('shipment_id', $shipmentid);
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Destination  $destination
     * @return \Illuminate\Http\Response
     */
    public function edit(Destination $destination)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Destination  $destination
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Destination $destination)
    {
        DB::beginTransaction();
        try {
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
            $destination->update([
                'nama_penerima' => $request->nama_penerima,
                'no_telp_penerima' => $request->no_telp_penerima,
                'alamat' => $request->alamat,
                'link_maps' => $request->link_maps,
                'type' => $request->type,
                'kelurahan' => $kelurahan,
                'kecamatan' => $kecamatan,
                'kode_pos' => $kode_pos,
            ]);

            DB::commit();

            return response()->json($destination, 200);
        } catch (\Throwable $th) {
            DB::rollback();

            return response()->json($th, 409);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Destination  $destination
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Destination $destination)
    {
        $data = $request->all();
        $shipment = Shipment::find($destination->shipment_id);
        $destination_length = Destination::where('shipment_id', $destination->shipment_id)->count();
        if ($destination_length === 3) {
            $shipment->update([
                'total_harga' => $data['hargaSingle'],
            ]);
        } else {
            $shipment->update([
                'total_harga' => $data['newTotalHarga'] - $data['hargaMultiple'],
            ]);
        }
        $destination->delete();

        return response()->json($destination, 200);
    }
}
