import {useEffect, useState} from "react";
import LabelTag from "../LabelTag";
import {workflow_states} from "../../../App";

/**
 * The top tag of a resource badge card, mainly for researcher view badges and required tag
 * for resource provider view badges.
 * @param {Boolean} required - true if the badge is required, false otherwise
 * @param {string} title - can be any of the following:
 * "Planned", "TaskCompleted", "VerificationFailed", "Verified", "NotStarted", "Deprecated", "NotPlanned"
 */
export default function ResourceBadgeTopTag({required, title}) {
    const [tag, setTag] = useState(title);
    const [status, setStatus] = useState(false);
    const [optionalStyle, setOptionalStyle] = useState({position: 'absolute'});

    useEffect(() => {
        let newTag = title;
        let newStatus = false;
        let newStyle = {position: 'absolute'};

        if (required) {
            newTag = "Required";
            newStatus = true;
        } else if (title === workflow_states.PLANNED
            || title === workflow_states.TASK_COMPLETED
            || title === workflow_states.VERIFICATION_FAILED) {
            newTag = "Unverified";
        } else if (title === workflow_states.VERIFIED) {
            newTag = "Available";
            newStatus = true;
        } else if (title === workflow_states.DEPRECATED || title === workflow_states.NOT_PLANNED) {
            newTag = "Not Available";
            newStyle = {position: 'absolute', color: '#232323'};
        }

        // Set the state with the new values
        setTag(newTag);
        setStatus(newStatus);
        setOptionalStyle(newStyle);
    }, [required, title]);

    return (
        <LabelTag title={tag} verified={status} style={optionalStyle}/>
    );
}