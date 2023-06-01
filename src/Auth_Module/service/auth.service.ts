/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { StudentService } from '../../Student_Module/service/student.service';
import { JwtService } from '@nestjs/jwt';
import { IStudent } from '../../Student_Module/interface/student.interface';
import { AuthLoginDto } from 'src/Auth_Module/dto/auth.login.dto';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private jwtService: JwtService,
  ) {}
  async validateStudent(authLoginDto: AuthLoginDto): Promise<IStudent> {
    const { name, password } = authLoginDto;
    const student = await this.studentService.getStudents(name);
    if (student.password !== password)
      throw new NotFoundException('Password not exist.');

    return student ?? null;
  }
  @Post()
  async login(authLoginDto: AuthLoginDto) {
    const st = await this.validateStudent(authLoginDto);
    const payload = { name: st.name, password: st.password };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
