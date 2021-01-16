import Wayback from "./model/wayback";
import { Document, Schema } from "mongoose";
import { handleSave } from "./core/handlers";



const WaybackPlugin = (schema: Schema): void => {

    schema.pre<Document>("save", function (next) {
        if (this.isNew) {
            next();
            return;
        }
        handleSave(this, next);
    });
};


export default WaybackPlugin;