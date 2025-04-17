import {Link} from "react-router-dom";

export default function ResourceCard({organization, resource, badges = [], inProgress = false, showViewButton = true}) {
    return <div className="w-100 resource-card p-2">
        <div className="w-100 bg-light p-1 resource-card-header">
            <div className="w-100 ps-2 resource-card-header-actions">
                {!inProgress && <Link to={`/resources/${resource.info_resourceid}/edit`}
                                      className="btn btn-link">
                    Edit
                </Link>}
            </div>
            <h3 className="w-100">{resource.resource_descriptive_name}</h3>
            <div className="resource-card-header-thumbnail">
                <div className="bg-white background-image-center-no-repeat resource-icon-circle-small"
                     style={{backgroundImage: `url(${organization.other_attributes.organization_logo_url})`}}>
                </div>
                <div className="p-2 text-secondary">{resource.cider_type}</div>
            </div>
        </div>
        <div className="w-100 resource-card-body">
            <div className=" w-100 resource-card-badge-list d-flex flex-row">
                {badges && badges.slice(0, 3).map(badge => {
                    return <div className="background-image-center-no-repeat badge-icon-small"
                                key={badge.badge_id}
                                style={{backgroundImage: `url(${badge.graphic})`, width: 40, height: 40}}>
                    </div>
                })}
                {badges && badges.length > 3 && <div>
                    <Link to={`/resources/${resource.info_resourceid}`}
                          className="btn btn-link text-secondary p-2 text-decoration-none">
                        +{badges.length - 3}
                    </Link>
                </div>}
            </div>

            <p className="w-100">
                {resource.resource_description}
            </p>
        </div>

        {showViewButton && !!inProgress &&
            <Link to={`/resources/${resource.info_resourceid}/edit`} className="btn btn-dark w-100">
                Continue Setup
            </Link>}

        {showViewButton && !inProgress &&
            <Link to={`/resources/${resource.info_resourceid}`} className="btn btn-dark w-100">
                View
            </Link>}

    </div>
}
