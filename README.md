# White Text to Gray - Tampermonkey Script

A lightweight userscript that automatically converts harsh white text to softer gray across all websites, reducing eye strain and improving reading comfort.

## Features

- 🎨 Automatically detects and converts white/near-white text to soft gray (#dddddd)
- ⚡ Real-time monitoring of dynamically loaded content
- 🌐 Works on all websites
- 💪 Lightweight with minimal performance impact
- 🔄 Handles both static and dynamic content

## Installation

1. Install a userscript manager:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Safari, Edge)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge)

2. Click on the userscript manager icon in your browser

3. Select "Create a new script"

4. Copy and paste the script code

5. Save (Ctrl+S or Cmd+S)

## How It Works

The script performs three main operations:

### 1. Color Detection
```javascript
const isWhite = (r, g, b) => r > 250 && g > 250 && b > 250;
```
Identifies colors where all RGB values exceed 250 (white or near-white).

### 2. Element Processing
- Scans each element's computed text color
- Parses RGB/RGBA values using regex
- Replaces white text with gray (#dddddd)

### 3. Dynamic Monitoring
- Uses `MutationObserver` to watch for DOM changes
- Automatically processes newly added elements
- Ensures consistent color conversion across dynamic content

## Configuration

### Customize the Target Color

To change which colors are converted, modify the `isWhite` function:
```javascript
// More strict (only pure white)
const isWhite = (r, g, b) => r === 255 && g === 255 && b === 255;

// More lenient (lighter grays too)
const isWhite = (r, g, b) => r > 240 && g > 240 && b > 240;
```

### Customize the Replacement Color

Change the replacement color in the `processEl` function:
```javascript
el.style.color = '#cccccc'; // Lighter gray
el.style.color = '#e0e0e0'; // Even lighter
el.style.color = '#d0d0d0'; // Custom shade
```

## Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## Performance

The script is optimized for performance:
- Runs at `document-start` for early execution
- Uses efficient DOM querying
- Minimal style recalculations
- No external dependencies

## Troubleshooting

### Script not working on a specific site

Some websites may use:
- CSS-in-JS with inline styles that override the script
- Shadow DOM (not accessible to the script)
- `!important` declarations

### Performance issues

If you experience slowdowns:
1. Check browser console for errors
2. Temporarily disable other userscripts
3. Consider adding site exclusions in Tampermonkey settings

## Exclusions

To exclude specific websites, modify the `@match` directive:
```javascript
// Exclude specific domain
// @exclude      https://example.com/*

// Or use more specific matching
// @match        https://*/*
// @exclude      https://excluded-site.com/*
```

## Contributing

Suggestions and improvements are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## License

This script is provided as-is for personal use. Feel free to modify and distribute.

## Author

Created to reduce eye strain from bright white text on dark backgrounds.

## Version History

- **1.0** - Initial release
  - Basic white to gray conversion
  - MutationObserver for dynamic content
  - Universal site compatibility

## Alternatives

If this script doesn't meet your needs, consider:
- Browser dark mode extensions
- OS-level night mode settings
- Custom CSS with Stylus/Stylish
