import { createBrowserRouter } from "react-router-dom";

import {
    LogPage,
    SignUpPage,
    ProfilePage,

} from "../pages";

export const router = createBrowserRouter([
    { path: "/", element: <LogPage /> },
    { path: "/signup", element: <SignUpPage /> },
    { path: "/profile/:id", element: <ProfilePage /> }
]);
