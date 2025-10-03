import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId не указан" });
  }

  try {
    const response = await fetch(`https://friends.roblox.com/v1/users/${userId}/followers/count`);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Ошибка при запросе к Roblox API' });
    }

    const data = await response.json();
    res.status(200).json({ count: data.count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
