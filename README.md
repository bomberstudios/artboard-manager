# Sketch Artboard Manager

This plugin automatically arranges the position of all Artboards in your Sketch document, to snap them to rows & columns.

![](https://user-images.githubusercontent.com/3832/28533105-3a1586ca-709c-11e7-8544-87d2bb0ad4f1.gif)

<a href="https://www.paypal.me/bomberstudios/5">
<img width="160" height="41" src="https://raw.githubusercontent.com/DWilliames/PDF-export-sketch-plugin/master/images/paypal-badge.png">
</a>

## Installation

- [Download the latest release](https://github.com/bomberstudios/artboard-manager/releases/latest/download/artboard-manager.sketchplugin.zip), unzip and double click on the .sketchplugin file.

## Usage

Once the plugin is installed, Artboards will be arranged automatically when added, moved, or resized.

If you want to disable the plugin temporarily, you can toggle it using the **Auto Mode** menu option (shortcut: `Ctrl Shift A`). The setting is stored in the app's preferences, so it will persist between launches.

If, for some reason, you want to arrange your Artboards manually, you can choose the Artboard Manager › Arrange Artboards menu option.


## Configuration

You can tweak some of the settings by opening Plugins › Artboard Manager › Settings:

- **Horizontal Space**: the amount of pixels you want to have between your Artboard columns. The default is 50.
- **Vertical Space**: the amount of pixels you want to have between your Artboard rows. The default is 100.
- **Rename Artboards**: if enabled, the plugin will rename _all_ Artboards in the current page when arranging the layout, so handle it with care!
- **Arrange Symbols**: if enabled, Artboards which are masters for Symbols are also arranged. Defaults to off.
- **Arrange Symbols Page**: if enabled, Artboards in the Symbols page will be arranged when you move them. It defaults to off, in case you’re using something like [Symbol Organiser](https://github.com/sonburn/symbol-organizer).
- **Exclude Pattern**: if your Artboard names start with this pattern, they will be ignored by the plugin. Defaults to `--`.


## TODO

- Ability to enable the plugin per document / page
- Ability to rename Artboards automatically based on multiple criteria
