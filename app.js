const express = require('express');
const axios  = require('axios');
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/timer/:id/:minutes/:text?', async (req, res) => {
    
    // curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' https://hooks.slack.com/services/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
    
    await axios.post('https://hooks.slack.com/services/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', {
        text: `created timer ${req.params.id} with ${req.params.minutes} minutes` 
    })
    res.send(req.params)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))