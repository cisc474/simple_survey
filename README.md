# simple_survey
CISC 474 Advanced Web Technologies

A first full stack, with all of the kinks.

# index.html
This is the base HTML template

# survey.css
Some dead simple CSS adjustments including class based states

# survey.js
A JQuery home for the logic

#api/.htaccess
A simple rerouter of HTTP requests to index.php

#api/index.php
A RESTful API in PHP which links to an sqlite db using PDO

#api/survey.sqlite
A super simple sqlite3 database with a single table, *skills*

The command that created the skils table was:


    CREATE TABLE skills(
        name varchar(255), 
        base_db integer, 
        base_scripting integer, 
        base_js integer, 
        base_css integer, 
        base_html integer, 
        base_ux integer, 
        gain_db integer, 
        gain_scripting integer, 
        gain_js integer, 
        gain_css integer, 
        gain_html integer, 
        gain_ux integer);
