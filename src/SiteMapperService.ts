import Sitemapper from 'sitemapper'
import {getLogger} from "./logger";
import {join} from "path";

const outDir = join(process.cwd(), "bl-tmp")
const quiet = true
const logger = getLogger({ outDir, quiet });



export const retrieveSites = async (url: string): Promise<any[]> => {
  const siteMapper = new Sitemapper({
    url: makeFullSiteMapUrlString(url),
    timeout: 15000,
  })
  try {
    const { sites } = await siteMapper.fetch()
    return convertToLinksForBlackLight(sites)
  } catch (e) {
    logger.error(e, `Not able to retrieve list of sites for:  ${url}`)
    return []
  }
}

const makeFullSiteMapUrlString = (url: string): string => {
  return `${url}/sitemap.xml`
}

const convertToLinksForBlackLight = (sites: string[]) => {
  return sites.map(site => {
    return {
      href: site
    }
  })
}

