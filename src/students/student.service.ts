import { Injectable,Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Students } from './student.entity';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {

    constructor(@InjectModel (Students.name) private studentModel: Model<Students>){}

    async findAll(){
        return await this.studentModel.find().exec();
    }

    async create(@Body() body): Promise<Students>{
        const newStudent = new this.studentModel(body);
        return await newStudent.save(body);
    }

    async update(id:string, body){
        return await this.studentModel.findByIdAndUpdate(id, body,{new:true}).exec();
    }
    
    async delete(id:string){
        return await this.studentModel.findByIdAndDelete(id).exec();
    }
}
