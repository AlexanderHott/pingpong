import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Link } from "expo-router";

import { createActionGroup, useActionGroups } from "@/api";
import { H1 } from "@/components/ui/text";
import {
  TextInput,
  TextInputBox,
  TextInputField,
  TextInputLabel,
  TextInputMessage,
} from "@/components/ui/text-input";

export default function Index() {
  const { data: actionGroups, isPending, error, isError } = useActionGroups();
  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        Keyboard.dismiss();
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <H1>Action Groups</H1>
        <AddGroupForm />
        {isPending && <ActivityIndicator />}
        {isError && <Text className="text-red-500">{error.message}</Text>}
        <FlatList
          data={actionGroups}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/group/[groupId]",
                params: { groupId: item.id },
              }}
            >
              {item.name}
            </Link>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

function AddGroupForm() {
  const {
    mutate: createGroup,
    isPending,
    error,
    isError,
  } = createActionGroup();
  const [name, setName] = useState("");

  return (
    <TextInput>
      <TextInputLabel>Group Name</TextInputLabel>
      <TextInputBox>
        <TextInputField
          placeholder="My Awesome Group"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </TextInputBox>
      {isError && <TextInputMessage>{error.message}</TextInputMessage>}
    </TextInput>
    // <View
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     width: "100%",
    //     gap: 4,
    //   }}
    // >
    //   <Text
    //     aria-label="textinput"
    //     onPress={() => inputRef.current?.focus()}
    //     style={{
    //       textTransform: "uppercase",
    //       fontFamily: "SpaceGrotesk-SemiBold",
    //     }}
    //   >
    //     Group Name
    //   </Text>
    //   <View
    //     style={{
    //       display: "flex",
    //       flexDirection: "row",
    //       gap: 2,
    //       alignItems: "center",
    //       justifyContent: "space-between",
    //       backgroundColor: "white",
    //       borderRadius: 6,
    //       paddingHorizontal: 12,
    //       paddingVertical: 4,
    //       height: 52,
    //       width: "100%",
    //     }}
    //   >
    //     <TextInput
    //       ref={inputRef}
    //       aria-labelledby="textinput"
    //       value={name}
    //       placeholder="My Group"
    //       onChangeText={(text) => setName(text)}
    //       style={{
    //         flex: 1,
    //         fontFamily: "SpaceGrotesk-Regular",
    //       }}
    //     />
    //     <Feather name="search" size={20} color="black" />
    //   </View>
    //   <Button
    //     title="Add Group"
    //     onPress={() =>
    //       createGroup(name, {
    //         onSuccess(data) {
    //           setName("");
    //           router.push({
    //             pathname: "/group/[groupId]",
    //             params: { groupId: data[0].id },
    //           });
    //         },
    //       })
    //     }
    //     disabled={name.length < 1 || isPending}
    //   />
    //   {isError && <Text className="text-red-500">{error.message}</Text>}
    // </View>
  );
}
