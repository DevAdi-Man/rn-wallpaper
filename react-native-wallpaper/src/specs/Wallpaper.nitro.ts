import type { HybridObject } from 'react-native-nitro-modules'

export enum WallpaperLocation {
    HOME = 0,
    LOCK = 1,
    BOTH = 2,
}

export interface Wallpaper extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
    setWallpaper(uri: string, location: WallpaperLocation): Promise<void>
    isWallpaperSupported(): boolean
    isSetWallpaperAllowed(): boolean
}
