const ListofFeatures = ["Allocated by ACCESS", "Support for Science Gateways",
    "Single entry Point for running Jobs and workflows", "ACCESS Allocated  resources",
    "Support for Science Gateways", "Single entry Point for running Jobs and workflows",
    "ACCESS Allocated  resources", "Support for Science Gateways"];

function FeatureBadge({name}) {
    return (
        <span className="badge feature-badge">{name}</span>
    );
}

export default function ResourceDetailFeatures({data}) {
    return (
        <div className="feature-section">
            <h2>Features</h2>
            <div className="badge-container">
                {ListofFeatures.map((feature, index) => (
                    <FeatureBadge key={index} name={feature}/>
                ))}
            </div>
        </div>
    );
}