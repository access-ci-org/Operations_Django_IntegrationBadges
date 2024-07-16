import ResourceBadge from "../../../../fragments/ResourceBadge/ResourceBadge";

/**
 * Displaying the badges in a dashboard view. To switch between the researcher/RP view,
 * different groups of badges will be rendered under different tabs. For example, the first
 * tab will be replaced with available badges under researcher view.
 * @param {Object} recommendedBadges - not planned or deprecated badges
 * @param {Object} plannedBadges - planned, task completed, or verification failed badges
 * @param {Object} achievedBadges - verified badges
 * @param selectedView - True for Resource Provider View, False for Researcher View
 * @param activeTab - Can be 'recommended' (default), 'planned', or 'achieved' (available)
 */
export default function DashboardView({
                                          recommendedBadges,
                                          plannedBadges,
                                          achievedBadges,
                                          selectedView,
                                          activeTab,
                                      }) {
    return (
        <div className="tab-content resource-badge-container-content" id="resource-badges-tabContent">
            <div className={`tab-pane fade ${activeTab === 'recommended' ? 'show active' : ''}`}
                 id="resource-badge-container-recommended-tab" role="tabpanel"
                 aria-labelledby="resource-badge-container-recommended-tab" tabIndex="0">
                <div className="row row-cols-auto resource-badge-dashboard">
                    {selectedView ?
                        recommendedBadges.map((badge, index) => (
                            <div key={index} className="col">
                                <ResourceBadge data={badge} view={selectedView}/>
                            </div>
                        ))
                        :
                        achievedBadges.map((badge, index) => (
                            <div key={index} className="col">
                                <ResourceBadge data={badge} view={selectedView}/>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={`tab-pane fade ${activeTab === 'planned' ? 'show active' : ''}`}
                 id="resource-badge-container-planned-tab" role="tabpanel"
                 aria-labelledby="resource-badge-container-planned-tab" tabIndex="0">
                <div className="row row-cols-auto resource-badge-dashboard">
                    {selectedView ?
                        plannedBadges.map((badge, index) => (
                            <div key={index} className="col">
                                <ResourceBadge data={badge} view={selectedView}/>
                            </div>
                        ))
                        :
                        <>
                            {plannedBadges.map((badge, index) => (
                                <div key={index} className="col">
                                    <ResourceBadge data={badge} view={selectedView}/>
                                </div>
                            ))}
                            {recommendedBadges
                                // Filtering out badges with "NotPlanned" status
                                .filter(badge => badge.status !== "NotPlanned")
                                .map((badge, index) => (
                                    <div key={index} className="col">
                                        <ResourceBadge data={badge} view={selectedView}/>
                                    </div>
                                ))
                            }
                        </>
                    }
                </div>
            </div>
            {selectedView &&
                <div className={`tab-pane fade ${activeTab === 'achieved' ? 'show active' : ''}`}
                     id="resource-badge-container-achieved-tab" role="tabpanel"
                     aria-labelledby="resource-badge-container-achieved-tab" tabIndex="0">
                    <div className="row row-cols-auto resource-badge-dashboard">
                        {achievedBadges.map((badge, index) => (
                            <div key={index} className="col">
                                <ResourceBadge data={badge} view={selectedView}/>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}