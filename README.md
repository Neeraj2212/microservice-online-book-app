# Online Content Microservice Project

## Description
This project is a built on microservice architecture to serve online content. It contains 3 microservices:
- **Content Service**: This service is responsible for managing content.
- **User Service**: This service is responsible for managing users.
- **Interaction Service**: This service is responsible for managing user interactions with content.

## Documentation

High Level Design: [High Level Design](./High%20Level%20Design.md)

Low Level Design: [Low Level Design](./Low%20Level%20Design.md)

## API Documentation
API documentation is available in the following formats:

Postman Collection :- [Postman Collection](https://www.postman.com/interstellar-firefly-437250/workspace/micorservice-online-book-app/collection/16239037-da59a8d9-7f34-42f7-9084-ad5079fab0b6?action=share&creator=16239037)

Swagger Documentation :- [Swagger Documentation](https://app.swaggerhub.com/apis-docs/N78844/microservice-book-app/1.0)

Postman Documentation :- [Postman Documentation](https://documenter.getpostman.com/view/16239037/2s9YR6bEJc)

## How to run the project
### Prerequisites
- Docker
- Docker Compose

### Steps
1. Clone the repository
2. Run the following command to start the project
```bash
docker-compose up
```
3. Add `.env.development.local` file to all microservices and add the following environment variables:
```
SECRET_KEY=<secret_key>
```
4. The project will be available on http://localhost:80
