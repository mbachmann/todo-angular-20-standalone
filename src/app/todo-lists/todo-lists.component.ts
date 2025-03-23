import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  TodoItemControllerService,
  TodoListName,
  TodoListNameControllerService,
  TodoListNameDTO,
} from '../openapi-gen';
import { TodoService } from '../services/todo.service';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClickStopPropagationDirective } from '../shared/directive/click-stop-propagation.directive';
import { KeydownStopPropagationDirective } from '../shared/directive/keydown-stop-propagation.directive';
import { getUUID } from '../shared/utils';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
  imports: [RouterLink, DatePipe, ClickStopPropagationDirective, KeydownStopPropagationDirective],
})
export class TodoListsComponent implements OnInit, OnDestroy {
  @ViewChild('listNameTextField', { static: false }) listNameTextField: ElementRef<HTMLInputElement> | undefined;
  private todoListNamesSubscription: Subscription | undefined;
  todoListNames: TodoListNameDTO[] = [];
  editIndex = -1;

  constructor(
    private readonly todoItemControllerService: TodoItemControllerService,
    private readonly todoListNameControllerService: TodoListNameControllerService,
    private readonly todoService: TodoService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.todoListNamesSubscription != undefined) {
      this.todoListNamesSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.todoListNamesSubscription = this.todoListNameControllerService.getAllTodoListNames().subscribe({
      next: data => (this.todoListNames = data),
      error: err => console.log(err),
    });
  }

  onEnterKeyDownField() {
    const inputField = this.listNameTextField?.nativeElement;
    if (!inputField) return;

    const listName = inputField.value.trim();
    if (!listName) return;

    const isEditing = this.editIndex >= 0;
    const existingList = isEditing ? this.todoListNames[this.editIndex] : null;

    const todoListName: TodoListName = {
      id: existingList?.listId ?? getUUID(),
      name: listName,
    };

    const request$ = isEditing
      ? this.todoListNameControllerService.updateTodoListName(todoListName.id, todoListName)
      : this.todoListNameControllerService.createTodoListName(todoListName);

    request$.subscribe({
      next: () => this.refreshList(),
      error: console.error,
    });

    if (isEditing) this.editIndex = -1;
    inputField.value = '';
  }

  onEnterKeyDownList(listId: string | undefined) {
    this.router.navigate(['/todoitem/', listId]);
  }

  onDelete(listId: string | undefined) {
    if (listId !== undefined) {
      this.todoListNameControllerService.deleteTodoListName(listId).subscribe({
        next: () => this.refreshList(),
        error: err => console.log(err),
      });
    }
  }

  onEdit(index: number) {
    if (
      this.listNameTextField !== undefined &&
      this.todoListNames[index] !== undefined &&
      this.todoListNames[index].listName !== undefined
    ) {
      this.listNameTextField.nativeElement.value = this.todoListNames[index].listName;
      this.editIndex = index;
    }
  }
}
