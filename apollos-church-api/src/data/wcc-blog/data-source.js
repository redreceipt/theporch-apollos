import { RESTDataSource } from 'apollo-datasource-rest';
import { createCursor, parseCursor } from '@apollosproject/server-core';

import { ApolloError } from 'apollo-server';

class dataSource extends RESTDataSource {
  baseURL = 'https://di0v2frwtdqnv.cloudfront.net';

  // api/v1 is copied in this path names instead of in the baseUrl as certain _links
  // within requests assume a different base then api/v1
  channelPath = 'api/v1/property/theporch-app/blog';

  nodePath = 'api/v1/blog';

  async getFromId(id) {
    const result = await this.get(`${this.nodePath}${id}`);
    if (!result || typeof result !== 'object' || result.error)
      throw new ApolloError(result?.error?.message, result?.error?.code);
    return result;
  }

  willSendRequest = (options) => {
    if (!options.cacheOptions) options.cacheOptions = {};
    options.cacheOptions.ttl = 0;
  };

  getShareUrl = async ({ slug }) => `https://www.theporch.live/blogs${slug}`;

  getCoverImage = ({ heroImage, thumbnailImage }) => {
    let uri;
    if (thumbnailImage) uri = `https:${thumbnailImage.file.url}`;
    if (heroImage) uri = `https:${heroImage.file.url}`;

    return uri ? { sources: [{ uri }] } : null;
  };

  createSummary({ subtitle }) {
    return subtitle;
  }

  async paginate({ pagination: { after, first } = {} } = {}) {
    let requestPath = this.channelPath;

    // parse the incoming cursor
    if (after) {
      const parsed = parseCursor(after);
      if (parsed && parsed.requestPath) {
        requestPath = parsed.requestPath;
      } else {
        throw new Error(`An invalid 'after' cursor was provided: ${after}`);
      }
    }

    const result = await this.get(requestPath);
    if (!result || result.error)
      throw new ApolloError(result?.error?.message, result?.error?.code);

    const getTotalCount = () => null;

    const limitedItems =
      first != null ? (result.items || []).slice(0, first) : result.items || [];

    // build the edges - translate messages to { edges: [{ node, cursor }] } format
    const edges = limitedItems.map((node, i) => ({
      node,
      cursor: null,
    }));

    edges[edges.length - 1].cursor = result._links.previous
      ? createCursor({ requestPath: result._links.previous })
      : null;

    return {
      edges,
      getTotalCount,
    };
  }
}

export default dataSource;
