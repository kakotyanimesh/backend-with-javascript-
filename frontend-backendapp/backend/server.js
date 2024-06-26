

import express from 'express';

const app = express();

// app.get('/', (req, res) =>{
//     res.send('server is ready')
// })

// get a list five jokes 

// to resolve crocs error => '/api/jokes'  as port => its standard practice 


app.get('/api/jokes', (req, res) =>{
    const jokes = [
        {
            id:1,
            title: "first joke ",
            content: "my first joke"

        }, 
        {
            id: 2,
            title: "joke two",
            content : "second joke"
        },
        {
            id: 3,
            title : "3rd joke",
            content: "my third joke"
        },
        {
            id: 4,
            title : "4th joke",
            content: "my fourth joke"
        },
        {
            id:5,
            title: "5th joke ",
            content: "my 5th joke"
        },
        {
            id:6,
            title: "6th joke",
            content: "new joke"
        }
    ];
    // we write an array 
    res.send(jokes)
        
    
})

const port = process.env.PORT || 3000;
// here we are taking the value of port from dotenv file by using 
// process.env.name

app.listen(port, () =>{
    console.log(`server is ready at http://localhost:${port}`);
})