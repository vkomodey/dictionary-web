source env.sh

cd server/

echo "Build dictify-api"

docker build -t vkomodey/dictify-api .

echo "Publishing dictify-api"

docker push vkomodey/dictify-api

echo "Running the container in destination server"

ssh -T -o "StrictHostKeyChecking no" personal << EOF

docker stop dictify-api
docker rm dictify-api
docker rmi vkomodey/dictify-api

docker run --name dictify-api -d --restart=unless-stopped -p 3000:3000 -e MONGODB_URL=$MONGODB_URL vkomodey/dictify-api

EOF
