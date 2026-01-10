import { NitroModules } from "react-native-nitro-modules";
import type { Wallpaper } from "./specs/Wallpaper.nitro";

export * from "./specs/Wallpaper.nitro";
export const HybridWallpaper = NitroModules.createHybridObject<Wallpaper>('Wallpaper')
