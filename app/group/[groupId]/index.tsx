import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

import { useActionGroup } from "@/api";

export default function ActionGroup() {
  const { groupId: groupIdStr } = useLocalSearchParams();
  if (typeof groupIdStr !== "string") {
    return <Text>Invalid group id: {groupIdStr}</Text>;
  }
  const groupId = parseInt(groupIdStr);
  if (!Number.isFinite(groupId) || !Number.isSafeInteger(groupId)) {
    return <Text>Invalid group id: {groupIdStr}</Text>;
  }

  const {
    data: actionGroup,
    isPending,
    error,
    isError,
  } = useActionGroup(groupId);

  if (isError) {
    return <Text className="text-red-500">{error.message}</Text>;
  }
  if (isPending) {
    return <ActivityIndicator />;
  }
  if (!actionGroup) {
    return <Text>not found</Text>;
  }

  return (
    <View>
      <Text className="text-3xl">{actionGroup.name}</Text>
      <FlatList
        data={actionGroup.actions}
        renderItem={({ item }) => (
          <Button
            title={item.url}
            onPress={() =>
              fetch(item.url, { method: item.method, headers: item.headers })
            }
          />
        )}
      />

      <Link href={{ pathname: "/group/[groupId]/add", params: { groupId } }}>
        New Action
      </Link>
    </View>
  );
}
