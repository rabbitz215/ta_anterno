import{r as n,j as o,a as e,b as j}from"./app-eae9fd7a.js";import{a as _}from"./moment-1c676225.js";import{Q as a}from"./react-toastify.esm-183d4a81.js";const D=({customerId:g,shipmentId:b,removeTujuan:p,urutan:h,totalHarga:f,date:x})=>{const[t,v]=n.useState(""),[i,y]=n.useState(""),[l,k]=n.useState(""),[s,N]=n.useState(""),[u,w]=n.useState("Kirim"),C=/@(-?\d+\.?\d*),/,P=/,(-?\d+\.?\d*)/,T=r=>{const O=_(x).format("YYYY-MM-DD");if(t=="")a.warning("Silahkan isi Nama Penerima !!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"});else if(i=="")a.warning("Silahkan isi No Telp Penerima !!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"});else if(l=="")a.warning("Silahkan isi Alamat Penerima !!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"});else if(u=="")a.warning("Silahkan pilih type pengiriman !!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"});else{r.preventDefault();const c=s,d=c.match(C),m=c.match(P),S=d&&m?parseFloat(d[1])+","+parseFloat(m[1]):null;j.post("/tujuan",{nama_penerima:t,no_telp_penerima:i,alamat_penerima:l,link_maps:s,customer_id:g,type:u,urutan:h,status:"Belum Dikirim",shipment_id:b,newTotalHarga:f,latlng:S,tanggal_kiriman:O}).then(function(M){a.success("Tujuan berhasil dibuat",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"})}).catch(function(M){a.error("Sorry, Tujuan gagal di buat!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"})})}};return o("div",{className:"grid md:grid-cols-6 mt-3",children:[o("div",{className:"form-group mb-6 md:mx-3",children:[e("label",{className:"form-label inline-block mb-2 text-gray-700",children:"No Telp Penerima"}),e("input",{value:i,onChange:r=>y(r.currentTarget.value),type:"number",className:`form-control\r
          block\r
          w-full\r
          px-3\r
          py-1.5\r
          text-base\r
          font-normal\r
          text-gray-700\r
          bg-white bg-clip-padding\r
          border border-solid border-gray-300\r
          rounded\r
          transition\r
          ease-in-out\r
          m-0\r
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"No Telp Penerima"})]}),o("div",{className:"form-group mb-6 md:mx-3",children:[e("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Nama Penerima"}),e("input",{value:t,onChange:r=>v(r.currentTarget.value),type:"text",className:`form-control\r
          block\r
          w-full\r
          px-3\r
          py-1.5\r
          text-base\r
          font-normal\r
          text-gray-700\r
          bg-white bg-clip-padding\r
          border border-solid border-gray-300\r
          rounded\r
          transition\r
          ease-in-out\r
          m-0\r
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Nama Penerima"})]}),o("div",{className:"form-group mb-6 md:mx-3",children:[e("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Alamat"}),e("input",{value:l,onChange:r=>k(r.currentTarget.value),type:"text",className:`form-control\r
          block\r
          w-full\r
          px-3\r
          py-1.5\r
          text-base\r
          font-normal\r
          text-gray-700\r
          bg-white bg-clip-padding\r
          border border-solid border-gray-300\r
          rounded\r
          transition\r
          ease-in-out\r
          m-0\r
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Alamat"})]}),o("div",{className:"form-group mb-6 md:mx-3",children:[e("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Link Maps"}),e("input",{value:s,onChange:r=>N(r.currentTarget.value),type:"text",className:`form-control\r
          block\r
          w-full\r
          px-3\r
          py-1.5\r
          text-base\r
          font-normal\r
          text-gray-700\r
          bg-white bg-clip-padding\r
          border border-solid border-gray-300\r
          rounded\r
          transition\r
          ease-in-out\r
          m-0\r
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Link Maps"})]}),o("div",{className:"form-group mb-6 md:mx-3",children:[e("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Type"}),o("select",{value:u,onChange:r=>w(r.currentTarget.value),className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full",children:[e("option",{value:"Kirim",children:"Kirim"}),e("option",{value:"Kirim & Pickup",children:"Kirim & Pickup"})]})]}),o("div",{className:"form-group mb-6 md:mx-3",children:[e("label",{className:"form-label inline-block mb-2 text-gray-700 md:pb-4"}),o("div",{className:"flex flex-col md:flex-row",children:[e("button",{onClick:r=>T(r),type:"button",className:"inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",children:"Simpan"}),e("button",{onClick:p,type:"button",className:"inline-block mt-3 md:mt-0 md:ml-3 px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out",children:"Delete"})]})]})]})};export{D as default};
