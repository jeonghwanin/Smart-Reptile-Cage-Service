# 기본 타입

## 타입 지정 방법
- `{변수명}:{타입명}` 방식으로 지정
- 타입에 맞지 않는 값을 넣으면 오류
```ts
let car:string = "hyundai"
```

## 기본 타입 종류
```ts
// 숫자
let age:number = 27

// 문자열
let name:string = "한주"

// 불린형
let isAddult:boolean = true

// 배열
let nums1:number[] = [1,2,3,4,5]
let nums2:Array<number> = [1,2,3,4,5]

// 튜플
let tuple1:[number, string] = [1, 'a']
```

## 특수 타입
```ts
// void - return 값이 없음
function sayHello():void {
  console.log('hello')
}


// never - 항상 에러를 반환 or 끝나지 않는 함수
function showError():never {
  throw new Error();
}

function inLoop():never {
  while (true) {}
}


// enum - 인덱스(숫자)와 양방향 맵핑
enum Os {
  first, // 0 or 지정값
  second, // first + 1 or 지정값
  third = 5 // second + 1 or 지정값
}

// 문자 입력시 단방향 맵핑
enum OS {
  first = 'a',
  second = 'b',
  third = 'c'
} 


// null, undefined
let a:null = null
let b:undefined = undefined
```
<br>

# 인터페이스

## typescript에서의 `Object`
- 아래 코드는 오류가 발생
- Object에는 특정 속성값에 대한 정보가 없기 때문
```ts
let user:Object;

user = {
    name : 'hanju',
    age : 27
};

console.log(user.name)
```

## `interface` 기본 구조
- `Object` 사용에 의한 오류를 해결하기 위해 사용
- `interface`를 사용해 타입을 정의하여 사용
- 정의하지 않은 속성을 사용하면 오류 발생
- 정의한 속성을 사용하지 않아도 오류 발생

```ts
type score = 'A'|'B'|'C'|'F'  // 커스텀 타입(지정된 값 이외에 존재 불가능)

interface User {
    name:string;  // 반드시 사용해야함
    age:number;   // 반드시 사용해야함
    gender?:string;  // 사용 여부가 자유
    readonly birthdayYear:number;  // 최초 할당 후 수정 불가능
    [grade:number]:score;  // 이름은 자유, '숫자 : Score'이 다수 존재 가능
};

let user:User = {
    name : 'hanju',
    age: 27,
    birthdayYear: 1997,
    1: 'A'
}
```

## 함수에서의 `interface`
- `interface`를 통해 인풋값과 리턴값 타입 지정 가능
```ts
interface Add {
    (num1:number, num2:number): number;
}

const add:Add = function(x,y) {
    return x + y;
}
```

## `implements`
- 상위 인터페이스의 하위 인터페이스 생성
- 값을 미리 지정해줄 수도 있음, 입력값으로 받을 수도 있음
- `constructor` : 생성자 함수
```ts
interface Car {
  color:string;
  wheels: number;
}

class BMW implements Car {
  color;
  wheels = 4;
  constructor(c:string) {
    this.color = c
  }
}

const a = new BMW('white')
```

## `extends`
- 상위 인터페이스에 추가적인 속성값 부여 가능
- 상위 인터페이스의 필수 입력값들 또한 모두 입력해야함
- 여러 인터페이스 추가 가능
```ts
interface Car {
  color:string;
  wheels: number;
}

interface Machine {
  price:number;
}

interface Benz extends Car, Machine {
  doors: number;
}
```
<br>

# 함수

## 함수 타입 지정
- 함수에 들어가는 매개 변수, 결과값 모두 타입 지정 해줘야함
```ts
function add(num1:number, num2:number):number {
  return num1 + num2
}

// 리턴값이 없으면 void
function add(num1:number, num2:number):void {
  console.log(num1 + num2)
}
```

## 선택적 매개변수
- 매개변수 뒤에 `?`를 붙이면 선택적 매개변수가 됨
```ts
function hello(name?: string) {
  return `Hello, ${name || "world"}`
}

// default값 지정
function hello(name = "world") {
  return `Hello, ${name}`
}
```
- 선택적 매개변수는 함수 뒷부분에 선언해야함
```ts
function hello(name:string, age?:number):string {
  if (age === undefined) {
    return `Hello, ${name}`
  } else {
    return `Hello, ${name}. You are ${age}`
  }
}
```

## 나머지 매개변수의 타입 지정
- 매개변수의 개수를 특정할 수 없을 때 배열 형태로 타입 지정
```ts
function add(...nums : number[]) {
  return nums.reduce((result, num) => result + num, 0)
}
```

