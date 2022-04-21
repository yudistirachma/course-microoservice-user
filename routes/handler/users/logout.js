const { User, RefreshToken } = require('../../../models')
const Validator = require('fastest-validator')
const v = new Validator()

module.exports = async (req, res) => {
    const schema = {
        user_id: 'number|empty:false',
        // refresh_token: 'string|empty:false',
    }

    const validate = v.validate(req.body, schema)

    if (validate.length > 0) {
        return res.status(400).json({
            status: false,
            message: validate
        })
    }

    const user = await User.findByPk(req.body.user_id)

    if (!user) {
        return res.status(400).json({
            status: false,
            message: 'User not found'
        })
    }

    // const token = await RefreshToken.findOne({
    //     where: {
    //         user_id : req.body.user_id,
    //         // token: req.body.refresh_token
    //     }
    // })

    // if (!token) {
    //     return res.status(400).json({
    //         status: false,
    //         message: 'You are not logged in'
    //     })
    // }

    await RefreshToken.destroy({
        where: {
            user_id: req.body.user_id
        }
    })

    return res.json({
        status: true,
        message: 'Token deleted',
    })
}