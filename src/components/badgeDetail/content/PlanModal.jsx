import {useState} from "react";

function PlanModalInput() {
    const [defaultAction, setDefaultAction] = useState(true);
    const [actionButtonText, setActionButtonText] = useState('Default Action Text');
    const [usageUrl, setUsageUrl] = useState('https://defaulturl.com');

    // Handle checkbox change
    const handleCheckboxChange = (event) => {
        setDefaultAction(event.target.checked);
        if (event.target.checked) {
            setActionButtonText('Default Action Text');
            setUsageUrl('https://defaulturl.com');
        } else {
            setActionButtonText('');
            setUsageUrl('');
        }
    };

    return (
        <div className="badge-modal-input-wrapper">
            <div className="form-check">
                <input
                    className="form-check-input form-checkbox"
                    type="checkbox"
                    id="defaultBadgeActionCheckbox"
                    checked={defaultAction}
                    onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="defaultBadgeActionCheckbox">
                    Use Default Badge Action Text and Badge Usage URL
                </label>
            </div>
            <div className="badge-modal-input">
                <div className="mb-3">
                    <label htmlFor="BadgeActionButtonText" className="form-label">
                        Badge Action Button Text
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="BadgeActionButtonText"
                        value={actionButtonText}
                        onChange={(e) => setActionButtonText(e.target.value)}
                        placeholder="Badge Action Button Text"
                        disabled={defaultAction}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="BadgeUsageURL" className="form-label">
                        Badge Usage URL
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="BadgeUsageURL"
                        value={usageUrl}
                        onChange={(e) => setUsageUrl(e.target.value)}
                        placeholder="Badge Usage URL"
                        disabled={defaultAction}
                    />
                </div>
            </div>
        </div>
    );
}

export default function PlanModal({id, name, actionUrl}) {
    const handleCloseClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="modal fade" id={id} tabIndex="-1"
             aria-labelledby="badgeModal" aria-hidden="true" onClick={handleCloseClick}>
            <div className="modal-dialog modal-dialog-centered modal-md-lg plan-modal">
            <div className="modal-content">
                    <div className="modal-body badge-modal-body">
                        <div className="badge-modal-header">
                            <h2>{name}</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={handleCloseClick} style={{color: '#107080'}}/>
                        </div>
                        <div className="badge-modal-content">
                            <p>Enter the action button name and a resource URL for Ticket Handling badge.</p>
                            <p>Badge action button name is a relevant action that indicates how this badge can be used
                                to on your resource. The url is the link to the information where steps of
                                using this badge is described.</p>
                            <PlanModalInput/>
                        </div>
                        <div className="badge-modal-footer">
                            <a type="button" className="btn" data-bs-dismiss="modal"
                               aria-label="Close" onClick={handleCloseClick}>Cancel</a>
                            <a href={actionUrl} type="button" className={"btn btn-medium"}>Finish Planning</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}