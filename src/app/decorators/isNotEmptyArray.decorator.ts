import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';

export const IS_NOT_EMPTY_ARRAY = 'isNotEmptyArray';

function isValidated(value: unknown): boolean {
  if (!Array.isArray(value) || value.length === 0) {
    return false;
  }
  return true;
}

export function IsNotEmptyArray(
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_NOT_EMPTY_ARRAY,
      validator: {
        validate: (value, args): boolean => isValidated(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property can not be empty array',
          validationOptions
        ),
      },
    },
    validationOptions
  );
}
