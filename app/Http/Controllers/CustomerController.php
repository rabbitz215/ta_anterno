<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\SaldoHistory;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Customer::get();

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
        $customer = Customer::where('no_telp', $request->no_telp)->first();

        if (!$customer) {
            $customer = new Customer;
            $customer->fill([
                'nama' => $request->nama,
                'no_telp' => $request->no_telp,
                'saldo' => 0,
            ]);
        }


        $customer->save();

        return response()->json($customer, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer)
    {
        return response()->json($customer, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customer $customer)
    {
        $customer->update([
            'nama' => $request->nama,
            'no_telp' => $request->no_telp
        ]);

        return response()->json($customer, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        //
    }

    public function customerIndex()
    {
        return Inertia::render('CustomersPage');
    }

    public function updateSaldo(Request $request, Customer $customer)
    {
        $history = SaldoHistory::create([
            'customer_id' => $customer->id,
            'history_type' => 'Deposit Saldo',
            'total' => $request->saldo,
        ]);

        if ($history) {
            $customer->update([
                'saldo' => $request->saldo + $customer->saldo,
            ]);
        }
        return response()->json($customer, 200);
    }

    public function history(Customer $customer)
    {
        $data = Customer::with(['saldoHistories' => function ($query) {
            $query->orderByDesc('created_at');
        }])->find($customer->id);
        return Inertia::render('SaldoHistory', [
            'data' => $data,
        ]);
    }
}
