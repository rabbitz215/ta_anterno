<table>
    <thead>
        <tr>
            <th>Nama Penerima</th>
            <th>No Telp Penerima</th>
            <th>Alamat</th>
            <th>Type</th>
            <th>Tanggal Pesanan</th>
            <th>Waktu Selesai</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($destinations as $dest)
            <tr>
                <td>{{ $dest->nama_penerima }}</td>
                <td>{{ $dest->no_telp_penerima }}</td>
                <td>{{ $dest->alamat }}</td>
                <td>{{ $dest->type }}</td>
                <td>{{ $dest->created_at }}</td>
                <td>{{ $dest->sudah_dikirim_timestamps }}</td>
            </tr>
        @endforeach
    </tbody>
    <tfoot>
        <tr>
            <td></td>
        </tr>
        <tr>
            <td><b>Pendapatan dari tanggal {{ $startDate }} sampai {{ $endDate }}</b></td>
        </tr>
        <tr>
            <td><b>@currency($pendapatan)</b></td>
        </tr>
    </tfoot>
</table>
