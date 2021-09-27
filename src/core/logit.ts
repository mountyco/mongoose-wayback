import { Document } from "mongoose";
import { User } from "../interfaces/user";
import { Wayback } from "../model/wayback";
import { Action } from "../model/wayback";


export const logit = function (entityId: string, entityName: string, action: Action, oldModel: Object, newModel: Object, user: User): Promise<boolean> {
    return new Promise((resolve, reject) => {

        if (!user) {
            reject(
                new Error("User not specified")
            );
            return;
        }

        if (user && typeof user == 'object' && (<any>user).skip) {
            resolve(true);
            return true;
        }

        Wayback.create({
            entityId: entityId,
            entityName: entityName,
            action: action,
            old: oldModel,
            new: newModel,
            user: user,
        });

        resolve(true);
    });
};