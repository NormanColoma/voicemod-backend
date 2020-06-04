# Voicemod's REST API

Simple REST API for Voicemod. 

## Authentication 

There are certain endpoints which will require you to be authenticated, you will provide your
user email and password in exchange of `JWT Token`

For each endpoint authenticated you have to provide a token in `Authorization` header this way: 

`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJwZXBlICBzdWFyZXoiLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSJ9LCJleHBpcmF0aW9uIjoxNTkxMjIzNTE3LCJpYXQiOjE1OTEyMTk5MTd9.mzbgdXnma91FNAuPSYmC6SQVHttKcDPsKkn0EOORaIU`

When making API requests to endpoints that require authentication, you could get `401 Unauthorized` either you don't provide a token, token is not valid, or it is expired.

### POST /login

Log in as user and retrieve a token for interacting with the API

**Resource Information**

| Required Authentication        | Response Format   |
| -------------|:-------------:|
| No    | JSON |

**Params**

| Body Param        | Description   | Type | Required  |
| -------------|:-------------:| -----:| -----: |
| **email**     | Email of the user | `string`| `yes` |
| **password**      | Password of the user      | `string`|  `yes` |


**Example Request**

`POST http://localhost:3000/login`

```json5
{
  "email": "email@email.com",
  "password:": "userpass"
}
```

**Response**

It will return `200 Ok` http status if all went ok with `JWT token` issued in the response body, or `500 Server Error` in case of an error.

**Example Response** 

```json5
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJwZXBlICBzdWFyZXoiLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSJ9LCJleHBpcmF0aW9uIjoxNTkxMjY3Mjk3LCJpYXQiOjE1OTEyNjM2OTd9.CIBLyT1c9jz7aAE_3eSNcFa9tJSAYY85f3FGPMXXcXg"
}
```

### Users

Ednpoints for creating, updating, and deleting users.

#### POST /users

Create new user with provided info

**Resource Information**

| Required Authentication        | Response Format   |
| -------------|:-------------:|
| No    | No Content |


**Params**

| Body Param        | Description   | Type | Required  |
| -------------|:-------------:| -----:| -----: |
| **id**     | Id of the user | `ObjectID`| `yes` |
| **email**      | Email of the user. Must be a valid email     | `string`|  `yes` |
| **name** | Name of the user     | `string` |   `yes` |`
| **surnames** | Surnames of the user     | `string` |   `no` |`
| **country** | Country of the user     | `string` |   `no` |`
| **phone** | Phone of the user     | `string` |   `no` |`
| **postalCode** | Postal code of the user     | `string` |   `no` |`
| **password** | Password of the user. Must have at least 7 character length    | `string` |   `yes` |`


**Example Request**

`POST http://localhost:3000/users`

```json5
{
	"id": "5ed80cdcc0e1debaefa50204",
	"email": "messi@fcb.com",
	"name": "Lionel",
	"surnames": "Messi",
	"phone": "666666666",
	"postalCode": "08001",
	"country": "Spain",
	"password": "alwaysGOAT"
}
```

**Response** 

It will return `201 Created` http status if all went ok with `Location Header` providing access to the new resource created, `422 Unprocessable Entity` if you don't accomplish API validations, or `500 Server Error` in case of an error.

`Satus 201 Location http://localhost:3000/users/5ed80cdcc0e1debaefa50204`

#### UPDATE /users/:userId

Updates user info. This endpoint requires authentication.

**Resource Information**

| Required Authentication        | Response Format   |
| -------------|:-------------:|
| Yes    | No Content |

**Params**

| Body Param        | Description   | Type | Required  |
| -------------|:-------------:| -----:| -----: |
| **email**      | Email of the user. Must be a valid email     | `string`|  `yes` |
| **name** | Name of the user     | `string` |   `yes` |`
| **surnames** | Surnames of the user     | `string` |   `yes` |`
| **country** | Country of the user     | `string` |   `yes` |`
| **phone** | Phone of the user     | `string` |   `yes` |`
| **postalCode** | Postal code of the user     | `string` |   `yes` |`
| **password** | Password of the user    | `string` |   `yes` |`
| **newPassword** | New password of the user. Must have at least 7 character length    | `string` |   `yes` |`

| Headers Param        | Description   | Type | Required  |
| -------------|:-------------:| -----:| -----: |
| **Authorization**      | valid token    | `string`|  `yes` |

**Example Request** 

`PUT http://localhost:3000/users/5ed80cdcc0e1debaefa50204`

```json
{
	"id": "5ed80cdcc0e1debaefa50204",
	"email": "messi@fcb.com",
	"name": "Lionel",
	"surnames": "Messi",
	"phone": "666666666",
	"postalCode": "08001",
	"country": "Spain",
	"password": "alwaysGOAT",
	"newPassword": "stillGOAT"
}
```

**Response** 

It will return `204 No Content` http status if all went ok, `422 Unprocessable Entity` if you don't accomplish API validations, or `500 Server Error` in case of an error.

#### DELETE /users/:userId

Deletes user account

**Resource Information**

| Required Authentication        | Response Format   |
| -------------|:-------------:|
| Yes    | No Content |

**Example Request** 

`DELETE http://localhost:3000/users/5ed80cdcc0e1debaefa50204`

**Response** 

It will return `204 No Content` http status if all went ok, `422 Unprocessable Entity` if you don't accomplish API validations, or `500 Server Error` in case of an error.


