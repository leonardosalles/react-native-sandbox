import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RenderBox } from "../components/render-box";
import { RenderStats } from "../components/render-stats";

// @ts-expect-error experimental API do React 19.2
import { startActivity } from "react";

export default function App() {
  const [logs, setLogs] = useState<string[]>([]);

  const log = (msg: string) => {
    setLogs((prev) => [msg, ...prev.slice(0, 5)]);
  };

  const handleActivity = (mode: "user" | "background" | "transition") => {
    const start = performance.now();
    startActivity(`render-${mode}`, { mode }, () => {
      log(`Started ${mode} activity @ ${start.toFixed(1)}ms`);
      const delay =
        mode === "background" ? 1200 : mode === "transition" ? 600 : 200;
      setTimeout(() => {
        const end = performance.now();
        log(`Finished ${mode} activity (${(end - start).toFixed(1)}ms)`);
      }, delay);
    });
  };

  const engine = (global as any).HermesInternal
    ? "Hermes"
    : Platform.OS === "web"
    ? detectWebEngine()
    : "JSC";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0e1014" }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          padding: 24,
          gap: 16,
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "600" }}>
          Cross-Renderer Inspector
        </Text>

        <Text style={{ color: "#9ca3af" }}>Engine: {engine}</Text>

        <RenderStats />

        <View style={{ flexDirection: "row", gap: 8, marginVertical: 12 }}>
          {(["user", "background", "transition"] as const).map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => handleActivity(mode)}
              style={{
                backgroundColor:
                  mode === "user"
                    ? "#5dade2"
                    : mode === "background"
                    ? "#48c9b0"
                    : "#f4d03f",
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#0e1014", fontWeight: "600" }}>
                Start {mode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <RenderBox color="#5dade2" delay={0} />
        <RenderBox color="#48c9b0" delay={1000} />
        <RenderBox color="#f4d03f" delay={2500} />

        <View
          style={{
            marginTop: 24,
            backgroundColor: "#111827",
            borderRadius: 8,
            padding: 12,
            width: "100%",
          }}
        >
          <Text style={{ color: "#9ca3af", marginBottom: 4 }}>
            Recent activity log:
          </Text>
          {logs.map((msg, i) => (
            <Text key={i} style={{ color: "#e5e7eb", fontSize: 13 }}>
              {msg}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function detectWebEngine() {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "V8 (Chrome)";
  if (ua.includes("Firefox")) return "SpiderMonkey";
  if (ua.includes("Safari")) return "JavaScriptCore (Safari)";
  return "Unknown";
}
