# SquareCue

by Adam Fanello -
Copyright 2020,2024 -
[GNU v3 licensed](LICENSE)


SquareCue is a tool for writing square dance singing call cue sheets
in HTML, in a way that removes duplicated effort and adds consistency,
and helps you keep your timing while performing.

This is done simply with a CSS stylesheet and helper Javascript.

## Features

- One file per song, with cues for any dance level
- Karaoke-style highlighting with the beat of the music
- Consistent styling across all of your cue sheets
- Easy, concise markup syntax
- Compatible with all browsers and HTML viewers

## Background

I was making cue sheets in a word processor. Each song had a document.
In each document was a whole cue sheet for each level of dance I'd made choreography for.
I liked to highlight the actual cues. Then I wanted to add little beat markers to help
me keep time.
Adding these meant editing every document, every level, nearly every line,
and fighting the word processor that always handled the font transitions 
exactly opposite of what I wanted...

    Argh!!!  

That was it. I switched to markup. I developed SquareCue so that I could eliminate duplication,
stop fighting with a word processor, 
and change my styles once and have _everything_ update automatically!

Since the initial inception, styling for the singing lyrics, music-only measures,
and a karoake-style measure highlight tracking have been added.

## How to Use

### Online

You can use it live, *online*, at https://kernwig.github.io/squarecue/.

The downside of using SquareCue *online* is that you must have an Internet connection.

### Offline

To use *offline*, just copy it! This is just a collection of files that
you can open and use in any browser.

