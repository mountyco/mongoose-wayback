// process.env.MONGOOSE_WAYBACK_CONNECTION_URL = "mongodb://mongo:27017/wayback-test-audits";
import { Schema, model, Document, Model, connect, mongo } from "mongoose";
import { HasWayback } from "../src/interfaces/hasWayback";


import WaybackPlugin from "../src/";

console.log("hellow world")

connect("mongodb://mongo:27017/wayback-test");








const TestSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    uid: { type: String, required: true, unique: true },
    nid: { type: String, required: true },
}, { timestamps: true });


interface InterfaceTeamSchema extends Document, HasWayback {
    name: string;
    email: string;
    uid: string;
    nid: string;
}


TestSchema.plugin(WaybackPlugin);
const Test: Model<InterfaceTeamSchema> = model("UserTest", TestSchema as unknown as Schema<InterfaceTeamSchema>);

Test.updateMany({
    uid: "1",
}, { $set: { email: "tech@mo", name: 'Technologyss HH', __user: { name: "Never ss this World", _id: "Helkjksjklo" } } }, null, (err) => {
    console.log(err);
});

// Test.findOne({ email: "anand@mounty.co" }, (e: unknown, data: InterfaceTeamSchema) => {
//     data.__user = { name: "Hello World", _id: "Hello" };
//     data.name = "Aand Sissd";
//     data.save().then(console.log).catch(console.error);
// });
// Test.updateMany({
//     email: "anand@mounty.co"
// }, { name: "Kane", __user: { name: "anand siddharth" } }).then(() => console.log("sd"));

// var t = new Test();
// t.email = "JHJHJHJH Tiwari";
// t.name = "harssdsdh@mounty.co";
// t.uid = "5";
// t.nid = "1";
// t.__user = { name: "anand siddharth" };
// t.save();
