import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {UserRegisterRequestDto} from './dto/user-register.req.dto';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createUser(
    userRegister: UserRegisterRequestDto,
  ): Promise<User> {
    return await this.userRepo.save(userRegister)
  }
  async getUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  async getUserById(id: number): Promise<User| string> {
    try{
      return await this.userRepo.findOne({ where: { id } });
    }catch(err){
      console.log(err.message);
      return "User doesn't exist"
    }
  }

  async modifyUser(id:number,body: UserRegisterRequestDto): Promise<any> {
    try{
      return await this.userRepo.update(id,body);
    }catch(err){
      console.log(err.message);
      return "Something wrong, couldn't update the user";
    }
  }
  async deleteUser(id: number): Promise<{deleted: Boolean; message?:string}>{
      try{
        await this.userRepo.delete({id});
        return {deleted:true};
    }catch(e){
      console.log("User doesn't exist");
      return {deleted: false, message:"couldn't delete the user"}
    }

  }
}
