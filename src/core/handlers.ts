import { Document, Model, NativeError } from "mongoose";
import { HasWayback } from "../interfaces/hasWayback";
import { User } from "../interfaces/user";
import { logit } from "./loggit";


function resolveUser(newObject: Document): User {
    const user = (newObject as HasWayback).__user;
    if (!user) {
        throw new Error("unable to get user information");
    }
    return user;
}

export const handleSave = (newObject: Document, next: (err?: NativeError) => void): void => {

    const user: User = resolveUser(newObject);

    (newObject.constructor as Model<Document>).findOne({
        _id: newObject._id
    }).then((oldObject: Document, err) => {
        if (!err) {
            logit((newObject.constructor as Model<Document>).collection.name, "update", oldObject, newObject, user)
                .then(() => next())
                .catch((err) => next(err));
        } else {
            next();
        }
    });

};