<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SortController extends Controller
{
    public function urutan()
    {
        $date = Carbon::today();
        $formattedDate = Carbon::parse($date)->format('Y-m-d');
        $data = Destination::whereDate('tanggal_kiriman', '=', $formattedDate)->orderBy('urutan', 'asc')->get();

        return Inertia::render('UrutanPage', [
            'data' => $data->toArray()
        ]);
    }

    public function getUrutan(Request $request)
    {
        $date = $request->input('date');
        $formattedDate = Carbon::parse($date)->format('Y-m-d');
        $data = Destination::whereDate('tanggal_kiriman', '=', $formattedDate)->orderBy('urutan', 'asc')->get();

        return response()->json($data, 200);
    }

    public function updateUrutan(Request $request)
    {
        foreach ($request->all() as $id => $urutan) {
            Destination::where('id', $id)->update(['urutan' => $urutan]);
        }
        return response()->json(['success' => true]);
    }
}
