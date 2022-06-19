import React, { useEffect, useRef } from "react";
const Collapse = props => {
    const collapseRef = useRef(null);
    const collapseSection = element => {
        const sectionHeight = element.scrollHeight;

        requestAnimationFrame(function() {
            element.style.height = sectionHeight + 'px';
            requestAnimationFrame(function() {
                element.style.height = 0 + 'px';
                element.style.display= 'None';
            });
        });
    };
    const expandSection = element => {
        const sectionHeight = element.scrollHeight;
        // element.style.height = sectionHeight + 'px';
        element.style.height = 160 + 'px'
        element.style.display= 'Block';

        let clearTime = setTimeout(() => {
            element.style.height = 'auto';

            },
            400);
        clearTimeout(clearTime);
    };
    useEffect(() => {
        const element = collapseRef.current;
        if (props.isOpen) {
            expandSection(element);
        } else {
            collapseSection(element);
        }
        },
        [props.isOpen]);
    return (
        <div className="d-collapse" ref={collapseRef}>
            {props.children}
        </div>
    );
};
Collapse.defaultProps = {    isOpen: false};
export { Collapse };