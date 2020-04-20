// ==UserScript==
// @name          Nyantube
// @namespace     m3tior.github.io
// @description	  Changes the Youtube progress bar to Nyan Cat.
// @author        Ruby Allison Rose (AKA: M3TIOR)
// @homepage      https://github.com/m3tior/userscripts
// @include       https://www.youtube.com/watch?*
// @run-at        document-start
// @version       1.0.0
// ==/UserScript==

/**
*
*  Base64 decode
*  http://www.webtoolkit.info/
*  Modified to suit my needs for binary decoding.
*
**/
const Base64 = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	decode : (input) => {
	    let output = [];
	    let chr1, chr2, chr3;
	    let enc1, enc2, enc3, enc4;
	    let i = 0;

			// sanitizer
	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	    while (i < input.length) {
	        enc1 = this._keyStr.indexOf(input.charAt(i++));
	        enc2 = this._keyStr.indexOf(input.charAt(i++));
	        enc3 = this._keyStr.indexOf(input.charAt(i++));
	        enc4 = this._keyStr.indexOf(input.charAt(i++));

	        chr1 = (enc1 << 2) | (enc2 >> 4);
	        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	        chr3 = ((enc3 & 3) << 6) | enc4;

	        output.push(chr1);

	        if (enc3 != 64) output.push(chr2);
	        if (enc4 != 64) output.push(chr3);
	    }

	    return output;
	},
};

(function() {
  'use-strict';

	// Base 64 encoded Nyan Cat GIF
	const gif64 = [
		"R0lGODlhIQAVAMIGAAAAAP8zmZmZmf+Z///Mmf///6KakaKakSH/C05FVFNDQVBFMi4wAw",
		"EAAAAh/hFDcmVhdGVkIHdpdGggR0lNUAAh+QQJAQAHACwAAAAAIQAVAAADnHi6C/4wOkYr",
		"IDjrjUH9FzaMZElm3seE5hCMb9mpKwG3+ECk9HHlI8dN55mofjmAQACQOZYpiAJZiimhpy",
		"tzCi3aksvuMxy9Pr4ukzbMhjbM1Oq63eaNf7GStjDnu98OaGpkWkp3FnFpA0ojdGFBICJ5",
		"QQKNZlCVi5EiLYUSfxRnHCiOZCCEEqkSR10+oFxbZjRSPkahRrY9ursKCQAh+QQJAQAHAC",
		"wAAAAAIQAVAAADnXi6C/4wOkYrIDjrjUH9FzaMZElm3seE5hCMb9mpKwG3+ECk9HHlJIdr",
		"tFNMQDYgQCAAnDzLJrIVG0SbRAdT6uP9lNvmIwxlpr5D0zXMLosdSdNrzWYbybZq6Vqg95",
		"kNUWgtV1pmYoArcHJBAiN1WyNIeYSOA02HmJIWGTmFEmYgIRwokFs8K2YSq6wqgj6hFK+v",
		"rkddqIFntj28vQkAIfkECQEABwAsAAAAACEAFQAAA514utz+0IFJq51Rks2730C2ANxgnu",
		"jJhSJJpENgyigoHuQM7wPBZjmeaRIz+RSYR5AHEAgAqlDzqXylaIPp0zhxUjXCrPdJGf8Y",
		"S+xJO26fkUuUjN1ujyov9dpboPedOGxxKVpdTk2GOF4UVidYTSZ1XiZwGC5FhAKRU5yaA1",
		"UbTIsXh0ouHyuSixCIF66vEZyKX2ilsqxJgW+VvAcJACH5BAkBAAcALAAAAAAhABUAAAOf",
		"eLrc/tCBSaudUZLNu99AtgDcYJ7oyYUiSaRDYMooKB7kDO8DwWY5nmkSM/kUmEeQBxAIAK",
		"pQ86l8pWiD6dM4cVI1wqz3SRn/GEvsSTtun3ET61XcrjtH05x67S2wBX53OGZyMFpdTk2I",
		"g2Rxc0MCJnZOJowsLkUpTZJ5iZEDSD8uhSiHF4lKox8gk6gSiRexshB5lq9UtbRJcG+hl7",
		"sJACH5BAkBAAcALAAAAAAhABUAAAOeeLrc/tCBSaudUZLNu99AtgDcYJ7oyYUiSaRDYMoo",
		"KB7kDO8DwWY53mCi64UwkOAOIBAAapPmr6E80ZhSFdapqHRfvK2T0pTiyhVwLCUuu7lRdN",
		"XafrtZFeeLhtoW2n9mDBRqbHJoY4JUhWtDAiZ2ZSZTIxuNJ0yQWJuPQxIujJNyFoojhB8r",
		"kWgSoxeuFw+bZ1xUZrJJSDi5g0gUDQkAIfkECQEABwAsAAAAACEAFQAAA514utz+0IFJq5",
		"1Rks2730C2ANxgnujJhSJJpENgyigoHuQMD1NKhBhIbscTCAAx0w9gZGmIxaaK2Rw5hyga",
		"tUkxVnFfLGzrLYe5k5fuRDabWWTxKbAttO1fHDVHQ20nXkyARw0UamMCJm5eJk4MclqJA0",
		"dNlY0PLkkpfxd5jy6Hm4uBmEegHyAXFKVoqq6EQlV7ErKehUGrEkF6jgcJADs="
	].join("");

	// Transforms the gif Base64 string into a byte array in memory
	const gifBytes = new Uint8Array(Base64.decode(gif64));
	// Changes the byte array to a readable Blob object with mimetype
	const gifBlob = new Blob([gifBytes.buffer], {type: "image/gif"});
	// Adds a URL to access the image with.
	const gifURL = URL.createObjectURL(gifBlob);


	// This is the CSS for controling youtube's bar display.
	const css = (`
		.ytp-play-progress {
			padding: 2.5px 1px;
			top: -2px;
			background: -webkit-gradient(
				linear,
				left top,
				left bottom,
				color-stop(0, red),
				color-stop(17%, #f90),
				color-stop(33%, #ff0),
				color-stop(50%, #3f0),
				color-stop(67%, #09f),
				color-stop(83%, #63f)
			);
		}
		.ytp-scrubber-container {
			background: url(${gifURL}) no-repeat;
			background-size: 36px;
			width: 40px;
			height: 24px;
			margin-top: -4px;
		}
		.ytp-scrubber-container:hover {
			background-size: 40px;
			margin-top: -6px;
			margin-left: -2px;
		}
		.ytp-scrubber-button {
			display: none;
		}
	`)
		// Removes all tabs
		.replace(/\t/g, "")
		// And replaces newlines with spaces because the CSS3 parsers
		// in certain browsers may need whitespace after properties.
		.replace(/\n/g, " ");

	if (GM_addStyle != undefined) {
		GM_addStyle(css);
	} else if (PRO_addStyle != undefined) {
		PRO_addStyle(css);
	} else if (addStyle != undefined) {
		addStyle(css);
	} else {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			heads[0].appendChild(node);
		} else {
		// no head yet, stick it whereever
			document.documentElement.appendChild(node);
		}
	}
})();
