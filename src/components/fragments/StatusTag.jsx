import {useEffect, useState} from "react";
import {workflow_states} from "../../App";

/**
 * A status tag that displays the status of the badge.
 * The tag is mainly for RP view badges and the badge detail page.
 * @param {string} title - The status of the badge
 * @param {Object} style - optional styles
 */
export default function StatusTag({title, style}) {
    const [tag, setTag] = useState(title);
    const [className, setClassName] = useState("badge status-tag");

    useEffect(() => {
        let newTag = title;
        let newClassName = "badge status-tag";

        // Determine the new tag name and class based on conditions
        if (title === workflow_states.DEPRECATED) {
            newClassName += " deprecated-style";
        } else if (title === workflow_states.PLANNED) {
            newTag = "In Progress";
            newClassName += " planned-style";
        } else if (title === workflow_states.VERIFIED) {
            newTag = "Badge Available";
            newClassName += " verified-style";
        } else if (title === workflow_states.TASK_COMPLETED) {
            newTag = "Pending Verification";
            newClassName += " task-completed-style";
        } else if (title === workflow_states.VERIFICATION_FAILED) {
            newTag = "Verification Failed";
            newClassName += " verification-failed-style";
        } else if (title === workflow_states.NOT_PLANNED) {
            newTag = "Not Planned";
            newClassName += " not-planned-style";
        }

        // Set the state with the new values
        setTag(newTag);
        setClassName(newClassName);
    }, [title]);

    return (
        <span className={className} style={style}>{tag}</span>
    );
}