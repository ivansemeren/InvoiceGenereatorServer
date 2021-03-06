import userService from './user.service';
import {
	BAD_REQUEST,
	INTERNAL_SERVER_ERROR,
	UNAUTHORIZED
} from 'http-status-codes';
import User from './user.model';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import {devConfig} from '../../../config/env/development';

export default{
    async signup(req, res){
        try {
			const { error, value } = userService.validateSchema(req.body);
			if (error && error.details) {
				return res.status(BAD_REQUEST).json(error);
			}
			const user = await User.create(value);
            return res.json({ success: true, message: 'User created successfully' });
            //return res.json(user);
		} catch (err) {
			console.error(err);
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
        //return res.json({msg: 'SignUp'});
    }, 
    async login(req, res){
        try {
			const { error, value } = userService.validateSchema(req.body);
			if (error && error.details) {
				return res.status(BAD_REQUEST).json(error);
            }
            const user = await User.findOne({ email: value.email });
            if (!user) {
				return res
					.status(BAD_REQUEST)
					.json({ err: 'invalid email or password' });
			}
            const matched = await bcryptjs.compare(value.password, user.password);
			if (!matched) {
				return res.status(UNAUTHORIZED).json({ err: 'invalid credentials' });
            }
            const token = jwt.sign({ id: user._id }, devConfig.secret , { expiresIn: '1d'});
			return res.json({success: true, token});
		} catch (err) {
			console.error(err);
			return res.status(INTERNAL_SERVER_ERROR).json(err);
		}
	},
	async test(req,res){
		return res.json(req.user);
	}
}