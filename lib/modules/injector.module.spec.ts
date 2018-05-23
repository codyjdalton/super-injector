/**
 * some.module.spec
 */

import { expect } from 'chai';

import { Injectable } from '../decorators/injectable.decorator';
import { Injector } from './injector.module';

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
});
