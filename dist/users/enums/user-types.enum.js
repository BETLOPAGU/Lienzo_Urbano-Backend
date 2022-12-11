"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypes = void 0;
const graphql_1 = require("@nestjs/graphql");
var UserTypes;
(function (UserTypes) {
    UserTypes[UserTypes["GUEST"] = 1] = "GUEST";
    UserTypes[UserTypes["ARTIST"] = 2] = "ARTIST";
    UserTypes[UserTypes["ADMIN"] = 3] = "ADMIN";
})(UserTypes = exports.UserTypes || (exports.UserTypes = {}));
(0, graphql_1.registerEnumType)(UserTypes, {
    name: 'UserTypes',
    description: 'User types supported',
});
//# sourceMappingURL=user-types.enum.js.map