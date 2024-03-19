# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
    "username": "rhjhaerol",
    "password": "admin123",
    "name": "M Rahaji Jhaerol"
}
```

Request Body Success :

```json
{
    "data": {
        "username": "rhjhaerol",
        "name": "M Rahaji Jhaerol"
    }
}
```

Request Body Error :

```json
{
    "errors": "username already registrated"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
    "username": "rhjhaerol",
    "password": "admin123"
}
```

Request Body Success :

```json
{
    "data": {
        "token": "unique-token"
    }
}
```

Request Body Error :

```json
{
    "errors": "username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

-   Authorization : token

Request Body :

```json
{
    "name": "Muhammad Rahaji Jhaerol", //optional
    "password": "new password" //optional
}
```

Request Body Success :

```json
{
    "data": {
        "username": "rhjhaerol",
        "name": "Muhammad Rahaji Jhaerol"
    }
}
```

Request Body Error :

```json
{
    "errors": "Name length max 100"
}
```

## GET User API

Endpoint : GET api/users/current

Headers :

-   Authorization : token

Request Body Success:

```json
{
    "data": {
        "username": "rhjhaerol",
        "name": "Muhammad Rahaji Jhaerol"
    }
}
```

Request Body Error :

```json
{
    "errors": "unauthorized"
}
```

## Logout User API

Endpoint : DELETE api/users/logout

Headers :

-   Authorization : token

Request Body Success :

```json
{
    "data": "OK"
}
```

Request Body Error :

```json
{
    "errors": "unauthorized"
}
```
