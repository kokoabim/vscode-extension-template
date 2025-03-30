import { resolve } from "path";
import { Configuration } from "webpack";

const config: Configuration = {
    entry: "./bundle.ts",
    output: {
        path: resolve("./"),
        filename: "bundle.js",
    },
    target: "web",
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
};

export default config;
