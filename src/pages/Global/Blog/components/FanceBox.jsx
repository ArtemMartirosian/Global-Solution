import React, {useEffect} from "react";
import {logEvent} from "firebase/analytics";
import {analytics} from "../../../../index";
import {Fancybox as NativeFancybox} from "@fancyapps/ui";


export function Fancybox(props) {
    const delegate = props.delegate || "[data-fancybox]";


    useEffect(() => {
        logEvent(analytics, 'global_blog_page_visited');
        const opts = props.options || {};

        NativeFancybox.bind(delegate, opts);

        return () => {
            NativeFancybox.destroy();
        };
    }, []);

    return <>{props.children}</>;
}