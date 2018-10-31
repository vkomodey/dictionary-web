cd server/
echo "Pushing:"
heroku container:push web --remote vkomodey-dict-api
echo "Releasing:"
heroku container:release web --remote vkomodey-dict-api
