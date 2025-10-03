import fetch from 'node-fetch';

export default async function handler(req, res) {
  const userId = req.query.id;
  if (!userId) {
    return res.status(400).send('Укажите ID пользователя через ?id=<USER_ID>');
  }

  const url = `https://friends.roblox.com/v1/users/${userId}/followers/count`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

    const data = await response.json();
    res.status(200).send(data.count.toString());
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при получении данных');
  }
}
