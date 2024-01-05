"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
exports.ZodValidationPipe = (0, nestjs_zod_1.createZodValidationPipe)({
    createValidationException: (error) => {
        throw new common_1.BadRequestException(error);
    }
});
//# sourceMappingURL=zod-validation.pipe.js.map