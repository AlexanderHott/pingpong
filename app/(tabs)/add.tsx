import { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal, Text, TextInput, View } from "react-native";

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

const commonHeaders = [
  "Accept",
  "Accept-Charset",
  "Accept-Encoding",
  "Accept-Language",
  "Authorization",
  "Cache-Control",
  "Connection",
  "Content-Encoding",
  "Content-Language",
  "Content-Length",
  "Content-Type",
  "Cookie",
  "Date",
  "ETag",
  "Expect",
  "Expires",
  "Host",
  "If-Match",
  "If-Modified-Since",
  "If-None-Match",
  "If-Range",
  "If-Unmodified-Since",
  "Last-Modified",
  "Location",
  "Origin",
  "Pragma",
  "Proxy-Authenticate",
  "Proxy-Authorization",
  "Range",
  "Referer",
  "Retry-After",
  "Server",
  "Set-Cookie",
  "TE",
  "Trailer",
  "Transfer-Encoding",
  "Upgrade",
  "User-Agent",
  "Vary",
  "Via",
  "WWW-Authenticate",
  "Warning",
];

export default function Index() {
  const [url, setUrl] = useState("https://example.com");
  const [method, setMethod] = useState("https://example.com");
  const [headers, setHeaders] = useState<Header[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className="border-red-500 border">
      <SelectModal<string>
        title="Method Select"
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
        className="w-full h-16 text-2xl"
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
            className="w-full h-16 text-2xl"
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
            className="w-full h-16 text-2xl"
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

      <Button title="add" onPress={() => console.log(url)} />
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
    <Modal
      onRequestClose={() => setModalVisible((m) => !m)}
      animationType="slide"
      visible={modalVisible}
    >
      <View>
        <Text>{title}</Text>
        {options.map((m) => (
          <Button
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
  );
}
