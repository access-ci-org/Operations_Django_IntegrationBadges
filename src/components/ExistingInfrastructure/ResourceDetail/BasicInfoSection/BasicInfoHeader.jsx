import jetStream2 from '../../../../assets/img/jetstream2_logo.png';

export default function BasicInfoHeader({data}) {
    return (
        <div className="resource-detail-header">
            <div className="resource-detail-header-info">
                <div className="resource-detail-header-title">
                    <h1>{data.name}</h1>
                    <h3>By <a href={data.institutionUrl}>{data.institution}</a></h3>
                </div>
                <div className="resource-detail-header-subtitle">
                    <div className="resource-detail-header-subtitle-item">
                        <p>Resource Type</p>
                        <p>{data.type}</p>
                    </div>
                    <div className="resource-detail-header-subtitle-item">
                        <p>Latest Status</p>
                        <p>{data.status}</p>
                    </div>
                    <div className="resource-detail-header-subtitle-item">
                        <p>Global Resource ID</p>
                        <p>{data.globalResourceId}</p>
                    </div>
                </div>
            </div>
            <div className="resource-detail-header-img">
                <img src={jetStream2} alt={data.institution}/>
            </div>
        </div>
    );
}