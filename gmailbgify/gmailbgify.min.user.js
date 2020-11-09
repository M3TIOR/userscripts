// ==UserScript==
// @name Gmail Backgroundify!
// @namespace https://m3tior.github.io/
// @version 1.0.2
// @description Adds the ability to use external photos as backgrounds for gmail themes
// @homepage https://github.com/m3tior/userscripts
// @author Ruby Allison Rose
// @match https://mail.google.com/mail/u/*
// @grant GM_addValue GM_getValue
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==
waitForKeyElements("div[style*='background-image']",(function(e){document.querySelector("div[style*='background-image']").style.backgroundImage="url('https://i.imgur.com/Yr32yur.gif')"}));
