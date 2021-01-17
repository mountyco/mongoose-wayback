import { Schema, Document, Model, model, createConnection } from "mongoose";
export type Action = "update";
export const WaybackSchema: Schema = new Schema({
    entityName: { type: String, required: true },
    entityId: { type: String, required: true },
    action: { type: String, required: true },
    old: { type: {}, required: true },
    new: { type: {}, required: true },
    user: { type: {}, required: true }
}, { timestamps: true });

export interface InterfaceWayback extends Document {
    entityName: string;
    action: Action;
    entityId: string;
    old: unknown;
    new: unknown;
    user: unknown;
}

let Wayback: Model<InterfaceWayback>;
if (!process.env.MONGOOSE_WAYBACK_CONNECTION_URL) {
    Wayback = model("Wayback", WaybackSchema as unknown as Schema<InterfaceWayback>);
} else {
    Wayback = createConnection(process.env.MONGOOSE_WAYBACK_CONNECTION_URL).
        model<InterfaceWayback>("Wayback", WaybackSchema as unknown as Schema<InterfaceWayback>);
}

export { Wayback };