import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.userId = decoded.id;
        next();
      });
    } else {
      res.sendStatus(401);
    }
};

export default verifyToken;