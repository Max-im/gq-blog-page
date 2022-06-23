import jwt from 'jsonwebtoken';

export const getUserId = (req, isRequired = true) => {
    const authHeader = req.headers.get('authorization');

    if (!authHeader && isRequired) throw new Error("Authorization failed");
    if (!authHeader) return null;

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_OR_KEY);

    return decoded.userId;
}