import jwt from "jsonwebtoken";
const verifyUser = (req:any, res:any, next:any) => {
   if(!req.session.passport){
    return res.status(403).json({msg:"you are not login please login first..."});
   }
    const token:any = req.session.passport.user  
    if (!token ) {
      return res.status(403).json({msg:"A token is required for authentication"});
    }
    try {
      const decoded = jwt.verify(token, `${process.env.TOKEN_KEY}`);
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({msg:"Invalid Token"});
    }
    return next();
  };


export default verifyUser;
