import { z } from 'nestjs-zod/z';
declare const CountrySchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
}, {
    name?: string;
}>;
export type CountryType = z.infer<typeof CountrySchema>;
declare const CreateCountryDto_base: import("nestjs-zod").ZodDto<{
    name?: string;
}, z.ZodObjectDef<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    name?: string;
}>;
export declare class CreateCountryDto extends CreateCountryDto_base {
}
export {};
