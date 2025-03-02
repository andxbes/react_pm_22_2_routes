import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function Root(params) {
    // const navigation = useNavigation();

    return <>
        <MainNavigation />
        {/* {navigation.state === 'loading' && <p>Loading... </p>} */}
        <main >
            <Outlet />
        </main>
    </>;
};
