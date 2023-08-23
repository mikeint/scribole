const imageContext = require.context('../../../files/images/pixelImages/', false, /\.(png|jpe?g|svg)$/);

const imageFileNames = imageContext.keys().map(key => {
  const fileName = key.replace('./', ''); // Remove the './' prefix
  return { url: imageContext(key), fileName };
});

export default imageFileNames;
