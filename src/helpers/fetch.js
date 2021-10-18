
export const node_fetch = async () => (await import("node-fetch")).default;

export const fetch = async (url, init) => (await node_fetch())(url, init);
export default fetch;