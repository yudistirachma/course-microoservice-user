/* eslint-disable no-unused-vars */
const { User } = require('../../../models')

module.exports = async (req, res) => {

    const user = await User.findByPk(req.params.id)

    if (!user) {
        return res.status(400).json({
            status: false,
            data: user
        })
    }

    return user.destroy().then(user => {
        return res.json({
            status: true,
            message: 'User deleted successfully',
        })
    }).catch(error => {
        return res.status(500).json({
            status: false,
            message: error,
        })
    })
}