## `this`
- 선언된 인터페이스를 활용한 함수를 사용할 때 `this`에 관한 타입을 따로 지정해줘야함
```ts
interface User {
  name : string;
}

const Sam: User = {name:'sam'}

function showName(this.User, age:number, gender:'m'|'f') {
  console.log(this.name)
}

const a = showName.bind(Sam);
a(30, 'm')
```

## 함수 오버로드
- 매개변수의 개수나 타입에 따라 다른 동작을 하게 함

```ts
interface User {
  name: string;
  age: number;
}

function join(name:string, age:string): User
function join(name:string, age:number): User
function join(name:string, age:number|string): User|string {
  if (typeof age === "number") {
    return {
      name,
      age
    };
  } else {
    return "나이는 숫자로 입력해주세요.";
  }
}
```
<br>

# 유니온/교차 타입

## Literal Types
- 정해진  값을 가지고 있는 변수 or Type
```ts
const userName1 = "Bob";
// 문자형
type Job = "police" | "developer" | "teacher";
// 숫자형
type Num = 1 | 2 | 3
```

## Union Types
- 변수 값이 여러 타입을 가지는 경우에 사용
```ts
let age:number|string = 10;
```

## 식별 가능한 Union Types
- 여러 타입을 사용하여 오류가 발생할 경우 타입을 식별할 수 있는 처리를 해줘야함
```ts
interface Car {
  name: 'car';
  color: string;
  start(): void;
}

interface Mobile {
  name : "mobile";
  color : string;
  call(): void;
}

function getGift(gift: Car|Mobile) {
  console.log(gift.color);
  // name이 식별자가 됨
  if (gift.name === "car") {
    gift.start();
  } else {
    gift.call();
  }
}
```

## Intersection Types(교차 타입)
- and의 기능
- 교차된 모든 타입의 속성을 할당해줘야함
```ts
interface Car {
  name: string;
  start(): void;
}

interface Toy {
  name : string;
  color : string;
  price: number;
}

const toyCar: Toy & Car = {
  name: "타요",
  start() {},
  color: "red",
  price: 500
}
```
<br>

# 클래스

## 타입스크립트 클래스 선언
- 생성자에서 사용할 변수는 미리 클래스 내부에서 선언되어있어야함
- 그렇지 않을 경우 접근 제한자를 선언해주어야함
```ts
class Car {
  color: string;
  constructor(color: string) {
    this.color = color;
  }
  start() {
    console.log("start")
  }
}
```

## 접근 제한자

### `public`
- 아무것도 선언하지 않으면 자동으로 `public`으로 선언
- 자식 클래스, 자식 인스턴스에서도 부모 변수에 접근 가능
```ts
class Car {
  name:string = "car";
  color: string;
  constructor(color: string) {
    this.color = color;
  }
  start() {
    console.log("start")
  }
}

class BMW extends Car {
  constructor(color:string) {
    super(color);
  }
  showName() {
    console.log(super.name);
  }
}
```

### `private`
- 해당 클래스 내부에서만 접근 가능
- `#`으로도 선언 가능
```ts
class Car {
  #name:string = "car";
  color: string;
  constructor(color: string) {
    this.color = color;
  }
  start() {
    console.log("start")
  }
}

class BMW extends Car {
  constructor(color:string) {
    super(color);
  }
  showName() {
    // 오류 발생
    console.log(super.name);
  }
}
```

### `protected`
- 자식 클래스 내부에서는 접근 가능하나 자식 인스턴스에서는 접근 불가능
```ts
class Car {
  protected name:string = "car";
  color: string;
  constructor(color: string) {
    this.color = color;
  }
  start() {
    console.log("start")
  }
}

class BMW extends Car {
  constructor(color:string) {
    super(color);
  }
  showName() {
    console.log(super.name);
  }
}

const z4 = new BMW("black");
console.log(z4.name);  // 오류 발생
```

## 속성 변경 제한
- `readonly`로 선언된 속성은 따로 변경 불가능
- 변경하려면 생성자를 통해 변경해야함
```ts
class Car {
  readonly name:string = "car";
  color: string;
  constructor(color: string, name:string) {
    this.color = color;
    this.name = name;
  }
  start() {
    console.log("start")
  }
}

class BMW extends Car {
  constructor(color:string, name:string) {
    super(color, name);
  }
  showName() {
    console.log(super.name);
  }
}

const z4 = new BMW("black", "zzzzzz");
```

## static 속성
- `static`으로 선언한 속성은 `{class명}.{속성명}`으로 접근 가능
```ts 
class Car {
  readonly name:string = "car";
  color: string;
  static wheels = 4;
  constructor(color: string, name:string) {
    this.color = color;
    this.name = name;
  }
  start() {
    console.log("start")
  }
}

console.log(Car.wheels);
```

