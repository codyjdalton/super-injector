[![Build Status](https://travis-ci.org/codyjdalton/super-injector.svg?branch=master)](https://travis-ci.org/codyjdalton/super-injector) [![Coverage Status](https://coveralls.io/repos/github/codyjdalton/super-injector/badge.svg?branch=master)](https://coveralls.io/github/codyjdalton/super-injector?branch=master) 

# Super Injector

Dead simple dependency injection for Typescript.

## Installation

Install the module as a dependency in your project:

```
npm i super-injector --save
```

## Usage

Add the Injectable decorator and resolve a class with dependencies:

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

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/codyjdalton/super-injector/tags). 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details