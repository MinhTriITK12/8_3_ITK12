// script.js
const introContent = document.getElementById('intro-content');
const startBtn = document.getElementById('start-btn');
const flowerContainer = document.getElementById('flower-container');
const letterModal = document.getElementById('letter-modal');
const continueBtn = document.getElementById('continue-btn');
const floatingContainer = document.getElementById('floating-images');
const centerText = document.getElementById('center-text');

// DANH SÁCH LINK ẢNH CỦA BẠN - HÃY THAY LINK ẢNH THẬT VÀO ĐÂY
const imageLinks = [
    "image/KhanhVyitk12.jpg",
    "image/HaLinhitk12.jpg",
    "image/AnhThuitk12.jpg",
    "image/ThuThaoitk12.jpg",
    "image/BoiTramitk12.png",
    "image/ThanhYenitk12.jpg",
    "image/HongPhuongitk12.jpg",
    "image/HieuHoaitk12.jpg",
    "image/KhanhQuynhitk12.jpg",
    "image/MinhKhanhitk12.jpg",
    "image/HoaiAnitk12.jpg",
    "image/NhuTamitk12.jpg"
];

let imageInterval;

// Xử lý khi bấm nút mở quà
startBtn.addEventListener('click', () => {
    // Phát nhạc nền
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) bgMusic.play();

    introContent.style.display = 'none';

    document.getElementById('castle').style.display = 'flex';
    document.getElementById('theSvg').style.display = 'block';

    startSvgDrawing();

    // Tự động rút lá thư lên (lòi ra ngoài) sau 8.5 giây (hoàn thành vẽ SVG)
    setTimeout(() => {
        card.style.top = '-90px';
    }, 8500);

    // Tự động mở form thư (phóng to bức thư) lên sau 10.5 giây
    setTimeout(() => {
        document.querySelector('.wrapperLetterForm').style.display = 'flex';
        document.getElementById('castle').style.display = 'none';
        document.getElementById('theSvg').style.display = 'none';

        funcTimeoutLetter();
    }, 10500);
});

// Xử lý hover card (Dành cho trước khi lá thư tự bay ra)
const card = document.getElementById('letter-card');
const valentines = document.querySelector('.valentines');
valentines.addEventListener('mouseenter', () => {
    card.style.top = '-90px';
});
valentines.addEventListener('mouseleave', () => {
    card.style.top = '5px';
});

// Logic đánh chữ thư
let indexText = 0;
let textLetter = document.querySelector('.textLetter h2');
const textLetterH2 = "Gửi những nàng thơ của ITK12! ✨";
let timoutTextLetter;

function textCharLetter() {
    if (indexText < textLetterH2.length) {
        textLetter.textContent += textLetterH2[indexText];
        indexText++;
        setTimeout(textCharLetter, 100);
    }
    else {
        clearTimeout(timoutTextLetter);
        setTimeout(() => {
            funcTimeoutLetterContent()
        }, 500)
    }
}
function funcTimeoutLetter() {
    indexText = 0;
    textLetter.textContent = '';
    clearTimeout(timoutTextLetter);
    timoutTextLetter = setTimeout(textCharLetter, 200);
}

let indexTextContent = 0;
let textLetterContent = document.querySelector('.contentLetter');
const textLetterP = "Hành trình đã qua, đem lại cho chúng ta biết bao kỉ niệm đẹp dưới mái trường Chuyên này, các cậu chắc đang cất riêng cho mình những mảnh kí ức đẹp đó nhỉ! Nhân ngày 8/3, chúc các bạn luôn rạng rỡ và tỏa sáng với phiên bản tuyệt vời nhất. Cảm ơn các bạn đã luôn là những mảnh thanh xuân rực rỡ trong kí ức tụi tớ. Chúc một nửa thế giới của ITK12 có một ngày ngập tràn tiếng cười và thật nhiều hạnh phúc nha. 8/3 thật trọn vẹn nhé! 💖";
let timoutTextLetterContent;
function textCharLetterContent() {
    if (indexTextContent < textLetterP.length) {
        textLetterContent.textContent += textLetterP[indexTextContent];
        indexTextContent++;
        timoutTextLetterContent = setTimeout(textCharLetterContent, 50);
    } else {
        document.querySelector('.close-letter').style.display = 'block';
    }
}
function funcTimeoutLetterContent() {
    indexTextContent = 0;
    textLetterContent.textContent = '';
    document.querySelector('.close-letter').style.display = 'none';
    clearTimeout(timoutTextLetterContent);
    timoutTextLetterContent = setTimeout(textCharLetterContent, 100);
}

document.querySelector('.close-letter').addEventListener('click', () => {
    document.querySelector('.wrapperLetterForm').style.display = 'none';
    centerText.style.display = 'block';

    // Bắt đầu hiệu ứng ảnh bay lên
    createFloatingImage();
    imageInterval = setInterval(createFloatingImage, 800);
});

