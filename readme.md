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


<!-- ----------AUTHENTICATION------------ -->
jwt, bcrypt

for each specific function build controllers and then hook them up witht specific routes.

authRouter.post('/sign-up', signUp)

    <!-- signUp-------------- -->
        1) start a mongoose session- to start a transaction
        2) create transsaction - so that we can group different multiple database operation, so that they either all succeed or fail completely

        significance- This ensures data consistency, especially in cases where partial updates could lead to corrupted or invalid data.
            example- A user might be created but the profile isn't.
                      Stock is deducted, but no order is created.
                      Money is debited from one user but not credited to another.
        
        3)open a try catch block - in the catch section if any error occurs - abort the transaction > end the session > pass the error in next()
        4) in try section create a new user - take data from clients > check if user exists > throw error> if user not exists hash the password > create a new user with the hashed paswword > link session inside the newUser > create a jwt token >commit the session > end the session > pass a json object for success message

    <!-- ----------sign in-------------------- -->
    1)open a try catch block - pass the error to the error middle ware through next(error)
    2)in try section - cheeck for existing user > if not present throw some error > compare the hashed password > if not matched throw error  > if matched provide a token > then send necessary data in response.

<!-- --------------------------------- -->

<!-- -----------Authorization--------------- -->

    handling user auth using user controller - (protected routes)
    retrieve all user
    retrieve a certain user.

    since the user details page should be authenticated or protected - therefore we used middlewares
    auth.middleware -> check if the requested user had a token 
                        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        } 
        >split the token and decode it /verify it
        >check whether the user is present in the database or not thorough the decoded jwt userId
        >if user is present then pass the information of the user inside (req.user = user)

<!-- -------------------------------- -->

<!-- ------------Rate Limiting using arcjet--------- -->
    set arcjet environmental variables form docs
    create an instance of arcjet in config and export it
    now create a middleware for arcjet from that instance
<!-- ----------------------------------- -->


<!-- <!-- -----------------creating sunbscriptions--------------- -->
const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        }) 
      the req.body comes from the authorize middleware inside the create subcription route.
<!-- -------------------------------------------- -->