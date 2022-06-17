import {IsNotEmpty} from 'class-validator';
import {ProjectCategory} from '../project.constants';

export interface ProjectRegisterRequestDto{
   name: string;

   url : string;

   description: string;

   category: ProjectCategory;
}
