import { Schema, model, Document, Model } from "mongoose";


const WaybackSchema: Schema = new Schema({
    entityName: { type: String, required: true },
    entityId: { type: String, required: true },
    changes: { type: {}, required: true },
    old: { type: {}, required: true },
    new: { type: {}, required: true },
    user: { type: {}, required: true }
}, { timestamps: true });

interface InterfaceWayback extends Document {
    entityName: string;
    entityId: string;
    changes: unknown;
    old: unknown;
    new: unknown;
    user: unknown;
}

const Wayback: Model<InterfaceWayback> = model("Wayback", WaybackSchema);

export default Wayback;