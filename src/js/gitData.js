import { gitHeaders } from './config.js';
export default async function (repos) {
  const key = repos.gitKey;
  const fetchArr = repos.gitRepos.map((repo) =>
    fetch(
      `https://api.github.com/repos/${repo.repo}/commits?sha=${repo.branch}&page=1&per_page=4`,
      gitHeaders(key)
    ).then((res) => {
      if (!res.ok) throw new Error(`${repo[0]} ${repo[1]} incorrect values`);
      return res.json();
    })
  );
  const responses = await Promise.allSettled(fetchArr);
  const data = responses
    .filter((res) => res.status === 'fulfilled')
    .map((data) => data.value);
  const rejected = responses
    .filter((rej) => rej.status === 'rejected')
    .map((rej) => rej.reason);
  if (rejected.length >= 1) console.error(...rejected);
  return data;
}
