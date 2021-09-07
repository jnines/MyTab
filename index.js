import * as env from './env.js'
// Render background
function rColor(min, max) {
    let cNum = '#';
    for (let i = 0; i < 6; i++) {
        cNum += Math.floor(Math.random() * max) + min;
    }
    return cNum;
}
let rColor1 = rColor(0, 2);
let rColor2 = rColor(1, 3);
let rColor3 = rColor(0, 2);
let gDirection = Math.floor(Math.random() * 360) + 1;
document.body.style.backgroundImage = 'linear-gradient(' + gDirection + 'deg, ' + rColor1 + ', ' + rColor2 + ', ' + rColor3 + ')';

// Create bookmarks
function fillBookmarks(myBookmarks) {
    let bMarks = document.getElementById('bookmarks');
    let bookMarks = document.createElement('div');
    bookMarks.innerHTML = `
        <a href="${myBookmarks[1]}" class="item item-bookmark" title="${myBookmarks[0]}">
        <div class="item-thumb" style="background-color: ${rColor(2, 5)}"> <i class="${myBookmarks[2]}"></i><div class="item-title">${myBookmarks[0]}</div></div>
    `;
    bMarks.appendChild(bookMarks);
}
for (let b = 0; b < env.myBookmarks.length; b++) {
    fillBookmarks(env.myBookmarks[b]);
}
// Github repo parsing
function requestGitRepos(gitRepos) {
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/repos/${gitRepos[0]}/branches/${gitRepos[1]}`;
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', 'token ' + env.gitToken);
    xhr.setRequestHeader('User-Agent', 'MyTab');
    xhr.onload = function() {
        // Parse JSON
        const data = JSON.parse(this.response);
        let fgName = gitRepos[0].lastIndexOf('/');
        let rsName = gitRepos[0].substring(fgName + 1);
        let rName = rsName.toUpperCase();
        let uDate = new Date();
        let cDate = uDate.toLocaleString();
        let s1Date = cDate.split(',');
        let fDate = new Date(data.commit.commit.committer.date);
        let lDate = fDate.toLocaleString();
        let s2Date = lDate.split(',');
        let cMessage = data.commit.commit.message;
        let fMessage = cMessage.split('\n')[0];
        // HTML stuff
        let ul = document.getElementById('gRepos');
        let li = document.createElement('li');
        let rTitle = null;
        if (s1Date[0] === s2Date[0]) {
            rTitle = "rTitleNew";
        }
        else {
            rTitle = "rTitle"
        }
        li.innerHTML = `
        <p class=${rTitle}><a href="https://github.com/${gitRepos}">${rName}</a></p>
        <p>${lDate}</p>
        <p>${fMessage}</p>
    `;
        ul.appendChild(li);
    };
    // Request
    xhr.send();
}

for (let g = 0; g < env.gitRepos.length; g++) {
    requestGitRepos(env.gitRepos[g]);
}
// Get weather
const curConditions = document.getElementById('wCurrent');
const forConditions = document.getElementById('wForecast');

function getWeather(lattitude, longitude) {
    const weatherR = new XMLHttpRequest();
    const wURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${env.lattitude}&lon=${env.longitude}&exclude=minutely,hourly&units=imperial&appid=${env.appid}`;
    weatherR.open('GET', wURL, false);
    weatherR.onload = function() {
        const weatherF = JSON.parse(this.response);
        const weatherI = weatherF.current.weather[0];
        curConditions.innerHTML = `<i class = 'fas ${wIcon(weatherI.icon)}'></i><div class="cTemp">${Math.round(weatherF.current.temp)}°/${Math.round(weatherF.current.feels_like)}°</div>`;
        weatherF.daily.forEach(day => {
            let date = new Date(day.dt * 1000);
            let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let name = days[date.getDay()];
            let dayBlock = document.createElement('div');
            dayBlock.innerHTML = `<div class="fHead">${name}</div>
        <div class="fInfo"><i class="fas ${wIcon(day.weather[0].icon)}"></i> <div class="hDegrees">${Math.round(day.temp.max)}°</div><div class="lDegrees">${Math.round(day.temp.min)}°</div></div>`;
            forConditions.appendChild(dayBlock);
        });
    };

    function wIcon(icon) {
        let selectedIcon;
        switch (icon) {
            case '01d':
                selectedIcon = 'fa-sun';
                break;
            case '01n':
                selectedIcon = 'fa-moon';
                break;
            case '02d':
            case '02n':
            case '03d':
            case '03n':
            case '04d':
            case '04n':
                selectedIcon = 'fa-cloud';
                break;
            case '09d':
            case '09n':
                selectedIcon = 'fa-cloud-rain';
                break;
            case '10d':
            case '10n':
                selectedIcon = 'fa-cloud-showers-heavy';
                break;
            case '11d':
            case '11n':
            case '13d':
            case '13n':
                selectedIcon = 'fa-snowflake';
                break;
            case '50d':
            case '50n':
                selectedIcon = 'fa-smog';
                break;
            default:
                selectedIcon = 'fa-poo-storm';
        }
        return selectedIcon;
    }
    weatherR.send();
}

getWeather(env.lattitude, env.longitude);

let monURL = document.getElementById('monitorr');
if (env.monitorrURL !== undefined) {
    monURL.innerHTML = `<iframe class="imonitorr" src=${env.monitorrURL}></iframe>`
}
