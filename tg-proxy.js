export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Change host from your worker address to api.telegram.org
    const telemetryEndpoint = "https://api.telegram.org" + url.pathname + url.search;
    
    // Forward the original request with all POST body data and headers completely intact
    const modifiedRequest = new Request(telemetryEndpoint, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });
    
    return await fetch(modifiedRequest);
  }
};
