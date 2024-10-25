import placeholder from "../../../../../../assets/img/placeholder_badge.png";
import StatusTag from "../../../../../fragments/StatusTag";
import LabelTag from "../../../../../fragments/LabelTag";
import {useNavigate, useParams} from "react-router-dom";
import ResearcherModal from "../../../../../fragments/ResearcherModal";
import ArrowRightIcon from "../../../../../../assets/img/icons/arrow-up-right.svg";
import {useBadges} from "../../../../../../contexts/BadgeContext";
import EmptyPage from "../../../../../fragments/EmptyPage";
import {workflow_states} from "../../../../../../App";

/**
 * The action button for each badge in the list.
 * @param {Object} data - The merged badge information
 * @param {boolean} view - True for Resource Provider View, False for Researcher View
 * @param {string} state - The status of the badge
 */
function ListAction({data, view, state}) {
    const navigate = useNavigate();
    const {resourceId} = useParams();
    const resourceNameWithoutSpaces = data.resource_name.replace(/\s+/g, '');

    const handleBadgeClick = () => {
        navigate(`/resourceBadge/${resourceId}/${data.badge_id}`);
    };

    return (
        <div>
            {view ? (
                <button className="btn list-action" onClick={handleBadgeClick}>
                    Badge Details
                    <img src={ArrowRightIcon} style={{color: '#107180'}}/>
                </button>
            ) : (
                <div>
                    <button className="btn list-action"
                            data-bs-toggle="modal"
                            data-bs-target={`#ResourceBadgeModal${resourceNameWithoutSpaces}${data.badge_id}`}>
                        Badge Action
                        <img src={ArrowRightIcon} style={{color: '#107180'}}/>
                    </button>
                    <ResearcherModal id={`ResourceBadgeModal${resourceNameWithoutSpaces}${data.badge_id}`} name={data.name}
                                     state={state}
                                     actionUrl={data.badge_access_url || data.default_badge_access_url}
                                     actionText={data.badge_access_url_label || data.default_badge_access_url_label}
                                     description={data.researcher_summary}
                                     resourceName={data.resource_name}/>
                </div>
            )}
        </div>
    );
}

/**
 * A list of badges on the resource detail page.
 * @param {Array<RoadmapBadge> || Array<CombinedBadge>} data - The badge information got from roadmapBadges
 * @param {boolean} view - True for Resource Provider View, False for Researcher View
 * @param {boolean} noCriteria - True to not show the criteria column
 */
export default function BadgeList({data, view, noCriteria}) {
    const {badges} = useBadges();
    const graphic = placeholder; // TODO: Replace with the actual badge graphic

    const labelTitle = (status) => {
        switch (status) {
            case workflow_states.VERIFIED:
                return "Available";
            case workflow_states.PLANNED:
            case workflow_states.TASK_COMPLETED:
            case workflow_states.VERIFICATION_FAILED:
                return "Unverified";
            case workflow_states.DEPRECATED:
            case workflow_states.NOT_PLANNED:
            default:
                return "Not Available";
        }
    };

    const labelStyle = (status) => {
        if (!status || status === workflow_states.DEPRECATED || status === workflow_states.NOT_PLANNED) {
            return {color: "#232323"};
        }
        return {};
    }

    // combining the badge information from badges with the badge information from roadmapBadges
    const mergedData = data.map(item => {
        const badgeDetails = badges.find(b => b.badge_id === item.badge_id);
        return badgeDetails ? {
            ...item,
            ...badgeDetails
        } : item;
    }).filter(item => item.badge_id);

    return (
        <div className="container-fluid resource-badge-list-wrapper">
            {mergedData.length === 0 ?
                <EmptyPage text={"No Available Badges"} style={{ minHeight: "240px" }}/> :
                <table className="table table-hover resource-badge-list">
                    <thead>
                    <tr>
                        <th scope="col" className="col-img"></th>
                        <th scope="col" className="col-name">Badge Name</th>
                        <th scope="col" className="col-description">Badge Description</th>
                        {view && !noCriteria && <th scope="col" className="col-criteria">Criteria</th>}
                        <th scope="col" className="col-status">Badge Status</th>
                        <th scope="col" className="col-plan">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mergedData.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td className="col-1" style={{textAlign: 'center'}}>
                                <img src={graphic} className="badge-list-img" alt={item.name}/>
                            </td>
                            <td className="col-2">
                                <div className="badge-list-name">
                                    {item.name}
                                </div>
                            </td>
                            <td className="col-4">
                                <div className="badge-list-description">
                                    {view ? item.resource_provider_summary : item.researcher_summary}
                                </div>
                            </td>
                            {view && !noCriteria && <td className="col-1">{item.required ? "Required" : "Optional"}</td>}
                            <td className="col-2">
                                {view ?
                                    <StatusTag title={item.state}/>
                                    :
                                    <LabelTag title={labelTitle(item.state)}
                                              verified={item.state === workflow_states.VERIFIED}
                                              style={labelStyle(item.state)}/>
                                }
                            </td>
                            <td className="col-2">
                                <ListAction data={item}
                                            view={view}
                                            state={item.state}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>}
        </div>
    );
}