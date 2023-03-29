import { BcryptHelper } from '@src/app/helpers';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    dataSource: DataSource,
    private readonly bcryptHelper: BcryptHelper
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    if (event.entity.password) {
      event.entity.password = await this.bcryptHelper.hash(
        event.entity.password
      );
    }
  }

  async beforeUpdate(event: InsertEvent<User>) {
    if (event.entity.password) {
      event.entity.password = await this.bcryptHelper.hash(
        event.entity.password
      );
    }
  }

  async afterLoad(entity: User) {
    if (entity.userRoles && entity.userRoles.length) {
      entity.roles = entity.userRoles
        .map((userRole) => userRole.role)
        .map((role) => {
          return {
            ...role,
            isAlreadyAdded: true,
          };
        });

      delete entity.userRoles;
    }
  }
}
