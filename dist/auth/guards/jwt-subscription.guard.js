"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsGuard = void 0;
const graphql_1 = require("@nestjs/graphql");
class CatsGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const Authorization = request.authorization;
        return true;
    }
}
exports.CatsGuard = CatsGuard;
//# sourceMappingURL=jwt-subscription.guard.js.map