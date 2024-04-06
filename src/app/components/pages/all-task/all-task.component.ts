import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DatePipe } from '@angular/common';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';


@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule,DatePipe,PageTitleComponent,TaskListComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.css'
})
export class AllTaskComponent {
  newTask="";
  taskList:any[]=[];
  initialTasklist:any[]=[];
  httpService=inject(HttpService);
  StateService=inject(StateService);
  ngOnInit(){
    this.StateService.searchSubject.subscribe((value)=>{
      if(value){
        this.taskList=this.initialTasklist.filter((x)=>
        x.title.toLowerCase().includes(value.toLowerCase()))
      }else{
        this.taskList=this.initialTasklist;
      }
      // console.log("search", value)
    })
    this.getAllTasks();
  }
  addTask(){
    console.log("addTask",this.newTask);
    this.httpService.addTask(this.newTask).subscribe(()=>{
      // console.log("added");
      this.newTask="";
      this.getAllTasks();
    })
  }
  getAllTasks(){
    this.httpService.getAllTasks().subscribe((result:any)=>{
      // console.log(result);
      this.initialTasklist= this.taskList=result;
    })
  }
  onComplete(task:any){
    task.completed=true;
console.log("completed", task);
this.httpService.updateTask(task).subscribe(()=>{
this.getAllTasks();
})

  }
  onImportant(task:any){
    task.important=true;
    console.log("important", task)
    this.httpService.updateTask(task).subscribe(()=>{
  this.getAllTasks();
    })
  }
    

  
}
