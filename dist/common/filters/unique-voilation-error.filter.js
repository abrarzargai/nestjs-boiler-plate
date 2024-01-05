"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryFailedErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("typeorm");
const db_error_code_enum_1 = require("../enums/db-error-code.enum");
let QueryFailedErrorFilter = class QueryFailedErrorFilter extends core_1.BaseExceptionFilter {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('QueryFailedErrorFilter');
        this.POSTGRES_UNIQUE_VIOLATION = db_error_code_enum_1.DBErrorCode.PgUniqueConstraintViolation;
    }
    catch(exception, host) {
        this.logger.error(`CODE [${exception['code']}] | ${exception.message}`);
        const response = host.switchToHttp().getResponse();
        if (exception['code'] === this.POSTGRES_UNIQUE_VIOLATION) {
            return response.status(common_1.HttpStatus.CONFLICT).json({
                statusCode: common_1.HttpStatus.CONFLICT,
                error: 'CONFLICT',
                message: 'Duplicate Record',
                errorMessage: exception.message,
            });
        }
        else {
            return response.status(common_1.HttpStatus.CONFLICT).json({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'INTERNAL SERVER ERROR',
                message: 'Query Failed',
                errorMessage: exception.message,
            });
        }
    }
};
exports.QueryFailedErrorFilter = QueryFailedErrorFilter;
exports.QueryFailedErrorFilter = QueryFailedErrorFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.QueryFailedError)
], QueryFailedErrorFilter);
//# sourceMappingURL=unique-voilation-error.filter.js.map