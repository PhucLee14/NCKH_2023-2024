import { useState, Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Upload from "./pages/upload/Upload";
import NewsFeed from "./pages/newsfeed/NewsFeed";
import { publicRoutes } from "./routes/Routes";
import { publicAdminRoutes } from "./routes/AdminRoutes";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import { Toaster } from "react-hot-toast";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import AdminDefaultLayout from "./admin/components/Layouts/AdminDefaultLayout";
// import { useAuthContext } from "./context/AuthContext";

function App() {
    // const { authUser } = useAuthContext();
    return (
        <>
            <BrowserRouter>
                <AuthContextProvider>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        {publicAdminRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = AdminDefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                    <Toaster />
                </AuthContextProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
