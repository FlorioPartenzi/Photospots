# Documentation

## Api Endpoints

user = {name: String, email: String}

userInfo = {name:String, email: String, createdAt:ISODate, placeIDs:[Strings], (places:[])}

location = {
id : String,
title : String,
description: String,
user: name,
imgUrl : String,
housenumber: String,
street : String,
city : String,
postcode : String,
country : String,
lon : Float,
lat: Float
}

- post/register
  
  - user
  
  - { msg: 'user already in use' }

- post /login
  
  - user
  
  - { msg: 'wrong credentials' }
  
  - { msg: 'failed to log in' }

- get /profile
  
  - user
  
  - { msg: 'wrong credentials' }
  
  - { msg: 'failed to load user information' }

- get/profile/:id'
  
  - user
  
  - { msg: 'wrong credentials' }
  
  - { msg: 'failed to load user information' }

- post /newPlace
  
  - location

- get /places/:lng/:lat
  
  - location[]

- get /placesByUser
  
  - location[]

- get /findPlacesbySearch/:searchterm
  
  - location [] (length == 8)

- get /findPlacesbyDistance/:lng/:lat
  
  - location[] (length == 8)

- put /pinned
  
  - {id: String, email: String, name: String, placeIDs: String[] }
  
  - { msg: 'failed to update user information' }

- get /pinned
  
  - location[]
