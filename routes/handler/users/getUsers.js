const { User } = require('../../../models')

module.exports = async (req, res) => {

    const userIds = req.query.user_ids || [];

    const sqlOPtions ={
    attributes: ['id', 'name', 'email', 'role', 'profession', 'avatar']
    }

    if (userIds.length) {
        sqlOPtions.where = {
            id: userIds
        }
    }

    const user = await User.findAll(sqlOPtions)

    return res.json({
        status: true,
        data: user
    })
}
