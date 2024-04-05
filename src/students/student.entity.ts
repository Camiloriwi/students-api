import{ Document } from 'mongoose'
import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";



@Schema()
export class Students extends Document{
    @Prop()
    name: string;
    @Prop()
    CC:Number;
    @Prop()
    age:Number;
    @Prop()
    email:string;
    @Prop()
    password:string;
    @Prop()
    phone:string;
}

export const StudentSchema = SchemaFactory.createForClass(Students);