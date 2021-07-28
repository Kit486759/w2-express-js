const express = require('express');
const app = express();
const port = 1997

const os = require('os')
const fs = require('fs')

const createList = () => {
    fs.writeFile('./files/text.txt', 'hello world!', function (err) {
        if (err) throw err;
        console.log(`file created`)
    })
    console.log(`file created`)
}


app.get('/', (req, res) => {
    res.send(`
    <h1>Home Page</h1>
    <ul>
    <li> <a href="/server-status">Checkout server os information</a></li>
    <li> <a href="/file-system">Checkout file system</a></li>
    </ul>
    `)

})

app.get('/server-status', (req, res) => {
    res.send(`
    <h1>Server status - ${os.hostname()} </h1><span>(Your_domin${req.url})</span>
    <p>Operation system: <b>Windows version ${os.release()} ${os.platform()} ${os.arch()}</b></p>
    <p>CPU core(s): <b>${os.cpus().length}</b></p>
    <p>Free/ Total memory: <b>${Math.round(os.freemem() / 1024 / 1024)}/${Math.round(os.totalmem() / 1024 / 1024)}(Mb)</b></p>
    <div><a href="/">Back to home</a></div>
    `)
})

app.get('/file-system', (req, res) => {
    res.send(`
    <h1>File system</h1><span>(Your_domin${req.url})</span>
    <button onclick=${createList()}>create txt</button>
    <div><a href="/">Back to home</a></div>
    `)
})



// console.log(os.endianness())
// console.log(Math.round(os.freemem()/1024/1024))
console.log(os.userInfo())




app.listen(port)