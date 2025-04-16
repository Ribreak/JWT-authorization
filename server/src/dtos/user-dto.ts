import { Types } from 'mongoose'

interface IModel {
    email: string
    _id: Types.ObjectId
    isActivated: boolean
}

export default class UserDto {
    email;
    id; 
    isActivated;

    constructor(model: IModel) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}