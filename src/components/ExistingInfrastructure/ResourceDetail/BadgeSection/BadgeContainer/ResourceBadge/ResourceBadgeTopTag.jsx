import {useEffect, useState} from "react";

export default function ResourceBadgeTopTag({required, title}) {
    const [tag, setTag] = useState(title);
    const [className, setClassName] = useState("resource-badge-top-tag");

    useEffect(() => {
        let newTag = title;
        let newClassName = "resource-badge-top-tag";

        // Determine the new tag name and class based on conditions
        if (required) {
            newTag = "Required";
            newClassName += " required-style";
        } else if (title === "Planned" || title === "TaskCompleted" || title === "VerificationFailed") {
            newTag = "Unverified";
            newClassName += " unverified-style";
        } else if (title === "Verified") {
            newTag = "Available";
            newClassName += " verified-style";
        }

        // Set the state with the new values
        setTag(newTag);
        setClassName(newClassName);
    }, [required, title]);

    return (
        <div className={className}>{tag}</div>
    );
}