import jwt, {} from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export default async function auth(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json("token is missing at auth page");
    }
    try {
        if (!JWT_SECRET)
            throw new Error("JWT secret is missing");
        const decodeToken = await jwt.verify(token, JWT_SECRET);
        console.log("got the payload from token");
        req.user = { id: decodeToken.id, ...decodeToken };
        console.log(req.user);
        next();
    }
    catch (error) {
        res.status(501).json("internal server error furing auth middleware");
    }
}
//# sourceMappingURL=auth.js.map