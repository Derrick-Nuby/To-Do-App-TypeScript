"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
var routes_1 = require("./routes");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(routes_1.default);
// const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
var uri = "mongodb://localhost:27017/TS-To-Do-App";
var options = { useNewUrlParser: true, useUnifiedTopology: true };
// mongoose.set("useFindAndModify", false)
mongoose_1.default
    .connect(uri)
    .then(function () {
    return app.listen(PORT, function () {
        return console.log("Server running on http://localhost:".concat(PORT));
    });
})
    .catch(function (error) {
    throw error;
});
