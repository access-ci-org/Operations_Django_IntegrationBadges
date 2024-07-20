import axios from "axios";

export default function UnplanModal({id, name, resource_id, badge_id, setResource}) {

    const handleFinishUnplanning = async () => {
        try {
            const response = await axios.post(`resource/${resource_id}/${badge_id}/unplan`);
            console.log('Successfully changing state:', response.data.results);

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

            // close the modal
            document.querySelector(`#${id} .btn-close`).click();
        } catch (error) {
            console.error('Error deleting resource-badge:', error);
        }
    };

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="badgeModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-md plan-modal unplan">
                <div className="modal-content">
                    <div className="modal-body badge-modal-body">
                        <div className="badge-modal-header">
                            <h2>{name}</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" style={{color: '#107080'}}/>
                        </div>
                        <div className="badge-modal-content">
                            <p>Are you sure you want to unplan this badge?</p>
                        </div>
                        <div className="badge-modal-footer">
                            <a type="button" className="btn" data-bs-dismiss="modal"
                               aria-label="Close">Cancel</a>
                            <a type="button" className={"btn btn-medium"} onClick={handleFinishUnplanning}>
                                Unplan
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}