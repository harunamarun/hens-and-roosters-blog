# :chicken: :baby_chick: Hens-and-Roosters :baby_chick: :chicken:

Let's try here!   
https://hens-and-roosters.tk/   
<img src=https://user-images.githubusercontent.com/56245555/88474057-3cabf800-cf5e-11ea-998e-75ec42269503.gif>


## :rocket: Setup
I build the local environments using docker-compose :whale:.   
So you can easily run my app on your machine.   

You can start by the following command. And you can see http://localhost:8080/ :computer:<br>
`docker-compose build && docker-compose up frontend`<br>

You can run the test by the following command.<br>
`docker-compose build && docker-compose up test`<br>

## :space_invader: Tech Stack
Frontend: React   
Backend: Express / knex / cloudSQL (postgreSQL)   
Backend testing: chai / [mock-knex](https://github.com/jbrumwell/mock-knex)   
deployment: Kubernetes (GKE)   
Third-party: [Bing News Search API](https://azure.microsoft.com/ja-jp/services/cognitive-services/bing-news-search-api/) / [GIPHY](https://developers.giphy.com/) / [Auth0](https://auth0.com/jp/)

## :gift: Feature
  + `See` all blogs as the list.   
  + `Write` a new blog post with a image and post it   
  + `Edit` a blog   
  + `Delete` a blog   
  + `See` details of a blog   
  + `Get` news headline   


## :mag_right: APIs
Endpoint: `http://localhost:3000/`
### POST /api/blogs
Create a blog.   
request params   
```
{
  "name":"haruna",
  "content":"Hello World!!"
}
```

response (created blog item)   
```
{
  "id": 362,
  "name": "haruna",
  "content": "Hello World!!",
  "imageURL": "",
  "gifURL": "",
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
  "name": "haruna",
  "content": "Hello World!!",
  "imageURL": "",
  "gifURL": "",
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
  "name": "haruna",
  "content": "Hello World!!",
  "imageURL": "",
  "gifURL": "",
  "createdAt": "2020-07-06 05:31:33",
  "updatedAt": "2020-07-06 05:31:33"
}
```

### PATCH /api/blogs/:id
Update a blog-item.   
request params   
```
{
  "content":"Hi, World!!"
}
```
response (updated blog item)   
```
{
  "id": 362,
  "name": "haruna",
  "content": "Hi, World!!",
  "createdAt": "2020-07-06 05:31:33",
  "updatedAt": "2020-07-06 05:31:33"
}
```

### DELETE /api/blogs/:id

Delete a blog-item.


## :memo: DB

DB name: Hens-and-Roosters<br>
TABLE name: blogs<br>
TABLE schema:<br>

```
id :int(unique)
name :string
content :text
imageURL: text
gifURL: text
updated_at :Date
updated_at :Date
```

