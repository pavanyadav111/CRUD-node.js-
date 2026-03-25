const express = require('express')
const router = express.Router()
const Person = require('../models/Person')


// post method
router.post('/',async(req,res)=>{
  try{
    const data = req.body //Assuming the requesst body contains the person data
    // Create a new person document using the mongoose model
    const newPerson = new Person(data)
    // Save a new person to the database 
    const response = await newPerson.save()
    console.log('data saved')
    res.status(200).json(response)
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internet server error'})
    
  }
})


//Get method to get the person 
router.get('/',async(req,res)=>{
  try{
      const data = await Person.find()
    console.log('data fetched')
    res.status(200).json(data)
  }
  catch(err){
        console.log(err);
    res.status(500).json({error:'Internet server error'})
  }
})




// Extract the work type from the work URL parameter 
router.get('/:workType',async(req,res)=>{

  try{
        const workType = req.params.workType;
if(workType == 'chef'|| workType =='manager' || workType =='waiter'){

    const response = await Person.find({work: workType})
    console.log('response fetched')
    res.status(200).json(response)

}
else{
  res.status(404).json({error:' Invalid work type'})
}
  }
  catch(err){
    console.log(err)
    res.status(500).json({error:'Internet server error'})

  }
})

// update method 
router.put('/:id',async(req,res)=>{
  try{
        const personId = req.params.id;  // extract id from url parameter
        const updatedPersonData = req.body // updated data for the person

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
          new: true ,  //return the updated documents
          runValidators:true
        })

        if(!response){
          return res.status(404).json({error: 'Person not found'})
        }
          console.log('data updated')
          res.sendStatus(200).json(response)
  }
  catch(err){
    console.log(err)
    res.status(500).json({error:'Data not Updated'})

  }
})


// Delete method 

router.delete('/:id',async(req,res)=>{
  try{
      const personId = req.params.id

      // assume a person model 
      const response = await Person.findByIdAndDelete(PersonId)
      
      if(!response){
        return res.status(404).json({error: 'person not found '})
      }
  }
  catch(err){
    console.log(err)
    res.status(500).json({error:'Person deleted successfully '})

  }
})


module.exports = router