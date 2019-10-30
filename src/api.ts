import axios, { AxiosInstance, AxiosResponse } from 'axios'
import trim from 'lodash/trim'
import config from '@/config/index.ts'
// import { AuthRequestBody, AuthRequestResponse } from '@/store/modules'

// for POST
// apiInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// export const clientApi = async (method, url, params = {}) => {
//   const request = await axios[method](`${API_URL}/${url}`, params);
//   try {
//     return request;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

abstract class Api {
  abstract baseUrl: string
  abstract apiInstance: AxiosInstance
  abstract createInstance (): AxiosInstance
  abstract get(url: string, opts?: object): Promise<AxiosResponse>
  abstract post(url: string, data?: object, opts?: object): Promise<AxiosResponse>
  abstract delete(url: string, data?: object): Promise<AxiosResponse>
  abstract setJWT (jwt: string): void
  abstract deleteJWT (): void
  protected abstract _formatUrl(url: string): string
}

class ApiService extends Api {
  baseUrl: string
  apiInstance: AxiosInstance
  constructor() {
    super()

    this.baseUrl = config.BASE_URL
    this.apiInstance = this.createInstance()
  }

  createInstance () {
    return axios.create({
      baseURL: this.baseUrl,
    })
  }

  setJWT (jwt: string) {
    this.apiInstance.defaults.headers.common['Authorization'] = `Token ${jwt}`
    localStorage.setItem(config.SUM_LOCAL_STORAGE_KEY_FUR_JWT, jwt);
  }

  deleteJWT () {
    // this.apiInstance.defaults.headers.common['Authorization'] = null
    delete this.apiInstance.defaults.headers.common['Authorization']
    localStorage.removeItem(config.SUM_LOCAL_STORAGE_KEY_FUR_JWT);
  }

  get (url: string, opts = {}) {
    return this.apiInstance.get(this._formatUrl(url), opts)
  }

  post (url: string, data = {}, opts = {}) {
    return this.apiInstance.post(this._formatUrl(url), data, opts)
  }

  delete (url: string, data = {}) {
    return this.apiInstance.delete(this._formatUrl(url), data)
  }

  _formatUrl (url: string) {
    return [this.baseUrl, url].map((i) => trim(i, '\\/')).join('/')
  }
}

export default new ApiService()
