# Sketch Artboard Manager

This plugin automatically arranges the position of all Artboards in your Sketch document, to snap them to rows & columns.

![](https://user-images.githubusercontent.com/3832/28533105-3a1586ca-709c-11e7-8544-87d2bb0ad4f1.gif)

It’s still a work in progress (for one, it doesn’t even have an easy way to change the config…) but it’ll get better 🤞.

## Installation

- Visit the page for [the latest release](https://github.com/bomberstudios/artboard-manager/releases/latest) and click the link named "To install: download this file, unzip and double click on the .sketchplugin"

## Usage

Once the plugin is installed, Artboards will be arranged automatically when moved or resized.

If, for some reason, you want to arrange your Artboards manually, you can choose the Artboard Manager › Arrange Artboards menu option.

## Configuration

You can tweak some of the settings by searching for this bit of code and editing it:

```javascript
var config = {
  renameArtboards: false,
  snapDistance: 400,
  gridHorizontalSpace: 50,
  gridVerticalSpace: 500,
  artboardBasenames: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
};
```

- If you set `renameArtboards` to `true`, the plugin will rename _all_ artboards in the current page, so handle it with care :)

## TODO

- Arrange artboards on artboard creation & deletion (right now they’re arranged on move and resize)
- UI for editing preferences
