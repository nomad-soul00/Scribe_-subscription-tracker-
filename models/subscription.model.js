import mongoose from "mongoose";

const subSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    price:{
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, 'price must be greater than zero']
    },
    currency:{
        type: String,
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD'
    },
    frequency:{
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category:{
        type: String,
        enum: ['sports', 'news', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true
    },
    paymentMethod:{
        type: String,
        trim: true,
        required: true
    },
    status:{
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate:{
        type: Date,
        required: true,
        validate:{
            validator : (value) =>{ value <= new Date()},
            message: 'start date must be in the past'
        }
    },
     renewalDate:{
        type: Date,
        validate:{
            validator : function(value){ return value > this.startDate },
            message: 'Renewal date must be after the start date'
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
   
},{timestamps: true});


// autocalculate the renewal date if missing
subSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriods= {
            daily: 1,
            weelly: 7,
            monthly: 30,
            yearly: 365
        }
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]); 
    }


    //autoupdate the status if renewl date has passed
     if(this.renewalDate < new Date()){
        this.status = 'expired';
     }

     next()
})

const Subscription = mongoose.model('Subscription', subSchema);

export default Subscription;