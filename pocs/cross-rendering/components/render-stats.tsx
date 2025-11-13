import React from "react";
import { Platform, Text, View } from "react-native";
import { useRenderMetrics } from "../hooks/use-render-metrics";

export const RenderStats = () => {
  const { fps, avgRender, commits } = useRenderMetrics();
  const isHermes = !!(global as any).HermesInternal;
  const engine = isHermes
    ? "Hermes"
    : Platform.OS === "web"
    ? detectWebEngine()
    : "JSC";

  return (
    <View
      style={{
        width: "90%",
        backgroundColor: "#1c1f26",
        padding: 16,
        borderRadius: 12,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 16 }}>
        Platform: {Platform.OS === "web" ? "🌐 Web" : "📱 iOS/Android"}
      </Text>
      <Text style={{ color: isHermes ? "#4ADE80" : "#FACC15" }}>
        Engine: {engine}
      </Text>
      <Text style={{ color: "#fff" }}>FPS: {fps.toFixed(1)}</Text>
      <Text style={{ color: "#fff" }}>
        Avg render: {avgRender.toFixed(2)}ms
      </Text>
      <Text style={{ color: "#fff" }}>Commits/sec: {commits}</Text>
    </View>
  );
};

function detectWebEngine() {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "V8 (Chrome)";
  if (ua.includes("Firefox")) return "SpiderMonkey";
  if (ua.includes("Safari")) return "JavaScriptCore (Safari)";
  return "Unknown";
}
