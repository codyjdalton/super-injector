/**
 * type.model
 * Object instance type
 */
export interface Type<T> {
    new(...args: any[]): T;
}
