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
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve';
import userscript from './userscript-block.plugin.js';
import { terser } from 'rollup-plugin-terser';


// Internal Imports
//...

// Standard Imports
import fs from 'fs';



const plugins = [
	resolve({
		extensions: ['.user.js'],
	}),
	terser({
		compress: {
			// prevent terser from destroying our "use-strict" directive
			directives: false,
			dead_code: true,
			hoist_props: true,

			passes: 2 // just double check everything.
		},
		mangle: {
			toplevel: true,
			module: true,
		},
		format: {
			// Prevents the UserScript header from being removed.
			comments: /(==\/?UserScript==)|(@.+)/,
		},
	}),
	userscript({
		// downloadRequires: true,
	}),
]

// TODO: automate build step.
export default fs.readdirSync(__dirname, {
	withFileTypes: true,
	encoding: "utf8",
})
	// only target directories within this one.
	.filter((p)=>p.isDirectory() && !p.name.startsWith(".") && p.name !== "node_modules")
	.map((p)=>{ p = p.name;
		return {
			input: `${p}/${p}.user.js`,
			output: {
				file: `${p}/${p}.min.user.js`,
				// IIFE format should add a 'use-strict' directive automagically.
				// format: 'iife',
			},
			plugins,
		}
	});
