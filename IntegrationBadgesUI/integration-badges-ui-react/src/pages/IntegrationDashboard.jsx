import {useOrganizations} from "../contexts/OrganizationsContext";
import {useEffect} from "react";

/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function IntegrationDashboard() {
    const {organizations, resetOrganizations} = useOrganizations();

    useEffect(() => {
        resetOrganizations();
    }, [])

    return (
        <div className="container">
            <div className="row">
                <h1>Integration Dashboard</h1>
                <p className="mt-3">
                    Welcome to the ACCESS Integration Dashboard.
                    <br/><br/>
                    <strong>Click on a Resource Provider (RP)</strong> to view their resources and integration statuses.
                    You can explore and manage the resources provided by various RPs. Each RP’s integration progress is
                    tracked in real-time, so you can monitor your active and pending integrations as you continue your
                    work.
                </p>
            </div>
            <div className="row mt-2">
                <input className="form-control" type="text" placeholder="Search Resource Provider by Institution"
                       aria-label="default input example"/>
            </div>

            <div className="w-100 d-flex mt-5">
                <div className="flex-fill bd-highlight">
                    <h2>Resource Providers {organizations && `(${organizations.length})`}</h2>
                </div>
                <div className="p-1">
                    <button type="button" className="btn btn-light">
                        <i className="bi bi-list"></i>
                    </button>
                </div>
                <div className="p-1">
                    <button type="button" className="btn btn-dark">
                        <i className="bi bi-grid-3x3-gap-fill"></i>
                    </button>
                </div>
            </div>

            <div className="row mt-2 row-cols-4">
                {organizations && organizations.map((organization, organizationIndex) => {
                    return <div key={organizationIndex} className="col p-3">
                        <div className="organization-card w-100 h-100">
                            <div className="w-100 p-3"></div>
                            <div className="w-100 p-5 bg-light" style={{
                                backgroundImage: `url(${organization.other_attributes.organization_logo_url})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center"
                            }}>
                                {/*<img className="w-100" src={organization.other_attributes.organization_logo_url}/>*/}
                            </div>
                            <div className="w-100 p-3 text-center">
                                <a href={"organizations/" + organization.organization_id}>
                                    {organization.organization_name}
                                </a>
                            </div>
                        </div>
                    </div>
                })}
            </div>

        </div>
    );
}