## 추상 클래스
- `abstract`로 선언된 클래스는 변수에 할당할 수 없음
- 반드시 자식 클래스가 상속받아 사용해야함
- `abstact`로 선언된 메서드는 상속받는 자식 클래스에서 반드시 구체적으로 구현해야함
```ts
abstract class Car {
  readonly name:string = "car";
  color: string;
  constructor(color: string, name:string) {
    this.color = color;
    this.name = name;
  }
  abstract doSomething():void;
}

// 오류 발생 - doSomething()를 정의해줘야함
class BMW extends Car {
  constructor(color:string, name:string) {
    super(color, name);
  }
}

// 오류 발생 - 추상 클래스라 이런 식으로 사용 불가
const car = new Car();
```
<br>

# Generic

## 기본 사용법
- 함수에서 매개변수로 여러 타입을 사용해야할 경우 사용
- 보통 `T`를 사용
- 'type parameter'라고 함
```ts
function getSize<T>(arr:T[]):number {
  return arr.length;
}

const arr1 = [1,2,3];
getSize<number>(arr1);

const arr2 = ["a","b","c"];
getSize<string>(arr2);
```

## 인터페이스에서의 사용
- generic으로 선언해준 속성은 인스턴스 생성 때 자유롭게 정의 가능
```ts
interface Mobile<T> {
  name : string;
  price : number;
  option : T;
}

const m1:Mobile<{color:string; coupon:boolean}> = {
  name : 'a',
  price:1000,
  option: {
    color: 'red',
    coupon:false,
  }
}
const m2:Mobile<string> = {
  name : 'b',
  price: 2000,
  option: 'good'
}
```
- 인스턴스를 변수로 사용하는 함수에서도 사용 가능
- 인스턴스의 속성이 존재하는지 선언한 타입이 맞는지 확인하고 오류 반환
```ts
interface User {
  name: string;
  age: number;
}

interface Car {
  name: string;
  color :string;
}

interface Book {
  price: number;
}

const user:User = {name:"a", age:10};
const car:Car = {name:"b", color:"red"};
const book:Book = {price:3000};

function showName<T extends {name:string}>(data:T):string {
  return data.name;
}

showName(user);
showName(car);
showName(book);  // 오류 발생
```
<br>

# Utility Types

## `keyof`
- 인터페이스의 키값들을 유니온 형태로 받을 수 있음
```ts
interface User {
  id: number;
  name: string;
  age: number;
  gender: 'm'|'f';
}

type UserKey = keyof User; // 'id' | 'name' | 'age' | 'gender
const uk:UserKey = "id"
```

## `Partial<T>`
- 속성을 모두 Optional로 바꿔줌
```ts
interface User {
  id: number;
  name: string;
  age: number;
  gender: 'm'|'f';
}

// 모든 속성을 정의하지 않아도 됨
let admin:Partial<User> = {
  id:1,
  name: "hanju"
}
```

## `Required<T>`
- 모든 속성값을 필수값으로 바꿔줌
```ts
interface User {
  id: number;
  name: string;
  age?: number;
}

let admin:Required<User> = {
  id:1,
  name: "hanju"
}
```

## `Readonly<T>`
- 처음에 할당만 가능하고, 값 교체 불가능
```ts
interface User {
  id: number;
  name: string;
  age?: number;
}

let admin:Readonly<User> = {
  id:1,
  name: "hanju"
}

admin.id = 4  // 오류 발생
```

## `Record<K,T>`
- 키와 타입을 따로 정의해서 사용 가능 

```ts
type Grade = 1 | 2 | 3 | 4
type Score = "A" | "B" | "C" | "D"

const score: Record<Grade, Score> = {
  1: "A",
  2: "B",
  3: "C",
  4: "D"
}
```

## `Pick<T, K>`
- 입력한 속성들만 정의 가능
```ts
interface User {
  id: number;
  name: string;
  age: number;
  gender: "M" | "W";
}

const admin: Pick<User, "id" | "name"> = {
  id: 0,
  name: "Bob"
}
```

## `Omit<T, K>`
- 특정 속성 제외 가능
```ts
interface User {
  id: number;
  name: string;
  age: number;
  gender: "M" | "W";
}

const admin: Omit<User, "age" | "gender"> = {
  id: 0,
  name: "Bob"
}
```

## `Exclude<T1, T2>`
- T1 타입에서 T2에 해당하는 타입 제외
```ts
type T1 = string | number | boolean;
type T2 = Exclude<T1, number | string>
```

## `NonNullable<T>`
- null, undefined를 타입에서 제외

```ts
type T1 = string | null | undefined | void;
type T2 = NonNullable<T1>;
```