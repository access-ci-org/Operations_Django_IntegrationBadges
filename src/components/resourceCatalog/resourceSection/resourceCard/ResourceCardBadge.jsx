import placeholderBadge from "../../../../assets/img/placeholder_badge.png";
import ResearcherModal from "../../../fragments/ResearcherModal";

/**
 * A badge displayed on a resource card, showing an available badge for the resource.
 * @param {string} resourceName - The name of the resource.
 * @param {Object} badge - Badge object containing full badge information.
 * @param {number} index - Index of the badge in the list.
 * TODO: change the logic to retrieve the badge graphic from the badge object
 */
export default function ResourceCardBadge({resourceName, badge, index}) {
    const graphic = placeholderBadge;

    const handleBadgeClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div>
            <button type="button" className="btn btn-outline-secondary resource-badge"
                    data-bs-toggle="modal" data-bs-target={`#ResourceCardBadgeModal${index}`}
                    onClick={handleBadgeClick}>
                <img src={graphic} alt="badge" className="badge-icon"
                     style={{width: '32px', height: '32px'}}/>
            </button>
            <ResearcherModal id={`ResourceCardBadgeModal${index}`} img={graphic} name={badge.name}
                             resourceName={resourceName} description={badge.researcher_summary}
                             actionUrl={badge.badge_access_url ?
                                 badge.badge_access_url : badge.default_badge_access_url}
                             actionText={badge.badge_access_url_label ?
                                 badge.badge_access_url_label : badge.default_badge_access_url_label}/>
        </div>
    );
}