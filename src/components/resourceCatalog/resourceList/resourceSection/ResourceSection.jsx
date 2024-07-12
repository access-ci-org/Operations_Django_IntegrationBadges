import ResourceCard from "./resourceCard/ResourceCard";
import {useState} from "react";
import {useBadges} from "../../../../contexts/BadgeContext";

function TitleSection({data, onToggleViewAll, viewAll}) {
    return (
        <div className="resource-inst-title">
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <h2 className="resource-inst-name">{data.organization_name}</h2>
                <h2 className="resource-inst-resource-count">({data.resources.length})</h2>
            </div>
            <button className="btn resource-inst-view-all" onClick={onToggleViewAll}>
                {viewAll ? "Collapse" : "View All"}
            </button>
        </div>
    );
}


export default function ResourceSection({institution}) {
    const [viewAll, setViewAll] = useState(false);
    const { badges } = useBadges();

    const visibleResources = viewAll ? institution.resources : institution.resources.slice(0, 5);
    const toggleViewAll = () => setViewAll(!viewAll);

    return (
        <div className="resource-inst-section">
            <TitleSection data={institution} onToggleViewAll={toggleViewAll} viewAll={viewAll}/>
            <div className="row row-cols-auto">
                {visibleResources.map((resource, index) => (
                    <div key={index} className="col">
                        <ResourceCard resource={resource} badges={badges}/>
                    </div>
                ))}
            </div>
        </div>
    );
}