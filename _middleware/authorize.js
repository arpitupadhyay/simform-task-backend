const jwt = require('express-jwt');
const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = authorize;

function authorize() {

    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret, algorithms: ['HS256'] }),

        // authorize based on user role
        // async (req, res, next) => {
        //     const account = await db.Account.findById(req.user.id);

        //     if (!account) {
        //         // account no longer exists or role not authorized
        //         return res.status(401).json({ message: 'Unauthorized' });
        //     }

        //     // authentication and authorization successful
        //     req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);
        //     next();
        // }
    ];
}