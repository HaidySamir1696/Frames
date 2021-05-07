//product service
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
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
  getProducts(){
    return this.http.get<Product[]>(this.baseUrl + 'products')
  }
  //add new project
  addProject(title:any,productID:any,avatar:any,consultant:any,owner:any,location:any){
   // console.log(title,description,avatar,productID)
    const postData = new FormData();  
    postData.append("title",title);
    postData.append("productID",productID);
    postData.append("consultant",consultant);
    postData.append("owner",owner);
    postData.append("location",location);
    postData.append("avatar",avatar);
    console.log(postData)
    return this.http.post(this.baseUrl+'project/avatar',postData)
  }

  addProduct(title:any,description:any,avatar:any,selectedFile1:any,selectedFile2:any,selectedFile3:any){
    // console.log(title,description,avatar,productID)
     const postData = new FormData();  
     postData.append("title",title);
     postData.append("description",description);
     postData.append("avatar",avatar);
     postData.append("avatar",selectedFile1);
     postData.append("avatar",selectedFile2);
     postData.append("avatar",selectedFile3);
   //  postData.append("productID",productID);
    //  for(let index=0;index<avatar.length;index++)
    //  {
    //    const element=avatar[index];
    //    postData.append("avatar",element);
    //  }
     console.log(postData)
     return this.http.post(this.baseUrl+'product/avatar',postData)
   }
  // addProject(project: Project){
  //   return this.http.post(this.baseUrl+'projects',project)
  // }
  //delete project
  deleteProject(id:string){
    return this.http.delete(this.baseUrl + 'projects/' +id)
  }
  deleteProduct(id:string){
    return this.http.delete(this.baseUrl + 'products/' +id)
  }
  //update project
}