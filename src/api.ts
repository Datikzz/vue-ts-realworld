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
  public abstract baseUrl: string
  public abstract createInstance (): AxiosInstance
  public abstract get(url: string, opts?: object): Promise<AxiosResponse>
  public abstract post(url: string, data?: object, opts?: object): Promise<AxiosResponse>
  public abstract delete(url: string, data?: object): Promise<AxiosResponse>
  public abstract setJWT (jwt: string): void
  public abstract deleteJWT (): void
  protected abstract _formatUrl(url: string): string
}

class ApiService extends Api {
  public baseUrl: string
  private apiInstance: AxiosInstance
  constructor () {
    super()

    this.baseUrl = config.BASE_URL
    this.apiInstance = this.createInstance()
  }

  public createInstance () {
    return axios.create({
      baseURL: this.baseUrl,
    })
  }

  public setJWT (jwt: string) {
    this.apiInstance.defaults.headers.common['Authorization'] = `Token ${jwt}`
    localStorage.setItem(config.SUM_LOCAL_STORAGE_KEY_FUR_JWT, jwt)
  }

  public deleteJWT () {
    // this.apiInstance.defaults.headers.common['Authorization'] = null
    delete this.apiInstance.defaults.headers.common['Authorization']
    localStorage.removeItem(config.SUM_LOCAL_STORAGE_KEY_FUR_JWT)
  }

  public get (url: string, opts = {}) {
    return this.apiInstance.get(this._formatUrl(url), opts)
  }

  public post (url: string, data = {}, opts = {}) {
    return this.apiInstance.post(this._formatUrl(url), data, opts)
  }

  public put (url: string, data = {}, opts = {}) {
    return this.apiInstance.put(this._formatUrl(url), data, opts)
  }

  public delete (url: string, data = {}) {
    return this.apiInstance.delete(this._formatUrl(url), data)
  }

  protected _formatUrl (url: string) {
    return [this.baseUrl, url].map((i) => trim(i, '\\/')).join('/')
  }
}

export default new ApiService()
