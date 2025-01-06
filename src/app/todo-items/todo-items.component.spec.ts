import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoItemsComponent } from './todo-items.component';
import { TodoItem, TodoItemControllerService } from '../openapi-gen';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

describe('TodoItemsComponent', () => {
  let component: TodoItemsComponent;
  let fixture: ComponentFixture<TodoItemsComponent>;
  let mockTodoItemControllerService: jasmine.SpyObj<TodoItemControllerService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockTodoItemControllerService = jasmine.createSpyObj('TodoItemControllerService', [
      'deleteTodoItem',
      'changeDoneState',
      'getItem',
      'editTodoItem',
      'newTodoItem',
    ]);

    mockActivatedRoute = {
      params: of({ id: '123' }),
    };

    await TestBed.configureTestingModule({
      imports: [TodoItemsComponent],
      providers: [
        { provide: TodoItemControllerService, useValue: mockTodoItemControllerService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        importProvidersFrom(FormsModule),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemsComponent);
    component = fixture.componentInstance;

    // Mocking the ViewChild reference
    component.taskNameTextField = {
      nativeElement: {
        value: '',
        focus: jasmine.createSpy('focus'),
        select: jasmine.createSpy('select'),
      },
    } as any;
  });

  it('should display the listId in the template', () => {
    component.listId = '123';
    component.todoItems = [
      { taskName: 'Task 1', listId: '123' },
      { taskName: 'Task 2', listId: '123' },
    ] as TodoItem[];
    fixture.detectChanges();

    const listInfo = fixture.debugElement.query(By.css('.todo-info')).nativeElement;
    const text: string = listInfo.textContent;
    expect(text.endsWith('123')).toBe(true);
  });

  it('should display the number of todo items', () => {
    component.todoItems = [{ taskName: 'Task 1' }, { taskName: 'Task 2' }] as TodoItem[];
    fixture.detectChanges();

    const listInfo = fixture.debugElement.query(By.css('.todo-listinfo')).nativeElement;
    expect(listInfo.textContent).toContain('Todo Items : 2 Items');
  });

  it('should add a new task on enter key press', () => {
    mockTodoItemControllerService.newTodoItem.and.returnValue(of());
    spyOn(component, 'refreshList');

    const inputElement = fixture.debugElement.query(By.css('#taskNameTextField')).nativeElement;
    inputElement.value = 'New Task';
    fixture.detectChanges();
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(mockTodoItemControllerService.newTodoItem).toHaveBeenCalledWith(
      jasmine.objectContaining({ taskName: 'New Task' })
    );
    expect(component.refreshList).toHaveBeenCalled();
  });

  it('should render todo items with proper details', () => {
    component.todoItems = [
      { taskName: 'Task 1', done: false, itemId: 1, listId: '123' },
      { taskName: 'Task 2', done: true, itemId: 2, listId: '123' },
    ] as any;
    fixture.detectChanges();

    const todoItems = fixture.debugElement.queryAll(By.css('.row'));
    expect(todoItems.length).toBe(3);

    const firstItemText = todoItems[1].query(By.css('span')).nativeElement.textContent;
    const secondItemText = todoItems[2].query(By.css('span')).nativeElement.textContent;

    expect(firstItemText).toContain('Task 1');
    expect(secondItemText).toContain('Task 2');
  });

  it('should call onDelete when delete button is clicked', () => {
    spyOn(component, 'onDelete');
    component.todoItems = [{ taskName: 'Task 1', done: false, itemId: 1 }] as any;
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(By.css('.fa-trash')).parent;
    if (deleteButton) deleteButton.triggerEventHandler('click', null);

    expect(component.onDelete).toHaveBeenCalledWith(1);
  });

  it('should call onEdit when edit button is clicked', () => {
    spyOn(component, 'onEdit');
    component.todoItems = [{ taskName: 'Task 1', done: false, itemId: 1 }] as any;
    fixture.detectChanges();

    const editButton = fixture.debugElement.query(By.css('.fa-edit')).parent;
    if (editButton) editButton.triggerEventHandler('click', null);

    expect(component.onEdit).toHaveBeenCalledWith(0);
  });

  it('should call onDone when checkbox is clicked', () => {
    spyOn(component, 'onDone');
    component.todoItems = [{ taskName: 'Task 1', done: false, itemId: 1 }] as any;
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    checkbox.triggerEventHandler('click', null);

    expect(component.onDone).toHaveBeenCalledWith(1);
  });
});
