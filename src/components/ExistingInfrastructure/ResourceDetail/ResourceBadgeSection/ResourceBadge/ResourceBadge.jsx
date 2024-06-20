import placeholder from "../../../../../assets/img/placeholder_badge.png";

function ResourceBadgeRequiredTag() {
    return (
        <div className="resource-badge-required-tag">Required</div>
    );
}

export default function ResourceBadge({data}) {
    return (
        <div className="card resource-badge">
            <div style={{ position: 'relative' }}>
                <ResourceBadgeRequiredTag />
                <img src={placeholder} className="card-img-top" alt={data.name}/>
            </div>
            <div className="card-body">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text">{data.description}</p>
                <a href={data.actionUrl} className="btn btn-dark">{data.actionText}</a>
            </div>
        </div>
    );
}