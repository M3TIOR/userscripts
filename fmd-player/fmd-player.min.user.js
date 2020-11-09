// ==UserScript==
// @name Float My Damn Player!
// @namespace m3tior.github.io
// @version 1.0.1
// @description Adds a native PIP button to html-5 video players.
// @homepage https://github.com/m3tior/userscripts
// @author Ruby Allison Rose (aka: M3TIOR)
// @match https://www.watchcartoononline.io/*
// @grant none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==
!function(){function e(e){let t=document.createElement("button");t.style.position="absolute",t.style.zIndex=9999,t.dataset.injected="true",t.innerHTML="pip",t.addEventListener("click",(t=>{t.target.disabled=!0;try{console.log(e.requestPictureInPicture()),e.disabled=!1}catch(e){}finally{t.target.disabled=!1}})),e.insertAdjacentElement("beforebegin",t)}"pictureInPictureEnabled"in document?document.pictureInPictureEnabled?waitForKeyElements("iframe, video",(()=>{Array.from(document.getElementsByTagName("video")).forEach((t=>e(t))),new MutationObserver(((t,n)=>{Array.from(document.getElementsByTagName("video")).forEach((t=>{t===document.pictureInPictureElement&&"true"!=t.previousSibling.dataset.injected&&e(t)}))})).observe(document.body,{childList:!0,subtree:!0})})):console.warn("The Picture-in-Picture Web API is disabled."):console.warn("The Picture-in-Picture Web API is not available.")}();
