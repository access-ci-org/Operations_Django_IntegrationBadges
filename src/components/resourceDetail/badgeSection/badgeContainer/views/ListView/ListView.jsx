import BadgeList from "./BadgeList";

/**
 * Displaying the badges in a list view.
 * @param {Object} recommendedBadges - not planned or deprecated badges
 * @param {Object} plannedBadges - planned, task completed, or verification failed badges
 * @param {Object} achievedBadges - verified badges
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
                    <BadgeList data={recommendedBadges} view={selectedView}/>
                    :
                    <BadgeList data={achievedBadges} view={selectedView}/>
                }
            </div>
            <div className={`tab-pane fade ${activeTab === 'planned' ? 'show active' : ''}`}
                 id="resource-badge-container-planned-tab" role="tabpanel"
                 aria-labelledby="resource-badge-container-planned-tab" tabIndex="0">
                {selectedView ?
                    <BadgeList data={plannedBadges} view={selectedView}/>
                    :
                    <BadgeList data={plannedBadges.concat(recommendedBadges)} view={selectedView}/>
                }
            </div>
            {selectedView &&
                <div className={`tab-pane fade ${activeTab === 'achieved' ? 'show active' : ''}`}
                     id="resource-badge-container-achieved-tab" role="tabpanel"
                     aria-labelledby="resource-badge-container-achieved-tab" tabIndex="0">
                    <BadgeList data={achievedBadges} view={selectedView}/>
                </div>
            }
        </div>
    );
}