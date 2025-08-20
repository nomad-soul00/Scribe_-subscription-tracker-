arcjet

dontenv- for accessing environment variables.

dotenv.config({path: `.env.${process.env.NODE_ENV || `development`}.local`}); //switching between development and production 

<!-- --Connecting Databases--- -->
app.listen(PORT, async ()=>{
    console.log(`listening on port ${PORT}`);
    await connectToDatabases();
});
<!-- ---- -->


<!-- for running a function in database schema before the document is saved- (Schema.pre(method, function)) --> 
subSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriods= {
            daily: 1,
            weelly: 7,
            monthly: 30,
            yearly: 365
        }
    }

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]); 

    //autoupdate the status if renewl date has passed
     if(this.renewalDate < new Date()){
        this.status = 'expired';
     }

     next()
})
<!-- -------- -->


<!-- Erroor checking middleares -->

const errorMiddleWare = (err,req,res,next)=>{
      try{
        let error = {...err};
        error.message = err.message;
        console.error(err); 

        //Mongoose bad ObjectID
        if(err.name === 'CastError'){
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }
        
        //Mongoose duplicate key
        if(err.code === 11000){
            const message = 'Duplicate field Value entered';
            error = new Error(message);
            error.statusCode = 400; 
        }

        //Mongoose Validation Error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400; 
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error';
        })

      }catch(error){
        next(error);
      }
}

export default errorMiddleWare;
    
<!-- -------------------------- -->