Navigate to the SquareCue [source repository](https://github.com/kernwig/squarecue)
and click the green `Clone or download` button. From there you can download this all
as a `zip` file. Unzip it on your computer and double-click the `index.html` file to
view this in your web browser.

SquareCue includes everything needed, so that you don't need an Internet connection when
calling.

The downside of using SquareCue *offline* is that you must keep copying it periodically
to get the latest content.

### Dance Level & Karaoke Tracking

At the top of each cue sheet, is a header with some interactive elements.

- `Level` lets you choose the dance level. Only levels for which someone has
  added to the cue sheet will be available.
- `BPM` shows the default beats-per-minute for the song; this is used for tracking.
  Adjust the number if you slow the song in your music player.
- `Track` button will start or resume the karaoke tracking feature. It will start
  either on measure #1 of the opener, or resume from where last paused.
- `Pause` button takes the place of `Track` while tracking is running. Click it to
  pause the karaoke tracking.
- `Reset` button resets the tracking and "run time" timer so that the next time you
  click on `Track`, it'll start back at the beginning.

It is up to you to get the timing correct. The cue sheet can't _hear_ the music playing,
so you must click the `Track` button at the precise beginning of the first measure of song.
There is ofter a call before the opening actually begins. This will show with no
beat mark and you must call it before the first beat and clicking on `Track`.


## Contributing

If you just want to make a change for *your own use*, or to track your own cue sheets,
fork this repository in GitHub and add your own changes on top of it. You can merge
any changes in future versions of SquareCue into your repository.

Should you wish to contribute changes back to SquareCue, please
[open an issue](https://github.com/kernwig/squarecue/issues) first and start a discussion
there about what you want to do. If we agree, you can proceed with a pull request.

To contribute cue sheets for more songs, you may go straight to making a
[pull request](https://github.com/kernwig/squarecue/pulls) with the addition. Don't forget
to add the new song to [index.html](index.html) (alphabetized list).

## Examples

I commit my own [cue sheets](sheets) right into this repository - feel free to use them yourself!
Use them as complete examples.

## Cue Sheet syntax

To start a new cue sheet for a song, copy one of the existing cue sheets in the [sheets](sheets)
directory or copy the [template.html](sheets/template.html) file.
You may name it however you like, as long as it ends with `.html`.

### Parts of the cue sheet

Cue sheets are HTML files. If you don't have a basic understanding of HTML, please 
[read this primer](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics) first.

It may be hard to wrap your head around the syntax just be reading the descriptions below. Instead,
open one of the [example cue sheets](sheets) and use this guide to understand it.
 
You can write cue sheets in a simple text editor (ex: Windows Notepad), but for a far
better experience I recommend a program built for this. 
[Visual Studio Code](https://code.visualstudio.com) is probably the most popular HTML editor
right now. It's free, and will also help you deal with GitHub.

#### &lt;head&gt;

The `<head>` contains two items of interest:

- `<title>` is what shows in your browser or tab title bar when this cue sheet is displayed.
  It is often cut off, so include the most relevent information first.
- `<link>` pulls in the `squarecue.css` file. This is what tells the browser how to display the special SquareCue
  elements of the page. Its `href` attribute points to this `css` file relative to where the `html` page is. If
  you organize your files differently than this repository, you may have to change this.

#### &lt;header&gt;

The full song title and label information goes in here, so that it shows nice and large at the top of the page.
This element is also important because SquareCue will display the dance level selector under this.
No `<header>`, no level selector.

#### &lt;bpm&gt;

In order to enable the karaoke-style measure tracking, you must specify the
normal beats-per-minute of the song track. Simply but the number in this tag, like
`<bpm>126</bpm>`.

When using the cue sheet, you may slow the song down in your music player and adjust
this number on the page to match. However, the number specified here is always the default.

#### &lt;opener&gt; &lt;figure&gt; &lt;figure1&gt; &lt;figure2&gt; &lt;figure12&gt; &lt;middle&gt; &lt;figure3&gt; &lt;figure4&gt; &lt;figure34&gt; &lt;closer&gt; &lt;tag&gt; blocks

As you guessed, these designate the opener, figure, middle (aka: break), closer, and optional tag parts of the dance.

The figure variants with numbers after them lets you denote which figure you are dealing with, and are recommended
over the generic `<figure>` element. The special `<figure12>` may be used when figure #1 and #2 have identical choreography.
Similar for `<figure34>` for figure #3 and figure #4.

#### &lt;m&gt; and variants for measures

SquareCue defines measures of eight beats of music. Inside the blocks for each part of a song, you typically
have eight measure elements, adding up to 64 beats of music. (All square dance songs have 64 beats of _music_ per
block - but you usually want fewer beats of _cues_.) 

There are several different measure elements you can use in your cue sheet:
- `<m>` is the generic measure tag, displayed without any beat count and will never be highlighted by the tracking feature.
- `<m1>` is a measure tag that displays a `1` at the beginning of the line, to designate beat #1.
- `<m2>` and `<m9>` both are measure tags that display a `9` at the beginning of the line, to designate the starting beat.
- `<m3>` and `<m17>` both are measure tags that display a `17` at the beginning of the line, to designate the starting beat.
- `<m4>` and `<m25>` both are measure tags that display a `25` at the beginning of the line, to designate the starting beat.
- `<m5>` and `<m33>` both are measure tags that display a `33` at the beginning of the line, to designate the starting beat.
- `<m6>` and `<m41>` both are measure tags that display a `41` at the beginning of the line, to designate the starting beat.
- `<m7>` and `<m49>` both are measure tags that display a `49` at the beginning of the line, to designate the starting beat.
- `<m8>` and `<m57>` both are measure tags that display a `57` at the beginning of the line, to designate the starting beat.

Weather you use the single increment numbers or explicit beat number variant is up to you. If you have lines that
don't match up properly to a beat mark, feel free to leave the beat mark off by using the generic `<m>`.

When used within the special `<figure12>` or `<figure34>` block, you may also mark the measure
with the specific `figure1`, `figure2`, `figure3` or `figure4` *attribute*. This will ensure that
a measure only highlights on the particular measure during tracking. This is useful for the common
case of singing on figure #3, but a call to launch into the closer on figure #4.
Example:

```html
    <m8 figure3>(Figure 3) <lyric>Here on Gilligan's Isle</lyric></m8>
    <m8 figure4>(Figure 4) <cue>Sides Face Grand Square</cue></m8>
```

##### music

Use the `music` attribute on measures that you want to highlight as musical.
It's particularly useful for a measure when instrumental music is playing
but with nothing to call or sing. You still want something shown for timing.

The most common use then, is: `<m8 music></m8>`, which will display 🎶 on the line.

#### &lt;c&gt; &lt;cue&gt; &lt;Cue&gt;

Use the `<cue>` tag (and variants) to highlight in yellow an actual square dance call, or cue, within a measure.
`<c>` is just a shorter variant of `<cue>` to save some typing. `<Cue>` will automatically capitalize the text
within thus

`    <m><Cue>Sides face, grand square</Cue></m>`

Will display <span style="background-color: yellow">`Sides Face, Grand Square`</span>

#### &lt;l&gt; &lt;lyric&gt; &lt;lyrics&gt;

Use the `<lyric>` tag (and variants) to give the song lyrics a different style from the rest of the words.
`l` and `lyrics` are simply shorter and longer variants that do the same thing.

#### abc abca abcb abcc basic hc ssd ms plus a1 a2

These can be used as elemental blocks or attributes on a measure to indicate content to shown _only_ at the
given dance level. This allows one cue sheet to have different choreography for diffent dancers.

The meaning of each:
- `abc` - ABC Common
- `abca` - ABC A-dance
- `abcb` - ABC B-Dance
- `abcc` - ABC C-Dance
- `basic` - Basic
- `hc` - Handicapable
- `ssd` - Sustainable Square Dance
- `ms` - Mainstream
- `plus` - Plus
- `a1` - A1
- `a2` - A2/Advanced

These may be used as elements to enclosing other content, such as this different choreography for mainstream vs ABC:
``` 
    <ms>
        <m33><cue>Square Thru go 3/4</cue> around</m33>
        <m41><cue>Swing</cue> the girl <cue>Promenade</cue> 'round town</m41>
    </ms>
    <abc>
        <m33><cue>Left Allemande</cue> your corner, come on back</m33>
        <m41><cue>Swing</cue> the girl <cue>Promenade</cue> 'round town</m41>
    </abc>
``` 

You may put anything in these blocks, such as some level-specific notes under your `<header>` like:
```
  <header>SC-100 My Jolly Song</header>
  <basic>
    <p>This choreography is all Basic 1, except for the inclusion of <cue>Wheel Around</cue>.</p>
  </basic>
```

They may also be used as attributes on measure tags, such as:
``` 
    <m8 ms><c>Sides Face, Grand Square</c></m8>
    <m8 abcb>Join hands, <c>Circle Right</c></m8>
```

*Warning:* You must use the block style at least once in your cue sheet for the level-selector to appear for it.
If you only use attributes in your measures, just toss in some empty level blocks like `<ms></ms><abc></abc>`. 

### &lt;script&gt;

The html cue sheet ends with `<script src="../code/squarecue.js"></script>` and the closing `</body></html>`.

This script is what adds the dance level selector on the top of the page. Thus if you have `ms` and `plus` in
your cue sheet, a dropdown will appear under the song title at the top of the cue sheet to let the caller choose
between `Mainstream` and `Plus` and will show only the selected content. As with the `<link>` in the header,
modify the `src` attribute if you put the `squarecue.js` file someplace else.

If you don't use any dance level selectors in your cue sheet, this `<script>` isn't needed.

Embedding SquareCue
-------------------

If you want to use SquareCue with for a song that you distribute, you can embed the
support code within the `html` file to maintain the simplicity if a single file cue sheet.

First, replace the `<link ...>` in the `<head>` with `<style> </style>`, and copy everything out of
[the stylesheet](code/squarecue.css) into the space in the element.

Second, if using dance level selectors, replace the `<script></script>` at the end of the file to remove the
`src` attribute and instead copy the content of [the script](code/squarecue.js) in between `<script>` and `</script>`.

Please consider instead just contributing your cue sheet to this project.

## index.html

The [index.html](index.html) file in this repository serves as an table of contents
for the [cue sheets](sheets). The calle can open this file in a browser and then navigate
to the various [cue sheets](sheets).
