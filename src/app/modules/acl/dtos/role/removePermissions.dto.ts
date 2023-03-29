import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyArray, IsUUIDArray } from '@src/app/decorators';

export class RemovePermissionsDTO {
  @ApiProperty({
    type: [String],
    required: true,
    example: [
      '06f3d108-a2c6-471f-b7ba-0e88077f64ec',
      '6dc90d80-a619-4ab8-8433-95c6e0635495',
    ],
  })
  @IsNotEmptyArray()
  @IsUUIDArray()
  permissions!: string[];
}
