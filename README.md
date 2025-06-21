# Todo Angular based on angular 20.x.x standalone

[https://github.com/mbachmann/todo-angular-20-standalone.git](https://github.com/mbachmann/todo-angular-20-standalone.git)

## Content

- [Create a new Project](#create-a-new-project)

  - [Prepare Intellij for Karma Debugging](#prepare-intellij-for-karma-debugging)
  - [Install EsLint with Prettier](#install-eslint-with-prettier)
  - [Install the OpenApi Tools](#install-the-openapi-tools)
  - [Generate the Model and the Backend API](#generate-the-model-and-the-backend-api)
  - [Install Bootstrap](#install-bootstrap)
  - [Install FontAwesome](#install-fontawesome)

- [Create a utils file](#create-a-utils-file)

  - [Create stop propagation directives](#create-stop-propagation-directives)

- [Create the myFirst component](#create-the-myfirst-component)
  - [Create an own Service](#create-an-own-service)
- [Create the TodoLists component](#create-the-todolists-component)
  - [Display the TodoLists component through the router](#display-the-todolists-component-through-the-router)
  - [Create the TodoItems component](#create-the-todoitems-component)
  - [Add the Routings for the TodoItemComponent](#add-the-routings-for-todoitemscomponent)
- [Define the AppComponent](#redefine-the-appcomponent)

  - [Add global styles](#add-global-styles)
  - [Add the image todo.svg](#add-the-image-todosvg-to-the-public-folder)

- [Create a Template driven Signup-Form](#create-a-template-driven-form-signup-form)

  - [Create a reactive Login-Form](#create-a-reactive-login-form)
  - [Create a Directive for a Tool Tip](#create-a-directive-for-a-tool-tip)

- [Create a Docker Container](#create-a-docker-container-run-and-publish-to-docker)
  - [Run the App with a docker-compose.yml file](#run-the-app-with-a-docker-compose-file)
  - [Create a Dockerfile](#create-a-dockerfile)
  - [Create a docker-compose file](#create-a-docker-composeyml-file)

## Preview

![preview.png](readme/preview.png)

<br>

## Prerequisites

Both the CLI and generated project have dependencies that require Node 20.19 or higher, together with NPM 10.7.0 or higher.

The related Spring Boot Backend can be found here: [https://github.com/mbachmann/spring-boot-todo-app](https://github.com/mbachmann/spring-boot-todo-app)

## Links

- [Angular Home](https://angular.io/)
- [Angular Cli Github](https://github.com/angular/angular-cli)
- [Angular Cli Home](https://cli.angular.io/)

### Clean up old Angular cli version

```sh
    npm uninstall -g angular-cli
```

### New Installation

Global package:

```sh
    npm install -g @angular/cli@latest
```

---

## Create a new project

Create new project with angular-cli:

    ng new PROJECT_NAME

Go into project directory:

    cd PROJECT_NAME

Replace `PROJECT_NAME` with e.g. `todo-angular`.

- The `new` command will generate a standalone project. For the traditional
  aproach the --no-standalone option has to be added.
- For the stylesheet format you can use `scss`. We will use in the tutorial scss.

```sh
ng new todo-angular
  CSS
❯ SCSS   [ https://sass-lang.com/documentation/syntax#scss                ]
  Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ]
  Less   [ http://lesscss.org                                             ]

  ? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)?
(y/N) N
```

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

---

## Prepare Intellij for Karma Debugging

We need to create a Karma config file by using the terminal at the root of the project:

```sh
ng generate config karma
```

This will produce a file `karma.conf.js`. More info [here](https://angular.dev/guide/testing):

Add a new configuration in IntelliJ:

![edit-configuration.png](readme/edit-configuration.png)

Add a Karma configuration:

![add-configuration.png](readme/add-configuration.png)

Edit the Configuration:

![karma-configuration.png](readme/karma-configuration.png)

---

## Install EsLint with Prettier

In web application development, using Angular as a reference framework, maintaining a clean, consistent and
well-formatted code is crucial for the quality and maintainability of the project.
Two tools to achieve this goal are ESLint and Prettier.

### What is ESLint and what is Prettier?

ESLint is a static code analysis tool focused on finding and correcting problems in JavaScript code and
other JavaScript-based languages, such as TypeScript; it is used to maintain cleaner, more consistent and error-free code.
Prettier is a code formatting tool used to ensure that source code follows a
consistent formatting style. It supports multiple programming languages and
integrates easily with various development environments and text editors.

### How do we install it?

First, we will have to go inside our Angular project through a terminal.
And we will install `ESLint` introducing the following command:

```sh
ng add @angular-eslint/schematics
```

Two files have been modified and one has been added.
The two modified files are `package.json` and `angular.json`;
and the added `.eslintrc.json`.

### Install Prettier

Second, we will install `Prettier`, and we will do it by entering the following command:

```sh
npm install prettier --save-dev
```

With this command we have added the Prettier dependency to our `package.json`.
In order to set up our Prettier rules we will have to create the following file in the `root` of the project: `.prettierrc.json` and `.prettierignore`.
See the following link for the available Prettier rules. [https://prettier.io/docs/en/options.html](https://prettier.io/docs/en/options.html)

**.prettierrc.json**

```json
{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "semi": true,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "trailingComma": "es5",
  "bracketSameLine": true,
  "printWidth": 80,
  "overrides": [
    {
      "files": ["*.html", "*.ts"],
      "options": {
        "printWidth": 120
      }
    },
    {
      "files": "*.html",
      "options": {
        "parser": "html"
      }
    },
    {
      "files": "*.component.html",
      "options": {
        "parser": "angular"
      }
    }
  ]
}
```

**.prettierignore**

```sh
package.json
package-lock.json
.eslintrc.json
tsconfig.json
dist
/.angular/cache
lint-*

```

Add the following scripts to `package.json`:

```json
 "scripts": {
    ...

    "prettier:write": "prettier --config .prettierrc.json --write .",
    "prettier:check": "prettier --config .prettierrc.json --check ."
  },
```

We can check the installation by running the scripts:

```sh
npm run prettier:check
npm run prettier:write
```

`Check` informs you about the code issues and `write` is fixing them.

### Install ESLint

Finally, to make Prettier work with ESLint, enter the following command in the terminal:

```sh
npm install prettier-eslint eslint-config-prettier eslint-plugin-prettier --save-dev
```

Once installed, we must include the prettier plugin in the file `eslint.config.ts`:

**eslint.config.ts**

```ts
// @ts-check
// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
    ],
    ignores: ['src/app/openapi-gen/*'],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/no-explicit-any': ['off'],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      eslintPluginPrettierRecommended,
    ],
    rules: {
      // "@angular-eslint/template/interactive-supports-focus":["off"]
    },
  }
);
```

Disable the next line from linting:

```typescript
// eslint-disable-next-line
```

In typescript, we can disable several lines from linting by using:

```typescript
  /* eslint-disable */
  ..
  /* eslint-enable */
```

In `HTML` we can disable several lines from linting by using:

```html
<!-- eslint-disable -->
...
<!-- eslint-enable -->
```

If we run `ng lint` we are likely to get multiple lint errors. If we want simple errors to be fixed quickly,
we will type `ng lint --fix`; some of them may need to be manually modified by us.

We can add the linting scripts to `package.json`:

```json
 "scripts": {
    ...

    "lint:check": "ng lint",
    "lint:fix": "ng lint --fix",
    "prettier:write": "prettier --config .prettierrc.json --write .",
    "prettier:check": "prettier --config .prettierrc.json --check ."
  },
```

We can check the installation by running the scripts:

```sh
npm run lint:check
npm run lint:fix
```

---

## Update the angular.json file due to a changed behavior of the Angular CLI in version 20

The angular.json file contains the configuration for the project. The file is created by the angular-cli when you create a new project.

In version 20 the behavior of the ng-cli has changed. The generator does not generate anymore a .component.ts or .service.ts file.
This is not the desired behavior for this tutorial, therefore we have to change the angular.json file.

[https://blog.angular.dev/announcing-angular-v20-b5c9c06cf301]{https://blog.angular.dev/announcing-angular-v20-b5c9c06cf301}

Open the file `angular.json` and change the section `schematics` to the following code:

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "todo-angular": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "standalone": false,
          "type": "component"
        },
        "@schematics/angular:directive": {
          "standalone": false,
          "type": "directive"
        },
        "@schematics/angular:interceptor": {
          "typeSeparator": "."
        },
        "@schematics/angular:pipe": {
          "standalone": false,
          "typeSeparator": "."
        },
        "@schematics/angular:resolver": {
          "typeSeparator": "."
        },
        "@schematics/angular:module": {
          "typeSeparator": "."
        },
        "@schematics/angular:service": {
          "type": "service"
        }
      },
      "root": "",
      "sourceRoot": "src"
      ... 
      ...  
    }
  }
}
```
---

## Install the OpenApi Tools

```sh
npm i -D  @openapitools/openapi-generator-cli
```

create the folder `src/app/openapi`.

Put the yaml file `api-docs.yaml` from https://todo-h2.united-portal.com/v3/api-docs.yaml in the folder `src/app/openapi`.

Add the `generate:api` command to the scripts section of `package.json` (the last line needs eventually a comma to fulfill the json rules).

```json
  "scripts": {
    ...
    ...
    "generate:api": "openapi-generator-cli generate -g typescript-angular -i  src/app/openapi/api-docs.yaml -o src/app/openapi-gen"
  },
```

Create a file `openapitools.json` in the root of the project and adjust the version to 5.3.0 of the generator:

```json
{
  "$schema": "node_modules/@openapitools/openapi-generator-cli/config.schema.json",
  "spaces": 2,
  "generator-cli": {
    "version": "5.3.0"
  }
}
```

---

## Generate the Model and the Backend API

Having one file to define your API is helpful and can save you a lot of development time and prevent possible bugs
caused by different models or API implementations in your frontend and backend code.

OpenAPI provides a good specification with helpful documentation.
Additionally, many existing backends use Swagger for their API documentation, therefore it should also be possible
to use this code generation for frontend applications where you cannot to modify the corresponding backend.

Due to the many supported languages and frameworks, it can be used in nearly every project,
and the initial setup is not very hard.

The _model_ and _api_ is generated based on the `api-docs.yaml` file in the folder `src/app/openapi-gen`. The following command creates the files.

```sh
npm run generate:api
```

The generator puts the code to the `src/app/openapi-gen` folder.

<br>

![openapi-gen.png](readme/openapi-gen.png)

<br>

**Don't forget adding the generated files to git!**

<br>

Create the environment files:

```
ng generate environments
```

src/environments
|- environment.ts
|- environment.development.ts
|- environment.staging.ts (.. not generated ..)

Add the url to the backend to the files `enviroments/enviroment.ts` and `enviroment.prod.ts`.

**environment.ts**

```typescript
export const environment = {
  production: true,
  API_BASE_PATH: '_API_BASE_PATH',
};
```

**environment.development.ts**

```typescript
export const environment = {
  production: false,
  API_BASE_PATH: 'https://todo-h2.united-portal.com',
};
```

Add in the `angular.json` file the `fileReplacement` for the development environment:

```json
"configurations": {
  ...
  ...
  ...
  "test": {
    ...
    ...
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.development.ts"
      }
    ]
  }
}
```

<br>

Add the generated **ApiModule** to the `app.config.ts`. The Module has a dependency to the HttpClient and the environment base path.

```typescript
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ApiModule, BASE_PATH } from './openapi-gen';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(ApiModule),
    {
      provide: BASE_PATH,
      useValue: environment.API_BASE_PATH,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
```

Verify the code generation by restarting the project again.

## Install Bootstrap

We are styling the TodoApp with Bootstrap 5.x.

```sh
npm install --save @popperjs/core
npm install --save bootstrap
```

Please add below code into `angular.json` file:

```json
"styles": [
              ...

              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.scss"
          ],
"scripts": [
              ...
              "node_modules/@popperjs/core/dist/umd/popper.min.js",
              "node_modules/bootstrap/dist/js/bootstrap.min.js"
           ]
```

Please add below code into `styles.scss` file:

```scss
@use 'bootstrap/scss/bootstrap';
```

## Install FontAwesome

```sh
npm install --save @fortawesome/fontawesome-free
```

Please add below code into `angular.json` file:

```json
"styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "node_modules/@fortawesome/fontawesome-free/css/all.css",
              "src/styles.scss"
          ],
```

Please add below code into `styles.scss` file:

```scss
@use '@fortawesome/fontawesome-free/scss/fontawesome';
```

---

## Create a utils file

Create a folder `src/app/shared`. In this folder create a file `utils.ts`.This file contains a data reviver function,
restoring a ISO8601 string to a Date object a function `getUUID` to create a UUID.

```typescript
const isoDateFormat =
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

export function parseIsoDateStrToDate(value: any) {
  if (typeof value === 'string' && isoDateFormat.test(value)) {
    return new Date(value);
  }
  return value;
}

export function getUUID() {
  let result = '';
  let hexcodes = '0123456789abcdef'.split('');

  for (let index = 0; index < 32; index++) {
    let value = Math.floor(Math.random() * 16);

    switch (index) {
      case 8:
        result += '-';
        break;
      case 12:
        value = 4;
        result += '-';
        break;
      case 16:
        value = (value & 3) | 8;
        result += '-';
        break;
      case 20:
        result += '-';
        break;
    }
    result += hexcodes[value];
  }
  return result;
}
```

---

## Create stop propagation directives

Create a folder `src/app/shared/directive`. In this folder create the files

- `click-stop-propagation.directive.ts` and
- `keydown-stop-propagation.directive.ts`

The directive can be used in the HTML template to stop the propagation of the click and keydown events.

**click-stop-propagation.directive.ts**

```typescript
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[click-stop-propagation]',
})
export class ClickStopPropagation {
  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    event.stopPropagation();
  }
}
```

**keydown-stop-propagation.directive.ts**

```typescript
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[keydown-stop-propagation]',
})
export class KeydownStopPropagationDirective {
  @HostListener('keydown', ['$event'])
  public onKeydown(event: any): void {
    event.stopPropagation();
  }
}
```

The directives will be used later for the `TodoListsComponent`.

---

## Create the MyFirst component

We want to create a Mouse Tracking Component which shows the current coordinate of the mouse
and the state of the mouse click.

This component demonstrates fundamental Angular concepts, including property binding,
event binding, and event handling.
It is designed to capture mouse and keyboard events,
interact dynamically with a parent component,
and manage both input and output properties effectively.

![my-first.png](readme/my-first.png)

We create the source code files through angular cli:

```sh
ng generate component MyFirst
```

The cli has created four different files:

![cli-create.png](readme/cli-create.png)

**CSS Rules**

We add the following _css rules_ to the file `my-first.component.scss`:

```css
.paragraph {
  padding-bottom: 3px;
}
```

**The component class file**

The component file `my-first.component.ts` contains the logic with the methods
to display the event and the coordinates:

```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-my-first',
  templateUrl: './my-first.component.html',
  styleUrls: ['./my-first.component.scss'],
})
export class MyFirstComponent {
  @Input() headerTitle = 'My first component';
  @Output() myEvent = new EventEmitter<string>();

  backgroundColor = 'lightgray';
  textColor = 'red';

  public event?: MouseEvent;
  public clientX = 0;
  public clientY = 0;
  public onEvent(event: MouseEvent): void {
    this.event = event;
  }
  public coordinates(event: MouseEvent): void {
    this.clientX = event.clientX;
    this.clientY = event.clientY;
  }

  sendEvent() {
    this.myEvent.emit(this.headerTitle);
  }

  onKeyEvent($event: Event) {
    console.log($event);
  }
}
```

### Explanation of the code

**Component Decorator**

```typescript
@Component({
selector: 'app-my-first',
templateUrl: './my-first.component.html',
styleUrls: ['./my-first.component.scss'],
})
```

- `selector`: Defines the custom HTML tag for the component (`<app-my-first>`).
- `templateUrl`: Specifies the path to the HTML template that defines the component’s structure.
- `styleUrls`: Points to the CSS/SCSS file for the component’s styling.

**Class Properties**

```typescript
@Input() headerTitle = 'My first component';
@Output() myEvent = new EventEmitter<string>();

backgroundColor = 'lightgray';
textColor = 'red';

public event?: MouseEvent;
public clientX = 0;
public clientY = 0;
```

- `headerTitle`: An input property that allows the parent component to pass a string value to this component.
  It has a default value of `My first component`.
- `myEvent`: An output property that emits a string event to the parent component using EventEmitter.
- `backgroundColor` and `textColor`: Define default colors for the component’s appearance.
- `event`, `clientX`, `clientY`: Used to store information about mouse events,
  such as the event object itself and the x/y coordinates of the cursor.

**HTML Template**

We insert following template code into the file `my-first.component.html`.

This Angular template demonstrates dynamic data binding, interactive event handling, and responsive styling.
It provides a solid foundation for creating user interfaces that respond to user interactions in real-time.

```html
<p
  class="paragraph"
  [style.background-color]="backgroundColor"
  [style.color]="textColor">
  {{ headerTitle }}
</p>

<h3 class="title">Mouse Events</h3>
<div
  class="box"
  tabindex="1"
  (mouseenter)="onEvent($event)"
  (mouseleave)="onEvent($event)"
  (mousemove)="coordinates($event)"
  (click)="onEvent($event)"
  (keydown.enter)="onKeyEvent($event)"
  (dblclick)="onEvent($event)"
  on-contextmenu="onEvent($event)">
  <!-- (event)="" or on-event="" -->
  <p class="type">Type: {{ event?.type }}</p>
  <p>x: {{ clientX }}, y: {{ clientY }}</p>
  <p>
    <small
      >ctrl: {{ event?.ctrlKey }}, shift: {{ event?.shiftKey }}, meta: {{
      event?.metaKey }}</small
    >
  </p>
</div>

<div>
  <button class="btn btn-primary btn-sm" (click)="sendEvent()">
    Send Title
  </button>
</div>
```

### Template Breakdown

#### 1. Paragraph Element

```html
<p
  class="paragraph"
  [style.background-color]="backgroundColor"
  [style.color]="textColor">
  {{ headerTitle }}
</p>
```

**Features**

- **Dynamic Styling**:

  - `[style.background-color]="backgroundColor"`: Dynamically sets the background color using the backgroundColor property from the component.

  - `[style.color]="textColor"`: Dynamically sets the text color using the textColor property from the component.

- **Data Binding**:

  - {{ headerTitle }}: Interpolates the value of the headerTitle property from the component and displays it as text content.

#### 2. Mouse Events Section

```html
<h3 class="title">Mouse Events</h3>
```

Displays a static title for the section.

**Interactive Box**

```html
<div
  class="box"
  tabindex="1"
  (mouseenter)="onEvent($event)"
  (mouseleave)="onEvent($event)"
  (mousemove)="coordinates($event)"
  (click)="onEvent($event)"
  (keydown.enter)="onKeyEvent($event)"
  (dblclick)="onEvent($event)"
  on-contextmenu="onEvent($event)"></div>
```

**Features:**

- **Styling and Accessibility:**

  - `class="box"`: Applies styles defined in the corresponding CSS.
  - `tabindex="1"`: Makes the div focusable using the Tab key.

- **Event Binding:**

  - `(mouseenter)`: Triggers `onEvent($event)` when the mouse enters the div.
  - `(mouseleave)`: Triggers `onEvent($event)` when the mouse leaves the div.
  - `(mousemove)`: Calls `coordinates($event)` to track the mouse's position.
  - `(click)`: Calls `onEvent($event)` on a click.
  - `(keydown.enter)`: Triggers `onKeyEvent($event)` when the Enter key is pressed while the div is focused.
  - `(dblclick)`: Calls `onEvent($event)` on a double click.
  - `on-contextmenu="onEvent($event)"`: Handles right-click or context menu events.

**Dynamic Content Display**

```html
<p class="type">Type: {{ event?.type }}</p>
<p>x: {{ clientX }}, y: {{ clientY }}</p>
<p>
  <small
    >ctrl: {{ event?.ctrlKey }}, shift: {{ event?.shiftKey }}, meta: {{
    event?.metaKey }}</small
  >
</p>
```

- **Binding with Safe Navigation Operator:**

`{{ event?.type }}`: Displays the type of the last event.
`{{ event?.ctrlKey }}`, `{{ event?.shiftKey }}`, `{{ event?.metaKey }}`: Shows the state of modifier keys.

- **Mouse Coordinates:**

`{{ clientX }}`, `{{ clientY }}`: Displays the x and y coordinates of the mouse pointer.

#### 3. Button Element

```html
<div>
  <button class="btn btn-primary btn-sm" (click)="sendEvent()">
    Send Title
  </button>
</div>
```

**Features:**

- **Styling**:

  - `class="btn btn-primary btn-sm"`: Applies pre-defined Bootstrap button styles for small, primary buttons.

- **Event Binding**:

  - `(click)="sendEvent()"`: Triggers the `sendEvent()` method in the component when clicked.

**Unit Test**

We create a unit test code and insert it into the file `my-first.component.spec.ts`.

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFirstComponent } from './my-first.component';
import { By } from '@angular/platform-browser';

describe('MyFirstComponent', () => {
  let component: MyFirstComponent;
  let fixture: ComponentFixture<MyFirstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyFirstComponent],
    });
    fixture = TestBed.createComponent(MyFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Verifies that the component initializes successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Checks that the headerTitle property value is rendered correctly in the paragraph element.
   */
  it('should render headerTitle in the paragraph', () => {
    const paragraph = fixture.debugElement.query(
      By.css('.paragraph')
    ).nativeElement;
    expect(paragraph.textContent).toContain('My first component');
  });

  /**
   * Confirms that the paragraph's background and text colors are updated dynamically based on component properties.
   */
  it('should update styles based on component properties', () => {
    component.backgroundColor = 'blue';
    component.textColor = 'white';
    fixture.detectChanges();
    const paragraph = fixture.debugElement.query(
      By.css('.paragraph')
    ).nativeElement;
    expect(paragraph.style.backgroundColor).toBe('blue');
    expect(paragraph.style.color).toBe('white');
  });

  /**
   * Ensures that the myEvent emits the headerTitle value when the sendEvent() method is invoked.
   */
  it('should emit myEvent with headerTitle when sendEvent is called', () => {
    spyOn(component.myEvent, 'emit');
    component.sendEvent();
    expect(component.myEvent.emit).toHaveBeenCalledWith('My first component');
  });

  /**
   * Validates that the clientX, clientY, and event.type properties are updated correctly based on mouse events.
   */
  it('should update event and coordinates on mouse events', () => {
    const box = fixture.debugElement.query(By.css('.box'));
    let mockEvent = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });

    box.triggerEventHandler('mousemove', mockEvent);

    expect(component.clientX).toBe(100);
    expect(component.clientY).toBe(200);

    mockEvent = new MouseEvent('mouseenter', { clientX: 100, clientY: 200 });
    box.triggerEventHandler('mouseenter', mockEvent);
    expect(component.event?.type).toBe('mouseenter');
  });

  /**
   * Ensures that pressing the Enter key triggers the corresponding handler and logs the event.
   */
  it('should handle keydown event when Enter is pressed', () => {
    spyOn(console, 'log');
    const box = fixture.debugElement.query(By.css('.box'));
    const mockKeyEvent = new KeyboardEvent('keydown', { key: 'Enter' });

    box.triggerEventHandler('keydown.enter', mockKeyEvent);

    expect(console.log).toHaveBeenCalledWith(mockKeyEvent);
  });

  /**
   * Confirms that a mouse click updates the event.type property.
   */
  it('should update event on mouse click', () => {
    const box = fixture.debugElement.query(By.css('.box'));
    const mockClickEvent = new MouseEvent('click');

    box.triggerEventHandler('click', mockClickEvent);

    expect(component.event?.type).toBe('click');
  });
});
```

**Explanation of the Test Cases:**

1. Component Creation: Ensures the component initializes correctly.
2. Input Binding: Verifies that `headerTitle` is displayed in the template.
3. Style Updates: Ensures styles update dynamically based on the backgroundColor and textColor properties.
4. Output Event: Checks that the `myEvent` emitter emits the correct value.
5. Mouse Event Handling: Simulates mouse events to verify event and coordinates properties are updated.
6. Keydown Event Handling: Ensures the `keydown.enter` event triggers `onKeyEvent` and logs the event.
7. Mouse Click Handling: Tests the handling of a click event.

### Add the MyFirstComponent to AppComponent

To make the `MyFirst` component work, we need to include it in the `app.component.html` file.
First, delete the existing generated content, and then replace it with the following:

```html
<div class=" container-md">
  <div class="mt-3 row">
    <div class="col-md-4">
      <app-my-first
        (myEvent)="onMyEvent($event)"
        headerTitle="Static 1"></app-my-first>
    </div>
    <div class="col-md-4">
      <app-my-first
        (myEvent)="onMyEvent($event)"
        headerTitle="Static 2"></app-my-first>
    </div>
    <div class="col-md-4">
      <app-my-first
        (myEvent)="onMyEvent($event)"
        headerTitle="Static 3"></app-my-first>
    </div>
  </div>
  <div class="mt-3 row">
    <div class="col-md-4">
      <app-my-first
        (myEvent)="onMyEvent($event)"
        [headerTitle]="title1"></app-my-first>
    </div>
    <div class="col-md-4">
      <app-my-first
        (myEvent)="onMyEvent($event)"
        [headerTitle]="title2"></app-my-first>
    </div>
    <div class="col-md-4">
      <app-my-first
        (myEvent)="onMyEvent($event)"
        [headerTitle]="title3"></app-my-first>
    </div>
  </div>
  <h2 class="mt-3 alert alert-success">{{myEvent}}</h2>
</div>
```

**Code Explanation**

This Angular template defines a responsive layout for displaying multiple instances of
a custom component (app-my-first) within a Bootstrap container.
It also includes dynamic property binding, event handling, and data interpolation.

1. **Container**:

```html
<div class="container-md"></div>
```

- The outermost `<div>` uses the `container-md class from Bootstrap,
  providing a responsive fixed-width container for medium-sized screens and above.

2. **First Row of Components**:

```html
<div class="mt-3 row">
  <div class="col-md-4">
    <app-my-first
      (myEvent)="onMyEvent($event)"
      headerTitle="Static 1"></app-my-first>
  </div>
  <div class="col-md-4">
    <app-my-first
      (myEvent)="onMyEvent($event)"
      headerTitle="Static 2"></app-my-first>
  </div>
  <div class="col-md-4">
    <app-my-first
      (myEvent)="onMyEvent($event)"
      headerTitle="Static 3"></app-my-first>
  </div>
</div>
```

- **Row Setup**: The row is created with `class="row"`, and `mt-3` adds a top margin.
- **Columns**: Each column (`class="col-md-4"`) spans 4 out of 12 grid columns in Bootstrap,
  creating three equally spaced columns on medium-sized screens and above.
- **Component Instances**: The `app-my-first` custom component is rendered three times in this row:
  - `headerTitle` is a static input property with values `"Static 1"`, `"Static 2"`, and `"Static 3"`.
  - `(myEvent)` is an output event from app-my-first that triggers the `onMyEvent($event)` method in the parent component when emitted.

3. **Second Row of Components**:

```html
<div class="mt-3 row">
  <div class="col-md-4">
    <app-my-first
      (myEvent)="onMyEvent($event)"
      [headerTitle]="title1"></app-my-first>
  </div>
  <div class="col-md-4">
    <app-my-first
      (myEvent)="onMyEvent($event)"
      [headerTitle]="title2"></app-my-first>
  </div>
  <div class="col-md-4">
    <app-my-first
      (myEvent)="onMyEvent($event)"
      [headerTitle]="title3"></app-my-first>
  </div>
</div>
```

- **Dynamic Input Binding**:

  - Instead of static string values, `[headerTitle]` binds to dynamic properties `title1`, `title2`, and `title3`,
    which must be defined in the parent component’s TypeScript file.
  - Event Binding: Similar to the first row, `(myEvent)` is used to handle events emitted by the child component.

4. **Dynamic Event Output**:

```html
<h2 class="mt-3 alert alert-success">{{myEvent}}</h2>
```

- **Interpolation**: The value of the `myEvent` property in the parent component is displayed here
  using Angular interpolation `({{ }})`.

- **Styling**:
  - `mt-3`: Adds a top margin.
  - `alert` `alert-success`: Applies Bootstrap styles for a green alert box.

#### Add the variables and the method to app.component.ts

And add the variables `title1`, `title2`, `title3`, `myEvent`
and the method `onMyEvent($event: string)` to `app.component.ts`.

```typescript
import { Component } from '@angular/core';
import { MyFirstComponent } from './my-first/my-first.component';

@Component({
  selector: 'app-root',
  imports: [MyFirstComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo-angular';
  title1 = 'From Variable 1';
  title2 = 'From Variable 2';
  title3 = 'From Variable 3';

  myEvent!: string;
  onMyEvent($event: string) {
    this.myEvent = $event;
  }
}
```

We can run the project and see the following result:

![my-first-in-app-component.png](readme/my-first-in-app-component.png)

The `MyFirstComponent` appears six times. Three times in one row. A click on a _Send Title_ button updates the green box with the related title.

---

## Create an own Service

```sh
ng generate service services/todo
```

In the folder app/services add to the `todo.service.ts` file the typescript code:

```typescript
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItemListsDTO } from '../openapi-gen';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.API_BASE_PATH;
  }

  getListIDs(): Observable<TodoItemListsDTO> {
    return this.http.get(this.baseUrl + '/api/v1/listids');
  }
}
```

### Test the service - Option 1: with the real Backend

The TestBed is the most important of the Angular testing utilities.
The TestBed creates a dynamically-constructed Angular test module that emulates an Angular @NgModule.
The TestBed.configureTestingModule() method takes a metadata object that can have most of the properties of an @NgModule.
To test a service, you set the providers metadata property with an array of the services that you'll test or mock.

Add to the `todo.service.spec.ts` file the typescript code:

```typescript
import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { importProvidersFrom } from '@angular/core';
import {
  ApiModule,
  BASE_PATH,
  TodoItemControllerService,
} from '../openapi-gen';
import { environment } from '../../environments/environment';

describe('TodoService with real Backend', () => {
  let ownTodoService: TodoService;
  let openApiTodoService: TodoItemControllerService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TodoService,
        TodoItemControllerService,
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(ApiModule),
        {
          provide: BASE_PATH,
          useValue: environment.API_BASE_PATH,
        },
      ],
    });
    ownTodoService = TestBed.inject(TodoService);
    openApiTodoService = TestBed.inject(TodoItemControllerService);
  });

  it('should be created', () => {
    expect(ownTodoService).toBeTruthy();
  });

  it('should call the real backend for getListIDs from own Service', async () => {
    const data = await firstValueFrom(ownTodoService.getListIDs());
    console.log('data.count', data.count);
    expect(data.count).toBe(data.todoItemList?.length);
  });

  it('should call the real backend for getListIDs from OpenApi', async () => {
    const data = await firstValueFrom(openApiTodoService.getListIDs());
    console.log('data.count', data.count);
    expect(data.count).toBe(data.todoItemList?.length);
  });
});
```

The test is calling the real backend through the own TodoService and also
through the generated OpenApi service.

We can run the test through:

```shell
npm run test
```

### Test the service - Option 2: with a Mock Backend

One of the interesting additions that came about with the HttpClient in Angular is the HttpClientTestingModule.

Using that module, one can fully (unit)test a component or a service without using an actual
server implementation to handle HTTP requests from the Angular application.

```typescript
getListIDs(): Observable<TodoItemListsDTO> {
  return this.http.get(this.baseUrl + '/api/v1/listids');
}
```

The above method uses the HttpClient to fetch some data from a server.
We would like to write a test that makes sure that the task is handled properly.
Our basic expectations would look like this:

```typescript
const data = await firstValueFrom(ownTodoService.getListIDs());
expect(data.count).toBe(data.todoItemList?.length);
expect(data.count).toBe(2);
expect(data.todoItemList?.length).toBe(2);
```

Now if we just use the actual service as is, it is going to make an HTTP request to the server.
What we’re going to do instead is replace it with a **mocked version** provided by the `HttpClientTestingModule`:

```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [TodoService],
    imports: [HttpClientTestingModule],
  });
});
```

The above code uses the Angular TestBed to configure our environment under test,
which is going to use the HttpClientTestingModule instead of the regular HttpClientModule.

Once we have done that, we can inject a reference to a HttpTestingController,
which will allow us to control the behavior of our mocked HttpClient,
by setting expectations and returning fake data for testing purposes.

You can study the code of the unit test:

```typescript
import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import {
  ApiModule,
  BASE_PATH,
  TodoItemControllerService,
  TodoItemListsDTO,
} from '../openapi-gen';
import { environment } from '../../environments/environment';

describe('TodoService with Mock', () => {
  let ownTodoService: TodoService;
  let openApiTodoService: TodoItemControllerService;
  let httpMock: HttpTestingController;
  let baseUrl: string;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TodoService,
        importProvidersFrom(ApiModule),
        {
          provide: BASE_PATH,
          useValue: environment.API_BASE_PATH,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    ownTodoService = TestBed.inject(TodoService);
    openApiTodoService = TestBed.inject(TodoItemControllerService);
    httpMock = TestBed.inject(HttpTestingController);
    baseUrl = environment.API_BASE_PATH;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(ownTodoService).toBeTruthy();
    expect(openApiTodoService).toBeTruthy();
  });

  it('should call the mock backend for getListIDs from own service', async () => {
    ownTodoService.getListIDs().subscribe(data => {
      console.log('data.count', data.count);
      expect(data.count).toBe(data.todoItemList?.length);
    });
    const req = httpMock.expectOne(baseUrl + '/api/v1/listids');
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    const todoList: TodoItemListsDTO = {
      count: 2,
      todoItemList: [
        '083e8820-0186-4c68-af01-af2ced91805a',
        '1da5ba97-4365-4560-bb23-2335f099288e',
      ],
    };
    req.flush(todoList);
  });

  it('should call the mock backend for getListIDs from OpenApi service', async () => {
    openApiTodoService.getListIDs().subscribe(data => {
      console.log('data.count', data.count);
      expect(data.count).toBe(data.todoItemList?.length);
    });
    const req = httpMock.expectOne(baseUrl + '/api/v1/listids');
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    const todoList: TodoItemListsDTO = {
      count: 2,
      todoItemList: [
        '083e8820-0186-4c68-af01-af2ced91805a',
        '1da5ba97-4365-4560-bb23-2335f099288e',
      ],
    };
    req.flush(todoList);
  });
});
```

We can run the test through:

```shell
npm run test
```

---

## Create the TodoLists component

The `TodoListsComponent` is responsible for:

1. Fetching and displaying a list of to-do item lists.
2. Providing navigation to individual to-do list details when a list is
   clicked or the "Enter" key is pressed.
3. Creating new to-do lists and updating existing lists.
4. Deleting to-do lists.

![todo-lists.png](readme/todo-lists.png)

**Key Features**

- **Service Abstraction**: Allows switching between custom service and OpenAPI service for fetching data.
- **Unsubscription**: Prevents memory leaks by unsubscribing from observables during cleanup.
- **Accessibility**: Supports keyboard navigation for enhanced usability.
- **Dynamic Navigation**: Uses Angular's Router to navigate to individual to-do list details.

```sh
ng generate component TodoLists
```

The backend is providing us with the following api endpoints:

- `GET /api/v1/listnames`: Fetches all to-do list names.
- `POST /api/v1/listnames`: Creates a new to-do list.
- `PUT /api/v1/listnames/{listId}`: Updates an existing to-do list.
- `DELETE /api/v1/listnames/{listId}`: Deletes a to-do list.
- `GET /api/v1/listitems/{listId}`: Fetches all to-do items for a specific list.

The `TodoListsComponent` will use the `TodoListNameControllerService` to interact with the backend.

Add to the `todo-lists.component.scss` file the rules:

```scss
.legend .row:nth-of-type(odd) div {
  background-color: #eeeeee;
}

.clickable:hover {
  box-shadow:
    0 0 1px 1px rgba(0, 0, 0, 0.19),
    0 0 3px 3px rgba(0, 0, 0, 0.19);
  cursor: pointer;
}

.todo-list-name-row {
  font-size: 0.9em;
}

.float-right {
  padding-left: 5px;
  padding-right: 5px;
  float: right;
}

.badge {
  background-color: rgba(34, 136, 153, 0.36);
  color: white;
  padding: 3px 6px;
  text-align: center;
  border-radius: 5px;
}

.form-control {
  font-size: 16px;
  padding-left: 15px;
  outline: none;
  border: 1px solid #e8e8e8;
}
```

Add to the `todo-lists.component.ts` file the typescript code:

```typescript
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  TodoItem,
  TodoItemControllerService,
  TodoItemListsDTO,
  TodoListName,
  TodoListNameControllerService,
  TodoListNameDTO,
} from '../openapi-gen';
import { TodoService } from '../services/todo.service';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClickStopPropagation } from '../shared/directive/click-stop-propagation.directive';
import { KeydownStopPropagationDirective } from '../shared/directive/keydown-stop-propagation.directive';
import { getUUID } from '../shared/utils';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
  imports: [
    RouterLink,
    DatePipe,
    ClickStopPropagation,
    KeydownStopPropagationDirective,
  ],
})
export class TodoListsComponent implements OnInit, OnDestroy {
  @ViewChild('listNameTextField', { static: false }) listNameTextField:
    | ElementRef<HTMLInputElement>
    | undefined;
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
    this.todoListNamesSubscription = this.todoListNameControllerService
      .getAllTodoListNames()
      .subscribe({
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
      ? this.todoListNameControllerService.updateTodoListName(
          todoListName.id,
          todoListName
        )
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
      this.listNameTextField.nativeElement.value =
        this.todoListNames[index].listName;
      this.editIndex = index;
    }
  }
}
```

**TodoListsComponent Explanation**

**Overview**
The `TodoListsComponent` is an Angular component responsible for managing and displaying a list of To-Do lists. It allows users to create, edit, delete, and navigate to individual To-Do lists.

**Imports**

The component imports various Angular and custom dependencies:

- **Core Angular Modules:** `Component`, `ElementRef`, `OnDestroy`, `OnInit`, `ViewChild`.
- **RxJS:** `Subscription` for managing observable subscriptions.
- **OpenAPI Generated Services:** `TodoItemControllerService`, `TodoListNameControllerService`, DTOs for interacting with the backend.
- **Services:** `TodoService` for additional logic.
- **Routing:** `Router` and `RouterLink` for navigation.
- **Directives:** `ClickStopPropagation`, `KeydownStopPropagationDirective` for handling event propagation.
- **Utilities:** `getUUID()` for generating unique identifiers.

**Component Decorator**

- Defines the selector `app-todo-lists` for use in templates.
- Specifies associated HTML and CSS files.
- Declares imported modules and directives.

**Class Properties**

```typescript
@ViewChild('listNameTextField', { static: false })
listNameTextField: ElementRef<HTMLInputElement> | undefined;
```

- Retrieves a reference to the input field for entering a new To-Do list name.
- `todoListNamesSubscription`: Holds the subscription for fetching To-Do list names.
- `todoListNames`: Stores the retrieved list names.
- `editIndex`: Tracks the index of a list being edited.

**Lifecycle Hooks**

`ngOnInit`

```typescript
ngOnInit(): void {
  this.refreshList();
}
```

- Calls `refreshList()` to fetch and display the To-Do lists when the component initializes.

`ngOnDestroy`

```typescript
ngOnDestroy(): void {
  if (this.todoListNamesSubscription != undefined) {
    this.todoListNamesSubscription.unsubscribe();
  }
}
```

- Unsubscribes from the observable to prevent memory leaks when the component is destroyed.

**Methods**

`refreshList()`

- Fetches all To-Do list names from the API and updates `todoListNames`.
- Logs errors to the console.

`onEnterKeyDownField()`

- Handles pressing the Enter key in the input field.
- Creates or updates a To-Do list based on `editIndex`.
- Refreshes the list after API request completion.

`onEnterKeyDownList(listId: string | undefined)`

- Navigates to the `todo-items` page of a selected list when Enter is pressed.

`onDelete(listId: string | undefined)`

- Deletes a To-Do list and refreshes the list after a successful API call.

`onEdit(index: number)`

- Enables editing mode by setting `editIndex` and populating the input field with the selected list name.

**Summary**

- **Displays** a list of To-Do lists.
- **Allows** users to add, edit, delete, and navigate to To-Do lists.
- **Utilizes** API services to interact with the backend.
- **Implements** event handling for keypresses and button clicks.
- **Manages** subscriptions to avoid memory leaks.

Add to the `todo-lists.component.html` file the template code:

```html
<h4 class="component-title">Todo Lists</h4>
<p class="sub-para todo-info">
  Example angular application with Spring Boot Backend and OpenApi generated
  REST API
</p>
<p class="sub-para todo-listinfo">Todo Lists: {{ todoListNames.length }}</p>

<div class="container" style="padding-left: 0">
  <div class="row">
    <div class="col-sm-9 my-3 pe-0">
      <input
        type="text"
        id="listNameTextField"
        tabindex="1"
        #listNameTextField
        class="form-control"
        (keydown.enter)="onEnterKeyDownField()"
        placeholder="Input list name then tap Enter to add" />
    </div>
  </div>
</div>
<section class="container legend todo-list-name-row">
  @for (row of todoListNames; track row.listId; let i = $index) {
  <div class="row">
    <div
      class="col-sm-9 py-1 my-1 clickable"
      [routerLink]="['/todoitem/', row.listId] ">
      <span tabindex="-1" (keydown.enter)="onEnterKeyDownList(row.listId)">
        List {{ i + 1 }}
        <span role="link" tabindex="{{ i * 3 + 1 }}">
          : {{ row.listName }} &nbsp;
        </span>
        <span class="badge"> {{ row.count }} </span>

        <!-- eslint-disable -->
        <span
          (click)="onDelete(row.listId)"
          clickStopPropagation
          (keydown.enter)="onEdit(i)"
          keydownStopPropagation
          role="button"
          tabindex="{{ i * 3 + 4 }}"
          class="float-right">
          <i class="fa fa-trash"></i>
        </span>

        <span
          (click)="onEdit(i)"
          clickStopPropagation
          (keydown.enter)="onEdit(i)"
          keydownStopPropagation
          role="button"
          tabindex="{{ i * 3 + 3 }}"
          class="float-right">
          <i class="fa fa-edit"></i>
        </span>
        <!-- eslint-enable -->
        <span
          class="float-right"
          tabindex="-1"
          [routerLink]="['/todoitem/', row.listId]">
          {{ row.fromDate | date: 'dd.MM.yyyy' }} @if (row.count && row.count >
          0) { - } {{ row.toDate | date: 'dd.MM.yyyy' }}
        </span>
      </span>
    </div>
  </div>
  }
</section>
```

Instead of using `*ngFor`the new flow syntax with `@for` can be used:

```html
@for (listId of todoLists.todoItemList; track listId; let i = $index) { ... }
```

**Code Explanation**

Explanation of the Angular Template:
This Angular template represents a To-Do List UI that interacts with a Spring Boot
backend using an OpenAPI-generated REST API.
It dynamically displays a list of to-do lists and provides functionalities for creating, editing,
and deleting them.

1. **Header Section**:

   - Displays a title ("Todo Lists").
   - Shows a description of the application.
   - Displays the total number of to-do lists using Angular interpolation ({{ todoListNames.length }}).

2. **Input Field for Creating a New To-Do List**

   - Provides an input field (<input>) where users can type the name of a new to-do list.
   - The field triggers the onEnterKeyDownField() method when the Enter key is pressed.
   - The keydown.enter event triggers onEnterKeyDownField(), which adds a new list when the Enter key is pressed.

3. **Displaying the To-Do Lists**

   - Uses the @for directive (Angular's new template syntax) to iterate over todoListNames.
   - Each to-do list (row) is displayed inside a `<div class="row">`.
   - [routerLink] navigates to a details page for the specific to-do list (/todoitem/{listId}) when clicked.

4. **Delete and Edit Buttons**
   - Trash icon (fa-trash): Calls onDelete(row.listId) to delete the list.
   - Edit icon (fa-edit): Calls onEdit(i) to edit the list.
   - click-stop-propagation prevents event bubbling, so clicking these icons doesn't trigger other parent elements' click events.

#### Unit Tests for the TodoLists component

Add some unit tests to the file `todo-lists.component.spec.ts` file and add the following typescript code:

```typescript
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { RouterModule } from '@angular/router';
import {
  ApiModule,
  BASE_PATH,
  TodoItemControllerService,
  TodoItemListsDTO,
  TodoListNameDTO,
} from './openapi-gen';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { environment } from '../environments/environment';
import {
  HttpTestingController,
  provideHttpClientTesting,
  TestRequest,
} from '@angular/common/http/testing';

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
    expect(compiled.querySelector('.navbar-brand').textContent).toContain(
      'Todo App'
    );
  });

  it('should navigate to home and display TodoListsComponent', async () => {
    const harness = await RouterTestingHarness.create();
    // Navigate to the route to get your component
    const activatedComponent = await harness.navigateByUrl(
      '/',
      TodoListsComponent
    );
    const reqListNames = httpMock.expectOne(baseUrl + '/api/v1/todolist-names');
    expect(reqListNames.request.method).toEqual('GET');

    const todoList: TodoItemListsDTO = {
      count: 2,
      todoItemList: [
        '083e8820-0186-4c68-af01-af2ced91805a',
        '1da5ba97-4365-4560-bb23-2335f099288e',
      ],
    };
    const todoListNames: TodoListNameDTO[] = [
      {
        count: 3,
        listId: 'da2c63f8-b414-46fb-8ae9-c54c1e5c0f00',
        fromDate: '2025-03-11T08:27:45.741982Z',
        toDate: '2025-03-16T08:27:45.741990Z',
        listName: 'To-Do List for business',
      },
      {
        count: 3,
        listId: '2f9c96e1-51ab-47b5-aec9-30980eef61c0',
        fromDate: '2025-03-11T08:27:45.750231Z',
        toDate: '2025-03-16T08:27:45.750234Z',
        listName: 'To-Do List for homework',
      },
    ];

    reqListNames.flush(todoListNames);

    // await new Promise(resolve => setTimeout(resolve, 500)); // 500 ms
    expect(activatedComponent.todoListNames).toBe(todoListNames);
  });
});
```

**Explanation of the unit test**

Here’s an explanation of your unit test:

**Overview**
The test suite verifies the behavior of the TodoListsComponent, an Angular component that manages to-do lists. It uses Jasmine as the testing framework and Angular's TestBed for setting up the test environment.

**Test Setup**

- Mock Services: TodoListNameControllerService: Handles CRUD operations on to-do lists.
- Router: Used for navigation.

These services are replaced with Jasmine spies (jasmine.createSpyObj), allowing us to track method calls and return mock responses.

- Component Initialization: TestBed.configureTestingModule() is used to declare and provide dependencies.
- createComponent(TodoListsComponent) initializes the component.

**Test Cases**

1. **Component Creation:**

- Ensures the component initializes successfully.

2. **Fetching To-Do List Names (ngOnInit):**

- Mocks the getAllTodoListNames() method to return a sample list.
- Calls ngOnInit() and verifies that todoListNames contains the expected data.

3. **Adding a New To-Do List (onEnterKeyDownField):**

- Mocks the text field input.
- Mocks createTodoListName() to return a successful response.
- Calls onEnterKeyDownField() and verifies the service method was called.

4. **Editing an Existing To-Do List (onEnterKeyDownField):**

- Sets an editIndex to simulate editing.
- Mocks updateTodoListName() with a response.
- Calls onEnterKeyDownField() and verifies the update request was sent.

5. **Navigating to a To-Do List (onEnterKeyDownList):**

- Calls onEnterKeyDownList() and verifies Router.navigate() was triggered.

6. **Deleting a To-Do List (onDelete):**

- Mocks deleteTodoListName() with a response.
- Calls onDelete() and verifies that the method was called with the correct ID.

#### Alternative Unit Tests for the TodoLists component

The code tests the `TodoListsComponent of an Angular application using the
Angular TestBed and the HTTP testing utilities provided by Angular.
It checks that the component initializes correctly and verifies its
behavior when interacting with a mock HTTP service.

