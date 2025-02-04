import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

export default function EventsRoot(params) {
    return <>
        <EventsNavigation />
        <Outlet />
    </>;
};
