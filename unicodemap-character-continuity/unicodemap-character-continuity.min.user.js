// ==UserScript==
// @name UnicodeMap Character Continuity
// @namespace m3tior.github.io
// @description Shift + Up == Next, Shift + Down == Previous Individual Character
// @homepage https://github.com/m3tior/userscripts
// @author Ruby Allison Rose (AKA: M3TIOR)
// @match https://unicodemap.org/details/*
// @version 1.0.0
// @grant none
// ==/UserScript==
!function(){const t=window.location.pathname.split("/");let n;n=t[2].startsWith("0x")?parseInt(t[2],16):parseInt(t[2]),document.addEventListener("keyup",(o=>{o.shiftKey&&"ArrowUp"===o.key?(n++,t[2]=n.toString(10),window.location.pathname=t.join("/")):o.shiftKey&&"ArrowDown"===o.key&&(n--,t[2]=n.toString(10),window.location.pathname=t.join("/"))}))}();
