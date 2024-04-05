import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './students/student.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://camilo:nFgFrb0li3JxbLr6@node.ktvwioe.mongodb.net/'),
    StudentModule
  
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
