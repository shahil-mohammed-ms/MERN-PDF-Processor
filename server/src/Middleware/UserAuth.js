// const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = process.env;


// const authenticateToken = async (req,res,next)=>{

//   const token = req.header('Authorization').replace('Bearer ', '');
 
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized err' });
//     }
  
    
  
//     jwt.verify(token, JWT_SECRET, (err, user) => {
//       if (err) {
//         console.log('fail sellauth')
//         return res.status(403).json({ message: 'Forbidden err' });
//       }
     
//       req.user = user;
//       next();
//     });


// }

// module.exports=authenticateToken
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
console.log(JWT_SECRET);

const authenticateToken = async (req, res, next) => {
  const tokenHeader = req.header('Authorization');

  console.log('req.headers:', req.headers);
  console.log('token header:', tokenHeader);

  if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized err' });
  }

  const token = tokenHeader.replace('Bearer ', '');
  console.log('token', token);


  jwt.verify(token, JWT_SECRET, (err, decoded) => { 
    if (err) {
        if (err.name === 'TokenExpiredError') {
            console.log('Token expired');
            return res.status(401).json({ message: 'Token expired' });
        } else {
            console.log('fail sellauth');
            return res.status(403).json({ message: 'Forbidden err' });
        }
    }

    req.user = decoded;
    next();
});

};

module.exports = authenticateToken;

