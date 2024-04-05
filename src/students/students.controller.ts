import { Controller ,Get, Post, Body,  Put, Param,Delete} from '@nestjs/common';
import { StudentService } from './student.service';

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

    @Put('path/:_id')
    async updateStudent(@Param('_id') id, @Body() body){
        return await this.Service.update(id, body);
    }
    
    @Delete('path/:_id')
    async deleteStudent(@Param('_id') id){
        return await this.Service.delete(id);
    }
    
}
