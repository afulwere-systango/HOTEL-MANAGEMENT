import jwt from "jsonwebtoken";

const getUserID = (bearerData: any) => {

  const bearer = bearerData.split(' ');
  const token = bearer[1]
  const decoded: any = jwt.verify(token, `${process.env.TOKEN_KEY}`);
  const userID = decoded.user_id;
  return userID;
}


const verifyUser = (req: any, res: any, next: any) => {
  console.log('1111');

  const bearerData = req.headers['authorization'];
  if (!bearerData) {
    return res.status(403).json({ msg: "you are not login please login first..." });
  }
  const bearer = bearerData.split(' ');
  const token = bearer[1]
  if (!token) {
    return res.status(403).json({ msg: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, `${process.env.TOKEN_KEY}`);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ msg: "Invalid Token" });
  }
  return next();
};


export { verifyUser,getUserID };


// 503353417663-8igaceoalk9n23gsohv3chjih06viick.apps.googleusercontent.com
//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