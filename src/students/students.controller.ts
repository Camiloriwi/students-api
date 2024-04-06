import { Controller ,Get, Post, Body,  Put, Param,Delete, HttpException, HttpStatus} from '@nestjs/common';
import { StudentService } from './student.service';
import * as bcrypt from 'bcrypt';
// import * as jwt from 'jsonwebtoken';
const jwt_secret ="###secret";

@Controller('students')
export class StudentsController {

    constructor(private readonly Service: StudentService){};

    @Get('/todo')
    findAllStudent(){
        return this.Service.findAll();
    }

    @Post('path')
    async create(@Body() body){
        return await this.Service.create(body);
    }

    // @Post('register')
    // async register(@Body() body) {
    //     const { name, email, password } = body;
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     const user = await this.Service.create({
    //         name,
    //         email,
    //         password: hashedPassword,
    //     });
    //     return user;
    // }

    @Post('register')
    async register(@Body() body) {
      
        return await this.Service.create(body);
    }

    @Post('login')
    async login(@Body() body) {
      return this.Service.validateUser(body.email, body.password);
    }
  


    @Put('path/:_id')
    async updateStudent(@Param('_id') id, @Body() body){
        return await this.Service.update(id, body);
    }
    
    @Delete('path/:_id')
    async deleteStudent(@Param('_id') id){
        return await this.Service.delete(id);
    }
    
}
