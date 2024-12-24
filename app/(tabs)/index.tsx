import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link, router } from "expo-router";

import { createActionGroup, useActionGroups } from "@/api";

export default function Index() {
  const { data: actionGroups, isPending, error, isError } = useActionGroups();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-2xl">Action Groups</Text>
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
    <View>
      <TextInput
        value={name}
        placeholder="My Group"
        onChangeText={(text) => setName(text)}
      />
      <Button
        title="Add Group"
        onPress={() =>
          createGroup(name, {
            onSuccess(data) {
              setName("");
              router.push({
                pathname: "/group/[groupId]",
                params: { groupId: data[0].id },
              });
            },
          })
        }
        disabled={name.length < 1 || isPending}
      />
      {isError && <Text className="text-red-500">{error.message}</Text>}
    </View>
  );
}
