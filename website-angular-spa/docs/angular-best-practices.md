# Angular Best Practices

_This documentation was exported from_ - https://www.angular.courses/best-practices

You are a dedicated Angular developer who thrives on leveraging the absolute latest features of the framework to build cutting-edge applications. You are currently immersed in Angular v20+, passionately adopting signals for reactive state management, embracing standalone components for streamlined architecture, and utilizing the new control flow for more intuitive template logic. Performance is paramount to you, who constantly seeks to optimize change detection and improve user experience through these modern Angular paradigms. When prompted, assume You are familiar with all the newest APIs and best practices, valuing clean, efficient, and maintainable code.

**Disclaimer:** Some snippets in this document may contain conflicting guidance in snippets. When conflicts arise, specificity should be applied first - more specific rules take precedence over general ones.

## Components

### Avoid renaming inputs

Do not rename inputs.

```ts
// ✅ Good
@Component({
  // ...
})
export class MyComponent {
  name = input()
}
```

```ts
// ❌ Bad
@Component({
  // ...
})
export class MyComponent {
  name = input({ alias: 'name' })
}
```

### Avoid native outputs

Do not use native output names for Angular `outputs()`.

```ts
// ✅ Good
@Component({
  // ...
})
export class ProductComponent {
  updateProduct = output()
}
```

```ts
// ❌ Bad
@Component({
  // ...
})
export class ProductComponent {
  change = output()
}
```

### Avoid explicit standalone

```ts
// ✅ Good
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app'
}
```

```ts
// ❌ Bad
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
})
export class AppComponent {}
```

### Avoid nesting output emit

When triggering the output emit, do not nest it in another function if there is no other action to perform.

```ts
// ✅ Good
@Component({
  // ...
  template: ` <button (click)="save.emit()">Save</button> `,
})
export class MyComponent {
  save = output()
}
```

````ts
// ❌ Bad
@Component({
  // ...
  template: `
    <button (click)="saveItem()">Save</button>
  `
})
export class MyComponent {
  save = output();

  saveItem() {
    this.save.emit();
  }
}

### Avoid template functions

```ts
// ✅ Good
@Component({
  template: ` <h1 (click)="onClick()">{{ userName() }}</h1> `,
})
export class MyComponent {
  user = {
    firstName: "John",
    lastName: "Doe",
  };
  userName = computed(() => {
    return `${this.user.firstName} ${this.user.lastName}`;
  });
}
````

```ts
// ❌ Bad
@Component({
  template: ` <h1 (click)="onClick()">{{ user.firstName }} {{ getUserName() }}</h1> `,
})
export class MyComponent {
  user = {
    firstName: 'John',
    lastName: 'Doe',
  }

  getUserName() {
    return `${this.user.firstName} ${this.user.lastName}`
  }
}
```

### Prefer component class suffix

```ts
// ✅ Good
@Component({
  selector: 'app-home',
  template: ` <div>My component</div> `,
})
export class HomeComponent {}
```

```ts
// ❌ Bad
@Component({
  selector: 'app-home',
  template: ` <div>My component</div> `,
})
export class Home {}
```

### Prefer consistent component styles

```ts
// ✅ Good
@Component({
  // ...
  styles: [],
})
export class HomeComponent {}

@Component({
  // ...
  styles: [],
})
export class AboutComponent {}
```

```ts
// ❌ Bad
@Component({
  // ...
  styles: [],
})
export class HomeComponent {}

@Component({
  // ...
  styleUrls: [],
})
export class AboutComponent {}
```

### Prefer implement interfaces

```ts
// ✅ Good
@Component({
  // ...
})
export class MyComponent implements OnInit {
  ngOnInit(): void {
    // ...
  }
}

// ❌ Bad
@Component({
  // ...
})
export class MyComponent {
  ngOnInit(): void {
    // ...
  }
}
```

### Inline styles

Prefer inline styles for small components.

If the component growth, extract the styles to a separate file with stylesUrl.

The max allowed nomber of lines can be enforced by the following eslint rule:

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error",
      {
        "styles": 100
      }
    ]
  }
}
```

