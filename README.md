# Bundle-utils

## 🚧 WIP 🚧

![How it works](https://user-images.githubusercontent.com/1521229/34436061-ef845750-ec9a-11e7-9b66-d5e8d00d3d27.png)

### How to try

#### `npm start`
Builds multiple webpack bundles for each target specified in the .browsers.json.
Then express server is being started which handles each useragent and send the smallest bundle for the current user.

So, after `npm start` you can open inspector try to access http://0.0.0.0:3000 with different browsers. Then compare main.js file size. IE or old chrome will receive the safest and the biggest bundle, but latest chrome will receive the smallest. The interesting part is that most of users (~93%) are using the latest/chrome safari and will receive the smallest bundle. But w/o Bundle-utils it will receive the largest. See: https://www.w3schools.com/browsers


### `npm run build-examples`
You can rebuild examples or format the `utils/scripts/examples` to check more ESNext features that could affect your bundle size.
