import EditIcon from '../../../assets/img/icons/edit.svg';
import BadgeEditingModal from "./BadgeEditingModal";

/**
 * The badge editing section for a badge. Once the badge is planned,
 * the user can edit the badge action and URL.
 * @param {string} label - The badge action
 * @param {string} url - The badge URL
 * @param {number} resource_id - The resource ID (resource associated with the badge)
 * @param {number} badge_id - The badge ID
 * @param {Function} setResource - The function to update the resource
 */
export default function BadgeEditingSection({
                                                label,
                                                url,
                                                resource_id,
                                                badge_id,
                                                setResource
                                            }) {
    return (
        <div className="sidebar-section">
            <div className="sidebar-section-title-wrapper">
                <p className="sidebar-section-title">Badge Action and Url</p>
                <button className="btn sidebar-section-title-icon" data-bs-toggle="modal"
                        data-bs-target={`#BadgeEditingModal${resource_id}${badge_id}`}>
                    <EditIcon/>
                </button>
            </div>
            <div className="sidebar-section-edit-wrapper">
                <div className="sidebar-section-edit">
                    <p className="sidebar-section-edit-title">Badge Action</p>
                    <p className="sidebar-section-edit-content">{label}</p>
                </div>
                <div className="sidebar-section-edit">
                    <p className="sidebar-section-edit-title">Badge URL</p>
                    <p className="sidebar-section-link-content">{url}</p>
                </div>
            </div>
            <BadgeEditingModal id={`BadgeEditingModal${resource_id}${badge_id}`}
                               label={label}
                               url={url}
                               resource_id={resource_id}
                               badge_id={badge_id}
                               setResource={setResource}/>
        </div>
    );
}