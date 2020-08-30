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
// ==/UserScript==
!function(){"use strict";waitForKeyElements("div[style*='background-image']",(function(e){document.querySelector("div[style*='background-image']").style.backgroundImage="url('https://i.imgur.com/Yr32yur.gif')"}))}();
