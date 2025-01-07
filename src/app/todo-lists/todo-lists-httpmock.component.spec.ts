import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListsComponent } from './todo-lists.component';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiModule, BASE_PATH, TodoItemControllerService, TodoItemListsDTO } from '../openapi-gen';
import { importProvidersFrom } from '@angular/core';
import { environment } from '../../environments/environment';

describe('TodoListsComponent Test with http mock', () => {
  let component: TodoListsComponent;
  let fixture: ComponentFixture<TodoListsComponent>;
  let httpMock: HttpTestingController;
  let baseUrl: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListsComponent],
      providers: [
        TodoItemControllerService,
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(ApiModule),
        { provide: BASE_PATH, useValue: environment.API_BASE_PATH },
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    baseUrl = environment.API_BASE_PATH;
    fixture = TestBed.createComponent(TodoListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  display TodoListsComponent with 3 items', async () => {
    const req = httpMock.expectOne(baseUrl + '/api/v1/listids');
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    const todoList: TodoItemListsDTO = {
      count: 3,
      todoItemList: [
        '083e8820-0186-4c68-af01-af2ced91805a',
        '1da5ba97-4365-4560-bb23-2335f099288e',
        '1da5ea4a-fa71-4192-a17d-35d8ae8167ef',
      ],
    };
    req.flush(todoList);
    // await new Promise(resolve => setTimeout(resolve, 500)); // 500 ms
    console.log('TodoListComponent.todoLists.count', component.todoLists.count);
    expect(component.todoLists.count).toBe(todoList.count);
    expect(component.todoLists.todoItemList).toBe(todoList.todoItemList);
  });
});
