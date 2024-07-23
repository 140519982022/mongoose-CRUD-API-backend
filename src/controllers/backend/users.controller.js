const userModel = require('../../models/user')

exports.create = async(request,response)=>{
    console.log(request.body)
    const data = new userModel({
        first_name:request.body.fname,
        last_name:request.body.lname,
        image:request.body.image,
        age:request.body.age,
        status:request.body.status,
        created_at:Date.now(),
        updated_at:Date.now(),
        deleted_at:''
    })

    var output = await data.save()
    .then((success)=>{
        var result = {
            status:true,
            message:"New Record Inserted Successfully!!!",
            data:output
        }

        response.send(result)
    })
    .catch((error)=>{
        var error_message = [];
        for(let index in error.errors){
            error_message.push(error.errors[index].message);
        }

        var result = {
            status:false,
            message:"Record can not be saved, please try gain later",
            error_message:error_message
        }

        response.send(result)

    })
}

exports.view = async(request,response)=>{
    try {


            // collect all records from db
        // var  userData = await userModel.find(
        //     {
        //         _id : request.query.id
        //     }
          
        // )

        // response.send(userData)

            // fetch all record after some soft deleted
        // var userData = await userModel.find(
        //     {
        //     deleted_at : null,
                
        //     }
        // )
        
        
            // AND CONDITIONS
            // and or condition wise data fetching action
        // const condition = {
        //     deleted_at : null,
        // }
        
        // if (request.body.status != '') {
        //     condition.status = request.body.status;
        // }

        // if (request.body.name != '') {
        //         // find record by name ND STATUS COMPARING
        //     // condition.first_name = request.body.name;

        //         // COLLECT THOSE RECORD WHO STARTS FROM S LETTER and status 0
        //     // condition.first_name = new RegExp("^" + request.body.name);

        //         // search at any position n LETTER and status 0
        //     condition.first_name = new RegExp(request.body.name,"i");

        
        // }
        // var userResult = await userModel.find(condition)

            //OR CONDITION

        // const condition = [
        //     {
        //     deleted_at : null
        //     }
        // ];

        // if (request.body.status != '') {
        //     condition.push(
        //         {status : request.body.status}
        //     )
        // }


        // if (condition.length > 0) {
        //     var userData = { $or : condition}
            
        // }else{
        //     var userData = {}
        // }

        // var userResult = await userModel.find(userData)

            // AND and OR condition at a time

        // and condition 
        const andCondition = [
            { deleted_at:null}
        ]

        // console.log(andCondition)
        if(andCondition.length > 0){
            var filter = { $and:andCondition }
        }else{
            var filter = {}
        }

        //or conditon
        const orConditon = [];

        // for name filterout record
        if (request.body.name != undefined) {
            
            if (request.body.name != '') {
                // console.log("not empty")
                orConditon.push(
                    {
                        first_name : new RegExp(request.body.name , "i") 
                    }
                )
                
            }
            
        }

        // console.log(orConditon)
        // for status filterout record

        if (request.body.status != undefined) {
            if (request.body.status != '') {

                orConditon.push(
                    {status : request.body.status}
                )
                
            }
            
        }
        // console.log(orConditon)

        // combine AND and OR condition into filter variable where already present AND condition
        if (orConditon.length > 0) {
            filter.$or = orConditon
            
        }

        console.log(filter)

        var userResult = await userModel.find(filter)

        if (userResult.length != 0) {
            var userData = { $or: userResult}
            
        }else{
            var userData = {}
        }


        response.send(userData)


        
    } catch (error) {
        var result = {
            status:false,
            message:"somthing went wrong",
            error_message:error
        }

        response.send(result)
        
    }
}

exports.delete = async(request,response)=>{

    // hard delete->delete from db alse
    // await userModel.findByIdAndDelete(request.params.id) //url change

    // await userModel.deleteOne( {_id : request.params.id})


    // soft delete -> can not delete from db
    await userModel.updateOne(
        {
            // ehich recore wanna update -> this is a condition
            _id : request.query.id

        },
        {
            $set : {
                deleted_at : Date.now()
            }
        }

    )

    .then(()=>{
        var resp={
            status:true,
            message:"record deleted successfully!!!!"           
        }

        response.send(resp)
    })
        
   .catch ((error)=> {

        var resp = {
            status:false,
            message:"somthing went wrong",
            error_message:error
        }

        response.send(resp)
        
    })
}

exports.update = async (request, response) => {
    try {
        
        const updatedData = {
            first_name: request.body.fname,
            last_name: request.body.lname,
            image: request.body.image,
            age: request.body.age,
            status: request.body.status,
            updated_at: Date.now()
        };

        const updatedRecord = await userModel.findByIdAndUpdate(request.params.id, updatedData, { new: true });

        if (updatedRecord) {
            var resp = {
                status: true,
                message: "Record updated successfully!!!",
                data: updatedRecord
            };
        } else {
            var resp = {
                status: false,
                message: "Record not found!!!"
            };
        }

        response.send(resp)

    } catch (error) {
        var resp = {
            status: false,
            message: "Something went wrong!!!!!!!",
            error_message: error.message
        };

        response.send(resp);
    }
};
