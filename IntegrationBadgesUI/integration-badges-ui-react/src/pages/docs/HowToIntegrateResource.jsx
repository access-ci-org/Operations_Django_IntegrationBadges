import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from "react-router-dom";

import fiveStepsForNewIntegrationsPng from "./assets/five-steps-for-new-resource-integration.png"

export default function HowToIntegrateResource() {
    return <div className="container">
        <div className="w-100 p-3 pt-5">
            <h1 className="mb-4">
                <i className="bi bi-stack fs-1 text-medium pe-3"></i>
                How Do I Integrate My Resource into ACCESS?
            </h1>
        </div>

        <div className="row p-4 bg-gray-100">
            <div className="col-lg-4 col-md-6">
                <p className="fs-6 text-dark">
                    We’ve made the integration process as simple and guided as possible, with a clear, stepped approach
                    that ensures you’ll never miss a step. The process is structured around our Integration Roadmaps,
                    which are designed to provide a tailored pathway for integrating your resource into the ACCESS
                    ecosystem.
                </p>
            </div>
            <div className="col-lg-8 col-md-6 text-center">
                <img className="w-100" style={{maxWidth: 500}} alt="Five steps for new resource integraiton"
                     src={fiveStepsForNewIntegrationsPng}/>
            </div>
        </div>

        <div className="row mt-3 p-4 bg-gray-100">
            <h4 className="fs-6 text-dark">To begin the integration process, you have two options:</h4>
            <p className="fs-6 text-dark">
                You can click “Start Integration” directly from the ACCESS landing page to get started.
            </p>
        </div>


        <div className="row mt-3 p-4 bg-gray-100">
            <h4 className="fs-6 text-dark">Step 1: Register Your Organization and Resource</h4>
            <p className="fs-6 text-dark">
                If your organization isn’t already in the system, you’ll need to register it first. Then, register the
                specific resource you’d like to integrate. This involves filling out a short form with a few key
                details. Once submitted, a member of the concierge team will review your information. If everything
                looks good, your resource will appear on the Integration Dashboard. it's a quick and easy step!
            </p>
        </div>


        <div className="row mt-3 p-4 bg-gray-100">
            <h4 className="fs-6 text-dark">Step 2: Pick an Integration Roadmap</h4>
            <p className="fs-6 text-dark">
                After registration, return to the ACCESS homepage and click on the Integration Dashboard link. From
                there, you’ll follow a guided process to select an Integration Roadmap that matches the type of resource
                you’re integrating, such as a compute cluster, cloud environment, storage, or a science gateway.
            </p>
            <p className="fs-6 text-dark">
                These roadmaps are designed to break the integration process into manageable steps called badges. Each
                badge includes tasks that must be completed to successfully integrate your resource.
            </p>
        </div>


        <div className="row mt-3 p-4 bg-gray-100">
            <h4 className="fs-6 text-dark">Step 3: Select Resource- Specific Badges</h4>
            <p className="fs-6 text-dark">
                As the Resource Provider, you can choose the badges most relevant to your resource and your team’s
                goals. Some badges may involve technical setup tasks for your developers, while others may focus on
                administrative or operational steps handled by different members of your team.
            </p>
        </div>


        <div className="row mt-3 p-4 bg-gray-100">
            <h4 className="fs-6 text-dark">Step 4: Complete Badges</h4>
            <p className="fs-6 text-dark">
                Each badge in your selected Integration Roadmap represents a specific milestone in the integration
                process. Badges are designed to help you and your team stay organized by breaking the work into focused,
                achievable tasks. Some badges will involve setting up technical components like configuring access
                policies or setting up monitoring while others may cover documentation, support planning, or onboarding
                workflows. Each badge includes guidance, resources, and links to help you complete the required tasks.
                As you complete a badge, simply mark it as done on the Integration Dashboard. This allows both your team
                and the ACCESS support team to track progress.
            </p>
        </div>


        <div className="row mt-3 p-4 bg-gray-100">
            <h4 className="fs-6 text-dark">Step 5: Submit for Verification</h4>
            <p className="fs-6 text-dark">
                Once each badge is finish, you'll submit it for verification, where our team will verify that each badge
                is setup correctly. And don’t worry, our team is here to help you every step of the way. We’re available
                to guide you through the process, clarify any questions, and make sure the integration goes smoothly.
            </p>
        </div>

        <div className="w-100 p-3 pt-5">
            <h2>Ready to integrate a new resource?</h2>
            <Link className="btn btn-dark btn-lg rounded-2 mt-2" to="/docs">Start Integration</Link>
        </div>

    </div>
}