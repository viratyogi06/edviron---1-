import { JwtService } from '@nestjs/jwt';
import mongoose, { Types, ObjectId } from 'mongoose';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Trustee } from '../schema/trustee.schema';
import { TrusteeSchool } from '../schema/school.schema';
import axios from 'axios';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TrusteeService {
  constructor(
    @InjectModel(Trustee.name)
    private trusteeModel: mongoose.Model<Trustee>,
    @InjectModel(TrusteeSchool.name)
    private trusteeSchoolModel: mongoose.Model<TrusteeSchool>,
    private jwtService: JwtService,
  ) { }

  async loginAndGenerateToken(
    emailId: string,
    passwordHash: string,
  ): Promise<{ token: string }> {
    try {
      const trustee = await this.trusteeModel.findOne({ email_id: emailId });

      if (!trustee) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const passwordMatch = await bcrypt.compare(
        passwordHash,
        trustee.password_hash,
      );

      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        id: trustee._id,
      };

      return {
        token: await this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_FOR_TRUSTEE_AUTH, expiresIn: "30d" }),
      };
    } catch (error) {
      console.error('Error in login process:', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async validateTrustee(token: string): Promise<any> {
    try {
      const decodedPayload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_FOR_TRUSTEE_AUTH,
      });

      const trustee = await this.trusteeModel.findById(
        decodedPayload.id,
      );

      if (!trustee) throw new NotFoundException('trustee not found');

      const userTrustee = {
        id: trustee._id,
        name: trustee.name,
        email: trustee.email_id,
      };

      return userTrustee;
    } catch (error) {
      throw new UnauthorizedException('Invalid API key');
    }
  }

  async getSchools(trusteeId: string, limit: number, offset: number) {
    try {
      if (!Types.ObjectId.isValid(trusteeId)) {
        throw new BadRequestException('Invalid trusteeID format');
      }
      const trustee = await this.trusteeModel.findById(trusteeId);

      if (!trustee) {
        throw new ConflictException(`no trustee found`);
      }
      const schools = await this.trusteeSchoolModel
        .find(
          { trustee_id: trusteeId },
          { school_id: 1, school_name: 1, _id: 0 },
        )
        .skip(offset)
        .limit(limit)
        .exec();
      return schools;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      } else {
        throw new BadRequestException(error.message);
      }
    }
  }

  async generateSchoolToken(
    schoolId: string,
    password: string,
    trusteeId: string,
  ) {
    try {
      // Parallel execution of database queries using Promise.all()
      const [school, trustee] = await Promise.all([
        this.trusteeSchoolModel.findOne({ school_id: schoolId }),
        this.trusteeModel.findById(trusteeId),
      ]);

      // Specific error handling using custom error classes
      if (!trustee) {
        throw new NotFoundException('Trustee not found');
      }
      if (!school) {
        throw new NotFoundException('School not found!');
      }
      if (school.trustee_id.toString() !== trustee._id.toString())
        throw new NotFoundException('School not found for trustee')
      
      // Password validation and JWT token generation
      const passwordMatch = await bcrypt.compare(
        password,
        trustee.password_hash,
      );
      if (!passwordMatch) {
        throw new UnauthorizedException();
      }

      const data = { schoolId: school.school_id };
      const token = this.jwtService.sign(data, {
        secret: process.env.JWT_SECRET_FOR_INTRANET,
      });

      // Making a POST request to an external endpoint
      const schoolToken = await axios.post(
        `${process.env.MAIN_BACKEND_URL}/api/trustee/gen-school-token`,
        {
          token: token,
        },
      );
      return schoolToken.data;
    } catch (error) {
      // Structured error handling for different scenarios
      if (error.response) {
        throw error;
      } else if (error.request) {
        throw new BadRequestException('No response received from the server');
      } else if (error instanceof UnauthorizedException || error instanceof NotFoundException)
        throw error
      else {
        throw new BadRequestException('Request setup error');
      }
    }
  }
}
