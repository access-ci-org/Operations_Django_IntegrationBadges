import ComputeIcon from "../../../assets/img/icons/cpu.svg";
import StorageIcon from "../../../assets/img/icons/hdd.svg";
import {Link, useNavigate} from "react-router-dom";
import React from "react";

/**
 * The header section of the resource detail page.
 * @param {Object} resource - The resource object to display.
 */
export default function BasicInfoHeader({resource}) {
    const navigate = useNavigate();

    const handleBadgeClick = () => {
        navigate(`/`);
    }

    return (
        <div className="resource-detail-header">
            <div className="resource-detail-header-info">
                <div className="resource-detail-header-title">
                    <h1>{resource.resource_descriptive_name}</h1>
                    <div className="resource-detail-header-title-subtitle">
                        <h3>
                            By
                            {/*<a href={resource.organization_url}>{resource.organization_name}</a>*/}
                            <Link path={resource.organization_url}>
                                {resource.organization_name}
                            </Link>
                        </h3>
                        <span className="badge text-bg-medium resource-detail-header-badge"
                              onClick={handleBadgeClick}>Back to Full List</span>
                    </div>
                </div>
                <div className="resource-detail-header-subtitle">
                    <div className="resource-detail-header-subtitle-item">
                        <p>Resource Type</p>
                        <p>{resource.cider_type}</p>
                    </div>
                    <div className="resource-detail-header-subtitle-item">
                        <p>Latest Status</p>
                        <p>{resource.latest_status}</p>
                    </div>
                    <div className="resource-detail-header-subtitle-item">
                        <p>Global Resource ID</p>
                        <p>{resource.info_resourceid}</p>
                    </div>
                </div>
            </div>
            <div className="resource-detail-header-img">
                {resource.organization_logo_url ?
                    <img src={resource.organization_logo_url} alt={resource.organization_name}/> :
                    resource.cider_type === 'Compute' ?
                        <img src={ComputeIcon} style={{width: '100%', height: '100%'}}/> :
                        <img src={StorageIcon} style={{width: '100%', height: '100%'}}/>
                }
            </div>
        </div>
    );
}