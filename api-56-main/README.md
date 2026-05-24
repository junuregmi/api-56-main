# SOLID 
 - Single Responsibility Principle
 - Open-close Principle 
 - Liskov-Substitution principle
 - Interface Segregation principle 
 - Dependency Inversion Principle 

# api-56

## Node Js
  ### Package Manager 
    - npm, yarn, pnpm, bun, deno
  ### Package.json
### JS 
  - ES-5, 
  - ES-6

### Server
  - client - server 
  - Listens to the client for any REQUEST and RESPOND to the client 
  - API Development (Application Program Interface)


        FE      ================== URL =================>      Server (API)
  Mobile/Web/Desktop                              nodejs, PHP, python, .net, java

  - Server, 
    - host, port, methods, url 
    - REST API 

#### Request-Response Cycle
  - Request from client via url 
  - Server Process and manipulates on the request, and reply(Respond) to the client

### CRUD Operation (Rest API)
  - Create
    - `post` 
  - Read 
    - `get`
  - Update 
    - `put` (all information, updated, non-updated)
    - `patch` (only updated fields)
  - Delete
    - `delete`


# Architecture 
```text
  .git/
  node_modules/
  public/
  src/
    config/
    app/
      <feature>/
        <featureName>.<conroller/model/service/router/..>.js
        .../
      <feature1>/
        <feature1Name>.<conroller/model/service/router/..>.js
        .../
    services/
    lib/
    ...
  .gitignore
  index.js
  package.json
  pnpm-lock.yaml
  README.md
```

```text
  .git/
  node_modules/
  public/
  src/
    config/
    models/
      <feature>.model.js
    controllers/
      <feature>.controller.js
    router/
      <feature>.router.js
    validators/request/transformer/
      <feature>.<validators/request/transformer/>.js
    ....
    services/
    lib/
    ...
  .gitignore
  index.js
  package.json
  pnpm-lock.yaml
  README.md
```



// index.js ===> /src/config/expres.config.js


### 3 tire Architecture
- Presentation/ View 
- Data Database 
- Logical/Application - Controller


### MVC pattern 
- CRUD 

### Response methods: 
  // res.end("Hello world")
  // res.send("Hello World")
  // res.json({ data: null, message: "Hello there", status: "OK" });
  // res.render(<h1>Hello THere</h1>); // setup template engine for express
  // res.sendFile("/path/index.html")
  // res.download("/path")
  // res.statusCode(404)
  // res.status(404).end("Not found")
  // res.redirect("/")

#### Response Format 
  -  Success
  ```json
    // status: 2xx, 3xx
    {
      "data": "For success",      // any data 
      "message": "string",        // toast,
      "status": "string/code",    // constant
      "meta/pagination": {}       // SEO, pagination, meta property, optional
    }
  ```
-  Failed
  ```json
    // status code: errors (4xx, 5xx)
    {
      "error": {},                // null, {}
      "message": "string",        // toast,
      "status": "string/code",    // constant
    }
  ```

## Feature (Ecommerce/POS)
  - Auth 
  - Category 
  - Brand 
  - Product 
  - Order 
  - Transactions 
  - ...

  - Auth
  - Attendance 
  - class management 
  - Exam 
  - Result 
  - Sections.
  - Teacher


### URL Format 
  - http://localhost:9005/api/v2/route<path>

  - /abc/4





- Monolithic 
  - module
- Microservice 
  - 

### dotenv 
  - environment build


### Datastore 
- NoSQL (Not Only SQL)
  - key-vair or document format
  - one document/ object represents a dataset 
  - keys/properties of object is the data property
  - realtime data, big data, read-write operation fast and reliable 
  - mongodb (Atlas)
- SQL
  - table format in row-column 
  - A row represent a dataset
  - Columns represent the property of the dataset
  - normalization, relational structure, redundency remove, ... 
  - postgres (supabase, neon)

  - 50000 row of data in sql 
    - DML operation, SQL
    - NoSQL 

## DB Server 
  - online(cloud)
  - onsite/physical/on device

## Database integrate 
  - Server Connection 
  - ORM/ODM -> Model definition 
  - Model Query

