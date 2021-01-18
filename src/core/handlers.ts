/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Model, NativeError, Query } from "mongoose";
import { HasWayback } from "../interfaces/hasWayback";
import { User } from "../interfaces/user";
import { logit } from "./loggit";
import { resolveUser, hasChanges } from "./utils";


export const handleSave = async (newObject: Document): Promise<void> => {
    const user: User = resolveUser(newObject as HasWayback);
    const oldObject = await (newObject.constructor as Model<Document>).findOne({
        _id: newObject._id
    });
    if (oldObject) {
        if (hasChanges(newObject, oldObject)) {
            await logit((newObject.constructor as Model<Document>).collection.name, "update", oldObject, newObject, user);
        }
    } else {
        new Error("can't find old object") as NativeError;
    }
};

export const handleUpdate = async (query: Query<any, any>): Promise<void> => {
    const updated = query.getUpdate();
    await query.find(query.getQuery())
        .cursor()
        .eachAsync((async (doc: Document) => {
            const newObject: HasWayback = doc.set(updated) as HasWayback;
            newObject.__user = (updated as HasWayback).__user;
            await handleSave(newObject);
        }));
};