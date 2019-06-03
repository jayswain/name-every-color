# Name every color

Initially built because I just really wanted to know the name of that color, and I was tired of checking.

Couldn't have done it without all the hard work of [Chirag Mehta](http://chir.ag/projects/name-that-color).

## Whats it do?

This is the code responsible for [@colornamebot](https://twitter.com/colornamebot). The Purpose is just to follow [@everycolorbot](https://twitter.com/everycolorbot) and reply to their tweets with the name of the color.

## Deploying

Deploying is manual, rsync files to the server, ssh in and run yarn install.

```
rsync -avz --exclude-from '.rsyncignore' ./ bitnami@name-every-color:/home/bitnami/stack/apps/name-every-color

ssh bitnami@name-every-color
cd stack/apps/name-every-color/
yarn install
```
