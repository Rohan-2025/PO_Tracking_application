import mongoose, { Schema ,Document} from "mongoose";

export interface IUser extends Document{
    name : string;
    password : string;
    email : string;
    role : mongoose.Schema.Types.ObjectId;
}

const UserSchema : Schema = new Schema({
    name : {
        type: String,
        unique: true,
        required : true,
    },
    email : {
        type :  String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        unique : true,
        required : true,
    },
    role : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "role",
        required : true,
    }
},{
    timestamps : true,
});

export default mongoose.model<IUser>('user',UserSchema);