Create the file `todo-lists-httpmock.component.spec.ts` file and add the following typescript code:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListsComponent } from './todo-lists.component';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApiModule,
  BASE_PATH,
  TodoItemControllerService,
  TodoItemListsDTO,
  TodoListName,
  TodoListNameDTO,
} from '../openapi-gen';
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
    const req = httpMock.expectOne(baseUrl + '/api/v1/todolist-names');
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    const todoList: TodoListNameDTO[] = [
      {
        count: 3,
        listId: 'da2c63f8-b414-46fb-8ae9-c54c1e5c0f00',
        fromDate: '2025-03-11T08:27:45.741982Z',
        toDate: '2025-03-16T08:27:45.741990Z',
        listName: 'To-Do List for business',
      },
      {
        count: 3,
        listId: '2f9c96e1-51ab-47b5-aec9-30980eef61c0',
        fromDate: '2025-03-11T08:27:45.750231Z',
        toDate: '2025-03-16T08:27:45.750234Z',
        listName: 'To-Do List for homework',
      },
      {
        count: 3,
        listId: '2e45aace-3823-413e-a145-0cab9cc7a115',
        fromDate: '2025-03-11T08:27:45.753923Z',
        toDate: '2025-03-16T08:27:45.753927Z',
        listName: 'To-Do List for private',
      },
    ];

    req.flush(todoList);
    // await new Promise(resolve => setTimeout(resolve, 500)); // 500 ms
    console.log(
      'TodoListComponent.todoLists.count',
      component.todoListNames.length
    );
  });
});
```

We can run the test through:

```shell
npm run test
```

**Code Explanation**

The above unit test code uses the Angular `TestBed` to configure our environment under test,
which is going to use the `HttpClientTestingModule` instead of the regular `HttpClientModule`.
The fake `TodoList` contains 3 todoItems with a count of 3.

1. **Setup**

- `TestBed.configureTestingModule` sets up the test environment with:

  - `TodoListsComponent` as the component under test.
  - The `TodoItemControllerService` and `ApiModule` for handling HTTP-related operations.
  - `BASE_PATH` configured with the `API_BASE_PATH` from the environment file.
  - HTTP testing utilities to mock requests and responses.

- After configuring the module, `HttpTestingController` is injected to control and verify HTTP requests during tests.

- A `ComponentFixture` for the `TodoListsComponent` is created, allowing interaction with the component instance and DOM.

2. **Test 1: Component Creation**

- The first test case simply verifies that the component is created and initialized without errors.

3. **Test 2: Mocking HTTP Requests**

- A GET request to `/api/v1/listids` is expected. This is verified using `httpMock.expectOne`.
- The mock response (`todoList`) is defined and returned using `req.flush(todoList)`.
- Assertions check:
  - The number of todo items (count) in the component matches the mock response.
  - The todo item IDs in the component match the mock response.

## Display the TodoLists Component through the Router

To make the `TodoList` component work, we need to include it in the `app.component.html` file.
First, delete the existing generated content, and then replace it with the following:

```html
<router-outlet></router-outlet>
```

### Define the routings for TodoListsComponent

The file `app.routes.ts` can be used to configure the router:

```typescript
import { Routes } from '@angular/router';
import { TodoListsComponent } from './todo-lists/todo-lists.component';

