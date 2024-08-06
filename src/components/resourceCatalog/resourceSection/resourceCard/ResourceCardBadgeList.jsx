import placeholder from "../../../../assets/img/placeholder_badge.png";
import LabelTag from "../../../fragments/LabelTag";
import ResearcherModal from "../../../fragments/ResearcherModal";
import {ReactComponent as ArrowRightIcon} from "../../../../assets/img/icons/arrow-up-right.svg";
import {useBadges} from "../../../../contexts/BadgeContext";
import EmptyPage from "../../../fragments/EmptyPage";
import {workflow_states} from "../../../../App";
import ReactDOM from "react-dom";

/**
 * The action button for each badge in the list.
 * @param {Object} data - The merged badge information
 * @param {string} state - The status of the badge
 * @param {string} resource_name - The name of the resource
 */
function ListAction({data, state, resource_name}) {
    const resourceNameWithoutSpaces = resource_name.replace(/\s+/g, '');

    const modal = (
        <ResearcherModal id={`ResourceCardBadgeListModal${resourceNameWithoutSpaces}${data.badge_id}`} name={data.name}
                         state={state} actionText={data.default_badge_access_url_label}
                         description={data.researcher_summary}
                         actionUrl={data.default_badge_access_url} resourceName={resource_name}/>
    );

    return (
        <div>
            <button className="btn list-action"
                    data-bs-toggle="modal"
                    data-bs-target={`#ResourceCardBadgeListModal${resourceNameWithoutSpaces}${data.badge_id}`}>
                Badge Action
                <ArrowRightIcon style={{color: '#107180'}}/>
            </button>
            {ReactDOM.createPortal(modal, document.body)}
        </div>
    );
}

/**
 * A list of badges on the resource catalog page, adopted from BadgeList.jsx for resource detail page.
 * @param {RoadmapBadge} data - The badge information got from roadmapBadges
 */
export default function ResourceCardBadgeList({data}) {
    const {badges} = useBadges();
    const graphic = placeholder; // TODO: replace with badge graphic

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
                <EmptyPage text={"No Resource Badges"} style={{minHeight: "240px"}}/> :
                <table className="table table-hover resource-badge-list">
                    <thead>
                    <tr>
                        <th scope="col" className="col-img"></th>
                        <th scope="col" className="col-name">Badge Name</th>
                        <th scope="col" className="col-description">Badge Description</th>
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
                                    {item.researcher_summary}
                                </div>
                            </td>
                            <td className="col-2">
                                <LabelTag title={labelTitle(item.state)}
                                          style={labelStyle(item.state)}/>
                            </td>
                            <td className="col-2">
                                <ListAction data={item}
                                            state={item.state}
                                            resource_name={item.resource_name}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>}
        </div>
    );
}