// ==UserScript==
// @name MonsterKitty - Scratching Post
// @namespace m3tior.github.io
// @version 2.0.1
// @description Adds download buttons and funcitonality to monstercat.com/browse
// @homepage https://github.com/m3tior/userscripts
// @author M3TIOR
// @match https://www.monstercat.com/browse*
// @grant GM_xmlhttpRequest
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require https://raw.githubusercontent.com/eligrey/FileSaver.js/master/dist/FileSaver.min.js
// @require https://raw.githubusercontent.com/Stuk/jszip/master/dist/jszip.min.js
// @*// require https://raw.githubusercontent.com/aadsm/jsmediatags/master/dist/jsmediatags.min.js*/
// ==/UserScript==
!function(){var e=null;function t(e){var t=e.target.parentNode,o=t.getAttribute("download-link"),n=t.getAttribute("artists-title")+" - "+t.getAttribute("title");GM_xmlhttpRequest({method:"GET",url:o,overrideMimeType:"text/plain; charset=x-user-defined",onload:function(e){for(var t=e.responseText,o=new Uint8Array(t.length),r=0;r<t.length;r++)o[r]=t.charCodeAt(r);var l=new Blob([o],{type:"audio/mpeg"});saveAs(l,n+".mp3")}})}function o(){document.querySelectorAll("[dblc-action='playSongDblC']").forEach((function(e){if(!e.querySelector("[role='download-song']")&&e.querySelector("[role='play-song']")){var o=e.querySelector("[role='play-song']").parentNode,n=o.cloneNode(!0),r=n.children[0];r.innerHTML="<i class='fa fa-download'></i>",r.setAttribute("role","download-song"),r.setAttribute("style","padding-left: 5px;"),r.setAttribute("download-link",r.getAttribute("play-link")),r.removeAttribute("play-link"),r.removeAttribute("action"),r.addEventListener("click",t),e.insertBefore(n,o.nextElementSibling)}}))}waitForKeyElements("button[role='play-song']",(()=>{o(),e=new MutationObserver(((e,t)=>{waitForKeyElements("button[role='play-song']",o())}));let t=document.querySelector("[role='browse-pages']");e.observe(t,{childList:!0})}))}();
