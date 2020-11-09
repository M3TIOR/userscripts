// ==UserScript==
// @name         UnicodeMap Character Continuity
// @namespace    m3tior.github.io
// @description  Shift + Up == Next, Shift + Down == Previous Individual Character
// @homepage     https://github.com/m3tior/userscripts
// @author       Ruby Allison Rose (AKA: M3TIOR)
// @match        https://unicodemap.org/details/*
// @version      1.0.0
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	const windowPathSegments = window.location.pathname.split("/");
	let unicodeDecimalValue;

	if (windowPathSegments[2].startsWith("0x"))
		unicodeDecimalValue = parseInt(windowPathSegments[2], 16);
	else
		unicodeDecimalValue = parseInt(windowPathSegments[2]);

	document.addEventListener("keyup", (e) => {
		if (e.shiftKey && e.key === "ArrowUp") { // up
			unicodeDecimalValue++;
			windowPathSegments[2] = unicodeDecimalValue.toString(10);
			window.location.pathname = windowPathSegments.join("/");
		}
		else if (e.shiftKey && e.key === "ArrowDown") { // down
			unicodeDecimalValue--;
			windowPathSegments[2] = unicodeDecimalValue.toString(10);
			window.location.pathname = windowPathSegments.join("/");
		}
	});
})();
