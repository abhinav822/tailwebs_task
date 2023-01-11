const adminModel = require('../model/adminModel');
const studentM = require('../model/studentModel')

const createStudent = async function (req, res) {
    try {
      const data = req.body
      const register = await studentM.create(data)
  
      return res.status(201).send({status:true, message: "Student created successfully", data: register })
  
    }
    catch (err) {
      return res.status(500).send({status:false, message: err.message })
    }
  
  };

  const studentDetail = async function (req, res) {
    try {

        const name = req.query.name;
        const subject = req.query.subject;
        const query = {isDelete:false};
        if (name) {
            query.name = name;
          }
        if (subject) {
            query.subject = subject;
          }

          const filterData = await studentM.find(query)
          
      return res.status(200).send({status:true, message: "success", data: filterData })
        
    } catch (err) {
        return res.status(500).send({status:false, message: err.message })
    }
  }


  const updateStudent = async function (req, res) {
    try {
      
      const adminId=req.params.adminId
      const studentId =req.params.studentId
      const marks =req.body.marks
      if(!adminId) return res.status(400).send({status:false, message: 'Admin id required'})

      const id = await adminModel.findOne({_id:adminId})

      if(!id) return res.status(400).send({status:false, message: 'Admin id not found'})
  
      const updateData = await studentM.findOneAndUpdate({_id:studentId},{$set:{marks:marks}}, {new:true})
      let total=0
      total=total+updateData.marks
      updateData.total+=total
      await updateData.save()
      const studentDetails = {updateData}
  
      return res.status(201).send({status:true, message: "Student updated successfully", data: studentDetails })
  
    }
    catch (err) {
      return res.status(500).send({status:false, message: err.message })
    }
  
  };

  const deleteStudent = async function (req, res) {
    try {
      
      const adminId=req.params.adminId
      const studentId =req.params.studentId
      if(!adminId) return res.status(400).send({status:false, message: 'Admin id required'})

      if(!studentId) return res.status(400).send({status:false, message: 'Admin id required'})

      const id = await adminModel.findOne({_id:adminId})
      const id1 = await studentM.findOne({_id:studentId})

      if(!id) return res.status(400).send({status:false, message: 'Admin  not found'})
      if(id1.isDelete==true) return res.status(400).send({status:false, message: 'student  not found or removed'})
  
      const deleteRecord = await studentM.findOneAndUpdate({_id:studentId},{isDelete:true}, {new:true})
      
      return res.status(201).send({status:true, message: "Student Removed successfully", data: deleteRecord })
  
    }
    catch (err) {
      return res.status(500).send({status:false, message: err.message })
    }
  
  };




  module.exports = { createStudent, studentDetail, updateStudent, deleteStudent }

