const ListofFeatures = ["Allocated by ACCESS", "Support for Science Gateways",
    "Single entry Point for running Jobs and workflows", "ACCESS Allocated  resources",
    "Support for Science Gateways", "Single entry Point for running Jobs and workflows",
    "ACCESS Allocated  resources", "Support for Science Gateways"];

function FeatureBadge({name}) {
    return (
        <span className="badge feature-badge">{name}</span>
    );
}

function FeatureList({data}) {
    return (
        <div style={{paddingBottom: '8px'}}>
            <p style={{marginBottom: '16px', color: "#3f3f3f", fontWeight: '500'}}>
                Features are:</p>
            <div className="badge-container">
                {ListofFeatures.map((feature, index) => (
                    <FeatureBadge key={index} name={feature}/>
                ))}
            </div>
        </div>
    );
}

function TypeBlock({name, value}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <p style={{ color: '#707070' }}>{name}</p>
            <p style={{ color: '#232323', fontWeight: '500' }}>{value}</p>
        </div>
    );
}


export default function ResourceCardFeatures({data}) {
    return (
        <div>
            <FeatureList data={data}/>
            <div className="resource-type-container">
                <div style={{ display: 'flex', gap: '32px' }}>
                    <TypeBlock name="Resource Type" value={data.type}/>
                    <TypeBlock name="Status" value={data.status}/>
                </div>
                <button className={"btn btn-dark"}
                        style={{padding: '8px', borderRadius: '4px', fontSize: '14px'}}>View User Guide</button>
            </div>
        </div>
    );
}