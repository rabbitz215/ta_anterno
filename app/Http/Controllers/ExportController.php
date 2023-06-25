<?php

namespace App\Http\Controllers;

use App\Exports\DestinationsExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    public function index()
    {
        return Inertia::render('ExportPage');
    }

    public function export(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $destinationExport = new DestinationsExport($startDate, $endDate);
        return Excel::download($destinationExport, 'lead_export.xlsx');
    }
}
