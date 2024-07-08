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