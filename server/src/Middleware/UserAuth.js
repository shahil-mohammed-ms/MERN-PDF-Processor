const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


const authenticateToken = async (req,res,next)=>{

  const token = req.header('Authorization').replace('Bearer ', '');
 
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized err' });
    }
  
    
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.log('fail sellauth')
        return res.status(403).json({ message: 'Forbidden err' });
      }
     
      req.user = user;
      next();
    });


}

module.exports=authenticateToken