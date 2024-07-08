This a match tracker for the videogame hunt showdown by crytek, the assets used are part of the hunt showdown fan site kit and information / images that have been scraped from the hunt showdown wiki.
https://huntshowdown.fandom.com/wiki/Hunt:_Showdown_Wiki

This project has been created for educational purposes and is non profit.

The purpose of this app is primarily to record the equipment the user begins a game with later development additions will feature a graphical representation of this equipment as it is selected and the ability to enter game results on a subsequent form. This data will then be stored in a relational database for cost benefit analysis.

The form loads database information stored locally in json files on a http-server via the fetch api, this information is used to:
- generate tool checkboxes
- populate the weapon select boxes with options
- populate the consumable select boxes with options
- populate a drop down menu with premade form options

The form features radio button filters that dynamically update the options available in the weapon select boxes to weapons that meet the criteria.

The  radio button filters also limit what weapons can be selected by disabling some filter options when appropriate - two large size weapons cannot be selected at the same time.

The form also features a drop down menu with options the fill out the form and update the controls with a single click. The options are generated from a seperate json input.

Form submission is handled manually to format the data for later addition to the database via the fetch api.

The support scripts used for web scraping the data are written in python and not currently functional, they are being updated. - the JSON data files have been scraped from a new defunct project.
#############
TODO:
- premade loadouts need to input tool values to checkboxes.
- make more and varied default premade loadouts to better test form functionality under differnt circumstances
- premade loadout names currently must be all one word for some reason???
- Complete rework of webscraping tools for weapons and weapon graphics as a priority
- create a second form for entering match statistics
- server side everything
- user login???
###########
