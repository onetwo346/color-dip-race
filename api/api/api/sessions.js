export default function handler(req, res) {
  // Get the user's IP address
  const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Check if the user has a session cookie
  const sessionCookie = req.cookies.session;

  if (!sessionCookie) {
    // New IP detected, reset session
    res.setHeader('Set-Cookie', `session=${userIP}; Path=/; HttpOnly`);
    res.status(200).json({ isNewSession: true });
  } else if (sessionCookie !== userIP) {
    // IP changed, reset session
    res.setHeader('Set-Cookie', `session=${userIP}; Path=/; HttpOnly`);
    res.status(200).json({ isNewSession: true });
  } else {
    // Existing session
    res.status(200).json({ isNewSession: false });
  }
}
