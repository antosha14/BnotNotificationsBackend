import express from 'express'
import BodyParser from 'body-parser'
import ServerlessHttp from 'serverless-http'

const app = express()

const jsonParser = BodyParser.json()

app.post('./netlify/functions/inform', jsonParser, async (req, res)=>{
    const token = String(req.body.token)
    const link = String(req.body.link)
    const regnum = String(req.body.reqnum)
    const queueName = String(req.body.queueName)

    const response = await fetch(link);
    const data = await response.json();

    const newPosition = data[queueName].findIndex((trip) => {
        return trip.regnum === regnum;
    }) + 1;
    
    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: token,
          sound: 'default',
          body: `Your current position is ${newPosition}`,
        }),
      });
})

const handler = ServerlessHttp(app)
module.exports.handler = async (event, context) => {
    const result = await handler(event, context)
    return result
}