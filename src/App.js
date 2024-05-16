import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

// import Rooms
import Room from "./pages/rooms/mainRoom/Room.jsx";
import AddRoom from "./pages/rooms/addRoom/AddRoom.jsx";
import UpdateRoom from "./pages/rooms/updateRoom/UpdateRoom.jsx";
import DetailRoom from "./pages/rooms/detailRoom/DetailRoom.jsx";

// import Types Room
import TypeRoom from "./pages/type-rooms/mainTypeRoom/TypeRoom.jsx";
import AddTypeRoom from "./pages/type-rooms/addTypeRoom/AddTypeRoom.jsx";
import UpdateTypeRoom from "./pages/type-rooms/updateTypeRoom/UpdateTypeRoom.jsx";

// import Events
import Event from "./pages/events/mainEvent/Event.jsx";
import AddEvent from "./pages/events/addEvent/AddEvent.jsx";
import UpdateEvent from "./pages/events/updateEvent/UpdateEvent.jsx";

// import Teachers
import Teacher from "./pages/teachers/mainTeacher/Teacher.jsx";
import AddTeacher from "./pages/teachers/addTeacher/AddTeacher.jsx";
import UpdateTeacher from "./pages/teachers/updateTeacher/UpdateTeacher.jsx";

// import Accounts
import Account from "./pages/accounts/mainAccount/Account.jsx";
import AddAccount from "./pages/accounts/addAccount/AddAccount.jsx";
import UpdateAccount from "./pages/accounts/updateAccount/UpdateAccount.jsx";

// import History
import History from "./pages/historybooking/mainHistory/History.jsx";
import DetailHistory from "./pages/historybooking/detailHistory/DetailHistory.jsx";

// import Report
import Report from "./pages/reports/mainRReport/Report.jsx";

import { DarkModeContext } from "./context/darkModeContext";

import "./style/dark.scss";

const router = createBrowserRouter([
    {
        path: "/admin",
        element: <Home />,
    },
    // ROOMS START
    {
        path: "/rooms",
        element: <Room />,
    },
    {
        path: "/rooms/add-room",
        element: <AddRoom />,
    },
    {
        path: "/rooms/update-room/:roomId",
        element: <UpdateRoom />,
    },
    {
        path: "/rooms/detail-room/:roomId",
        element: <DetailRoom />,
    },
    // ROOMS END

    // TYPE ROOM START
    {
        path: "/types",
        element: <TypeRoom />,
    },
    {
        path: "/types/add-type",
        element: <AddTypeRoom />,
    },
    {
        path: "/types/update-type/:typeId",
        element: <UpdateTypeRoom />,
    },
    // TYPE ROOM END

    // EVENT START
    {
        path: "/events",
        element: <Event />,
    },
    {
        path: "/events/add-event",
        element: <AddEvent />,
    },
    {
        path: "/events/update-event/:eventId",
        element: <UpdateEvent />,
    },
    // EVENT END

    // TEACHER START
    {
        path: "/teachers",
        element: <Teacher />,
    },
    {
        path: "/teachers/add-teacher",
        element: <AddTeacher />,
    },
    {
        path: "/teachers/update-teacher/:teacherId",
        element: <UpdateTeacher />,
    },

    // TEACHER END

    // ACCOUNT START
    {
        path: "/accounts",
        element: <Account />,
    },
    {
        path: "/accounts/add-account",
        element: <AddAccount />,
    },
    {
        path: "/accounts/update-account/:accountId",
        element: <UpdateAccount />,
    },
    // ACCOUNT END

    // HISTORY START
    {
        path: "/histories",
        element: <History />,
    },
    {
        path: "/histories/detail-history/:historyId",
        element: <DetailHistory />,
    },
    // HISTORY END

    // REPORT START
    {
        path: "/reports",
        element: <Report />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

function App() {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
