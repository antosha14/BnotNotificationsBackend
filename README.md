# It is a simple function to throw push notification to expo app, when it is user’s turn to go through customs control

### In order to correctly deploy this function to Netlify you should have this packages installed:

```
npm i serverless-http netlify-cli netlify-lambda
npm install -g netlify-cli
```

### Then you should be logged in to Netlify:

```
netlify login
```

### And finally use this command to deploy the function:

```
netlify deploy --prod
```