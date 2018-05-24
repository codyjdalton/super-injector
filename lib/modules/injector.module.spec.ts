/**
 * some.module.spec
 */

import { expect } from 'chai';

import { Injector } from './injector.module';

import { Injectable } from '../decorators/injectable.decorator';
import { Metadata } from '../decorators/metadata.decorator';

describe('Injector', () => {

    it('should include class dependencies', () => {

        @Injectable()
        class AnotherClass {
            public message: string = 'test-message';
        }

        @Injectable()
        class TestClass {

            constructor(private anotherClass: AnotherClass) {
            }

            get testMessage(): string {
                return this.anotherClass.message;
            }
        }

        const aTestClass: TestClass = Injector.resolve<TestClass>(TestClass);

        expect(aTestClass.testMessage).to.equal('test-message');
    });

    it('should allow setting properties on a class target', () => {

        @Injectable()
        class TestClass {}

        // set a property at the test class level
        Injector.set(TestClass, { someProp: 'test' });

        const propVal: string = Injector.get(TestClass, 'someProp');
        const someVal: string = Injector.get(TestClass, 'noProp', 'defaultValue');

        expect(propVal).to.equal('test');
        expect(someVal).to.equal('defaultValue');
    });

    it('should allow setting properties on a class method target', () => {

        @Injectable()
        class TestClass {

            @Metadata({
                someProp: 'another-test'
            })
            public someMethod() {
                // ..
            }

            @Metadata()
            public anotherMethod() {
                // ..
            }
        }

        const aTestClass: any = Injector.resolve<TestClass>(TestClass);
        const propVal: string = Injector.get(aTestClass, 'someProp', null, 'someMethod');
        const anotherVal: string = Injector.get(aTestClass, 'someProp', null, 'anotherMethod');

        expect(propVal).to.equal('another-test');
        expect(anotherVal).to.equal(null);
    });
});
