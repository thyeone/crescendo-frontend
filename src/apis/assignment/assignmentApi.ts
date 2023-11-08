import instance from '@apis/instance';

const assingmentApi = {
  getAssignmentList: async (
    uuid: string,
    truncate = 120,
  ): Promise<AssignmentList> => {
    const { data } = await instance.get(
      `/api/v1/studygroup/studies/${uuid}/assignments/?truncate=${truncate}`,
    );
    return data;
  },

  postAssignmentDetail: async (
    uuid: string,
    title: string,
    content: string,
  ): Promise<Pick<Assignment, 'title' | 'content'>> => {
    const { data } = await instance.post(
      `/api/v1/studygroup/studies/${uuid}/assignments/`,
      {
        title,
        content,
      },
    );
    return data;
  },

  getAssignmentDetail: async (
    uuid: string,
    id: number,
  ): Promise<Assignment> => {
    const { data } = await instance.get(
      `/api/v1/studygroup/studies/${uuid}/assignments/${id}`,
    );
    return data;
  },

  putAssignmentDetail: async (
    id: number,
    uuid: string,
    title: string,
    content: string,
  ): Promise<Assignment> => {
    const { data } = await instance.put(
      `/api/v1/studygroup/studies/${uuid}/assignments/${id}`,
      {
        title,
        content,
      },
    );
    return data;
  },

  deleteAssignmentDetail: async (id: number, uuid: string): Promise<void> => {
    return await instance.delete(
      `/api/v1/studygroup/studies/${uuid}/assignments/${id}/`,
    );
  },
};

export default assingmentApi;