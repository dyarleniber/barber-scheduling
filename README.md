# Barber Appointment Scheduling App

The application allows the registration of barbers and customers. Customers can appointment schedules with available barbers, and barbers can see a summary of the day's schedules.

The software was developed using the Model–View–Controller (MVC) architectural pattern.
The technologies of the Backend side are: Node.js, Express and a PostgreSQL database with [Sequelize ORM](https://sequelize.org/). The templating engine [Nunjucks](https://mozilla.github.io/nunjucks/) was used on views.
The profile pictures and the session informations are stored locally. The profile pictures are stored by the middleware [Multer](https://github.com/expressjs/multer).

## Screenshots

![](https://i.imgur.com/8koidrM.jpg) ![](https://i.imgur.com/HgW1wsG.jpg)

![](https://i.imgur.com/cRnjUIG.jpg) ![](https://i.imgur.com/QddZ4y5.jpg)

## Environment configuration

### Database configuration

First of all you must have a PostgreSQL database available.

In development environment I suggest using the Docker container image [kartoza/postgis](https://hub.docker.com/r/kartoza/postgis/). Just run the following command:

```shell
docker run --name database -p 5432:5432 -d -t kartoza/postgis
```

Replace database with the name you prefer.

After that, it is necessary to create the database Schema in PostgreSQL. If you are using a Docker instance as suggested above, the credentials are as follows:

| Key      | Value 	|
| --------- | --------- |
| Host 		| localhost |
| Port 		| 5432		|
| User 		| docker 	|
| Password 	| docker 	|

### Environment variables

After the database configuration, you must set the environment variables. Create a file called .env at the root of the project, using the data from the .env.example file as a base. Be sure to enter a session name and a session secret, these values ​​are used to store the user's session at the moment he logs in to the application. Database informations must be populated according to the configuration mentioned above. Follow an example:

```shell
NODE_ENV=development

PORT=3000

SESSION_NAME=root
SESSION_SECRET=MySecret

DATABASE_HOST=127.0.0.1
DATABASE_NAME=mydatabase
DATABASE_USERNAME=docker
DATABASE_PASSWORD=docker
```

### Migrations

Now, you must run the migrations in order to create the tables in the database. Run the following command:

```shell
npx sequelize db:migrate
```

### Install dependencies

Finally, just install all project dependencies and start the application with the following commands:

```shell
yarn install
```

```shell
yarn start
```

You can access the application according to the port set in the environment variables, for example:

http://localhost:3000/
