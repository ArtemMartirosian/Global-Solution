import axios from "axios";
import { getCookie, deleteCookie } from "../assets/scripts";

export const url = process.env.REACT_APP_MAIN_URL;

export const image_download = `${url}/storage/download`;
export const ADMIN_PANEL_GLOBAL = "GLOBAL_SITE";
export const ADMIN_PANEL_ID = "GLOBAL_ID";
export const ADMIN_PANEL_PAY = "GLOBAL_PAY";
export const ADMIN_PANEL_TELEGRAM = "GLOBAL_TG";

const clientInstance = axios.create({
  baseURL: url,
});

const adminInstance = axios.create({
  baseURL: url, // Раскомментировать при коммите
  // baseURL: "http://api.global.uz"     //Удалить при коммите
});

adminInstance.interceptors.request.use(
  (config) => {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    const token = getCookie("admin-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
adminInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    let status = (error.response && error.response.status) || 0;
    if (status === 401 && !originalRequest._retry) {
      deleteCookie("admin-token");
      window.location.reload();
      alert("401 error");
    } else {
      if (error.response) {
        let message =
          error.response.data && error.response.data.message
            ? error.response.data.message
            : "";
        let status = error.response.status ? error.response.status : "";
        let requestURL =
          error.response.request && error.response.request.responseURL
            ? error.response.request.responseURL
            : "";
        alert(`Status: ${status} \n ${requestURL} \n ${message}`);
      }
      throw error;
    }
  }
);

export const NewsClient = {
  getAll(params = {}) {
    return clientInstance.get(`/news`, { params }).then((response) => response);
  },
  getOne(id) {
    return clientInstance.get(`/news/${id}`).then((response) => response);
  },
  getByCategories(categories = [], params = {}) {
    return clientInstance
      .post(`/news/filtered-search`, { categories }, { params })
      .then((response) => response);
  },
  getCategories(params = {}) {
    return clientInstance
      .get(`/news-categories`, { params })
      .then((response) => response);
  },
  search(params) {
    return clientInstance
      .get(`/news/search`, { params })
      .then((response) => response);
  },
  like(id) {
    return clientInstance.get(`/news/${id}/like`).then((response) => response);
  },
  dislike(id) {
    return clientInstance
      .get(`/news/${id}/dislike`)
      .then((response) => response);
  },
  views(id) {
    return clientInstance
      .get(`/news/${id}/increase-views`)
      .then((response) => response);
  },
  top() {
    return clientInstance
      .get(`/news/top`, { params: { sort: "order" } })
      .then((response) => response);
  },
};

export const MinioUpload = {
  uploadPhoto(data) {
    return adminInstance.put(`/storage/upload`, data).then((response) => {
      return response;
    });
  },
};

export const VideoClient = {
  getAll(params = {}) {
    return clientInstance
      .get(`/videos`, { params })
      .then((response) => response);
  },
  getOne(id) {
    return clientInstance.get(`/videos/${id}`).then((response) => response);
  },
  like(id) {
    return clientInstance
      .get(`/videos/${id}/like`)
      .then((response) => response);
  },
  dislike(id) {
    return clientInstance
      .get(`/videos/${id}/dislike`)
      .then((response) => response);
  },
  search(params) {
    return clientInstance
      .get(`/videos/search`, { params })
      .then((response) => response);
  },
  filtered(categories = [], params = {}) {
    return clientInstance
      .post(`/videos/filtered-search`, { categories }, { params })
      .then((response) => response);
  },
  views(id) {
    return clientInstance
      .get(`/videos/${id}/increase-views`)
      .then((response) => response);
  },
};

export const PhotoClient = {
  getAll(params = {}) {
    return clientInstance
      .get(`/photos`, { params })
      .then((response) => response);
  },
  search(params) {
    return clientInstance
      .get(`/photos/search`, { params })
      .then((response) => response);
  },
  filtered(categories = [], params = {}) {
    return clientInstance
      .post(`/photos/filtered-search`, { categories }, { params })
      .then((response) => response);
  },
};

export const CategoriesClient = {
  getAll(props) {
    const page = props && props.page ? props.page : 0;
    return clientInstance
      .get(`/categories?page=${page}`)
      .then((response) => response);
  },
};

export const NetworkLogoClient = {
  getAll(props) {
    const page = props && props.page ? props.page : 0;
    return clientInstance
      .get(`/logos?page=${page}&sort=order`)
      .then((response) => response);
  },
};

export const ContactsClient = {
  getAll(props) {
    const page = props && props.page ? props.page : 0;

    return clientInstance
      .get(`/contacts?page=${page}`)
      .then((response) => response);
  },
};

export const LettersClient = {
  getAll(props) {
    const page = props && props.page ? props.page : 0;
    return clientInstance
      .get(`/letters?page=${page}&sort=order`)
      .then((response) => response);
  },
};

export const ExperienceApiClient = {
  getAll(props) {
    const page = props && props.page ? props.page : 0;
    return clientInstance
      .get(`/experiences?page=${page}&sort=order`)
      .then((response) => response);
  },
};

export const FeedBackApiClient = {
  createFeedBack(token, data) {
    return clientInstance
      .post(`/feedbacks`, data, { params: { response: token } })
      .then((response) => response);
  },
  updateFeedBack(data, id) {
    return clientInstance
      .put(`/feedbacks/${id}`, data)
      .then((response) => response);
  },
};

export const TeamClient = {
  getAll() {
    return clientInstance.get(`/teams?sort=order`).then((response) => response);
  },
};

export const LicensesClient = {
  getAll(props) {
    const { page, type } = props;
    return clientInstance
      .get(
        `/licenses/search/findAllByAdminPanel?page=${page ? page : 0}${
          type ? `&type=${type}` : ""
        }`
      )
      .then((response) => response);
  },
};

export const LoginApi = {
  authenticate(data) {
    return adminInstance
      .post(`/authenticate`, data)
      .then((response) => response);
  },
};

export const Banner = {
  bannerUpload(id, photo) {
    return adminInstance
      .patch(`/news/${id}/bannerPhoto`, photo)
      .then((response) => {
        return response;
      });
  },
};

export const Categories = {
  getAll(props) {
    const page = props && props.page ? props.page : 0;
    return adminInstance
      .get(`/categories?page=${page}`)
      .then((response) => response);
  },

  getCategory(id) {
    return adminInstance
      .get(`/categories/${id}?projection=all`)
      .then((response) => response);
  },

  createCategory(data) {
    return adminInstance.post("/categories", data).then((response) => response);
  },

  updateCategory(id, data) {
    return adminInstance
      .put(`/categories/${id}`, data)
      .then((response) => response);
  },

  deleteCategory(id) {
    return adminInstance
      .delete(`/categories/${id}`)
      .then((response) => response);
  },
};

export const NewsCategories = {
  getAll(props) {
    const page = props && props.page ? props.page : 0;
    return adminInstance
      .get(`/news-categories?page=${page}`)
      .then((response) => response);
  },

  getNewsCategory(id) {
    return adminInstance
      .get(`/news-categories/${id}?projection=all`)
      .then((response) => response);
  },

  createNewsCategory(data) {
    return adminInstance
      .post("/news-categories", data)
      .then((response) => response);
  },

  updateNewsCategory(id, data) {
    return adminInstance
      .put(`/news-categories/${id}`, data)
      .then((response) => response);
  },

  deleteNewsCategory(id) {
    return adminInstance
      .delete(`/news-categories/${id}`)
      .then((response) => response);
  },
};

export const Authors = {
  getAll(props) {
    const page = props && props.page ? props.page : 0;
    return adminInstance
      .get(`/authors?page=${page}`)
      .then((response) => response);
  },

  getAuthor(id) {
    return adminInstance
      .get(`/authors/${id}?projection=all`)
      .then((response) => response);
  },

  createAuthor(data) {
    return adminInstance.post("/authors", data).then((response) => response);
  },
  updateAuthor(id, data) {
    return adminInstance
      .put(`/authors/${id}`, data)
      .then((response) => response);
  },
  deleteAuthor(id) {
    return adminInstance.delete(`/authors/${id}`).then((response) => response);
  },
};

export const Videos = {
  getAll(props) {
    const page = props && props.page ? props.page : 0;
    return adminInstance
      .get(`/videos?page=${page}`)
      .then((response) => response);
  },

  getVideo(id) {
    return adminInstance
      .get(`/videos/${id}?projection=all`)
      .then((response) => response);
  },

  createVideo(data) {
    return adminInstance.post("/videos", data).then((response) => {
      return response;
    });
  },
  updateVideo(id, data) {
    return adminInstance.put(`/videos/${id}`, data).then((response) => {
      return response;
    });
  },
  deleteVideo(id) {
    return adminInstance.delete(`/videos/${id}`).then((response) => response);
  },
};

export const News = {
  getAll(params = {}) {
    return adminInstance.get(`/news`, { params }).then((response) => response);
  },
  updateNews(id, data) {
    return adminInstance.put(`/news/${id}`, data).then((response) => response);
  },

  getNews(id) {
    return adminInstance
      .get(`/news/${id}?projection=all`)
      .then((response) => response);
  },

  createNews(data) {
    return adminInstance.post("/news", data).then((response) => response);
  },
  deleteNews(id) {
    return adminInstance.delete(`/news/${id}`).then((response) => response);
  },
};

export const Photo = {
  getAll(params = {}) {
    return adminInstance
      .get(`/photos`, { params })
      .then((response) => response);
  },
  updatePhoto(id, data) {
    return adminInstance.put(`/photos/${id}`, data).then((response) => {
      return response;
    });
  },

  getPhoto(id) {
    return adminInstance
      .get(`/photos/${id}?projection=all`)
      .then((response) => response);
  },

  createPhoto(data) {
    return adminInstance.post("/photos", data).then((response) => response);
  },
  deletePhoto(id) {
    return adminInstance.delete(`/photos/${id}`).then((response) => response);
  },
};

export const NetworkLogo = {
  getAll(props) {
    const page = props && props.page ? props.page : 0;
    return adminInstance
      .get(`/logos?page=${page}&sort=order`)
      .then((response) => response);
  },

  getLogo(id) {
    return adminInstance
      .get(`/logos/${id}?projection=all`)
      .then((response) => response);
  },

  createLogo(data) {
    return adminInstance.post("/logos", data).then((response) => response);
  },

  updateLogo(id, data) {
    return adminInstance.put(`/logos/${id}`, data).then((response) => response);
  },

  deleteLogo(id) {
    return adminInstance.delete(`/logos/${id}`).then((response) => response);
  },
};

export const Files = {
  uploadFile(file, id, entity) {
    return adminInstance
      .post(`/storage/upload?entity=${entity}&id=${id}`, file)
      .then((response) => {
        return response;
      });
  },
  getFile(id) {
    return adminInstance.get(`/files/${id}`).then((response) => response);
  },
  downLoadFile(fileKey) {
    return adminInstance
      .get(`/storage/download?fileKey=${fileKey}`)
      .then((response) => response);
  },
  deleteFile(id) {
    return adminInstance.delete(`/files/${id}`).then((response) => response);
  },
};

export const ContactsApi = {
  getAll(props) {
    const page = props && props.page ? props.page : 0;
    return adminInstance
      .get(`/contacts?page=${page}`)
      .then((response) => response);
  },
  createContact(data) {
    return adminInstance.post(`/contacts`, data).then((response) => response);
  },

  getContact(id) {
    return adminInstance
      .get(`/contacts/${id}?projection=all`)
      .then((response) => response);
  },

  updateContact(id, data) {
    return adminInstance
      .put(`/contacts/${id}`, data)
      .then((response) => response);
  },

  deleteContact(id) {
    return adminInstance.delete(`/contacts/${id}`).then((response) => response);
  },
};

export const LettersApi = {
  getAll(props) {
    const page = props && props.page ? props.page : 0;
    return adminInstance
      .get(`/letters?page=${page}`)
      .then((response) => response);
  },
  createLetter(data) {
    return adminInstance.post(`/letters`, data).then((response) => response);
  },

  getLetter(id) {
    return adminInstance
      .get(`/letters/${id}?projection=all`)
      .then((response) => response);
  },

  updateLetter(id, data) {
    return adminInstance
      .put(`/letters/${id}`, data)
      .then((response) => response);
  },

  deleteLetter(id) {
    return adminInstance.delete(`/letters/${id}`).then((response) => response);
  },
};

export const ExperienceApi = {
  getAll(props) {
    const page = props && props.page ? props.page : 0;
    return adminInstance
      .get(`/experiences?page=${page}&sort=order`)
      .then((response) => response);
  },
  createExperience(data) {
    return adminInstance.post(`/experience`, data).then((response) => response);
  },

  getExperience(id) {
    return adminInstance
      .get(`/experiences/${id}?projection=all`)
      .then((response) => response);
  },

  updateExperience(id, data) {
    return adminInstance
      .put(`/experience/${id}`, data)
      .then((response) => response);
  },

  deleteExperience(id) {
    return adminInstance
      .delete(`/experiences/${id}`)
      .then((response) => response);
  },
};

export const FeedBackApi = {
  getAll(props) {
    const { page, type } = props;
    return adminInstance
      .get(
        `/feedbacks/search/findAllByAdminPanel?page=${page ? page : 0}${
          type ? `&type=${type}` : ""
        }`
      )
      .then((response) => response);
  },

  getFeedBack(id) {
    return adminInstance
      .get(`/feedbacks/${id}?projection=all`)
      .then((response) => response);
  },

  updateFeedBack(id, data) {
    return adminInstance
      .put(`/feedbacks/${id}`, data)
      .then((response) => response);
  },

  deleteFeedBack(id) {
    return adminInstance
      .delete(`/feedbacks/${id}`)
      .then((response) => response);
  },
};

export const TagsApi = {
  getAll(props) {
    const page = props && props.page ? props.page : 0;
    return adminInstance.get(`/tags?page=${page}`).then((response) => response);
  },
  createTag(data) {
    return adminInstance.post(`/tags`, data).then((response) => response);
  },

  getTag(id) {
    return adminInstance
      .get(`/tags/${id}?projection=all`)
      .then((response) => response);
  },

  updateTag(id, data) {
    return adminInstance.put(`/tags/${id}`, data).then((response) => response);
  },

  deleteTag(id) {
    return adminInstance.delete(`/tags/${id}`).then((response) => response);
  },
};

export const Teams = {
  getAll(props) {
    const page = props && props.page ? props.page : 0;
    return adminInstance
      .get(`/teams?page=${page}&sort=order`)
      .then((response) => response);
  },
  createEmployee(data) {
    return adminInstance.post(`/teams`, data).then((response) => response);
  },

  getEmployee(id) {
    return adminInstance
      .get(`/teams/${id}?projection=all`)
      .then((response) => response);
  },

  updateEmployee(id, data) {
    return adminInstance.put(`/teams/${id}`, data).then((response) => response);
  },

  deleteEmployee(id) {
    return adminInstance.delete(`/teams/${id}`).then((response) => response);
  },
};

export const Licenses = {
  getAll(props) {
    const { page, type } = props;
    return adminInstance
      .get(
        `/licenses/search/findAllByAdminPanel?page=${page ? page : 0}${
          type ? `&type=${type}` : ""
        }`
      )
      .then((response) => response);
  },
  createLicenses(data) {
    return adminInstance.post(`/licenses`, data).then((response) => response);
  },

  getLicenses(id) {
    return adminInstance
      .get(`/licenses/${id}?projection=all`)
      .then((response) => response);
  },

  updateLicenses(id, data) {
    return adminInstance
      .put(`/licenses/${id}`, data)
      .then((response) => response);
  },

  deleteLicenses(id) {
    return adminInstance.delete(`/licenses/${id}`).then((response) => response);
  },
};

export const Seo = {
  getAll(props) {
    return adminInstance.get("/seo").then((response) => response.data);
  },
  getOne(id) {
    return adminInstance.get(`seo/${id}`).then((response) => response.data);
  },
  create(data) {
    return adminInstance.post("/seo", data);
  },
  update(data, id) {
    return adminInstance.put(`/seo/${id}`, data);
  },
  delete(id) {
    return adminInstance.delete(`/seo/${id}`);
  },
};
