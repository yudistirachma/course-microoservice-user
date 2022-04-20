const  bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const { User } = require('../../../models')
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        name : 'string|empty:false',
        email : 'email|empty:false',
        password : 'string|min:6',
        profession : 'string|optional',
        avatar : 'string|optional',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length > 0) {
        return res.status(400).json({
            status: false,
            message: validate
        })
    }

    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    })

    if (user == false) {
        res.status(400).json({
            status: false,
            data: user
        })
    }

    const cekEmail = await User.findOne({
        where: {
            email: req.body.email,
        }
    })

    if (cekEmail && req.body.email != user.email) {
        return res.status(400).json({
            status: false,
            message: 'Email already exist'
        })
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10)

    return user.update(req.body).then(user => {
        return res.json({
            status: true,
            message: 'User updated successfully',
            data: user
        })
    }).catch(err => {
        return res.status(500).json({
            status: false,
            message: 'Error updating user',
            data: err
        })
    })
}
