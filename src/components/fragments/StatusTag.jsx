import {useEffect, useState} from "react";

export default function StatusTag({title, style}) {
    const [tag, setTag] = useState(title);
    const [className, setClassName] = useState("badge status-tag");

    useEffect(() => {
        let newTag = title;
        let newClassName = "badge status-tag";

        // Determine the new tag name and class based on conditions
        if (title === "Deprecated") {
            newClassName += " deprecated-style";
        } else if (title === "NotStarted") {
            newTag = "Not Started";
            newClassName += " not-started-style";
        } else if (title === "Planned") {
            newTag = "In Progress";
            newClassName += " planned-style";
        } else if (title === "Verified") {
            newTag = "Badge Available";
            newClassName += " verified-style";
        } else if (title === "TaskCompleted") {
            newTag = "Pending Verification";
            newClassName += " task-completed-style";
        } else if (title === "VerificationFailed") {
            newTag = "Verification Failed";
            newClassName += " verification-failed-style";
        }

        // Set the state with the new values
        setTag(newTag);
        setClassName(newClassName);
    }, [title]);

    return (
        <span className={className} style={style}>{tag}</span>
    );
}