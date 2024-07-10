import jetStream2 from '../../../assets/img/jetstream2_logo.png';

export default function BasicInfoHeader({resource}) {
    return (
        <div className="resource-detail-header">
            <div className="resource-detail-header-info">
                <div className="resource-detail-header-title">
                    <h1>{resource.resource_descriptive_name}</h1>
                    <h3>By <a href={resource.organization_url}>{resource.organization_name}</a></h3>
                </div>
                <div className="resource-detail-header-subtitle">
                    <div className="resource-detail-header-subtitle-item">
                        <p>Resource Type</p>
                        <p>{resource.cider_type}</p>
                    </div>
                    <div className="resource-detail-header-subtitle-item">
                        <p>Latest Status</p>
                        <p>{resource.latest_status}</p>
                    </div>
                    <div className="resource-detail-header-subtitle-item">
                        <p>Global Resource ID</p>
                        <p>{resource.info_resourceid}</p>
                    </div>
                </div>
            </div>
            <div className="resource-detail-header-img">
                <img src={resource.organization_logo_url ? resource.organization_logo_url : jetStream2}
                     alt={resource.organization_name}/>
            </div>
        </div>
    );
}