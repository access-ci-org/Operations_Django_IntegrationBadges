import placeholder from "../../../assets/img/placeholder_badge.png";
import StatusTag from "../StatusTag";
import {useNavigate, useParams} from "react-router-dom";
import ResearcherModal from "../ResearcherModal";
import ResourceBadgeTopTag from "./ResourceBadgeTopTag";
import {useBadges} from "../../../contexts/BadgeContext";

function ResourceBadgeAction({view, badge}) {
    const navigate = useNavigate();
    const {resourceId} = useParams();

    const handleBadgeClick = () => {
        navigate(`/resourceBadge/${resourceId}/${badge.badge_id}`);
    };

    return (
        <div>
            {view ? (
                <button className="btn btn-medium resource-badge-action" onClick={handleBadgeClick}>
                    View Badge Details
                </button>
            ) : (
                <div>
                    <button className="btn btn-medium resource-badge-action" data-bs-toggle="modal"
                            data-bs-target={`#ResourceBadgeModal${badge.badge_id}`}>
                        Badge Action
                    </button>
                    <ResearcherModal id={`ResourceBadgeModal${badge.badge_id}`} name={badge.name}
                                     status={"NotPlanned"} actionText={badge.default_badge_access_url_label}
                                     description={badge.researcher_summary}
                                     actionUrl={badge.default_badge_access_url} source={"placeholder"}/>
                </div>
            )}
        </div>
    );
}

/**
 * A badge card that displays the basic info of a badge model.
 * @param data - the resource badge model
 * @param view - true if under RP view, false if under researcher view
 */
export default function ResourceBadge({data, view}) {
    const { badges } = useBadges();

    const badge = badges.find(b => b.badge_id === data.badge.badge_id);

    return (
        <div className="card resource-badge">
            <div style={{position: 'relative'}}>
                {(data.required && view) &&
                    <ResourceBadgeTopTag required={true}/>}
                {!view &&
                    // TODO: Change the title to the actual status
                    <ResourceBadgeTopTag title={"NotPlanned"}/>}
                <img src={placeholder} className="card-img-top" alt={badge.name}/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{badge.name}</h5>
                <p className="card-text">
                    {view ? badge.resource_provider_summary : badge.researcher_summary}
                </p>
                {view &&
                    <div className="resource-badge-tag-section">
                        <StatusTag title={"NotPlanned"}/>
                    </div>
                }
                <ResourceBadgeAction view={view} badge={badge}/>
            </div>
        </div>
    );
}