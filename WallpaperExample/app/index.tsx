import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import { HybridWallpaper, WallpaperLocation } from '@velocity-stack/rn-wallpaper'
import { Image } from 'expo-image'
import { useState } from "react";

export default function Index() {
    const [loading, setLoading] = useState(false);

    const handleSetWallpaper = async (location: WallpaperLocation, locationName: string) => {
        try {
            setLoading(true);
            console.log(`Setting ${locationName} wallpaper...`);

            // 1. Call the Native Nitro Module
            await HybridWallpaper.setWallpaper("https://i.pinimg.com/1200x/e8/5d/47/e85d474bed6b0dfc1918815528492bd6.jpg", location);

            Alert.alert("Success", `${locationName} wallpaper updated successfully!`);
        } catch (e: any) {
            console.error(e);
            Alert.alert("Error", e.message || "Failed to set wallpaper");
        } finally {
            setLoading(false);
        }
    };
    return (
        < View style={styles.container} >
            <Text style={styles.title}>Nitro Wallpaper 🚀</Text>

            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: "https://i.pinimg.com/1200x/e8/5d/47/e85d474bed6b0dfc1918815528492bd6.jpg" }}
                    style={{ width: 300, height: 400, borderRadius: 16, margin: 16 }} />
                <Text style={styles.subtitle}>Preview Image</Text>
            </View>

            {
                loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
                ) : (
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Set Home Screen"
                            onPress={() => handleSetWallpaper(WallpaperLocation.HOME, "Home")}
                        />
                        <View style={{ height: 10 }} />
                        <Button
                            title="Set Lock Screen"
                            onPress={() => handleSetWallpaper(WallpaperLocation.LOCK, "Lock")}
                        />
                        <View style={{ height: 10 }} />
                        <Button
                            title="Set Both Screens"
                            onPress={() => handleSetWallpaper(WallpaperLocation.BOTH, "Both")}
                        />
                    </View>
                )
            }
        </View >);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  preview: {
    width: 150,
    height: 266, // 9:16 aspect ratio
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 12,
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  loader: {
    marginTop: 20,
  }
});
