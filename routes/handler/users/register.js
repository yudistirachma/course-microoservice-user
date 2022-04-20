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
    }

    const validate = v.validate(req.body, schema);

    if(validate.length > 0) {
        return res.status(400).json({
            status: false,
            message: validate
        })
    }

    let user = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if (user) {
        return res.status(400).json({
            status: false,
            message: 'Email already exists'
        })
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = 'user';
    req.body.avatar = null;

    user = await User.create(req.body);

    if (!user) {
        return res.status(400).json({
            status: false,
            message: user
        })
    }

    return res.json({
        status: true,
        data: user
    })
}
