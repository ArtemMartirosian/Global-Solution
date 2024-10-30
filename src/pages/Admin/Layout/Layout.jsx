import { Route, Routes} from 'react-router-dom'
import React from "react";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

/*---Components---*/
import NotFound from "../../NotFound/NotFound";
import Login from "../Login/Login";
import BlogForm from "../Main/Blog/Blog-form"
import Blog from "../Main/Blog/Blog"
import PhotoForm from "../Main/Photo/PhotoForm"
import NewsCategories from "../Main/NewsCategories/NewsCategories"
import NewsCategoriesForm from "../Main/NewsCategories/NewsCategoriesForm"
import Video from "../Main/Video/Video";
import VideoForm from "../Main/Video/Video-form";
import Photo from "../Main/Photo/Photo";
import Authors from "../Main/Authors/Authors";
import AuthorsForm from "../Main/Authors/Authors-form";
import Category from "../References/Category/Category";
import Tags from "../References/Tags/Tags";
import Network from "../Network/Network";
import Team from "../Team/Team";
import Letters from "../Letters/Letters";
import Certificate from "../Certificate/Certificate";
import Contacts from '../Contacts/Contacts';
import Experience from "../Experience/Experience";
import FeedBack from "../Feedback/FeedBack";
import FormCategory from "../References/Category/FormCategory";
import FormTag from "../References/Tags/FormTag";
import FormNetwork from "../Network/FormNetwork";
import FormEmployee from "../Team/FormEmployee";
import FormLetter from "../Letters/FormLetter";
import FormExperience from "../Experience/FormExperience";
import FormSertificate from "../Certificate/FormSertificate";
import FormContact from '../Contacts/FormContact'
import AdminMain from "../Main/Main";
import SeoPanel from "../Seo-panel/Seo-panel";
import SeoAddForm from "../Seo-panel/components/seo-add-form/seo-add-form";
import SeoPanelDetail from "../Seo-panel/Seo-panel-detail";




export default function AdminLayout(props){


    return(
        <>
            <Routes>
                <Route path={"/admin"} element={<AdminMain {...props} />}/>
                <Route path={"/admin/login"}  element={<Login {...props} />}/>
                <Route path={"/admin/main/blog"} element={<Blog {...props} />}/>
                <Route path={"/admin/main/blog/:id"} element={<Blog {...props} />}/>
                <Route path={"/admin/main/blog-form"} element={<BlogForm {...props} />}/>
                <Route path={"/admin/main/edit-blog/:id"} element={<BlogForm {...props} />}/>
                <Route path={"/admin/main/newsCategories"} element={<NewsCategories {...props} />}/>
                <Route path={"/admin/main/newsCategories/:id"} element={<NewsCategories {...props} />}/>
                <Route path={"/admin/main/newsCategories-form"} element={<NewsCategoriesForm {...props} />}/>
                <Route path={"/admin/main/edit-newsCategories/:id"} element={<NewsCategoriesForm {...props} />}/>
                <Route path={"/admin/main/photo"} element={<Photo {...props} />}/>
                <Route path={"/admin/main/photo-form"} element={<PhotoForm {...props} />}/>
                <Route path={"/admin/main/edit-photo/:id"} element={<PhotoForm {...props} />}/>
                <Route path={"/admin/main/video"} element={<Video {...props} />}/>
                <Route path={"/admin/main/video-form"} element={<VideoForm {...props} />}/>
                <Route path={"/admin/main/edit-video/:id"} element={<VideoForm {...props} />}/>
                <Route path={"/admin/main/authors"} element={<Authors {...props} />}/>
                <Route path={"/admin/main/edit-authors/:id"} element={<AuthorsForm {...props} />}/>
                <Route path={"/admin/main/authors-form"} element={<AuthorsForm {...props} />}/>
                <Route path={"/admin/main/tags"} element={<Tags {...props} />}/>
                <Route path={"/admin/references/category"} element={<Category {...props} />}/>
                <Route path={"/admin/references/new-category"} element={<FormCategory {...props} />}/>
                <Route path={"/admin/references/edit-category/:id"} element={<FormCategory {...props} />}/>
                <Route path={"/admin/references/tags"} element={<Tags {...props} />}/>
                <Route path={"/admin/references/edit-tag/:id"} element={<FormTag {...props} />}/>
                <Route path={"/admin/references/new-tag"} element={<FormTag {...props} />}/>
                <Route path={"/admin/new-logo/"} element={<FormNetwork {...props} />}/>
                <Route path={"/admin/edit-logo/:id"} element={<FormNetwork {...props} />}/>
                <Route path={"/admin/new-employee"} element={<FormEmployee {...props} />}/>
                <Route path={"/admin/edit-employee/:id"} element={<FormEmployee {...props} />}/>
                <Route path={"/admin/network"} element={<Network {...props} />}/>
                <Route path={"/admin/team"} element={<Team {...props} />}/>
                <Route path={"/admin/letters"} element={<Letters {...props} />}/>
                <Route path={"/admin/new-letter"} element={<FormLetter {...props} />}/>
                <Route path={"/admin/edit-letter/:id"} element={<FormLetter {...props} />}/>
                <Route path={"/admin/experience"} element={<Experience {...props} />}/>
                <Route path={"/admin/new-experience"} element={<FormExperience {...props} />}/>
                <Route path={"/admin/edit-experience/:id"} element={<FormExperience {...props} />}/>
                <Route path={"/admin/certificate"} element={<Certificate {...props} />}/>
                <Route path={"/admin/new-certificate"} element={<FormSertificate {...props} />}/>
                <Route path={"/admin/edit-certificate/:id"} element={<FormSertificate {...props} />}/>
                <Route path={"/admin/contacts"} element={<Contacts {...props} />}/>
                <Route path={"/admin/new-contact"} element={<FormContact {...props} />}/>
                <Route path={"/admin/edit-contact/:id"} element={<FormContact {...props} />}/>
                <Route path={"/admin/feedback"} element={<FeedBack {...props} />}/>
                <Route path={"/admin/global-id/feedback"} element={<FeedBack {...props} />}/>
                <Route path={"/admin/global-pay/feedback"} element={<FeedBack {...props} />}/>
                <Route path={"/admin/global-id/certificate"} element={<Certificate {...props} />}/>
                <Route path={"/admin/global-pay/certificate"} element={<Certificate {...props} />}/>
                <Route path={"/admin/telegram-pay/feedback"} element={<FeedBack {...props} />}/>
                <Route path={"/admin/telegram-pay/certificate"} element={<Certificate {...props} />}/>
                <Route path={'/admin/seo-panel'} element={<SeoPanel {...props}/>}/>
                <Route path={'/admin/seo-panel/add'} element={<SeoAddForm {...props}/>}/>
                <Route path={'/admin/seo-panel/edit/:id'} element={<SeoPanelDetail {...props}/>}/>
                <Route path="*" element={<NotFound  {...props} />}/>
            </Routes>
        </>
    )
}
