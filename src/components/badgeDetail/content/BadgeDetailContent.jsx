import BadgeDetailBasicInfo from "./BadgeDetailBasicInfo";

export default function BadgeDetailContent({data}) {
    return (
        <div className="content-wrapper">
            <BadgeDetailBasicInfo data={data}/>
        </div>
    );
}