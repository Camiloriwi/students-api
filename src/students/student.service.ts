
import { Injectable , Body, Param, HttpException, HttpStatus} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Students } from './student.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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

    async findByEmail(email: string): Promise<Students> {
        return await this.studentModel.findOne({ email: email }).exec();
    }


    async validateUser(email: string, password: string) {
        const user = await this.findByEmail(email);
        if (!user) {
          throw new HttpException('Invalid username or email', HttpStatus.BAD_REQUEST);
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new HttpException('Invalid username or password', HttpStatus.BAD_REQUEST);
        }
    
        const jwt_secret = 'tu_clave_secreta'; // Asegúrate de reemplazar esto con tu clave secreta
        const token = jwt.sign({ userId: user._id }, jwt_secret, { expiresIn: '1h' });
        return { message: 'Logged in successfully', token };
    }
    
    


    async update(id:string, body){
        return await this.studentModel.findByIdAndUpdate(id, body,{new:true}).exec();
    }
    
    async delete(id:string){
        return await this.studentModel.findByIdAndDelete(id).exec();
    }
}



  