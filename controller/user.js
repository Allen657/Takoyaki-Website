const User = require('../models/User')
module.exports.user = {
    registerUser: async (req, res, next) => {
        const { username, name, password } = req.body.user;
        const user = new User({ username, name });
        const newUser = await User.register(user, password);
        req.login(newUser, err => {
            if (err) return err;
            res.json({ isLogin: true, user: { id: newUser._id, username: newUser.username } })
        });
    },
    sendCredentials: (req, res) => {
        res.json({ isLogin: true, user: { id: req.user._id, username: req.user.username } });
    },
    logout: (req, res) => {
        req.logout((err) => {
            if (err) { return res.json({ err }) }
            res.json({ islogin: false })
        });
    },
    checkLogin: (req, res) => {
        console.log(req.user)
        if (req.user) {
            return res.json({ isLogin: true, user: { id: req.user._id, username: req.user.username } })
        }
        return res.json({ isLogin: false })
    }
}