module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],

    // https://orm.drizzle.team/docs/connect-expo-sqlite
    plugins: [["inline-import", { extensions: [".sql"] }]],
  };
};
