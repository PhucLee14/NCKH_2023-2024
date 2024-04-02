import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import NewsFeed from "../pages/newsfeed/NewsFeed";
import Upload from "../pages/upload/Upload";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "upload", component: Upload },
    { path: "/login", component: Login },
    { path: "/newsfeed", component: NewsFeed },
];

const privateRoute = [];

export { publicRoutes, privateRoute };
