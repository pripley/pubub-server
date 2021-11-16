
# BrewHub - Server

BrewHub allows customers to search and save their favorite breweries.  They can keep a running list of the beers they have tried at each brewery and what they thought by rating and giving reviews.  They can also see the beers other customers have tried along with their ratings and comments. 


## Getting started locally

1. `npm install`
1. Create your DB in PGAdmin with a name
1. Create a `.env` file
1. Copy the information found in the `.env.example` file and create your own `.env file`
1. Adjust the values in the env file to match your project
1. Modify the app.js file with the resetDatabase if you are currently building your models out
1. `nodemon` or `npx nodemon` to start server




## API Endpoints

### User Login and Signup

```http
  POST /user/login
  POST /user/signup
```


| lastName  | firstName |  email  | password | username |
| :-------- | :-------  | :------ | :------  | :------  |
| `string` | `string` |  `string` | `string` | `string` |

### Brewery 

##### Brewery Create

```http
  POST /brewery/   
```
##### Get all breweries for a user

```http
  GET /brewery/   
```
##### Get single brewery for a user

```http
  GET /brewery/:id   
```
##### Get all breweries for another user other than logged in user

```http
  GET /brewery/user/:id   
```
##### Update and Delete a brewery by ID

```http
  PUT /brewery/:id  
  DELETE /brewery/:id  
```

| name  | street | city  | state | zip |  type | favorite |
| :-------- | :-------  | :------ | :------  | :------  |:-------- |:-------- |
| `string` | `string` |  `string` | `string` | `string` |`string` |`boolean` |

### Beer 

##### Beer Create

```http
  POST /beer/   
```
##### Get all beers for a user

```http
  GET /beer/   
```
##### Get all beers by location

```http
  GET /beer/   
```
##### Get single beer for a user

```http
  GET /beer/:id   
```
##### Get all beers for another user other than logged in user

```http
  GET /beer/user/:id   
```
##### Update and Delete a beer by ID

```http
  PUT /beer/:id  
  DELETE /beer/:id  
```


| name  | location | rating  | servingStyle | note |  
| :-------- | :-------  | :------ | :------  | :------  |
| `string` | `string` |  `integer` | `string` | `string` |


## Acknowledgements

This app utilizes the Open Brewery DB to search for breweries.

 - [Open Brewery DB - Search Breweries](https://www.openbrewerydb.org/documentation/03-search)
  
## Authors

- [@pripley](https://github.com/pripley)

