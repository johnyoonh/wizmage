# Wizmage - Intelligent Media Hider

**Wizmage** is a powerful Chrome extension designed to help you focus by hiding images and videos on websites. It replaces distracting media with a subtle placeholder pattern, speeding up your browsing and reducing visual clutter.

## Key Features

*   **Smart Hiding**: Automatically hides images and background images across the web.
*   **Toggle Modes**:
    *   **Global Toggle**: Switch media on/off for all tabs.
    *   **Per-Tab Control**: Use the "Pin" feature to independently pause blocking for a specific tab.
*   **Granular Exclusions**:
    *   **Exclude Videos**: Choose to always allow videos while hiding other images.
    *   **Exclude Images**: Choose to always allow images (useful if you only want to block videos or background styles).
*   **Exclude Lists**: Whitelist specific domains to always show media on your favorite sites.
*   **Hover to Reveal**: Simply hover your mouse over a blocked element to temporarily reveal it.
*   **Performance**: Lightweight and fast, enhancing page load times by preventing unnecessary media rendering.

## default Keyboard Shortcuts

*   **`Ctrl + Shift + H`** (or `Command + Shift + H` on Mac): Quickly toggle media showing/hiding globally.
    *   *Note: You can customize this shortcut in your browser's extension settings (`chrome://extensions/shortcuts`).*

## controls

### Popup Menu
*   **Show/Hide Media**: The main button controls the global state.
*   **Pin Icon (`📍`)**: Located to the left of the main button. Click to pause blocking **only for the current tab**.
*   **Exclude Videos**: Check this to keep videos visible everywhere.
*   **Exclude Images**: Check this to keep images visible everywhere.

## Installation

1.  This extension can be downloaded from the Chrome Web Store here [Wizmage on Chrome Web Store](https://chrome.google.com/webstore/detail/wizmage-image-hider/ifoggbfaoakkojipahnplnbfnhhhnmlp?hl=en).

## Development

### Build Instructions
The project uses TypeScript. To build the project locally:

1.  Navigate to the `src` directory.
2.  Install dependencies (if any).
3.  Run TypeScript compiler:
    ```bash
    tsc
    ```

### Project Structure
*   `js.ts`: Main content script handling media detection and hiding logic.
*   `service_worker.js`: Background worker managing settings persistence and message broadcasting.
*   `popup.htm/js/css`: The popup user interface and logic.

