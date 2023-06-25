import{e as g,r as s,j as i,a as n,F as R}from"./app-8ff3f97c.js";import{Q as $}from"./react-toastify.esm-6beadcfa.js";var j={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},O=g.createContext&&g.createContext(j),u=globalThis&&globalThis.__assign||function(){return u=Object.assign||function(e){for(var l,t=1,a=arguments.length;t<a;t++){l=arguments[t];for(var o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o])}return e},u.apply(this,arguments)},G=globalThis&&globalThis.__rest||function(e,l){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&l.indexOf(a)<0&&(t[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,a=Object.getOwnPropertySymbols(e);o<a.length;o++)l.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(t[a[o]]=e[a[o]]);return t};function L(e){return e&&e.map(function(l,t){return g.createElement(l.tag,u({key:t},l.attr),L(l.child))})}function Q(e){return function(l){return g.createElement(W,u({attr:u({},e.attr)},l),L(e.child))}}function W(e){var l=function(t){var a=e.attr,o=e.size,b=e.title,y=G(e,["attr","size","title"]),f=o||t.size||"1em",d;return t.className&&(d=t.className),e.className&&(d=(d?d+" ":"")+e.className),g.createElement("svg",u({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,a,y,{className:d,style:u(u({color:e.color||t.color},t.style),e.style),height:f,width:f,xmlns:"http://www.w3.org/2000/svg"}),b&&g.createElement("title",null,b),e.children)};return O!==void 0?g.createElement(O.Consumer,null,function(t){return l(t)}):l(j)}function q(e){return Q({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"}}]})(e)}const te=({destinations:e,setDestinations:l,destination:t,hargaSingle:a,hargaMultiple:o,shipmentId:b,totalHarga:y,setTotalHarga:f,urutan:d,destinationUniqueId:_})=>{const E=/@(-?\d+\.?\d*),/,M=/,(-?\d+\.?\d*)/,[v,z]=s.useState(t.nama_penerima),[N,D]=s.useState(t.no_telp_penerima),[k,B]=s.useState(t.alamat),[h,F]=s.useState(t.link_maps),[w,H]=s.useState(t.type),[p,J]=s.useState(t.id),[c,U]=s.useState(t.status),[P,V]=s.useState(t.photo),[S,X]=s.useState(t.latitude),[T,Y]=s.useState(t.longitude);s.useEffect(()=>{I()},[v,N,k,h,w,c]);const I=()=>{const r=h,m=r?r.match(E):null,C=r?r.match(M):null;l(A=>A.map(x=>x.shipment_id===b&&x.id===p?{...x,id:p,nama_penerima:v,no_telp_penerima:N,alamat:k,link_maps:h,type:w,latitude:m?parseFloat(m[1]):null,longitude:C?parseFloat(C[1]):null,status:c,photo:P,urutan:d}:x))},K=async()=>{e.length===1?$.warning("Minimal 1 tujuan",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):(l(r=>r.filter(m=>_?!(m.shipment_id===b&&m.id===p&&m.destinationUniqueId===_):!(m.shipment_id===b&&m.id===p))),e.length<=2?f(a):f(y-o))};return i("div",{className:"grid md:grid-cols-4 lg:grid-cols-6 mt-3",children:[i("div",{className:"form-group mb-6 md:mx-3",children:[n("label",{className:"form-label inline-block mb-2 text-gray-700",children:"No Telp Penerima"}),n("input",{value:N,onChange:r=>D(r.currentTarget.value),type:"number",className:`form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"No Telp Penerima"})]}),i("div",{className:"form-group mb-6 md:mx-3",children:[n("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Nama Penerima"}),n("input",{value:v,onChange:r=>z(r.currentTarget.value),type:"text",className:`form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Nama Penerima"})]}),i("div",{className:"form-group mb-6 md:mx-3",children:[n("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Alamat"}),n("input",{value:k,onChange:r=>B(r.currentTarget.value),type:"text",className:`form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Alamat"})]}),i("div",{className:"form-group mb-6 md:mx-3",children:[n("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Link Maps"}),n("input",{value:h,onChange:r=>F(r.currentTarget.value),type:"text",className:`form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,placeholder:"Link Maps"})]}),i("div",{className:"form-group mb-6 md:mx-3",children:[n("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Type"}),i("select",{value:w,onChange:r=>H(r.currentTarget.value),className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full",children:[n("option",{value:"Kirim",children:"Kirim"}),n("option",{value:"Kirim & Pickup",children:"Kirim & Pickup"})]})]}),i("div",{className:"form-group mb-6 md:mx-3",children:[n("label",{className:"form-label inline-block mb-2 text-gray-700 md:pb-4"}),n("div",{className:"flex flex-col md:flex-col lg:flex-row",children:n("button",{onClick:()=>K(),type:"button",className:"inline-block mt-3 lg:mt-0 lg:ml-3 px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out",children:n(q,{})})})]}),n("div",{className:"form-group mb-6 md:mx-3",children:i("div",{className:"flex flex-col",children:[c!==null&&n("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Status"}),n("span",{className:`text-xs inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full ${c=="Belum Dikirim"?"bg-red-600":c=="Sedang Dikirim"?"bg-orange-500":c=="Sudah Dikirim"&&"bg-green-600"}`,style:{width:"6rem"},children:c})]})}),n("div",{className:"form-group mb-6 md:mx-3",children:c=="Sudah Dikirim"&&P!==null&&i("div",{className:"flex flex-col",children:[n("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Photo"}),n("img",{src:`./uploads/${P}`,className:"w-20",alt:"Photo Bukti Kiriman"})]})}),S&&T&&i(R,{children:[i("div",{className:"form-group mb-6 md:mx-3",children:[n("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Latitude Lokasi Photo"}),n("p",{children:S})]}),i("div",{className:"form-group mb-6 md:mx-3",children:[n("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Longitude Lokasi Photo"}),n("p",{children:T})]})]})]})};export{te as default};
