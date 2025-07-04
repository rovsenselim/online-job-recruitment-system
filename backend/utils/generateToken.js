import jwt from "jsonwebtoken";

export const generateToken = (id, res, tokenName = "token") => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET environment variable is not defined");

    const token = jwt.sign({ id }, secret, { expiresIn: "1h" });

    res.cookie(tokenName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
    });

    return token;
};
