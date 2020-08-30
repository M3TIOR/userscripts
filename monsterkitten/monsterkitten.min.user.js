// ==UserScript==
// @name Float My Damn Player!
// @namespace https://m3tior.github.io
// @version 1.0
// @description Adds a native PIP button to html-5 video players.
// @author Ruby Allison Rose (aka: M3TIOR)
// @match https://www.watchcartoononline.io/*
// @grant none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require https://gist.github.com/raw/2625891/waitForKeyElements.js
// @*// require https://raw.githubusercontent.com/aadsm/jsmediatags/master/dist/jsmediatags.min.js*/
// ==/UserScript==
!function(){"use strict";var e=null;function t(e){var t=e.target.parentNode,o=t.getAttribute("download-link"),r=t.getAttribute("artists-title")+" - "+t.getAttribute("title");GM_xmlhttpRequest({method:"GET",url:o,overrideMimeType:"text/plain; charset=x-user-defined",onload:function(e){for(var t=e.responseText,o=new Uint8Array(t.length),n=0;n<t.length;n++)o[n]=t.charCodeAt(n);var l=new Blob([o],{type:"audio/mpeg"});saveAs(l,r+".mp3")}})}function o(){document.querySelectorAll("[dblc-action='playSongDblC']").forEach((function(e){if(!e.querySelector("[role='download-song']")&&e.querySelector("[role='play-song']")){var o=e.querySelector("[role='play-song']").parentNode,r=o.cloneNode(!0),n=r.children[0];n.innerHTML="<i class='fa fa-download'></i>",n.setAttribute("role","download-song"),n.setAttribute("style","padding-left: 5px;"),n.setAttribute("download-link",n.getAttribute("play-link")),n.removeAttribute("play-link"),n.removeAttribute("action"),n.addEventListener("click",t),e.insertBefore(r,o.nextElementSibling)}}))}waitForKeyElements("button[role='play-song']",()=>{o(),e=new MutationObserver((e,t)=>{waitForKeyElements("button[role='play-song']",o())});let t=document.querySelector("[role='browse-pages']");e.observe(t,{childList:!0})})}();
