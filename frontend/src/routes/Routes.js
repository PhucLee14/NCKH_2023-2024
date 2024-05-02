// import { useAuthContext } from "../context/AuthContext";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import NewsFeed from "../pages/newsfeed/NewsFeed";
import NewsDetail from "../pages/newsfeed/NewsDetail";
import Profile from "../pages/profile/Profile";
import Signup from "../pages/signup/Signup";
import Update from "../pages/update/Update";
import Upload from "../pages/upload/Upload";
import Certificate from "../pages/certificate/Certificate";
import NewsPending from "../pages/newsfeed/NewsPending";
import CertificatePending from "../pages/certificate/CertificatePending";

// const { authUser } = useAuthContext();
const publicRoutes = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
    { path: "/upload", component: Upload },
    { path: "/profile/:id", component: Profile },
    { path: "/newsfeed", component: NewsFeed },
    { path: "/newsfeed/pending", component: NewsPending },
    { path: "/newsfeed/:id", component: NewsDetail },
    { path: "/update/:id", component: Update },
    { path: "/certificate", component: Certificate },
    { path: "/certificate/pending", component: CertificatePending },
];

const privateRoute = [];

export { publicRoutes, privateRoute };
