import {useEffect, useState} from "react";

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
        if (title === "Deprecated") {
            newClassName += " deprecated-style";
        } else if (title === "Planned") {
            newTag = "In Progress";
            newClassName += " planned-style";
        } else if (title === "Verified") {
            newTag = "Badge Available";
            newClassName += " verified-style";
        } else if (title === "Task Completed") {
            newTag = "Pending Verification";
            newClassName += " task-completed-style";
        } else if (title === "Verification Failed") {
            newTag = "Verification Failed";
            newClassName += " verification-failed-style";
        } else if (title === "Not Planned") {
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