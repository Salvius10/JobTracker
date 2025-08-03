import axios from "axios"

const BASE_URL="http://127.0.0.1:8000/api"

const getAuthHeader=()=>{
    const token=localStorage.getItem("access")
    return{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    };
};

export const fetchJobs=async ()=>{
    const res=await axios.get(`${BASE_URL}/jobs/`,getAuthHeader())
    return res.data
}

export const addJobs = async (jobData) => {
  const authHeaders = getAuthHeader().headers;

  const res = await axios.post(`${BASE_URL}/jobs/`, jobData, {
    headers: {
      ...authHeaders,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateJobs = async (id, jobData) => {
  const authHeaders = getAuthHeader().headers;

  const res = await axios.put(`${BASE_URL}/jobs/${id}`, jobData, {
    headers: {
      ...authHeaders,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};


export const deleteJobs=async (id)=>{
    const res=await axios.delete(`${BASE_URL}/jobs/${id}`,getAuthHeader())
    return res.data
}