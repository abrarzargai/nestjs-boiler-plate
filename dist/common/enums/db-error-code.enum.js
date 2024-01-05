"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBErrorCode = void 0;
var DBErrorCode;
(function (DBErrorCode) {
    DBErrorCode["PgNotNullConstraintViolation"] = "23502";
    DBErrorCode["PgForeignKeyConstraintViolation"] = "23503";
    DBErrorCode["PgUniqueConstraintViolation"] = "23505";
})(DBErrorCode || (exports.DBErrorCode = DBErrorCode = {}));
//# sourceMappingURL=db-error-code.enum.js.map