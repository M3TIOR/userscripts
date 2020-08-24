// ==UserScript==
// @name         MonsterKitty - Scratching Post
// @namespace    https://m3tior.github.io/
// @version      0.3
// @description  Adds download buttons and funcitonality to monstercat.com/browse
// @author       M3TIOR
// @match        https://www.monstercat.com/browse*
// @grant        GM_xmlhttpRequest
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://raw.githubusercontent.com/eligrey/FileSaver.js/master/FileSaver.min.js
// @require      https://raw.githubusercontent.com/Stuk/jszip/master/dist/jszip.min.js
/*// require      https://raw.githubusercontent.com/aadsm/jsmediatags/master/dist/jsmediatags.min.js*/
// ==/UserScript==
(function(){'use strict';var Srip=function(event){var btn=event.target.parentNode;var ddl=btn.getAttribute("download-link");var file_name=btn.getAttribute("artists-title")+" - "+btn.getAttribute("title");GM_xmlhttpRequest({method:"GET",url:ddl,overrideMimeType:"text/plain; charset=x-user-defined",onload:function(xhr){var r=xhr.responseText;var data=new Uint8Array(r.length);for(var i=0;i<r.length;i++)data[i]=r.charCodeAt(i);var blob=new Blob([data],{type:"audio/mpeg"});saveAs(blob,file_name+".mp3");}});};var Arip=function(element){};var Prip=function(element){};var observe=function(target){var observer=null;var promise=new Promise(resolve=>{observer=new MutationObserver(function(mutations){resolve(true);});}).then(function(value){observer.disconnect();});observer.observe(target,{childList:true});return promise;};var UpdateDOM=function(){document.querySelectorAll("[dblc-action='playSongDblC']").forEach(function(song){if(song.querySelector("[role='download-song']"))return;if(!song.querySelector("[role='play-song']"))return;var playbtn=song.querySelector("[role='play-song']").parentNode;var buttonC=playbtn.cloneNode(true);var button=buttonC.children[0];button.innerHTML="<i class='fa fa-download'></i>";button.removeAttribute("action");button.setAttribute("role","download-song");button.setAttribute("style","padding-left: 5px;");button.setAttribute("download-link",button.getAttribute("play-link"));button.removeAttribute("play-link");button.onclick=Srip;song.insertBefore(buttonC,playbtn.nextElementSibling);});};var ManageDOM=async function(){while(true){UpdateDOM();var screen_update=observe(document.querySelector("[role='browse-pages']"));await screen_update;}};var one=false;waitForKeyElements("button[role='play-song']",function(e){if(!one){one=true;ManageDOM();}});})();
