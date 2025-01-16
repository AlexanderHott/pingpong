/**
 * Usage
 *
 * ```ts
 * <TextInput>
 *   <TextInputLabel>Age</TextInputLabel>
 *   <TextInputBox>
 *     <TextInputField value={age} onChangeText={(text) => setAge(text)} />
 *     <CustomIcon />
 *   </TextInputBox>
 *   <TextInputMessage>Age must be greater than 0</TextInputMessage>
 * </TextInput>
 * ```
 */
import type { Dispatch, RefObject, SetStateAction } from "react";
import type { TextInputProps, TextProps, ViewProps } from "react-native";
import { createContext, useContext, useRef, useState } from "react";
import { TextInput as RNTextInput, StyleSheet, Text, View } from "react-native";

type TextInputContextType = {
  inputRef: RefObject<RNTextInput>;
  label?: string;
  focused: boolean;
  setFocused: Dispatch<SetStateAction<boolean>>;
};
const TextInputContext = createContext<TextInputContextType | null>(null);

export function TextInput(props: ViewProps & { label?: string }) {
  const { children, label, style, ...rest } = props;
  const flattened = StyleSheet.flatten(style);
  const inputRef = useRef<RNTextInput>(null);
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[
        {
          display: "flex",
          justifyContent: "center",
          width: "100%",
          gap: 4,
        },
        flattened,
      ]}
      {...rest}
    >
      <TextInputContext.Provider
        value={{ inputRef, label, focused, setFocused }}
      >
        {children}
      </TextInputContext.Provider>
    </View>
  );
}

export function TextInputLabel(props: TextProps) {
  const { children, style, ...rest } = props;
  const flattened = StyleSheet.flatten(style);
  const context = useContext(TextInputContext);

  if (context === null) {
    throw new Error("TextInputLabel must be used from within a TextInput.");
  }

  return (
    <Text
      aria-label={context.label}
      onPress={() => context.inputRef.current?.focus()}
      style={[
        {
          textTransform: "uppercase",
          fontFamily: "SpaceGrotesk-SemiBold",
        },
        flattened,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
export function TextInputBox(props: ViewProps) {
  const { children, style, ...rest } = props;
  const flattened = StyleSheet.flatten(style);
  const context = useContext(TextInputContext);

  if (context === null) {
    throw new Error("TextInputField must be used from within a TextInput.");
  }

  return (
    <View
      style={[
        {
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          borderRadius: 6,
          paddingHorizontal: 12,
          paddingVertical: 4,
          height: 52,
          width: "100%",
          borderWidth: 1,
          borderColor: context.focused ? "#9ca3af" : "#e4e4e7",
        },
        flattened,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

export function TextInputField(props: TextInputProps) {
  const { style, ...rest } = props;
  const flattened = StyleSheet.flatten(style);
  const context = useContext(TextInputContext);

  if (context === null) {
    throw new Error("TextInputField must be used from within a TextInput.");
  }

  return (
    <RNTextInput
      ref={context.inputRef}
      aria-labelledby={context.label}
      onFocus={() => context.setFocused(true)}
      onBlur={() => context.setFocused(false)}
      style={[
        {
          flex: 1,
          fontFamily: "SpaceGrotesk-Regular",
        },
        flattened,
      ]}
      {...rest}
    />
  );
}
export function TextInputMessage(props: TextProps) {
  const { children, style, ...rest } = props;
  const flattened = StyleSheet.flatten(style);

  return (
    <Text
      style={[
        {
          fontFamily: "SpaceGrotesk-Light",
          fontSize: 14,
          lineHeight: 20,
          color: "#ef4444",
        },
        flattened,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
