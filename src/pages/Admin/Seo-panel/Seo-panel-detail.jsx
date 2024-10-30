import SeoAddForm from "./components/seo-add-form/seo-add-form";
import {useParams} from "react-router-dom";
import {UseSeo} from "../../../hooks/useSeo";
import {Spin} from "antd";

const SeoPanelDetail = (props) => {

    const params = useParams()

    const {data, refetch, isLoading} = UseSeo(params.id)



    return (
        <SeoAddForm edit={true} isLoading={isLoading} refetch={refetch} data={data} id={params.id}/>
    )

}


export default SeoPanelDetail