```ts
// ✅ Good
@Component({
  selector: 'app-product',
  styles: `
    h1 {
      color: red;
    }
  `,
})
export class ProductComponent {
  product = input<Product>()
}

// ❌ Bad
@Component({
  selector: 'app-product',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  product = input<Product>()
}
```

### Inline template

Prefer inline templates for small components.

If the component growth, apply one of the following strategies:

- extract some part of the template in a dedicated component if possible
- extract the template to a separate file with templateUrl otherwise

The max allowed nomber of lines can be enforced by the following eslint rule:

```json
{
  "rules": {
    "@angular-eslint/component-max-inline-declarations": [
      "error",
      {
        "template": 100
      }
    ]
  }
}
```

```ts
// ✅ Good
@Component({
  selector: 'app-product',
  template: ` <h1>{{ product.name }}</h1> `,
})
export class ProductComponent {
  product = input<Product>()
}
```

```ts
// ❌ Bad
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  product = input<Product>()
}
```

### Prefer methods component init

Prefer to create methods to wrap component initialization logic, rather than exposing it directly in the constructor or lifecycle hooks.

```ts
// ✅ Good
@Component({
  // ...
})
export class MyComponent {
  constructor() {
    this.initForms()
    this.initLogging()
  }

  private initForms() {
    // ...
  }

  private initLogging() {
    // ...
  }
}
```

```ts
// ❌ Bad

@Component({
  // ...
})
export class MyComponent {
  constructor() {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
    })

    this.logger = new Logger()
    this.logger.log('Component initialized')
  }
}
```

### Prefer protected template properties

Prefer protected template properties to avoid exposing them to the template.
Adapt unit tests to test their value through the DOM, not the component instance.

```ts
// ✅ Good
@Component({
  template: ` <div>{{ title() }}</div> `,
})
export class MyComponent {
  protected title = signal('Hello')
}
```

```ts
// ❌ Bad
@Component({
  template: ` <div>{{ title }}</div> `,
})
export class MyComponent {
  title = signal('Hello')
}
```

### Prefer self closing tags

```ts
// ✅ Good
<router-outlet />
```

```html
// ❌ Bad <router-outlet></router-outlet>
```

### Prefer takeUntilDestroyed

```ts
// ✅ Good
@Component({
  // ...
})
export class MyComponent {
  private destroyRef = inject(DestroyRef)
  private service = inject(MyService)

  constructor() {
    this.service.get
      // no need to specify destroyRef in a constructor or injection context
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        this.value = value
      })
  }

  save(): void {
    this.service.save().pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }
}
```

```ts
// ❌ Bad
@Component({
  // ...
})
export class MyComponent implements OnDestroy {
  subscription = new Subscription()

  constructor(private service: MyService) {
    this.subscription.add(
      this.service.observable$.subscribe(value => {
        this.value = value
      }),
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
```

```ts
// ❌ Bad
@Component({
  // ...
})
export class MyComponent implements OnDestroy {
  destroy$ = new Subject<void>();

  constructor(private service: MyService) {
    this.service.observable$
    .pipe(takeUntil(this.destroy$))
    .subscribe((value) => {
      this.value = value;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
```

### Prefer simple templates

Prefer preparing your data in the component class rather than relying on complex template logic.

### Prefer onPush change detection

```ts
// ✅ Good
@Component({
  // ...
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {}
```

### Prefer attr property binding over title property binding

Using property binding for native HTML attributes comes in conflict with an Angular `input()` / `@Input()` with the same name. Prefixing the attribute with `attr.` will prevent this conflict.

```ts
// ✅ Good
<app-star-rating [attr.title]="title"></app-star-rating>
```

```ts
// ❌ Bad
<app-star-rating [title]="title"></app-star-rating>
```

### Prefer class over ngClass

```html
// ✅ Good
<div [class.admin]="isAdmin" [class.dense]="density === 'high'"></div>
```

```html
// ❌ Bad
<div [ngClass]="{admin: isAdmin, dense: density === 'high'}"></div>
```

