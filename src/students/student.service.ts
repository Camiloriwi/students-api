import { Injectable,Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Students } from './student.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class StudentService {

    constructor(@InjectModel (Students.name) private studentModel: Model<Students>){}

    async findAll(){
        return await this.studentModel.find().exec();
    }

    async  encryptPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }

    async create(@Body() body): Promise<Students> {
        body.password = await this.encryptPassword(body.password);
        const newStudent = new this.studentModel(body);
        return await newStudent.save();
    }

    async update(id:string, body){
        return await this.studentModel.findByIdAndUpdate(id, body,{new:true}).exec();
    }
    
    async delete(id:string){
        return await this.studentModel.findByIdAndDelete(id).exec();
    }
}



  