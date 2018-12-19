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

// Copyright 2018 Ruby Allison Rose
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.

(function() {
	'use strict';

	var Srip = function(event){ // rips button contents
		var btn = event.target.parentNode;
		var ddl = btn.getAttribute("download-link");
		var file_name = btn.getAttribute("artists-title") + " - " + btn.getAttribute("title");
		// WHAT A PAIN THIS THING IS... SO JANK... thx https://github.com/greasemonkey/greasmonkey/issues/1834
		GM_xmlhttpRequest({
			method: "GET",
			url: ddl,//"https://s3.amazonaws.com/data.monstercat.com/blobs/"+ddl.split("/")[4],
			overrideMimeType: "text/plain; charset=x-user-defined",
			onload: function(xhr){
				var r = xhr.responseText;
				var data = new Uint8Array(r.length);
				for (var i = 0; i < r.length; i++) data [i] = r.charCodeAt(i);
				var blob = new Blob([data], {type:"audio/mpeg"});
				saveAs(blob, file_name+".mp3");
			}
		});
	};
	var Arip = function(element){ // rips album contents
		// TODO
	};
	var Prip = function(element){ // rips current page contents
		// TODO
	};

	var observe = function(target){
		var observer = null;
		var promise = new Promise(resolve => {
			observer = new MutationObserver(function(mutations) {
				resolve(true);
			});
		}).then(function(value){
			observer.disconnect();
		});
		observer.observe(
			target, {childList: true} // only need childlist in this case
		);
		return promise;
	};

	var UpdateDOM = function(){
		document.querySelectorAll("[dblc-action='playSongDblC']").forEach(function(song){		// for each song on the screen
			if (song.querySelector("[role='download-song']")) return;							// if we haven't already made a play button for it.
			if (!song.querySelector("[role='play-song']")) return;                              // skip special releases
			var playbtn = song.querySelector("[role='play-song']").parentNode;					// store the play button we're going to grab data from
			var buttonC = playbtn.cloneNode(true);												// copy the info of our play button table element into a new one
			var button = buttonC.children[0]; 													// focus on the button
																								// clear it's contents but preserve attributes
			//button.innerHTML="<svg><use xlink:href=\"#download-btn-svg\"></use></svg>"		// and add the download button in.

			/* XXX:
			 *		ok, so actually, monstercat.com as of now uses fontawesome.io so I didn't have to make a download button...
			 */
			button.innerHTML="<i class='fa fa-download'></i>";									// start by creating the download button.
			button.removeAttribute("action");													// remove the action trigger for monstercat's javascript
			button.setAttribute("role", "download-song");										// change the role so we can find processed elements later.
			button.setAttribute("style", "padding-left: 5px;");                                 // add some padding to improve usability
			button.setAttribute("download-link", button.getAttribute("play-link"));				// switch the play-link attribute to download-link
			button.removeAttribute("play-link");												// cleanup for download-link \ rmove old play-link attribute
			button.onclick = Srip;																// set the onclick for the button so it'll trigger
			//button.addEventListener("click", Srip);

			song.insertBefore(buttonC,playbtn.nextElementSibling);
		});
	};

	// Apperently, Tampermonkey's editor doesn't like this async syntax... too bad... it's just fine...
	var ManageDOM = async function(){
		// upkeep loop
		while (true){
			UpdateDOM();
			var screen_update = observe(document.querySelector("[role='browse-pages']"));
			await screen_update;
		}
	};

	var one=false; waitForKeyElements("button[role='play-song']",function(e){if (!one){ one=true; ManageDOM(); }}); // await everything necessary and schedule DOM manager
})();
