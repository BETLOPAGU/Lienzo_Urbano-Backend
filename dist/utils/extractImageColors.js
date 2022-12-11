"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractImageColors = void 0;
const getColors = require('get-image-colors');
const fast_average_color_node_1 = require("fast-average-color-node");
const extractImageColors = async (imageUrl) => {
    const avgColor = await (0, fast_average_color_node_1.getAverageColor)(imageUrl);
    const options = { count: 5 };
    const colors = await getColors(imageUrl, options);
    const hexColors = colors
        .map((color) => color.hex())
        .concat(['AVG' + avgColor.hex]);
    return hexColors;
};
exports.extractImageColors = extractImageColors;
//# sourceMappingURL=extractImageColors.js.map