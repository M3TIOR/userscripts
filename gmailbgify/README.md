#Gmail Backgroundify!

This is a tiny userscript that adds the ability to use external pictures as
backgrounds in Gmail, instead of the locked down Gmail themes. This allows you
to use high-res pictures as well as Gifs for your backgrounds in the new Gmail
UI! The drawback is a slightly less stable load time as external site
dependencies such as ping, bandwidth, etc. are a newly introduced variable.
Also, the standard theme's 'text background', vignette, and blur features will
not work with this userscript because of an optimization path Gmail has taken.

***Currently, this App is still in production and on backlog. It does what
I want it to do on my end for now but still needs work. Below is how
I envision it to work once I'm done. It is nowhere near completion yet.
Please be patient and give me a little more time. >.> ***

### TODO:

 * [ ] Investigate InboxSDK for use within the add in for UI implementation
       and long term stability since Gmail's doctree is clobbered.

 * [ ] Implement external background button and basic URL link dialogue.

 * [ ] Implement preview window for external resource.

 * [ ] Implement previously used background memory and reuse using javascript
       local data API.

### EXTRA:

 * [ ] Find a way to force content to load over HTTPS always

 * [ ] Implement custom background blur slider

 * [ ] Implement custom background vignette slider

 * [ ] Investigate cross device background save feature using Google APIs

------

To register a background, simply go to the theme's panel and in the bottom
left corner next to the 'My Photos' button, there will be an 'External URL'
button. Upon clicking that button you will be directed to a preview window
with a black background and a URL window.

**INSERT IMAGE HERE**

Paste your URL into the window and you'll be presented with a live preview of
the background you wish to apply before selecting to do so.

**INSERT IMAGE HERE**

Upon clicking the 'Select' button, your background will be applied and
a new theme will appear in the themes menu featuring your background, but with
a URL watermark over top of it. If you ever change your theme and wish to
switch back, simply click on that watermarked version to do so. *Your external
themes will only be saved to the computer you're using. So if you switch
computers, you will not be able to access them and will have to recreate
the ones you wish to apply again.* 

***Please note! If you are using an animated Gif as opposed to a static frame,
the browser you're using has to render that Gif on top of the Gmail UI so
it will slow down your experience.***

With that said, I hope this treats you well.

Lots of love,
*M3ITOR*
