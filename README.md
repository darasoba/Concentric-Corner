# Concentric Corners Figma Plugin

A Figma plugin to automatically apply concentric corner radii to a nested layer based on its parent's corner radius and padding.

## How it Works

The "Concentric Corners" plugin calculates and applies the appropriate corner radius to a child layer to make it appear concentric with its parent container. This is particularly useful for creating buttons, cards, and other UI elements where you want consistent, mathematically-correct corner radii on nested elements.

The formula used for each corner is:

`ChildCornerRadius = ParentCornerRadius - Padding`

Where `Padding` is the shortest distance from the child's corner to the parent's corresponding corner (either vertical or horizontal padding).

## How to Use

1.  **Select a Layer**: Select a single layer that is inside a parent frame or another layer with a corner radius.
2.  **Run the Plugin**: Go to `Plugins > Concentric Corner` and click "Apply Concentric Corners".
3.  **Done**: The plugin will automatically calculate and apply the correct corner radii to the selected layer.

## Example

If you have a parent frame with a `40px` corner radius and a child layer inside it with `20px` padding on all sides, the plugin will set the child's corner radius to `20px` (`40px - 20px`).

## Installation

1.  Clone this repository or download the source code.
2.  Open Figma, go to `Plugins > Development > New Plugin...`.
3.  Click "Link existing plugin" and choose the `manifest.json` file from this repository.
4.  The plugin will now be available in your `Plugins > Development` menu.

## Development

This plugin is built with TypeScript.

-   Run `npm install` to install dependencies.
-   Run `npm run watch` to compile TypeScript to JavaScript on file changes.

## Contributing

Contributions are welcome! If you have a feature request, bug report, or want to contribute to the code, please feel free to open an issue or submit a pull request on the GitHub repository.
