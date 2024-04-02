import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Upload from "./pages/upload/Upload";
import NewsFeed from "./pages/newsfeed/NewsFeed";
import { publicRoutes } from "./routes/Routes";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout || DefaultLayout;
                        const Page = route.component;
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
            </BrowserRouter>
        </>
    );
}

export default App;
