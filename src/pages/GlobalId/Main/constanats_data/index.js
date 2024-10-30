import React, {useEffect} from "react";
import {logEvent} from "firebase/analytics";
import {analytics} from "../../../../index";
import {Fancybox as NativeFancybox} from "@fancyapps/ui";

export  const images = [
    {
        org: '/images/globalId/img-11.jpg',
        min: '/images/globalId/img-11.jpg'
    },
    {
        org: '/images/globalId/img-10.jpg',
        min: '/images/globalId/img-10.jpg'
    },
    {
        org: '/images/globalId/img-12.jpg',
        min: '/images/globalId/img-12.jpg'
    }
];


export  const phone_images = {
    1: '/images/globalId/video/MRZ.mp4',
    2: '/images/globalId/video/liveness.mp4',
    3: '/images/globalId/video/NFC.mp4',
    4: '/images/globalId/video/location.mp4',
    5: '/images/globalId/video/Device.mp4',
    6: '/images/globalId/video/bio.mp4'
}


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