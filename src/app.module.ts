import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './Student_Module/student.schema/student.schema';
import { AuthModule } from './Auth_Module/auth.module';
import { StudentModule } from './Student_Module/student.module';
import { TeacherModule } from './Teacher_Module/teacher.module';
import { TeacherSchema } from './Teacher_Module/schema/teacher.schema';
import { GradeModule } from './Grade_Module/grade.module';

@Module({
  imports: [
    StudentModule,
    AuthModule,
    TeacherModule,
    GradeModule,
    // PassportModule,
    // JwtModule.register({
    //   secret: 'secretKey',
    //   signOptions: { expiresIn: '60s' },
    // }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/students', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
