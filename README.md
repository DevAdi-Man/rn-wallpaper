# @velocity-stack/rn-wallpaper

A React Native module for setting device wallpapers on Android using Nitro Modules for high performance native integration.

## Features

- Set wallpaper for home screen, lock screen, or both
- Built with Nitro Modules for optimal performance
- TypeScript support
- Android only (iOS doesn't support external apps setting wallpapers)
- Promise-based API

## Installation

```bash
npm install @velocity-stack/rn-wallpaper
```

### Android Setup

No additional setup required for Android.

## Usage

```typescript
import { HybridWallpaper, WallpaperLocation } from '@velocity-stack/rn-wallpaper';

// Set home screen wallpaper
await HybridWallpaper.setWallpaper('https://example.com/image.jpg', WallpaperLocation.HOME);

// Set lock screen wallpaper
await HybridWallpaper.setWallpaper('https://example.com/image.jpg', WallpaperLocation.LOCK);

// Set both screens
await HybridWallpaper.setWallpaper('https://example.com/image.jpg', WallpaperLocation.BOTH);

// Check if wallpaper is supported
const isSupported = HybridWallpaper.isWallpaperSupported();

// Check if setting wallpaper is allowed
const isAllowed = HybridWallpaper.isSetWallpaperAllowed();
```

## API Reference

### Methods

#### `setWallpaper(uri: string, location: WallpaperLocation): Promise<void>`

Sets the device wallpaper from a given URI.

- `uri`: Image URL or local file path
- `location`: Where to set the wallpaper (HOME, LOCK, or BOTH)

#### `isWallpaperSupported(): boolean`

Returns whether wallpaper functionality is supported on the current device.

#### `isSetWallpaperAllowed(): boolean`

Returns whether the app has permission to set wallpapers.

### Enums

#### `WallpaperLocation`

```typescript
enum WallpaperLocation {
  HOME = 0,  // Home screen only
  LOCK = 1,  // Lock screen only
  BOTH = 2   // Both screens
}
```

## Example

Check out the complete example in the `WallpaperExample` directory:

```typescript
import { HybridWallpaper, WallpaperLocation } from '@velocity-stack/rn-wallpaper';

const setWallpaper = async () => {
  try {
    await HybridWallpaper.setWallpaper(
      'https://example.com/wallpaper.jpg',
      WallpaperLocation.BOTH
    );
    console.log('Wallpaper set successfully!');
  } catch (error) {
    console.error('Failed to set wallpaper:', error);
  }
};
```

## Permissions

### Android

Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.SET_WALLPAPER" />
```

### iOS

No special permissions required (wallpaper functionality not available on iOS).

## Development

```bash
# Install dependencies
npm install

# Build the module
npm run build

# Run linting
npm run lint

# Run example app
cd WallpaperExample
npm install
npm run android # or npm run ios
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Dev Adi](https://github.com/DevAdi-Man)

## Issues

Report issues at: https://github.com/DevAdi-Man/react-native-wallpaper/issues
