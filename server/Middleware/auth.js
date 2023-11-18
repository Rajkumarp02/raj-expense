import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

//in this project we dont use verify token why because the acceptance criteria tells like all users can edit or delete all data. 
const auth = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization; //req from authorization header

    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' }); //!authorization means ,check missing or not
    }

    // Split authorization header to get the token at index 1
    const token = authorizationHeader.split(" ")[1];
    //just verify the token using secret key
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    //userID(decoded.id) is assigned to req.userId obj
    req.userId = decoded.id;
    //middleware call
    next();
  } catch (error) {
    res.status(404).json("Error");
    console.log(error);
  }
};



export default auth;