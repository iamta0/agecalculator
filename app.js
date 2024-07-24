// Validate input function
const validateInput = (input, validator) => {
    // Check if the input is empty
    if (input.value === "") {
        input.parentElement.classList.remove("invalid-value");
        input.parentElement.classList.add("empty-value");
        return false;
    // Check if the input is invalid based on the validator function
    } else if (!validator(input.value)) {
        input.parentElement.classList.add("invalid-value");
        input.parentElement.classList.remove("empty-value");
        return false;
    // If input is valid
    } else {
        input.parentElement.classList.remove("invalid-value");
        input.parentElement.classList.remove("empty-value");
        return true;
    }
};

// Check if the day is valid for the given month and year
const isDayValid = (day, month, year) => {
    // Determine if the year is a leap year
    const leapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    // Array holding the maximum days for each month
    const maxDays = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Check if day is an integer and within the valid range for the given month
    return Number.isInteger(day) && day >= 1 && day <= maxDays[month - 1];
};

// Check if the month is valid (1-12)
const isMonthValid = (month) => Number.isInteger(month) && month >= 1 && month <= 12;

// Check if the year is valid (greater than 1970 and less than or equal to the current year)
const isYearValid = (year) => {
    const invalidYearMsg = document.querySelector(".invalid-year");
    // Update message for invalid year
    invalidYearMsg.textContent = year <= 1970 ? "Year must be greater than 1970" : "Must be in the past";
    const currentYear = new Date().getFullYear();
    // Check if year is an integer and within the valid range
    return Number.isInteger(year) && year >= 1971 && year <= currentYear;
};

// Handle form submission
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    const dayInput = document.querySelector(".input__day");
    const monthInput = document.querySelector(".input__month");
    const yearInput = document.querySelector(".input__year");

    // Validate day input
    const isDayInputValid = validateInput(dayInput, (value) =>
        isDayValid(Number(value), Number(monthInput.value), Number(yearInput.value))
    );
    // Validate month input
    const isMonthInputValid = validateInput(monthInput, (value) => isMonthValid(Number(value)));
    // Validate year input
    const isYearInputValid = validateInput(yearInput, (value) => isYearValid(Number(value)));

    // If all inputs are valid, calculate and display the age
    if (isDayInputValid && isMonthInputValid && isYearInputValid) {
        const inputDate = new Date(Number(yearInput.value), Number(monthInput.value) - 1, Number(dayInput.value));
        const timeDiff = new Date() - inputDate; // Calculate time difference
        const ageDate = new Date(timeDiff); // Convert time difference to date
        const ageYear = ageDate.getUTCFullYear() - 1970; // Calculate years
        const ageMonth = ageDate.getUTCMonth(); // Calculate months
        const ageDay = ageDate.getUTCDate() - 1; // Calculate days

        // Update age display with animation
        animateCounter(document.querySelector(".age__day"), ageDay);
        animateCounter(document.querySelector(".age__month"), ageMonth);
        animateCounter(document.querySelector(".age__year"), ageYear);
    }
});

// Animate the counter to update the age display smoothly
function animateCounter(element, targetValue) {
    const duration = 5000; // Total duration of animation in milliseconds
    const interval = 50; // Interval between updates in milliseconds
    const increment = Math.ceil(targetValue / (duration / interval)); // Calculate increment value
    let currentValue = 0; // Initialize current value
    let intervalId = setInterval(() => {
        element.textContent = currentValue; // Update element text content
        if (currentValue >= targetValue) clearInterval(intervalId); // Clear interval if target is reached
        else currentValue += increment; // Increment current value
    }, interval); // Set interval for updates
}
// function print() {
//             let year = document.getElementById('year').value;
//             let d = new Date()
//             let work = d.getFullYear() - year;
//             document.getElementById('show').innerHTML = work;

//             let days = document.getElementById('days');
//             inputt.textContent = days.value;

//             let month = document.getElementById('month');
//             inp.textContent = month.value;
    
//             if (!year || !month || !days) {
//                 alert('input cant be empty')
//                 document.getElementById('show').innerHTML = '';
//                 return;
//             }

//             document.getElementById('year').value = '';
//             document.getElementById('month').value = '';
//             document.getElementById('days').value = '';
//         }