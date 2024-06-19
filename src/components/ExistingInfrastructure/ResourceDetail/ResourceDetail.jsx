import {useParams} from "react-router-dom";

export default function ResourceDetail() {
    const { resourceId } = useParams();

    return (
        <div>Hello</div>
    );
}