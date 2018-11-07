DIR=`dirname $0`
ENV_SCRIPT="$DIR/env.sh"
source $ENV_SCRIPT

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

docker run \
    --name dictify-api \
    --restart=unless-stopped \
    -e MONGODB_URL=$MONGODB_URL \
    --network="dictify-network" \
    -d \
    vkomodey/dictify-api

EOF
