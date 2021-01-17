import { Schema, model, Document, Model, connect, createConnection } from "mongoose";
import { HasWayback } from "./interfaces/hasWayback";
import { changeConnection } from "./model/wayback";

import WaybackPlugin from "./plugin";

connect("mongodb://localhost:27017/wayback-test");

const newConnection = createConnection("mongodb://localhost:27017/wayback-audits");

changeConnection(newConnection);




const TestSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
}, { timestamps: true });


interface InterfaceTeamSchema extends Document, HasWayback {
    name: string;
    email: string;
}


TestSchema.plugin(WaybackPlugin);
const Test: Model<InterfaceTeamSchema> = model("UserTest", TestSchema);

// Test.updateOne({
//     name: "Anand Sid",
// }, { email: "anand@mounty.co" }, null, (err) => {
//     console.log(err);
// });

Test.findOne({ email: "anand@mounty.co" }, (e, data: InterfaceTeamSchema) => {
    data.__user = { name: "Hello World", _id: "Hello" };
    data.name = "Aand Sisd";
    data.save().then(console.log).catch(console.error);
});

