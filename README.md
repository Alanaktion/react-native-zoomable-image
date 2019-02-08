# Zoomable Image

A simple `ZoomableImage` component for React Native

## Installation

```bash
npm i --save react-native-zoomable-image
```

## Usage

Add the `ZoomableImage` component anywhere you'd usually put an `Image`. The only required attribute is `source`, which supports any value accepted by the React Native `image` component's `source` attribute.

The optional `maxZoom` attribute can be used to limit the maximum zoom level of the image, relative to the image's native resolution. It defaults to `3`.

```jsx
<ZoomableImage
    source={{ uri: '' }}
    maxZoom={2} />
```

By default, the component allows the images to scale outside of the component. If you want images to be clipped to the `ZoomableImage` component's bounding box, add `style={{ overflow: 'hidden' }}`.

### Multiple images

The `ZoomableImage` component avoids intercepting unnecessary gestures, so it can be included directly within in _e.g._ a `ScrollView` or `ViewPagerAndroid` component should will just work. Just create a new instance of the component for each image you want to display, and position each wherever you'd like the images to display.

## Demo

<abbr title="I miss Wigu">Spring into action</abbr> with an [Expo Snack](https://snack.expo.io/@alanaktion/zoomable-image), demonstrating the component in a `ScrollView`.
