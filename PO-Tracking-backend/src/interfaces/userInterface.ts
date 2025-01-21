import mongoose from "mongoose";

export interface IUserCreate{
    name : string;
    password : string;
    email : string;
    role: mongoose.Schema.Types.ObjectId;
}

export interface IUserCreateReturn{
    _id : mongoose.Schema.Types.ObjectId;
    name : string;
    password : string;
    email : string;
    role: {
        name : string;
    };
}
export interface IUserLogin {
    name: string;
    password: string;
}