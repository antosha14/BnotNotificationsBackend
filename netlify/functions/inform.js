exports.handler = async (req) => {
  try {    
    const token = String(req.queryStringParameters.token)
    const regnum = String(req.queryStringParameters.regnum)
    const link = String(req.queryStringParameters.link)
    const queueName = String(req.queryStringParameters.queueName)
    const notifyPosition = Number(req.queryStringParameters.notifyPosition)

    const response = await fetch(link);
    const data = await response.json();

    const newPosition = data[queueName].findIndex((trip) => {
        return trip.regnum === regnum;
    }) + 1;
    
    if(newPosition <= notifyPosition){
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: token,
          sound: 'default',
          priority: 'high',
          body: `Your current position is ${newPosition}`,
        }),
    });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `New position: ${newPosition}` }),
    };
  } catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
};