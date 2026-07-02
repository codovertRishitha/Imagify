import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {

    console.log("HEADERS:", req.headers);
    console.log("TOKEN:", req.headers.token);

    const token = req.headers.token;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded:", tokenDecode);

        if (!tokenDecode.id) {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }

        req.user = { id: tokenDecode.id };
        next();

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

export default userAuth;