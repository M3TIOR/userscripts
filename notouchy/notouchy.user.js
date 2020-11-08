// ==UserScript==
// @name         Don't Touch My Tabs! (M3TIOR's Implementation)
// @namespace    m3tior.github.io
// @version      1.0.0
// @description  Prevents unscrupulous web pages from taking control of your tabs.
// @author       M3TIOR
// @match        http://*/*
// @match        https://*/*
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==

(function(){
	"use-strict";

	// NOTE: 'a', 'area', and 'form's can all redirect you. Thus they must all be protected.
	const blacklist_tags = ["A", "AREA", "FORM"];
	const javascript_tags = [];
	// Aliasing this function makes things more readable, and could save CPU time.
	const forEach = Array.prototype.forEach;
	const flags = { loaded: false };
	let loadEvent = "DOMContentLoaded"; // hard-coded after DOM load for now.


	if (typeof(document.removeEventListener) == null) {
		console.warn("Your browser doesn't support 'removeEventListener', " +
		             "script loading optimization disabled.");
	}
	else {
	 // TODO: enable users to toggle between prioritizing CSS or JS loading
	 captureEventAsFlag(document, loadEvent, "loaded");
	 //captureEventAsFlag(document, "load");
	}


	function captureEventAsFlag(target, name, alias){
		flags[name] = function(event){
			const stored = alias || name;
			const listener = flags[stored];
			flags[stored] = true;
			target.removeEventListener(name, listener);
		};

		target.addEventListener(name, flags[stored]);
	}

	function relinquishScripts(event){
		// DOM fully loaded and parsed (excluding javascript that we've defered)

		// Disable script protection since it's no longer relevant, now
		// that we have every link protected via rel=noopener.
		script_observer.disconnect();
		// Inject previously halted scripts in order of execution.
		javascript_tags.forEach((tag) => {
			// ensures the element hasn't already been reinserted. Just in case this
			// somehow gets run twice even though it shouldn't with the current setup.
			if ( tag.parentNode!=null )
				document.head.appendChild(tag);
		});
	}

	function isTagAtRisk(node){
		// I know this looks like actual dog shit, but it allows the early falsy
		// exit, so it's more optimal than making it REALLY readable.
		// I think it's readable enough as is.
		return blacklist_tags.includes(node.nodeName) &&
			!(node.href === "javascript:void(0)" ||
				node.hostname === window.location.hostname) &&
					node.target === "_blank";
	}

	function fixLink(node){
		// protect against malformed / improper rel values.
		if (typeof(node.rel) === "string") {
			if (! node.rel.split(" ").includes("noopener") )
				node.rel = `${node.rel} noopener`.trim();
		}
		else {
			node.rel = 'noopener';
		}
	}

	function tagwrench(element){
		// Removes the target javascript element to prevent it
		// them from modifying the page content before we can add our rel=noopener
		// tags to each link. This prevents scripts from automagically
		// using the Element.click() method to control page to a volatile link.

		// NOTE:
		//    This doesn't delete the element structure, just removes it from the
		//    DOM (hopefully stopping the script before it can execute.)
		element.remove();

		const defer_equivalent_tag = document.createElement("link");
		defer_equivalent_tag.href = element.src;
		defer_equivalent_tag.rel = "preload"; // use the preload directive
		defer_equivalent_tag.as = "script"; // cache as a script for later execution

		// Not sure these conflict with <link> loading method so I'm disabling them.
		element.async=false;
		e.defer=false; // ---FOR NOW--- later this might get enabled to prioritize CSS

		// Just shove all concurrent preloaders into the head of the document.
		document.head.appendChild(defer_equivalent_tag);

		javascript_tags.push(element);
	}

	const script_observer = new MutationObserver((mutationList, observer)=>{
		// TODO: search for new / injected javascript elements
		mutationList
			.forEach((mutation) => {
				// NOTE: in HTML node.nodeName will always be uppercase
				if (mutation.type === "childList"){
					forEach.call(mutation.addedNodes, (node) => {
						if (node.nodeName === "SCRIPT") tagwrench(node);
					});
				}
			});
	});

	const link_observer = new MutationObserver((mutationList, observer)=>{
		mutationList.forEach((mutation) => {
			if (mutation.type === "childList") {
				// Same as SCRIPT tag handler.
				forEach.call(mutation.addedNodes, (node) => {
					if ( isTagAtRisk(node) ) fixLink(node);
				});
			}
			else if (mutation.type === "attributes") {
				// Skip processing of any element not in the whitelist below.
				const node = mutation.target;

				if ( isTagAtRisk(node) ) fixLink(node);
			}
		});
	});



	// Register JS injection watcher first, then parse pre-existing scripts so
	// there's no gap in the event loop that drops scripts through the cracks.
	// Then add the DOMContentLoaded event listener to add everything back in.
	// NOTE: May need to use a wait loop to prevent early DOMContentLoaded
	//       event firing before the event listener is registered.
	script_observer.observe(document, {
		childList: true,
		subtree: true,
	});

	// NOTE:
	//    getElementsByTagName is faster because it doesn't require parsing
	//    the input string as a query
	const initScripts = document.getElementsByTagName("SCRIPT");
	// This is actually much faster than my original unpack then call method.
	forEach.call(initScripts, tagwrench);

	// Almost forgot to add in the initial link corrections.
	const initLinks = forEach
		.call(document.querySelectorAll(blacklist_tags.join(",")), (node) => {
			if ( !(
						node.href === "javascript:void(0)" ||
						node.hostname === window.location.hostname
					) &&
					node.target === "_blank"
				){
				fixLink(node);
			}
		});

	// Since we don't have to worry about javascript injections at this time,
	// Just register the link_observer last. If we started it before cleaning
	// up the original links, it'd waste a fuck ton of CPU time.
	link_observer.observe(document, {
		childList: true,
		subtree: true,
		attributes: true,
		// We only need to ensure that rel=noopener is preserved
		attributeFilter: ["rel"],
	});


	if (typeof(flags.loaded) === "function") {
		flags.loaded(); // release initial event listener
		// Variable fallthrough permits this to work.
		let singlet = null;
		document.addEventListener(loadEvent, singlet = (event)=>{
			relinquishScripts(event);
			document.removeEventListener(loadEvent, singlet);
		});
	}
	else {
		relinquishScripts();
	}
})();