export const routes: Routes = [
  {
    path: 'home',
    component: TodoListsComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];
```

The router redirects the default route to `/home` and loads the `TodoListComponent`
into the `<router-outlet></router-outlet>`.

## Adapt the App Component for displaying the TodoListComponent

We can delete all unnecessary code from AppComponent:

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
```

We can start the application and should see the following.

![todo-lists.png](readme/todo-lists.png)

#### Unit Test for the App component

We can add a unit test for `AppComponent` which is navigating
through the `RouterTestingHarness` to load the TodoListComponent.
We are using the `HttpClientTestingModule` to Mock the call to the backend.
We are loading 2 todo items.

```typescript
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { RouterModule } from '@angular/router';
import {
  ApiModule,
  BASE_PATH,
  TodoItemControllerService,
  TodoItemListsDTO,
} from './openapi-gen';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { environment } from '../environments/environment';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

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

  it('should navigate to home and display TodoListsComponent', async () => {
    const harness = await RouterTestingHarness.create();
    // Navigate to the route to get your component
    const activatedComponent = await harness.navigateByUrl(
      '/',
      TodoListsComponent
    );
    const req = httpMock.expectOne(baseUrl + '/api/v1/listids');
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    const todoList: TodoItemListsDTO = {
      count: 2,
      todoItemList: [
        '083e8820-0186-4c68-af01-af2ced91805a',
        '1da5ba97-4365-4560-bb23-2335f099288e',
      ],
    };
    req.flush(todoList);
    // await new Promise(resolve => setTimeout(resolve, 500)); // 500 ms
    console.log(
      'AppComponent.activatedComponent.todoLists.count',
      activatedComponent.todoLists.count
    );
    expect(activatedComponent.todoLists.count).toBe(todoList.count);
    expect(activatedComponent.todoLists.todoItemList).toBe(
      todoList.todoItemList
    );
  });
});
```

**Code Explanation**

This unit test checks the functionality of the AppComponent in an Angular application.
It uses Angular's testing utilities and HTTP mocking to validate application behavior.

Here's a detailed explanation of the code:

1. **Test Setup**

- **Imports**:

  - `AppComponent`: The component under test.
  - `RouterModule.forRoot`: Sets up routing with two routes (`/home` and `/`), both pointing to `TodoListsComponent`.

- **Providers**:

  - `TodoItemControllerService`: Service for interacting with the API.
  - `provideHttpClient(withInterceptorsFromDi())`: Configures the HTTP client with interceptors.
  - `importProvidersFrom(ApiModule)`: Imports the `ApiModule` for API integration.
  - `BASE_PATH`: Provides the base API path from the environment configuration.
  - `provideHttpClientTesting()`: Sets up HTTP client testing utilities.

2. **Test Cases**

- **App Creation Test**
- **Navigation and API Interaction Test**
  - Tests routing to `/` and API response handling in `TodoListsComponent`.
  - **Step 1: Navigate to Route**. `RouterTestingHarness`: Simulates routing and retrieves the component rendered at a route (`TodoListsComponent` for `/`).
  - **Step 2: Mock API Request**. Expects a GET request to `/api/v1/listids`. Asserts the request method is GET.
  - **Step 3: Provide Fake API Response**. Provides mock response data (`todoList`) to the intercepted API request.
  - **Step 4: Validate Component Data**. Logs and verifies that the `TodoListsComponent` correctly receives and handles the API response data.

We can run the test through:

```shell
npm run test
```

---

## Create the TodoItems component

We want to display a list with TodoItems.

![todo-items.png](readme/todo-items.png)

Every click to an icon or check box requires an interaction with the backend.
The description of the Api can be found here:

https://todo-h2.united-portal.com/swagger-ui.html (Open Api Frontend)

| Description                 | Method | Link                  |
| --------------------------- | ------ | --------------------- |
| Load a list with Todo Items | GET    | /api/v1/list/{listId} |
| Create a Todo Item          | POST   | /api/v1/new           |
| Save a Todo Item            | PUT    | /api/v1/edit/{id}     |
| Delete a Todo Item          | DELETE | /api/v1/delete/{id}   |
| Set the done state          | PUT    | /api/v1/state/{id}    |

All API Service calls are avalailable in the generated `TodoItemControllerService`.

We can generate a new `TodoItem` Component:

```sh
ng generate component TodoItems
```

This Angular 20 component, TodoItemsComponent, is designed to manage a todo list.
It interacts with a service to perform CRUD operations,
allowing the user to view, add, edit, and delete todo items.

Add to the `todo-items.component.scss` file the css rules:

```scss
.legend .row:nth-of-type(odd) div {
  background-color: #eeeeee;
}

.clickable:hover {
  box-shadow:
    0 0 1px 1px rgba(0, 0, 0, 0.19),
    0 0 3px 3px rgba(0, 0, 0, 0.19);
  cursor: pointer;
}

.cmd-buttons {
  padding-left: 5px;
  padding-right: 5px;
  float: right;
}
.cmd-buttons:hover {
  box-shadow:
    0 0 1px 1px rgba(0, 0, 0, 0.19),
    0 0 1px 1px rgba(0, 0, 0, 0.19);
}

.form-control {
  font-size: 16px;
  padding-left: 15px;
  outline: none;
  border: 1px solid #e8e8e8;
}
```

Add to the `todo-items.component.ts` file the typescript code:

```typescript
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
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
  @ViewChild('taskNameTextField', { static: false }) taskNameTextField:
    | ElementRef<HTMLInputElement>
    | undefined;
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
      this.taskNameTextField.nativeElement.value =
        this.todoItems[index].taskName;
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
    this.subscription = this.todoItemControllerService
      .getItemsOfOneList(listId)
      .subscribe({
        next: data => {
          this.todoItems = data;
          this.todoItems.forEach(
            item => (item.createdAt = parseIsoDateStrToDate(item.createdAt))
          );
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
          this.todoItemControllerService
            .editTodoItem(this.todoItems[this.editIndex])
            .subscribe({
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
```

**Explanation of Angular 20 TodoItemsComponent**

In `ngOnInit` is a `route.params` subscription to get the `listID` from the route URL:

| Description                 | Method                      |
| --------------------------- | --------------------------- |
| Load a list with Todo Items | refreshList(listId: string) |
| Create a Todo Item          | onEnterKeyDown()            |
| Save a Todo Item            | onEnterKeyDown()            |
| Delete a Todo Item          | onDelete(itemId: number)    |
| Set the done state          | onDone(itemId: number)      |
| Edit                        | onEdit(index: number)       |

1. **Component Lifecycle Hooks**

- ngOnInit

  - Subscribes to route parameters to retrieve the listId.
  - Calls refreshList() to fetch the todo items for the list.

- ngOnDestroy

  - Ensures subscriptions are unsubscribed to prevent memory leaks.

2. **Properties**

- `taskNameTextField`

  - A reference to the input field for adding/editing tasks.

- Subscriptions (`routeSubscription`, `subscription`)

  - Used to manage observables for route changes and service calls.

- `listId`

  - Stores the current todo list's ID

- `todoItems`

  - Holds the array of todo items fetched from the service.

- `editIndex`

  - Tracks the index of the item being edited.

3. **Methods**

- `refreshList(listId: string)`

  - Fetches the todo items for the given listId.
  - Converts item creation dates to JavaScript Date objects using parseIsoDateStrToDate.

- `onEnterKeyDown()`

  - Handles adding or editing tasks when the Enter key is pressed.
  - Creates a new task if no item is being edited.
  - Updates an existing task if editIndex is set.

- `onEdit(index: number)`

  - Prepares a task for editing by populating the input field with the task name and setting editIndex.

- `onDelete(itemId: number | undefined)`

  - Deletes the task with the given ID by calling the service.

- `onDone(itemId: number | undefined)`

  - Toggles the "done" state of a task by calling the service.

- `getListId(id: number): string | undefined`

  - Retrieves the listId of the first todo item, or an empty string if the list is empty.

#### TodoItems HTML file

Add to the `todo-items.component.html` file the template code:

```html
<h4 class="component-title">Todo Items</h4>

<p class="sub-para todo-info">Todo List &nbsp;&nbsp; : {{ getListId(0) }}</p>
<p class="sub-para todo-listinfo">Todo Items : {{ todoItems.length }} Items</p>

<div class="container" style="padding-left: 0">
  <div class="row">
    <div class="col-sm-9 my-3 pe-0">
      <input
        type="text"
        id="taskNameTextField"
        tabindex="1"
        #taskNameTextField
        class="form-control"
        (keydown.enter)="onEnterKeyDown()"
        placeholder="Input task name then tap Enter to add" />
    </div>
  </div>
</div>
<section class="container legend">
  @for (todoItem of todoItems; track i; let i = $index) {
  <div class="row">
    <div class="col-sm-9 py-1 my-1 clickable">
      <input
        [checked]="todoItem.done"
        (click)="onDone(todoItem.itemId)"
        class="form-check-input"
        tabindex="{{ i * 3 + 2 }}"
        type="checkbox" />
      &nbsp;
      <span
        [ngStyle]="{ 'text-decoration': todoItem.done ? 'line-through' : 'none' }">
        {{ todoItem.taskName }}
      </span>
      <!-- eslint-disable -->
      <span
        (click)="onDelete(todoItem.itemId)"
        (keydown.enter)="onEdit(i)"
        role="button"
        tabIndex="{{ i * 3 + 4 }}"
        class="cmd-buttons">
        <i class="fa fa-trash"></i>
      </span>

      <span
        (click)="onEdit(i)"
        (keydown)="onEdit(i)"
        role="button"
        tabIndex="{{ i * 3 + 3 }}"
        class="cmd-buttons">
        <i class="fa fa-edit"></i>
      </span>
      <!-- eslint-enable -->
      <span class="cmd-buttons">
        {{todoItem.createdAt | date: 'dd.MM.yyyy'}}
      </span>
    </div>
  </div>
  }
</section>
```

Instead of using `*ngFor`the new flow syntax with `@for` can be used:

```html
@for (todoItem of todoItems; track i; let i = $index) { ... }
```

**Key Features**

1. **Dynamic Updates**

- The UI updates in real-time as tasks are added, edited, or removed.

2. **Focus Management**

- Automatically focuses on the input field after actions to improve usability.

3. **Reactive Design**

- Relies on RxJS for managing asynchronous operations like fetching and updating tasks.

4. **Error Handling**

- Errors during service calls are logged in the console.

#### TodoItem Unit Test

Add to the `todo-items.component.spec.ts` file the typescript code:

```typescript
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
    mockTodoItemControllerService = jasmine.createSpyObj(
      'TodoItemControllerService',
      [
        'deleteTodoItem',
        'changeDoneState',
        'getItem',
        'editTodoItem',
        'newTodoItem',
      ]
    );

    mockActivatedRoute = {
      params: of({ id: '123' }),
    };

    await TestBed.configureTestingModule({
      imports: [TodoItemsComponent],
      providers: [
        {
          provide: TodoItemControllerService,
          useValue: mockTodoItemControllerService,
        },
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

    const listInfo = fixture.debugElement.query(
      By.css('.todo-info')
    ).nativeElement;
    const text: string = listInfo.textContent;
    expect(text.endsWith('123')).toBe(true);
  });

  it('should display the number of todo items', () => {
    component.todoItems = [
      { taskName: 'Task 1' },
      { taskName: 'Task 2' },
    ] as TodoItem[];
    fixture.detectChanges();

    const listInfo = fixture.debugElement.query(
      By.css('.todo-listinfo')
    ).nativeElement;
    expect(listInfo.textContent).toContain('Todo Items : 2 Items');
  });

  it('should add a new task on enter key press', () => {
    mockTodoItemControllerService.newTodoItem.and.returnValue(of());
    spyOn(component, 'refreshList');

    const inputElement = fixture.debugElement.query(
      By.css('#taskNameTextField')
    ).nativeElement;
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

    const firstItemText = todoItems[1].query(By.css('span')).nativeElement
      .textContent;
    const secondItemText = todoItems[2].query(By.css('span')).nativeElement
      .textContent;

    expect(firstItemText).toContain('Task 1');
    expect(secondItemText).toContain('Task 2');
  });

  it('should call onDelete when delete button is clicked', () => {
    spyOn(component, 'onDelete');
    component.todoItems = [
      { taskName: 'Task 1', done: false, itemId: 1 },
    ] as any;
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(By.css('.fa-trash')).parent;
    if (deleteButton) deleteButton.triggerEventHandler('click', null);

    expect(component.onDelete).toHaveBeenCalledWith(1);
  });

  it('should call onEdit when edit button is clicked', () => {
    spyOn(component, 'onEdit');
    component.todoItems = [
      { taskName: 'Task 1', done: false, itemId: 1 },
    ] as any;
    fixture.detectChanges();

    const editButton = fixture.debugElement.query(By.css('.fa-edit')).parent;
    if (editButton) editButton.triggerEventHandler('click', null);

    expect(component.onEdit).toHaveBeenCalledWith(0);
  });

  it('should call onDone when checkbox is clicked', () => {
    spyOn(component, 'onDone');
    component.todoItems = [
      { taskName: 'Task 1', done: false, itemId: 1 },
    ] as any;
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(
      By.css('input[type="checkbox"]')
    );
    checkbox.triggerEventHandler('click', null);

    expect(component.onDone).toHaveBeenCalledWith(1);
  });
});
```

**Explanation of Test Cases:**

1. **Data Binding Tests**: Verifies that `listId and the number of todo items are displayed correctly in the template.
2. **Event Handling Tests**:Tests key events like pressing the Enter key, clicking the delete and edit buttons, and interacting with checkboxes.
3. **Dynamic Rendering Tests**: Confirms that the todo items render properly based on `todoItems` array content.
4. **Integration with Component Logic**: Ensures that clicking buttons and interacting with the template triggers the correct methods in the component.

## Add the Routings for TodoItemsComponent

The file app.routes.ts contains the mappings from routes to components.
We add the routing for the `TodoItemsComponent`which contains the listId in `/:id`

```typescript
import { Routes } from '@angular/router';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';

export const routes: Routes = [
  {
    path: 'home',
    component: TodoListsComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'todoitem/:id',
    component: TodoItemsComponent,
  },
];
```

---

## Redefine the AppComponent

Add to the `app.component.scss` file the rules:

```scss
.app {
  background-color: #fff;
  min-height: 100vh;
}

@media (max-width: 767px) {
  .navbar-collapse {
    margin-top: 10px;
  }
}

.nav-link:hover {
  background-color: #ddd;
}

.nav-link {
  font-size: 16px;
}

.active {
  background-color: #ddd;
}

.navbar {
  -webkit-box-shadow: 0 8px 6px -6px #999;
  -moz-box-shadow: 0 8px 6px -6px #999;
  box-shadow: 0 8px 6px -6px #999;
  background-color: #f8f8f8;
}

.navbar-brand {
  cursor: pointer;
  width: 140px;
}

main {
  padding-top: 70px;
  padding-bottom: 70px;
}
```

Add to the `app.component.ts` file the typescript code:

```typescript
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo-angular';
}
```

#### HTML Template of AppComponent

Add to the `app.component.html` file the template code:

```html
<div class="container px-0 app">
  <nav class="fixed-top navbar navbar-light navbar-expand-md bg-faded px-2">
    <div [routerLink]="['/home']" class="navbar-brand">
      <img alt="todo-logo" src="/todo.svg" width="50px" /> Todo App
    </div>
    <button
      class="navbar-toggler"
      data-bs-toggle="collapse"
      data-bs-target="#navbar">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbar">
      <ul class="navbar-nav">
        <li [routerLinkActive]="['active']" class="nav-item">
          <a class="nav-link" [routerLink]="['/home']">Start Page</a>
        </li>
        <li [routerLinkActive]="['active']" class="nav-item">
          <a class="nav-link" [routerLink]="['/myfirst']">MyFirst</a>
        </li>
        <li [routerLinkActive]="['active']" class="nav-item">
          <a class="nav-link" [routerLink]="['/temp']">Temp C</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="https://github.com/mbachmann/spring-boot-todo-app"
            target="_blank"
            >Github Backend</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="https://github.com/mbachmann/todo-angular-20-standalone.git"
            target="_blank"
            >Github Angular 20</a
          >
        </li>
      </ul>
      <form class="form-inline ms-auto">
        <button
          class="btn btn-secondary"
          type="button"
          [routerLink]="['/signup']">
          Signup
        </button>
        <button
          class="btn btn-primary ms-1"
          type="button"
          [routerLink]="['/login']">
          Login
        </button>
      </form>
    </div>
  </nav>

  <main class="px-3 mt-4 main">
    <router-outlet></router-outlet>
  </main>

  <footer class="fixed-bottom px-3 mt-4 bg-light">
    <section
      class="container d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
      <!-- Left -->
      <div class="me-5 d-none d-lg-block">
        <span>Get connected with us on social networks:</span>
      </div>
      <!-- Left -->

      <!-- Right -->
      <div>
        <a
          href="https://www.youtube.com/channel/UCGLcphLMTcUNZRIRGUVu8rg"
          target="_blank"
          class="me-4 text-reset"
          tabindex="-1">
          <i class="fa-brands fa-youtube"></i>
        </a>
        <a
          href="https://x.com/mbachmann4"
          target="_blank"
          class="me-4 text-reset"
          tabindex="-1">
          <i class="fa-brands fa-x-twitter"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/matthias-bachmann-b3809541/"
          target="_blank"
          class="me-4 text-reset"
          tabindex="-1">
          <i class="fa-brands fa-linkedin"></i>
        </a>
        <a
          href="https://github.com/mbachmann"
          target="_blank"
          class="me-4 text-reset"
          tabindex="-1">
          <i class="fa-brands fa-github"></i>
        </a>
      </div>
      <!-- Right -->
    </section>
    <!-- Section: Social media -->
  </footer>
