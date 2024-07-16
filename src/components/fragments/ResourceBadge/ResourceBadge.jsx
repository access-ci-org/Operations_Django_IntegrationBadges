import placeholder from "../../../assets/img/placeholder_badge.png";
import StatusTag from "../StatusTag";
import {useNavigate, useParams} from "react-router-dom";
import ResearcherModal from "../ResearcherModal";
import ResourceBadgeTopTag from "./ResourceBadgeTopTag";
import {useBadges} from "../../../contexts/BadgeContext";
import LoadingPage from "../LoadingPage";

/**
 * The action button for the badge card. It will either navigate to the badge detail page.
 * @param view - True for Resource Provider View, False for Researcher View
 * @param {Object} badge - The badge model got from the badge context
 * @param {string} status - The status of the badge
 * @param {string} resource_name - The name of the resource
 */
function ResourceBadgeAction({view, badge, status, resource_name}) {
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
                                     status={status} actionText={badge.default_badge_access_url_label}
                                     description={badge.researcher_summary}
                                     actionUrl={badge.default_badge_access_url} resourceName={resource_name}/>
                </div>
            )}
        </div>
    );
}

/**
 * A badge card that displays the basic info of a badge model. It is being used in the dashboard view.
 * @param {Object} data - the resource badge model, plus the status of the badge and the resource name
 * @param view - True for Resource Provider View, False for Researcher View
 */
export default function ResourceBadge({data, view}) {
    const { badges } = useBadges();

    // find the badge object with the full information from the badge id
    const badge = badges.find(b => b.badge_id === data.badge.badge_id);
    // TODO: change the logic to retrieve the badge graphic from the badge object (from badge.graphic)
    const graphic = placeholder;

    if (!badge) {
        return <LoadingPage/>;
    }

    return (
        <div className="card resource-badge">
            <div style={{position: 'relative'}}>
                {(data.required && view) &&
                    <ResourceBadgeTopTag required={true}/>}
                {!view &&
                    <ResourceBadgeTopTag title={data.status}/>}
                <img src={graphic} className="card-img-top" alt={badge.name}/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{badge.name}</h5>
                <p className="card-text">
                    {view ? badge.resource_provider_summary : badge.researcher_summary}
                </p>
                {view &&
                    <div className="resource-badge-tag-section">
                        <StatusTag title={data.status}/>
                    </div>
                }
                <ResourceBadgeAction view={view} badge={badge}
                                     status={data.status}
                                     resource_name={data.resource_name}/>
            </div>
        </div>
    );
}