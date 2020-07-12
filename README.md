# Hens-and-Roosters

You can try here!   
https://hens-and-roosters.tk/   
:baby_chick: :chicken: :baby_chick: :chicken: :baby_chick: :chicken: :baby_chick: :chicken: :baby_chick::baby_chick: :chicken: :baby_chick: :chicken: :baby_chick: :chicken: :baby_chick: :chicken: :baby_chick:   

## Setup
I build the local environments using docker-compose.
So you can easily run my app on your machine.

You can start by the following command. And you can see http://localhost:8080/<br>
`docker-compose build && docker-compose up frontend`<br>

You can run the test by the following command.<br>
`docker-compose build && docker-compose up test`<br>

## Implemation
+ Create Endpoint   
+ Store data   
  + Using GCP Cloud SQL (PostgreSQL)   
+ Provide authentication for my blog system   
  + Using Auth0   
+ Ensure your code is properly tested   
  + unit-test: using mock database [mock-knex](https://github.com/jbrumwell/mock-knex)
  + integration-test: using real database  
  + e2e-test: test the REST APIs   
+ Deploy my app on Kubernetes 
  + I used GKE.
  + All the manifest files are [here](https://github.com/mercari-build/HomeWork/tree/master/Week6/HarunaUtsumi/kubernetes)
  + I register the domain name using Freenom.
  + Configured certificate. So that users can access via https.



## APIs
Endpoint: `https://hens-and-roosters.tk/api/blogs`
### POST /api/blogs

Create a blog.

request params

```
{
  "name":"mercari",
  "content":"Go Bold, All for One, Be a Pro"
}
```

response (created blog item)

```
{
  "id": 362,
  "name": "mercari",
  "content": "Go Bold, All for One, Be a Pro",
  "createdAt": "2020-07-06 05:31:33",
  "updatedAt": "2020-07-06 05:31:33"
}
```

### GET /api/blogs

Return blog list.


response (list of blog item)

```
[{
  "id": 362,
  "name": "mercari",
  "content": "Go Bold, All for One, Be a Pro",
  "createdAt": "2020-07-06 05:31:33",
  "updatedAt": "2020-07-06 05:31:33"
},
{....}
]
```

### GET /api/blogs/:id

Return a blog-item with the given id.

response

```
{
  "id": 362,
  "name": "mercari",
  "content": "Go Bold, All for One, Be a Pro",
  "createdAt": "2020-07-06 05:31:33",
  "updatedAt": "2020-07-06 05:31:33"
}
```

### PATCH /api/blogs/:id

Update a blog-item.

request params

```
{
  "content":"mercari app"
}
```

response (updated blog item)

```
{
  "id": 362,
  "name": "mercari",
  "content": "mercari app",
  "createdAt": "2020-07-06 05:31:33",
  "updatedAt": "2020-07-06 05:31:33"
}
```

### DELETE /api/blogs/:id

Delete a blog-item.


## DB

DB name: Hens-and-Roosters<br>
TABLE name: blogs<br>
TABLE schema:<br>

```
id :int(unique)
name :string
content :text
updated_at :Date
updated_at :Date
```

