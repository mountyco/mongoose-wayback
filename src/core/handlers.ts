import { Document, Model } from "mongoose";
import { logit } from "./loggit";

export const handleSave = (newObject: Document, next: () => void): void => {

    (newObject.constructor as Model<Document>).findOne({
        _id: newObject._id
    }).then((oldObject: Document, err) => {
        if (!err) {
            logit((newObject.constructor as Model<Document>).collection.name, "update", oldObject, newObject)
                .then(next)
                .catch(next);
        } else {
            next();
        }
    });

};


