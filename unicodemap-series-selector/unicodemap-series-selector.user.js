// ==UserScript==
// @name         UnicodeMap Series Selector
// @namespace    m3tior.github.io
// @version      1.0.0
// @description  Helps you select ranges of characters on the unicode map
// @homepage     https://github.com/m3tior/userscripts
// @author       M3TIOR (aka: Ruby Allison Rose)
// @match        https://unicodemap.org/range/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
	'use strict';

	// Element storage objects.
	let start = null;
	let end = null;


	function getRange(){
		const range = [];
		for (let [e,v]=start; v <= end[1]; e=e.nextElementSibling, v++)
			range.push(e.children[0].children[0].innerText);

		return range.join("");
	}


	// Create UI Elements.
	const copyBtn = document.createElement("button");
	copyBtn.innerHTML = "Copy Range";
	copyBtn.style.cssText = "position: fixed; top: 0px; right: 0px; z-index: 3000;";
	document.body.appendChild(copyBtn);


	copyBtn.addEventListener('click', ()=>{
		if (!(start && end)) return; // exit early if we have no selection to copy.
		const result = getRange();
		// Use the new emca5 navigator.clipboard feature. I don't feel like including
		// unnecessary code in this plugin. Must be as fast as possible.
		navigator.clipboard.writeText(`Range ( ${start[1].toString(16)} - ${end[1].toString(16)} ) --> ${result}`);
		// GM_setClipboard(text, "text");
	});

	// Add onclick logic to each character button.
	const characterButtons = document.querySelectorAll(".characterGrid li");
	// very jank memory CPU saver micro optimization.
	[].forEach.call(characterButtons, (element)=> {
		element.addEventListener('click', ()=> {
			const thisValue = parseInt(element.textContent.slice(1), 16);

			if (start && end)
				for (let [e,v]=start; v <= end[1]; e=e.nextElementSibling, v++)
					e.style.backgroundColor="inherit";

			if (start == null || thisValue < start[1]) start = [element, thisValue];
			if (end == null || thisValue > end[1]) end = [element, thisValue];
			
			if ( thisValue > start[1] && thisValue < end[1] ) {
				const distanceToStart = thisValue - start[1];
				const distanceToEnd = end[1] - thisValue;
				if (distanceToStart <= distanceToEnd) start = [element, thisValue];
				else end = [element, thisValue];
			}

			for (let [e,v]=start; v <= end[1]; e=e.nextElementSibling, v++)
				e.style.backgroundColor="magenta";
		});
	});
})();
