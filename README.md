[![npm version](https://badge.fury.io/js/super-injector.svg)](https://badge.fury.io/js/super-injector) [![Build Status](https://travis-ci.org/codyjdalton/super-injector.svg?branch=master)](https://travis-ci.org/codyjdalton/super-injector) [![Coverage Status](https://coveralls.io/repos/github/codyjdalton/super-injector/badge.svg?branch=master)](https://coveralls.io/github/codyjdalton/super-injector?branch=master) ![npm](https://img.shields.io/npm/l/super-injector.svg)


# Super Injector

Dead simple dependency injection for Typescript.

## Installation

Install the module as a dependency in your project:

```
npm i super-injector --save
```

## Usage

Add the Injectable decorator and resolve a class with dependencies:

### Get an instance of a class with dependencies

Super Injector will new up your class and all of its dependencies

```typescript
import { Injectable, Injector } from 'super-injector';

@Injectable()
class SomeClass {
    public message: string = 'Hello World!';
}

@Injectable()
class AnotherClass {

    constructor(private someClass: SomeClass) {
    }

    get message(): string {
        return this.someClass.message;
    }
}

const anotherClassInstance: AnotherClass = Injector.resolve(AnotherClass);

console.log(anotherClassInstance.message);

// logs "Hello World" to the console
```

### Set metadata on classes

Set metadata on classes before instantiation:

```typescript
import { Injectable, Injector } from 'super-injector';

@Injectable()
class TestClass {}

// set a property at the test class level
Injector.set(TestClass, { someProp: 'Hello World' });

console.log(Injector.get(TestClass, 'someProp'));

// logs "Hello World" to the console
```

### Set and get metadata on class methods

You can set metadata at design time and retrieve it at run time:

```typescript
import { Metadata, Injector } from 'super-injector';

class SomeClass {
    
    @Metadata({
        someProp: 'Hello World',
        anotherProp: 'Hi World'
    })
    someMethod(): void {
        // ..
    }
}

const someClassInstance: AnotherClass = Injector.resolve(someClassInstance);

console.log(Injector.get(someClassInstance, 'someProp', null, 'someMethod'));
// logs Hello World to the console

console.log(Injector.getAll(someClassInstance, 'someMethod'));
// logs { "someProp": "Hello World", "anotherProp": "Hi World" } to the console
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/codyjdalton/super-injector/tags). 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details