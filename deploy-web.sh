source env.sh

cd client/

echo "Build dictify-web"

docker build -t vkomodey/dictify-web .

echo "Publishing dictify-web"

docker push vkomodey/dictify-web

echo "Running the container in destination server"

ssh -T -o "StrictHostKeyChecking no" personal << EOF

docker stop dictify-web
docker rm dictify-web
docker rmi vkomodey/dictify-web

docker run --name dictify-web -d --restart=unless-stopped -e API_URL="http://dictify-pro.com:3000" -p 80:3001 vkomodey/dictify-web

EOF
