"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        return request;
    }
}
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt-auth.guard.js.map