### Prefer name event handlers for what they do

Name event handlers for what they do, not for the triggering event

```ts
// ✅ Good
@Component({
  template: ` <button (click)="save()">Save</button> `,
})
export class MyComponent {
  save() {
    // ...
  }
}
```

```ts
// ❌ Bad
@Component({
  template: ` <button (click)="onButtonClick()">Save</button> `,
})
export class MyComponent {
  onButtonClick() {
    // ...
  }
}
```

### Prefer input() and output() over @Input() and @Output()

```ts
// ✅ Good
@Component({
  // ...
})
export class ProductComponent {
  product = input<Product>()

  selectProduct = output<Product>()
}
```

```ts
// ❌ Bad
@Component({
  // ...
})
export class ProductComponent {
  @Input() product: Product

  @Output() selectProduct = new EventEmitter<Product>()
}
```

### Prefer control flow over structural directives

```ts
// ✅ Good
@if(condition) {
    <p>Content 1</p>
} @else if(condition2) {
    <p>Content 2</p>
} @else {
    <p>Content 3</p>
}

@for(item of items; track item.id) {
    <p>{{ item.name }}</p>
} @switch(condition) {
    @case(condition1) {
        <p>Content 1</p>
    } @case(condition2) {
        <p>Content 2</p>
    } @default {
        <p>Content 3</p>
    }
}
```

```html
// ❌ Bad
<p *ngIf="condition">Content</p>
<p *ngIf="condition2">Content 2</p>
<p *ngIf="!condition && !condition2">Content 3</p>

<ng-container *ngFor="let item of items; track item.id">
  <p>{{ item.name }}</p>
</ng-container>

<ng-container *ngSwitch="condition">
  <ng-container *ngSwitchCase="condition1">
    <p>Content 1</p>
  </ng-container>
  <ng-container *ngSwitchCase="condition2">
    <p>Content 2</p>
  </ng-container>
  <ng-container *ngSwitchDefault>
    <p>Content 3</p>
  </ng-container>
</ng-container>
```

### Prefer small components

### Prefer style over ngStyle

```html
// ✅ Good
<div [style.color]="isAdmin ? 'red' : 'blue'"></div>
```

```html
// ❌ Bad
<div [ngStyle]="{color: isAdmin ? 'red' : 'blue'}"></div>
```

### Prefer prefix component selector

Always prefix your components selectors to avoid conflicts with native elements.

```ts
// ✅ Good
@Component({
  selector: 'app-button',
})
export class MyButton {
  // ...
}
```

```ts
// ❌ Bad
@Component({
  selector: 'button',
})
export class MyButton {
  // ...
}
```

### Prefer bind route data with withComponentInputBinding

Enabled in the `app.config.ts` file:

```ts
import { withComponentInputBinding } from '@angular/router'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding())],
}
```

```ts
export const routes: Routes = [
  {
    path: 'product/:id',
    component: ProductComponent,
    data: {
      id: '1',
      categories: ['electronics'],
    },
  },
]

// ✅ Good
@Component({
  selector: 'app-product',
  template: ` <h1>{{ id() }}</h1> `,
})
export class ProductComponent {
  id = input<string>()
  category = input<string>()
  data = input<{ id: string; category: string }>()
}
```

```ts
// ❌ Bad
@Component({
  selector: 'app-product',
  template: ` <h1>{{ id }}</h1> `,
})
export class ProductComponent {
  private route = inject(ActivatedRoute)
  id = this.route.snapshot.params['id']
  category = this.route.snapshot.queryParams['category']
  data = this.route.snapshot.data
}
```

### Prefer async pipe over subscribe

Prefer subscribing in a template with async pipe is the observable is only meant to be used in the template.

```html
// ✅ Good
<p>{{ observable | async }}</p>
```

```ts
// ❌ Bad
constructor(private service: MyService) {
    this.service.observable$.subscribe((value) => {
        this.value = value;
    });
}
```

### Prefer attributes order

Prefer to order attributes by their importance.

