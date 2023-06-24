const {Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
        minLength: 6,
        //maxLength: 6
    }
});

userSchema.set("toJSON", {
    transform: (document, userJSON) => {
        userJSON.id = document._id.toString();
        delete userJSON._id;
        delete userJSON.__v;
        delete userJSON.passwordHash;
    }
})

const User = new model("User", userSchema);

module.exports = {
    User
};