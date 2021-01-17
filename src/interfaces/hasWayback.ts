import { Document } from "mongoose";
export interface HasWayback extends Document {
    __user: unknown;
}
