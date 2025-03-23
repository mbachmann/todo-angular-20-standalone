import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoItem, TodoItemControllerService } from '../openapi-gen';
import { ActivatedRoute } from '@angular/router';
import { parseIsoDateStrToDate } from '../shared/utils';
import { DatePipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss'],
  imports: [NgStyle, DatePipe],
})
export class TodoItemsComponent implements OnInit, OnDestroy {
  @ViewChild('taskNameTextField', { static: false }) taskNameTextField: ElementRef<HTMLInputElement> | undefined;
  private routeSubscription: Subscription | undefined;
  private subscription: Subscription | undefined;
  listId = '';
  todoItems: TodoItem[] = [];
  private editIndex = -1;

  constructor(
    private readonly todoItemControllerService: TodoItemControllerService,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    if (this.routeSubscription != undefined) {
      this.routeSubscription.unsubscribe();
    }
    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.listId = params['id'];
      // console.log(this.listId);
      this.refreshList(this.listId);
    });
  }

  getListId(id: number): string | undefined {
    if (this.todoItems.length > 0) {
      return this.todoItems[id].listId;
    }
    return '';
  }

  onDelete(itemId: number | undefined) {
    if (itemId !== undefined) {
      this.todoItemControllerService.deleteTodoItem(itemId).subscribe({
        next: () => this.refreshList(this.listId),
        error: err => console.log(err),
      });
    }
  }

  onEdit(index: number) {
    if (this.taskNameTextField !== undefined) {
      this.taskNameTextField.nativeElement.value = this.todoItems[index].taskName;
      this.editIndex = index;
    }
  }

  onDone(itemId: number | undefined) {
    if (itemId !== undefined) {
      this.todoItemControllerService.changeDoneState(itemId).subscribe({
        next: () => this.refreshList(this.listId),
        error: err => console.log(err),
      });
    }
  }

  refreshList(listId: string) {
    this.subscription = this.todoItemControllerService.getItemsOfOneList(listId).subscribe({
      next: data => {
        this.todoItems = data;
        this.todoItems.forEach(item => (item.createdAt = parseIsoDateStrToDate(item.createdAt)));
        if (this.taskNameTextField !== undefined) {
          this.taskNameTextField.nativeElement.focus();
          this.taskNameTextField.nativeElement.select();
        }
      },
      error: err => console.log(err),
    });
  }

  onEnterKeyDown() {
    if (this.taskNameTextField !== undefined) {
      const taskName: string = this.taskNameTextField.nativeElement.value;
      if (taskName.length > 0) {
        if (this.editIndex >= 0) {
          this.todoItems[this.editIndex].taskName = taskName;
          this.todoItemControllerService.editTodoItem(this.todoItems[this.editIndex]).subscribe({
            next: () => this.refreshList(this.listId),
            error: err => console.log(err),
          });

          this.editIndex = -1;
        } else {
          const todoItem: TodoItem = {
            taskName: taskName,
            listId: this.listId,
            done: false,
          };
          this.todoItemControllerService.newTodoItem(todoItem).subscribe({
            next: () => this.refreshList(this.listId),
            error: err => console.log(err),
          });
        }
        this.taskNameTextField.nativeElement.value = '';
      }
    }
  }
}
