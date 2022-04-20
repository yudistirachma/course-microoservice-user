const { User } = require('../../../models')

module.exports = async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: {
            exclude: ['password']
        }
    })

    if (!user) {
        res.status(400).json({
            status: false,
            message: 'User not found' 
        })
    }

    return res.json({
        status: true,
        data: user
    })
}