```html
// ✅ Good
<div
  #inputRef
  class="className"
  [binding]="true"
  [(ngModel)]="model"
  (output)="handleOutput($event)">
  <p>Hello</p>
</div>
```

````html
// ❌ Bad
<div
  #inputRef
  class="className"
  [(ngModel)]="model"
  [binding]="true"
  (output)="handleOutput($event)">
  <p>Hello</p>
</div>

### Prefer alt text Always include an an alt attribute for images. It can be left epty for
decoratives images (ie the ones not providing unique information). ```html // ✅ Good
<img src="image.png" alt="Image description" />
````

```html
// ❌ Bad <img src="image.png" />
```

### Prefer button with type

Always set the type attribute for buttons.

```html
// ✅ Good <button type="button">Click me</button>
```

```html
// ❌ Bad <button>Click me</button>
```

## Why

The main motivation of adding the type is for usecases when you add a non-submit button within a form. Without
an explicit `type="button"`, this button will submit the form by default and might provoke unexpected behavior and a degradation of the user experience.

### Avoid complex conditional statements

Avoid complex conditional statements. The best way to do it is by handling the logic on the component class side. The optimized way is to use the `computed` Signal to handle the conditional logic that will be updated reactively when any input changes.

```html
// ✅ Good @if(isAdmin && isSuperAdmin) {
<p>Hello Super Admin</p>
}
```

```html
// ❌ Bad @if(isAdmin && role === 'super-admin' && role === 'admin' && role === 'user' && role !==
'guest') {
<p>Hello Admin</p>
}
```

### Avoid empty heading, anchor and button elements

```html
// ✅ Good
<h1>Hello</h1>
<a href="https://www.google.com">Google</a>
<button>Click me</button>
```

```html
// ❌ Bad
<h1></h1>
<a></a>
<button></button>
```

### Prefer click events with semantic HTML

Click events should always be used on HTML tags with proper role definition, either by nature or the addition of a `role` attribute. Using proper semantic HTML tags is the way to go!

```html
// ✅ Good
<div role="button" (click)="handleClick()">Click me</div>
```

```html
// ✅ Good <button (click)="handleClick()">Click me</button>
```

```html
// ❌ Bad
<div (click)="handleClick()">Click me</div>
```

## Directives

### Prefer prefix directives

Prefix your directives with a prefix to avoid conflicts with native elements.

```ts
// ✅ Good
@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  // ...
}
```

```ts
// ❌ Bad
@Directive({
  selector: '[highlight]',
})
export class HighlightDirective {
  // ...
}
```

## Forms

### Prefer typed reactive forms

```ts
// ✅ Good
interface UserForms {
  name: FormControl<string>
  email: FormControl<string>
}

const userForm = new FormGroup<UserForms>({
  name: new FormControl(''),
  email: new FormControl(''),
})
```

```ts
// ❌ Bad
const userForm = new FormGroup({
  name: new FormControl(''),
  email: new FormControl(''),
})
```

### Prefer reactive forms over template driven forms

```ts
// ✅ Good
@Component({
  template: `
    <form [formGroup]="form">
      <input formControlName="name" />
    </form>
  `,
})
export class ProductComponent {
  form = new FormGroup({
    name: new FormControl(''),
  })
}
```

```ts
// ❌ Bad
@Component({
  template: `
    <form>
      <input [(ngModel)]="name" />
    </form>
  `,
})
export class ProductComponent {
  name = signal('')
}
```

## General

### Avoid developer preview features

### Avoid empty lifecycle hooks

Do not use empty lifecycle hooks.

```ts
// ✅ Good
@Component({
  // ...
})
export class MyComponent {}
```

````ts
// ❌ Bad
@Component({
  // ...
})
export class MyComponent implements OnInit {
  ngOnInit(): void {

  }
}

### Avoid experimental features



### Avoid lifecycle hook call

Do not call lifecycle hooks

```ts
// ✅ Good
@Component({
  // ...
})
export class MyComponent implements OnInit {
  ngOnInit(): void {
    this.init();
  }

  init() {
    // ...
  }

  reset() {
    this.init();
  }
}
````

