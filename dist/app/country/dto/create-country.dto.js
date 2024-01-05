"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCountryDto = void 0;
const openapi = require("@nestjs/swagger");
const nestjs_zod_1 = require("nestjs-zod");
const z_1 = require("nestjs-zod/z");
const CountrySchema = z_1.z.object({
    name: z_1.z.string().min(5).toLowerCase().describe('This is an name')
});
class CreateCountryDto extends (0, nestjs_zod_1.createZodDto)(CountrySchema) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CreateCountryDto = CreateCountryDto;
//# sourceMappingURL=create-country.dto.js.map