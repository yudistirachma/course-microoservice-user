const { RefreshToken } = require('../../../models')

module.exports = async (req, res) => {
    const token = await RefreshToken.findOne({
        where: {
            token: req.query.refresh_token
        }
    })

    if (!token) {
        return res.status(400).json({
            status: false,
            message: 'Invalid token'
        })        
    }

    return res.json({
        status: true,
        message: 'Token found',
        data: token.id
    })
}