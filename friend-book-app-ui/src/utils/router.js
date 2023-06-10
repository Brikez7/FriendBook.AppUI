import MyGroups from "../pages/MyGroups";
import Error from "../pages/Error";
import Login from "../pages/Login";
import ChangeContact from "../pages/ChangeContact";
import {
    CHANGE_CONTACT_ROUTE, GROUP_PROFILES_ROUTE,
    LOGIN_ROUTE,
    MAIN_PAGE_ROUTE,
    MY_GROUPS_ROUTE, ERROR_ROUTE,
    PROFILES_ROUTE,
    REGISTRATION_ROUTE
} from "./consts";
import MainPage from "../pages/MainPage";
import Profiles from "../pages/Profiles";

export const privateRouter = [
    {path:MY_GROUPS_ROUTE, component: MyGroups},
    {path:ERROR_ROUTE, component: Error},
    {path:CHANGE_CONTACT_ROUTE, component: ChangeContact},
    {path:MAIN_PAGE_ROUTE, component: MainPage},
    {path:PROFILES_ROUTE, component: Profiles},
    {path:GROUP_PROFILES_ROUTE, component: Profiles},
]

export const publicRouter = [
    {path:LOGIN_ROUTE, component: Login},
    {path:REGISTRATION_ROUTE, component: Login},
]