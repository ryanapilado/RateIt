#!/bin/bash

mongo a2-db --eval "db.dropDatabase()"

read -p $'\nCreate a new store.'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "storename": "myshop",
  "category": "things",
  "address": "1"
}'

read -p $'\nCreate a second store.'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "storename": "myshop2",
  "category": "other things",
  "address": "2"
}'

read -p $'\nCreate a store with bad name type.'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "storename": 3,
  "category": "other things",
  "address": "2"
}'

read -p $'\nCreate a store with no storename.'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "storename":""
}'

read -p $'\nCreate a store with no body in the request.'
curl -X "POST" "http://localhost:3000/store" \
     -H "Content-Type: application/json; charset=utf-8"

read -p $'\nGet the store with id 1.'
curl "http://localhost:3000/store?id=1"

read -p $'\nGet the a store with no query.'
curl "http://localhost:3000/store"

read -p $'\nGet the a store with no id.'
curl "http://localhost:3000/store?storename=3"

read -p $'\nGet the store with id that doesn\'t exist.'
curl "http://localhost:3000/store?id=99"

read -p $'\nUpdate the store with id1.'
curl -X "PUT" "http://localhost:3000/store?id=1" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "storename": "billybobs store",
  "category": "stuff"
}'

read -p $'\nUpdate the store with nonexistent id.'
curl -X "PUT" "http://localhost:3000/store?id=99" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "storename": "billybobs store",
  "category": "stuff"
}'

read -p $'\nDelete the second store.'
curl -X "DELETE" "http://localhost:3000/store?id=2" \
     -H "Content-Type: application/json; charset=utf-8"

read -p $'\nDelete a non-existent store.'
curl -X "DELETE" "http://localhost:3000/store?id=99" \
     -H "Content-Type: application/json; charset=utf-8"