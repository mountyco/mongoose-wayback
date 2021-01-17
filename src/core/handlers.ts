import { Document, Model, NativeError } from "mongoose";
import { HasWayback } from "../interfaces/hasWayback";
import { User } from "../interfaces/user";
import { logit } from "./loggit";
import { diff } from "deep-diff";


const resolveUser = (newObject: HasWayback): User => {
    const user = (newObject).__user;
    if (!user) {
        throw new Error("unable to get user information");
    }
    delete newObject.__user;
    return user;
};

const hasChanges = (newObject: Document, oldObject: Document): boolean => {

    const _a = newObject.toJSON();
    const _b = oldObject.toJSON();

    const changes = (diff(_a, _b));
    if (changes && changes.length) {
        return true;
    }
    return false;
};

export const handleSave = (newObject: Document, next: (err?: NativeError) => void): void => {
    const user: User = resolveUser(newObject as HasWayback);
    (newObject.constructor as Model<Document>).findOne({
        _id: newObject._id
    }).then((oldObject: Document, err) => {
        if (!err) {
            if (hasChanges(newObject, oldObject)) {
                logit((newObject.constructor as Model<Document>).collection.name, "update", oldObject, newObject, user)
                    .then(() => next())
                    .catch((err) => next(err));
            } else {
                next();
            }
        } else {
            next(err);
        }
    });
};

