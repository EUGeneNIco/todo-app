import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from './models/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  formModel: FormGroup;
  tasks: Task[] = [];

  constructor(
    private fb: FormBuilder,
  ){

  }

  ngOnInit(): void {
    if(!this.formModel){
      this.formModel = this.fb.group({
        task: ['', Validators.required]
      })
    }
  }


  addTask(){
    if(this.formModel.valid){
      const record = this.formModel.getRawValue();
      // console.log('Add!: ', record,this.tasks.length);
      let availableId = this.tasks.length;
      const task = {
        id: availableId,
        enlistedTask: record.task,
        editMode: false
      }
      this.tasks.push(task);
      this.formModel.reset();
    }
    else{
      console.log('INVALID');
    }


  }
  
  onUpdateTask(taskId: number, updatedTask: string){
    let task = this.tasks.find(task => {
      return task.id === taskId
    });
    
    task.enlistedTask = updatedTask;
    task.editMode = false;
  }

  onEditTask(taskId: number){
    let task = this.tasks.find(task => {
      return task.id === taskId
    });

    task.editMode = true;
  }

  onDeleteTask(taskId: number){
    this.tasks = this.tasks.filter(task => {
      return task.id !== taskId;
    })
  }
}
