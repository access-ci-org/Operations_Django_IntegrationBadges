import {useLocation} from "react-router-dom";

export default function Concierge(props) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const concierge = queryParams.get('concierge');

    if (concierge) {
        return props.children;
    }
}


