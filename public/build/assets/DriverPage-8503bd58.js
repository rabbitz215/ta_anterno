import{r as o,j as t,a as e,n as u}from"./app-eae9fd7a.js";import{D as x}from"./DriverLayout-4dfd4fc0.js";import{k as p}from"./react-toastify.esm-183d4a81.js";/* empty css                      */import v from"./KirimanDriver-040776fb.js";import{z as D}from"./react-datepicker-fa2abbb2.js";import{a as y}from"./moment-1c676225.js";import"./ResponsiveNavLink-3283ff5d.js";import"./transition-1d2338f1.js";const z=r=>{const[m,d]=o.useState(r.kiriman),[i,c]=o.useState(new Date),n=a=>{const f=y(a).format("YYYY-MM-DD");axios.get(`/get_kiriman?date=${f}`).then(function(s){d(s.data)}).catch(function(s){console.log(s.message)})},h=a=>{c(a),n(a)};o.useEffect(()=>{n(i)},[]);const g={year:"numeric",month:"long",day:"numeric"},l=i.toLocaleDateString("en-GB",g);return t(x,{auth:r.auth,errors:r.errors,header:t("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:["Hai, ",r.user]}),children:[e(u,{title:"Driver Page"}),e(p,{}),e("div",{className:"py-12",children:t("div",{className:"max-w-7xl mx-auto sm:px-1 lg:px-1",children:[e("div",{className:"flex justify-between",children:e("div",{className:"p-6 text-gray-900",children:t("div",{className:"flex gap-4 items-center",children:[e("div",{className:"font-bold",children:"Tanggal"}),e(D,{selected:i,onChange:h,dateFormat:"dd/MM/yyyy"})]})})}),t("div",{className:"px-6 my-6 text-lg font-bold",children:["Kiriman tanggal ",l]}),m.length>0?m.map(a=>e(v,{onSave:()=>n(i),item:a},a.id)):e("div",{className:"m-6 bg-white my-2 overflow-hidden shadow-sm sm:rounded-lg",children:e("div",{className:"p-4 md:p-0 my-2 h-auto",children:t("div",{className:"text-lg p-6 font-bold",children:["Tidak ada kiriman untuk tanggal"," ",l]})})})]})})]})};export{z as default};