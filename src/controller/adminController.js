const adminModel = require('../model/adminModel')
const jwt = require('jsonwebtoken')


const createAdmin = async function (req, res) {
    try {
      const data = req.body
      const register = await adminModel.create(data)
  
      return res.status(201).send({status:true, message: "Admin created successfully", data: register })
  
    }
    catch (err) {
      return res.status(500).send({status:false, message: err.message })
    }
  
  };


//------------userLogin----------------------
const loginAdim = async function (req, res) {
    try {
      const {email,password} = req.body
  
  
      if (!email) {
        return res
          .status(400)
          .send({ status: false, message: "please provide an Email !" });
      }
  
      if (!password) {
        return res
          .status(400)
          .send({ status: false, message: "please enter password !" });
      }
  
      let adminData = await adminModel.findOne({ emailId: email })  // this line means find the user with the email id  
  
      if (!adminData) {
        return res.status(400).send({ status: false, message: "EmailId or Password is not corerct" })
      } 
  
  
      let token = jwt.sign(
        {
          adminId: adminData._id.toString(),
          organisation: "tailwebs",
        },
        "tailwebs-project",
        { expiresIn: "2h" }
      );
      let Token = {
        adminId: adminData._id.toString(),
        token: token
       }
      res.setHeader("Authorization", token);
      res.status(200).send({ status: true, message: "Success", data: Token });
    } 
    catch (err) {
     return res.status(500).send({ message: "server error", error: err.message });
    }
  }




  module.exports = { createAdmin, loginAdim }