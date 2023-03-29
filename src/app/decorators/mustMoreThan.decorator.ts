import {
  buildMessage,
  isNumber,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export const MUST_MORE_THAN = 'mustMoreThan';

function isValidated(value: number, minValue: number): boolean {
  if (isNumber(value) && value > minValue) {
    return true;
  }
  return false;
}

export function MustMoreThan(
  minVal: number,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: MUST_MORE_THAN,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate: (value, args): boolean => isValidated(value, minVal),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be more than 0',
          validationOptions
        ),
      },
    });
  };
}