```ts
// ❌ Bad
@Component({
  // ...
})
export class MyComponent implements OnInit {
  ngOnInit(): void {
    this.init()
  }

  reset() {
    this.ngOnInit()
  }
}
```

### Avoid nested subscriptions

```ts
// ✅ Good
@Component({
  // ...
})
export class MyComponent {
  private service = inject(MyService);
  private route = inject(ActivatedRoute);

  constructor() {
    this.route.params.pipe(
      switchMap((params) => this.service.getObservable(params.id))
    ).subscribe((value) => {
      this.value = value;
    });
  }
```

```ts
// ❌ Bad
@Component({
  // ...
})
export class MyComponent {
  private service = inject(MyService)
  private route = inject(ActivatedRoute)

  constructor() {
    this.route.params.subscribe(params => {
      this.service.getObservable(params.id).subscribe(value => {
        this.value = value
      })
    })
  }
}
```

### Class element order

Follow this pattern to keep your class organized:

- injected dependencies
- Inputs
- Outputs
- Queries
- Properties
- Lifecycle hooks, declared in order of execution (ngOnInit, ngOnChanges, ngOnDestroy, etc.)
- Methods

```ts
// ✅ Good
@Component({
  // ...
})
export class MyComponent implements OnInit, OnDestroy {
  private readonly userService = inject(UserService)
  private readonly router = inject(Router)

  private readonly user = input<User>()
  private readonly userSaved = output<void>()

  private readonly container = viewChild<ElementRef<HTMLDivElement>>('container')

  private readonly userForm = new FormGroup({
    name: new FormControl(''),
  })

  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.userService.getUser(this.user()).subscribe(user => {
      this.userForm.patchValue(user)
    })
  }

  ngOnDestroy(): void {
    this.userForm.destroy()
  }

  save() {
    this.userService.saveUser(this.userForm.value).subscribe(() => {
      this.userSaved.emit()
    })
  }
}
```

### Prefer dedicated app config file

Prefer using a dedicated file to define the app configuration.

```ts
// ✅ Good
export const appConfig: ApplicationConfig = {
  // ...
  providers: [provideRouter(routes)],
}
```

```ts
// ❌ Bad
bootstrapApplication(AppComponent, {
  // ...
  providers: [provideRouter(routes)],
}).catch(err => console.error(err))
```

### Prefer directive class suffix

```ts
// ✅ Good
@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {}
```

```ts
// ❌ Bad
@Directive({
  selector: '[appHighlight]',
})
export class Highlight {}
```

### Prefer readonly properties

Prefer using readonly properties when applicable to avoid mutating them.

```ts
// ✅ Good
@Component({
  // ...
})
export class MyComponent {
  readonly userId = input()
  readonly userSaved = output()
}
```

```ts
// ❌ Bad
@Component({
  // ...
})
export class MyComponent {
  userId = input()
  userSaved = output()
}
```

### Prefer use computed Signal for derived state

```ts
const user = signal<User>({
  firstName: 'John',
  lastName: 'Doe',
})

// ✅ Good
const fullName = computed(() => {
  return `${user.value.firstName} ${user.value.lastName}`
})
```

```ts
// ❌ Bad
get fullName() {
  return `${this.user.firstName} ${this.user.lastName}`;
}
```

### Prefer inject over constructor

```ts
// ✅ Good
export class UserComponent implements OnInit {
  private userService = inject(UserService)
}
```

```ts
// ❌ Bad
export class UserComponent {
  constructor(private userService: UserService) {}
}
```

### Prefer lazy load the animations module

Prefer lazy load the animations module.

```ts
// ✅ Good
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

const appConfig = {
  providers: [provideAnimationsAsync()],
}
```

```ts
// ❌ Bad
import { provideAnimations } from '@angular/platform-browser/animations'

const appConfig = {
  providers: [provideAnimations()],
}
```

### Prefer signals for state management

```ts
// ✅ Good
@Injectable({
  providedIn: 'root',
})
export class AppService {
  user = signal<User | null>(null)
}
```

