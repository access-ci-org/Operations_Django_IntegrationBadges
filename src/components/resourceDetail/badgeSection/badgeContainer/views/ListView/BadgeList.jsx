import placeholder from "../../../../../../assets/img/placeholder_badge.png";
import StatusTag from "../../../../../fragments/StatusTag";
import LabelTag from "../../../../../fragments/LabelTag";
import {useNavigate, useParams} from "react-router-dom";
import ResearcherModal from "../../../../../fragments/ResearcherModal";
import {ReactComponent as ArrowRightIcon} from "../../../../../../assets/img/icons/arrow-up-right.svg";

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
                    Badge Details
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

export default function BadgeList({badges, view}) {

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
                        <td className="col-2">
                            <ListAction data={badge} view={view}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}