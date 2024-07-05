import placeholderBadge from "../../assets/img/placeholder_badge.png";
import LabelTag from "./LabelTag";

export default function ResearcherModal({id, status, name, source, description, actionUrl, actionText}) {
    const handleCloseClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="modal fade" id={id} tabIndex="-1"
             aria-labelledby="badgeModal" aria-hidden="true" onClick={handleCloseClick}>
            <div className="modal-dialog modal-dialog-centered modal-md-lg researcher-modal">
                <div className="modal-content">
                    <div className="modal-body badge-modal-body">
                        <div className="badge-modal-header">
                            <div className="badge-modal-header-info">
                                <img src={placeholderBadge} alt="badge" className="badge-icon"/>
                                <div className="badge-modal-header-info-title">
                                    <LabelTag title={status === "Verified" ? "Available" : "Unverified"}
                                              verified={status === "Verified"} style={{margin: '0'}}/>
                                    <div style={{ paddingTop: "16px" }}>
                                        <p className="badge-modal-name">{name}</p>
                                        <p className="badge-modal-source">{source}</p>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={handleCloseClick}/>
                        </div>
                        <div className="badge-modal-content">
                            <p>{description}</p>
                        </div>
                        <div className="badge-modal-footer">
                            <a type="button" className="btn" data-bs-dismiss="modal"
                               aria-label="Close" onClick={handleCloseClick}>CLOSE</a>
                            <a href={actionUrl} type="button" className={"btn btn-medium"}>{actionText}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}