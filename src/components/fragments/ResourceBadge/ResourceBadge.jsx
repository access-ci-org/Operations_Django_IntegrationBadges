import placeholder from "../../../assets/img/placeholder_badge.png";
import StatusTag from "../StatusTag";
import {useNavigate, useParams} from "react-router-dom";
import ResearcherModal from "../ResearcherModal";
import ResourceBadgeTopTag from "./ResourceBadgeTopTag";

function ResourceBadgeAction({data, view}) {
    const navigate = useNavigate();
    const {resourceId} = useParams();

    const handleBadgeClick = () => {
        navigate(`/resourceBadge/${resourceId}/${data.id}`);
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

// TODO: replace the placeholder with the actual badge image
/**
 * A badge card that displays the basic info of a badge model.
 * @param data - the badge model
 * @param view - true if under RP view, false if under researcher view
 */
export default function ResourceBadge({data, view}) {
    return (
        <div className="card resource-badge">
            <div style={{position: 'relative'}}>
                {(data.required && view) &&
                    <ResourceBadgeTopTag required={true}/>}
                {!view &&
                    <ResourceBadgeTopTag title={data.status}/>}
                <img src={placeholder} className="card-img-top" alt={data.name}/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text">{data.description}</p>
                {view &&
                    <div className="resource-badge-tag-section">
                        <StatusTag title={data.status}/>
                    </div>
                }
                <ResourceBadgeAction data={data} view={view}/>
            </div>
        </div>
    );
}