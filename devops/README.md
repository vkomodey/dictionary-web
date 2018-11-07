
- Install the docker and docker-compose

- Create a new network for all containers:

```
docker create network dictify-network
```

- Setup nginx by following instructions from the letsencrypt-docker-nginx

- Deploy server(bash ./devops/client/deploy.sh)

- Deploy client(bash ./devops/server/deploy.sh)
