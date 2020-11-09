# No Touchy! (Don't Touch My Tabs!)
**A userscript rewrite by M3TIOR**

In case you don't know what this does, the original work can be found here:
[don't touch my tabs](dtmtorigin). The original implementation sought to
protect users from bad acting Javascript and Web Pages that use child link
spawning to take control of the parent window, since the legacy web allowed
child tabs access to it's spawner. There's an optional WC3 standard `rel`
tag addition that can be used to protect users from this type of web page
control technique. This tag is `noopener`. Unfortunately, because it's optional,
this means we have to automate the process of injecting it ourselves unless we
want to disable Javascript outright.

The original implementation only protected tabs that were available after
the document was initially loaded. It didn't protect users from client scripts
injecting other links that may be malicious. Even though web developers don't
usually put links in their javascript that could be malicious in some way,
for technologies like search engines and social media pages, this feature
could be a good one to have. So I added it! I also added script defer,
by default. Which prevents scripts from loading before we've had a chance to
protect links so they can't `.click()` any and open a tab that takes
control of the main window immediately. It also prioritizes DOM loading
and prevents scripts from blocking parsing of the DOM. This means *faster
page loads* ***yay***!


### In The Future
I'm hoping to add the ability for users to be able to toggle the script
relinquish event at either `DOMContentLoaded` or `load` since the later
would enable prioritization of CSS loading and parsing as well, which could
be a nice feature to have since the infrastructure already exists.

I learned a whole heck of a lot about the MutationObserver API and
page loading while writing this so I think I can use that to remove a bunch
of dependencies from my other userscripts and make them more, well, useable.
But that's another goal for another day when I don't have more important things
to oversee. NOTE TO SELF (Make sure to use GM_addStyle for nyantube)

SHIT SHIT SHIT, not ten minutes after I made this I found out that `noreferrer`
is actually a [way better attribute to use](noreferrer). So that update will
be happening soon preferably.


Anyway, Till next time; Much love!
**M3TIOR**


#### NOTE:
I haven't done any memory or CPU profiling on this yet so it may slow down
web pages a bit since it uses a `MutationObserver` on the whole document.

[dtmtorigin]: https://addons.mozilla.org/en-US/firefox/addon/dont-touch-my-tabs/
[noreferrer]: https://www.w3.org/TR/referrer-policy/
