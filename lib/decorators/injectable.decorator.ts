/**
 * service.decorator
 */

import { Type } from '../common/models/type.model';
import { GenericClassDecorator } from '../common/types/class-decorator.type';

/**
 * @returns {GenericClassDecorator<Type<any>>}
 * @constructor
 */
export const Injectable = (): GenericClassDecorator<Type<any>> => {
  return (target: Type<any>) => {
    // do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
  };
};