## CRUD 
  - Create 
    - `ModelObj.save()`
    
    - `Model.insertOne(data)`
    - `Model.insertMany([objects])`

  - Read 
    - `Model.find(filter, projection, options)`
    - `Model.findOne(filter, projection, options)`

  - Update
    - `Model.fineOneAndUpdate(filter, {$set: dataupdate}, {new: true, upsert: })`
    - `Model.fineByIdAndUpdate(id, {$set: dataupdate}, {new: true, upsert: })`
    - `Model.updateOne(filter, {$set: dataupdate}, {upsert: 1-0})`
    - `Model.updateMany(filter, {$set: dataupdate}, {upsert: 1-0})`

  - Delete
    - `Model.findOneAndDelete(filter)`
    - `Model.findByIdAndDelete(id)`
    - `Model.deleteOne(filter)`
    - `Model.deleteMany(filter)`

  ### Filter 
  ```json
    {
      "key": "value",      // ~ key = "value"
      "key1": "value1"      // ~ key = "value" AND key1 = "value1"
    }

    {
      "$or": [                  // ~ (key = "value" OR key1 = "Value1")
        {"key": "value"},
        {"key1": "value1"},     
      ]
    }

    {"key": {"$op": "value"}}
    {"op": {"key": "value"}}


    {"age": {"$gt": 20}}

    // operators 
    // $or, $and, $in, $nin, $gt, $gte, $lt, $lte, $eq, $ne, $regex
  ```

### Identify data 
  - user,
    - name, email, password, role, gender, phone, address, status, image, ......
  - brand
  - category 
    - ```
      _id, 
        name, slug, parentId(null), image, descriptions, brandId, isMenuItem, pinToHome, 
      status, createdBy, updatedBy, createAt, updatedAt
    ```
  --------------------------------------------------------------
  _id         |       name            |       parentId         |   .....
  --------------------------------------------------------------
  123         | Electronics           |       null             |
  --------------------------------------------------------------
  234         | Smart Television      |       123              |
  --------------------------------------------------------------

  - API Project
    - products 
      - property 
    - orders 
    - detail 
    - transactions 
  - chat messages
  - SQL 

### MVC 
  - Model -> Db definition 
  - View -> Frontend (React)
  - Controller -> 

### 
  - Server create connect 
  - Db Create (optional)
  - Migrate the data structure (Schema) -> (optional)
    - Table Create (Optional)
  
  - Connect
  - Build model (Table)


# SQL 
  - Structrued Query Language 
  - Relational Data Structure
  - Table format 
    - Row columns

  - Database (postgres, mysql, mariadb, oracle, mssql, SQLite) 
    - provider db - AWS -> RDS, Digital Ocean -> Managed DB
      - username. password, port 
      - root, 'pssword', 5432
    - Server
      - host 
      - port 
      - user 
      - password
       `or `
      - URL
    - ORM provider => sequelize, typeorm, prisma
  - Table 

## SQL maintain 
  - Database 
  - Connection 
    - Tables -> Migrations
  - Project connections 
    - Model 
    - QUERY

  - CRUD Operation 
    - Create => 
      `INSERT INTO <table> (columnNames, ......) VALUES (value1, .......),(value1, .......)`
      `INSERT INTO <table> SET columnName1 = value1, columnName2 = value2, ..... `
    - `ModelClass.create(data) => Model Object`

    - Read 
      ```sql
        SELECT <fields> FROM <table> 
          [<inner/outer, left/right, full>JOIN <conditions>]
          [WHERE conditions]
      ```
      - xyz
      ` SELECT * FROM banners WHERE title ILIKE '%xyz%' AND status='active'`
      - `{title: {[Op.iLike]: '%zyz%'}, stauts: "active"}`
      
      - `ModelClass.find({where: filter, select: []})`
      - `ModelClass.findOne({where: filter})`

    - Update QUERY
      `UPDATE <table> SET columnName = Value1, ...., [WHERE condition]`
      - `ModelClass.update(data, {where: filter})`

    - DELETE 
      `DELETE FROM <table> [WHERE conditions]`
      - `ModelClass.destroy({where: filter})`


### API Development ()
  - REST API 
    - 5 methods 
      - POST, GET, Put/Patch, DELETE
  - GraphQL
  - SOAP 
  - gRPC


### Branch code push 
  - Server => git develop branch