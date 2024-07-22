
        // Validate input
        const validateInput = (input, validator) => {
            if (input.value === "") {
                input.parentElement.classList.remove("invalid-value");
                input.parentElement.classList.add("empty-value");
                return false;
            } else if (!validator(input.value)) {
                input.parentElement.classList.add("invalid-value");
                input.parentElement.classList.remove("empty-value");
                return false;
            } else {
                input.parentElement.classList.remove("invalid-value");
                input.parentElement.classList.remove("empty-value");
                return true;
            }
        };

        // Check if the values are valid
        const isDayValid = (day, month, year) => {
            const leapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
            const maxDays = [
                31,
                leapYear ? 29 : 28,
                31,
                30,
                31,
                30,
                31,
                31,
                30,
                31,
                30,
                31,
            ];
            return Number.isInteger(day) && day >= 1 && day <= maxDays[month - 1];
        };

        const isMonthValid = (month) => {
            return Number.isInteger(month) && month >= 1 && month <= 12;
        };

        const isYearValid = (year) => {
            const invalidYearMsg = document.querySelector(".invalid-year");
            if (year <= 1970) {
                invalidYearMsg.textContent = "Year must be greater than 1970";
            } else {
                invalidYearMsg.textContent = "Must be in the past";
            }

            const currentYear = new Date().getFullYear();
            return Number.isInteger(year) && year >= 1971 && year <= currentYear;
        };

        // Handle form submission
        const form = document.querySelector("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const dayInput = document.querySelector(".input__day");
            const monthInput = document.querySelector(".input__month");
            const yearInput = document.querySelector(".input__year");

            const isDayInputValid = validateInput(dayInput, (value) =>
                isDayValid(
                    Number(value),
                    Number(monthInput.value),
                    Number(yearInput.value)
                )
            );
            const isMonthInputValid = validateInput(monthInput, (value) =>
                isMonthValid(Number(value))
            );
            const isYearInputValid = validateInput(yearInput, (value) =>
                isYearValid(Number(value))
            );

            if (isDayInputValid && isMonthInputValid && isYearInputValid) {
                // Calculate the age
                const inputDate = new Date(
                    Number(yearInput.value),
                    Number(monthInput.value) - 1,
                    Number(dayInput.value)
                );
                const timeDiff = new Date() - inputDate;
                const ageDate = new Date(timeDiff);
                const ageYear = ageDate.getUTCFullYear() - 1970;
                const ageMonth = ageDate.getUTCMonth();
                const ageDay = ageDate.getUTCDate() - 1;

                // Update the age display with animation
                const dayElement = document.querySelector(".age__day");
                const monthElement = document.querySelector(".age__month");
                const yearElement = document.querySelector(".age__year");

                animateCounter(dayElement, ageDay);
                animateCounter(monthElement, ageMonth);
                animateCounter(yearElement, ageYear);
            }
        });

        // Animate the counter
        function animateCounter(element, targetValue) {
            const duration = 5000; // Total duration of animation in milliseconds
            const interval = 50; // Interval between updates in milliseconds
            const increment = Math.ceil(targetValue / (duration / interval));
            let currentValue = 0;
            let intervalId;

            function updateValue() {
                element.textContent = currentValue;

                if (currentValue >= targetValue) {
                    clearInterval(intervalId);
                } else {
                    currentValue += increment;
                }
            }

            intervalId = setInterval(updateValue, interval);
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