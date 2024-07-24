import {useState} from "react";
import BadgeContainerViewOption from "../../fragments/BadgeContainerViewOption";
import ResourceBadge from "../../fragments/ResourceBadge/ResourceBadge";
import BadgeList from "../../resourceDetail/badgeSection/badgeContainer/views/ListView/BadgeList";
import EmptyPage from "../../fragments/EmptyPage";

export default function PrerequisiteBadgesContainer({badges}) {
    // True for Dashboard View, False for List View
    const [badgeDisplay, setBadgeDisplay] = useState(true);
    const toggleBadgeDisplay = () => {
        setBadgeDisplay(current => !current);
    };

    return (
        <div className="prerequisite-badge-container">
            <div className="prerequisite-badge-header">
                <h4>Prerequisite Badges</h4>
                <BadgeContainerViewOption badgeDisplay={badgeDisplay} toggleBadgeDisplay={toggleBadgeDisplay}/>
            </div>
            {badgeDisplay ?
                <div className="row row-cols-auto resource-badge-dashboard">
                    {
                        badges.length === 0 ?
                            <EmptyPage text="No Prerequisite Badges" style={{minHeight: '240px'}}/> :
                        badges.map((badge, index) => (
                        <div key={index} className="col">
                            <ResourceBadge data={badge} view={true}/>
                        </div>
                    ))}
                </div>
                : <BadgeList data={badges} view={true} noCriteria/>
            }
        </div>
    );
}