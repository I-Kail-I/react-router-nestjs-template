import axios, { type CreateAxiosDefaults } from 'axios'

const config: CreateAxiosDefaults = {
    baseURL: '/api',
    withCredentials: true,
    timeout: 60000
};

export const apiClient = axios.create(config);
