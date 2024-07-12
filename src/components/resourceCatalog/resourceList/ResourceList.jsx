import ResourceCard from "./resourceSection/resourceCard/ResourceCard";
import ResourceSection from "./resourceSection/ResourceSection";

export function ResourceList({resources}) {
    return (
        <div className="container-fluid resource-list">
            {resources.map((institution, index) => (
                <ResourceSection key={index} institution={institution}/>
            ))}
        </div>
    )
}