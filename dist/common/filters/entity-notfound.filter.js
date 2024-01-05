"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNotFoundErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let EntityNotFoundErrorFilter = class EntityNotFoundErrorFilter {
    constructor() {
        this.logger = new common_1.Logger('QueryFailedErrorFilter');
    }
    catch(exception, host) {
        const statusCode = common_1.HttpStatus.BAD_REQUEST;
        this.logger.error(`CODE [${statusCode}] | Record Not Found`);
        const response = host.switchToHttp().getResponse();
        return response.status(statusCode).json({
            statusCode: statusCode,
            error: ' EntityNotFoundError ',
            message: 'record not found',
        });
    }
};
exports.EntityNotFoundErrorFilter = EntityNotFoundErrorFilter;
exports.EntityNotFoundErrorFilter = EntityNotFoundErrorFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.EntityNotFoundError)
], EntityNotFoundErrorFilter);
//# sourceMappingURL=entity-notfound.filter.js.map