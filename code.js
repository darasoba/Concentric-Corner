// --- Show the Plugin UI ---
// This sets the size of the plugin window and shows the ui.html file.
figma.showUI(__html__, { width: 280, height: 328, title: "Concentric Corners", themeColors: true });

// --- Listen for Messages from the UI ---
figma.ui.onmessage = (msg) => {
    // Check if the message is to apply the corners
    if (msg.type === 'apply-corners') {
        applyConcentricCorners();
    }
};

/**
 * Main function to apply concentric corners to the selected layer.
 */
function applyConcentricCorners() {
    const selection = figma.currentPage.selection;
    const statusDiv = (text, isError = true) => figma.notify(text, { error: isError });

    // --- 1. Validate the User's Selection ---
    // Ensure exactly one item is selected.
    if (selection.length !== 1) {
        statusDiv("Please select a single layer.");
        return;
    }
    const child = selection[0];

    // Ensure the selected layer has a parent.
    const parent = child.parent;
    if (!parent || parent.type === 'PAGE') {
        statusDiv("Selected layer must be inside a parent frame.");
        return;
    }

    // Ensure both parent and child are node types that can have corner radius.
    if (!('cornerRadius' in child) || !('cornerRadius' in parent)) {
        statusDiv("Parent and child must be layers that support corner radius (e.g., rectangles, frames).");
        return;
    }

    // --- 2. Calculate the Concentric Corner Radii ---
    // Get the corner radius from the parent. It could be a single number or an object.
    const parentRadius = parent.cornerRadius;
    const parentTopLeft = typeof parentRadius === 'number' ? parentRadius : parent.topLeftRadius;
    const parentTopRight = typeof parentRadius === 'number' ? parentRadius : parent.topRightRadius;
    const parentBottomLeft = typeof parentRadius === 'number' ? parentRadius : parent.bottomLeftRadius;
    const parentBottomRight = typeof parentRadius === 'number' ? parentRadius : parent.bottomRightRadius;

    // Get the padding (distance) between the child and parent edges.
    const padTop = child.y;
    const padLeft = child.x;
    const padBottom = parent.height - (child.y + child.height);
    const padRight = parent.width - (child.x + child.width);

    // Calculate the new radius for each corner of the child.
    // The formula is: ParentRadius - Padding. We use Math.max to ensure it's not negative.
    const newTopLeft = Math.max(0, parentTopLeft - Math.min(padLeft, padTop));
    const newTopRight = Math.max(0, parentTopRight - Math.min(padRight, padTop));
    const newBottomLeft = Math.max(0, parentBottomLeft - Math.min(padLeft, padBottom));
    const newBottomRight = Math.max(0, parentBottomRight - Math.min(padRight, padBottom));

    // --- 3. Apply the New Radii to the Child Layer ---
    try {
        // We must assign each corner individually to the child.
        child.topLeftRadius = newTopLeft;
        child.topRightRadius = newTopRight;
        child.bottomLeftRadius = newBottomLeft;
        child.bottomRightRadius = newBottomRight;

        // --- 4. Provide Success Feedback ---
        statusDiv("🎉 Concentric corners applied successfully!", false);

    } catch (e) {
        // Catch any unexpected errors during property assignment.
        statusDiv("An unexpected error occurred.");
        console.error(e);
    }
}
