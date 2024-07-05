import placeholder from "../../../../../assets/img/placeholder_badge.png";
import ResourceBadgeTopTag from "./ResourceBadgeTopTag";
import {useNavigate, useParams} from "react-router-dom";
import ResearcherModal from "../../../../fragments/ResearcherModal";
import StatusTag from "../../../../fragments/StatusTag";

function ResourceBadgeAction({data, selectedView}) {
    const navigate = useNavigate();
    const {resourceId} = useParams();
    let action = "";
    if (data.status === "NotStarted" || data.status === "Deprecated") {
        action = "View Badge Details";
    } else {
        action = "Complete tasks";
    }

    const handleBadgeClick = () => {
        navigate(`/resourceBadge/${resourceId}/${data.id}`);
    };

    return (
        <div>
            {selectedView ? (
                <button className="btn btn-medium resource-badge-action" onClick={handleBadgeClick}>
                    {action}
                </button>
            ) : (
                <div>
                    <button className="btn btn-medium resource-badge-action" data-bs-toggle="modal"
                            data-bs-target={`#ResourceBadgeModal${data.id}`}>
                        Badge Action
                    </button>
                    <ResearcherModal id={`ResourceBadgeModal${data.id}`} name={data.name} status={data.status}
                                     actionText={data.actionText} description={data.description}
                                     actionUrl={data.actionUrl} source={data.source}/>
                </div>
            )}
        </div>
    );
}

export default function ResourceBadge({data, selectedView}) {
    return (
        <div className="card resource-badge">
            <div style={{position: 'relative'}}>
                {(data.required && selectedView) &&
                    <ResourceBadgeTopTag required={true}/>}
                {!selectedView &&
                    <ResourceBadgeTopTag title={data.status}/>}
                <img src={placeholder} className="card-img-top" alt={data.name}/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text">{data.description}</p>
                {selectedView &&
                    <div className="resource-badge-tag-section">
                        <StatusTag title={data.status}/>
                    </div>
                }
                {((data.status !== "Verified" && selectedView) || (!selectedView)) && (
                    <ResourceBadgeAction
                        data={data}
                        selectedView={selectedView}
                    />
                )}
            </div>
        </div>
    );
}