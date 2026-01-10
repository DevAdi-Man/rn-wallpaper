package com.margelo.nitro.wallpaper

import android.app.WallpaperManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.Build
import com.margelo.nitro.NitroModules
import com.margelo.nitro.core.Promise
import java.net.URL

class HybridWallpaper: HybridWallpaperSpec(){

    private val context get() = NitroModules.applicationContext ?: throw Error("Android content is null")

    override fun setWallpaper(
        uri: String,
        location: WallpaperLocation
    ): Promise<Unit> {
        return Promise.async {
            try {
                val wallpaperManager = WallpaperManager.getInstance(context)
                val bitmap = downloadBitmap(uri)

                // Apply the wallpaper
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                    val flags = when (location){
                        WallpaperLocation.HOME -> WallpaperManager.FLAG_SYSTEM
                        WallpaperLocation.LOCK -> WallpaperManager.FLAG_LOCK
                        WallpaperLocation.BOTH -> WallpaperManager.FLAG_SYSTEM or WallpaperManager.FLAG_LOCK

                        else -> WallpaperManager.FLAG_SYSTEM
                    }
                    wallpaperManager.setBitmap(bitmap, null, true, flags)
                } else {
                    // Fallback for very old Android versions (sets both usually)
                    wallpaperManager.setBitmap(bitmap)
                }

            }catch (e: Exception){
                throw Error(e.message)
            }
        }
    }

    override fun isWallpaperSupported(): Boolean {
        return try {
            WallpaperManager.getInstance(context).isWallpaperSupported
        } catch (e: Exception) {
            false
        }
    }

    override fun isSetWallpaperAllowed(): Boolean {
        return try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                WallpaperManager.getInstance(context).isSetWallpaperAllowed
            } else {
                true // Older versions generally allowed it if supported
            }
        } catch (e: Exception) {
            false
        }
    }

    private fun downloadBitmap(uri: String): Bitmap {
        return if (uri.startsWith("http") || uri.startsWith("https")) {
            val url = URL(uri)
            BitmapFactory.decodeStream(url.openConnection().getInputStream())
        } else if (uri.startsWith("file://")) {
            val path = uri.replace("file://", "")
            BitmapFactory.decodeFile(path)
        } else {
            BitmapFactory.decodeFile(uri)
        } ?: throw Error("Could not decode image from URI: $uri")
    }

}