function startSvgDrawing() {
    let rid = null; // request animation id
    const SVG_NS = "http://www.w3.org/2000/svg";
    const shape = document.getElementById('shape');
    const partialPath = document.getElementById('partialPath');
    const pathlength = shape.getTotalLength();

    let t = 0; // at the begining of the path
    let lengthAtT = pathlength * t;

    let d = shape.getAttribute("d");

    // 1. build the d array
    let n = d.match(/C/gi).length; // how many times

    let pos = 0; // the position, used to find the indexOf the nth C

    class subPath {
        constructor(d) {
            this.d = d;
            this.get_PointsRy();
            this.previous = subpaths.length > 0 ? subpaths[subpaths.length - 1] : null;
            this.measurePath();
            this.get_M_Point(); //lastPoint
            this.lastCubicBezier;
            this.get_lastCubicBezier();
        }

        get_PointsRy() {
            this.pointsRy = [];
            let temp = this.d.split(/[A-Z,a-z\s,]/).filter(v => v); // remove empty elements
            temp.map(item => {
                this.pointsRy.push(parseFloat(item));
            });
        }

        measurePath() {
            let path = document.createElementNS(SVG_NS, "path");
            path.setAttributeNS(null, "d", this.d);
            this.pathLength = path.getTotalLength();
        }

        get_M_Point() {
            if (this.previous) {
                let p = this.previous.pointsRy;
                let l = p.length;
                this.M_point = [p[l - 2], p[l - 1]];
            } else {
                let p = this.pointsRy;
                this.M_point = [p[0], p[1]];
            }
        }

        get_lastCubicBezier() {
            let lastIndexOfC = this.d.lastIndexOf("C");
            let temp = this.d
                .substring(lastIndexOfC + 1)
                .split(/[\s,]/)
                .filter(v => v);
            let _temp = [];
            temp.map(item => {
                _temp.push(parseFloat(item));
            });
            this.lastCubicBezier = [this.M_point];
            for (let i = 0; i < _temp.length; i += 2) {
                this.lastCubicBezier.push(_temp.slice(i, i + 2));
            }
        }
    }

    let subpaths = [];
    for (let i = 0; i < n; i++) {
        let newpos = d.indexOf("C", pos + 1);
        if (i > 0) {
            let sPath = new subPath(d.substring(0, newpos));
            subpaths.push(sPath);
        }
        pos = newpos;
    }
    subpaths.push(new subPath(d));

    let T;
    let newPoints;
    let index;

    function get_T(t, index) {
        let T;
        lengthAtT = pathlength * t;
        if (index > 0) {
            T = (lengthAtT - subpaths[index].previous.pathLength) /
                (subpaths[index].pathLength - subpaths[index].previous.pathLength);
        } else {
            T = lengthAtT / subpaths[index].pathLength;
        }
        return T;
    }

    function lerp(A, B, t) {
        return [
            (B[0] - A[0]) * t + A[0], //x
            (B[1] - A[1]) * t + A[1] //y
        ];
    }

    function getBezierPoints(t, points) {
        let helperPoints = [];
        for (let i = 1; i < 4; i++) {
            let p = lerp(points[i - 1], points[i], t);
            helperPoints.push(p);
        }
        helperPoints.push(lerp(helperPoints[0], helperPoints[1], t));
        helperPoints.push(lerp(helperPoints[1], helperPoints[2], t));
        helperPoints.push(lerp(helperPoints[3], helperPoints[4], t));
        return [
            points[0],
            helperPoints[0],
            helperPoints[3],
            helperPoints[5]
        ];
    }

    function drawCBezier(points, path, index) {
        let d;
        if (index > 0) {
            d = subpaths[index].previous.d;
        } else {
            d = `M${points[0][0]},${points[0][1]} C`;
        }
        for (let i = 1; i < 4; i++) {
            d += ` ${points[i][0]},${points[i][1]} `;
        }
        // fix error pass null namespace 
        partialPath.setAttributeNS(null, "d", d);
    }

    function Typing() {
        rid = window.requestAnimationFrame(Typing);
        if (t >= 1) {
            window.cancelAnimationFrame(rid);
            rid = null;
        } else {
            t += 0.0025;
        }

        lengthAtT = pathlength * t;
        for (index = 0; index < subpaths.length; index++) {
            if (subpaths[index].pathLength >= lengthAtT) {
                break;
            }
        }
        T = get_T(t, index);
        newPoints = getBezierPoints(T, subpaths[index].lastCubicBezier);
        drawCBezier(newPoints, partialPath, index);
    }

    // Start drawing
    rid = window.requestAnimationFrame(Typing);
}

// Logic tạo ảnh bay
function createFloatingImage() {
    const img = document.createElement('img');

    // Chọn ngẫu nhiên 1 ảnh
    const randomImage = imageLinks[Math.floor(Math.random() * imageLinks.length)];
    img.src = randomImage;
    img.className = 'floating-img';

    // Vị trí ngang ngẫu nhiên
    const randomLeft = Math.floor(Math.random() * 70) + 10;
    img.style.left = randomLeft + 'vw';

    // Độ nghiêng ngẫu nhiên để trông tự nhiên
    const startRot = Math.floor(Math.random() * 60) - 30;
    const endRot = Math.floor(Math.random() * 180) - 90;

    img.style.setProperty('--start-rot', startRot + 'deg');
    img.style.setProperty('--end-rot', endRot + 'deg');

    floatingContainer.appendChild(img);

    // Dọn dẹp ảnh sau khi bay khỏi màn hình (8s)
    setTimeout(() => {
        img.remove();
    }, 8000);
}