import mongoose from "mongoose";

export const DoctorSchema = new mongoose.Schema({
    name: { type: String, maxLength: [25, "Name can't be greater than 25 characters"] },
    email: {
        type: String, unique: true, required: true,
        match: [/.+\@.+\../, "Please enter a valid email"]
    },
    password: {
        type: String,
        //custom validator
        validate: {
            validator: function (value) {
                return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value)
            },
            //if validation fails the this msg show
            message: "Password should be between 8-12 charachetrs and have a special character"
        }
    },
    type: { type: String, enum: ['Doctor', 'Patient'] }  //type of user : enum is what all values it can have
})

//Doctor is name of collection and telling that its for DoctorSchema
export const DoctorModel = mongoose.model('Doctor', DoctorSchema);