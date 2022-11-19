import gitData from '../gitData.js';
import { fadeIn, formatDateGit } from '../helpers.js';
export default async function (state) {
  const gitReposEl = document.querySelector('.git');
  let githubFragment = new DocumentFragment();

  try {
    const currentDate = formatDateGit(new Date());
    const data = await gitData(state);
    data.map((repo) => {
      const repoName = repo[0]?.url.split('/')[5].toUpperCase();
      const repoURL = repo[0]?.html_url.split('/').slice(0, 5).join('/');
      const curDateCompare = currentDate.split(',')[0];
      const commitDate = formatDateGit(
        new Date(repo[0]?.commit.committer.date)
      );
      const comDateCompare = commitDate.split(',')[0];
      const commitMessage = repo[0]?.commit.message.split('\n')[0];
      const titleDate =
        curDateCompare === comDateCompare ? 'git__title--new' : 'git__title';
      const uDiv = document.createElement('div');
      uDiv.classList.add('git__container');
      const gitTooltip = document.createElement('span');
      gitTooltip.classList.add('tooltip', 'tooltip--git');
      gitTooltip.textContent = `
                       ${
                         repo[1]
                           ? formatDateGit(
                               new Date(repo[1]?.commit.committer.date)
                             )
                           : ''
                       }
                        ${repo[1]?.commit.message.split('\n')[0] ?? ''}\n
                        ${
                          repo[2]
                            ? formatDateGit(
                                new Date(repo[2]?.commit.committer.date)
                              )
                            : ''
                        }
                        ${repo[2]?.commit.message.split('\n')[0] ?? ''}\n
                        ${
                          repo[3]
                            ? formatDateGit(
                                new Date(repo[3]?.commit.committer.date)
                              )
                            : ''
                        }
                        ${repo[3]?.commit.message.split('\n')[0] ?? ''}\n
    `.replace(/  +/g, '');
      const repoUList = document.createElement('ul');
      const titleLi = document.createElement('li');
      titleLi.setAttribute('class', `${titleDate}`);
      const aHref = document.createElement('a');
      aHref.href = repoURL;
      aHref.textContent = `${repoName}`;
      const dateLi = document.createElement('li');
      dateLi.textContent = `${commitDate}`;
      const messageLi = document.createElement('li');
      messageLi.classList.add('.git__message');
      messageLi.textContent = `${commitMessage}`;
      titleLi.append(gitTooltip, aHref);
      repoUList.append(titleLi, dateLi, messageLi);
      uDiv.append(repoUList);
      githubFragment.append(uDiv);
    });
  } catch (error) {
    console.error(error);
  } finally {
    gitReposEl.append(githubFragment);
    fadeIn(gitReposEl);
  }
}
