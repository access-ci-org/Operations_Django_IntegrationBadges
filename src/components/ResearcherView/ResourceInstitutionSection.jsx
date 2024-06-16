import ResourceCard from "./ResourceCard/ResourceCard";

function TitleSection({data}) {
    return (
        <div className="resource-inst-title">
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <h2 className="resource-inst-name">{data.institution}</h2>
                <h2 className="resource-inst-resource-count">({data.count})</h2>
            </div>
            <button className="btn resource-inst-view-all">View All</button>
        </div>
    );
}

export default function ResourceInstitutionSection({data}) {
    return (
        <div className="resource-inst-section">
            <TitleSection data={data}/>
            <div className="row row-cols-auto">
                {data.resources.map((resource, index) => (
                    <div key={index} className="col">
                        <ResourceCard data={resource}/>
                    </div>
                ))}
            </div>
        </div>
    );
}