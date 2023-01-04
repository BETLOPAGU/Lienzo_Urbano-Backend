"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    await app.listen(process.env.APP_PORT);
    console.log(`🚀🎨 Lienzo Urbano server is ready on http://localhost:${process.env.APP_PORT}/graphql`);
}
bootstrap();
//# sourceMappingURL=main.js.map