import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  baseUrl="http://localhost:3000/"

  constructor( private http: HttpClient) { }
  getProjects(){
    return this.http.get<Project[]>(this.baseUrl + 'projects')
  }
  addProject(title:any,description:any,productID:any,avatar:any){
   // console.log(title,description,avatar,productID)
    const postData = new FormData();  
    postData.append("title",title);
    postData.append("description",description);
    postData.append("productID",productID);
    postData.append("avatar",avatar);
    console.log(postData)
    return this.http.post(this.baseUrl+'project/avatar',postData)
  }

  // addProject(project: Project){
  //   return this.http.post(this.baseUrl+'projects',project)
  // }
  //delete project
  deleteProject(id:string){
    return this.http.delete(this.baseUrl + 'projects/' +id)
  }

  //update project
}
