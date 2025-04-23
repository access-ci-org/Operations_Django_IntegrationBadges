import {Link} from "react-router-dom";

export default function ResourceCard({organization, resource, inProgress = false, showViewButton = true}) {
    return <div className="w-100 h-100 resource-card p-2 d-flex flex-column">
        <div className="w-100 bg-light p-1 resource-card-header">
            <div className="w-100 ps-2 resource-card-header-actions">
                {!inProgress && <Link to={`/resources/${resource.info_resourceid}/edit`}
                                      className="btn btn-link text-medium">
                    Edit
                </Link>}
            </div>
            <h3 className="w-100 text-black">{resource.resource_descriptive_name}</h3>
        </div>
        <div className="w-100 p-1 resource-card-sub-header">
            <strong className="text-medium">{resource.cider_type}</strong>
            <div className="resource-card-header-thumbnail">
                <div className="bg-white background-image-center-no-repeat resource-icon-circle-small"
                     style={{backgroundImage: `url(${organization.other_attributes.organization_logo_url})`}}>
                </div>
            </div>
        </div>
        <div className="w-100 p-1 pt-4 flex-fill resource-card-body">
            <p className="w-100">
                {resource.resource_description}
            </p>
        </div>
        <div className="w-100">
            {showViewButton && !!inProgress &&
                <div className="p-1">
                    <Link to={`/resources/${resource.info_resourceid}/edit`} className="btn btn-dark w-100">
                        Continue Setup
                    </Link>
                </div>}

            {showViewButton && !inProgress && resource.roadmaps && resource.roadmaps.map((roadmap, roadmapIndex) => {
                return <div className="p-1" key={roadmapIndex}>
                    <Link to={`/resources/${resource.info_resourceid}/roadmaps/${roadmap.roadmap.roadmap_id}`}
                          className={`btn ${roadmapIndex === 0 ? 'btn-dark' : 'btn-outline-dark'} rounded-5 w-100`}>
                        {roadmap.roadmap.name}
                    </Link>
                </div>
            })}
        </div>
    </div>
}
