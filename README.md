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
```yarn``` (install deps)

```yarn start``` (starts webpack hot-reloading dev server)

```yarn build``` (prod build)

### Required Environment Variables:
Make sure the following environment variables are properly sourced in dev mode:

```
REACT_APP_CurrentUser=russell
REACT_APP_ClientId=russell
```

### Optional Environment Variables:
```
REACT_APP_ProgramId=<ProgramId>
REACT_APP_Symbols=<Symbols>
REACT_APP_ClientId=<ClientId>
REACT_APP_Route=<Route>
```

Example:
```
REACT_APP_CurrentUser=russell REACT_APP_ClientId=russell  REACT_APP_ProgramId='bctui.someuser.12345' REACT_APP_Symbols='BTC-USD' yarn start
```

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
