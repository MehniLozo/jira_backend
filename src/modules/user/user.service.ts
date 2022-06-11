/*
createUser
deleteUser
getUserByName
updateUser
*/
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async createUser(
    userRegister: User,
  ): Promise<User> {
    const user = new User();
    user.name = userRegister.name;
    user.email = userRegister.email;
    user.password = userRegister.password;

    return await user.save();
  }
  async getUsers(): Promise<User[] | undefined> {
    //return User.find({});
    return undefined;
  }
  async getUserByName(name: string): Promise<User | undefined> {
    return User.findOne({ where: { name } });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return User.findOne({ where: { id } });
  }
    /*
  async modifyUser(user: User): Promise<User | undefined> {

  }*/
  async deleteUser(id: number){
      try{
        const targetUser = User.findOne({where:{id}});
        //await User.delete(targetUser.id);
    }catch(e){
      console.log("User doesn't exist");
    }

  }
}
