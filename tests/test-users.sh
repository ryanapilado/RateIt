mongo a2-db --eval "db.dropDatabase()"

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

read -p $'\nGet all users.'
curl -X "GET" "http://localhost:3000/users" \
     -H "Content-Type: application/json; charset=utf-8" \

read -p $'\nFind a user by first name.'
curl -X "GET" "http://localhost:3000/users?firstname=boaty" \
     -H "Content-Type: application/json; charset=utf-8" \

read -p $'\nFind a user by first name and sex.'
curl -X "GET" "http://localhost:3000/users?firstname=ryan&sex=M" \
     -H "Content-Type: application/json; charset=utf-8" \

     read -p $'\nFind users aged 23.'
curl -X "GET" "http://localhost:3000/users?age=23" \
     -H "Content-Type: application/json; charset=utf-8" \