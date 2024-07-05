import {useEffect, useState} from "react";
import LabelTag from "../../../../fragments/LabelTag";

export default function ResourceBadgeTopTag({required, title}) {
    const [tag, setTag] = useState(title);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        let newTag = title;
        let newStatus = false;

        if (required) {
            newTag = "Required";
            newStatus = true;
        } else if (title === "Planned" || title === "TaskCompleted" || title === "VerificationFailed") {
            newTag = "Unverified";
        } else if (title === "Verified") {
            newTag = "Available";
            newStatus = true;
        }

        // Set the state with the new values
        setTag(newTag);
        setStatus(newStatus);
    }, [required, title]);

    return (
        <LabelTag title={tag} verified={status} style={{position: 'absolute'}}/>
    );
}