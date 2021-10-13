import * as env from "./env.js"

// Random Background
function rColor(min, max) {
  let cNum = "#"
  for (let i = 0; i < 6; i++) {
    cNum += Math.floor(Math.random() * max) + min
  }
  return cNum
}
const bDirection = Math.floor(Math.random() * 360) + 1
document.body.style.backgroundImage = `linear-gradient(${bDirection}deg, ` +
  `${rColor(0, 2)}, ${rColor(1, 3)}, ${rColor(0, 2)})`

//Fill Bookmarks
let bFragment = new DocumentFragment()
const bMarks = document.querySelector(".bookmarks")
for (let i = 0; i < env.myBookmarks.length; i++) {
  const bookmarkDiv = document.createElement("div")
  const aHref = document.createElement('a')
  aHref.classList.add('item')
  aHref.href = `${env.myBookmarks[i][1]}`
  aHref.title = `${env.myBookmarks[i][0]}`
  aHref.setAttribute('alt', 'Bookmarks')
  const outerDiv = document.createElement('div')
  outerDiv.classList.add('item-thumb')
  outerDiv.style.backgroundColor = `${rColor(2, 5)}`
  const img = document.createElement('i')
  img.setAttribute('class', `${env.myBookmarks[i][2]}`)
  const innerDiv = document.createElement('div')
  innerDiv.classList.add('item-title')
  innerDiv.textContent = `${env.myBookmarks[i][0]}`
  outerDiv.appendChild(img)
  outerDiv.appendChild(innerDiv)
  aHref.appendChild(outerDiv)
  bookmarkDiv.appendChild(aHref)
  bFragment.appendChild(bookmarkDiv)
}
bMarks.appendChild(bFragment)

// Github Data
let gFragment = new DocumentFragment()


async function gitData() {
  for (let i = 0, n = env.gitRepos.length; i < n; i++) {
    let response = await fetch(`https://api.github.com/repos/` +
      `${env.gitRepos[i][0]}/commits?sha=${env.gitRepos[i][1]}&page=1&per_page=4`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': 'token ' + env.gitToken,
          'User-Agent': 'MyTab'
        }
      })
    if (response.ok) {
      const gHub = await response.json()
      let rTitle
      const repoName = env.gitRepos[i][0].split('/')[1].toUpperCase()
      const currentDate = new Date().toLocaleString()
      const curDateCompare = currentDate.split(',')[0]
      const commitDate = new Date(gHub[0].commit.committer.date).toLocaleString()
      const comDateCompare = commitDate.split(',')[0]
      const commitMessage = gHub[0].commit.message.split('\n')[0]
      if (curDateCompare === comDateCompare) {
        rTitle = 'rTitleNew'
      } else {
        rTitle = 'rTitle'
      }
      const gRepos = document.querySelector('.gRepos')
      const uList = document.createElement('ul')
      uList.title = (`
          ${new Date(gHub[1].commit.committer.date).toLocaleString()}
          ${gHub[1].commit.message.split('\n')[0]}\n
          ${new Date(gHub[2].commit.committer.date).toLocaleString()}
          ${gHub[2].commit.message.split('\n')[0]}\n
          ${new Date(gHub[3].commit.committer.date).toLocaleString()}
          ${gHub[3].commit.message.split('\n')[0]}\n
        `).replace(/  +/g, '')
      const titleLi = document.createElement('li')
      titleLi.setAttribute('class', `${rTitle}`)
      const aHref = document.createElement('a')
      aHref.href = `https://github.com/${env.gitRepos[i][0]}`
      aHref.textContent = `${repoName}`
      const dateLi = document.createElement('li')
      dateLi.textContent = `${commitDate}`
      const messageLi = document.createElement('li')
      messageLi.textContent = `${commitMessage}`
      titleLi.appendChild(aHref)
      uList.appendChild(titleLi)
      uList.appendChild(dateLi)
      uList.appendChild(messageLi)
      gFragment.appendChild(uList)
      gRepos.appendChild(gFragment)
    } else {
      console.log(Error)
    }
  }
}
gitData()

