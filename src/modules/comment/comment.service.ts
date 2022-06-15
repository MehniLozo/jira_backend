import { Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  async createComment(
    commentRegister: Comment,
  ): Promise<Comment> {
    const comment = new Comment();
    Object.keys(commentRegister).forEach(key=>{
      if(commentRegister !== undefined)
      comment[key]=commentRegister[key]
    });

    return await comment.save();
  }
  async getCommentsByProject(id:number): Promise<Comment[] | undefined> {
    //ops here for returning all the comments
    return undefined;
  }

  async getCommentById(id: number): Promise<Comment | undefined> {
    return Comment.findOne({ where: { id } });
  }
    /*
  async modifyComment(user: Comment): Promise<Comment | undefined> {

  }*/
  async deleteComment(id: number): Promise<any> {
      try{
        const targetComment = Comment.findOne({where:{id}});
        //ops here for deleting
    }catch(e){
      console.log("Comment doesn't exist");
    }
  }
  //Comments operations are gonna be below
}
