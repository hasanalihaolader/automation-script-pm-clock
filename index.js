// User Input
const email = 'hasan.haolader@brainstation-23.com';
const password = '*password*';
var start_date = new Date('2023-08-15');
var end_date = new Date('2023-08-20');
const other_leave_between_date = ['2023-08-01'];


const { By, Builder, Browser } = require('selenium-webdriver');
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekly_holiday = ["Friday", "Saturday"];
const yyyy_mm_dd_formatter = new Intl.DateTimeFormat("sv-SE", { // <- re-use me
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});

const mm_dd_yyyy_formatter = new Intl.DateTimeFormat("en-US", { // <- re-use me
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


function getDateArray(start_date, end_date) {
    var
        timesheet_array = new Array(),
        date = start_date;

    while (date <= end_date) {
        let date_with_yyyy_mm_dd_format = yyyy_mm_dd_formatter.format(date);
        let day = weekday[date.getDay()];
        let is_weekly_holiday = weekly_holiday.includes(day);
        let is_other_leave = other_leave_between_date.includes(date_with_yyyy_mm_dd_format);
        if (!is_weekly_holiday && !is_other_leave) {
            let date_with_mm_dd_yyyy_format = mm_dd_yyyy_formatter.format(date);
            timesheet_array.push(date_with_mm_dd_yyyy_format);

        }
        date.setDate(date.getDate() + 1);
    }
    return timesheet_array;
}

let timesheet_array = getDateArray(start_date, end_date);
timesheet_array.forEach(
    (async function brainstaion_pm_entry(date, index) {
        var web_driver;
        var is_logged_in = 0;
        web_driver = await new Builder().forBrowser('chrome').build();
        web_driver.get('https://erp.bs-23.com/web/login');


        (await async function login() {
            web_driver.findElement(By.name('login')).sendKeys(email);
            web_driver.findElement(By.name('password')).sendKeys(password);
            is_logged_in = web_driver.findElement(By.className("btn")).click();
        })();



        if (is_logged_in) {
            (await async function timesheet_entry() {
                await web_driver.get('https://erp.bs-23.com/web#view_type=pivot&model=bs.timesheet&menu_id=789&action=1295');
                await web_driver.manage().setTimeouts({ implicit: 20000, pageLoad: 10000 });
                // timesheet_array.forEach(
                (await async function my_timesheet_entry() {
                    //CLICK FOR OPEN PM_CLOCK_MODAL
                    let pm_clock_modal = web_driver.findElement(By.id("pivotCreate"));
                    await pm_clock_modal.click();

                    //AFTER OPEN PM CLOCK MODAL IMPLICITLY WAIT
                    await web_driver.manage().setTimeouts({ implicit: 2000, pageLoad: 1000 });

                    //PROJECT NAME SET
                    let project_name = web_driver.findElement(By.id("o_field_input_18"));
                    await project_name.click();
                    let gp_onsite_project = web_driver.findElement(By.id("ui-id-4"));
                    await gp_onsite_project.click();

                    let date_field = web_driver.findElement(By.id("o_field_input_34"));
                    // console.log(date);
                    await date_field.clear();
                    await date_field.sendKeys(date); //Month/Date/Year

                    let spend_hour_field = web_driver.findElement(By.id("o_field_input_35"));
                    let save_button = web_driver.findElement(By.className("o_form_button_save"));
                    await spend_hour_field.clear();
                    await spend_hour_field.sendKeys('8');
                    // console.log((2000 + (index * 1000)));
                    if(index != 0)
                    {
                        await delay(10000 * index);
                    }
                    save_button.click();

                })();

            })();
        }
    })
)