import placeholderBadge from "../../assets/img/placeholder_badge.png";
import LabelTag from "./LabelTag";
import {workflow_states} from "../../App";

/**
 * A modal that displays the badge information for a researcher.
 * @param {string} id - The id of the modal.
 * @param {string} img - The logo of the badge.
 * @param {string} name - badge name.
 * @param {string} state - badge status.
 * @param {string} resourceName - The name of the resource.
 * @param {string} description - The researcher summary of the badge.
 * @param {string} actionUrl - The URL to access the badge action.
 * @param {string} actionText - The text to display on the action button.
 */
export default function ResearcherModal({
                                            id,
                                            img,
                                            name,
                                            state,
                                            resourceName,
                                            description,
                                            actionUrl,
                                            actionText
                                        }) {
    const handleCloseClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="modal fade" id={id} tabIndex="-1"
             aria-labelledby="researcherModal" aria-hidden="true" onClick={handleCloseClick}>
            <div className="modal-dialog modal-dialog-centered modal-md-lg researcher-modal">
                <div className="modal-content">
                    <div className="modal-body badge-modal-body">
                        <div className="badge-modal-header">
                            <div className="badge-modal-header-info">
                                <img src={img || placeholderBadge} alt={name} className="badge-icon"/>
                                <div className="badge-modal-header-info-title">
                                    {state && <LabelTag title={state === workflow_states.VERIFIED ? "Available" : "Unverified"}
                                                        verified={state === workflow_states.VERIFIED}
                                                        style={{margin: '0'}}/>}
                                    <div style={{paddingTop: "16px"}}>
                                        <p className="badge-modal-name">{name}</p>
                                        <p className="badge-modal-source">{resourceName}</p>
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