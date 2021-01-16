import { Document } from "mongoose";
export type Action = "update";

export const logit = function (modelName: string, action: Action, oldModel: Document, newModel: Document): Promise<boolean> {
    return new Promise((resolve) => {

        resolve(true);
    });
};