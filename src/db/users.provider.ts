import { ConfigModule, ConfigService } from '@nestjs/config';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UriProvider } from './db-uri.provider';

export const UsersProviders = [
  {
    imports: [ConfigModule],
    inject: [ConfigService],
    provide: getConnectionToken('Users'),
    useFactory: async (config: ConfigService): Promise<typeof mongoose> =>
      await mongoose.connect(new UriProvider(config).getMain()),
  },
];
