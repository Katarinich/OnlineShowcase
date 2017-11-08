const filesPath = 'files/'

class UrlBuilderClass {
  constructor(baseHost) {
    this.baseHost = baseHost

    this.buildFileUrl = this.buildFileUrl.bind(this)
    this.buildUrl = this.buildUrl.bind(this)
  }

  buildFileUrl(fileId) {
    return `${this.baseHost}/${filesPath}${fileId}`
  }

  buildUrl(path, queryParams) {
    if (!queryParams) {
      return `${this.baseHost}${path}`
    }

    let url = `${this.baseHost}${path}?`

    queryParams.forEach((key) => {
      if (queryParams[key]) {
        url = `${url}${key}=${!Array.isArray(queryParams[key]) ? queryParams[key] : `[${queryParams[key].join(',')}]`}&`
      }
    })

    return url
  }
}

const UrlBuilder = new UrlBuilderClass(process.env.API_LOCATION)
export default UrlBuilder
