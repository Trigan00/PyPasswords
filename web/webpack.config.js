const path = require("path");

const config = {
  mode: "development",
  entry: "./src/index.tsx",
  // devServer: {
  //   hot: true,
  //   port: 3000,
  //   historyApiFallback: true,
  // },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/i,
        use: [{ loader: "file-loader", options: { esModule: false } }],
      },
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: "./index.html",
  //   }),
  // ],
};

module.exports = (env, args) => {
  if (args.mode === "production") {
    config.mode = "production";
  }
  return config;
};
