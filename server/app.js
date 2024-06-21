const { PythonShell } = require('python-shell')
const express = require('express')
const cors = require('cors')
var fs = require('fs');

const app = express()
app.use(cors())
// app.use(express.json())

const p = 5000
app.listen(p, () => console.log('started at: ' + p))

app.get('/', (req, res) => {
    res.send({ response: '200' });
    console.log('server check successful');
})

app.get('/Netcool/:id', (req, res) => {
    const id = req.params.id
    const filePath = 'scripts/Netcool/' + id + '.py'

    try {
        fs.statSync(filePath).isFile();
        PythonShell.run(filePath, null).then(messages => {
            console.log(`Script #${id} executed!`);
            // console.log(messages)
            res.send(messages)
        });
    } catch (err) {
        res.send(['No Script'])
        console.log('No Script Found!')
    }
})


app.get('/SCCD/:id', (req, res) => {
    const id = req.params.id
    const filePath = 'scripts/SCCD/' + id + '.py'

    try {
        fs.statSync(filePath).isFile();
        PythonShell.run(filePath, null).then(messages => {
            console.log(`Script #${id} executed!`);
            // console.log(messages)
            res.send(messages)
        });
    } catch (err) {
        res.send(['No Script'])
        console.log('No Script Found!')
    }
})