<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DriverController extends Controller
{
    public function index(Request $request)
    {
        $date = $request->input('date');
        $formattedDate = Carbon::parse($date)->format('Y-m-d');
        $data = Destination::whereDate('tanggal_kiriman', '=', $formattedDate)->orderBy('urutan', 'asc')->get();

        return Inertia::render('DriverPage', [
            'user' => Auth::user()->name,
            'kiriman' => $data,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $kiriman = Destination::find($id);

        $kiriman->status = $request->input('status');

        $newStatus = $request->input('status');

        if ($newStatus === 'Sedang Dikirim') {
            $kiriman->sedang_dikirim_timestamps = Carbon::now();
        } else {
            $kiriman->sudah_dikirim_timestamps = Carbon::now();
        }

        $kiriman->save();

        return response()->json($kiriman, 200);
    }

    public function getKiriman(Request $request)
    {
        $date = $request->input('date');
        $formattedDate = Carbon::parse($date)->format('Y-m-d');
        $data = Destination::whereDate('tanggal_kiriman', '=', $formattedDate)
            ->whereHas('shipment', function ($query) {
                $query->has('destinations', '>', 1);
            })->orderBy('urutan', 'asc')->get();

        return response()->json($data, 200);
    }

    public function uploadFoto(Request $request, $id)
    {
        $kiriman = Destination::find($id);

        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            $existingPhoto = $kiriman->photo;
            $fileName = time() . '.' . $request->file('file')->extension();
            $request->file('file')->move(public_path('uploads'), $fileName);
            $kiriman->update([
                'photo' => $fileName,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
            ]);

            if (!empty($existingPhoto)) {
                $existingPhotoPath = public_path('uploads/' . $existingPhoto);
                if (file_exists($existingPhotoPath)) {
                    unlink($existingPhotoPath);
                }
            }

            return response()->json($kiriman, 200);
        } else {
            return response()->json(['message' => 'No file uploaded'], 400);
        }

        return response()->json($kiriman, 200);
    }
}
