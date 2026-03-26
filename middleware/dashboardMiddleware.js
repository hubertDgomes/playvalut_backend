const dashboardMiddleware = (req , res , next) => {
    if(req.session.isLoged){
        next()
    }else{
        res.status(401).json({message : "Unauthorized"})
    }
}

export default dashboardMiddleware