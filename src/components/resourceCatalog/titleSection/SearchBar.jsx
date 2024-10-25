import React from "react";
import SearchIcon from "../../../assets/img/icons/search.svg";

export default function SearchBar({onSearch}) {

    const handleInputChange = (event) => {
        const searchTerm = event.target.value;
        onSearch(searchTerm);
    };

    return (
        <div className="input-group search-bar-wrapper">
            <span className="input-group-text" id="inputGroup-icon">
                <SearchIcon className="search-icon"/>
            </span>
            <input
                type="text"
                className="form-control search-bar"
                aria-label="Search resources"
                placeholder="Search by Institution, Resource, Type, or Badge..."
                onChange={handleInputChange}
            />
        </div>
    );
}