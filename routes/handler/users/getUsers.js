const { User } = require('../../../models')

module.exports = async (req, res) => {
    const user = await User.findAll({
        attributes: {
            exclude: ['password']
        }
    })

    return res.json({
        status: true,
        data: user
    })
}
