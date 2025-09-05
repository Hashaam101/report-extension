# Report Cleaner Chrome Extension

A modern Chrome extension to clean up report pages, remove overlays, expand info tabs, and prepare reports for printing or PDF export with custom branding.

## Features
- Removes modal/auth overlays and expands all info tabs on supported report pages.
- Removes or blanks out specific sections as needed.
- UI popup with two main actions:
  - **Activate**: Cleans up the current report page.
  - **Prepare for Print**: Replaces all instances of "OWNER" with "TABLETURNERR", updates the document title, and opens the print dialog. Includes a tip for hiding the URL in the PDF.
- Modern, responsive popup UI with custom-styled buttons.

## Installation
1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the `report-extension` folder.
5. The extension icon will appear in your Chrome toolbar.

## Usage
1. Navigate to a supported report page.
2. Click the extension icon to open the popup.
3. Click **Activate** to clean up the page.
4. Click **Prepare for Print** to:
   - Replace all "OWNER" text with "TABLETURNERR".
   - Update the document title and path.
   - Open the print dialog. For a clean PDF, uncheck "Headers and footers" in Chrome's print dialog.

## Customization
- To change the branding or text replacements, edit the logic in `popup.js`.
- To adjust the UI, modify `popup.html` and its embedded CSS.

## Development
- All extension logic is in `popup.js`.
- The popup UI is in `popup.html`.
- The extension manifest is in `manifest.json`.

## License
MIT License

---

**Tip:** For best results when saving as PDF, uncheck "Headers and footers" in the Chrome print dialog under More Settings.
