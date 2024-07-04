import placeholderBadge from "../../../../../../assets/img/placeholder_badge.png";
import {useEffect, useState} from "react";

// Copied from ResourceBadgeTopTag.jsx with a different class name
function ResourceCardBadgeTag({required, title}) {
    const [tag, setTag] = useState(title);
    const [className, setClassName] = useState("resource-card-badge-tag");

    useEffect(() => {
        let newTag = title;
        let newClassName = "resource-card-badge-tag";

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

export default function ResourceCardModal({data, name}) {
    const handleCloseClick = (event) => {
        event.stopPropagation();
    };
    console.log(name);
    return (
        <div className="modal fade" id={name} tabIndex="-1"
             aria-labelledby="badgeModal" aria-hidden="true" onClick={handleCloseClick}>
            <div className="modal-dialog modal-dialog-centered modal-md-lg researcher-modal">
                <div className="modal-content">
                    <div className="modal-body badge-modal-body">
                        <div className="badge-modal-header">
                            <div className="badge-modal-header-info">
                                <img src={placeholderBadge} alt="badge" className="badge-icon"/>
                                <div className="badge-modal-header-info-title">
                                    <ResourceCardBadgeTag title={data.status}/>
                                    <div style={{ paddingTop: "16px" }}>
                                        <p className="badge-modal-name">{data.name}</p>
                                        <p className="badge-modal-source">{data.source}</p>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={handleCloseClick}/>
                        </div>
                        <div className="badge-modal-content">
                            <p>{data.description}</p>
                        </div>
                        <div className="badge-modal-footer">
                            <a type="button" className="btn" data-bs-dismiss="modal"
                               aria-label="Close" onClick={handleCloseClick}>CLOSE</a>
                            <a href={data.actionUrl} type="button" className={"btn btn-medium"}>
                                {data.actionText}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}