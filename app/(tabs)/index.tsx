import { Link } from "expo-router";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [text, setText] = useState("");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title="Get http://172.20.34.32:8000"
        onPress={async () => {
          const res = await fetch("http://172.20.34.32:8000");
          setText(await res.text());
        }}
      />
      <Text style={{ fontFamily: "JetBrainsMono" }}>Resp: {text}</Text>
      <Link href="/method">method</Link>
    </View>
  );
}
