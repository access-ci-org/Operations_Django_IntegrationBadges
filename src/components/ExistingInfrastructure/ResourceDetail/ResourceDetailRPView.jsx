import ResourceDetailHeader from "./BasicInfoSection/ResourceDetailHeader";
import ResourceDetailFeatures from "./BasicInfoSection/ResourceDetailFeatures";
import ResourceBadgeSection from "./ResourceBadgeSection/ResourceBadgeSection";

function DescriptionSection({data}) {
    return (
        <div className="description-section">
            <h2 className="description-title">Overview</h2>
            <p className="description-text">
                {data.description}
            </p>
        </div>
    );
}

function FeatureSection({data}) {
    return (
        <ResourceDetailFeatures data={data}/>
    );
}

export default function ResourceDetailRPView({data}) {
    return (
        <div className="resource-detail-rp-view">
            <ResourceDetailHeader data={data}/>
            <button className="btn btn-dark resource-detail-rp-view-btn">View User Guide</button>
            <DescriptionSection data={data}/>
            <FeatureSection data={data}/>
            <ResourceBadgeSection data={data}/>
        </div>
    );
}