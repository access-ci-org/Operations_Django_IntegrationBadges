import React from "react";

export default function DropDownFilter({data, selected, setSelected, disabled}) {
    return (
        <div className="dropdown-filter">
            <button className={disabled ? "btn dropdown-toggle disabled" : "btn dropdown-toggle"}
                    type="button"
                    data-bs-toggle="dropdown"
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