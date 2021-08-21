import { Document } from "mongoose";
import { HasWayback } from "../interfaces/hasWayback";
import { User } from "../interfaces/user";
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

    let changes = (diff(_a, _b));
    changes = changes?.filter(x => typeof x.path == 'string' && x.path !== 'updatedAt')
    if (changes && changes.length) {
        return true;
    }
    return false;
};


export { resolveUser, hasChanges };