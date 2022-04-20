const  bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const { User } = require('../../../models')
const v = new Validator();

module.exports = async (req, res) => {
    
    const schema = {
        email : 'email|empty:false',
        password : 'string|min:6',
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
            email: req.body.email,
        }
    })

    if(!user) {
        return res.status(401).json({
            status: false,
            message: 'user with this email does not exist'
        })
    }

    const valid = await bcrypt.compare(req.body.password, user.password);

    if(!valid) {
        return res.status(401).json({
            status: false,
            message: 'Invalid password'
        })
    }

    return res.json({
        status: true,
        data: user
    })
}
