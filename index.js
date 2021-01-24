// ***VARIABLES START***
// ['Title', 'URL', 'font-awesome'],
const myBookmarks = [
    ['Weather', 'https://www.wunderground.com/forecast/KDSM', 'fas fa-cloud-sun-rain'],
    ['Midland', 'https://homebanking.midlandcu.org/servlet/SLogin?template=/c/login/sloginsc.vm&amp;login=true&amp;defaultLanguage=en', 'fas fa-money-check-alt'],
    ['Arch', 'https://www.archlinux.org/', 'fab fa-linux'],
    ['AUR', 'https://aur.archlinux.org/', 'fab fa-linux'],
    ['ProtonDB', 'https://www.protondb.com/', 'fab fa-steam'],
    ['Pihole', 'http://pi.hole/admin/index.php', 'fab fa-raspberry-pi'],
    ['Edgerouter X', 'http://10.10.10.1/#Dashboard', 'fas fa-network-wired'],
    ['Unifi', 'https://ash.lan:9007/manage/account/login?redirect=%2Fmanage', 'fas fa-wifi'],
    ['Switch', 'http://10.10.10.2/cs268aae7c/config/log_off_page.htm', 'fas fa-network-wired'],
    ['Bazarr', 'http://ash.lan:9010/movies', 'far fa-closed-captioning'],
    ['Portainer', 'http://ash.lan:9004/#/containers', 'fab fa-docker'],
    ['Pihole Ash', 'http://ash.lan/admin/', 'fab fa-raspberry-pi'],
    ['Archbox', 'https://127.0.0.1:8080/', 'fas fa-sync-alt'],
    ['Ash', 'http://10.10.10.108:8384/', 'fas fa-sync-alt'],
    ['N', 'http://10.10.10.107:8384/', 'fas fa-sync-alt'],
    ['NL', 'http://10.10.10.105:8384/', 'fas fa-sync-alt'],
    ['G', 'http://10.10.10.109:8384/', 'fas fa-sync-alt'],
    ['Ring', 'https://ring.com/account', 'fab fa-watchman-monitoring']
];
// Git token, otherwise limited to 60 hits per hour
const gitToken = '********************************************';
// Array of repos to check
const gitRepos = [
    'Frogging-Family/linux-tkg',
    'Frogging-Family/nvidia-all',
    'Sapd/HeadsetControl',
    'linuxserver/docker-unifi-controller',
    'flightlessmango/MangoHud'
];
// Coordinates for weather
const lattitude = '1.0000';
const longitude = '-99.0000';
// Openweathermap appid
const appid = '*************************************************';
// ***VARIABLES END***
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
for (let b = 0; b < myBookmarks.length; b++) {
    fillBookmarks(myBookmarks[b]);
}
// Github repo parsing
function requestGitRepos(gitRepos) {
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/repos/${gitRepos}/branches/master`;
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', 'token ' + gitToken);
    xhr.setRequestHeader('User-Agent', 'MyTab');
    xhr.onload = function() {
        // Parse JSON
        const data = JSON.parse(this.response);
        let fgName = gitRepos.lastIndexOf('/');
        let rsName = gitRepos.substring(fgName + 1);
        let rName = rsName.toUpperCase();
        let fDate = new Date(data.commit.commit.committer.date);
        let lDate = fDate.toLocaleString();
        let cMessage = data.commit.commit.message;
        let fMessage = cMessage.split('\n')[0];
        // HTML stuff
        let ul = document.getElementById('gRepos');
        let li = document.createElement('li');
        li.innerHTML = `
                            <p class="rTitle"><a href="https://github.com/${gitRepos}">${rName}</a></p>
                            <p>${lDate}</p>
                            <p>${fMessage}</p>
                    `;
        ul.appendChild(li);
    };
    // Request
    xhr.send();
}

for (let g = 0; g < gitRepos.length; g++) {
    requestGitRepos(gitRepos[g]);
}
// Get weather
const curConditions = document.getElementById('wCurrent');
const forConditions = document.getElementById('wForecast');

function getWeather(lattitude, longitude) {
    const weatherR = new XMLHttpRequest();
    const wURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&exclude=minutely,hourly&units=imperial&appid=${appid}`;
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
getWeather(lattitude, longitude);
