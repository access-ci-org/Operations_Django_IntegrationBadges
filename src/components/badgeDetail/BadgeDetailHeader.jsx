export default function BadgeDetailHeader({resource}) {
    return (
        <div className="header-wrapper">
            <div className="title-wrapper">
                <h1>{resource.resource_descriptive_name}</h1>
                <a href={resource.organization_url}>{resource.cider_type} Resource</a>
            </div>
            <div>

            </div>
        </div>
    );
}