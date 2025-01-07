import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListsComponent } from './todo-lists.component';
import { TodoItemControllerService } from '../openapi-gen';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('TodoListsComponent Test with spy', () => {
  let component: TodoListsComponent;
  let fixture: ComponentFixture<TodoListsComponent>;
  let todoService: jasmine.SpyObj<TodoService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const todoServiceSpy = jasmine.createSpyObj('TodoService', ['getListIDs']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [TodoListsComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        TodoItemControllerService,
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListsComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    if (component['subscription']) {
      component['subscription'].unsubscribe();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch todo lists and update the todoLists property', () => {
    const mockData = { todoItemList: ['list1', 'list2'], count: 2 };
    todoService.getListIDs.and.returnValue(of(mockData));

    component.useOwnService();
    expect(todoService.getListIDs).toHaveBeenCalled();
    expect(component.todoLists).toEqual(mockData);
  });

  it('should handle errors when fetching todo lists', () => {
    spyOn(console, 'log');
    todoService.getListIDs.and.returnValue(throwError(() => new Error('Error fetching data')));

    component.useOwnService();
    expect(todoService.getListIDs).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(new Error('Error fetching data'));
  });

  it('should navigate to the correct route when onEnterKeyDown is called', () => {
    const listId = 'list1';
    component.onEnterKeyDown(listId);
    expect(router.navigate).toHaveBeenCalledWith(['/todoitem/', listId]);
  });

  it('should unsubscribe on destroy', () => {
    const mockSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component['subscription'] = mockSubscription;

    component.ngOnDestroy();
    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
  });
});
