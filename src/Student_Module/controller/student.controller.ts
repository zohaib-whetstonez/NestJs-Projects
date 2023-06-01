/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateStudentDto } from 'src/Student_Module/dto/create-student.dto';
import { UpdateStudentDto } from 'src/Student_Module/dto/update.student.dto';
import { StudentService } from 'src/Student_Module/service/student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(
    @Res() response,
    @Body() createStudentDto: CreateStudentDto
  ) {
    try {
      const newStudent = await this.studentService.createStudent(
        createStudentDto
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Student has been created successfully',
        newStudent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Student not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateStudent(
    @Res() response,
    @Param('id') studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const existingStudent = await this.studentService.updateStudent(
        studentId,
        updateStudentDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Student has been successfully updated',
        existingStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getStudents(@Res() response) {
    try {
      const studentData = await this.studentService.getAllStudent();
      return response.status(HttpStatus.OK).json({
        message: 'All students data found successfully',
        studentData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const existingStudent = await this.studentService.getStudent(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Student found successfully',
        existingStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const deletedStudent = await this.studentService.deleteStudent(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Student deleted successfully',
        deletedStudent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }


  //Relationships

  @Patch('/:id/add-teacher/:teacherId')
  async addTeacher(@Request() req, @Res() response, @Param('id') studentId: string, @Param('teacherId') teacherId: string) {
    try {
      const add = await this.studentService.addTeacher(studentId, teacherId);
      return response.status(HttpStatus.OK).json({
      message: 'teacher added successfully',
      add
    });
  } catch(err){
      return response.status(err.status).json(err.response);
    }
    
  }


  @Patch('/:id/add-grade/:gradeId')
  async addGrade(@Request() req, @Res() response, @Param('id') studentId: string, @Param('gradeId') gradeId: string) {
    try {
      const add = await this.studentService.addGrade(studentId, gradeId);
      return response.status(HttpStatus.OK).json({
      message: 'grade added successfully',
      add
    });
  } catch(err){
      return response.status(err.status).json(err.response);
    }
    
  }
}
