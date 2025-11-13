import React, { useEffect, useState } from "react";
import { Animated, Text } from "react-native";

export const RenderBox = ({
  color,
  delay,
}: {
  color: string;
  delay: number;
}) => {
  const [hydrated, setHydrated] = useState(false);
  const [fade] = useState(new Animated.Value(0.4));

  useEffect(() => {
    const timer = setTimeout(() => {
      setHydrated(true);
      Animated.timing(fade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Animated.View
      style={{
        width: "90%",
        borderRadius: 12,
        padding: 16,
        backgroundColor: color,
        opacity: fade,
      }}
    >
      <Text style={{ fontWeight: "600" }}>
        {hydrated ? "✅ Rendered" : "💤 Waiting for render..."}
      </Text>
      <Text>Delay: {delay}ms</Text>
    </Animated.View>
  );
};
