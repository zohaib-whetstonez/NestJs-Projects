/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto } from 'src/Student_Module/dto/create-student.dto';
import { IStudent } from 'src/Student_Module/interface/student.interface';
import { Model } from 'mongoose';
import { UpdateStudentDto } from 'src/Student_Module/dto/update.student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private studentModel: Model<IStudent>) {}

  async createStudent(CreateStudentDto: CreateStudentDto): Promise<IStudent> {
    const newStudent = await new this.studentModel(CreateStudentDto);
    return newStudent.save();
  }
  teacherModel() {
    throw new Error('Method not implemented.');
  }

  async updateStudent(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<IStudent> {
    const existingStudent = await this.studentModel.findByIdAndUpdate(
      studentId,
      updateStudentDto,
      { new: true },
    );
    if (!existingStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return existingStudent;
  }

  async getAllStudent(): Promise<IStudent[]> {
    const studentData = await this.studentModel.find();
    if (!studentData || studentData.length == 0) {
      throw new NotFoundException(' Student Data Not Found. ');
    }
    return studentData;
  }

  async getStudent(studentId: string): Promise<IStudent> {
    const existingStudent = await this.studentModel.findById(studentId).populate('teacher',['email','name','gender']).populate('grade',['name']);
    if (!existingStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return existingStudent;
  }

  async getStudents(name: string): Promise<IStudent> {
    
    const existStudent = await this.studentModel.findOne({name});
    if (!existStudent) {
      throw new NotFoundException(`Student not found`);
    }
    return existStudent;
  }

  async deleteStudent(studentId: string): Promise<IStudent> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return deletedStudent;
  }


  //RelationShips

  async addTeacher(studentId: string, teacherId: string): Promise<IStudent> {
    const addteacher = await this.studentModel.findByIdAndUpdate(
      studentId,
      { $addToSet: { teacher: teacherId }}, { new:true }
      ).populate('teacher');
      
    if (!addteacher) {
      throw new NotFoundException(`Error not found`);
    }
    return addteacher;
  }


  async addGrade(studentId: string, gradeId: string): Promise<IStudent> {
    const addgrade = await this.studentModel.findByIdAndUpdate(
      studentId,
      { $addToSet: { grade: gradeId }}, { new:true }
      ).populate('grade');
      
    if (!addgrade) {
      throw new NotFoundException(`Error not found`);
    }
    return addgrade;
  }
}
