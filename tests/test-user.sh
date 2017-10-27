#!/bin/bash

mongo a2-db --eval "db.dropDatabase()"

read -p $'\nCreate a new user.'
curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "apilador",
  "firstname": "ryan",
  "lastname": "apilado",
  "sex": "M",
  "age": 23
}'

read -p $'\nCreate a second user.'
curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "apilador2",
  "firstname": "ryan",
  "lastname": "apilado",
  "sex": "M",
  "age": 23
}'

read -p $'\nCreate a third user with a bad age type.'
curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "apilador3",
  "firstname": "ryan",
  "lastname": "apilado",
  "sex": "M",
  "age": "asdfasdfa"
}'

read -p $'\nCreate a fourth user with only username.'
curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "apilador4"
}'

read -p $'\nCreate a fifth user with unknown keys in the body.'
curl -X "POST" "http://localhost:3000/user" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "apilador5",
  "career": "student"
}'

read -p $'\nGet the user with id 1.'
curl "http://localhost:3000/user?id=1"

read -p $'\nGet the user with username apilador2.'
curl "http://localhost:3000/user?username=apilador2"

read -p $'\nGet the user with username that doesn\'t exist.'
curl "http://localhost:3000/user?username=apilador9"

read -p $'\nUpdate the user with id1.'
curl -X "PUT" "http://localhost:3000/user?id=1" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "firstname": "billybob",
  "age": 999
}'

read -p $'\nUpdate the user with nonexistent id.'
curl -X "PUT" "http://localhost:3000/user?id=99" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "firstname": "billybob",
  "age": 999
}'

read -p $'\nUpdate the user with bad name type.'
curl -X "PUT" "http://localhost:3000/user?id=1" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "firstname": 22,
  "age": 999
}'

read -p $'\nUpdate the user with a username.'
curl -X "PUT" "http://localhost:3000/user?id=1" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "username": "r"
}'

read -p $'\nDelete the second user.'
curl -X "DELETE" "http://localhost:3000/user?id=2" \
     -H "Content-Type: application/json; charset=utf-8"

read -p $'\nDelete a non-existent user.'
curl -X "DELETE" "http://localhost:3000/user?id=99" \
     -H "Content-Type: application/json; charset=utf-8"