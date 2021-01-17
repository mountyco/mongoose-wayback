import { Document, Model, NativeError } from "mongoose";
import { HasWayback } from "../interfaces/hasWayback";
import { User } from "../interfaces/user";
import { logit } from "./loggit";


function resolveUser(newObject: HasWayback): User {
    const user = (newObject).__user;
    if (!user) {
        throw new Error("unable to get user information");
    }
    delete newObject.__user;
    return user;
}

export const handleSave = (newObject: Document, next: (err?: NativeError) => void): void => {

    const user: User = resolveUser(newObject as HasWayback);

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