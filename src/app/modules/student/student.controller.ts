import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student: studentData } = req.body;

  // data validation schema using zod
  const zodParseData = studentValidationSchema.parse(studentData);

  const result = await StudentServices.createStudentIntoDB(zodParseData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '... is retrieved successfully',
    data: result,
  });
});

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '... is retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;

  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '... is retrieved successfully',
    data: result,
  });
});

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
