import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ProjectRegisterRequestDto} from './modules/project/dto/project-register.req.dto';
import { ProjectService} from './modules/project/project.service';
import { ProjectCategory} from './modules/project/project.constants';

import { Project} from './modules/project/project.entity';
import appDataSource from './config/app-data-source';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
      .setTitle('Jira API')
      .setDescription('Backend API')
      .setVersion('1.0.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
        'access-token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);


  await app.listen(3000);


  //the following is just for DB testing purposes
  /*try{

      const registerProject: ProjectRegisterRequestDto = {
        name:'fourth',
        url:'fourth.com',
        description:'fourth',
        category:ProjectCategory.SOFTWARE
      }

      const projectRepo = await appDataSource.getRepository(Project);
      const projectService = new ProjectService(projectRepo);
      const project = await projectService.createProject(registerProject);
        console.log("This is working ?")
      }catch(e){
        console.log('------------------')
        console.log(e);
        console.log('------------------')
      }
      */

}
bootstrap();
