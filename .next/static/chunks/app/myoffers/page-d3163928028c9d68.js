(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[640],{7142:function(e,t,i){Promise.resolve().then(i.bind(i,6475))},7461:function(e,t,i){"use strict";i.d(t,{Z:function(){return l}});var s=i(2265),a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),l=(e,t)=>{let i=(0,s.forwardRef)((i,l)=>{let{color:r="currentColor",size:c=24,strokeWidth:o=2,absoluteStrokeWidth:d,className:u="",children:h,...f}=i;return(0,s.createElement)("svg",{ref:l,...a,width:c,height:c,stroke:r,strokeWidth:d?24*Number(o)/Number(c):o,className:["lucide","lucide-".concat(n(e)),u].join(" "),...f},[...t.map(e=>{let[t,i]=e;return(0,s.createElement)(t,i)}),...Array.isArray(h)?h:[h]])});return i.displayName="".concat(e),i}},7805:function(e,t,i){"use strict";i.d(t,{Z:function(){return s}});/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,i(7461).Z)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},7907:function(e,t,i){"use strict";var s=i(5313);i.o(s,"useRouter")&&i.d(t,{useRouter:function(){return s.useRouter}})},6475:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return d}});var s=i(7437),a=i(3237),n=i(2265),l=i(7147),r=i(7805),c=e=>{let{amount:t,created_at:i,expires_at:n,listing_id:l,accepted:c,is_valid:o,title:d,thumbnail:u,available:h,highest_bid:f,onClick:g,transaction_id:p}=e,m=Date.parse(n)-Date.now();return console.log(m),console.log("recieved values"+t+i+n+l+c+o+d+u+h+f),(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("div",{className:"flex flex-row justify-start",onClick:e=>{g(h,o,l,c,p)},children:(0,s.jsxs)("div",{className:"flex items-center bg-gray-100 rounded-lg shadow-lg p-4 mb-4",children:[(0,s.jsx)("img",{src:"".concat(a.y)+u,className:"w-20 h-20 object-cover rounded-lg mr-4",alt:"thumbnail"}),(0,s.jsxs)("div",{className:"flex flex-col justify-between flex-1",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"text-lg font-semibold mb-1",children:d}),(0,s.jsxs)("p",{className:"text-gray-600",children:["Amount: ₹",t]}),(0,s.jsxs)("p",{className:"text-gray-600 text-sm",children:["Valid for: ",Math.floor(m%864e5/36e5)+24*Math.floor(m/864e5)," hours"]})]}),(0,s.jsx)("div",{className:(null===c?"text-purple-950":1===c?"text-green-500":"text-red-500")+" text-xs",children:null===c?"Status: Pending":1===c?"Status: Accepted! Click to get contact details":"available"===h?"Status: Rejected, click to place another bid":"Status: Rejected, listing is no longer available"})]}),(0,s.jsx)("div",{className:"flex flex-col items-center",children:(0,s.jsx)(r.Z,{width:40})})]})})})},o=i(7907),d=()=>{let[e,t]=(0,n.useState)([]),[i,r]=(0,n.useState)([]),[d,u]=(0,n.useState)([]),[h,f]=(0,n.useState)([]),[g,p]=(0,n.useState)(!0),[m,x]=(0,n.useState)(!1),[_,v]=(0,n.useState)(!1),{toast:j}=(0,l.pm)(),b="".concat(a.y,"api/account/offers"),y=(0,o.useRouter)(),S=async()=>{let e=await fetch(b,{method:"GET",cache:"no-cache",credentials:"include"});if(console.log(e.status),401===e.status){x(!1),j({title:"Uh Oh!",description:"Looks like you are not logged in, please login to place a bid"}),window.location.href="/login?redirect=".concat(window.location.pathname);return}200!==e.status&&(p(!1),v(!0));let i=await e.json();console.log(i),x(!0),i.offers&&t(i.offers),p(!1)};(0,n.useEffect)(()=>{S()},[]),(0,n.useEffect)(()=>{if(e.length>0){let t=[],i=[],s=[];e.forEach(e=>{1===e.accepted?t.push(e):0===e.accepted?i.push(e):s.push(e)}),r(t),u(i),f(s)}},[e]);let w=(e,t,i,s,a)=>{null==s&&j({title:"Offer is pending",description:"You can view your offers in Account > My Offers section"}),1==s&&y.push("/transactions/".concat(a)),0==s&&"available"===e&&y.push("/listing/".concat(i)),0==s&&"available"!==e&&j({title:"Offer is rejected",description:"The listing is no longer available"})};return(0,s.jsx)("div",{className:"flex-row flex justify-center",children:(0,s.jsx)("div",{className:"max-w-sm",children:(0,s.jsxs)("div",{className:"w-full",children:[(0,s.jsx)("h1",{className:"text-2xl",children:"My offers:"}),g&&(0,s.jsx)("div",{children:"Loading..."}),m&&_&&(0,s.jsx)("div",{children:"Failed to fetch offers"}),!m&&(0,s.jsx)("div",{children:"Log in to see offers"}),!g&&!_&&!e&&(0,s.jsx)("div",{children:"No offers yet"}),m&&!g&&!_&&(0,s.jsxs)("div",{className:"p-1",children:["Accepted Offers:",0===i.length&&(0,s.jsx)("div",{className:"text-gray-500 mb-4",children:"No accepted offers yet"}),i.map((e,t)=>(0,s.jsx)(c,{transaction_id:e.transaction_id,title:e.listing.title,amount:e.amount,accepted:e.accepted,available:e.listing.availability,created_at:e.created_at,expires_at:e.expires_at,highest_bid:e.highest_bid,is_valid:e.is_valid,listing_id:e.listing_id,thumbnail:e.listing.image_path,onClick:w},t)),"Pending Offers:",0===h.length&&(0,s.jsx)("div",{className:"text-gray-500 mb-4",children:"No pending offers yet"}),h.map((e,t)=>(0,s.jsx)(c,{onClick:w,title:e.listing.title,amount:e.amount,accepted:e.accepted,available:e.listing.availability,created_at:e.created_at,expires_at:e.expires_at,highest_bid:e.highest_bid,is_valid:e.is_valid,listing_id:e.listing_id,thumbnail:e.listing.image_path},t)),"Rejected Offers:",0===d.length&&(0,s.jsx)("div",{className:"text-gray-500 mb-4",children:"No rejected offers yet"}),d.map((e,t)=>(0,s.jsx)(c,{onClick:w,title:e.listing.title,amount:e.amount,accepted:e.accepted,available:e.listing.availability,created_at:e.created_at,expires_at:e.expires_at,highest_bid:e.highest_bid,is_valid:e.is_valid,listing_id:e.listing_id,thumbnail:e.listing.image_path},t))]})]})})})}},7147:function(e,t,i){"use strict";i.d(t,{pm:function(){return h}});var s=i(2265);let a=0,n=new Map,l=e=>{if(n.has(e))return;let t=setTimeout(()=>{n.delete(e),d({type:"REMOVE_TOAST",toastId:e})},1e4);n.set(e,t)},r=(e,t)=>{switch(t.type){case"ADD_TOAST":return{...e,toasts:[t.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case"DISMISS_TOAST":{let{toastId:i}=t;return i?l(i):e.toasts.forEach(e=>{l(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===t.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)}}},c=[],o={toasts:[]};function d(e){o=r(o,e),c.forEach(e=>{e(o)})}function u(e){let{...t}=e,i=(a=(a+1)%Number.MAX_SAFE_INTEGER).toString(),s=()=>d({type:"DISMISS_TOAST",toastId:i});return d({type:"ADD_TOAST",toast:{...t,id:i,open:!0,onOpenChange:e=>{e||s()}}}),{id:i,dismiss:s,update:e=>d({type:"UPDATE_TOAST",toast:{...e,id:i}})}}function h(){let[e,t]=s.useState(o);return s.useEffect(()=>(c.push(t),()=>{let e=c.indexOf(t);e>-1&&c.splice(e,1)}),[e]),{...e,toast:u,dismiss:e=>d({type:"DISMISS_TOAST",toastId:e})}}},3237:function(e,t,i){"use strict";i.d(t,{y:function(){return s}});let s="https://manojshivagange.tech:3000/"}},function(e){e.O(0,[971,69,744],function(){return e(e.s=7142)}),_N_E=e.O()}]);