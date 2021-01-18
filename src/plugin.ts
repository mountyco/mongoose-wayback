/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Query, Schema } from "mongoose";
import { handleSave, handleUpdate } from "./core/handlers";


const WaybackPlugin = (schema: Schema): void => {

    schema.pre<Document>("save", async function () {
        await handleSave(this);
    });


    schema.pre<Query<any, any>>("update", async function () {
        await handleUpdate(this);
    });

    schema.pre<Query<any, any>>("updateOne", async function () {
        await handleUpdate(this);
    });

    schema.pre<Query<any, any>>("findOneAndUpdate", async function () {
        await handleUpdate(this);
    });

    schema.pre<Query<any, any>>("updateMany", async function () {
        await handleUpdate(this);
    });

    schema.pre<Query<any, any>>("replaceOne", async function () {
        await handleUpdate(this);
    });

};


export default WaybackPlugin;