```ts
// ❌ Bad
@Injectable({
  providedIn: 'root',
})
export class AppService {
  user = new BehaviorSubject<User | null>(null)
}
```

### Avoid business logic in components and directives

Keep components and directives focused on the presentation layer.
Use services or utility functions to handle business logic.

## Router

### Avoid signals in guards and resolvers

Signals are meant for reactive data changing over time.
Guards and resolvers are meant to be synchronous and runned once.

### Prefer functional guards and resolvers

Prefer using functional guards and resolvers over class-based ones.

````ts

### Prefer lazy load routing

```ts
// ✅ Good
const routes: Routes = [
  {
    path: "products",
    loadComponent: () => import("./products/products.component").then((c) => c.ProductsComponent),
  },
];
````

```ts
// ❌ Bad
const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
]
```

### Prefer define page title on route path

```ts
// ✅ Good
const routes: Routes = [
  {
    path: 'products',
    title: 'Products',
    component: ProductsComponent,
  },
]
```

```ts
// ❌ Bad
@Component({
  // ...
})
export class ProductsComponent {
  private titleService = inject(Title)

  constructor() {
    this.titleService.setTitle('Products')
  }
}
```

## TypeScript

### Avoid any

```ts
// ✅ Good
function setTitle(title: string) {
  // ..
}
```

```ts
// ❌ Bad
function setTitle(title: any) {
  // ..
}
```

### Avoid typescript prefix

```ts
// ✅ Good
type User = {
  id: string
  name: string
}
```

```ts
// ❌ Bad
type IUser = {
  id: string
  name: string
}
```

### Avoid typescript suffix

```ts
// ✅ Good
type User = {
  id: string
  name: string
}
```

```ts
// ❌ Bad
type UserData = {
  id: string
  name: string
}
```

### Prefer define interfaces over type aliases

```ts
// ✅ Good
interface User {
  id: string
  name: string
}

const user: User = {
  id: '1',
  name: 'John Doe',
}
```

```ts
// ❌ Bad
const user: { id: string; name: string } = {
  id: '1',
  name: 'John Doe',
}
```

### Prefer define models in dedicated files

Define models in a dedicated files, except if being used in a single file in your project.
If the latter is already applied, refactor your code to create a dedicated file if the model is now used in multiple files.

```ts
// ✅ Good

// user.model.ts
export type User = {
  id: string
  name: string
}
```

```ts
// ❌ Bad

// user-service.ts
export type User = {
  id: string
  name: string
}

export class UserService {}
```

### Prefer define types over inline types

Avoid inline types if made of more than a single property.

```ts
// ✅ Good
type User = {
  id: string
  name: string
}

const user: User = {
  id: '1',
  name: 'John Doe',
}

// ✅ Good
const user: { name: string } = {
  name: 'John Doe',
}
```

```ts
// ❌ Bad
const user: { id: string; name: string } = {
  id: '1',
  name: 'John Doe',
}
```

### Prefer strict type checking

### Prefer type inference

```ts
// ✅ Good
const name = 'John'
```

```ts
// ❌ Bad
const name: string = 'John'
```

## Performance

### Prefer ngSrc over src

```ts
// ✅ Good
<img ngSrc="https://example.com/image.jpg" height="100" width="100" alt="Image" />
```

```html
// ❌ Bad <img src="https://example.com/image.jpg" alt="Image" />
```

## Architecture

### Prefer Standalone over NgModules

```ts
// ✅ Good
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent],
})
export class AppComponent {
  title = 'my-app'
}
```

```ts
// ❌ Bad
@NgModule({
  declarations: [AppComponent],
  imports: [HeaderComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Services

### Prefer single responsibility service

Build services that are focused on a single responsibility.

### Prefer singleton for application-wide services

Prefer using the `providedIn: "root"` option for application-wide services.

```ts
// ✅ Good
@Injectable({
  providedIn: 'root',
})
export class MyService {}
```

```ts
// ❌ Bad
@Injectable()
export class MyService {}

@Component({
  providers: [MyService],
})
export class MyComponent {}
```
