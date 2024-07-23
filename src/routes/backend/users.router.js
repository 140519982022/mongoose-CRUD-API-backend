const express = require('express')
const route = express.Router()
const userController = require('../../controllers/backend/users.controller')
module.exports=app=>{
    route.post('/add',userController.create);

    route.post('/view',userController.view);

    // route.delete('/delete/:id',userController.delete);
    route.delete('/delete',userController.delete);


    route.put('/update/:id',userController.update);



    app.use('/api/backend/users',route)
}