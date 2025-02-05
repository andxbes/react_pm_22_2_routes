

import EventsList from '../components/EventsList';
import { useLoaderData } from 'react-router-dom';

function Events() {
    const events = useLoaderData();
    return (<EventsList events={events} />);
}

export default Events;


export async function loader() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        //... 
        // setError('Fetching events failed.');
    } else {
        const resData = await response.json();
        return resData.events;
    }
}
