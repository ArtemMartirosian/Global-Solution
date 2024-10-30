
import {LoaderDiv} from "./style";


export default function Loader(){
    return(
        <LoaderDiv className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </LoaderDiv>
    )
}