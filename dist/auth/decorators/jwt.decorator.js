"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.Jwt = (0, common_1.createParamDecorator)((validUserTypes = [], context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const jwt = ctx.getContext().req.user;
    if (!jwt) {
        throw new common_1.InternalServerErrorException(`No jwt inside the request`);
    }
    if (validUserTypes.length === 0)
        return jwt;
    const valid = validUserTypes.some((userType) => userType === jwt.typeId);
    if (!valid)
        throw new common_1.UnauthorizedException();
    return jwt;
});
//# sourceMappingURL=jwt.decorator.js.map