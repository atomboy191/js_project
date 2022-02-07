let sign = document.getElementById('sign');
console.log(sign);

console.log(sign.textContent);
sign.textContent = 'welcome, bumps';

//sign.innerHTML = sign.innerHTML + '<p>what???</p>';

sign.style.color = 'blue';
let a = [10, 20, 30, 40];

a.forEach(function (element, index) {
    console.log(element);
    element += 1;
    a[index] += 1
});

console.log(a)