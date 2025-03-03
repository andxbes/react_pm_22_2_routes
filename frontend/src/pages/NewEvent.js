import { redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function NewEvent(params) {
    // function submitHandler(event) {
    //     event.preventDefault();
    // }

    return <EventForm />

};

export async function action({ request, params }) {
    const data = await request.formData();
    // console.info(data);


    const formObject = {};
    data.forEach((value, key) => {
        formObject[key] = value;
    });

    const response = await fetch('http://localhost:8080/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
    });

    if (response.status === 422) {
        return response;
    }


    if (!response.ok) {
        const error = new Error('Could not save event.');
        error.status = 500;
        throw error;
    } else {
        const resData = await response.json();
        console.info(resData);
        // return redirect('../');
        return redirect('/events');
    }
}
