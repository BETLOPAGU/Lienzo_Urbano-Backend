"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const jwt_1 = require("@nestjs/jwt");
exports.Jwt = (0, common_1.createParamDecorator)((validUserTypes = [], context) => {
    const jwtService = new jwt_1.JwtService();
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const jwt = req.user || jwtService.decode(req.Authorization.replace('Bearer ', ''));
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