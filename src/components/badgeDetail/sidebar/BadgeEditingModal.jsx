import {useState} from "react";
import axios from "axios";

function EditModalInput({
                            actionButtonText,
                            setActionButtonText,
                            usageUrl,
                            setUsageUrl,
                            errorMessage,}) {

    return (
        <div className="badge-modal-input-wrapper">
            <div className="badge-modal-input">
                <div className="mb-3">
                    <label htmlFor="BadgeActionButtonText" className="form-label">
                        Badge Action Button Text
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
                        id="BadgeActionButtonText"
                        value={actionButtonText}
                        onChange={(e) => setActionButtonText(e.target.value)}
                        placeholder="Badge Action Button Text"
                    />
                    {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="BadgeUsageURL" className="form-label">
                        Badge Usage URL
                    </label>
                    <input
                        type="text"
                        className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
                        id="BadgeUsageURL"
                        value={usageUrl}
                        onChange={(e) => setUsageUrl(e.target.value)}
                        placeholder="Badge Usage URL"
                    />
                    {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
                </div>
            </div>
        </div>
    );
}

export default function BadgeEditingModal({id, label, url, resource_id, badge_id, setResource}) {
    const [actionButtonText, setActionButtonText] = useState(label);
    const [usageUrl, setUsageUrl] = useState(url);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFinishPlanning = async () => {
        const postData = {
            badge_access_url: usageUrl,
            badge_access_url_label: actionButtonText
        };

        try {
            const response = await axios.post(`resource/${resource_id}/${badge_id}/plan`, postData);
            console.log('Successfully changing state:', response.data);

            // Fetch the updated badge status
            const badgeStatusResponse = await axios.get(`resource/${resource_id}/state`);
            const updatedBadgeStatus = badgeStatusResponse.data.results.badge_status;
            console.log('Successfully updated badge status:', updatedBadgeStatus);

            if (updatedBadgeStatus) {
                setResource(prevState => {
                    const updatedResource = {...prevState};
                    updatedResource.badge_status = updatedBadgeStatus;
                    return updatedResource;
                });
            }

            setErrorMessage('');
            // close the modal
            document.querySelector(`#${id} .btn-close`).click();
        } catch (error) {
            console.error('Error editing resource-badge:', error);
            if (error.response && error.response.data && error.response.data.detail) {
                setErrorMessage(error.response.data.detail);
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="badgeModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-md-lg plan-modal">
                <div className="modal-content">
                    <div className="modal-body badge-modal-body">
                        <div className="badge-modal-header">
                            <h2>Edit Badge Usage URL and Action Name</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" style={{color: '#107080'}}/>
                        </div>
                        <div className="badge-modal-content">
                            <EditModalInput actionButtonText={actionButtonText}
                                            setActionButtonText={setActionButtonText}
                                            usageUrl={usageUrl}
                                            setUsageUrl={setUsageUrl}
                                            errorMessage={errorMessage}/>
                        </div>
                        <div className="badge-modal-footer">
                            <a type="button" className="btn" data-bs-dismiss="modal"
                               aria-label="Close">Cancel</a>
                            <a type="button" className={"btn btn-medium"} onClick={handleFinishPlanning}>
                                Save
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}