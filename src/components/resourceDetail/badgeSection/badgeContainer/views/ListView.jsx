import placeholder from "../../../../../assets/img/placeholder_badge.png";
import StatusTag from "../../../../fragments/StatusTag";
import {useNavigate, useParams} from "react-router-dom";
import ResearcherModal from "../../../../fragments/ResearcherModal";
import LabelTag from "../../../../fragments/LabelTag";
import {ReactComponent as ArrowRightIcon} from "../../../../../assets/img/icons/arrow-up-right.svg";

function ListAction({data, view}) {
    const navigate = useNavigate();
    const {resourceId} = useParams();

    const handleBadgeClick = () => {
        navigate(`/resourceBadge/${resourceId}/${data.id}`);
    };

    return (
        <div>
            {view ? (
                <button className="btn list-action" onClick={handleBadgeClick}>
                    View Badge Details
                    <ArrowRightIcon style={{color: '#107180'}}/>
                </button>
            ) : (
                <div>
                    <button className="btn list-action" data-bs-toggle="modal"
                            data-bs-target={`#ResourceBadgeModal${data.id}`}>
                        Badge Action
                        <ArrowRightIcon style={{color: '#107180'}}/>
                    </button>
                    <ResearcherModal id={`ResourceBadgeModal${data.id}`} name={data.name} status={data.status}
                                     actionText={data.actionText} description={data.description}
                                     actionUrl={data.actionUrl} source={data.source}/>
                </div>
            )}
        </div>
    );
}

function List({badges, view}) {

    const labelTitle = (status) => {
        if (status === "Verified") {
            return "Available";
        } else if (status === "Planned" || status === "TaskCompleted" || status === "VerificationFailed") {
            return "Unverified";
        } else if (status === "NotStarted" || status === "Deprecated" || status === "NotPlanned") {
            return "Not Available";
        }
    }

    const labelStyle = (status) => {
        if (status === "NotStarted" || status === "Deprecated" || status === "NotPlanned") {
            return {color: "#232323"};
        }
    }

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
                {badges.map((badge, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td className="col-1" style={{textAlign: 'center'}}>
                            <img src={placeholder} className="badge-list-img" alt={badge.name}/>
                        </td>
                        <td className="col-2">
                            <div className="badge-list-name">
                                {badge.name}
                            </div>
                        </td>
                        <td className="col-4">
                            <div className="badge-list-description">{badge.description}</div>
                        </td>
                        {view && <td className="col-1">{badge.required ? "Required" : "Optional"}</td>}
                        {view ? (
                            <td className="col-2"><StatusTag title={badge.status}/></td>)
                            : (
                            <td className="col-2">
                                <LabelTag title={labelTitle(badge.status)}
                                          verified={badge.status === "Verified"}
                                          style={labelStyle(badge.status)}/>
                            </td>
                        )}
                        <td className="col-3">
                            <ListAction data={badge} view={view}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default function ListView({recommendedBadges, plannedBadges, achievedBadges, selectedView, activeTab}) {
    return (
        <div className="tab-content resource-badge-container-content" id="resource-badges-tabContent">
            <div className={`tab-pane fade ${activeTab === 'recommended' ? 'show active' : ''}`}
                 id="resource-badge-container-recommended-tab" role="tabpanel"
                 aria-labelledby="resource-badge-container-recommended-tab" tabIndex="0">
                {selectedView ?
                    <List badges={recommendedBadges} view={selectedView}/>
                    :
                    <List badges={achievedBadges} view={selectedView}/>
                }
            </div>
            <div className={`tab-pane fade ${activeTab === 'planned' ? 'show active' : ''}`}
                 id="resource-badge-container-planned-tab" role="tabpanel"
                 aria-labelledby="resource-badge-container-planned-tab" tabIndex="0">
                {selectedView ?
                    <List badges={plannedBadges} view={selectedView}/>
                    :
                    <List badges={plannedBadges.concat(recommendedBadges)} view={selectedView}/>
                }
            </div>
            {selectedView &&
                <div className={`tab-pane fade ${activeTab === 'achieved' ? 'show active' : ''}`}
                     id="resource-badge-container-achieved-tab" role="tabpanel"
                     aria-labelledby="resource-badge-container-achieved-tab" tabIndex="0">
                    <List badges={achievedBadges} view={selectedView}/>
                </div>
            }
        </div>
    );
}