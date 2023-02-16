//ye is liye use kar rahe h taki async Error ko handle kar sake
module.exports = thefunc  =>(req,res,next)=>{
    Promise.resolve(thefunc(req,res,next)).catch(next);
}