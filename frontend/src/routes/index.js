import Home from "~/pages/Home";
import Upload from "~/pages/Upload/index";

const publicRoute = [
    { path: "/", component: Home },
    { path: "/upload", component: Upload },
];

const privateRoute = [];

export { publicRoute, privateRoute };
