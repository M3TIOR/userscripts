// ==UserScript==
// @name Don't Touch My Tabs! (M3TIOR's Implementation)
// @namespace m3tior.github.io
// @version 1.0.1
// @description Prevents unscrupulous web pages from taking control of your tabs.
// @homepage https://github.com/m3tior/userscripts
// @author M3TIOR
// @match http://*/*
// @match https://*/*
// @run-at document-start
// @grant unsafeWindow
// ==/UserScript==
!function(){"use-strict";const t=["A","AREA","FORM"],n=[],o=Array.prototype.forEach,r={loaded:!1};let d="DOMContentLoaded";var a,i;function l(e){m.disconnect(),n.forEach((e=>{null!=e.parentNode&&document.head.appendChild(e)}))}function s(e){return t.includes(e.nodeName)&&!("javascript:void(0)"===e.href||e.hostname===window.location.hostname)&&"_blank"===e.target}function c(e){"string"==typeof e.rel?e.rel.split(" ").includes("noopener")||(e.rel=(e.rel+" noopener").trim()):e.rel="noopener"}function u(t){t.remove();const o=document.createElement("link");o.href=t.src,o.rel="preload",o.as="script",t.async=!1,e.defer=!1,document.head.appendChild(o),n.push(t)}null==typeof document.removeEventListener?console.warn("Your browser doesn't support 'removeEventListener', script loading optimization disabled."):(a=document,"loaded",r[i=d]=function(e){const t=r.loaded;r.loaded=!0,a.removeEventListener(i,t)},a.addEventListener(i,r[stored]));const m=new MutationObserver(((e,t)=>{e.forEach((e=>{"childList"===e.type&&o.call(e.addedNodes,(e=>{"SCRIPT"===e.nodeName&&u(e)}))}))})),p=new MutationObserver(((e,t)=>{e.forEach((e=>{if("childList"===e.type)o.call(e.addedNodes,(e=>{s(e)&&c(e)}));else if("attributes"===e.type){const t=e.target;s(t)&&c(t)}}))}));m.observe(document,{childList:!0,subtree:!0});const f=document.getElementsByTagName("SCRIPT");if(o.call(f,u),o.call(document.querySelectorAll(t.join(",")),(e=>{"javascript:void(0)"!==e.href&&e.hostname!==window.location.hostname&&"_blank"===e.target&&c(e)})),p.observe(document,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["rel"]}),"function"==typeof r.loaded){r.loaded();let e=null;document.addEventListener(d,e=t=>{l(),document.removeEventListener(d,e)})}else l()}();
