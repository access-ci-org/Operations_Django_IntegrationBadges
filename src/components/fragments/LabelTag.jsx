import {useEffect, useState} from "react";

export default function LabelTag({title, verified, style}) {
    const [className, setClassName] = useState("label-tag");

    useEffect(() => {
        let newClassName = "label-tag";

        if (verified === undefined || !verified) {
            newClassName += " unverified-style";
        }

        setClassName(newClassName);
    }, [verified]);

    return (
        <span className={className} style={style}>{title}</span>
    );
}