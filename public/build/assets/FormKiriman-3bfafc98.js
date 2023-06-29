import{r as a,j as n,a as t,b as u}from"./app-9638a040.js";import{a as ae}from"./moment-405eca2e.js";import{Q as r}from"./react-toastify.esm-6cab29dd.js";import ne from"./Tujuan-cfda9e18.js";const oe=({shipments:B,selectedDate:k})=>{const I=/@(-?\d+\.?\d*),/,L=/,(-?\d+\.?\d*)/,[P,A]=a.useState(!0),[F,R]=a.useState(!1),[y,N]=a.useState(!1),[s,w]=a.useState(0),[Y,C]=a.useState([]),[K,E]=a.useState(""),[$,z]=a.useState(""),[l,S]=a.useState(""),[f,_]=a.useState(""),[d,D]=a.useState(""),[c,H]=a.useState(""),[m,x]=a.useState(1),[i,g]=a.useState(0),[p,Q]=a.useState(0),[v,U]=a.useState(0),W=()=>{u.get("/get_harga").then(function(e){e.data.map(o=>{Q(o.kiriman_single),U(o.kiriman_multiple)})})},M=()=>{g(s===0?p:i===p?v*2:i+v)},q=()=>{i==v*2?g(p):g(i-v)},G=()=>{w(s+1),x(m+1),M()},J=()=>{u.get("/tujuan").then(function(e){e.data?x(m+1+e.data):x(2)}).catch(function(e){console.log(e)})};a.useEffect(()=>{J(),W()},[]);const V=e=>{e.preventDefault();const o=ae(k).format("YYYY-MM-DD");l==""?r.warning("Silahkan isi No telp terlebih dahulu",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):f==""?r.warning("Silahkan isi Nama terlebih dahulu",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):d==""?r.warning("Silahkan isi Alamat shipment terlebih dahulu",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):u.post("/customer",{nama:f,no_telp:l,address:d,link_maps:c}).then(function(h){E(h.data.id),u.post("/shipments",{alamat:d,link_maps:c,customer_id:h.data.id,status_shipment:"Not Completed",total_harga:p,tanggal_kiriman:o}).then(function(b){z(b.data.id);const O=c,T=O.match(I),j=O.match(L),te=T&&j?parseFloat(T[1])+","+parseFloat(j[1]):null;A(!1),w(1),R(!0),u.post("/tujuan",{nama_penerima:f,no_telp_penerima:l,alamat_penerima:d,link_maps:c,type:"Pickup",status:"Belum Dikirim",urutan:B.length==0?1:m-1,shipment_id:b.data.id,newTotalHarga:p,latlng:te,tanggal_kiriman:o}),r.success("Shipment berhasil di buat",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}),M()}).catch(function(b){r.error("Sorry, Shipment gagal di buat!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"})})}).catch(function(h){r.error("Sorry, Shipment gagal di buat!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"})})},X=e=>{e.preventDefault(),N(!y),l==""?C([]):u.get("/load_customers").then(function(o){var h=o.data;C(h.filter(b=>b.no_telp.includes(l)))})},Z=()=>{s===1?r.warning("Minimal 1 tujuan",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):(w(s-1),x(m-1),q())},ee=e=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(e);return n("div",{className:"p-6 h-auto",children:[t("form",{children:n("div",{className:"grid md:grid-cols-5",children:[n("div",{className:"form-group mb-6 md:mx-3 relative",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"No Telp"}),n("div",{className:"flex",children:[t("input",{value:l,onChange:e=>S(e.currentTarget.value),type:"number",className:`form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded-l-lg
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"No Telp"}),t("button",{onClick:e=>{X(e)},className:"inline-block px-4 py-1 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",children:t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:t("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"})})})]}),t("div",{className:`left-0 w-full mt-2 ${y?"":"hidden"}`,children:t("ul",{className:"bg-white border border-gray-300 rounded-b max-h-32 overflow-auto",children:Y.map(e=>n("li",{onClick:()=>{_(e.nama),N(!1),S(e.no_telp),e.address!==null&&D(e.address),e.link_maps!==null&&H(e.link_maps)},className:"px-4 py-2 cursor-pointer hover:bg-gray-100",children:[e.no_telp,"-",e.nama]},e.id))})})]}),n("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Nama"}),t("input",{value:f,onChange:e=>{_(e.currentTarget.value)},type:"text",className:`form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Nama"})]}),n("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Alamat"}),t("input",{value:d,onChange:e=>D(e.currentTarget.value),type:"text",className:`form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Alamat"})]}),n("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Link Maps"}),t("input",{value:c,onChange:e=>H(e.currentTarget.value),type:"text",className:`form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Link Maps"})]}),n("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700 md:pb-4"}),n("div",{className:"flex flex-col md:flex-row",children:[F?"":t("button",{onClick:V,type:"button",className:"inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",children:"Simpan"}),P?"":t("button",{onClick:G,type:"button",className:"inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out md:ml-3",children:"+ Tujuan"})]})]})]})}),t("hr",{}),Array.from({length:s}).map((e,o)=>t(ne,{totalHarga:i,urutan:m,customerId:K,shipmentId:$,removeTujuan:Z,date:k},o)),s>0&&n("p",{className:"form-label text-gray p-4",children:["Total Harga : ",ee(i)]})]})},ue=oe;export{ue as default};
