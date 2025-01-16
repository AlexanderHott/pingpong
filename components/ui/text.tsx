import type { TextProps } from "react-native";
import { StyleSheet, Text } from "react-native";

export function H1(props: TextProps) {
  const { children, style, ...rest } = props;
  const flattened = StyleSheet.flatten(style);
  return (
    <Text
      style={[
        {
          fontFamily: "SpaceGrotesk-Bold",
          fontSize: 24,
          lineHeight: 32,
        },
        flattened,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
  // {[
  //   "SpaceGrotesk",
  //   "SpaceGrotesk-Bold",
  //   "SpaceGrotesk-SemiBold",
  //   "SpaceGrotesk-Medium",
  //   "SpaceGrotesk-Regular",
  //   "SpaceGrotesk-Light",
  // ].map((fontFamily) => (
  //   <Text
  //     key={fontFamily}
  //     style={{
  //       fontFamily,
  //       color: "black",
  //     }}
  //   >
  //     Hello from Space Grotesk
  //   </Text>
  // ))}
}

export function P(props: TextProps) {
  const { children, style, ...rest } = props;
  const flattened = StyleSheet.flatten(style);
  return (
    <Text
      style={[
        {
          fontFamily: "SpaceGrotesk-Regular",
          fontSize: 16,
          lineHeight: 24,
        },
        flattened,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
