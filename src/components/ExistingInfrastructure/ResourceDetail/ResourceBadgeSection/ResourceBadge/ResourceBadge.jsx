import placeholder from "../../../../../assets/img/placeholder_badge.png";
import {useEffect, useState} from "react";

function ResourceBadgeRequiredTag() {
    return (
        <div className="resource-badge-required-tag">Required</div>
    );
}

function ResourceBadgeTag({title}) {
    const [tag, setTag] = useState(title);
    const [className, setClassName] = useState("badge resource-badge-tag");

    useEffect(() => {
        let newTag = title;
        let newClassName = "badge resource-badge-tag";

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
        }

        // Set the state with the new values
        setTag(newTag);
        setClassName(newClassName);
    }, [title]);

    return (
        <span className={className}>{tag}</span>
    );
}

export default function ResourceBadge({data, selectedView}) {
    return (
        <div className="card resource-badge">
            <div style={{ position: 'relative' }}>
                {data.required && <ResourceBadgeRequiredTag />}
                <img src={placeholder} className="card-img-top" alt={data.name}/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text">{data.description}</p>
                {selectedView &&
                    <div className="resource-badge-tag-section">
                        <ResourceBadgeTag title={data.status}/>
                    </div>
                }
                <a href={data.actionUrl} className="btn btn-dark">{data.actionText}</a>
            </div>
        </div>
    );
}