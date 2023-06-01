/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Student } from 'src/Student_Module/student.schema/student.schema';
import { Teacher } from 'src/Teacher_Module/schema/teacher.schema';

@Schema()
export class Grade {
  @Prop()
  name: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required:true }] })
  teacher: [Teacher]
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required:true }] })
  student: [Student]
}
export const GradeSchema = SchemaFactory.createForClass(Grade);