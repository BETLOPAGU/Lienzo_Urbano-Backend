"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationTypes = void 0;
const graphql_1 = require("@nestjs/graphql");
var NotificationTypes;
(function (NotificationTypes) {
    NotificationTypes[NotificationTypes["INFO"] = 1] = "INFO";
    NotificationTypes[NotificationTypes["SUCCESS"] = 2] = "SUCCESS";
    NotificationTypes[NotificationTypes["ERROR"] = 3] = "ERROR";
})(NotificationTypes = exports.NotificationTypes || (exports.NotificationTypes = {}));
(0, graphql_1.registerEnumType)(NotificationTypes, {
    name: 'NotificationTypes',
    description: 'Notification types supported',
});
//# sourceMappingURL=notification-types.enum.js.map