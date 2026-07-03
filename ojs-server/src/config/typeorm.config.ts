import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { ConfigService } from "@nestjs/config"

export const typeOrmConf = (config: ConfigService): TypeOrmModuleOptions => ({
    type:"postgres",
    host:"localhost",
    port: 5432,
    username:"seif",
    password:"13245",
    database:"ojs",
    logging:true,
    autoLoadEntities: true,
    synchronize:true,
    entities: [__dirname + "/../**/*.entities{.ts,.js}"],
})
