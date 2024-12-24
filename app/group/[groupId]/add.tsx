import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Modal,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { createAction, useActionGroup } from "@/api";

type Header = {
  id: number;
  key: string;
  val: string;
};

const httpMethods = [
  "GET",
  "HEAD",
  "OPTIONS",
  "PUT",
  "DELETE",
  "TRACE",
  "POST",
  "PATCH",
  "PROPFIND",
  "PROPPATCH",
  "MKCOL",
  "COPY",
  "MOVE",
  "LOCK",
  "UNLOCK",
  "SEARCH",
];

// const commonHeaders = [
//   "Accept",
//   "Accept-Charset",
//   "Accept-Encoding",
//   "Accept-Language",
//   "Authorization",
//   "Cache-Control",
//   "Connection",
//   "Content-Encoding",
//   "Content-Language",
//   "Content-Length",
//   "Content-Type",
//   "Cookie",
//   "Date",
//   "ETag",
//   "Expect",
//   "Expires",
//   "Host",
//   "If-Match",
//   "If-Modified-Since",
//   "If-None-Match",
//   "If-Range",
//   "If-Unmodified-Since",
//   "Last-Modified",
//   "Location",
//   "Origin",
//   "Pragma",
//   "Proxy-Authenticate",
//   "Proxy-Authorization",
//   "Range",
//   "Referer",
//   "Retry-After",
//   "Server",
//   "Set-Cookie",
//   "TE",
//   "Trailer",
//   "Transfer-Encoding",
//   "Upgrade",
//   "User-Agent",
//   "Vary",
//   "Via",
//   "WWW-Authenticate",
//   "Warning",
// ];

export default function AddActionToGroup() {
  const [url, setUrl] = useState("https://example.com");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState<Header[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { mutate, isPending, error, isError } = createAction();

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
    isPending: groupIsPending,
    error: groupError,
    isError: groupIsError,
  } = useActionGroup(groupId);

  if (groupIsError) {
    return <Text className="text-red-500">{groupError.message}</Text>;
  }
  if (groupIsPending) {
    return <ActivityIndicator />;
  }
  if (!actionGroup) {
    return <Text>not found</Text>;
  }

  return (
    <View className="border border-red-500">
      <SelectModal<string>
        title={`Method Select: ${method}`}
        options={httpMethods}
        select={setMethod}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Text>Url</Text>
      <TextInput
        placeholder="url"
        value={url}
        onChangeText={setUrl}
        className="h-16 w-full text-2xl"
        selectTextOnFocus
      />

      <Text>Headers</Text>
      {headers.map((header) => (
        <View key={header.id}>
          <TextInput
            placeholder="Content-Type"
            value={header.key}
            onChangeText={(text) =>
              setHeaders(
                headers.map((h) =>
                  h.id === header.id ? { ...h, key: text } : h,
                ),
              )
            }
            className="h-16 w-full text-2xl"
            selectTextOnFocus
          />

          <TextInput
            value={header.val}
            placeholder="application/json"
            onChangeText={(text) =>
              setHeaders(
                headers.map((h) =>
                  h.id === header.id ? { ...h, val: text } : h,
                ),
              )
            }
            className="h-16 w-full text-2xl"
            selectTextOnFocus
          />
        </View>
      ))}
      <Button
        title="add header"
        onPress={() =>
          setHeaders([...headers, { id: Date.now(), key: "", val: "" }])
        }
      />

      <Button
        title="add"
        disabled={isPending}
        onPress={() =>
          mutate(
            {
              headers: headers.map((h) => [h.key, h.val]),
              method,
              url,
              groupId,
            },
            {
              onSuccess: () => router.back(),
            },
          )
        }
      />
      {isError && <Text className="text-red-500">{error.message}</Text>}
    </View>
  );
}

function SelectModal<T>({
  options,
  select,
  modalVisible,
  setModalVisible,
  title,
}: {
  options: T[];
  select: Dispatch<SetStateAction<T>>;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  title: string;
}) {
  return (
    <View>
      <Button title={title} onPress={() => setModalVisible(true)} />
      <Modal
        onRequestClose={() => setModalVisible((m) => !m)}
        animationType="slide"
        visible={modalVisible}
      >
        <View>
          <Text>{title}</Text>
          {options.map((m) => (
            <Button
              key={String(m)}
              title={String(m)}
              onPress={() => {
                select(m);
                setModalVisible(false);
              }}
            />
          ))}
          <Button title="close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}
