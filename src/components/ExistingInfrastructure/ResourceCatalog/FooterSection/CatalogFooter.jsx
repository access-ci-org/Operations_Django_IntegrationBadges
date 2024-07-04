import arrow from '../../../../assets/img/arrow-forward.svg';

const firstLink = {
    text: "Need access to computing, data analysis, or storage resources?",
    url: "https://www.google.com",
    urlText: "Request Allocations"
};

const secondLink = {
    text: "Read helpful articles and training materials on using ACCESS resources and services",
    url: "https://www.google.com",
    urlText: "View ACCESS Documentation"
}

const thirdLink = {
    text: "See schedule of ACCESS events,  trainings, office hours, etc.",
    url: "https://www.google.com",
    urlText: "View Training Schedule"
}

const fourthLink = {
    text: "Want to monitor usage metrics and performance data of your resource?",
    url: "https://www.google.com",
    urlText: "View ACCESS Metrics"
}

function LinkSection({data}) {
    return (
        <div className={"col link-section"}>
            <div className={"link-text"}>
                {data.text}
            </div>
            <div className={"expand-button"}>
                <a href={data.url} role="button">{data.urlText}</a>
                <img src={arrow} alt="Expand" style={{maxHeight: '20px', maxWidth: '20px'}}/>
            </div>
        </div>
    );

}

export default function CatalogFooter() {
    return (
        <div className={"row row-cols-4 link-panel"}>
            <LinkSection data={firstLink} />
            <LinkSection data={secondLink} />
            <LinkSection data={thirdLink} />
            <LinkSection data={fourthLink} />
        </div>
    );
}