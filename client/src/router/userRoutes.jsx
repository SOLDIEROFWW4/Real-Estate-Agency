import MainPage from "../components/pages/mainPage/MainPage";
import ContactsPage from "../components/pages/ContactsPage";

export const userRoutes = [
    {
        path: "/main",
        Component: MainPage,
    },
    {
        path: "/contacts",
        Component: ContactsPage,
    },
];