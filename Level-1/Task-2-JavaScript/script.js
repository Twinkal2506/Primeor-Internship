
// 1. Background Color Changer

const colorButton = document.getElementById("colorButton");

const backgroundColors = [
    "#e8f0ff",
    "#fff0e8",
    "#e8f8ef",
    "#f5eaff",
    "#fff5d9"
];

let colorIndex = 0;

colorButton.addEventListener("click", function () {
    document.body.style.backgroundColor =
        backgroundColors[colorIndex];

    colorIndex = (colorIndex + 1) % backgroundColors.length;
});


// 2. Time-Based Greeting

const greetingButton = document.getElementById("greetingButton");

greetingButton.addEventListener("click", function () {
    const currentHour = new Date().getHours();

    let greeting;

    if (currentHour < 12) {
        greeting = "Good Morning!";
    } else if (currentHour < 17) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }

    alert(greeting + " Welcome to JS Playground!");
});


// 3. Addition Calculator

const numberOne = document.getElementById("numberOne");
const numberTwo = document.getElementById("numberTwo");
const calculateButton = document.getElementById("calculateButton");
const result = document.getElementById("result");

calculateButton.addEventListener("click", function () {
    const firstValue = numberOne.value.trim();
    const secondValue = numberTwo.value.trim();

    if (firstValue === "" || secondValue === "") {
        result.textContent = "Please enter both numbers.";
        return;
    }

    const firstNumber = Number(firstValue);
    const secondNumber = Number(secondValue);

    if (!Number.isFinite(firstNumber) ||
        !Number.isFinite(secondNumber)) {
        result.textContent = "Please enter valid numbers.";
        return;
    }

    const sum = firstNumber + secondNumber;

    result.textContent = "Result: " + sum;
});
