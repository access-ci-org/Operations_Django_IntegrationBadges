import ResourceDetailHeader from "./BasicInfoSection/ResourceDetailHeader";

export default function ResourceDetailRPView({data}) {
    return (
        <div className="resource-detail-rp-view">
            <ResourceDetailHeader data={data}/>
            <button className="btn btn-dark resource-detail-rp-view">View User Guide</button>
        </div>
    );
}