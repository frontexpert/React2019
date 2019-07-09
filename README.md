## Blockchain Terminal UI

# Tech:

## Project:

- yarn
- webpack
- jest
- eslint
- aws s3

## App:

- react
- mobx
- styled-components
- material-ui
- recompose
- bct-ui-satori

# Basic Dev Setup:

## Prerequisites:

- docker (tested with 18.09.1)
- docker-compose ~> 1.23

Put dev.bct.trade entry into `/etc/hosts`, the result should be similar to:

```sh
$ cat /etc/hosts
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost
255.255.255.255	broadcasthost
::1             localhost
127.0.0.1	dev.bct.trade
```

Then just run `./dev.sh` script. It will ensure that self-signed certificate for `dev.bct.trade` domain generated, than will run `nodejs sdk` for the project and `nginx` for terminate tls-traffic using certificate.

Starting could take time, because it checks if all `npm` present in the `.cache` and installed correctly, then builds the whole site.

When it finished - you can see the message in the terminal:

```
bct-development                      | Starting the development server...
bct-development                      |
bct-development                      | Compiled successfully!
bct-development                      |
bct-development                      | You can now view blockchain-terminal-ui in the browser.
bct-development                      |
bct-development                      |   Local:            http://localhost:80/
bct-development                      |   On Your Network:  http://172.18.0.2:80/
bct-development                      |
bct-development                      | Note that the development build is not optimized.
bct-development                      | To create a production build, use yarn build.
```

When you open https://dev.bct.trade/ in your browser - it will notify you, that the certificate is self-signed and authority could be checked - just add exception.

# Contributing

We use gitflow (https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

How it works:

- All work is done on `feature` branches that are branched off `develop`.
- `feature` branches are merged back into `develop`.
- `feature` branches must be reviewed/approved before they are merged.
- `feature` branches must be frequently rebased on to remote `develop` branch (hard requirement). You will need to do a `git push --force` after a rebase since your history will have diverged.

Tips:

- Make sure your local `develop` branch is in sync with remote `develop` before creating your feature branch.
- Features are developed in parallel. Anytime a feature is merged to `develop` all other `feature` branch owners should rebase ASAP (to minimize conflicts).
- On your `feature` branch use `git pull --rebase origin develop` to rebase onto latest remote `develop`.
- Don't assume that resolved conflicts means the code works. Run the code and check the console before submitting your rebased branch for review.
