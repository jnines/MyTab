export default async function (url) {
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  }
}
