import jwt from "jsonwebtoken";

const checkAuth =  (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(' ')[1]
        if(token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.id
            next()
        }
    } catch {
        res.status(401).json({message: 'Не авторизований'})
    }
}

export default checkAuth