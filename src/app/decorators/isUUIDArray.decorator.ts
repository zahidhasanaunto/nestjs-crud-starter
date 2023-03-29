import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';
import type ValidatorJS from 'validator';
import isUuidValidator from 'validator/lib/isUUID';

export const IS_UUID_ARRAY = 'isUuidArray';

function isValidated(
  value: unknown,
  version?: ValidatorJS.UUIDVersion
): boolean {
  let isOnlyUuid = true;
  if (!Array.isArray(value)) {
    return false;
  }
  value.forEach((item) => {
    if (!isUuidValidator(item, version)) {
      isOnlyUuid = false;
    }
  });
  return isOnlyUuid;
}

export function IsUUIDArray(
  version?: ValidatorJS.UUIDVersion,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_UUID_ARRAY,
      constraints: [version],
      validator: {
        validate: (value, args): boolean =>
          isValidated(value, args?.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be an array of UUID',
          validationOptions
        ),
      },
    },
    validationOptions
  );
}
