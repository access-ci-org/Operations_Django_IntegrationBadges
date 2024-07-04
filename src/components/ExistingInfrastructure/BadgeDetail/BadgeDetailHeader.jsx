export default function BadgeDetailHeader({title, link, badges}) {
    return (
        <div className="header-wrapper">
            <div className="title-wrapper">
                <h1>{title}</h1>
                <a href={link}>Cloud Resource</a>
            </div>
            <div>

            </div>
        </div>
    );
}