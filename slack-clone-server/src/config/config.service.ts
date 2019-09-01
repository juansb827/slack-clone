import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const DATABASE_URL = 'DATABASE_URL';

export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor(filePath: string) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath))
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    getTypeORMConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            url: this.get(DATABASE_URL),
            entities: [ "dist/**/**.entity{.ts,.js}"],
            ssl: true,
            synchronize: true,
            logging: true
        }
    }
}