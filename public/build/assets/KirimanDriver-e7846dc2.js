import{r as S,a as d,j as y,F as $,b as fe}from"./app-8ff3f97c.js";import{Q as F}from"./react-toastify.esm-6beadcfa.js";/*!
 * Compressor.js v1.2.1
 * https://fengyuanchen.github.io/compressorjs
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2023-02-28T14:09:41.732Z
 */function me(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(a);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(a,i).enumerable})),t.push.apply(t,r)}return t}function M(a){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?me(Object(t),!0).forEach(function(r){Te(a,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):me(Object(t)).forEach(function(r){Object.defineProperty(a,r,Object.getOwnPropertyDescriptor(t,r))})}return a}function De(a,e){if(!(a instanceof e))throw new TypeError("Cannot call a class as a function")}function ge(a,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(a,we(r.key),r)}}function Re(a,e,t){return e&&ge(a.prototype,e),t&&ge(a,t),Object.defineProperty(a,"prototype",{writable:!1}),a}function Te(a,e,t){return e=we(e),e in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}function j(){return j=Object.assign?Object.assign.bind():function(a){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(a[r]=t[r])}return a},j.apply(this,arguments)}function Ue(a,e){if(typeof a!="object"||a===null)return a;var t=a[Symbol.toPrimitive];if(t!==void 0){var r=t.call(a,e||"default");if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(a)}function we(a){var e=Ue(a,"string");return typeof e=="symbol"?e:String(e)}var xe={exports:{}};(function(a){typeof window>"u"||function(e){var t=e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype,r=e.Blob&&function(){try{return Boolean(new Blob)}catch{return!1}}(),i=r&&e.Uint8Array&&function(){try{return new Blob([new Uint8Array(100)]).size===100}catch{return!1}}(),n=e.BlobBuilder||e.WebKitBlobBuilder||e.MozBlobBuilder||e.MSBlobBuilder,u=/^data:((.*?)(;charset=.*?)?)(;base64)?,/,c=(r||n)&&e.atob&&e.ArrayBuffer&&e.Uint8Array&&function(l){var s,f,h,v,g,o,b,m,w;if(s=l.match(u),!s)throw new Error("invalid data URI");for(f=s[2]?s[1]:"text/plain"+(s[3]||";charset=US-ASCII"),h=!!s[4],v=l.slice(s[0].length),h?g=atob(v):g=decodeURIComponent(v),o=new ArrayBuffer(g.length),b=new Uint8Array(o),m=0;m<g.length;m+=1)b[m]=g.charCodeAt(m);return r?new Blob([i?b:o],{type:f}):(w=new n,w.append(o),w.getBlob(f))};e.HTMLCanvasElement&&!t.toBlob&&(t.mozGetAsFile?t.toBlob=function(l,s,f){var h=this;setTimeout(function(){f&&t.toDataURL&&c?l(c(h.toDataURL(s,f))):l(h.mozGetAsFile("blob",s))})}:t.toDataURL&&c&&(t.msToBlob?t.toBlob=function(l,s,f){var h=this;setTimeout(function(){(s&&s!=="image/png"||f)&&t.toDataURL&&c?l(c(h.toDataURL(s,f))):l(h.msToBlob(s))})}:t.toBlob=function(l,s,f){var h=this;setTimeout(function(){l(c(h.toDataURL(s,f)))})})),a.exports?a.exports=c:e.dataURLtoBlob=c}(window)})(xe);var pe=xe.exports,Ne=function(e){return typeof Blob>"u"?!1:e instanceof Blob||Object.prototype.toString.call(e)==="[object Blob]"},be={strict:!0,checkOrientation:!0,retainExif:!1,maxWidth:1/0,maxHeight:1/0,minWidth:0,minHeight:0,width:void 0,height:void 0,resize:"none",quality:.8,mimeType:"auto",convertTypes:["image/png"],convertSize:5e6,beforeDraw:null,drew:null,success:null,error:null},Ae=typeof window<"u"&&typeof window.document<"u",R=Ae?window:{},I=function(e){return e>0&&e<1/0},Fe=Array.prototype.slice;function X(a){return Array.from?Array.from(a):Fe.call(a)}var Le=/^image\/.+$/;function K(a){return Le.test(a)}function Se(a){var e=K(a)?a.substr(6):"";return e==="jpeg"&&(e="jpg"),".".concat(e)}var Ce=String.fromCharCode;function Me(a,e,t){var r="",i;for(t+=e,i=e;i<t;i+=1)r+=Ce(a.getUint8(i));return r}var je=R.btoa;function ve(a,e){for(var t=[],r=8192,i=new Uint8Array(a);i.length>0;)t.push(Ce.apply(null,X(i.subarray(0,r)))),i=i.subarray(r);return"data:".concat(e,";base64,").concat(je(t.join("")))}function Ie(a){var e=new DataView(a),t;try{var r,i,n;if(e.getUint8(0)===255&&e.getUint8(1)===216)for(var u=e.byteLength,c=2;c+1<u;){if(e.getUint8(c)===255&&e.getUint8(c+1)===225){i=c;break}c+=1}if(i){var l=i+4,s=i+10;if(Me(e,l,4)==="Exif"){var f=e.getUint16(s);if(r=f===18761,(r||f===19789)&&e.getUint16(s+2,r)===42){var h=e.getUint32(s+4,r);h>=8&&(n=s+h)}}}if(n){var v=e.getUint16(n,r),g,o;for(o=0;o<v;o+=1)if(g=n+o*12+2,e.getUint16(g,r)===274){g+=8,t=e.getUint16(g,r),e.setUint16(g,1,r);break}}}catch{t=1}return t}function He(a){var e=0,t=1,r=1;switch(a){case 2:t=-1;break;case 3:e=-180;break;case 4:r=-1;break;case 5:e=90,r=-1;break;case 6:e=90;break;case 7:e=90,t=-1;break;case 8:e=-90;break}return{rotate:e,scaleX:t,scaleY:r}}var We=/\.\d*(?:0|9){12}\d*$/;function ye(a){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1e11;return We.test(a)?Math.round(a*e)/e:a}function L(a){var e=a.aspectRatio,t=a.height,r=a.width,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"none",n=I(r),u=I(t);if(n&&u){var c=t*e;(i==="contain"||i==="none")&&c>r||i==="cover"&&c<r?t=r/e:r=t*e}else n?t=r/e:u&&(r=t*e);return{width:r,height:t}}function Ge(a){for(var e=X(new Uint8Array(a)),t=e.length,r=[],i=0;i+3<t;){var n=e[i],u=e[i+1];if(n===255&&u===218)break;if(n===255&&u===216)i+=2;else{var c=e[i+2]*256+e[i+3],l=i+c+2,s=e.slice(i,l);r.push(s),i=l}}return r.reduce(function(f,h){return h[0]===255&&h[1]===225?f.concat(h):f},[])}function _e(a,e){var t=X(new Uint8Array(a));if(t[2]!==255||t[3]!==224)return a;var r=t[4]*256+t[5],i=[255,216].concat(e,t.slice(4+r));return new Uint8Array(i)}var $e=R.ArrayBuffer,z=R.FileReader,T=R.URL||R.webkitURL,ze=/\.\w+$/,Ke=R.Compressor,Xe=function(){function a(e,t){De(this,a),this.file=e,this.exif=[],this.image=new Image,this.options=M(M({},be),t),this.aborted=!1,this.result=null,this.init()}return Re(a,[{key:"init",value:function(){var t=this,r=this.file,i=this.options;if(!Ne(r)){this.fail(new Error("The first argument must be a File or Blob object."));return}var n=r.type;if(!K(n)){this.fail(new Error("The first argument must be an image File or Blob object."));return}if(!T||!z){this.fail(new Error("The current browser does not support image compression."));return}$e||(i.checkOrientation=!1,i.retainExif=!1);var u=n==="image/jpeg",c=u&&i.checkOrientation,l=u&&i.retainExif;if(T&&!c&&!l)this.load({url:T.createObjectURL(r)});else{var s=new z;this.reader=s,s.onload=function(f){var h=f.target,v=h.result,g={},o=1;c&&(o=Ie(v),o>1&&j(g,He(o))),l&&(t.exif=Ge(v)),c||l?!T||o>1?g.url=ve(v,n):g.url=T.createObjectURL(r):g.url=v,t.load(g)},s.onabort=function(){t.fail(new Error("Aborted to read the image with FileReader."))},s.onerror=function(){t.fail(new Error("Failed to read the image with FileReader."))},s.onloadend=function(){t.reader=null},c||l?s.readAsArrayBuffer(r):s.readAsDataURL(r)}}},{key:"load",value:function(t){var r=this,i=this.file,n=this.image;n.onload=function(){r.draw(M(M({},t),{},{naturalWidth:n.naturalWidth,naturalHeight:n.naturalHeight}))},n.onabort=function(){r.fail(new Error("Aborted to load the image."))},n.onerror=function(){r.fail(new Error("Failed to load the image."))},R.navigator&&/(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(R.navigator.userAgent)&&(n.crossOrigin="anonymous"),n.alt=i.name,n.src=t.url}},{key:"draw",value:function(t){var r=this,i=t.naturalWidth,n=t.naturalHeight,u=t.rotate,c=u===void 0?0:u,l=t.scaleX,s=l===void 0?1:l,f=t.scaleY,h=f===void 0?1:f,v=this.file,g=this.image,o=this.options,b=document.createElement("canvas"),m=b.getContext("2d"),w=Math.abs(c)%180===90,B=(o.resize==="contain"||o.resize==="cover")&&I(o.width)&&I(o.height),O=Math.max(o.maxWidth,0)||1/0,k=Math.max(o.maxHeight,0)||1/0,E=Math.max(o.minWidth,0)||0,D=Math.max(o.minHeight,0)||0,P=i/n,p=o.width,x=o.height;if(w){var Z=[k,O];O=Z[0],k=Z[1];var V=[D,E];E=V[0],D=V[1];var q=[x,p];p=q[0],x=q[1]}B&&(P=p/x);var J=L({aspectRatio:P,width:O,height:k},"contain");O=J.width,k=J.height;var Q=L({aspectRatio:P,width:E,height:D},"cover");if(E=Q.width,D=Q.height,B){var ee=L({aspectRatio:P,width:p,height:x},o.resize);p=ee.width,x=ee.height}else{var te=L({aspectRatio:P,width:p,height:x}),re=te.width;p=re===void 0?i:re;var ae=te.height;x=ae===void 0?n:ae}p=Math.floor(ye(Math.min(Math.max(p,E),O))),x=Math.floor(ye(Math.min(Math.max(x,D),k)));var Be=-p/2,Ee=-x/2,Pe=p,Oe=x,H=[];if(B){var ie=0,ne=0,W=i,G=n,oe=L({aspectRatio:P,width:i,height:n},{contain:"cover",cover:"contain"}[o.resize]);W=oe.width,G=oe.height,ie=(i-W)/2,ne=(n-G)/2,H.push(ie,ne,W,G)}if(H.push(Be,Ee,Pe,Oe),w){var se=[x,p];p=se[0],x=se[1]}b.width=p,b.height=x,K(o.mimeType)||(o.mimeType=v.type);var le="transparent";v.size>o.convertSize&&o.convertTypes.indexOf(o.mimeType)>=0&&(o.mimeType="image/jpeg");var ce=o.mimeType==="image/jpeg";if(ce&&(le="#fff"),m.fillStyle=le,m.fillRect(0,0,p,x),o.beforeDraw&&o.beforeDraw.call(this,m,b),!this.aborted&&(m.save(),m.translate(p/2,x/2),m.rotate(c*Math.PI/180),m.scale(s,h),m.drawImage.apply(m,[g].concat(H)),m.restore(),o.drew&&o.drew.call(this,m,b),!this.aborted)){var ue=function(N){if(!r.aborted){var de=function(A){return r.done({naturalWidth:i,naturalHeight:n,result:A})};if(N&&ce&&o.retainExif&&r.exif&&r.exif.length>0){var he=function(A){return de(pe(ve(_e(A,r.exif),o.mimeType)))};if(N.arrayBuffer)N.arrayBuffer().then(he).catch(function(){r.fail(new Error("Failed to read the compressed image with Blob.arrayBuffer()."))});else{var U=new z;r.reader=U,U.onload=function(_){var A=_.target;he(A.result)},U.onabort=function(){r.fail(new Error("Aborted to read the compressed image with FileReader."))},U.onerror=function(){r.fail(new Error("Failed to read the compressed image with FileReader."))},U.onloadend=function(){r.reader=null},U.readAsArrayBuffer(N)}}else de(N)}};b.toBlob?b.toBlob(ue,o.mimeType,o.quality):ue(pe(b.toDataURL(o.mimeType,o.quality)))}}},{key:"done",value:function(t){var r=t.naturalWidth,i=t.naturalHeight,n=t.result,u=this.file,c=this.image,l=this.options;if(T&&c.src.indexOf("blob:")===0&&T.revokeObjectURL(c.src),n)if(l.strict&&!l.retainExif&&n.size>u.size&&l.mimeType===u.type&&!(l.width>r||l.height>i||l.minWidth>r||l.minHeight>i||l.maxWidth<r||l.maxHeight<i))n=u;else{var s=new Date;n.lastModified=s.getTime(),n.lastModifiedDate=s,n.name=u.name,n.name&&n.type!==u.type&&(n.name=n.name.replace(ze,Se(n.type)))}else n=u;this.result=n,l.success&&l.success.call(this,n)}},{key:"fail",value:function(t){var r=this.options;if(r.error)r.error.call(this,t);else throw t}},{key:"abort",value:function(){this.aborted||(this.aborted=!0,this.reader?this.reader.abort():this.image.complete?this.fail(new Error("The compression process has been aborted.")):(this.image.onload=null,this.image.onabort()))}}],[{key:"noConflict",value:function(){return window.Compressor=Ke,a}},{key:"setDefaults",value:function(t){j(be,t)}}]),a}(),Y={};Object.defineProperty(Y,"__esModule",{value:!0});var ke=Y.useGeolocated=void 0;const C=S;function Ye(a={}){const{positionOptions:e={enableHighAccuracy:!0,maximumAge:0,timeout:1/0},isOptimisticGeolocationEnabled:t=!0,userDecisionTimeout:r=void 0,suppressLocationOnMount:i=!1,watchPosition:n=!1,geolocationProvider:u=typeof navigator<"u"?navigator.geolocation:void 0,onError:c,onSuccess:l}=a,s=(0,C.useRef)(0),f=(0,C.useRef)(!0),h=(0,C.useRef)(0),[v,g]=(0,C.useState)(t),[o,b]=(0,C.useState)(),[m,w]=(0,C.useState)(),[B,O]=(0,C.useState)(),k=(0,C.useCallback)(()=>{s.current&&window.clearTimeout(s.current)},[]),E=(0,C.useCallback)(p=>{k(),f.current&&(b(()=>{}),g(!1),O(p)),c==null||c(p)},[c,k]),D=(0,C.useCallback)(p=>{k(),f.current&&(b(p.coords),w(p.timestamp),g(!0),O(()=>{})),l==null||l(p)},[l,k]),P=(0,C.useCallback)(()=>{if(!u||!u.getCurrentPosition||!u.watchPosition)throw new Error("The provided geolocation provider is invalid");const p=(n?u.watchPosition:u.getCurrentPosition).bind(u);r&&(s.current=window.setTimeout(()=>{E()},r)),h.current=p(D,E,e)},[u,n,r,E,D,e]);return(0,C.useEffect)(()=>(i||P(),()=>{k(),n&&h.current&&(u==null||u.clearWatch(h.current))}),[]),{getPosition:P,coords:o,timestamp:m,isGeolocationEnabled:v,isGeolocationAvailable:Boolean(u),positionError:B}}ke=Y.useGeolocated=Ye;const Je=({item:a,onSave:e})=>{const[t,r]=S.useState(a.status),[i,n]=S.useState(null),[u,c]=S.useState(null),[l,s]=S.useState(!1),f=async m=>{n(m.target.files[0]),c(URL.createObjectURL(m.target.files[0]))},{coords:h,getPosition:v,isGeolocationEnabled:g}=ke({positionOptions:{enableHighAccuracy:!0},userDecisionTimeout:5e3,forceRequest:!0}),o=async()=>{i==null?F.warning("Silahkan pilih foto terlebih dahulu",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}):new Xe(i,{quality:.6,success:async m=>{const w=new FormData;w.append("file",m),h&&(w.append("latitude",h.latitude),w.append("longitude",h.longitude)),s(!0);try{await fe.post(`/upload_foto/${a.id}`,w,{headers:{"Content-Type":"multipart/form-data"}}).then(function(B){F.success("Foto bukti berhasil di upload",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}),n(null),c(null)}).catch(function(B){console.log(B.message),F.error("Foto bukti gagal di upload",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"})}).finally(()=>{s(!1),e()})}catch(B){console.log(B)}}})},b=async()=>{const m=t==="Sedang Dikirim"?"Sudah Dikirim":"Sedang Dikirim";s(!0),await fe.put(`/update_status/${a.id}`,{status:m}).then(function(w){F.success("Status berhasil di rubah",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"})}).catch(function(w){console.log(w.message),F.error("Shipment tidak berhasil di rubah",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored"}),r(a.status)}).finally(()=>{r(m),s(!1),e()})};return d("div",{className:"bg-white my-2 overflow-hidden shadow-sm sm:rounded-lg",children:d("div",{className:"p-4 md:p-0 my-2 h-auto",children:d("form",{children:y("div",{className:`grid grid-cols-2 md:grid-cols-4 ${g?"lg:grid-cols-8":"lg:grid-cols-9"}`,children:[y("div",{className:"form-group mb-6 md:mx-3 relative",children:[d("label",{className:"form-label inline-block mb-2 text-gray-700",children:"No Telp"}),d("div",{className:"flex",children:d("a",{className:"font-bold",href:`https://wa.me/${a.no_telp_penerima.startsWith("0")?"62"+a.no_telp_penerima.substring(1):a.no_telp_penerima}`,target:"_blank",children:a.no_telp_penerima})})]}),y("div",{className:"form-group mb-6 md:mx-3",children:[d("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Nama"}),d("p",{className:"font-bold",children:a.nama_penerima})]}),y("div",{className:"form-group mb-6 md:mx-3",children:[d("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Alamat"}),d("p",{className:"font-bold",children:a.alamat})]}),y("div",{className:"form-group mb-6 md:mx-3",children:[d("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Link Maps"}),d("p",{className:"font-bold",children:d("a",{href:a.link_maps,target:"_blank",children:"Klik disini"})})]}),y("div",{className:"form-group mb-6 md:mx-3",children:[d("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Type Kiriman"}),d("span",{className:`text-xs inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full ${a.type=="Pickup"?"bg-orange-600":a.type=="Kirim"?"bg-purple-600":"bg-blue-600"}`,style:{width:"6rem"},children:a.type})]}),y("div",{className:"form-group mb-6 md:mx-3",children:[d("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Status Kiriman"}),d("span",{className:`text-xs inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded-full ${a.status=="Belum Dikirim"?"bg-red-600":a.status=="Sedang Dikirim"?"bg-orange-500":"bg-green-600"}`,style:{width:"6rem"},children:a.status})]}),y("div",{className:"form-group mb-6 md:mx-3",children:[d("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Photo Bukti"}),a.photo==""||a.photo==null?d("p",{children:"No Photo"}):d("img",{src:`./uploads/${a.photo}`,className:"w-24"})]}),!g&&y("div",{className:"form-group mb-6 md:mx-3",children:[d("label",{className:"form-label inline-block mb-2 text-gray-700",children:"Location permission"}),y("div",{children:["Location is not enabled by the user."," ",d("button",{onClick:v,type:"button",className:"inline-block my-2 px-6 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",children:"Enable Location"})]})]}),d("div",{className:"form-group md:mx-3",children:d("div",{className:"flex flex-col md:flex-col",children:t==="Sudah Dikirim"?l?y($,{children:[y("div",{role:"status",children:[y("svg",{"aria-hidden":"true",className:"w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[d("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),d("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]}),d("span",{className:"sr-only",children:"Loading..."})]}),"Loading..."]}):y($,{children:[d("input",{accept:"image/*,capture=camera",capture:"camera",type:"file",onChange:f}),u&&d("img",{src:u,alt:"Image Preview",className:"w-24 mt-2"}),d("button",{onClick:()=>o(),type:"button",className:"inline-block my-2 px-6 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out",children:"Upload Foto"})]}):l?y($,{children:[y("div",{role:"status",children:[y("svg",{"aria-hidden":"true",className:"w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[d("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),d("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]}),d("span",{className:"sr-only",children:"Loading..."})]}),"Loading..."]}):d("button",{type:"button",className:`inline-block my-2 px-6 py-1.5 bg-${t=="Belum Dikirim"?"orange":"green"}-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-${t=="Belum Dikirim"?"orange":"green"}-700 hover:shadow-lg focus:bg-${t=="Belum Dikirim"?"orange":"green"}-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-${t=="Belum Dikirim"?"orange":"green"}-800 active:shadow-lg transition duration-150 ease-in-out`,onClick:b,children:t==="Belum Dikirim"?"Kirim":"Selesai"})})})]})})})})};export{Je as default};
