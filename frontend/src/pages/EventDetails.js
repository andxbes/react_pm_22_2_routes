import { Await, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function EventDetails() {
    const { event, events } = useRouteLoaderData('event-detail');
    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={event}>
                    {(loadedEvent) => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    );
};


async function loadEvent(id) {

    const response = await fetch('http://localhost:8080/events/' + id);
    // console.info(response);
    if (!response.ok) {
        const error = new Error('Could not fetch details for selected event.');
        error.status = 500;
        throw error;
    } else {
        const resData = await response.json();
        return resData.event;
    }
}

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        const error = new Error('Could not fetch events.');
        error.status = 500;
        throw error;
    } else {
        const resData = await response.json();
        return resData.events;
    }
}


export async function loader({ request, params }) {
    const id = params.eventId;
    return {
        event: await loadEvent(id),
        events: loadEvents()
    }
}

export async function action({ params, request }) {
    const eventID = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventID, {
        method: request.method
    });
    // console.info(response);
    if (!response.ok) {
        const error = new Error('Could not  delete event.');
        error.status = 500;
        throw error;
    } else {
        // const resData = await response.json();
        return redirect('/events');
    }
}
