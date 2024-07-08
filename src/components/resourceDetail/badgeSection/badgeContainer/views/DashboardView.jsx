import ResourceBadge from "../../../../fragments/ResourceBadge/ResourceBadge";

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
                            {recommendedBadges.map((badge, index) => (
                                <div key={index} className="col">
                                    <ResourceBadge data={badge} view={selectedView}/>
                                </div>
                            ))}
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