import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Students, StudentSchema } from './student.entity';
import {StudentsController} from './students.controller';
import { StudentService } from './student.service';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: Students.name,
                schema: StudentSchema
            }
        ])
    ],
    controllers:[StudentsController],
    providers:[StudentService]
})
export class StudentModule {}
