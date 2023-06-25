<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ShipmentController;
use App\Http\Controllers\SortController;
use App\Models\Destination;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [ShipmentController::class, 'landingPage'])->name('landingpage');

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/tujuan', [DestinationController::class, 'index']);
    Route::post('/tujuan', [DestinationController::class, 'store']);
    Route::put('/tujuan/{destination}', [DestinationController::class, 'update']);
    Route::delete('/tujuan/{destination}', [DestinationController::class, 'destroy']);

    Route::get('/load_customers', [CustomerController::class, 'index']);
    Route::get('/load_customers/{customer}', [CustomerController::class, 'show']);
    Route::post('/customer', [CustomerController::class, 'store']);
    Route::put('/customer/{customer}', [CustomerController::class, 'update']);
    Route::get('/customers_page', [CustomerController::class, 'customerIndex'])->name('customers_page.index');
    Route::put('/update_saldo/{customer}', [CustomerController::class, 'updateSaldo']);
    Route::get('/history/{customer}', [CustomerController::class, 'history'])->name('history');

    Route::get('/shipments', [ShipmentController::class, 'index']);
    Route::get('/shipments/{shipments}', [ShipmentController::class, 'show']);
    Route::post('/shipments', [ShipmentController::class, 'store']);
    Route::post('/shipments/{shipment}', [ShipmentController::class, 'update']);
    Route::delete('/shipments/{shipment}', [ShipmentController::class, 'destroy']);

    Route::get('/urutan', [SortController::class, 'urutan'])->name('urutan');
    Route::get('/get_urutan', [SortController::class, 'getUrutan']);
    Route::post('/urutan', [SortController::class, 'updateUrutan']);

    Route::get('/export_page', [ExportController::class, 'index'])->name('export.index');
    Route::get('/export', [ExportController::class, 'export']);

    Route::resource('/settings', SettingController::class);
    Route::get('/get_harga', [SettingController::class, 'getHarga']);
});

Route::middleware(['auth', 'role:driver'])->group(function () {
    Route::get('/driver', [DriverController::class, 'index'])->name('driver.index');

    Route::get('/get_kiriman', [DriverController::class, 'getKiriman']);

    Route::post('/upload_foto/{id}', [DriverController::class, 'uploadFoto']);
    Route::put('/update_status/{id}', [DriverController::class, 'updateStatus']);
});

Route::get('/cekpaket/{no_telp}', [ShipmentController::class, 'cekPaket'])->name('cekpaket');
Route::get('/cekpaket/riwayat/{no_telp}', [ShipmentController::class, 'cekPaketHistory'])->name('cekPaketHistory');

require __DIR__ . '/auth.php';
