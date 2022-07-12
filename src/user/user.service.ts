import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(userRegister: UserRegisterRequestDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    userRegister.password = await bcrypt.hash(userRegister.password, salt);

    return await this.userRepo.save(userRegister);
  }
  async getUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  async getByUsername(username: string): Promise<User> {
    return await this.userRepo.findOne({ where: { username } });
  }
  async getUserById(id: number): Promise<User> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async modifyUser(id: number, body: UserRegisterRequestDto): Promise<any> {
    return await this.userRepo.update(id, body);
  }
  async deleteUser(id: number): Promise<any> {
    return await this.userRepo.delete({ id });
  }
}
