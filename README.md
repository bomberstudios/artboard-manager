# Sketch Artboard Manager

This plugin automatically arranges the position of all Artboards in your Sketch document, to snap them to rows & columns.

![](https://user-images.githubusercontent.com/3832/28533105-3a1586ca-709c-11e7-8544-87d2bb0ad4f1.gif)

It’s still a work in progress (the plugin is optimised for iPhone-sized Artboards, and won't really work for anything else) but it’ll get better 🤞.

## Installation

- [Download the latest release](https://github.com/bomberstudios/artboard-manager/releases/latest), unzip and double click on the .sketchplugin file.

## Usage

Once the plugin is installed, Artboards will be arranged automatically when moved or resized.

If, for some reason, you want to arrange your Artboards manually, you can choose the Artboard Manager › Arrange Artboards menu option.

## Configuration

You can tweak some of the settings by opening Plugins › Artboard Manager › Settings:

- **Horizontal Space** is the amount of pixels you want to have between your Artboard columns. The default is 50.
- **Vertical Space** is the amount of pixels you want to have between your Artboard rows. The default is 100.
- **Rename Artboards**: if enabled, the plugin will rename _all_ Artboards in the current page when arranging the layout, so handle it with care :)
- **Arrange on Add**: if enabled, the Artboards will be automatically arranged when a new Artboard is added to the canvas.

## TODO

- Arrange artboards on artboard creation & deletion (right now they’re arranged on move and resize)
- Ability to enable the plugin per document / page
- Ability to rename Artboards automatically based on multiple criteria
