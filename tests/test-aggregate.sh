#!/bin/bash

mongo a2-db --eval "db.dropDatabase()"

read -p $'\nGet aggregate store data.'
curl "http://localhost:3000/aggregate/stores"

read -p $'\nCreate 5 new stores.'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "storename": "myshop1",
  "category": "things",
  "address": "1"
}'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "storename": "myshop2",
  "category": "other",
  "address": "2"
}'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "storename": "myshop3",
  "category": "stuff",
  "address": "1"
}'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "storename": "myshop4",
  "category": "knicknacks",
  "address": "1"
}'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "storename": "myshop5",
  "category": "things",
  "address": "5"
}'

read -p $'\nCreate 5 new users.'
curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "apilador",
  "firstname": "ryan",
  "lastname": "apilado",
  "sex": "M",
  "age": 23
}'

curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "asdfa",
  "firstname": "sarah",
  "lastname": "lol",
  "sex": "F",
  "age": 19
}'

curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "623546t2345d",
  "firstname": "kibby",
  "lastname": "mcdribbles",
  "sex": "M",
  "age": 99
}'

curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "123-49081-2304",
  "firstname": "blubbz",
  "lastname": "davidson",
  "sex": "M",
  "age": 23
}'

curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "mjceoigj5tsg",
  "firstname": "boaty",
  "lastname": "mcboatface",
  "sex": "B",
  "age": 1
}'

read -p $'\nCreate a new review.'
curl -X "POST" "http://localhost:3000/review" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "userID": "1",
  "storeID": "1",
  "rating": 4
}'

read -p $'\nCreate same review again.'
curl -X "POST" "http://localhost:3000/review" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "userID": "2",
  "storeID": "1",
  "rating": 10
}'

read -p $'\nCreate review with a comment.'
curl -X "POST" "http://localhost:3000/review" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "userID": "3",
  "storeID": "3",
  "rating": 5,
  "comment": "pretty chill tbh"
}'

read -p $'\nCreate another review.'
curl -X "POST" "http://localhost:3000/review" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "userID": "5",
  "storeID": "3",
  "rating": 8,
  "comment": "fam"
}'

read -p $'\nGet aggregate store data.'
curl "http://localhost:3000/aggregate/stores"


exit



