import getJwtToken from './jwt-token';


export const getToken = async (payload) => getJwtToken(`/project/kvtoken/${payload.domain}`, {
    ...payload,
    method: 'GET',
})
export const listKeyValue = async (payload) =>
    getJwtToken(`/kv/keys/${payload.domain}`, {
        ...payload,
        method: 'GET',
    });

export const getKeyValue = async (payload) =>
    getJwtToken(`/kv/get/${payload.domain}/${payload.key}`, {
        ...payload,
        method: 'GET',
    });
export const putKeyValue = async (payload) =>
    getJwtToken(`/kv/put/${payload.domain}/${payload.key}`, {
        method: 'POST',
        ...payload,
        body: payload.value,

    });
export const deleteKeyValue = async (payload) =>
    getJwtToken(`/kv/delete/${payload.domain}/${payload.key}`, {
        ...payload,
        method: 'POST',
    });

