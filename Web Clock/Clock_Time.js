const Hour_tag = document.getElementById("hour");
const Minute_tag = document.getElementById("min");
const Seconds_tag = document.getElementById("sec");
const ampm_tag = document.getElementById("ampm");

function running_clock() {
    let hr = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    let ampm = "AM";

    if(hr > 12){
        hr = hr - 12;
        ampm = "PM";
    }

    hr = hr<10 ? "0" + hr : hr;
    m = m<10 ? "0" + m : m;
    s = s<10 ? "0" + s : s;

    Hour_tag.innerText = hr;
    Minute_tag.innerText = m;
    Seconds_tag.innerText = s;
    ampm_tag, (innerText = ampm);
    setTimeout(() => {
        console.log('ppp')
        running_clock();
    }, 1000)
}
running_clock();