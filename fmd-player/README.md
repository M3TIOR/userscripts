# Float My Damn Player!

The following is a pain in my butt. Let me tell you a story of how my life
got turned upside down by a pretty little pop-out button. My problem started
when I migrated operating systems from Linux Mint to Gallium OS. Now, the reason
I decided to migrate is because I'm running a small Chromebook as my daily
driver and Linux Mint is roughly 4 ~ 5 Gigs of old python nonsense and bloat.
I don't have space for that. I have about 12 Gigs to work with. Give or take
a few for the systemd suite, my favorite editors and utilities. **Linux Mint had
me working with ***700 MEGABYTES*** of space.** That is, after all my favorite software
packages were installed; and if you understand how Ext filesystems work, you'll
understand exactly why I was shitting bricks twice a day. System instability
is fun. Basically when Ext filesystems run out of space, they aren't really out
of space. I have the kernel telling me I have 700Mb left, and it really means I
have more like four... maybe five. That doesn't bode well for applications that
need space to cache data or my swap file.

So anyway, I migrated to Gallium OS. It's great since I removed the old default
desktop, installed i3-wm and a better i3-status bar thanks to the Gallium OS
system utilities and [this dude][dude]. It's really great for productivity
when that productivity doesn't entail anything too resource intensive. That
said, It has one oddball issue, it doesn't like videos.

Ok, ok, so it's not just videos. More like anything fullscreen. Games, apps,
whatever. For some reason they loose frames whenever they're put in fullscreen
mode. And I'm not talking some negligible 2-3 frames here and there. I'm talking
half if not more. Anything I try and do fullscreen looks like stop-motion. Now,
don't quote me on this because I haven't actually dug into any debug logs yet.
I'm much too lazy and have too many other projects to attend to ATM. But
Gallium OS implemented some graphics driver optimizations for my
specific model: the ACER CB3-111. Like I said, I have no way to verify this
besides a vague memory of something about said optimization introducing a weird
bug. But never the less! I'm concluding that said bug is what's causing my
issue.

To implement a solution, I turned to the popout-player Chrome App. Since I use
i3-wm, when I pop-out a video, all I have to do is press ALT+W and I have a
dedicated fullscreen window minus the tabs at the top and status bar at the
bottom for whatever video I'm watching. It works for most sites. But there are
a few who decide to do shady crap with cross origin loading in iframes and
a whole bunch of nonsense where I digest my favorite content from. This is
a temporary implementation of my solution to that problem.

I plan on migrating and integrating this solution over into my clone of the popout-player
Chrome App eventually, since that's a lot more versatile and even has support for legacy
versions of chrome and chromium. It's even pre-configured for multi-locale support!

Anyway, to all you peeps who need this like me:

Much love,
*M3TIOR*