</div>
```

**Code Explanation**

**Angular-Specific Features**

1. **Routing**:

- [routerLink] enables navigation between views (e.g., /home, /myfirst).
- <router-outlet> dynamically renders the components associated with the current route.

2. **State Management**:

- [routerLinkActive] ensures the currently active route is styled with the active class.

3. **Responsive Design**

- Bootstrap's grid system ensures the layout adapts to different screen sizes.
- Collapsible navigation and flex-based footer contribute to a mobile-friendly design.

4. **Structure**

The file uses Bootstrap classes for responsive design and styling.
The Angular directives (`[routerLink]`, `[routerLinkActive]`) enable routing to different application views. Key sections include:

1. **Container Div**: The main wrapper for the application, marked with classes container `px-0` app.
2. **Navigation Bar**: A fixed-top bar with branding, navigation links, and buttons.
3. **Main Content**: Placeholder for dynamic content controlled by Angular's router.
4. **Footer**: Contains social media links and additional information.

#### Unit Test of AppComponent

This unit test file is for an Angular application and tests the behavior of the `AppComponent`.

Add to the `app.component.spec.ts` file the typescript code:

```typescript
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { RouterModule } from '@angular/router';
import {
  ApiModule,
  BASE_PATH,
  TodoItemControllerService,
  TodoItemListsDTO,
} from './openapi-gen';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { environment } from '../environments/environment';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

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
    expect(compiled.querySelector('.navbar-brand').textContent).toContain(
      'Todo App'
    );
  });

  it('should navigate to home and display TodoListsComponent', async () => {
    const harness = await RouterTestingHarness.create();
    // Navigate to the route to get your component
    const activatedComponent = await harness.navigateByUrl(
      '/',
      TodoListsComponent
    );
    const req = httpMock.expectOne(baseUrl + '/api/v1/listids');
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    const todoList: TodoItemListsDTO = {
      count: 2,
      todoItemList: [
        '083e8820-0186-4c68-af01-af2ced91805a',
        '1da5ba97-4365-4560-bb23-2335f099288e',
      ],
    };
    req.flush(todoList);
    // await new Promise(resolve => setTimeout(resolve, 500)); // 500 ms
    console.log(
      'AppComponent.activatedComponent.todoLists.count',
      activatedComponent.todoLists.count
    );
    expect(activatedComponent.todoLists.count).toBe(todoList.count);
    expect(activatedComponent.todoLists.todoItemList).toBe(
      todoList.todoItemList
    );
  });
});
```

**Code Explanation**

1. **Mocked Services**: The `HttpTestingController` ensures no real API calls are made and that expected requests are correctly structured.
2. **Routing**: The `RouterTestingHarness` simplifies testing of Angular routing and ensures components activate as expected.
3. **Component Interaction**: Tests confirm that `AppComponent` integrates properly with routing and API data.
4. **Isolation**: The test suite isolates `AppComponent` and its dependencies without requiring a live backend or actual routing.

**Setup and Teardown**

- `beforeEach`

  - `TestBed.configureTestingModule`: Sets up the test module:
    - Declares the `AppComponent`.
    - Configures the router with routes pointing to `TodoListsComponent` for both the `root` and `/home`.
    - Provides services such as `TodoItemControllerService`, the `ApiModule`, and HTTP testing utilities.
    - Injects the `BASE_PATH` token with the API base path from the environment configuration.
  - Mocks: `httpMock` is initialized to intercept and verify HTTP requests.

- `afterEach`
  - `httpMock.verify()`: Ensures all mocked HTTP requests have been handled to avoid unverified requests.

---

## Add global styles

Please replace the code below with the content of the `styles.scss` file:

```scss
/* You can add global styles to this file, and also import other style files */
@use 'bootstrap/scss/bootstrap';
@use '@fortawesome/fontawesome-free/scss/fontawesome';

