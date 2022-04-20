const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema(
    {
        login: String,
        password: String,
    },
    { collection: "form" }
);

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
