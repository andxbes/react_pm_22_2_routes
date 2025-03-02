import { useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetails() {
    const data = useRouteLoaderData('event-detail');
    return (
        <EventItem event={data.event} />
    );
};

export async function loader({ request, params }) {
    const id = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + id);
    // console.info(response);
    if (!response.ok) {
        const error = new Error('Could not fetch details for selected event.');
        error.status = 500;
        throw error;
    } else {
        const resData = await response.json();
        return resData;
    }
}
