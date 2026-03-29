"use strict";
//switch theeme
const changColor = document.getElementById('changColor');
const body = document.body;
const logo = document.querySelector('.logo img');
changColor.addEventListener('click', changeMoodfunc);
var changMood;
(function (changMood) {
    changMood["Dark"] = "dark";
    changMood["Light"] = "light";
    changMood["Icon"] = "icon";
    changMood["Mood"] = "mood";
    changMood["logo"] = "logo";
})(changMood || (changMood = {}));
function changeMoodfunc() {
    if (body.dataset.theme == changMood.Dark) {
        body.dataset.theme = changMood.Light;
        changColor.children[0].src = './assets/images/icon-moon.svg';
        logo.src = './assets/images/logo.svg';
        localStorage.setItem(changMood.Mood, changMood.Light);
        localStorage.setItem(changMood.Icon, './assets/images/icon-moon.svg');
        localStorage.setItem(changMood.logo, './assets/images/logo.svg');
    }
    else {
        body.dataset.theme = changMood.Dark;
        logo.src = './assets/images/Gemini_Generated_Image_b503owb503owb503-removebg-preview.png';
        changColor.children[0].src = './assets/images/icon-sun.svg';
        localStorage.setItem(changMood.Mood, changMood.Dark);
        localStorage.setItem(changMood.Icon, './assets/images/icon-sun.svg');
        localStorage.setItem(changMood.logo, './assets/images/Gemini_Generated_Image_b503owb503owb503-removebg-preview.png');
    }
}
if (localStorage.getItem(changMood.Mood) && localStorage.getItem(changMood.Icon)) {
    body.dataset.theme = localStorage.getItem(changMood.Mood) ?? '';
    changColor.children[0].src = localStorage.getItem(changMood.Icon) ?? "";
    logo.src = localStorage.getItem(changMood.logo) ?? '';
}
async function getData() {
    let response = await fetch('./data.json');
    if (!response.ok) {
        throw Error(`Error response ${response.status}`);
    }
    return response.json();
}
let row = document.getElementById('row');
async function addElemente() {
    let data = await getData();
    for (let obj of data) {
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('col-lg-4', 'parent');
        const box = document.createElement('div');
        box.classList.add('box', 'rounded-4', 'p-4');
        // upside div
        const upSide = document.createElement('div');
        upSide.classList.add('upSide', 'd-flex', 'gap-3', 'align-items-center');
        const logo = document.createElement('img');
        logo.src = obj.logo;
        const spratDiv = document.createElement('div');
        const h5 = document.createElement('h5');
        h5.textContent = obj.name;
        const span = document.createElement('span');
        span.textContent = obj.description;
        spratDiv.append(h5, span);
        upSide.append(logo, spratDiv);
        // upside div
        // footer
        const footer = document.createElement('div');
        footer.classList.add('footer', 'mt-5', 'd-flex', 'justify-content-between', 'align-items-center');
        const remove = document.createElement('button');
        remove.classList.add('remove', 'rounded-pill');
        remove.textContent = 'Remove';
        const tgBtn = document.createElement('div');
        if (obj.isActive) {
            tgBtn.classList.add('active');
        }
        tgBtn.classList.add('toggleBtn', 'rounded-pill', 'position-relative');
        const circle = document.createElement('span');
        circle.classList.add('position-absolute', 'rounded-circle', 'toggleChild');
        tgBtn.append(circle);
        footer.append(remove, tgBtn);
        // footer
        // append all in row div at html page
        box.append(upSide, footer);
        mainDiv.append(box);
        row.append(mainDiv);
    }
}
addElemente();
function toggleFunc(e) {
    e.classList.toggle('active');
}
function getRemove(ele) {
    ele.closest('.parent').remove();
}
document.addEventListener('click', (e) => {
    if (e.target.classList.contains("toggleBtn")) {
        let toggleBtn = e.target;
        toggleFunc(toggleBtn);
    }
    if (e.target.classList.contains("toggleChild")) {
        let toggleBtnch = e.target.parentElement;
        toggleFunc(toggleBtnch);
    }
    if (e.target.classList.contains('remove')) {
        const remove = e.target;
        getRemove(remove);
    }
});
// create filter lists
const filterList = document.querySelectorAll('.filterList li');
filterList.forEach((li) => {
    li.addEventListener('click', (e) => {
        filterList.forEach((ele) => {
            ele.classList.remove('active');
        });
        let targetEle = e.currentTarget;
        targetEle.classList.add('active');
        if (targetEle.dataset.status === 'active') {
            const checkAct = document.querySelectorAll('.parent .toggleBtn');
            checkAct.forEach((box) => {
                if (!box.classList.contains('active')) {
                    box.closest('.parent').style.display = 'none';
                }
                else {
                    box.closest('.parent').style.display = 'block';
                }
            });
        }
        if (targetEle.dataset.status === 'inactive') {
            const checkAct = document.querySelectorAll('.parent .toggleBtn');
            checkAct.forEach((box) => {
                if (box.classList.contains('active')) {
                    box.closest('.parent').style.display = 'none';
                }
                else {
                    box.closest('.parent').style.display = 'block';
                }
            });
        }
        if (targetEle.dataset.status === 'all') {
            const checkAct = document.querySelectorAll('.parent ');
            checkAct.forEach((box) => {
                box.closest('.parent').style.display = 'block';
            });
        }
    });
});
//# sourceMappingURL=main.js.map