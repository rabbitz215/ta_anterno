import{e as g,r as s,j as i,a as t,F as R}from"./app-eae9fd7a.js";import{Q as $}from"./react-toastify.esm-183d4a81.js";var j={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},O=g.createContext&&g.createContext(j),u=globalThis&&globalThis.__assign||function(){return u=Object.assign||function(e){for(var n,r=1,l=arguments.length;r<l;r++){n=arguments[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},u.apply(this,arguments)},G=globalThis&&globalThis.__rest||function(e,n){var r={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&n.indexOf(l)<0&&(r[l]=e[l]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,l=Object.getOwnPropertySymbols(e);o<l.length;o++)n.indexOf(l[o])<0&&Object.prototype.propertyIsEnumerable.call(e,l[o])&&(r[l[o]]=e[l[o]]);return r};function L(e){return e&&e.map(function(n,r){return g.createElement(n.tag,u({key:r},n.attr),L(n.child))})}function Q(e){return function(n){return g.createElement(W,u({attr:u({},e.attr)},n),L(e.child))}}function W(e){var n=function(r){var l=e.attr,o=e.size,b=e.title,y=G(e,["attr","size","title"]),f=o||r.size||"1em",d;return r.className&&(d=r.className),e.className&&(d=(d?d+" ":"")+e.className),g.createElement("svg",u({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,l,y,{className:d,style:u(u({color:e.color||r.color},r.style),e.style),height:f,width:f,xmlns:"http://www.w3.org/2000/svg"}),b&&g.createElement("title",null,b),e.children)};return O!==void 0?g.createElement(O.Consumer,null,function(r){return n(r)}):n(j)}function q(e){return Q({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"}}]})(e)}const re=({destinations:e,setDestinations:n,destination:r,hargaSingle:l,hargaMultiple:o,shipmentId:b,totalHarga:y,setTotalHarga:f,urutan:d,destinationUniqueId:_})=>{const E=/@(-?\d+\.?\d*),/,M=/,(-?\d+\.?\d*)/,[v,z]=s.useState(r.nama_penerima),[N,D]=s.useState(r.no_telp_penerima),[k,B]=s.useState(r.alamat),[h,F]=s.useState(r.link_maps),[w,H]=s.useState(r.type),[p,J]=s.useState(r.id),[c,U]=s.useState(r.status),[P,V]=s.useState(r.photo),[S,X]=s.useState(r.latitude),[T,Y]=s.useState(r.longitude);s.useEffect(()=>{I()},[v,N,k,h,w,c]);const I=()=>{const a=h,m=a?a.match(E):null,C=a?a.match(M):null;n(A=>A.map(x=>x.shipment_id===b&&x.id===p?{...x,id:p,nama_penerima:v,no_telp_penerima:N,alamat:k,link_maps:h,type:w,latitude:m?parseFloat(m[1]):null,longitude:C?parseFloat(C[1]):null,status:c,photo:P,urutan:d}:x))},K=async()=>{e.length===1?$.warning("Minimal 1 tujuan",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):(n(a=>a.filter(m=>_?!(m.shipment_id===b&&m.id===p&&m.destinationUniqueId===_):!(m.shipment_id===b&&m.id===p))),e.length<=2?f(l):f(y-o))};return i("div",{className:"grid md:grid-cols-4 lg:grid-cols-6 mt-3",children:[i("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"No Telp Penerima"}),t("input",{value:N,onChange:a=>D(a.currentTarget.value),type:"number",className:`form-control\r
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"No Telp Penerima"})]}),i("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Nama Penerima"}),t("input",{value:v,onChange:a=>z(a.currentTarget.value),type:"text",className:`form-control\r
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Nama Penerima"})]}),i("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Alamat"}),t("input",{value:k,onChange:a=>B(a.currentTarget.value),type:"text",className:`form-control\r
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Alamat"})]}),i("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Link Maps"}),t("input",{value:h,onChange:a=>F(a.currentTarget.value),type:"text",className:`form-control\r
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Link Maps"})]}),i("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Type"}),i("select",{value:w,onChange:a=>H(a.currentTarget.value),className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full",children:[t("option",{value:"Kirim",children:"Kirim"}),t("option",{value:"Kirim & Pickup",children:"Kirim & Pickup"})]})]}),i("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700 md:pb-4"}),t("div",{className:"flex flex-col md:flex-col lg:flex-row",children:t("button",{onClick:()=>K(),type:"button",className:"inline-block mt-3 lg:mt-0 lg:ml-3 px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out",children:t(q,{})})})]}),t("div",{className:"form-group mb-6 md:mx-3",children:i("div",{className:"flex flex-col",children:[c!==null&&t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Status"}),t("span",{className:`text-xs inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full ${c=="Belum Dikirim"?"bg-red-600":c=="Sedang Dikirim"?"bg-orange-500":c=="Sudah Dikirim"&&"bg-green-600"}`,style:{width:"6rem"},children:c})]})}),t("div",{className:"form-group mb-6 md:mx-3",children:c=="Sudah Dikirim"&&P!==null&&i("div",{className:"flex flex-col",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Photo"}),t("img",{src:`./uploads/${P}`,className:"w-20",alt:"Photo Bukti Kiriman"})]})}),S&&T&&i(R,{children:[i("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Latitude Lokasi Photo"}),t("p",{children:S})]}),i("div",{className:"form-group mb-6 md:mx-3",children:[t("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Longitude Lokasi Photo"}),t("p",{children:T})]})]})]})};export{re as default};
