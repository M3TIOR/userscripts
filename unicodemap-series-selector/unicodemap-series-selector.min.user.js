// ==UserScript==
// @name UnicodeMap Series Selector
// @namespace m3tior.github.io
// @version 1.0.0
// @description Helps you select ranges of characters on the unicode map
// @homepage https://github.com/m3tior/userscripts
// @author M3TIOR (aka: Ruby Allison Rose)
// @match https://unicodemap.org/range/*
// @grant GM_setClipboard
// ==/UserScript==
!function(){let e=null,n=null;const t=document.createElement("button");t.innerHTML="Copy Range",t.style.cssText="position: fixed; top: 0px; right: 0px; z-index: 3000;",document.body.appendChild(t),t.addEventListener("click",(()=>{if(!e||!n)return;const t=function(){const t=[];for(let[l,i]=e;i<=n[1];l=l.nextElementSibling,i++)t.push(l.children[0].innerText);return t.join("")}();navigator.clipboard.writeText(`Range ( ${e[1]} - ${n[1]} ) --\x3e ${t}`)}));const l=document.querySelectorAll(".characterGrid li");[].forEach.call(l,(t=>{t.addEventListener("click",(()=>{const l=parseInt(t.textContent.slice(1),16);if(e&&n)for(let[t,l]=e;l<=n[1];t=t.nextElementSibling,l++)t.style.backgroundColor="inherit";(null==e||l<e[1])&&(e=[t,l]),(null==n||l>n[1])&&(n=[t,l]),l>e[1]&&l<n[1]&&(l-e[1]<=n[1]-l?e=[t,l]:n=[t,l]);for(let[t,l]=e;l<=n[1];t=t.nextElementSibling,l++)t.style.backgroundColor="magenta"}))}))}();
