#include <jni.h>
#include "NitroWallpaperOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::wallpaper::initialize(vm);
}
