import ResourceCard from "./resourceCard/ResourceCard";
import {useState} from "react";

/**
 * Title section of an organization.
 * @param {string} name - Name of the organization.
 * @param {number} count - Number of resources under that organization.
 * @param {Function} onToggleViewAll - Function to toggle view all resources.
 * @param viewAll - Boolean to determine if all resources are visible.
 */
function TitleSection({name, count, onToggleViewAll, viewAll}) {
    return (
        <div className="resource-inst-title">
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <h2 className="resource-inst-name">{name}</h2>
                <h2 className="resource-inst-resource-count">({count})</h2>
            </div>
            <button className="btn resource-inst-view-all" onClick={onToggleViewAll}>
                {viewAll ? "Collapse" : "View All"}
            </button>
        </div>
    );
}

/**
 * A section on the resource catalog page that displays all resources under an organization.
 * @param {Object} institution - Contains all resources that belongs to that organization.
 */
export default function ResourceSection({institution}) {
    const [viewAll, setViewAll] = useState(false);

    // sort resources by descriptive name
    const sortedResources = institution.resources.sort((a, b) =>
        a.resource_descriptive_name.localeCompare(b.resource_descriptive_name)
    );

    const visibleResources = viewAll ? sortedResources : sortedResources.slice(0, 5);
    const toggleViewAll = () => setViewAll(!viewAll);

    return (
        <div className="resource-inst-section">
            <TitleSection name={institution.organization_name}
                          count={institution.resources.length}
                          onToggleViewAll={toggleViewAll}
                          viewAll={viewAll}/>
            <div className="row row-cols-auto">
                {visibleResources.map((resource, index) => (
                    <div key={index} className="col">
                        <ResourceCard resource={resource}/>
                    </div>
                ))}
            </div>
        </div>
    );
}