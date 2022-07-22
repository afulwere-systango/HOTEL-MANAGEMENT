import jwt from "jsonwebtoken";
const verifyUser = (req:any, res:any, next:any) => {
   if(!req.session.passport){
    return res.status(403).send("first login...");
   }
    const token:any = req.session.passport.user  
    if (!token ) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, `${process.env.TOKEN_KEY}`);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };


export default verifyUser;
