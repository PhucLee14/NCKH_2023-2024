import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import NewsFeed from "../pages/newsfeed/NewsFeed";
import Update from "../pages/update/Update";
import Upload from "../pages/upload/Upload";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/upload", component: Upload },
    { path: "/newsfeed", component: NewsFeed },
    { path: "/update/:id", component: Update },
];

const privateRoute = [];

export { publicRoutes, privateRoute };
