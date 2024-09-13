import axios from 'axios';

export const fetchCourseData = async ({ name, teacher, org, token }) => {
  try {
    const response = await axios.get('https://vod.ntshu.me/api/', {
      params: {
        name,
        teacher,
        org,
        token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch course data');
  }
};