## Technology Used
- ExpressJS
- NestJS
- TypeORM
- PostgreSQL
- Redis
## Running Application
Environment file is available in ```environments``` directory. Change database credentials then run

```shell
yarn start
```
## Migrations
For creating a migration file
```shell
yarn db:migration:create src/database/migrations/User
```
Before running migration run ```yarn build``` command
```shell
yarn build
yarn db:migration:run
yarn db:migration:revert
```

## Documentation
http://localhost:3000/docs