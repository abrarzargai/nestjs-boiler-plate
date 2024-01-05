"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfigs = void 0;
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
(0, dotenv_1.config)();
exports.databaseConfigs = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    migrations: ["dist/migrations/**/*.js"],
    entities: [__dirname + '/../**/*.entity.js'],
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    synchronize: true,
    logging: true
};
const dataSource = new typeorm_1.DataSource(exports.databaseConfigs);
exports.default = dataSource;
//# sourceMappingURL=database.config.js.map