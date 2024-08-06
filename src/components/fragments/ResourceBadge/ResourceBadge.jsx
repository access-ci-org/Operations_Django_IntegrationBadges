import placeholder from "../../../assets/img/placeholder_badge.png";
import StatusTag from "../StatusTag";
import {useNavigate, useParams} from "react-router-dom";
import ResearcherModal from "../ResearcherModal";
import ResourceBadgeTopTag from "./ResourceBadgeTopTag";
import {useBadges} from "../../../contexts/BadgeContext";
import LoadingPage from "../LoadingPage";

/**
 * The action button for the badge card. It will either navigate to the badge detail page.
 * @param {boolean} view - True for Resource Provider View, False for Researcher View
 * @param {Badge} badge - The badge model got from the badge context
 * @param {RoadmapBadge} data - The model passed with state, resource name, new url/text, etc.
 */
function ResourceBadgeAction({view, badge, data}) {
    const navigate = useNavigate();
    const {resourceId} = useParams();
    const resourceNameWithoutSpaces = data.resource_name.replace(/\s+/g, '');

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
                            data-bs-target={`#ResourceBadgeModal${resourceNameWithoutSpaces}${badge.badge_id}`}>
                        Badge Action
                    </button>
                    <ResearcherModal id={`ResourceBadgeModal${resourceNameWithoutSpaces}${badge.badge_id}`}
                                     name={badge.name}
                                     state={data.state}
                                     actionUrl={data.badge_access_url || badge.default_badge_access_url}
                                     actionText={data.badge_access_url_label || badge.default_badge_access_url_label}
                                     description={badge.researcher_summary}
                                     resourceName={data.resource_name}/>
                </div>
            )}
        </div>
    );
}

/**
 * A badge card that displays the basic info of a badge model. It is being used in the dashboard view.
 * @param {RoadmapBadge || CombinedBadge} data - the resource badge model, plus the status of the badge and the resource name
 * @param {boolean} view - True for Resource Provider View, False for Researcher View
 */
export default function ResourceBadge({data, view}) {
    const { badges } = useBadges();

    // find the badge object with the full information from the badge id
    const badge = badges.find(b => b.badge_id === data.badge_id);
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
                    <ResourceBadgeTopTag title={data.state}/>}
                <img src={graphic} className="card-img-top" alt={badge.name}/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{badge.name}</h5>
                <p className="card-text">
                    {view ? badge.resource_provider_summary : badge.researcher_summary}
                </p>
                {view &&
                    <div className="resource-badge-tag-section">
                        <StatusTag title={data.state}/>
                    </div>
                }
                <ResourceBadgeAction view={view} badge={badge} data={data}/>
            </div>
        </div>
    );
}