/* Get weather */
const curConditions = document.querySelector('.wCurrent')
const forConditions = document.querySelector('.wForecast')
let wCurFragment = new DocumentFragment()
let wForFragment = new DocumentFragment()
Promise.all([
  fetch(`https://api.weather.com/v2/pws/observations/current?stationId=${env.station}` +
    `&format=json&units=${env.units}&apiKey=${env.apiKey}`, {
      headers: {
        'Accept-Encoding': 'gzip'
      }
    }),
  fetch(`https://api.weather.com/v3/wx/forecast/daily/5day?geocode=${env.lattitude},` +
    `${env.longitude}&format=json&units=${env.units}&language=${env.language}&apiKey=${env.apiKey}`, {
      headers: {
        'Accept-Encoding': 'gzip'
      }
    })
]).then((responses) => {
  return Promise.all(responses.map((response) => {
    return response.json()
  }))
}).then((data) => {
  let dayTemp = data[1].temperatureMax
  if (dayTemp[0] === null) {
    dayTemp.shift()
    dayTemp.unshift("--")
  }
  let allIcons = data[1].daypart[0].iconCode
  if (allIcons[0] === null) {
    allIcons.copyWithin(0, 1, 2)
  }
  const dayIcons = allIcons.filter((_element, index) => {
    return index % 2 === 0
  })
  const nightIcons = allIcons.filter((_element, index) => {
    return index % 2 === 1
  })
  let allNaratives = data[1].daypart[0].narrative
  if (allNaratives[0] === null) {
    allNaratives.copyWithin(0, 1, 2)
  }
  const dayNarratives = allNaratives.filter((_element, index) => {
    return index % 2 === 0
  })
  const nightNarratives = allNaratives.filter((_element, index) => {
    return index % 2 === 1
  })
  /* Create Current Weather */
  const currentImg = document.createElement('i')
  currentImg.setAttribute('class', `fas ${wIcon(data[1].daypart[0].iconCode[0])}`)
  const curTempDiv = document.createElement('div')
  curTempDiv.classList.add('curTemp')
  curTempDiv.textContent = `${data[0].observations[0].imperial.temp}°`
  curConditions.appendChild(currentImg)
  curConditions.appendChild(curTempDiv)
  wCurFragment.appendChild(curConditions)
  /* Create Forecast */
  const weatherDays = data[1]
  for (let i = 0, n = weatherDays.dayOfWeek.length; i < n; i++) {
    const wHref = document.createElement('a')
    wHref.href = `https://www.wunderground.com/forecast/${env.station}`
    const dayBlock = document.createElement('div')
    const wDaysDiv = document.createElement('div')
    wDaysDiv.classList.add('wDays')
    wDaysDiv.textContent = `${weatherDays.dayOfWeek[i].slice(0, 3)}`
    const fContainerDiv = document.createElement('div')
    fContainerDiv.classList.add('fContainer')
    const dayIconsImg = document.createElement('i')
    dayIconsImg.setAttribute('class', `fas ${wIcon(dayIcons[i])}`)
    dayIconsImg.title = `${dayNarratives[i]}`
    const hDegreesDiv = document.createElement('div')
    hDegreesDiv.classList.add('hDegrees')
    hDegreesDiv.textContent = `${weatherDays.temperatureMax[i]}°`
    const nightIconsImg = document.createElement('i')
    nightIconsImg.setAttribute('class', `fas ${wIcon(nightIcons[i])}`)
    nightIconsImg.title = `${nightNarratives[i]}`
    const lDegreesDiv = document.createElement('div')
    lDegreesDiv.classList.add('lDegrees')
    lDegreesDiv.textContent = `${weatherDays.temperatureMin[i]}°`

    fContainerDiv.appendChild(dayIconsImg)
    fContainerDiv.appendChild(hDegreesDiv)
    fContainerDiv.appendChild(nightIconsImg)
    fContainerDiv.appendChild(lDegreesDiv)
    dayBlock.appendChild(wDaysDiv)
    dayBlock.appendChild(fContainerDiv)
    wHref.appendChild(dayBlock)
    wForFragment.appendChild(wHref)
  }
  forConditions.appendChild(wCurFragment)
  forConditions.appendChild(wForFragment)
}).catch((error) => {
  console.error(error);
})
/* Select Icon */
function wIcon(icon) {
  let selectedIcon
  switch (icon) {
    case 0:
    case 1:
    case 2:
    case 17:
    case 36:
    case 43:
      selectedIcon = 'fa-exclamation'
      break
    case 3:
    case 4:
    case 37:
    case 38:
    case 47:
      selectedIcon = 'fa-bolt'
      break
    case 5:
    case 6:
    case 7:
    case 13:
    case 14:
    case 15:
    case 16:
    case 18:
    case 41:
    case 42:
    case 46:
      selectedIcon = 'fa-snowflake'
      break
    case 19:
    case 20:
    case 21:
    case 22:
      selectedIcon = 'fa-smog'
      break
    case 23:
    case 24:
      selectedIcon = 'fa-wind'
      break
    case 26:
      selectedIcon = 'fa-cloud'
      break
    case 28:
    case 30:
      selectedIcon = 'fa-cloud-sun'
      break
    case 27:
    case 29:
      selectedIcon = 'fa-cloud-moon'
      break
    case 32:
    case 34:
      selectedIcon = 'fa-sun'
      break
    case 31:
    case 33:
      selectedIcon = 'fa-moon'
      break
    case 8:
    case 11:
    case 12:
    case 39:
    case 45:
      selectedIcon = 'fa-cloud-rain'
      break
    case null:
    case 44:
      selectedIcon = 'fa-slash'
      break
    default:
      selectedIcon = 'fa-poo-storm'
  }
  return selectedIcon
}
/* Monitorr */
const monURL = document.getElementById('monitorr');
if (env.monitorrURL !== undefined) {
  const mFrame = document.createElement('iframe')
  mFrame.classList.add('imonitorr')
  mFrame.setAttribute('src', `${env.monitorrURL}`)
  monURL.appendChild(mFrame)
}