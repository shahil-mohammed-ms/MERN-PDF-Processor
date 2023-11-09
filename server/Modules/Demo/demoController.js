const otherHelper = require('../../Helper/other.helper')
const demoController = {}



demoController.demoChecking = async (req,res)=>{

try {

  otherHelper.sendResponse(res)
  
} catch (error) {
  console.log(error)
}


}


module.exports = demoController
