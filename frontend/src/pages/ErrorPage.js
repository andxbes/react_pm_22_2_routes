import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";


export default function ErrorPage() {
    const error = useRouteError();

    let title = 'An error occurred!';
    let message = 'Something went wrong!';
    // console.info(error);
    if (error.status === 500) {
        message = error.message;
    }

    if (error.status === 404) {
        title = 'Not Found!';
        message = 'Could not find resource or page.';
    }

    return <>
        <MainNavigation />
        <PageContent title={title}>
            <p>{message}</p>
        </PageContent>
    </>;
};
