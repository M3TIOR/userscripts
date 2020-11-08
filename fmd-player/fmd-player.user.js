// ==UserScript==
// @name         Float My Damn Player!
// @namespace    m3tior.github.io
// @version      1.0.0
// @description  Adds a native PIP button to html-5 video players.
// @author       Ruby Allison Rose (aka: M3TIOR)
// @match        https://www.watchcartoononline.io/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
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

	// Save a global refference for our observer so it doesn't get trash collected
	// after the configuration function exits.
	var observer = null;

	function injectButton(video){
		let pipButton = document.createElement("button");
		pipButton.style.position = "absolute";
		pipButton.style.zIndex = 9999;
		pipButton.dataset.injected = "true";

		// I may decide to make this an svg l8r.
		pipButton.innerHTML = "pip";

		pipButton.addEventListener("click", (event) => {
			event.target.disabled = true;

			try {
				console.log(video.requestPictureInPicture());
				video.disabled=false;
			}
			catch(error) {
				// TODO: Show error message to user.
			}
			finally {
				event.target.disabled = false;
			}
		});

		video.insertAdjacentElement("beforebegin", pipButton);
	}


	if (!('pictureInPictureEnabled' in document)) {
		console.warn('The Picture-in-Picture Web API is not available.'); return;
	}
	else if (!document.pictureInPictureEnabled) {
		console.warn('The Picture-in-Picture Web API is disabled.'); return;
	}

	waitForKeyElements("iframe, video",()=>{
		// For standalone videos we don't have to wait for DOM mutations.
		let norecur = Array.from(document.getElementsByTagName("video"));
		norecur.forEach((video) => injectButton(video));

		observer = new MutationObserver((mutations, observer) => {
			let recur = Array.from(document.getElementsByTagName("video"));

			recur.forEach((video)=>{
				if ((video !== document.pictureInPictureElement) ||
					(video.previousSibling.dataset.injected == "true")){
					return;
				}

				injectButton(video);
			});
		});

		observer.observe(document.body, {childList: true, subtree: true});

		//observer.disconnect(); // Don't need this yet.
	});
})();
