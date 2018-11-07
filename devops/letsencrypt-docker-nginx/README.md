# Let's Encrypt docker with nginx installation and automatical renewal
----------------------------------------------------------------------

Inspired by [this article](https://www.humankode.com/ssl/how-to-set-up-free-ssl-certificates-from-lets-encrypt-using-docker-and-nginx)


## Steps:

- Copy this folder to the /docker/letsencrypt-docker-nginx folder

```
    scp letsencrypt-docker-nginx personal:/docker/
```

- Then execute nginx server for letsencrypt issuer purposes:

```
    cd /docker/letsencrypt-docker-nginx/src/letsencrypt

    docker-compose up -d
```

- Issue the certificate by running the next docker container:


```
    docker run -it --rm \
    -v /docker-volumes/etc/letsencrypt:/etc/letsencrypt \
    -v /docker-volumes/var/lib/letsencrypt:/var/lib/letsencrypt \
    -v /docker/letsencrypt-docker-nginx/src/letsencrypt/letsencrypt-site:/data/letsencrypt \
    -v "/docker-volumes/var/log/letsencrypt:/var/log/letsencrypt" \
    certbot/certbot \
    certonly --webroot \
    --email vkomodey@gmail.com --agree-tos --no-eff-email \
    --webroot-path=/data/letsencrypt \
    -d dictify-pro.com -d www.dictify-pro.com
```

- Stop the nginx server for nginx purposes

```
    cd /docker/letsencrypt-docker-nginx/src/letsencrypt

    docker-compose down

```

- Up the nginx server

```
    cd /docker/letsencrypt-docker-nginx/src/production

    docker-compose up -d
```

- Setup the crontab job for autorenewing certificates: 


```
0 23 * * * docker run --rm -it --name certbot -v "/docker-volumes/etc/letsencrypt:/etc/letsencrypt" -v "/docker-volumes/var/lib/letsencrypt:/var/lib/letsencrypt" -v "/docker-volumes/data/letsencrypt:/data/letsencrypt" -v "/docker-volumes/var/log/letsencrypt:/var/log/letsencrypt" certbot/certbot renew --webroot -w /data/letsencrypt --quiet && docker kill --signal=HUP dictify-nginx

```
