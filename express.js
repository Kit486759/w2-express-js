const express = require('express');
const app = express();
const port = 1997

const os = require('os')
const checkDiskSpace = require('check-disk-space').default

let diskInfo;
checkDiskSpace(`C:/`).then((diskSpace) => {
    diskInfo = diskSpace
})

const checkIp = () => {
    // console.log(os.networkInterfaces())
    const ipObject = os.networkInterfaces()
    for (const name of Object.keys(ipObject)) {
        if (name !== 'Wi-Fi') {
            for (const net of ipObject[name]) {
                if (net.family === 'IPv4' && !net.internal) {
                   return net.address
                }
            }
        }
    }
}


app.get('/', (req, res) => {
    const url = (`${req.protocol}://${req.get('host')}${req.originalUrl}`)

    res.send(`
    <h1>Home Page</h1>
    <ul>
    <li> <a href="/api/arch">${url}/api/arch</a></li>
    <li style="list-style:none"> <p>Show architecture</p></li>
    <li> <a href="/api/cpus">${url}/api/cpus</a></li>
    <li style="list-style:none"> <p>Show cpus</p></li>
    <li> <a href="/api/ram">${url}/api/ram</a></li>
    <li style="list-style:none"> <p>Show ram</p></li>
    <li> <a href="/api/diskspace">${url}/api/diskspace</a></li>
    <li style="list-style:none"> <p>Show disk space</p></li>
    <li> <a href="/api/hostname">${url}/api/hostname</a></li>
    <li style="list-style:none"> <p>Show hostname</p></li>
    <li> <a href="/api/ipaddress">${url}/api/ipaddress</a></li>
    <li style="list-style:none"> <p>Show ip address</p></li>
    </ul>
    `)
})


app.get('/api/arch', (req, res) => {
    res.send(`
    <h1>architecture</h1>
    <p>${os.arch()}</p>
    <div><a href="/">Back to home</a></div>
    `)
})
app.get('/api/cpus', (req, res) => {
    res.send(`
    <h1>cpus</h1>
    <p>${os.cpus()[0].model}</p>
    <p>${os.cpus().length}: Cores</p>
    <div><a href="/">Back to home</a></div>
    `)
})
app.get('/api/ram', (req, res) => {
    res.send(`
    <h1>ram</h1>
    <p>${Math.round(os.totalmem() / 1024 / 1024)} Mb</p>
    <div><a href="/">Back to home</a></div>
    `)
})
app.get('/api/diskspace', (req, res) => {
    res.send(`
    <h1>diskspace</h1>
    <p>Disk: ${diskInfo.diskPath}</p>
        <p>Free: ${diskInfo.free}</p>
        <p>Size: ${diskInfo.size}</p>
    <div><a href="/">Back to home</a></div>
    `)
})
app.get('/api/hostname', (req, res) => {
    res.send(`
    <h1>hostname</h1>
    <p>Host name: ${os.hostname()}</p>
    <div><a href="/">Back to home</a></div>
    `)
})
app.get('/api/ipaddress', (req, res) => {
    checkIp()
    console.log()
    res.send(`
    <h1>ip address</h1>
    <p>${checkIp()}</p>
    <div><a href="/">Back to home</a></div>
    `)
})


app.listen(port)

// http://localhost:port/api/arch               
// ----> shows architecture
// http://localhost:port/api/cpus             
//  ----> shows cpus
// http://localhost:port/api/ram           
// ----> shows ram
// http://localhost:port/api/diskspace       
// ----> shows disk space
// http://localhost:port/api/hostname   
// ----> shows hostname
// http://localhost:port/api/ipaddress       
//  ----> shows ip address


// const createList = () => {
//     fs.writeFile('./files/text.txt', 'hello world!', function (err) {
//         if (err) throw err;
//         console.log(`file created`)
//     })

// }