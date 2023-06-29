<?php

namespace App\Exports;

use App\Models\Destination;
use App\Models\Shipment;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class DestinationsExport implements FromView, ShouldAutoSize, WithStyles
{
    protected $startDate;
    protected $endDate;

    public function __construct($startDate, $endDate)
    {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    public function view(): View
    {
        $data = Destination::whereBetween(DB::raw('DATE(created_at)'), [$this->startDate, $this->endDate])
            ->whereHas('shipment', function ($query) {
                $query->has('destinations', '>', 1);
            })
            ->latest()
            ->get();
        $pendapatan = Shipment::whereBetween(DB::raw('DATE(created_at)'), [$this->startDate, $this->endDate])
            ->has('destinations', '>', 1)
            ->sum('total_harga');

        return view('export.anterno', [
            'destinations' => $data,
            'pendapatan' => $pendapatan,
            'startDate' => $this->startDate,
            'endDate' => $this->endDate,
        ]);
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1:' . $sheet->getHighestColumn() . '1')->applyFromArray([
            'font' => ['bold' => true],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => [
                    'rgb' => 'FF9900',
                ],
            ],
        ]);
    }
}
