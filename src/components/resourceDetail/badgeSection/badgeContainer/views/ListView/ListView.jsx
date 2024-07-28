import BadgeList from "./BadgeList";
import ResourceBadge from "../../../../../fragments/ResourceBadge/ResourceBadge";
import EmptyPage from "../../../../../fragments/EmptyPage";
import {workflow_states} from "../../../../../../App";

/**
 * Displaying the badges in a list view.
 * @param {Array<RoadmapBadge>} recommendedBadges - not planned or deprecated badges
 * @param {Array<RoadmapBadge>} plannedBadges - planned, task completed, or verification failed badges
 * @param {Array<RoadmapBadge>} achievedBadges - verified badges
 * @param selectedView - True for Resource Provider View, False for Researcher View
 * @param activeTab - Can be 'recommended' (default), 'planned', or 'achieved' (available)
 */
export default function ListView({
                                     recommendedBadges,
                                     plannedBadges,
                                     achievedBadges,
                                     selectedView,
                                     activeTab
                                 }) {
    return (
        <div className="tab-content resource-badge-container-content" id="resource-badges-tabContent">
            <div className={`tab-pane fade ${activeTab === 'recommended' ? 'show active' : ''}`}
                 id="resource-badge-container-recommended-tab" role="tabpanel"
                 aria-labelledby="resource-badge-container-recommended-tab" tabIndex="0">
                {selectedView ?
                    recommendedBadges.length === 0 ?
                        <EmptyPage text="No Recommended Badges" style={{marginTop: '24px'}}/> :
                        <BadgeList data={recommendedBadges} view={selectedView}/>
                    :
                    achievedBadges.length === 0 ?
                        <EmptyPage text="No Available Badges" style={{marginTop: '24px'}}/> :
                        <BadgeList data={achievedBadges} view={selectedView}/>
                }
            </div>
            <div className={`tab-pane fade ${activeTab === 'planned' ? 'show active' : ''}`}
                 id="resource-badge-container-planned-tab" role="tabpanel"
                 aria-labelledby="resource-badge-container-planned-tab" tabIndex="0">
                {selectedView ?
                    plannedBadges.length === 0 ?
                        <EmptyPage text="No Planned Badges" style={{marginTop: '24px'}}/> :
                        <BadgeList data={plannedBadges} view={selectedView}/>
                    :
                    plannedBadges.length === 0 && recommendedBadges
                        .filter(badge => badge.state !== workflow_states.NOT_PLANNED).length === 0 ?
                        <EmptyPage text="No Planned Badges" style={{marginTop: '24px'}}/> :
                        <BadgeList data={plannedBadges.concat(recommendedBadges
                            // Filtering out badges with "Not Planned" status
                            .filter(badge => badge.state !== workflow_states.NOT_PLANNED)
                            .map((badge, index) => (
                                <div key={index} className="col">
                                    <ResourceBadge data={badge} view={selectedView}/>
                                </div>
                            )))} view={selectedView}/>
                }
            </div>
            {selectedView &&
                <div className={`tab-pane fade ${activeTab === 'achieved' ? 'show active' : ''}`}
                     id="resource-badge-container-achieved-tab" role="tabpanel"
                     aria-labelledby="resource-badge-container-achieved-tab" tabIndex="0">
                    {achievedBadges.length === 0 ?
                        <EmptyPage text="No Available Badges" style={{marginTop: '24px'}}/> :
                        <BadgeList data={achievedBadges} view={selectedView}/>}
                </div>
            }
        </div>
    );
}