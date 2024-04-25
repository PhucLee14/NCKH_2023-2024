// import { useAuthContext } from "../context/AuthContext";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import NewsFeed from "../pages/newsfeed/NewsFeed";
import Profile from "../pages/profile/Profile";
import Signup from "../pages/signup/Signup";
import Update from "../pages/update/Update";
import Upload from "../pages/upload/Upload";

// const { authUser } = useAuthContext();
const publicRoutes = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
    { path: "/upload", component: Upload },
    { path: "/profile/:id", component: Profile },
    { path: "/newsfeed", component: NewsFeed },
    { path: "/update/:id", component: Update },
];

const privateRoute = [];

export { publicRoutes, privateRoute };
