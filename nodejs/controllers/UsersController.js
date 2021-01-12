const jwt = require('jsonwebtoken');

exports.verifyToken =function (req,res,next){
    const bearerHeader =req.headers ['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        console.log(bearerToken);
        jwt.verify(bearerToken, "secretKey",(err,authorizationData)=>{
            if(err || !authorizationData.user){
                res.sendStatus(401);
                return;
            }else{
               req.userId =authorizationData.user.id;
            }
        });
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(401);
    }

}
exports.login = async function (req,res){
        let user =  await db.query("select * from users where email like ? and password like?",[req.body.email.trim(),req.body.password]);
        if(user.length ==0){
            res.status(401).send({err:"email or password is wrong"});
        }else{
            jwt.sign({user:user[0]},"secretKey",(err,token)=>{
                if(!err){
                    res.json({
                        token,
                    })
                    
                }else{
                    console.log("error is ",err);
                }
                
            });
        }
    

}