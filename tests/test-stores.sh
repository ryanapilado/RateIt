#!/bin/bash

mongo a2-db --eval "db.dropDatabase()"

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

read -p $'\nGet all stores.'
curl "http://localhost:3000/stores"

read -p $'\nGet stores with storename myshop3.'
curl "http://localhost:3000/stores?storename=myshop3"

read -p $'\nGet stores with category things.'
curl "http://localhost:3000/stores?category=things"

read -p $'\nGet stores with category things and storename myshop1.'
curl "http://localhost:3000/stores?category=things&storename=myshop1"