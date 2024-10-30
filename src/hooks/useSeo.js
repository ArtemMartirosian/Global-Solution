import {useQuery} from "react-query";
import {Seo} from "../api";

const SEO_ALL_KEY = 'seo_all_key'

const SEO_KEY = 'seo_key'

export function UseSeoAll(options) {
    return useQuery([SEO_ALL_KEY], () => Seo.getAll(), {
        ...options,
        refetchOnWindowFocus: false
    })
}

export function UseSeo(id, options) {
    return useQuery([SEO_KEY, id], () => Seo.getOne(id), {
        ...options
    })
}