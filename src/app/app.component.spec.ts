import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { RouterModule } from '@angular/router';
import { ApiModule, BASE_PATH, TodoItemControllerService, TodoItemListsDTO } from './openapi-gen';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let httpMock: HttpTestingController;
  let baseUrl: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterModule.forRoot([
          { path: 'home', component: TodoListsComponent },
          { path: '', component: TodoListsComponent },
        ]),
      ],
      providers: [
        TodoItemControllerService,
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(ApiModule),
        {
          provide: BASE_PATH,
          useValue: environment.API_BASE_PATH,
        },
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    baseUrl = environment.API_BASE_PATH;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todo-angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('todo-angular');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('Todo App');
  });

  it('should navigate to home and display TodoListsComponent', async () => {
    const harness = await RouterTestingHarness.create();
    // Navigate to the route to get your component
    const activatedComponent = await harness.navigateByUrl('/', TodoListsComponent);
    const req = httpMock.expectOne(baseUrl + '/api/v1/listids');
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    const todoList: TodoItemListsDTO = {
      count: 2,
      todoItemList: ['083e8820-0186-4c68-af01-af2ced91805a', '1da5ba97-4365-4560-bb23-2335f099288e'],
    };
    req.flush(todoList);
    // await new Promise(resolve => setTimeout(resolve, 500)); // 500 ms
    console.log('AppComponent.activatedComponent.todoLists.count', activatedComponent.todoLists.count);
    expect(activatedComponent.todoLists.count).toBe(todoList.count);
    expect(activatedComponent.todoLists.todoItemList).toBe(todoList.todoItemList);
  });
});