body {
  font-size: 16px;
  line-height: 1.58;
  background: #6699ff;
  background: -webkit-linear-gradient(to left, #336699, #228899);
  background: linear-gradient(to left, #336699, #228899);
  color: #333;
  padding-bottom: 70px;
  padding-top: 40px;
}

.component-title {
  color: #228899;
}

.sub-para {
  font-size: small;
}

.todo-info {
  margin-bottom: 6px;
}

.todo-listinfo {
  margin-bottom: 30px;
}
```

## Add the image todo.svg to the public folder

Copy the content to the file `todo.svg`.

```svg
<?xml version="1.0" ?>
<svg id="Layer_1" style="enable-background:new 0 0 128 128;" version="1.1" viewBox="0 0 128 128" xml:space="preserve"
     xmlns="http://www.w3.org/2000/svg"><style type="text/css">
	.st0 {
    opacity: 0.2;
    fill: #FFFFFF;
  }

  .st1 {
    fill: #FFFFFF;
  }

  .st2 {
    fill: none;
    stroke: #242C88;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st3 {
    fill: #5E61A3;
  }

  .st4 {
    opacity: 0.5;
    fill: #242C88;
  }

  .st5 {
    fill: #39C89A;
  }

  .st6 {
    fill: #CAEAFB;
  }

  .st7 {
    fill: #589FFF;
  }

  .st8 {
    fill: #FF5751;
  }

  .st9 {
    fill: #BC8D66;
  }

  .st10 {
    opacity: 0.7;
    fill: #FFFFFF;
  }

  .st11 {
    fill: #F1C92A;
  }

  .st12 {
    opacity: 0.4;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st13 {
    fill: #F3877E;
  }

  .st14 {
    fill: #83D689;
  }

  .st15 {
    opacity: 0.4;
    fill: #242C88;
  }

  .st16 {
    opacity: 0.2;
    fill: #242C88;
  }

  .st17 {
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 0.1, 6;
  }

  .st18 {
    fill: #FFC408;
  }

  .st19 {
    opacity: 0.4;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 0.1, 6;
  }

  .st20 {
    fill: none;
    stroke: #CAEAFB;
    stroke-width: 12;
    stroke-linecap: round;
    stroke-miterlimit: 10;
  }

  .st21 {
    fill: none;
    stroke: #CAEAFB;
    stroke-width: 7;
    stroke-linecap: round;
    stroke-miterlimit: 10;
  }

  .st22 {
    opacity: 0.4;
    fill: none;
    stroke: #242C88;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st23 {
    opacity: 0.5;
  }

  .st24 {
    fill: #242C88;
  }

  .st25 {
    fill: none;
    stroke: #242C88;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 0.1, 6;
  }

  .st26 {
    opacity: 0.5;
    fill: #FFFFFF;
  }

  .st27 {
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st28 {
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st29 {
    fill: #E5BD9E;
  }

  .st30 {
    fill: #A06D47;
  }

  .st31 {
    opacity: 0.3;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 0.1, 6;
  }

  .st32 {
    opacity: 0.1;
    fill: #242C88;
  }

  .st33 {
    opacity: 0.5;
    fill: #FF5751;
  }

  .st34 {
    opacity: 0.2;
    fill: none;
    stroke: #242C88;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st35 {
    opacity: 0.3;
    clip-path: url(#SVGID_2_);
  }

  .st36 {
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 0, 6;
  }

  .st37 {
    opacity: 0.3;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    stroke-dasharray: 0, 6;
  }

  .st38 {
    clip-path: url(#SVGID_4_);
  }

  .st39 {
    opacity: 0.2;
    fill: none;
    stroke: #242C88;
    stroke-width: 9;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st40 {
    opacity: 0.3;
  }

  .st41 {
    opacity: 0.4;
    fill: #FFFFFF;
  }

  .st42 {
    opacity: 0.5;
    fill: #CAEAFB;
  }

  .st43 {
    opacity: 0.6;
    fill: #242C88;
  }

  .st44 {
    opacity: 0.5;
    fill: none;
    stroke: #242C88;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st45 {
    opacity: 0.3;
    fill: #242C88;
  }

  .st46 {
    opacity: 0.2;
  }

  .st47 {
    clip-path: url(#SVGID_6_);
    fill: none;
    stroke: #242C88;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st48 {
    opacity: 0.2;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 8;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st49 {
    clip-path: url(#SVGID_8_);
    fill: #FFFFFF;
  }

  .st50 {
    clip-path: url(#SVGID_8_);
    fill: none;
    stroke: #242C88;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st51 {
    opacity: 0.2;
    clip-path: url(#SVGID_8_);
    fill: #242C88;
  }

  .st52 {
    opacity: 0.2;
    clip-path: url(#SVGID_8_);
    fill: none;
    stroke: #242C88;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st53 {
    fill: none;
    stroke: #242C88;
    stroke-width: 1.848;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st54 {
    opacity: 0.4;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 7;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st55 {
    opacity: 0.2;
    fill: none;
    stroke: #242C88;
    stroke-width: 7;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st56 {
    opacity: 7.000000e-02;
    fill: #242C88;
  }

  .st57 {
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st58 {
    opacity: 0.4;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 8;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st59 {
    opacity: 0.2;
    fill: none;
    stroke: #242C88;
    stroke-width: 8;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st60 {
    fill: none;
    stroke: #FF5751;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .st61 {
    fill: none;
    stroke: #242C88;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }
</style>
  <rect class="st1" height="83" width="68" x="11" y="17"/>
  <rect class="st2" height="83" width="68" x="11" y="17"/>
  <path class="st14" d="M33,46H23c-1.1,0-2-0.9-2-2V34c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C35,45.1,34.1,46,33,46z"/>
  <path class="st14" d="M32.8,66H23c-1.1,0-2-0.9-2-2V54c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v9.8C35,65,34,66,32.8,66z"/>
  <path class="st14" d="M33,87H23c-1.1,0-2-0.9-2-2V75c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C35,86.1,34.1,87,33,87z"/>
  <path class="st2" d="M33,46H23c-1.1,0-2-0.9-2-2V34c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C35,45.1,34.1,46,33,46z"/>
  <path class="st2" d="M32.8,66H23c-1.1,0-2-0.9-2-2V54c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v9.8C35,65,34,66,32.8,66z"/>
  <path class="st2" d="M33,87H23c-1.1,0-2-0.9-2-2V75c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C35,86.1,34.1,87,33,87z"/>
  <path class="st16" d="M79,101V24H28c-1.1,0-2,0.9-2,2v75H79z"/>
  <rect class="st1" height="83" width="68" x="31" y="29"/>
  <rect class="st2" height="83" width="68" x="31" y="29"/>
  <line class="st34" x1="63" x2="75" y1="53" y2="53"/>
  <line class="st34" x1="63" x2="87" y1="48" y2="48"/>
  <path class="st14" d="M54,58H44c-1.1,0-2-0.9-2-2V46c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C56,57.1,55.1,58,54,58z"/>
  <polyline class="st2" points="45.3,51.7 48.2,54.4 53.9,48.6 "/>
  <line class="st34" x1="63" x2="75" y1="74" y2="74"/>
  <line class="st34" x1="63" x2="87" y1="68" y2="68"/>
  <path class="st14"
        d="M54,78H44c-1.1,0-2-0.9-2-2V66c0-1.1,0.9-2,2-2h9.8c1.2,0,2.2,1,2.2,2.2V76C56,77.1,55.1,78,54,78z"/>
  <polyline class="st2" points="45.3,71.9 48.2,74.6 53.9,68.9 "/>
  <line class="st34" x1="63" x2="75" y1="94" y2="94"/>
  <line class="st34" x1="63" x2="87" y1="89" y2="89"/>
  <path class="st14" d="M54,98H44c-1.1,0-2-0.9-2-2V86c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C56,97.1,55.1,98,54,98z"/>
  <path class="st2" d="M54,58H44c-1.1,0-2-0.9-2-2V46c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C56,57.1,55.1,58,54,58z"/>
  <path class="st2"
        d="M54,78H44c-1.1,0-2-0.9-2-2V66c0-1.1,0.9-2,2-2h9.8c1.2,0,2.2,1,2.2,2.2V76C56,77.1,55.1,78,54,78z"/>
  <path class="st2" d="M54,98H44c-1.1,0-2-0.9-2-2V86c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v10C56,97.1,55.1,98,54,98z"/>
  <polygon class="st16" points="99,57.6 65.2,77.5 53.6,94.9 74.4,93.1 99,78.6 "/>
  <g><polygon class="st1" points="111.4,50.1 73.8,87.7 54.1,94.6 61,74.9 98.6,37.3  "/>
    <rect class="st18" height="18.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -18.9596 79.2808)" width="53.2"
          x="59.6" y="53.5"/>
    <rect class="st16" height="5.3" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -20.8293 83.7946)" width="53.2"
          x="64.1" y="64.4"/>
    <polygon class="st3" points="57.1,86 54.1,94.4 62.5,91.4  "/>
    <polygon class="st2" points="111.4,50.1 73.8,87.7 54.1,94.6 61,74.9 98.6,37.3  "/>
    <path class="st13" d="M111.4,50.1l6-6c1.7-1.7,1.7-4.4,0-6l-6.8-6.8c-1.7-1.7-4.4-1.7-6,0l-6,6L111.4,50.1z"/>
    <path class="st2" d="M111.4,50.1l6-6c1.7-1.7,1.7-4.4,0-6l-6.8-6.8c-1.7-1.7-4.4-1.7-6,0l-6,6L111.4,50.1z"/>
    <line class="st2" x1="80.6" x2="106.9" y1="73.4" y2="47.1"/>
    <line class="st2" x1="70" x2="76.1" y1="84" y2="77.9"/>
    <rect class="st1" height="18.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -0.5282 86.9153)" width="7.4"
          x="100.9" y="35.1"/>
    <rect class="st16" height="18.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -0.5282 86.9153)" width="7.4"
          x="100.9" y="35.1"/>
    <rect class="st2" height="18.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -0.5282 86.9153)" width="7.4"
          x="100.9" y="35.1"/></g></svg>
```

---

## Create a template driven form (Signup) Form

A sign-up form shall get created with the method of template driven forms.

![signup-form.png](readme/signup-form.png)

The form shall contain the following fields:

- First Name
- Last Name
- Email
- Password
- Language

In case of missing input or short password an error message shall get displayed:

![signup-form-errors.png](readme/signup-form-errors.png)

Before we start we create the component we need a new model file for signup.
The file shall get created in the folder `src/app/models` with the name `signup.model.ts`:

```typescript
export class Signup {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public password: string = '',
    public language: string = ''
  ) {}
}
```

### Signup Component class

The Component gets created with the following command:

```shell
ng generate component signup
```

The typescript class has the following content:

File: `signup.component.ts`

```typescript
import { Component, ViewChild } from '@angular/core';
import { Signup } from '../model/signup';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [FormsModule, JsonPipe],
})
export class SignupComponent {
  model: Signup = new Signup();
  @ViewChild('f', { static: true }) form!: NgForm;
  langs: string[] = ['English', 'French', 'German'];
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted!');
      form.reset();
    }
  }
}
```

**Explanation of SignupComponent in Angular**

**Overview**
The `SignupComponent` is an Angular component responsible for handling user signups through a form. It utilizes Angular forms, built-in directives, and dependency injection to manage user input and form validation.

- **Properties and Methods**

- **`model: Signup = new Signup();`** - Creates an instance of the `Signup` model to bind form data.
- **`@ViewChild('f', { static: true }) form!: NgForm;`** - Retrieves a reference to the form (`#f`) in the template.
- **`langs`** - A list of selectable languages for the form.

**Form Submission Method**

- **`onSubmit(form: NgForm)`** - Handles form submission.
- **`if (form.valid)`** - Ensures the form is valid before proceeding.
- **`console.log("Form Submitted!")`** - Logs a message when the form is successfully submitted.
- **`form.reset();`** - Resets the form after submission.

**Conclusion**
The `SignupComponent` demonstrates how to use template-driven forms in Angular, including form validation, event handling, and resetting forms after submission. This component is designed for simple user registration with language selection.

### Signup HTML file

The html file has the following content:

File: `signup.component.html`

```html
<h4 class="component-title">Signup</h4>
<div class="row">
  <form novalidate (ngSubmit)="onSubmit(f)" #f="ngForm">
    <fieldset ngModelGroup="name">
      <div class="row form-group mt-3">
        <div class="col-sm-3">
          <label for="firstName" class="fs-6 col-form-label text-black-50"
            >First Name</label
          >
        </div>
        <div class="col-sm-6">
          <input
            type="text"
            id="firstName"
            autocomplete="on"
            class="form-control"
            name="firstName"
            [(ngModel)]="model.firstName"
            required
            #firstName="ngModel" />
          @if (firstName.errors && (firstName.dirty || firstName.touched)) {
          <div class="form-control-feedback text-danger">
            @if (firstName.hasError('required')) {
            <p><small>First name is required</small></p>
            }
          </div>
          }
        </div>
      </div>
      <div class="row form-group mt-2">
        <div class="col-sm-3">
          <label for="lastName" class="fs-6 col-form-label text-black-50"
            >Last Name</label
          >
        </div>
        <div class="col-sm-6">
          <input
            type="text"
            id="lastName"
            autocomplete="on"
            class="form-control"
            name="lastName"
            [(ngModel)]="model.lastName"
            required
            #lastName="ngModel" />
          @if (lastName.errors && (lastName.dirty || lastName.touched)) {
          <div class="form-control-feedback text-danger">
            @if (lastName.hasError('required')) {
            <p><small>Last name is required</small></p>
            }
          </div>
          }
        </div>
      </div>
    </fieldset>
    <div class="row form-group mt-2">
      <div class="col-sm-3">
        <label for="email" class="fs-6 col-form-label text-black-50"
          >Email</label
        >
      </div>
      <div class="col-sm-6">
        <input
          type="email"
          id="email"
          autocomplete="on"
          class="form-control"
          name="email"
          [(ngModel)]="model.email"
          required
          pattern="[^ @]*@[^ @]*"
          #email="ngModel" />
        @if (email.errors && (email.dirty || email.touched)) {
        <div class="form-control-feedback text-danger">
          @if (email.hasError('required')) {
          <p id="email-error-required"><small>Email is required</small></p>
          } @if (email.hasError('pattern')) {
          <p id="email-error-at-least">
            <small>Email must contain at least the &#64; character</small>
          </p>
          }
        </div>
        }
      </div>
    </div>
    <div class="row form-group mt-2">
      <div class="col-sm-3">
        <label for="password" class="fs-6 col-form-label text-black-50"
          >Password</label
        >
      </div>
      <div class="col-sm-6">
        <input
          type="password"
          id="password"
          autocomplete="on"
          class="form-control"
          name="password"
          [(ngModel)]="model.password"
          required
          minlength="8"
          #password="ngModel" />
        @if (password.errors && (password.dirty || password.touched)) {
        <div class="form-control-feedback text-danger">
          @if (password.hasError('required')) {
          <p id="password-error-required">
            <small>Password is required</small>
          </p>
          } @if (password.hasError('minlength')) {
          <p id="password-error-at-least">
            <small>Password must be at least 8 characters long</small>
          </p>
          }
        </div>
        }
      </div>
    </div>
    <div class="row form-group mt-2">
      <div class="col-sm-3">
        <label for="language" class="fs-6 col-form-label text-black-50"
          >Language</label
        >
      </div>
      <div class="col-sm-6">
        <select
          class="form-control"
          id="language"
          name="language"
          [(ngModel)]="model.language">
          <option value="">Please select a language</option>
          @for (lang of langs; track lang) {
          <option [value]="lang">{{ lang }}</option>
          }
        </select>
      </div>
    </div>
    <div class="row form-group mt-4">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <button
          type="submit"
          class="btn btn-primary float-end"
          [disabled]="f.invalid">
          Submit
        </button>
      </div>
    </div>
  </form>
</div>
<p>From Form</p>
<div class="row mt-4">
  <pre><small>{{f.value | json}}</small></pre>
</div>

<p>From Model</p>
<div class="row mt-4">
  <pre><small>{{model | json}}</small></pre>
</div>
```

**Explanation of signup.component.html**

**Overview**
The `signup.component.html` file defines the structure of a user signup form in an Angular application. The form is implemented using Angular's **template-driven forms** approach with `ngModel` for two-way data binding. It includes input fields for user details and provides validation feedback.

**Form Structure**

- The form is enclosed in a `<form>` element with `novalidate` to disable default HTML5 validation.
- The `(ngSubmit)` event is bound to the `onSubmit(f)` function, where `f` is a reference to the form using `#f="ngForm"`.

**Fieldset for Name Group**
The first section groups **First Name** and **Last Name** using `ngModelGroup="name"` to logically structure these fields.

**First Name Input**

- Uses `[(ngModel)]="model.firstName"` for two-way binding.
- The `required` attribute ensures the field is mandatory.
- Uses `#firstName="ngModel"` to track form control state.
- Displays an error message when the field is touched or dirty and left empty.

**Last Name Input**

- Similar to the First Name field, with `[(ngModel)]="model.lastName"`.
- Provides a validation message when required input is missing.

**Email Field**

- Uses `type="email"` and `[(ngModel)]="model.email"`.
- `required` ensures the field must be filled.
- `pattern="[^ @]*@[^ @]*"` enforces a valid email format.
- Displays validation messages for missing or incorrectly formatted email input.

**Password Field**

- Uses `type="password"` and `[(ngModel)]="model.password"`.
- `required` makes it mandatory.
- `minlength="8"` ensures the password has at least 8 characters.
- Displays error messages for missing input or insufficient length.

**Language Selection Dropdown**

- Uses a `<select>` element with `[(ngModel)]="model.language"`.
- The `<option>` elements are dynamically generated using `*ngFor="let lang of langs"`.
- Provides a default placeholder option.

**Error Handling**
The form provides real-time error handling and validation feedback using Angular's `ngModel` directives and form control properties.

- **Dirty and Touched Validation**: Errors are only displayed when a field is either modified (`dirty`) or loses focus (`touched`).
- **Validation Messages**:
  - **First Name & Last Name**: Display "First name is required" or "Last name is required" if the fields are empty.
  - **Email**: Shows "Email is required" if left blank and "Email must contain at least the @ character" if invalid.
  - **Password**: Displays "Password is required" if empty and "Password must be at least 8 characters long" if too short.
- **Error Styling**: Error messages are wrapped in `<div class="form-control-feedback text-danger">` for visibility.

**Submit Button**

- A `<button>` of type `submit`.
- The `[disabled]="f.invalid"` binding disables submission when form validation fails.

**Displaying Form Data**

- Two `<pre>` elements display the current form data using `{{ f.value | json }}` and `{{ model | json }}`.
- `f.value` represents the actual form values, while `model` represents the bound model.

This setup ensures a user-friendly signup experience with real-time validation feedback and structured data handling.

### Add the route

Add the following code to the file app.routes.ts:

```typescript
{
  path: 'signup',
    component: SignupComponent,
},
```

### Signup Unit Test

The unit test for the signup component shall get created with the following content:

File: `signup.component.spec.ts`

```typescript
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { DebugElement, importProvidersFrom } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  let submitButton: DebugElement;
  let firstNameInput: DebugElement;
  let lastNameInput: DebugElement;
  let emailInput: DebugElement;
  let passwordInput: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent],
      providers: [importProvidersFrom(FormsModule)],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();

    submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    firstNameInput = fixture.debugElement.query(
      By.css('input[name="firstName"]')
    );
    lastNameInput = fixture.debugElement.query(
      By.css('input[name="lastName"]')
    );
    emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
    passwordInput = fixture.debugElement.query(
      By.css('input[name="password"]')
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initial empty model', () => {
    fixture.detectChanges();
    expect(component.model).toBeDefined();
  });

  it('should enable submit button when form is valid', () => {
    firstNameInput.nativeElement.value = 'John';
    lastNameInput.nativeElement.value = 'Doe';
    emailInput.nativeElement.value = 'john@example.com';
    passwordInput.nativeElement.value = 'password123';
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeFalse();
  });

  it('should reset form after submission', fakeAsync(() => {
    spyOn(component.form, 'reset');
    component.model.firstName = 'John';
    component.model.lastName = 'Doe';
    component.model.email = 'john@example.com';
    component.model.password = 'password123';
    fixture.detectChanges();
    tick(1);
    component.onSubmit(component.form);
    tick(1);
    fixture.detectChanges();

    expect(component.form.reset).toHaveBeenCalled();
  }));

  it('should display correct JSON output', fakeAsync(() => {
    component.model.firstName = 'John';
    component.model.lastName = 'Doe';
    component.model.email = 'john@example.com';
    component.model.password = 'password123';
    component.model.language = 'English';
    fixture.detectChanges();
    tick(1);
    fixture.detectChanges();
    tick(1);
    const jsonOutput = fixture.debugElement.query(By.css('pre small'));
    const displayedJson = JSON.parse(jsonOutput.nativeElement.textContent);

    expect(displayedJson).toEqual({
      name: { firstName: 'John', lastName: 'Doe' },
      email: 'john@example.com',
      password: 'password123',
      language: 'English',
    });
  }));

  it('should display error message when first name is empty', fakeAsync(() => {
    triggerValidation(firstNameInput, '');
    const errorMsg = fixture.debugElement.query(
      By.css('.form-group:first-child .form-control-feedback')
    );
    expect(errorMsg.nativeElement.textContent).toContain(
      'First name is required'
    );
  }));

  it('should display error message when last name is empty', fakeAsync(() => {
    triggerValidation(lastNameInput, '');
    const errorMsg = fixture.debugElement.query(
      By.css('.form-group:nth-child(2) .form-control-feedback')
    );
    expect(errorMsg.nativeElement.textContent).toContain(
      'Last name is required'
    );
  }));

  it('should display error message when email is invalid', fakeAsync(() => {
    triggerValidation(emailInput, 'invalidemail');
    const errorMsg = fixture.debugElement.query(
      By.css('#email-error-at-least')
    );
    expect(errorMsg.nativeElement.textContent).toContain(
      'Email must contain at least the @ character'
    );
  }));

  it('should display error message when email is empty', fakeAsync(() => {
    triggerValidation(emailInput, '');
    const errorMsg = fixture.debugElement.query(
      By.css('#email-error-required')
    );
    expect(errorMsg.nativeElement.textContent).toContain('Email is required');
  }));

  it('should display error message when password is to short', fakeAsync(() => {
    triggerValidation(passwordInput, 'werwe');
    const errorMsg = fixture.debugElement.query(
      By.css('#password-error-at-least')
    );
    expect(errorMsg.nativeElement.textContent).toContain(
      'Password must be at least 8 characters long'
    );
  }));

  it('should display error message when password is empty', fakeAsync(() => {
    triggerValidation(passwordInput, '');
    const errorMsg = fixture.debugElement.query(
      By.css('#password-error-required')
    );
    expect(errorMsg.nativeElement.textContent).toContain(
      'Password is required'
    );
  }));

  function triggerValidation(input: DebugElement, value: string) {
    input.nativeElement.dispatchEvent(new Event('focus'));
    tick(1);
    fixture.detectChanges();
    tick(1);
    input.nativeElement.value = value;
    tick(1);
    input.nativeElement.dispatchEvent(new Event('input'));
    tick(1);
    fixture.detectChanges();
    input.nativeElement.dispatchEvent(new Event('blur'));
    tick(1);
    fixture.detectChanges();
  }
});
```

---

## Create a reactive (Login) Form

A login form shall get created with the method of reactive forms.

![login-form.png](readme/login-form.png)

The form shall contain the following fields:

- Email
- Password

In case of missing input or short password an error message shall get displayed:

![login-form-errors.png](readme/login-form-errors.png)

The Component gets created with the following command:

```shell
ng generate component login
```

The typescript class `login.component.ts` has the following content:

File: `login.component.ts`

```typescript
iimport { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, NgClass],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.submitted) {
      alert('Great!! ' + this.loginForm.controls['email'].value);
    }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}

```

**Angular Login Component Explanation**

**Overview**
The `LoginComponent` is an Angular component responsible for handling user login functionality. It utilizes Angular's reactive forms to validate user inputs and provide a structured form submission process.

**Class Properties**

- **`loginForm!: FormGroup;`** – Stores the form instance using Angular's reactive form approach.
- **`submitted = false;`** – Tracks whether the form has been submitted.

**Constructor**

- **`constructor(private formBuilder: FormBuilder) {}`**
  - Uses Angular's `FormBuilder` service to initialize the form structure.

**Getter Method**

- **`get f() { return this.loginForm.controls; }`**
  - Provides easy access to form controls for validation in the template.

**`ngOnInit` Lifecycle Hook**

- **`ngOnInit()`**
  - Initializes the `loginForm` object using `formBuilder.group()`.
  - Defines two form fields:
    - **`email`**: Required and must be a valid email format.
    - **`password`**: Required.

**`onSubmit` Method**

- **`onSubmit()`**
  - Sets `submitted` to `true`.
  - If the form is invalid, it prevents submission.
  - If valid, it displays an alert with the entered email.

**Functionality Summary**

1. The form includes email and password fields with validation rules.
2. When submitted, the form checks for validation errors.
3. If valid, an alert message displays the email entered by the user.

---

Would you like to add any further details or modifications?

### Login HTML file

The html file `login.component.html` has the following content:

File: `login.component.html`

```html
<div class="container">
  <div class="row">
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <div class="card border-0 shadow rounded-3 my-5">
        <div class="card-body p-4 p-sm-5">
          <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
          <!-- Sign In Form -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                autocomplete="on"
                id="floatingInput"
                placeholder="name@example.com"
                formControlName="email"
                [ngClass]="{ 'is-invalid': submitted && f['email'].errors }" />
              @if (submitted && f['email'].errors) {
              <div class="invalid-feedback">
                @if (f['email'].hasError('required')) {
                <div>Email is required</div>
                } @if (f['email'].hasError('email')) {
                <div>Email must be a valid email address</div>
                }
              </div>
              }
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                autocomplete="on"
                id="floatingPassword"
                placeholder="Password"
                formControlName="password"
                [ngClass]="{ 'is-invalid': submitted && f['password'].errors }" />
              @if (submitted && f['password'].errors) {
              <div class="invalid-feedback">
                @if (f['password'].hasError('required')) {
                <div>Password is required</div>
                }
              </div>
              }
              <label for="floatingPassword">Password</label>
            </div>
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="rememberPasswordCheck" />
              <label class="form-check-label" for="rememberPasswordCheck">
                Remember password
              </label>
            </div>
            <div class="d-grid">
              <button
                class="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                type="submit">
                Sign in
              </button>
              <div class="text-center">
                <a class="small" href="#">Forgot password?</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Angular Login Component Template Explanation**

**Overview**
This HTML template represents the structure of a login form. It uses Bootstrap classes for styling and Angular features such as `formGroup`, `formControlName`, `ngClass`, and `ngIf` for form handling and validation.

**Container and Layout**

- The form is wrapped inside a **Bootstrap grid system**:
  - `container` → Ensures proper spacing and centering.
  - `row` → Defines a row for layout structure.
  - `col-sm-9 col-md-7 col-lg-5 mx-auto` → Creates a responsive column that adjusts based on screen size.
  - `card border-0 shadow rounded-3 my-5` → Styles the login form as a card with a shadow and rounded corners.

**Card and Title**

- **`card-body p-4 p-sm-5`** → Adds padding to the card's content.
- **`h5.card-title.text-center.mb-5.fw-light.fs-5`** → Displays "Sign In" as the form title with center alignment and light font styling.

**Login Form Structure**
The form uses Angular's **Reactive Forms** with `formGroup` and `formControlName` for validation.

**Form Attributes**

- **`[formGroup]="loginForm"`** → Binds the form to the `loginForm` FormGroup from the component.
- **`(ngSubmit)="onSubmit()"`** → Calls the `onSubmit()` method when the form is submitted.

- **Email Input Field**
- **`type="email"`** → Defines the input as an email field.
- **`formControlName="email"`** → Binds the field to the `email` form control.
- **`[ngClass]="{ 'is-invalid': submitted && f['email'].errors }"`**
  - Applies the Bootstrap `is-invalid` class if validation fails after submission.
- **Validation Messages:**
  (_ngIf is deprecated, use @if instead_) @if (submitted && f['email'].errors) and @if (f['password'].errors?.['required']) {
  - **`*ngIf="submitted && f['email'].errors?.['required']"`** → Displays "Email is required" if the field is empty.
  - **`*ngIf="f['email'].errors?.['email']"`** → Displays "Email must be a valid email address" if the email format is incorrect.

**Password Input Field**

- **`type="password"`** → Defines the password input.
- **Validation Messages:**
  - **`*ngIf="submitted && f['password'].errors?.['required']"`** → Displays "Password is required" when the field is empty.

**Remember Password Checkbox**

- **`<input class="form-check-input" type="checkbox" id="rememberPasswordCheck" />`**
  - Provides an optional "Remember password" checkbox.

**Sign In Button**

- **`<button class="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit">Sign in</button>`**
  - Styled as a primary Bootstrap button, used to submit the form.

**Forgot Password Link**

- **`<a class="small" href="#">Forgot password?</a>`**
  - Provides a link for users to reset their password.

**Functionality Summary**

1. The form consists of email and password fields with real-time validation.
2. Validation messages are displayed dynamically based on user input.
3. A checkbox is available for remembering the password.
4. The form submits only if all validation checks pass.

### Login Unit Test

The unit test for the login component:

File: `login.component.spec.ts`

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.value).toEqual({ email: '', password: '' });
  });

  it('should invalidate the form when fields are empty', () => {
    component.onSubmit();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should submit form when valid', () => {
    spyOn(window, 'alert');
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    component.onSubmit();
    expect(component.loginForm.valid).toBeTruthy();
    expect(component.submitted).toBeTruthy();
    expect(window.alert).toHaveBeenCalledWith('Great!! test@example.com');
  });

  it('should validate email field correctly', () => {
    const emailControl = component.loginForm.controls['email'];
    emailControl.setValue('invalid-email');
    expect(emailControl.invalid).toBeTruthy();
    expect(emailControl.errors?.['email']).toBeTruthy();
  });

  it('should validate password field correctly', () => {
    const passwordControl = component.loginForm.controls['password'];
    passwordControl.setValue('');
    expect(passwordControl.invalid).toBeTruthy();
    expect(passwordControl.errors?.['required']).toBeTruthy();
  });
});
```

**Unit Test Explanation for LoginComponent**

**Overview**
This unit test file (`login.component.spec.ts`) ensures that the `LoginComponent` behaves as expected. It verifies form initialization, validation, and submission logic using Angular's testing utilities.

**Test Dependencies and Setup**
**Before Each Test (`beforeEach` Blocks)**

- **`async beforeEach` Block:**

  - Calls `TestBed.configureTestingModule` to set up the test module.
  - Imports `ReactiveFormsModule` and declares `LoginComponent`.
  - Compiles the component’s template and styles asynchronously.

- **Synchronous `beforeEach` Block:**
  - Creates the component instance using `TestBed.createComponent(LoginComponent)`.
  - Assigns the component instance to `component`.
  - Calls `fixture.detectChanges()` to apply changes and initialize the component.

**Test Cases**

**1. Component Creation**

- **`it('should create', () => { ... })`**
  - Ensures that the component is successfully created.
  - Uses `expect(component).toBeTruthy();` to verify existence.

**2. Form Initialization**

- **`it('should initialize form with empty values', () => { ... })`**
  - Checks that `loginForm` initializes with empty email and password fields.
  - Uses `expect(component.loginForm.value).toEqual({ email: '', password: '' });`

**3. Form Validation - Empty Fields**

- **`it('should invalidate the form when fields are empty', () => { ... })`**
  - Calls `onSubmit()` without filling the form.
  - Uses `expect(component.loginForm.invalid).toBeTruthy();` to check if the form is invalid.

**4. Valid Form Submission**

- **`it('should submit form when valid', () => { ... })`**
  - Mocks the `window.alert` function using `spyOn(window, 'alert');`.
  - Sets valid email and password using `component.loginForm.setValue(...)`.
  - Calls `onSubmit()` and verifies:
    - The form is valid: `expect(component.loginForm.valid).toBeTruthy();`
    - The `submitted` flag is set to `true`.
    - The alert is displayed with the email value.

**5. Email Validation**

- **`it('should validate email field correctly', () => { ... })`**
  - Assigns an invalid email (`'invalid-email'`) to the email field.
  - Checks if `emailControl.invalid` is `true`.
  - Verifies the presence of an `email` validation error.

**6. Password Validation**

- **`it('should validate password field correctly', () => { ... })`**
  - Assigns an empty value to the password field.
  - Checks if `passwordControl.invalid` is `true`.
  - Verifies the presence of a `required` validation error.

**Summary**

- Ensures the `LoginComponent` initializes correctly.
- Validates form fields and displays errors when needed.
- Confirms that the form submits successfully when valid.
- Uses spies to mock external dependencies (`alert`).

---

## Create a Directive for a Tool Tip

Add the following styles to the global styles in styles.scss:

File styles.scss

```css
.tooltip-container {
  text-align: center;
  z-index: 100;
  position: fixed;
  padding: 6px 12px;
  font-size: 1rem;
  font-weight: 600;
  line-height: initial;
  color: white;
  width: auto;
  background: #111111ee;
  box-sizing: border-box;
  opacity: 0;
  transform: translate(-50%, -30%);
  animation: tooltip-slide 0.18s ease-out 0.5s;
  animation-fill-mode: forwards;
  pointer-events: none;
}
@keyframes tooltip-slide {
  0% {
    opacity: 0;
    transform: translate(-50%, -30%);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
```

Create the directive with the help of the cli:

```shell
ng generate directive shared/directive/tooltip
```

File tooltip.directice.ts

```typescript
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  // inputs: ['tooltip', 'delay'],
})
export class TooltipDirective implements OnDestroy {
  @Input() appTooltip = ''; // The text for the tooltip to display
  @Input() appTooltipDelay: string = '190'; // Optional delay input, in ms
  private myPopup: any;
  private timer: any;
  constructor(private el: ElementRef) {}
  ngOnDestroy(): void {
    if (this.myPopup) {
      this.myPopup.remove();
    }
  }
  @HostListener('mouseenter', ['$event']) onMouseEnter(event: MouseEvent) {
    this.timer = setTimeout(() => {
      const x =
        this.el.nativeElement.getBoundingClientRect().left +
        this.el.nativeElement.offsetWidth / 2; // Get the middle of the element
      // x = event.clientX; In case position should be under the mouse
      console.log('mouse pos', event.clientX, event.clientY);
      const y =
        this.el.nativeElement.getBoundingClientRect().top +
        this.el.nativeElement.offsetHeight +
        6; // Get the bottom of the element, plus a little extra
      this.createTooltipPopup(x, y);
    }, Number.parseInt(this.appTooltipDelay));
  }
  @HostListener('mouseleave') onMouseLeave() {
    if (this.timer) clearTimeout(this.timer);
    if (this.myPopup) {
      this.myPopup.remove();
    }
  }
  private createTooltipPopup(x: number, y: number) {
    const popup = document.createElement('div');
    popup.innerHTML = this.appTooltip;
    popup.setAttribute('class', 'tooltip-container');
    popup.style.top = y.toString() + 'px';
    popup.style.left = x.toString() + 'px';
    document.body.appendChild(popup);
    this.myPopup = popup;
    setTimeout(() => {
      if (this.myPopup) this.myPopup.remove();
    }, 5000); // Remove tooltip after 5 seconds
  }
}
```

The tooltip will appear in the middle of the Host element.
If the tooltip should appear at a different position, you can compute the x and y coordinates differently.

**Explanation of Angular `TooltipDirective`**

**Overview**
The `TooltipDirective` is a custom Angular directive that adds tooltip functionality to elements. When a user hovers over an element with this directive, a tooltip appears, displaying the provided text. The tooltip disappears when the mouse leaves the element.

**Directive Definition (`@Directive`)**

- The directive is decorated with `@Directive`, using the selector `[tooltip]`.
- The `inputs` array allows `tooltip` (text to display) and `delay` (time before tooltip appears) to be set via attribute bindings.

**Class Properties and Constructor**

- **`appTooltip` (`@Input`)**: Holds the tooltip text.
- **`appTooltipDelay` (`@Input`)**: An optional delay (default: `190ms`) before the tooltip appears.
- **`myPopup`**: Stores the tooltip element created in the DOM.
- **`timer`**: Manages the delay before showing the tooltip.
- **`constructor(private el: ElementRef)`**: Injects `ElementRef` to access the host element.

**Lifecycle Hook (`ngOnDestroy`)**

- If the directive is destroyed (e.g., the element is removed), the tooltip is also removed to prevent memory leaks.

**Event Listeners (`@HostListener`)**

1. **`onMouseEnter(event: MouseEvent)`**

- When the mouse enters the element, a timeout (`setTimeout`) is set using `delay`.
- The tooltip position is calculated based on the element's position.
- `createTooltipPopup(x, y)` is called to display the tooltip.

2. **`onMouseLeave()`**

- If the user moves the mouse away, the tooltip is removed immediately.
- Any pending timeout is cleared to prevent the tooltip from showing after the mouse has left.

3. **Tooltip Creation (`createTooltipPopup`)**

- A `div` is dynamically created and styled as a tooltip container.
- It is positioned based on the element’s dimensions.
- The tooltip is appended to `document.body`.
- It is removed automatically after `5 seconds` if not dismissed earlier.

**Conclusion**

This directive efficiently adds tooltips to elements without requiring external libraries. It ensures proper lifecycle management and prevents unnecessary DOM elements from lingering.

For using the directive add the directive tooltip and delay to the HTML template.

```typescript
[appTooltip]="'This is a Todo List'" appTooltipDelay="200"
```

To ensure the `tooltip` in _todo-lists_ is visible, we need to add it to the file `todo-lists.component.html`.

File `todo-lists.component.html`

```html
<div class="row">
  <div
    class="col-sm-9 py-1 my-1 clickable"
    [routerLink]="['/todoitem/', row.listId]"
    [appTooltip]="'This is a Todo List'"
    appTooltipDelay="200">
    ... ...
  </div>
</div>
```

Add the import to the file todo-lists.component.ts`:

```typescript
  imports: [RouterLink, DatePipe, ClickStopPropagationDirective, KeydownStopPropagationDirective, TooltipDirective],
```

### Unit Test the Tooltip Directive

File: `tooltip.directive.spec.ts`

```typescript
import { TooltipDirective } from './tooltip.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  imports: [TooltipDirective],
  template: ` <button id="test-button" [appTooltip]="'test'">test</button> `,
})
class TestTooltipDirectiveComponent {}

describe('TooltipDirective', () => {
  // let component: TestTooltipDirectiveComponent;
  let fixture: ComponentFixture<TestTooltipDirectiveComponent>;
  let des: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipDirective, TestTooltipDirectiveComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTooltipDirectiveComponent);
    // component = fixture.componentInstance;
    fixture.detectChanges();

    // all elements with an attached TooltipDirective
    des = fixture.debugElement.queryAll(By.directive(TooltipDirective));
  });

  it('should one tooltip element', () => {
    expect(des.length).toBe(1);
  });

  // attached TooltipDirective should be listed in the button
  it('should have `TooltipDirective` in 1st <button> providerTokens', () => {
    expect(des[0].providerTokens).toContain(TooltipDirective);
  });

  // attached TooltipDirective can be injected
  it('can inject `TooltipDirective` in 1st <button>', () => {
    const dir = des[0].injector.get(TooltipDirective);
    expect(dir).toBeTruthy();
  });
});
```

**Explanation of Angular Test Code for TooltipDirective**

**Overview**
This Angular test file is designed to test a custom directive, `TooltipDirective`, which is applied to a button element. The test suite verifies that the directive is correctly attached and can be injected into components.

**Test Component (`TestTooltipDirectiveComponent`)**

- A test component is created using the `@Component` decorator.
- The `TooltipDirective` is imported and applied to a `<button>` element inside the component’s template.
- The button has an attribute `[tooltip]="'test'"`, which binds the tooltip text to `"test"`.

**Setup (`beforeEach`)**

- The `TestBed.configureTestingModule` is used to set up the testing module.
- The `TooltipDirective` and `TestTooltipDirectiveComponent` are included in the `imports` array.
- `compileComponents()` ensures that the component and directive are compiled before testing.
- The test component is created, and `fixture.detectChanges()` is called to initialize the view.
- `des` is assigned all elements in the test component that use the `TooltipDirective`.

**Test Cases**

1. **Checking if the TooltipDirective is Applied**

- The test verifies that only one element (the `<button>`) has the `TooltipDirective` applied by checking the length of `des`.

2. **Ensuring the Directive is Listed in the Button’s Provider Tokens**

- This test checks if the `TooltipDirective` is included in the provider tokens of the `<button>` element.
- `des[0].providerTokens` is used to confirm the directive is present.

3. **Verifying that the TooltipDirective can be Injected**

- This test ensures that the `TooltipDirective` can be retrieved from the element’s injector.
- `des[0].injector.get(TooltipDirective)` is used to get an instance of the directive.
- The test expects the retrieved directive instance to be truthy, confirming successful injection.

**Conclusion**

This test file verifies that the `TooltipDirective` is correctly applied,
registered in the button’s providers, and can be injected when needed.
It ensures that the directive functions as expected within an Angular application.

---

## Create a Temp Conversion Pipe

A pipe will be used to convert temperatures between degrees Celsius and Fahrenheit, and vice versa.
The pipe will then be tested in the `tempConversion` component.

![temp-conversion.png](readme/temp-conversion.png)

We will generate the pipe itself and the component to set the pipe. This will result in the following new files::

![temp-conversion-structure.png](readme/temp-conversion-structure.png)

### The Pipe Class

Let's create the pipe first:

```shell
ng generate pipe shared/pipe/tempConverter
```

The pipe is named `tempConverter`. The class implements the interface Pipe `transform()`,
resulting in a methode transform. The method accepts two arguments:

- value: the temperature in Fahrenheit or Celcius
- unit: one of `C` or `F`

The conversion is using the well-known formulas for Fahrenheit->Celcius and Celcius->Fahrenheit.

File: temp-converter.pipe.ts

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tempConverter' })
export class TempConverterPipe implements PipeTransform {
  transform(value: number, unit: string) {
    // console.log(value, unit)
    if (value !== undefined && !isNaN(value)) {
      if (unit === 'C') {
        const temperature = (value - 32) / 1.8;
        return temperature.toFixed(2);
      } else if (unit === 'F') {
        const temperature = value * 1.8 + 32;
        return temperature.toFixed(2);
      }
    }
    return;
  }
}
```

### The unit test of the pipe

File: temp-converter.pipe.spec.ts

```typescript
import { TempConverterPipe } from './temp-converter.pipe';

describe('TempConverterPipe', () => {
  it('create an instance', () => {
    const pipe = new TempConverterPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms "0 degrees" to "-17.78 Fahrenheit" ', () => {
    const pipe = new TempConverterPipe();
    expect(pipe.transform(32, 'C')).toBe('0.00');
  });

  it('transforms "32 Fahrenheit" to "0 degrees" ', () => {
    const pipe = new TempConverterPipe();
    expect(pipe.transform(0, 'F')).toBe('32.00');
  });
});
```

The unit test is calling the transform method with `C` and `F`unit.

### The Test component Temp-Conversion-Pipe-Component for the Pipe tempConversion

Let's create the component:

```shell
ng generate component tempConversion
```

File: temp-conversion.component.ts

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TempConverterPipe } from '../shared/pipe/temp-converter.pipe';

@Component({
  selector: 'app-temp-conversion',
  templateUrl: './temp-conversion.component.html',
  styleUrls: ['./temp-conversion.component.scss'],
  imports: [FormsModule, TempConverterPipe],
})
export class TempConversionComponent {
  title = 'Angular Custom Pipe Example';
  celsius = 0;
  fahrenheit = 0;
}
```

### The HTML Template for Temp-Conversion-Pipe-Component

File: temp-conversion.component.html

```html
<section class="container legend">
  <div class="row mt-3">
    <h4>Fahrenheit to Celsius</h4>
  </div>
  <div class="row align-items-center">
    <div class="col-sm-2">
      <label for="fahrenheitToCelsius" class="col-form-label">Fahrenheit</label>
    </div>
    <div class="col-sm-3">
      <input
        type="text"
        id="fahrenheitToCelsius"
        class="form-control"
        [(ngModel)]="fahrenheit" />
    </div>
    <div class="col-sm-5">
      <span id="fahrenheitToCelsiusDisplay"
        >Celsius : {{ fahrenheit | tempConverter: 'C' }}
      </span>
    </div>
  </div>
  <div class="row mt-3">
    <h4>Celsius to Fahrenheit</h4>
  </div>
  <div class="row align-items-center">
    <div class="col-sm-2">
      <label for="celsiusToFahrenheit" class="col-form-label">Celsius</label>
    </div>
    <div class="col-sm-3">
      <input
        type="text"
        id="celsiusToFahrenheit"
        class="form-control"
        [(ngModel)]="celsius" />
    </div>
    <div class="col-sm-5">
      <span id="celsiusToFahrenheitDisplay"
        >Fahrenheit : {{ celsius | tempConverter: 'F' }}
      </span>
    </div>
  </div>
</section>
```

**Purpose of the Template**  
The provided HTML template defines a user interface for temperature conversion between
Fahrenheit and Celsius using Angular's two-way data binding and a custom pipe for conversion logic.

**Layout and Structure**  
The UI is organized using Bootstrap classes for responsive layout.
Each conversion direction (Fahrenheit to Celsius and Celsius to Fahrenheit) is encapsulated within a `row`,
with proper spacing (`mt-3`) for visual separation.
Labels, inputs, and result displays are laid out using Bootstrap’s
grid system to ensure alignment and responsiveness.

**Fahrenheit to Celsius Section**  
This section begins with a heading to label the conversion type.
A labeled input field allows the user to enter a Fahrenheit value.
The value entered in this input is bound bidirectionally to a component property
named `fahrenheit` using Angular's `ngModel` directive.
A span element is used to display the result of the conversion.
It utilizes the custom pipe `tempConverter` with `'C'` as the argument,
instructing the pipe to convert the value to Celsius.

**Celsius to Fahrenheit Section**  
Following the same structure, this section handles conversion from Celsius to Fahrenheit.
The input field is bound to a `celsius` property,
and the result is displayed using the `tempConverter` pipe with `'F'` as the argument.

**Data Binding and Pipe Usage**  
The use of `[(ngModel)]` enables real-time data synchronization between the input
fields and component properties, allowing instant updates to the conversion
result as the user types.
The `tempConverter` pipe processes the input value and returns the converted
temperature based on the specified direction (`'C'` for Celsius, `'F'` for Fahrenheit).

**Conclusion**  
This component provides a clean and interactive interface for bi-directional
temperature conversion, leveraging Angular's template syntax, pipes,
and reactive capabilities to deliver a seamless user experience.

### Unit Test for the Temp-Conversion-Pipe-Component

File: temp-conversion.component.spec.ts

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempConversionComponent } from './temp-conversion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TempConverterPipe } from '../shared/pipe/temp-converter.pipe';

describe('TempConversionComponent', () => {
  let component: TempConversionComponent;
  let fixture: ComponentFixture<TempConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        TempConversionComponent,
        TempConverterPipe,
      ],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert "32 Fahrenheit" to "0 degrees"', () => {
    // get the name's input and display elements from the DOM
    const hostElement: HTMLElement = fixture.nativeElement!;
    const nameInput: HTMLInputElement = hostElement.querySelector(
      '#fahrenheitToCelsius'
    )!;
    const nameDisplay: HTMLElement = hostElement.querySelector(
      '#fahrenheitToCelsiusDisplay'
    )!;

    // simulate user entering a new name into the input box
    nameInput.value = '32';

    // Dispatch a DOM event so that Angular learns of input value change.
    nameInput.dispatchEvent(new Event('input'));

    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();

    expect(nameDisplay.textContent).toBe('Celsius : 0.00 ');
  });

  it('should convert "0 degrees" to "32 Fahrenheit"', () => {
    // get the name's input and display elements from the DOM
    const hostElement: HTMLElement = fixture.nativeElement!;
    const nameInput: HTMLInputElement = hostElement.querySelector(
      '#celsiusToFahrenheit'
    )!;
    const nameDisplay: HTMLElement = hostElement.querySelector(
      '#celsiusToFahrenheitDisplay'
    )!;

    // simulate user entering a new name into the input box
    nameInput.value = '0';

    // Dispatch a DOM event so that Angular learns of input value change.
    nameInput.dispatchEvent(new Event('input'));

    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();

    expect(nameDisplay.textContent).toBe('Fahrenheit : 32.00 ');
  });
});
```

**Purpose of the Test Suite**  
The test suite is designed to validate the functionality of a temperature conversion component
in an Angular application. It checks whether the component is created successfully
and verifies the correct behavior of Fahrenheit to Celsius and Celsius to Fahrenheit conversions.

**Component Initialization**  
Before any tests run, the Angular testing module is configured to include the necessary imports and declarations.
The component is compiled, instantiated, and the fixture is initialized.
This setup ensures that the component is ready for interaction and that the DOM
is rendered appropriately for test inspection.

**Test for Component Creation**  
The first test verifies the component is instantiated properly.
If the component instance exists and is truthy, it confirms successful creation and basic setup.

**Fahrenheit to Celsius Conversion Test**  
This test simulates a user entering "32" into an input field meant for Fahrenheit values.
The DOM is queried to find the relevant input and display elements.
After programmatically entering the value and dispatching an input event, Angular is prompted to detect changes.
The test then asserts that the displayed Celsius value is correctly converted to "0.00".

**Celsius to Fahrenheit Conversion Test**  
This test mirrors the previous one but in the opposite direction.
It inputs "0" into the Celsius field, triggers the input event,
and refreshes Angular’s change detection. It confirms that the corresponding Fahrenheit output is displayed as "32.00",
ensuring bidirectional conversion accuracy.

**Conclusion**  
These tests ensure the temperature conversion logic functions correctly and that
user inputs are properly processed and displayed in the UI through Angular bindings and custom pipes.

---

## Create a Docker Container, Run and Publish to Docker

Create a distribution of the todo-angular app with

```
ng build
```

<br/>

**For intel architecture:**

A preconfigured shell script includes the build command:

```shell
./build.sh
```

```shell
$  docker buildx build --platform linux/amd64 -t uportal/todo-angular -f Dockerfile .

$  docker run --platform linux/amd64 -p 4000:4000 --rm -it  uportal/todo-angular
```

**ATTENTION**: DO NOT MISS THE POINT AT THE END OF THE docker build COMMAND.

<br/>

**For arm64v8 architecture (e.g. MAC Mx):** [https://hub.docker.com/r/arm64v8/nginx/](https://hub.docker.com/r/arm64v8/nginx/)

A preconfigured shell script includes the build command:

```shell
./build-arm.sh
```

```
$  docker buildx build --platform linux/arm64 -t uportal/todo-angular -f Dockerfile .

$  docker run --platform linux/arm64v8 -p 4000:80 --rm -it  uportal/todo-angular
```

**ATTENTION**: DO NOT MISS THE POINT AT THE END OF THE docker build COMMAND.

<br/>

_Ctrl c_ will stop and delete the container.

<br/>

Replace **uportal** with your **dockerhub id**.

<br/>

```
$  docker login
$  docker login --username uportal --password
$  docker push uportal/todo-app
```

<br/>

Alternative way for login:

```
cat ~/.key/my_password.txt | docker login --username uportal --password-stdin
```

Login to deployment platform with a container infrastructure:

<br/>

Replace **uportal** with your **dockerhub id**.

<br/>

```
$  docker pull uportal/todo-app
```

<br/>

### Run the app with a docker-compose file

Start the App in detached mode with:

```
$  docker compose up -d
```

<br/>

Start the App with log output in the console:

```
$  docker compose up
```

or with specific docker-compose file (e.g. on linux with a traefik reverse proxy)

```
$  docker compose -f docker-compose-traefik-v3.yml up
```

<br/>

Delete containers:

```
$  docker compose rm
```

<br/>

### Create a Dockerfile

The Dockerfile takes a nginx image\_, adds the content of dist/todo-angular/browser and puts it into the /usr/share/nginx/html folder.

Create a folder _nginx_ and in this folder a file _default.conf_ for the configuration of the nginx web server:

```nginx configuration

server {

  listen 80;

  sendfile on;

  default_type application/octet-stream;

  gzip on;
  gzip_http_version 1.1;
  gzip_disable      "MSIE [1-6]\.";
  gzip_min_length   1100;
  gzip_vary         on;
  gzip_proxied      expired no-cache no-store private auth;
  gzip_types        text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
  gzip_comp_level   9;


  root /usr/share/nginx/html;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";

  location / {
    try_files $uri $uri/ /index.html =404;
 }
}

```

<br/>

Create a Dockerfile in the root folder of the project:

```dockerfile
### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:22-alpine AS builder

RUN apk add --no-cache python3 g++ make

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app/

## Move to /ng-app (eq: cd /ng-app)
WORKDIR /ng-app

# Copy everything from host to /ng-app in the container
COPY . .
ARG configuration=production
## Build the angular app in production mode and store the artifacts in dist folder
ARG NG_ENV=production
RUN npm run build

### STAGE 2: Setup ###

FROM nginx:1.27.4-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy script used to inject environment variables into the project
COPY start.sh /usr/share/nginx/start.sh

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/todo-angular-20/browser /usr/share/nginx/html

# Fix permissions for runtime
RUN chmod 777 /var/log/nginx /usr/share/nginx/html
RUN sed -i 's/\r$//' /usr/share/nginx/start.sh
RUN chmod +x /usr/share/nginx/start.sh

EXPOSE 80

## Inject environment variables into the project

## CMD /usr/share/nginx/start.sh
CMD ["sh", "/usr/share/nginx/start.sh"]

```

For cross building the docker images we create 2 build files:

- build.sh
- build-arm.sh

File `build.sh`

```shell
#!/bin/sh

docker buildx build --platform linux/amd64 -t uportal/todo-angular -f Dockerfile .
```

File `build-arm.sh`

```shell
#!/bin/sh


docker buildx build --platform linux/arm64 -t uportal/todo-angular -f Dockerfile .
```

In order to inject environment variables into the project,
we create a start.sh file in the root folder of the project.

File `start.sh`

```shell
#!/bin/sh

# replace static values with environment-variables
if [ -n $API_BASE_PATH ]; then
    find /usr/share/nginx/html -type f -name "*.js" -exec  sed -i "s~_API_BASE_PATH_~$API_BASE_PATH~g" {} \;
fi



nginx -g "daemon off;"
```

<br/>

### Create a docker-compose.yml file

Replace **uportal** with your **dockerhub id**.

<br/>

File: `docker-compose.yml`

```yaml
services:
  todo-angular:
    image: uportal/todo-angular:latest

    restart: unless-stopped
    ports:
      - '4000:80'
    environment:
      API_BASE_PATH: https://todo-h2.united-portal.com
```

<br/>

### Create a docker-compose-traefik.yml file

Traefik is a reverse proxy on linux. There is a version 1.x and 2.x for the yaml-file possible, depending on the use of the traefik version.

[https://doc.traefik.io/traefik/](https://doc.traefik.io/traefik/)

**For traefik version 2.x**

Please adapt your url: "traefik.http.routers.blog.rule=Host(`YOUR URL`)"

File: `docker-compose-traefik-v2.yml`

```yaml
networks:
  proxy:
    external: true

services:
  todo-angular:
    image: uportal/todo-angular:latest
    labels:
      - traefik.http.routers.blog.rule=Host(`todo-angular.united-portal.com`)
      - traefik.http.routers.blog.tls=true
      - traefik.http.routers.blog.tls.certresolver=lets-encrypt
      - traefik.port=8080
    restart: always
    ports:
      - 4000:80
    networks:
      - proxy
```

**For traefik version 3.x**

Please adapt your url: "traefik.http.routers.todo-angular.rule=Host(`YOUR URL`)".
Please check your traefik external networt name.

File: `docker-compose-traefik-v3.yml`

```yaml
networks:
  proxy:
    external: true

services:
  todo-angular:
    image: uportal/todo-angular:latest
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.todo-angular.rule=Host(`todo-angular.united-portal.com`)'
      - 'traefik.http.routers.todo-angular.tls=true'
      - 'traefik.http.routers.todo-angular.tls.certresolver=lets-encrypt'
      - 'traefik.http.routers.todo-angular.entrypoints=websecure'
      - 'traefik.http.services.todo-angular.loadbalancer.server.port=80'
    restart: unless-stopped
    ports:
      - 4000:80
    networks:
      - proxy

    environment:
      API_BASE_PATH: https://todo-h2.united-portal.com
```
