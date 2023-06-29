import{r as n,b as v,a as t,F as N,j as a}from"./app-e581fdab.js";import{Q as g}from"./react-toastify.esm-a5377c22.js";import z from"./EditTujuan-b27992ec.js";import"./moment-aa6c57e1.js";const G=({shipment:o,onDeleteDestination:h,selectedDate:w})=>{const T=/@(-?\d+\.?\d*),/,H=/,(-?\d+\.?\d*)/,[s,E]=n.useState(o.customer.no_telp),[p,M]=n.useState(o.customer.nama),[b,I]=n.useState(o.alamat),[i,j]=n.useState(o.link_maps),[y,J]=n.useState(o.status_shipment),[d,c]=n.useState(o.total_harga),[f,D]=n.useState(0),[x,F]=n.useState(0),[u,V]=n.useState(o.id);n.useState(o.customer.id);const[X,O]=n.useState(0),[$,Y]=n.useState(1),[r,k]=n.useState(!1),[m,S]=n.useState(o.destinations);n.useEffect(()=>{L()},[]);const L=()=>{v.get("/get_harga").then(function(e){e.data.map(l=>{D(l.kiriman_single),F(l.kiriman_multiple)})})},P=()=>{o.destinations.length===0?c(f):c(d===f?x*2:d+x)},A=e=>{e.preventDefault(),k(!0)},B=e=>{e.preventDefault(),h(),O(0),c(o.total_harga),k(!1)},R=()=>{S(e=>[...e,{destinationUniqueId:e.length+1,id:null,nama_penerima:"",no_telp_penerima:"",alamat:"",link_maps:"",type:"Kirim",latitude:null,longitude:null,sedang_dikirim_timestamps:null,sudah_dikirim_timestamps:null,tanggal_kiriman:w,urutan:null,status:"Belum Dikirim",photo:"",shipment_id:u}]),P()},U=e=>{e.preventDefault();const l=i,_=l?l.match(T):null,C=l?l.match(H):null,Q=_&&C?parseFloat(_[1])+","+parseFloat(C[1]):null;v.post(`/shipments/${u}`,{no_telp:s,nama:p,alamat:b,link_maps:i,total_harga:d,latlng:Q,updatedDestinations:m,tanggal_kiriman:w}).then(function(W){g.success("Shipment berhasil di update!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"})}).catch(function(W){g.error("Sorry, Shipment gagal di update!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"})})},q=e=>{e.preventDefault(),v.delete(`/shipments/${u}`).then(function(l){g.success("Shipment berhasil di hapus!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}),h()}).catch(function(l){g.error("Shipment gagal di hapus!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"})})},K=e=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(e);return t(N,{children:a("div",{className:"p-6 my-4 h-auto",children:[a("div",{className:"ml-0 md:ml-3 mb-4",children:[a("span",{className:"text-base font-bold",children:["Status Shipment :"," "]}),t("span",{className:`text-xs inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full ${y=="Not Completed"?"bg-red-600":"bg-green-600"}`,style:{width:"6rem"},children:y})]}),a("form",{children:[a("div",{className:"grid md:grid-cols-5",children:[a("div",{className:"form-group mb-6 md:mx-3 relative",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"No Telp"}),t("div",{className:"flex",children:r?t("input",{value:s,onChange:e=>E(e.currentTarget.value),type:"number",className:`form-control\r
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"No Telp Penerima"}):t("p",{children:t("a",{href:`https://wa.me/${s.startsWith("0")?"62"+s.substring(1):s}?text=Link check paket : https://anterno.id/cekpaket/${s}`,target:"_blank",children:s})})})]}),a("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Nama"}),r?t("input",{value:p,onChange:e=>M(e.currentTarget.value),type:"text",className:`form-control\r
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
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Nama"}):t("p",{children:p})]}),a("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Alamat"}),r?t("input",{value:b,onChange:e=>I(e.currentTarget.value),type:"text",className:`form-control\r
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
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Alamat"}):t("p",{children:b})]}),a("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Link Maps"}),r?t("input",{value:i,onChange:e=>j(e.currentTarget.value),type:"text",className:`form-control\r
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
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Link Maps"}):i?t("p",{children:t("a",{href:i,target:"_blank",children:"Klik Disini"})}):t(N,{children:t("p",{children:t("a",{href:i,target:"_blank",children:"Tidak ada link Maps"})})})]}),a("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700 md:pb-4"}),a("div",{className:"flex flex-col md:flex-col lg:flex-row",children:[r==!1?t("button",{onClick:e=>A(e),type:"button",className:"px-6 lg:mr-1 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",children:"Edit"}):"",r==!1?t("button",{onClick:e=>q(e),type:"button",className:"px-6 mt-3 lg:mt-0 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out",children:"Delete"}):"",r&&t("button",{onClick:e=>U(e),type:"button",className:"px-6 lg:mr-1 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",children:"Simpan"}),r&&t("button",{onClick:e=>B(e),type:"button",className:"px-6 py-2.5 mt-3 lg:mt-0 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out",children:"Close"})]})]})]}),t("div",{className:"form-group mb-6 md:mx-3",children:r&&a("button",{onClick:e=>R(),type:"button",className:"px-6 mt-3 md:mt-0 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",children:[t("i",{className:"fa-regular fa-plus"})," Add tujuan"]})})]}),!r&&a("div",{className:"px-3 mb-2 grid grid-cols-3 md:grid-cols-5",children:[t("div",{className:"font-bold",children:"No Telp"}),t("div",{className:"font-bold",children:"Nama Penerima"}),t("div",{className:"font-bold",children:"Alamat"}),t("div",{className:"font-bold",children:"Type"}),t("div",{className:"font-bold",children:"Status"})]}),!r&&m.map((e,l)=>a("div",{className:"p-3 grid grid-cols-3 md:grid-cols-5",children:[t("div",{className:"mb-2",children:e.no_telp_penerima}),t("div",{className:"mb-2",children:e.nama_penerima}),t("div",{className:"mb-2",children:e.alamat}),t("div",{className:"mb-2",children:t("span",{className:`text-xs inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full ${e.type=="Pickup"?"bg-orange-600":e.type=="Kirim"?"bg-purple-600":"bg-blue-600"}`,style:{width:"6rem"},children:e.type})}),t("div",{className:"mb-2",children:t("span",{className:`text-xs inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full ${e.status=="Belum Dikirim"?"bg-red-600":e.status=="Sedang Dikirim"?"bg-orange-500":"bg-green-600"}`,style:{width:"6rem"},children:e.status})})]},l)),r&&m.map((e,l)=>a(N,{children:[t("hr",{}),t(z,{index:l,destinations:m,setDestinations:S,destination:e,hargaSingle:f,hargaMultiple:x,totalHarga:d,onDeleteDestination:h,shipmentId:u,setTotalHarga:c,urutan:$,destinationUniqueId:e.destinationUniqueId})]})),r&&o.destinations.length&&a("p",{className:"form-label text-gray p-4",children:["Total Harga : ",K(d)]})]})})},ne=G;export{ne as default};
