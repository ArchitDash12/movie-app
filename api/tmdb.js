export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { path: tmdbPath, ...restQuery } = req.query;

    // Handle path whether it's an array or string
    let resolvedPath = '';
    if (Array.isArray(tmdbPath)) {
      resolvedPath = tmdbPath.join('/');
    } else if (typeof tmdbPath === 'string') {
      resolvedPath = tmdbPath;
    }

    // Clean leading/trailing slashes
    resolvedPath = resolvedPath.replace(/^\/+|\/+$/g, '');

    const searchParams = new URLSearchParams(restQuery);
    const queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';
    const tmdbUrl = `https://api.themoviedb.org/3/${resolvedPath}${queryString}`;

    const apiKey = process.env.VITE_TMDB_API_KEY || process.env.TMDB_API_KEY;
    const authHeader = req.headers.authorization || (apiKey ? `Bearer ${apiKey}` : '');

    const response = await fetch(tmdbUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: authHeader,
      },
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('TMDB Proxy Error:', error);
    return res.status(500).json({ error: 'Failed to proxy request to TMDB', message: error.message });
  }
}
