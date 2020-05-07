# Simple JS Height Chart

This is a simple tool for creating a chart comparing the heights of multiple characters side-by-side. The chart is viewable in a web browser, can use custom images, and allows showing hiding and rearranging characters at will.

## Setup

Download this project as a .zip file, and unpack it on your computer. Open "index.html" in a web browser to open the chart. Click the gray rectangle in the top-left corner to show options for showing and hiding characters.

To set up your own characters, you will neet to use a text editor (for example the free Notepad++) to open "index.html" and edit the source code for that file. You should see a few blocks that look like:

```html

<img 
    data-model-id="..."
    data-model-name="..."
    data-model-height="..."
    data-model-box-top="..."
    data-model-box-bottom="..."
    data-model-box-left="..."
    data-model-box-right="..."
    data-model-show="..."
    src="... .png"
/>

```

These are where the data for the characters are stored. You can edit the values between the `"` marks to use your own custom characters, and you can copy and paste blocks to add more characters.

The important attributes for the purposes of this project are as follows:

- `data-model-id`: This should be a unique number for each block.
- `data-model-name`: This is the name of the character as it will appear in the menu.
- `data-model-height`: This is the canonical height of the character *in meters*, independent of the size of the image.
- `data-model-box-...`: (Optional) These define a box within the image that bound the character. These values must be given as pixel coordinates in the image. If any of these are omitted, the corresponding edge of the image is used instead.
- `data-model-show`: (Optional) If this is `true`, the character is shown by default when the chart is loaded. If it is omitted or `false`, then the character will not be shown when the chart is loaded.
- `src`: The file name of the image to be used. See "best practices" below.

Near the bottom of the page there is another block with no values, set between a `<!--` and `-->`. This doesn't do anything, and is provided for your convenience so you can easily copy and paste more blocks into your chart. Also, don't forget to include the `<img` and `/>` when you copy and paste the block.

You can feel free to modify and share the files of this project, provided you follow the terms of the MIT License, as outlined in the "LICENSE" file.

## Best practices

I have only tested this with Firefox and Chromium. I can't vouch for compatibility with other web browsers.

Specifying file paths can get complicated in HTML, so to avoid the need to deal with that, simply copy the images you want to use into the same folder as "index.html". This will also make it so you can share that folder or host it on a website and it should work the same.

Charts will look best if you use images that have transparent backgrounds. It may also be a good idea to make parts of characters translucent if those parts might block the view of other characters in the chart.

Avoid using too high resolution images in the chart, especially for charts with many characters. Trim off empty space around the character.

The free program GIMP can be used to add transparency, resize, and measure pixel coordinates on images.

## Third-party assets

The file "jquery-3.5.1.slim.min.js" is a release of jQuery, copyright JS Foundation and other contributors, https://js.foundation/ . It is distributed under the terms of the MIT License.

The files "sample1.png", "sample2.png", and "sample3.png" are courtesy of the Openclipart project https://openclipart.org/, and are distributed under the terms of the CC0 License.
