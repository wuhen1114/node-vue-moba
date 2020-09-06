module.exports = options => {
    const AdminUser = require('../models/AdminUser')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    return async (req, res, next) => {
        console.log(req.headers)
        const token = String(req.headers.authorization || '').split(' ').pop()
        console.log('----------------------')
        console.log(token)
        if(!token){
            return res.status(401).send({
                message: '请先登录'
            })
        }
        const { id } = jwt.verify(token, req.app.get('secret'))
        if(!id){
            return res.status(401).send({
                message: '请先登录'
            })
        }
        req.user = await AdminUser.findById(id)
        if(!req.user){
            return res.status(401).send({
                message: '请先登录'
            })
        }
        await next()
    }
}