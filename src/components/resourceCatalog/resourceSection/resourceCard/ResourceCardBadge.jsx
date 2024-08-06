import placeholderBadge from "../../../../assets/img/placeholder_badge.png";
import ResearcherModal from "../../../fragments/ResearcherModal";
import {useEffect} from "react";

/**
 * A badge displayed on a resource card, showing an available badge for the resource.
 * @param {ResourceListResourceBadge} badge - Badge object containing full badge information.
 * @param {number} index - Index of the badge in the list.
 */
export default function ResourceCardBadge({badge, index}) {
    const graphic = placeholderBadge; // TODO: Replace with badge graphic
    const resourceNameWithoutSpaces = badge.resource_name.replace(/\s+/g, '');


    const handleBadgeClick = (event) => {
        event.stopPropagation();
    };

    console.log("ResourceCardBadge", badge);

    // Initialize Bootstrap tooltips
    useEffect(() => {
        // Initialize Bootstrap tooltips
        import('bootstrap/dist/js/bootstrap.bundle.min.js').then((bootstrap) => {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.forEach((tooltipTriggerEl) => {
                new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }).catch(err => console.error("Failed to load Bootstrap JavaScript", err));
    }, []);

    return (
        <div>
            <button type="button" className="btn btn-outline-secondary resource-badge"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-custom-class="resource-card-badge-tooltip"
                    data-bs-title={badge.badge.name}>
                <div data-bs-toggle="modal"
                     data-bs-target={`#ResourceCardBadgeModal${resourceNameWithoutSpaces}${badge.badge.badge_id}${index}`}
                     onClick={handleBadgeClick}>
                    <img src={graphic} alt="badge" className="badge-icon"
                         style={{width: '32px', height: '32px'}}/>
                </div>
            </button>
            <ResearcherModal id={`ResourceCardBadgeModal${resourceNameWithoutSpaces}${badge.badge.badge_id}${index}`}
                             img={graphic}
                             name={badge.badge.name}
                             resourceName={badge.resource_name}
                             description={badge.badge.researcher_summary}
                             state={badge.state}
                             actionUrl={badge.badge_access_url || badge.badge.default_badge_access_url}
                             actionText={badge.badge_access_url_label || badge.badge.default_badge_access_url_label}/>
        </div>
    );
}