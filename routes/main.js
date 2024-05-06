const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

router.get(["/", "/home"],
    asyncHandler(async (req, res) => {
        const locals = {
            title: "Home"   //해당 페이지에 변수로 전달, 메인화면에서 title 변경
        };
        const data = await Post.find();
        res.render("index", { locals, data, layout: mainLayout });    //home경로로 들어오면 index.ejs를 보여줘, index에서 사용할 layout을 설정한다.
    }));

router.get("/about", (req, res) => {
    const locals = {
        title: "About"
    }
    res.render("about", { locals, layout: mainLayout });    //home경로로 들어오면 about.ejs를 보여줘, about에서 사용할 layout을 설정한다.
});

// 게시물 상세 보기
// GET /post/:id
router.get(
    "/post/:id",
    asyncHandler(async (req, res) => {
        const data = await Post.findOne({
            _id: req.params.id
        });
        res.render("post", { data, layout: mainLayout });
    })
);

module.exports = router;

// Post.insertMany(
//     [
//         {
//             title: "하루하루",
//             body: "Dio Flutter is a powerful HTTP client library for Dart and Flutter. It is developed by Flutter’s JianyingLi and is essential for making HTTP requests in applications. Beyond the basic functionalities of Dart’s http package, Dio offers added features like interceptors, multipart requests, and request cancellation, crucial for handling network requests and edge cases. This article delves into using Dio in Flutter for robust network interactions, covering its intuitive API, ease in handling REST API requests, file downloads, and advanced network tasks like progress notifications and timeout handling."
//         },
//         {
//             title: "이틀",
//             body: "Creating an instance of Dio To use the Dio flutter package in your Dart or Flutter application, you first need to create an instance of the Dio class. This instance will be used to make HTTP requests to remote APIs."
//         },

//         {
//             title: "사흘",
//             body: "Creating an instance of Dio To use the Dio flutter package in your Dart or Flutter application, you first need to create an instance of the Dio class. This instance will be used to make HTTP requests to remote APIs."
//         },

//         {
//             title: "나흘",
//             body: "Dio Flutter is a powerful HTTP client library for Dart and Flutter. It is developed by Flutter’s JianyingLi and is essential for making HTTP requests in applications. Beyond the basic functionalities of Dart’s http package, Dio offers added features like interceptors, multipart requests, and request cancellation, crucial for handling network requests and edge cases. This article delves into using Dio in Flutter for robust network interactions, covering its intuitive API, ease in handling REST API requests, file downloads, and advanced network tasks like progress notifications and timeout handling."
//         },

//         {
//             title: "닷새",
//             body: "Creating an instance of Dio To use the Dio flutter package in your Dart or Flutter application, you first need to create an instance of the Dio class. This instance will be used to make HTTP requests to remote APIs."
//         }

//     ]
// );