## Description

Ride-Hailing Offer Aggregator API built with NestJS. This API is a simple aggregator that fetches offers from different ride-hailing services and returns them in a unified format. The API is built with NestJS, a progressive Node.js framework for building efficient, reliable and scalable server-side applications.


## Prerequisites

```bash
- Node.js (>= 14.x)
- npm (>= 6.x)
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start (Runs the application in development mode (server runs on `localhost:3001`)
```

## Test

```bash
# unit tests
$ npm run test
```

## API Response Structure

```bash
# The API returns ride offers in the following structure:

    {
      "provider": "provider_name",
      "price": 100,
      "duration": {
        "value": 30,
         "unit": "minutes"
       },
      "carType": "Sedan"
    }
```

### Fields

- **provider**: The ride-hailing service provider (e.g., Uber, Bolt).
- **price**: The price of the ride.
- **duration**: An object containing the duration of the ride.
    - **value**: The numerical value of the duration.
    - **unit**: The unit of the duration (e.g., minutes, hours).
- **carType**: The type of car for the ride (e.g., Sedan, SUV).

## Fetch Ride Offers

```bash
# To fetch ride offers, make a GET request to:

GET "http://localhost:3001/api/rides"
```


### Notes on Handling Various Errors as the API Grows

1. **Validation Errors**: Use `HttpStatus.BAD_REQUEST` for invalid input data.
2. **Authentication/Authorization Errors**: Use `HttpStatus.UNAUTHORIZED` or `HttpStatus.FORBIDDEN` for authentication and authorization issues.
3. **Not Found Errors**: Use `HttpStatus.NOT_FOUND` when requested resources are not found.
4. **External API Errors**: Handle errors from external APIs by catching them and returning a `HttpStatus.SERVICE_UNAVAILABLE` or a custom status code.
5. **Database Errors**: Use `HttpStatus.INTERNAL_SERVER_ERROR` for unexpected database errors, and log the errors for further investigation.
6. **Rate Limiting**: Implement rate limiting and return `HttpStatus.TOO_MANY_REQUESTS` when the limit is exceeded.
7. **Logging**: Log all errors with sufficient details to help in debugging and monitoring.
8. **Custom Error Classes**: Create custom error classes to handle specific error scenarios more gracefully and provide more context.


