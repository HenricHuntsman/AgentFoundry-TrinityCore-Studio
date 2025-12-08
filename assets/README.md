# TrinityCore Studio Icon Placeholder

This directory should contain application icons for packaging.

## Required Icons

### Windows
- `icon.ico` - Application icon for Windows builds (256x256 recommended)

### Linux  
- `icon.png` - Application icon for Linux builds (512x512 recommended)

## Icon Design Guidelines

The icons should represent:
- TrinityCore branding
- Server/management theme
- Professional appearance
- Clear at small sizes

## Generating Icons

You can create icons from a source image using tools like:
- ImageMagick: `convert icon.png -resize 256x256 icon.ico`
- Online converters
- Icon design software

## Temporary Solution

For development and testing, you can:
1. Create simple placeholder icons
2. Use existing WoW-related imagery (with appropriate licensing)
3. Commission custom icon design

The build will use default Electron icons if these files are missing.
