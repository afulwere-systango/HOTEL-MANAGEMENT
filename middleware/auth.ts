import jwt, { decode, TokenExpiredError } from "jsonwebtoken";
import { USERS } from '../models/userModel';
import { OAuth2Client } from "google-auth-library"

const client = new OAuth2Client(process.env.CLIENT_ID);
const googleToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZkYTEwNjY0NTNkYzlkYzNkZDkzM2E0MWVhNTdkYTNlZjI0MmIwZjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1MDMzNTM0MTc2NjMtOGlnYWNlb2FsazluMjNnc29odjNjaGppaDA2dmlpY2suYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1MDMzNTM0MTc2NjMtOGlnYWNlb2FsazluMjNnc29odjNjaGppaDA2dmlpY2suYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQ0ODM4NDUwMjY3NzczNTI5OTMiLCJoZCI6InN5c3RhbmdvLmNvbSIsImVtYWlsIjoiYWZ1bHdlcmVAc3lzdGFuZ28uY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJUSHFJdnVlZzdjTTZpbDFteU1lck53IiwibmFtZSI6IkFudGltIEZ1bHdlcmUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUl0YnZtbWMwbHJJNVBMREJ0bE9vd3RBeWFxWHRuU0puYjlPZlhlTTYwa3U9czk2LWMiLCJnaXZlbl9uYW1lIjoiQW50aW0iLCJmYW1pbHlfbmFtZSI6IkZ1bHdlcmUiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTY2MDA1MTkyNSwiZXhwIjoxNjYwMDU1NTI1fQ.C77uxjC1lXs78zOmDUkD3KgzGgzOH4S51ZDqQqCWFpcwHnGdyfcinGVemb2I95TOqvX6X0kVG9lNrpwaqLMp1UXgyH5AgEZEuBqVYUDZQGi1U4cF1UglHcuGREgZh40460fvcai-e-z57wzwOXofDyoVwCE5WmrNQdedcI-bN0WxUcgeQrcdOVsv3Ql4HIRS8ZeleYNNlB-MeSfRBveWKqdd5qJOH335X5fckS_tHZLokoJYrfVRtG9NHiCV9blaly0dKiP7e7AhClPCxHf6yatiukaLLf3EwXtOfaNXG3FuQ8_LjLClmyF_B0oBEqndrK_lq95tVfGDJScCuZ131Q";

const getUserID = (bearerData: any) => {

  const bearer = bearerData.split(' ');
  const token = bearer[1]
  const decoded: any = jwt.verify(token, `${process.env.TOKEN_KEY}`);
  const userID = decoded.user_id;
  return userID;
}


const googleVerifyUser = async (req: any, res: any, next: any) => {
  try{
  const ticket: any = await client.verifyIdToken({
    idToken: googleToken,
    audience: process.env.CLIENT_ID
  }).catch(() => {
    return res.status(403).json({ msg: "wrong token" });
  })

  const userEmailData: any = ticket.getPayload();
  const googleId: any = userEmailData['sub'];
  const userData = await USERS.findOne({ googleID: googleId })
  req.user = userData;
  return next();
  }catch(err){
    console.log(err,'1111111111'); 
  }
}


const verifyUser = async (req: any, res: any, next: any) => {
  const bearerData = req.headers['authorization'];
  if (!bearerData) {
    return res.status(403).json({ msg: "you are not login please login first..." });
  }
  const bearer = bearerData.split(' ');
  const localToken = bearer[1]

  if (!localToken) {
    return res.status(403).json({ msg: "A token is required for authentication" });
  }
  try {

    const decodedToken: any = jwt.verify(localToken, `${process.env.TOKEN_KEY}`);

    const userData = await USERS.findOne({ _id: decodedToken.user_id })
    if (!userData) {
      return res.status(403).json({ msg: "user not available." });
    }
    req.user = userData;

  } catch (err) {

    return res.status(401).json({ msg: err });

  }
  return next();
};


export { verifyUser, getUserID, googleVerifyUser };