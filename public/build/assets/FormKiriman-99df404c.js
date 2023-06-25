import{r as a,j as o,a as t,b as u}from"./app-8ff3f97c.js";import{a as ae}from"./moment-be38b456.js";import{Q as r}from"./react-toastify.esm-6beadcfa.js";import oe from"./Tujuan-0c5ad31a.js";const ne=({shipments:T,selectedDate:k})=>{const j=/@(-?\d+\.?\d*),/,B=/,(-?\d+\.?\d*)/,[I,L]=a.useState(!0),[P,A]=a.useState(!1),[y,N]=a.useState(!1),[s,w]=a.useState(0),[F,C]=a.useState([]),[R,Y]=a.useState(""),[K,E]=a.useState(""),[l,S]=a.useState(""),[h,_]=a.useState(""),[b,$]=a.useState(""),[f,z]=a.useState(""),[d,x]=a.useState(1),[i,c]=a.useState(0),[m,Q]=a.useState(0),[v,U]=a.useState(0),W=()=>{u.get("/get_harga").then(function(e){e.data.map(n=>{Q(n.kiriman_single),U(n.kiriman_multiple)})})},D=()=>{c(s===0?m:i===m?v*2:i+v)},q=()=>{i==v*2?c(m):c(i-v)},G=()=>{w(s+1),x(d+1),D()},J=()=>{u.get("/tujuan").then(function(e){e.data?x(d+1+e.data):x(2)}).catch(function(e){console.log(e)})};a.useEffect(()=>{J(),W()},[]);const V=e=>{e.preventDefault();const n=ae(k).format("YYYY-MM-DD");l==""?r.warning("Silahkan isi No telp terlebih dahulu",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):h==""?r.warning("Silahkan isi Nama terlebih dahulu",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):b==""?r.warning("Silahkan isi Alamat shipment terlebih dahulu",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):u.post("/customer",{nama:h,no_telp:l}).then(function(g){Y(g.data.id),u.post("/shipments",{alamat:b,link_maps:f,customer_id:g.data.id,status_shipment:"Not Completed",total_harga:m,tanggal_kiriman:n}).then(function(p){E(p.data.id);const H=f,M=H.match(j),O=H.match(B),te=M&&O?parseFloat(M[1])+","+parseFloat(O[1]):null;L(!1),w(1),A(!0),u.post("/tujuan",{nama_penerima:h,no_telp_penerima:l,alamat_penerima:b,link_maps:f,type:"Pickup",status:"Belum Dikirim",urutan:T.length==0?1:d-1,shipment_id:p.data.id,newTotalHarga:m,latlng:te,tanggal_kiriman:n}),r.success("Shipment berhasil di buat",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}),D()}).catch(function(p){r.error("Sorry, Shipment gagal di buat!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"})})}).catch(function(g){r.error("Sorry, Shipment gagal di buat!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"})})},X=e=>{e.preventDefault(),N(!y),l==""?C([]):u.get("/load_customers").then(function(n){var g=n.data;C(g.filter(p=>p.no_telp.includes(l)))})},Z=()=>{s===1?r.warning("Minimal 1 tujuan",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):(w(s-1),x(d-1),q())},ee=e=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(e);return o("div",{className:"p-6 h-auto",children:[t("form",{children:o("div",{className:"grid md:grid-cols-5",children:[o("div",{className:"form-group mb-6 md:mx-3 relative",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"No Telp"}),o("div",{className:"flex",children:[t("input",{value:l,onChange:e=>S(e.currentTarget.value),type:"number",className:`form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"No Telp"}),t("button",{onClick:e=>{X(e)},className:"inline-block px-4 py-1 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",children:t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:t("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"})})})]}),t("div",{className:`left-0 w-full mt-2 ${y?"":"hidden"}`,children:t("ul",{className:"bg-white border border-gray-300 rounded-b max-h-32 overflow-auto",children:F.map(e=>o("li",{onClick:()=>{_(e.nama),N(!1),S(e.no_telp)},className:"px-4 py-2 cursor-pointer hover:bg-gray-100",children:[e.no_telp,"-",e.nama]},e.id))})})]}),o("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Nama"}),t("input",{value:h,onChange:e=>{_(e.currentTarget.value)},type:"text",className:`form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Nama"})]}),o("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Alamat"}),t("input",{value:b,onChange:e=>$(e.currentTarget.value),type:"text",className:`form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Alamat"})]}),o("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Link Maps"}),t("input",{value:f,onChange:e=>z(e.currentTarget.value),type:"text",className:`form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Link Maps"})]}),o("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700 md:pb-4"}),o("div",{className:"flex flex-col md:flex-row",children:[P?"":t("button",{onClick:V,type:"button",className:"inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",children:"Simpan"}),I?"":t("button",{onClick:G,type:"button",className:"inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out md:ml-3",children:"+ Tujuan"})]})]})]})}),t("hr",{}),Array.from({length:s}).map((e,n)=>t(oe,{totalHarga:i,urutan:d,customerId:R,shipmentId:K,removeTujuan:Z,date:k},n)),s>0&&o("p",{className:"form-label text-gray p-4",children:["Total Harga : ",ee(i)]})]})},ue=ne;export{ue as default};
