// ==UserScript==
// @name         Gmail Backgroundify!
// @namespace    https://m3tior.github.io/
// @version      0.1
// @description  Adds the ability to use external photos as backgrounds for gmail themes
// @author       Ruby Allison Rose
// @match        https://mail.google.com/mail/u/*
// @grant        GM_addValue GM_getValue
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

	// await everything necessary and schedule DOM manager
	waitForKeyElements("div[style*='background-image']",function(e){
		// *should be the background pane
		var bgpane = document.querySelector("div[style*='background-image']")
		bgpane.style.backgroundImage = "url('https://i.imgur.com/Yr32yur.gif')"
	});
})();
