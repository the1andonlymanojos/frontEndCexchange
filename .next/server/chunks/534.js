"use strict";exports.id=534,exports.ids=[534],exports.modules={3024:(e,t,r)=>{r.d(t,{Z:()=>n});/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r(9224).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},5299:(e,t,r)=>{r.d(t,{Z:()=>n});/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r(9224).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},2522:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(3729);function u(e){return"[object Object]"===Object.prototype.toString.call(e)||Array.isArray(e)}function c(e,t){let r=Object.keys(e),n=Object.keys(t);return r.length===n.length&&JSON.stringify(Object.keys(e.breakpoints||{}))===JSON.stringify(Object.keys(t.breakpoints||{}))&&r.every(r=>{let n=e[r],s=t[r];return"function"==typeof n?`${n}`==`${s}`:u(n)&&u(s)?c(n,s):n===s})}function s(e){return e.concat().sort((e,t)=>e.name>t.name?1:-1).map(e=>e.options)}function o(e={},t=[]){let r=(0,n.useRef)(e),u=(0,n.useRef)(t),[o,i]=(0,n.useState)(),[a,f]=(0,n.useState)(),l=(0,n.useCallback)(()=>{o&&o.reInit(r.current,u.current)},[o]);return(0,n.useEffect)(()=>{i(void 0)},[a,i]),(0,n.useEffect)(()=>{c(r.current,e)||(r.current=e,l())},[e,l]),(0,n.useEffect)(()=>{!function(e,t){if(e.length!==t.length)return!1;let r=s(e),n=s(t);return r.every((e,t)=>c(e,n[t]))}(u.current,t)&&(u.current=t,l())},[t,l]),[f,o]}o.globalOptions=void 0}};