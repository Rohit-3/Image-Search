# App Icon Conversion Instructions

## Quick Conversion Methods

### Method 1: Online Converter (Easiest)
1. Go to https://cloudconvert.com/svg-to-png
2. Upload `client/public/app-icon-1024.svg`
3. Set output size to 1024x1024 pixels
4. Convert and download
5. Save as `client/public/app-icon-1024.png`

### Method 2: Using Inkscape (Free, Open Source)
```bash
# Install Inkscape first, then:
inkscape client/public/app-icon-1024.svg --export-filename=client/public/app-icon-1024.png --export-width=1024 --export-height=1024
```

### Method 3: Using ImageMagick
```bash
# Install ImageMagick first, then:
convert -background none -size 1024x1024 client/public/app-icon-1024.svg client/public/app-icon-1024.png
```

### Method 4: Using GIMP/Photoshop/Figma
1. Open the SVG file in your image editor
2. Set canvas size to 1024x1024 pixels
3. Export as PNG
4. Save as `client/public/app-icon-1024.png`

## Verification
- File must be exactly 1024x1024 pixels
- Format must be PNG
- File should be under 1MB (Facebook requirement)

