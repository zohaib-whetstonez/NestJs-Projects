/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Grade } from 'src/Grade_Module/schema/grade.schema';
import { Student } from 'src/Student_Module/student.schema/student.schema';

@Schema()
export class Teacher {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  gender: string;
  @Prop()
  password: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required:true }] })
  student: [Student]
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grade', required:true }] })
  grade: [Grade]
}
export const TeacherSchema = SchemaFactory.createForClass(Teacher);