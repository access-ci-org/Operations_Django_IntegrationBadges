
/**
 * The modal that displays the concierge comment of a badge. It only shows up when the state is
 * set to be "Verification Failed".
 * @param {string} id - The id of the modal
 * @param {string} comment - The comment from the concierge
 */
export default function BadgeCommentModal({id, comment}) {

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="badgeModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-md-lg plan-modal">
                <div className="modal-content">
                    <div className="modal-body badge-modal-body">
                        <div className="badge-modal-header">
                            <h2>Concierge Comment</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" style={{color: '#107080'}}/>
                        </div>
                        <div className="badge-modal-content">
                            <p>{comment || "No Available Comment."}</p>
                        </div>
                        <div className="badge-modal-footer">
                            <a type="button" className="btn" data-bs-dismiss="modal"
                               aria-label="Close">Close</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}