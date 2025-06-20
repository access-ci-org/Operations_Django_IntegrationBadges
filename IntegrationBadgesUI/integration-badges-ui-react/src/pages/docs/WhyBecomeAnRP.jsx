import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from "react-router-dom";

import fiveStepsForNewIntegrationsPng from "./assets/five-steps-for-new-resource-integration.png"

export default function WhyBecomeAnRP() {
    return <div className="container">
        <div className="w-100 p-3 pt-5">
            <h1 className="mb-4">How & Why Become an RP?</h1>
            <p className=" fs-5 lead">
                Resource Providers (RPs) are at the center of ACCESS, making research possible for the diverse community
                ACCESS serves. Our providers share cyberinfrastructure resources and their expertise with the
                researchers and scientists who request allocations. This symbiotic relationship, supported by other
                areas of the program, makes scientific discoveries happen.
            </p>
        </div>

        <div className="w-100 p-3">
            <h2>How Can We Assist You?</h2>
            <p>
                Choose a question to find the help you need
            </p>
        </div>

        <div className="row p-3 text-dark">
            <div className="col p-3" style={{maxWidth: 350}}>
                <div className="w-100 h-100 border p-5 border-2 rounded-3 border-dark">
                    <i className="bi bi-stack fs-1 text-medium"></i>
                    <Link className="w-100 btn btn-link text-medium text-center" to="/docs/how-to-integrate-resource" style={{fontSize: 18}}>
                        How do I integrate my <br/>
                        resource into  <br/>
                        ACCESS?
                    </Link>
                </div>
            </div>
            <div className="col p-3" style={{maxWidth: 350}}>
                <div className="w-100 h-100 border p-5 border-2 rounded-3 border-dark">
                    <i className="bi bi-building-fill-gear fs-1 text-medium"></i>
                    <Link className="w-100 btn btn-link text-medium text-center" to="/docs/how-to-choose-roadmap" style={{fontSize: 18}}>
                        What is an Integration <br/>
                        Roadmap and how do I  <br/>
                        choose the right one?
                    </Link>
                </div>
            </div>
        </div>

        <div className="w-100 p-3 pt-5">
            <Accordion defaultActiveKey={[]}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Why should I integrate my resource with ACCESS?</Accordion.Header>
                    <Accordion.Body>
                        <p className="fs-6">Participating in ACCESS enables your organization to maximize the use and impact of its
                            cyberinfrastructure by making it accessible to the national research community. Integration
                            connects your resource to a broad ecosystem of researchers and educators, increasing
                            visibility, usage, and scientific contribution. As a Resource Provider, you’ll benefit from
                            standardized interfaces, onboarding support, and potential funding opportunities, all while
                            contributing to a collaborative network driving scientific discovery.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>What are the requirements to become a Resource Provider?</Accordion.Header>
                    <Accordion.Body>
                        <p className="fs-6">To become an ACCESS Resource Provider, your resource must support research or education, meet
                            baseline cybersecurity and reliability standards, and be capable of interoperating with
                            ACCESS systems. You’ll follow an Integration Roadmap that outlines technical and operational
                            milestones. If you’d like to speak with someone before getting started, submit a ticket here
                            to connect with our team.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>How long does the integration process take?</Accordion.Header>
                    <Accordion.Body>
                        <p className="fs-6">The timeline varies based on the complexity of your resource and the roadmap selected. Simple
                            integrations may take a few weeks, while more advanced or customized resources could take
                            longer. </p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Do I need a dedicated technical team to integrate my resource? </Accordion.Header>
                    <Accordion.Body>
                        <p className="fs-6">You don’t need a dedicated technical team to complete the integration process. While some
                            tasks within certain badges may require technical expertise (such as system configuration or
                            API integration), others may be administrative or operational and can be handled by
                            different members of your team. Resource provider leadership have the flexibility to assign
                            tasks based on your team’s capacity and areas of expertise. Many Resource Providers
                            successfully integrate with ACCESS using small or part-time teams, and our onboarding
                            support is available throughout the process to assist as needed.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Can I talk to someone before I start the integration process?</Accordion.Header>
                    <Accordion.Body>
                        <p className="fs-6">Yes, if you’re considering becoming a Resource Provider and have questions, we encourage you
                            to reach out early. Our team is available to answer questions, help you understand the
                            integration options, and guide you in selecting the roadmap and badges that make the most
                            sense for your resource. To connect with us, simply submit a ticket here.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header>What kind of support will I receive during onboarding?</Accordion.Header>
                    <Accordion.Body>
                        <p className="fs-6">We provide hands-on support throughout the onboarding process. This includes access to
                            detailed documentation, guidance on choosing and completing badges, and help from technical
                            and programmatic staff familiar with ACCESS integration. Whether you're working through a
                            technical task or need help planning your roadmap, we’re here to support you at every
                            step.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                    <Accordion.Header>What happens after I integrate my resource?</Accordion.Header>
                    <Accordion.Body>
                        <p className="fs-6">Once your resource is integrated, it becomes part of the national ACCESS ecosystem and is
                            made available to researchers through standardized interfaces. You’ll continue to receive
                            support as needed, including visibility into usage metrics, opportunities for collaboration,
                            and access to future updates and community events. You’ll also be able to modify or add new
                            badges later as your resource evolves.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7">
                    <Accordion.Header>Is there a cost or funding requirement to become an RP?</Accordion.Header>
                    <Accordion.Body>
                        <p className="fs-6">There is no fee to become a Resource Provider within ACCESS. The program is fully funded by
                            the National Science Foundation (NSF), and integration is supported as part of this national
                            effort to advance research cyberinfrastructure. In fact, joining ACCESS can increase your
                            visibility, open doors to future funding opportunities, and foster partnerships across the
                            research community. If you’re interested in how participation might align with your
                            organization’s goals, we’re happy to discuss further. Just submit a ticket here.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="8">
                    <Accordion.Header>What if my resource doesn’t fit neatly into one of the existing
                        roadmaps?</Accordion.Header>
                    <Accordion.Body>
                        <p className="fs-6">That’s completely okay. We understand that not all resources are the same, and our existing
                            roadmaps may not cover every use case. One of ACCESS’s goals is to expand the types of
                            research infrastructure available to researchers. If your resource doesn’t align with one of
                            the current integration pathways, we’ll work closely with you to adapt or co-develop a
                            roadmap that fits your specific needs and goals. Our team is here to ensure your integration
                            journey is both effective and meaningful, regardless of where you’re starting from.</p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>

        <div className="w-100 p-3 pt-5">
            <h2>Ready to integrate a new resource?</h2>
            <Link className="btn btn-dark btn-lg rounded-2 mt-2" to="/docs">Start Integration</Link>
        </div>

    </div>
}