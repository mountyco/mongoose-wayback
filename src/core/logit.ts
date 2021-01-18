import { Document } from "mongoose";
import { Wayback } from "../model/wayback";
import { Action } from "../model/wayback";


export const logit = function (modelName: string, action: Action, oldModel: Document, newModel: Document, user: unknown): Promise<boolean> {
    return new Promise((resolve, reject) => {

        if (!user) {
            reject(
                new Error("User not specified")
            );
            return;
        }

        Wayback.create({
            entityId: oldModel.id,
            entityName: modelName,
            action: action,
            old: oldModel?.toJSON() || oldModel,
            new: newModel?.toJSON() || newModel,
            user: user,
        });

        resolve(true);
    });
};