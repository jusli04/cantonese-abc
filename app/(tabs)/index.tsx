import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";

const arenaImage = require("../../assets/images/HKnight.png");

export default function HomeScreen() {
  const router = useRouter();

  // MVP local “player state”
  const trophies = 120;
  const arena = {
    id: 1,
    name: "Arena 1 — First Flights",
    min: 0,
    max: 300,
  };

  const progress = Math.min(
    1,
    Math.max(0, (trophies - arena.min) / (arena.max - arena.min))
  );
  const trophiesToNext = Math.max(0, arena.max - trophies);

  return (
    <View style={styles.container}>
      <View style={styles.arenaCard}>
        {/* Arena Art */}
        <View style={styles.arenaArtPanel}>
          <Text style={styles.arenaArtTitle}>ARENA 1</Text>
          <Text style={styles.arenaArtSub}>First Flights</Text>

          <View style={styles.arenaArtImageBox}>
            <Image source={arenaImage} style={styles.arenaArtImage} resizeMode="contain" />
            <Text style={styles.arenaArtCaption}>Intro Arena</Text>
          </View>
        </View>

        {/* Arena Info Row */}
        <View style={styles.arenaTopRow}>
          <View style={styles.passportIcon}>
            <Text style={styles.passportTextTop}>HKSAR</Text>
            <Text style={styles.passportTextMid}>PASSPORT</Text>
            <Text style={styles.passportTextBot}>香港</Text>
          </View>

          <View style={styles.arenaInfo}>
            <Text style={styles.arenaLabel}>CURRENT ARENA</Text>
            <Text style={styles.arenaName}>{arena.name}</Text>

            <View style={styles.trophyRow}>
              <Text style={styles.trophyEmoji}>🏆</Text>
              <Text style={styles.trophyText}>{trophies} trophies</Text>
              <Text style={styles.trophySmall}> · {trophiesToNext} to next arena</Text>
            </View>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>

        <Text style={styles.nextReward}>Next milestone at {arena.max} trophies</Text>
      </View>

      {/* Title */}
      <Text style={styles.gameTitle}>Cantonese ABC</Text>

      {/* Spacer pushes button down without weird compression */}
      <View style={{ flex: 1 }} />

      {/* Play */}
      <Pressable style={styles.playButton} onPress={() => router.push("/practice")}>
        <Text style={styles.playText}>PLAY</Text>
      </Pressable>

      {/* Bottom breathing room */}
      <View style={{ height: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#530000ff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    paddingTop: 100,
  },

  arenaCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    marginBottom: 22,
  },

  // Arena Art Panel
  arenaArtPanel: {
    width: "100%",
    borderRadius: 18,
    padding: 16,
    marginTop: 6,
    marginBottom: 22,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  arenaArtTitle: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },
  arenaArtSub: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 6,
    marginBottom: 12,
  },

  arenaArtImageBox: {
    height: 180,
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "#000",
    justifyContent: "flex-end",
    padding: 12,
  },

  // Fits ENTIRE image in box
  arenaArtImage: {
    width: "100%",
    height: "100%",
  },

  arenaArtCaption: {
    color: "rgba(255,255,255,0.95)",
    fontWeight: "900",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },

  // Info Row
  arenaTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  arenaInfo: {
    flex: 1,
    marginLeft: 14,
  },

  passportIcon: {
    width: 78,
    height: 78,
    borderRadius: 14,
    backgroundColor: "#7C0A0A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  passportTextTop: { color: "rgba(255,255,255,0.9)", fontSize: 10, fontWeight: "800" },
  passportTextMid: { color: "rgba(255,255,255,0.95)", fontSize: 11, fontWeight: "900", marginTop: 2 },
  passportTextBot: { color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: "700", marginTop: 2 },

  arenaLabel: { color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  arenaName: { color: "white", fontSize: 18, fontWeight: "900", marginTop: 4 },

  trophyRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  trophyEmoji: { fontSize: 16, marginRight: 6 },
  trophyText: { color: "white", fontWeight: "800" },
  trophySmall: { color: "rgba(255,255,255,0.65)", marginLeft: 6 },

  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
    marginTop: 14,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#FFD54A",
  },
  nextReward: { color: "rgba(255,255,255,0.6)", marginTop: 10, fontSize: 12 },

  // Title + button
  gameTitle: {
    color: "white",
    fontSize: 34,
    fontWeight: "900",
    marginTop: -550,
  },

  playButton: {
    backgroundColor: "#FFD54A",
    paddingVertical: 18,
    paddingHorizontal: 56,
    borderRadius: 24,
    marginTop: 50,
    alignSelf: "center",
  },
  playText: {
    fontSize: 26,
    fontWeight: "900",
    color: "#111",
    letterSpacing: 1,
  },
});
