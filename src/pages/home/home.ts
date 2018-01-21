import { Component } from '@angular/core';
import {AlertController, NavController, reorderArray} from 'ionic-angular';
import {TodoProvider} from "../../providers/todo/todo";
import {ArchivedTodosPage} from "../archived-todos/archived-todos";
import {ToastController} from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reorderIsEnable = false;
  constructor(public navCtrl: NavController , private alertController : AlertController
              ,private todoProvider: TodoProvider , private toastController: ToastController) {
     this.todos = this.todoProvider.getTodos();
  }

  openTodoAlert() {
     let addTodoAlert = this.alertController.create({
       title: 'Add A Todo',
       message: 'Enter A Todo',
       inputs: [
         {
           type: "text",
           name: "addTodoInput"
         }
       ],
       buttons: [
         {
           text: "Cancel"
         },
         {
          text: "Add",
           handler: (value) => {
              this.todoProvider.addTodo(value.addTodoInput);
              console.log("Added Todo: "+value.addTodoInput);
              addTodoAlert.onDidDismiss(()=>{
                let toast = this.toastController.create({
                  message: "Todo added successfully.",
                  duration: 2000
                });
                toast.present();
             });


           }
         }
       ]
     });
     addTodoAlert.present();
  }

  toggleReorder() {
    this.reorderIsEnable = !this.reorderIsEnable;
  }

  itemReordered($event) {
    reorderArray(this.todos , $event);
  }

  gotoArchivePage() {
    this.navCtrl.push(ArchivedTodosPage);
  }

  archiveTodo(todoIndex) {
      this.todoProvider.archiveTodo(todoIndex);
  }

  todoEdit(todoIndex) {
    let editAlert = this.alertController.create(
      {
        title: 'Edit Todo',
        message: 'Edit A Todo',
        inputs: [
          {
            type: "text",
            name: "editTodoInput",
            value: this.todos[todoIndex]
          }
        ],
        buttons: [
          {
            text: "Cancel"
          },
          {
            text: "Add",
            handler: (value) => {
              this.todoProvider.editTodo(todoIndex , value.editTodoInput);
              console.log("Edited Todo: "+value.addTodoInput);
              editAlert.onDidDismiss(()=>{
                let toast = this.toastController.create({
                  message: "Todo edited successfully.",
                  duration: 2000
                });
                toast.present();
              });


            }
          }
        ]
      },



    );
    editAlert.present();
  }
}
