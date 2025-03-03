

import { Suspense } from 'react';
import EventsList from '../components/EventsList';
import { Await, useLoaderData } from 'react-router-dom';

function Events() {
    const { events } = useLoaderData();

    // if (data?.isError) {
    //     return <p>{data.message}</p>
    // }
    // const events = data.events;
    // return (<EventsList events={events} />);

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
    );
}

export default Events;

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

export async function loader() {
    return {
        events: loadEvents()
    }
}
