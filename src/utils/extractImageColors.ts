// eslint-disable-next-line @typescript-eslint/no-var-requires
const getColors = require('get-image-colors');
import { getAverageColor } from 'fast-average-color-node';

export const extractImageColors = async (imageUrl: string) => {
  const avgColor = await getAverageColor(imageUrl);

  const options = { count: 5 };
  const colors: chroma.Color[] = await getColors(imageUrl, options);
  const hexColors = colors
    .map((color) => color.hex())
    .concat(['AVG' + avgColor.hex]);
  return hexColors;
};
