/**
 * injector.module
 * @description Inject dependencies
 */
import 'reflect-metadata';

import { Type } from '../common/models/type.model';
/**
 * The Injector stores services and resolves requested instances.
 */
export const Injector = new class {

  /**
   * Resolves instances by injecting required services
   * @param {Type<any>} target
   * @returns {T}
   */
  public resolve<T>(target: Type<any>): T {
    // tokens are required dependencies, while injections are resolved tokens from the Injector
    const tokens: Array<Type<any>> = Reflect.getMetadata('design:paramtypes', target) || [];
    const injections = tokens.map((token) => Injector.resolve<any>(token));

    return new target(...injections);
  }

  /**
   * Stores a service in the Injector
   * @param {Type<any>} target
   * @param {object} config - an object containing metadata
   * @param {string | symbol} propKey
   */
  public set(target: Type<any>, config: object, propKey: any = null): void {
    Object.keys(config).forEach(
      (key: string) => Reflect.defineMetadata(key, config[key], target, propKey ? propKey : undefined),
    );
  }

  /**
   * @function get
   * @param {Type<any>} target
   * @param {string} key
   * @param {any} defaultValue
   */
  public get(target: Type<any>, key: string, defaultValue: any = null, propKey: any = null): any {
    return Reflect.hasMetadata(key, target, propKey ? propKey : undefined) ?
           Reflect.getMetadata(key, target, propKey ? propKey : undefined) :
           defaultValue;
  }

  /**
   * @function getAll
   * @param target
   * @param propertyKey
   *
   * Return all values from a given object
   */
  public getAll(target: Type<any>, propertyKey: string): object {
    return Reflect.getMetadataKeys(target, propertyKey).reduce(
      (result: object, key: string): object => {
        result[key] = this.get(target, key, undefined, propertyKey);
        return result;
      }, {},
    );
  }

  /*public getParams(target: Type<any>, propertyKey: string) {
    return Reflect.getMetadata('design:paramtypes', target.prototype, propertyKey) || [];
  }*/
}();
