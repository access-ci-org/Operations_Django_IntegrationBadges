import {useEffect, useState} from "react";

/**
 * The label tag that shows 'required,' 'available, or 'unverified' on the badge.
 * The 'required' and 'available' shares the same style with different text.
 * @param title - the text to display
 * @param verified - if the badge is verified
 * @param style - optional style
 */
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