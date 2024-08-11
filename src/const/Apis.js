import axios from "axios";

export const create_question = (access_token, data) => {
    const cfg = {
        headers: {
            Authorization: "Bearer " + access_token,
        },
    };
    return axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + "/faq/question/create", data, cfg);
};

export const getMetaData = async (data) => {
    return await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + "/seometa", {});
};
export const postMetaData = (data) => {
    return axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + "/meta", data);
};
export const putMetaData = (data) => {
    return axios.put(process.env.NEXT_PUBLIC_API_BASE_URL + "/meta", data);
};
export const deleteMetaData = (data) => {
    return axios.delete(process.env.NEXT_PUBLIC_API_BASE_URL + "/meta", data);
};
// export const get_favorites_groups = (access_token, type) => {
//     const cfg = {
//         headers: {
//             "Authorization": "Bearer " + access_token
//         }
//     }
//     return axios.get(config.base_url + '/user/favorite-groups/' + type, cfg);
// }

// export const create_favorites_groups = (access_token, data) => {
//     const cfg = {
//         headers: {
//             Authorization: "Bearer " + access_token,
//         },
//     };
//     return axios.post(config.base_url + "/user/favorite-groups", { name: data }, cfg);
// };

// export const put_favorites_groups = (access_token, data) => {
//     const cfg = {
//         headers: {
//             Authorization: "Bearer " + access_token,
//         },
//     };
//     return axios.post(config.base_url + "/user/favorites", { group_ids: data }, cfg);
// };

// export const create_favorite = (access_token, data) => {
//     const cfg = {
//         headers: {
//             Authorization: "Bearer " + access_token,
//         },
//     };
//     return axios.post(config.base_url + "/user/favorites", data, cfg);
// };

