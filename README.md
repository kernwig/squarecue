# SquareCue

by Adam Fanello -
Copyright 2020 -
[GNU v3 licensed](LICENSE)

SquareCue is a simply a tool for writing square dance singing call cue sheets
in HTML, in a way that removes duplicated effort and adds consistency.

This is done simply with a CSS stylesheet and helper Javascript.

## Features

- One file per song, with cues for any dance level
- Consistent styling across all of your cue sheets
- Easy, concise markup syntax
- Compatible with all browsers and HTML viewers

## Background

I was making cue sheets in a word processor. Each song had a document.
In each document was a whole cue sheet for each level of dance I'd made choreography for.
I liked to highlight the actual cues. Then I wanted to add little beat markers to help me keep time.
Adding these meant editing every document, every level, nearly every line - and fighting the word processor
that always handled the font transitions exactly opposite of what I wanted...

    Argh!!!  

That was it. I switched to markup. I developed SquareCue so that I could eliminate duplication, stop fighting
with a word processor, and change my styles once and have _everything_ update automatically!

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
 
#### &lt;head&gt;

The `<head>` contains two items of interest:

- `<title>` is what shows in your browser or tab title bar when this cue sheet is displayed.
  It is often cut off, so include the most relevent information first.
- `<link>` pulls in the `squarecue.css` file. This is what tells the browser how to display the special SquareCue
  elements of the page. Its `href` attribute points to this `css` file relative to where the `html` page is. If
  you organize your files differently than this repository, you may have to change this.

#### &lt;h1&gt; header

The full song title and label information goes in here, so that it shows nice and large at the top of the page.
This element is also important because SquareCue will display the dance level selector under this. No `<h1>`, no
level selector.

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
- `<m>` is the generic measure tag, displayed without any beat count.
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

#### &lt;c&gt; &lt;cue&gt; &lt;Cue&gt;

Use the `<cue>` tag (and variants) to highlight in yellow an actual square dance call, or cue, within a measure.
`<c>` is just a shorter variant of `<cue>` to save some typing. `<Cue>` will automatically capitalize the text
within thus

`    <m><Cue>Sides face, grand square</Cue></m>`

Will display <span style="background-color: yellow">`Sides Face, Grand Square`</span>

#### abc abca abcb abcc basic ms plus a1 a2

These can be used as elemental blocks or attributes on a measure to indicate content to shown _only_ at the
given dance level. This allows one cue sheet to have different choreography for diffent dancers.

The meaning of each:
- `abc` - ABC Cor.
- `abca` - ABC A-dance
- `abcb` - ABC B-Dance
- `abcc` - ABC C-Dance
- `basic` - Basic
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

You may put anything in these blocks, such as some level-specific notes under your `<h1>` like:
```
  <h1>My Jolly Song - XX 100</h1>
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

## index.html

The [index.html](index.html) file in this repository serves as an table of contents
for the [cue sheets](sheets). The calle can open this file in a browser and then navigate
to the various [cue sheets](sheets).

## Installation

Just copy it! This isn't a program itself, just a stylesheet, script, and collection
of HTML files of cue sheets that I and other contributors have made.

Navigate to the SquareCue [source repository](https://github.com/kernwig/squarecue)
and click the green `Clone or download` button. From there you can download this all
as a `zip` file. Unzip it on your computer and double-click the `index.html` file to
view this in your web browser.

SquareCue includes everything needed, so that you don't need an Internet connection when
calling.

## Contributing

If you just want to make a change for *your own use*, or to track your own cue sheets,
fork this repository in GitHub and add your own changes on top of it. You can merge
any changes in future versions of SquareCue into your repository.

Should you wish to contribute changes back to SquareCue, please 
[open an issue](https://github.com/kernwig/squarecue/issues) first and start a discussion
there about what you want to do. If we agree, you can proceed with a pull request.

To contribute cue sheets for more songs, you may go straight to making a
[pull request](https://github.com/kernwig/squarecue/pulls) with the addition. Don't forget
to add the new song to [index.html](index.html).
 