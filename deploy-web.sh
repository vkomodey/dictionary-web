cd client/
echo "Pushing:"
heroku container:push web --remote web
echo "Releasing:"
heroku container:release web --remote web
