/**
 * type.model
 * Object instance type
 */
export type Type<T> = new(...args: any[]) => T;
