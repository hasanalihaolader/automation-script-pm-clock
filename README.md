# Automation-script-pm-clock
An automation script for posting daily base PM clock for Brain station


##  Installation

##### Following steps need to follow to run this project:

- Download repository from Git
- Switch to git folder that download from git
- branch name "master"
- then run following command on current directory

###### COMMAND

```
npm install

```

###  Modify index.js

```
- modify your email, which email you use to login bs erp
const email = 'hasan.haolader@brainstation-23.com';

- set your password, which password you use to login bs erp
const password = '*password*';

- set start date and end date for you want to run automatic entry in this period LIKE MARCH 2023
var start_date = new Date('2023-03-01');
var end_date = new Date('2023-03-31');

- set have any leave in this start and end date like - gov leave or your paid leave set this date
const other_leave_between_date = ['2023-03-01', '2023-03-02'];

```

###  Finaly ready your index.js
```
    - run node index.js
```