import placeholderBadge from "../../../../../assets/img/placeholder_badge.png";
import ResearcherModal from "../../../../fragments/ResearcherModal";

export default function ResourceCardBadge({source, badge, index}) {
    const handleBadgeClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div>
            <button type="button" className="btn btn-outline-secondary resource-badge"
                    data-bs-toggle="modal" data-bs-target={`#ResourceCardBadgeModal${index}`} onClick={handleBadgeClick}>
                <img src={placeholderBadge} alt="badge" className="badge-icon"
                     style={{width: '32px', height: '32px'}}/>
            </button>
            <ResearcherModal id={`ResourceCardBadgeModal${index}`}
                name={badge.name} source={source} description={badge.researcher_summary}
                actionUrl={badge.default_badge_access_url} actionText={badge.default_badge_access_url_label}/>
        </div>
    );
}