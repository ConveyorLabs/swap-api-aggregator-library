export async function buildQueryParams(swapData, pathId) {
  const { recipient } = swapData;

  const payload = {
    userAddr: recipient,
    pathId,
    simulate: true,
  };

  return JSON.stringify(payload);
}
