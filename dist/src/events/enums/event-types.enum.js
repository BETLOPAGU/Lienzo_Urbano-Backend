"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypes = void 0;
const graphql_1 = require("@nestjs/graphql");
var EventTypes;
(function (EventTypes) {
    EventTypes[EventTypes["VISIT"] = 1] = "VISIT";
    EventTypes[EventTypes["COMMENT"] = 2] = "COMMENT";
    EventTypes[EventTypes["FAVORITE"] = 3] = "FAVORITE";
})(EventTypes = exports.EventTypes || (exports.EventTypes = {}));
(0, graphql_1.registerEnumType)(EventTypes, {
    name: 'EventTypes',
    description: 'Event types supported',
});
//# sourceMappingURL=event-types.enum.js.map