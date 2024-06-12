import ResourceCard from "./ResourceCard/ResourceCard";

const Jetstream2 = {
    type: "Compute Resource",
    name: "Indiana Jetstream2 CPU",
    institution: "Indiana University",
    description: "Jetstream2 is a hybrid-cloud platform that provides flexible, on-demand, " +
        "programmable cyberinfrastructure tools ranging from interactive virtual machine services to a " +
        "variety of infrastructure and orchestration services for research and education. The primary resource " +
        "is a state something something something something something something something something something."
}

const NCSA = {
    type: "Storage Resource",
    name: "NCSA Delta Storage (Delta Storage)",
    institution: "National Center for Supercomputing Applications",
    description: "The Delta Storage resource provides storage allocations for projects using the Delta CPU and " +
        "Delta GPU resources. It delivers 7PB of capacity to projects on Delta and will be augmented by a later " +
        "expansion of 3PB of flash capacity for high-performance storage."
}

const ANTON = {
    type: "Compute Resource",
    name: "PSC Anton 2 Special-Purpose Supercomputer for Molecular Dynamics Simulation",
    institution: "Pittsburgh Supercomputing Center",
    description: "Anton is a special purpose supercomputer for biomolecular simulation designed and constructed " +
        "by D. E. Shaw Research (DESRES). PSC's current system is known as Anton 2 and is a successor to " +
        "the original Anton 1 machine hosted here."
}

export function ResourceList() {
    return (
        <div className="container-fluid" style={{ marginBottom: '36px' }}>
            <div className="row row-cols-auto" style={{gap: '20px'}}>
                <div className="col" style={{paddingLeft: 0, paddingRight: 0}}>
                    <ResourceCard data={Jetstream2}/>
                </div>
                <div className="col" style={{paddingLeft: 0, paddingRight: 0}}>
                    <ResourceCard data={NCSA}/>
                </div>
                <div className="col" style={{paddingLeft: 0, paddingRight: 0}}>
                    <ResourceCard data={ANTON}/>
                </div>
                <div className="col" style={{paddingLeft: 0, paddingRight: 0}}>
                    <ResourceCard data={Jetstream2}/>
                </div>
                <div className="col" style={{paddingLeft: 0, paddingRight: 0}}>
                    <ResourceCard data={NCSA}/>
                </div>
                <div className="col" style={{paddingLeft: 0, paddingRight: 0}}>
                    <ResourceCard data={ANTON}/>
                </div>
            </div>
        </div>
    )
}