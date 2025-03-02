

import EventsList from '../components/EventsList';
import { useLoaderData } from 'react-router-dom';

function Events() {
    const data = useLoaderData();
    if (data?.isError) {
        return <p>{data.message}</p>
    }
    const events = data.events;
    return (<EventsList events={events} />);
}

export default Events;


export async function loader() {
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        const error = new Error('Could not fetch events.');
        error.status = 500;
        throw error;
    } else {
        const resData = await response.json();
        return resData;
    }
}
