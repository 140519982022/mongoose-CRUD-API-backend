const express = require('express')
const mongoose = require('mongoose');
const server = express()

server.use(express.json());
server.use(express.urlencoded({extended:true}))

server.get('/',(request,response)=>{
    console.log("server working fine!!!!");
    response.send("server working fine")
})

// include route file
require('./src/routes/backend/users.router')(server)

server.get('*',(request,response)=>{
    console.log("Page Not Found!!!!");
    response.send("Page Not Found")
})

// database connection status
mongoose.connect('mongodb://127.0.0.1:27017/mongoose_practice')
  .then(() => {

    server.listen('1000', ()=>{
        console.log("DataBase connected successfully!!!!")
    })
  })
  .catch((error)=>{
    console.log("database connection faild!!!! " + error)
});


// //   create schema
// server.get('/', async(request,response)=>{
//     const schema = new mongoose.Schema(
//         {
//             fname:String,
//             lname:String

//         }
//     );

//     // call model to exicute that schema code
//     const userModel = new mongoose.model('users',schema);

//     let data=new userModel(
//         {
//             fname:'nandini',
//             lname:'bhati',
//             category:"OBC"
//         }
//     )

//     let result = await data.save();
//     response.send(result);
// })

