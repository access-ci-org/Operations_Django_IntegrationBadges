import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from "react-router-dom";

import fiveStepsForNewIntegrationsPng from "./assets/five-steps-for-new-resource-integration.png"

export default function HowToIntegrateResource() {
    return <div className="container">
        <div className="w-100 p-3 pt-5">
            <h1>
                <i className="bi bi-stack fs-1 text-medium pe-3"></i>
                How Do I Integrate My Resource into ACCESS?
            </h1>
        </div>

        <div className="row p-5 bg-light">
            <div className="col-md-6">
                <p className="fs-6">
                    We’ve made the integration process as simple and guided as possible, with a clear, stepped approach
                    that ensures you’ll never miss a step. The process is structured around our Integration Roadmaps,
                    which are designed to provide a tailored pathway for integrating your resource into the ACCESS
                    ecosystem.
                </p>
            </div>
            <div className="col-md-6 text-center">
                <img className="w-100" style={{maxWidth: 300}} alt="Five steps for new resource integraiton"
                     src={fiveStepsForNewIntegrationsPng}/>
            </div>
        </div>

        <div className="row mt-5 p-5 bg-light">
            <p className="fs-6">
                To begin, click <strong>"Start Integration"</strong> on the landing page. This will take you to our Resource Description
                catalog (called <strong>CiDeR</strong>), where you’ll register your organization (if it’s not already registered) and
                then register your resource. This step is quick and simple!
            </p>
            <p className="fs-6">
                Once your registration is complete, <strong>head back to the ACCESS site</strong>. On the homepage, you will find a link
                to the <strong>Integration Dashboard</strong>. From there, it’s all a step-by-step process. Simply follow the
                instructions to choose an Integration Roadmap based on the type of resource you’re bringing in, whether
                it's a compute cluster, cloud environment, storage, or science gateway. These roadmaps are designed to
                guide you through the integration process and break it down into manageable milestones called badges.
            </p>
            <p className="fs-6">
                Each <strong>Integration Roadmap</strong> will include a list of required and optional badges (integration features or
                elements), and each badge will have tasks that need to be completed to integrate your resource. You, as
                the Resource Provider, can select the badges that align with your resource type and goals. Some badges
                will involve technical tasks for your system administrators, while others may be administrative or
                operational and handled by other team members.
            </p>
        </div>


        <div className="row mt-5 p-5 bg-light">
            <p className="fs-6">
                Once the tasks for each badge are complete, you’ll submit the badge for verification, where our team
                will ensure everything is set up correctly.
            </p>
            <p className="fs-6">
                And don’t worry, our concierge team is here to help you every step of the way. We’re available to guide
                you through the process, clarify any questions, and make sure the integration goes smoothly.
            </p>
            <p className="fs-6">
                Ready to get started? Click <strong>“Start Integration”</strong> to begin.<br/>
                Need help or have questions? Reach out to a concierge, we’re happy to assist!
            </p>
        </div>

        <div className="w-100 p-3 pt-5">
            <h2>Ready to integrate a new resource?</h2>
            <Link className="btn btn-dark btn-lg rounded-2 mt-2" to="/docs">Start Integration</Link>
        </div>

    </div>
}