import React, {useEffect} from "react";
import {logEvent} from "firebase/analytics";
import {analytics} from "../../../../../../index";
import "@fancyapps/ui/dist/fancybox.css";
import {Fancybox as NativeFancybox} from "@fancyapps/ui";


function Fancybox(props) {
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

const FancyboxImg = ({item, currentImg, index}) => {


    return (
        <Fancybox>
            {item === currentImg ?    <a data-fancybox={'single'} href={item}>
                <img src={item} key={item} rel={index}
                     className={`${item === currentImg ? 'show' : 'hide'}`}
                     alt={''}/>
            </a> :    <a href={item}>
                <img src={item} key={item} rel={index}
                     className={`${item === currentImg ? 'show' : 'hide'}`}
                     alt={''}/>
            </a>}
        </Fancybox>
    )
}

export default FancyboxImg