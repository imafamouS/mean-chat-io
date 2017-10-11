import Mongoose from 'mongoose';
import BcryptJs from 'bcryptjs';
import UserValidation from './user.validation';

const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
        validate: [UserValidation.usernameValidate, 'Please choose another username !'],
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: [UserValidation.passwordValidate, 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character']
    },
    role: {
        type: String,
        required: true,
        trim: true,
        validate: [UserValidation.roleValidate, 'Please choose a user role']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password'))
        return next();
    BcryptJs.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        BcryptJs.hash(user.password, salt, (error, hash) => {
            if (error) { return next(error); }
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback){
    BcryptJs.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }
        callback(null, isMatch);
    });
};

UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
});

const User = Mongoose.model('User', UserSchema);

export default User;