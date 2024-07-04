import React, {useState} from "react";
import { ReactComponent as SearchIcon } from "../../../../assets/img/icons/search.svg";

function SearchBar() {
    return (
        <div className="input-group search-bar-wrapper">
            <span className="input-group-text" id="inputGroup-icon">
                <SearchIcon className="search-icon" />
            </span>
            <input type="text" className="form-control search-bar" aria-label="Search resources"
                   placeholder="Search Resource by Name, Type, Badge, etc" />
        </div>
    );
}

function DropDownFilter({data, selected, setSelected}) {
    return (
        <div className="dropdown-filter">
            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                {selected}
            </button>
            <ul className="dropdown-menu">
                {data.map((item, index) => (
                    <li key={index} onClick={() => setSelected(item)}>
                        <p className="dropdown-item">{item}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const resourceStatus = ["Active Resources", "Upcoming Resources", "All Resources"];
const resourceType = ["All Types", "Data", "Software", "Service", "Hardware"];
const resourceOrganization = ["All Organizations", "Organization 1", "Organization 2", "Organization 3"];
const resourceBadge = ["All Badges", "Badge 1", "Badge 2", "Badge 3"];

export default function CatalogSearch() {
    const [selectedStatus, setSelectedStatus] = useState(resourceStatus[0]);
    const [selectedType, setSelectedType] = useState(resourceType[0]);
    const [selectedOrganization, setSelectedOrganization] = useState(resourceOrganization[0]);
    const [selectedBadge, setSelectedBadge] = useState(resourceBadge[0]);

    return (
        <div className="search-section-wrapper">
            <SearchBar/>
            <div className="filter-section">
                <p>Filters</p>
                <DropDownFilter data={resourceStatus} selected={selectedStatus} setSelected={setSelectedStatus}/>
                <DropDownFilter data={resourceType} selected={selectedType} setSelected={setSelectedType}/>
                <DropDownFilter data={resourceOrganization} selected={selectedOrganization}
                                setSelected={setSelectedOrganization}/>
                <DropDownFilter data={resourceBadge} selected={selectedBadge} setSelected={setSelectedBadge}/>
            </div>
        </div>
    );
}