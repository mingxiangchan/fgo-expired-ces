## Getting Started

First, setup the project

```bash
yarn
```

Next, parse the Atlas Academy Data. All images will be downloaded to the local folder so user's of this site won't impose additional load on Atlas Academy servers.


```bash
yarn parse
```

Finally, run the development server to display things properly

```bash
yarn dev
```

## Deployment

Deployed on Netlify, just run the command below and upload the zipfile. Done manually so the 50MB of Atlas Academy images are not hosted in this repository directly.

```bash
yarn export
```
