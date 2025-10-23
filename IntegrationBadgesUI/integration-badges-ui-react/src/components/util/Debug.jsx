import {useLocation} from "react-router-dom";

export default function Debug(props) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const debug = queryParams.get('debug');

    if (debug) {
        return props.children;
    }
}


