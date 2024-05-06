require("dotenv").config();
const express = require("express");
const connectDb = require("./config/db");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

connectDb();

const app = express();
const port = process.env.PORT || 3000;

//express 사용, view engine은 ejs, views templet은 ./views 폴더안에 있는것을 사용하겠다는 설정
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");

//url 요청 본문을 파싱한다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser);
app.use(methodOverride("_method"));

//route 설정
app.use("/", require("./routes/main"));
app.use("/", require("./routes/admin"));

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});