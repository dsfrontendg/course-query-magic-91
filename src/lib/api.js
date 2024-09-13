import axios from 'axios';

export const fetchCourseData = async ({ name, teacher, org, token }) => {
  try {
    const response = await axios.get('https://api.vod.ntshu.me/api/', {
      params: {
        name,
        teacher,
        org,
        token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};