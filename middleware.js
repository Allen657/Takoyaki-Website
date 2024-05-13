module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.status(403).json({error:'Access Denied Please Login'});
    }
    next();
}