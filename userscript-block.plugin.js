// Copyright (c) 2020 Ruby Allison Rose (aka. M3TIOR)
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


// External Imports
import meta from 'userscript-meta';

// Internal Imports
//...

// Standard Imports
import fs from 'fs';
import path from 'path';
import http from 'http';


export default function(options){
	let globalMetadataBlock = {};
	let newMetadataBlock = {};
	const defaults = {
		jsonfile: null,
		overrides: null,
		downloadRequires: false,
	};

	// do override defaults
	options = Object.assign(defaults, options);

	if (options.jsonfile != null){
		const jsondata = fs.readFileSync(path.resolve(options.jsonfile), {encoding: "UTF8"});
		// TODO: make more user-friendly by testing for improper objects.
		Object.assign(globalMetadataBlock, JSON.parse(jsondata));
	}

	if (options.overrides != null){
		Object.assign(globalMetadataBlock, options.overrides);
	}

	return {
		name: "userscript-block-plugin",
		transform: async(code, id)=>{
			// Ensure our file is a userscript.
			if (! id.endsWith(".user.js")) return;

			// Search for the header and footer to find our metadata block.
			const found = code.match(/\/\/ *==UserScript==(.||[\n])*==\/UserScript==/);
			if (found != null){
				const existingBlock = found[0];
				const initialMetadata = meta.parse(existingBlock);
				// Overwrite initial data.
				newMetadataBlock = Object.assign(initialMetadata, globalMetadataBlock);

				code = code.replace(existingBlock, "");
			}

			if (options.downloadRequires && typeof(newMetadataBlock.require) !== "undefined") {
				const requires = newMetadataBlock.require.map((url) => {
					return new Promise((resolve, reject) => {
						http.get(url, (res) => {
							const { statusCode } = res;
							const contentType = res.headers['content-type'];

							let error;
							// Any 2xx status code signals a successful response.
							if (statusCode >= 200 && statusCode < 300) {
								error = new Error('Request Failed.\n' +
							                    `Status Code: ${statusCode}`);
							}
							else if (!/^text\/(javascript|plain)/.test(contentType)) {
							  error = new Error('Invalid content-type.\n' +
							                    `Expected text/javascript or text/plain but received ${contentType}`);
							}

							if (error) {
							  // Consume response data to free up memory
							  res.resume();
								reject(error);
							  return;
							}

							res.setEncoding("utf8");
							let rawData = '';
							res.on('data', (chunk) => { rawData += chunk; });
							res.on('end', () => resolve(rawData) );
						});
					})
					.catch((error) => {
						console.error(error.message);
						return null;
					});
				});

				// squash async processes.
				for (index in requires) requires[index] = await requires[index];

				// this is cheating, uses the return value of push to fuel the post filter.
				const packages = [];
				requires.forEach((e, i) => {
					if (e != null)
						newMetadataBlock.requires[i] = packages.push(e);
				});

				newMetadataBlock.requires = newMetadataBlock.requires.filter((e) => typeof(e) !== 'string');

				code = "".concat(...packages, code);
			}

			return code;
		},
		banner: () => meta.stringify(newMetadataBlock),
	};
};
