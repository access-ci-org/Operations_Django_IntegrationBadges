import React, {useState} from 'react';
import ResourceCardHeader from "./ResourceCardHeader";
import ResourceCardBadge from "./ResourceCardBadge";
import {useNavigate} from "react-router-dom";

export default function ResourceCard({data}) {
    const count = data.badges.length;
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/resourceDetail/${data.id}`);
    };

    return (
        <div className="card resource-card" onClick={handleCardClick}>
            <ResourceCardHeader data={data}/>
            <div className="card-body-wrapper">
                <div className="card-body">
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <p className="resource-title">{data.name}</p>
                        <p className="resource-type">{data.type} Resource</p>
                    </div>
                    <p className="card-text">
                        {data.description}
                    </p>
                    <div className="badge-container">
                        {data.badges.slice(0, count > 4 ? 4 : count).map((badge, index) => (
                            <ResourceCardBadge key={index} data={badge} index={index}/>
                        ))}
                        {count > 4 && (
                            <div className="badge-more">
                                <p>+{count - 4} more</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}