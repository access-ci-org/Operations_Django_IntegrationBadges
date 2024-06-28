import placeholder from "../../../../../../assets/img/placeholder_badge.png";
import ResourceBadgeRPTag from "./ResourceBadgeRPTag";
import ResourceBadgeTopTag from "./ResourceBadgeTopTag";

function ResourceBadgeAction({url, text, selectedView, status}) {
    let action = text;
    if (status === "NotStarted") {
        action = "Plan this badge";
    } else {
        action = "Complete tasks";
    }

    return (
        <button className="btn btn-dark resource-badge-action">
            {selectedView ? action : "Badge Action"}
        </button>
    );
}

export default function ResourceBadge({data, selectedView}) {
    return (
        <div className="card resource-badge">
            <div style={{ position: 'relative' }}>
                {(data.required && selectedView) &&
                    <ResourceBadgeTopTag required={true} />}
                {!selectedView &&
                    <ResourceBadgeTopTag title={data.status}/>}
                <img src={placeholder} className="card-img-top" alt={data.name}/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text">{data.description}</p>
                {selectedView &&
                    <div className="resource-badge-tag-section">
                        <ResourceBadgeRPTag title={data.status}/>
                    </div>
                }
                {((data.status !== "Verified" && selectedView) || (!selectedView)) && (
                    <ResourceBadgeAction
                        url={data.actionUrl}
                        text={data.actionText}
                        selectedView={selectedView}
                        status={data.status}
                    />
                )}
            </div>
        </div>
    );
}