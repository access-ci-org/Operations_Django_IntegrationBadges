import placeholder from "../../../../../../assets/img/placeholder_badge.png";
import StatusTag from "../../../../../fragments/StatusTag";
import LabelTag from "../../../../../fragments/LabelTag";
import {useNavigate, useParams} from "react-router-dom";
import ResearcherModal from "../../../../../fragments/ResearcherModal";
import {ReactComponent as ArrowRightIcon} from "../../../../../../assets/img/icons/arrow-up-right.svg";
import {useBadges} from "../../../../../../contexts/BadgeContext";

/**
 * The action button for each badge in the list.
 * @param {Object} data - The merged badge information
 * @param view - True for Resource Provider View, False for Researcher View
 * @param {string} status - The status of the badge
 * TODO: find out how to retrieve resource name, actionUrl, and actionText
 */
function ListAction({data, view, status}) {
    const navigate = useNavigate();
    const {resourceId} = useParams();

    const handleBadgeClick = () => {
        navigate(`/resourceBadge/${resourceId}/${data.badge_id}`);
    };

    return (
        <div>
            {view ? (
                <button className="btn list-action" onClick={handleBadgeClick}>
                    Badge Details
                    <ArrowRightIcon style={{color: '#107180'}}/>
                </button>
            ) : (
                <div>
                    <button className="btn list-action" data-bs-toggle="modal"
                            data-bs-target={`#ResourceBadgeModal${data.badge_id}`}>
                        Badge Action
                        <ArrowRightIcon style={{color: '#107180'}}/>
                    </button>
                    <ResearcherModal id={`ResourceBadgeModal${data.badge_id}`} name={data.name}
                                     status={status} actionText={data.default_badge_access_url_label}
                                     description={data.researcher_summary}
                                     actionUrl={data.default_badge_access_url} resourceName={"placeholder"}/>
                </div>
            )}
        </div>
    );
}

/**
 * A list of badges on the resource detail page.
 * @param {Object} data - The badge information got from roadmapBadges
 * @param view - True for Resource Provider View, False for Researcher View
 */
export default function BadgeList({data, view}) {
    const {badges} = useBadges();

    const labelTitle = (status) => {
        switch (status) {
            case "Verified":
                return "Available";
            case "Planned":
            case "TaskCompleted":
            case "VerificationFailed":
                return "Unverified";
            case "NotStarted":
            case "Deprecated":
            case "NotPlanned":
            default:
                return "Not Available";
        }
    };

    const labelStyle = (status) => {
        if (!status || status === "NotStarted" || status === "Deprecated" || status === "NotPlanned") {
            return {color: "#232323"};
        }
        return {};
    }

    const mergedData = data.map(item => ({
        ...item,
        badge: badges.find(b => b.badge_id === item.badge.badge_id)
    })).filter(item => item.badge);

    return (
        <div className="container-fluid resource-badge-list-wrapper">
            <table className="table table-hover resource-badge-list">
                <thead>
                <tr>
                    <th scope="col" className="col-img"></th>
                    <th scope="col" className="col-name">Badge Name</th>
                    <th scope="col" className="col-description">Badge Description</th>
                    {view && <th scope="col" className="col-criteria">Criteria</th>}
                    <th scope="col" className="col-status">Badge Status</th>
                    <th scope="col" className="col-plan">Action</th>
                </tr>
                </thead>
                <tbody>
                    {mergedData.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td className="col-1" style={{textAlign: 'center'}}>
                                <img src={placeholder} className="badge-list-img" alt={item.badge.name}/>
                            </td>
                            <td className="col-2">
                                <div className="badge-list-name">
                                    {item.badge.name}
                                </div>
                            </td>
                            <td className="col-4">
                                <div className="badge-list-description">
                                    {view ? item.badge.resource_provider_summary : item.badge.researcher_summary}
                                </div>
                            </td>
                            {view && <td className="col-1">{item.required ? "Required" : "Optional"}</td>}
                            <td className="col-2">
                                {view ?
                                    <StatusTag title={item.status}/>
                                    :
                                    <LabelTag title={labelTitle(item.status)}
                                              style={labelStyle(item.status)}/>
                                }
                            </td>
                            <td className="col-2">
                                <ListAction data={item.badge} view={view} status={item.status}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}