"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const express_1 = require("express");
const nestjs_zod_1 = require("nestjs-zod");
const app_module_1 = require("./app.module");
const entity_notfound_filter_1 = require("./common/filters/entity-notfound.filter");
const http_error_filter_1 = require("./common/filters/http-error.filter");
const unique_voilation_error_filter_1 = require("./common/filters/unique-voilation-error.filter");
const swagger_1 = require("./swagger");
async function startServer() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.use((0, express_1.json)({ limit: '50mb' }));
        app.use((0, express_1.urlencoded)({ limit: '50mb', extended: true }));
        app.useGlobalPipes(new common_1.ValidationPipe());
        const { httpAdapter } = app.get(core_1.HttpAdapterHost);
        app.useGlobalFilters(new http_error_filter_1.HttpErrorFilter());
        app.useGlobalFilters(new unique_voilation_error_filter_1.QueryFailedErrorFilter(httpAdapter));
        app.useGlobalFilters(new entity_notfound_filter_1.EntityNotFoundErrorFilter());
        app.enableCors();
        (0, nestjs_zod_1.patchNestJsSwagger)();
        (0, swagger_1.setupSwagger)(app);
        await app.listen(process.env.PORT).then(() => {
            common_1.Logger.log(`
 ##################################################
      ****************************************
            Server Running on Port ${process.env.PORT}
      ****************************************
 ##################################################
   `);
        });
    }
    catch (error) {
        common_1.Logger.error(error, 'Server Initialization Failed');
    }
}
startServer();
//# sourceMappingURL=main.js.map