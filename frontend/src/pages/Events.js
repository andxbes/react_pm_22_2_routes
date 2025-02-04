

import EventsList from '../components/EventsList';
import { useLoaderData } from 'react-router-dom';

function Events() {
    const events = useLoaderData();
    return (<EventsList events={events} />);
}

export default Events;
