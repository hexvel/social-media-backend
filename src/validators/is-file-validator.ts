import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsFile implements ValidatorConstraintInterface {
  validate(value: any): boolean | Promise<boolean> {
    if (typeof value === 'object' && value.size && value.type) {
      const type = value.type.split('/')[1];
      return ['image/jpeg', 'image/png'].includes(type);
    }
    return false;
  }
}
