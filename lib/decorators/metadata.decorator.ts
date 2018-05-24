/**
 * metadata.decorator
 */

import { Type } from '../common/models/type.model';
import { GenericClassDecorator } from '../common/types/class-decorator.type';
import { Injector } from '../modules/injector.module';

/**
 * Create generic method decorator
 */
export const MetadataDecorator = () => {
    return (config: object = {}): any => {
        return (target: Type<any>, propertyKey: string, descriptor: PropertyDescriptor): void => {
          Injector.set(target, config, propertyKey);
        };
    };
};

export const Metadata = MetadataDecorator();
