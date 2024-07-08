This a matchtracker for the videogame hunt show down by crytek, the assets used are part of the hunt showdown fan site kit and information / images that have been scraped from the huntshowdown wiki.
this project has been created for educational purposes and is non profit.

The form loads database information stored locally in json files on a http-server via the fetch api, this information is used to:
- generate tool checkboxes
- populate the weapon select boxes with options
- populate the consumable select boxes with options
- populate a drop down menu with premade form options

the form features filters that dynamically update the options available in the weapon box.
the  radio button filters limit what weapons can be selected by disabling the radio buttons - two large size weapons cannot be selected at the same time.

the form also features a drop down menu with options the fill out the form and update the controls with a single click. The options are generated from a seperate json input.

form submission is handled manually to format the data for later addition to the database via the fetch api.

the support scripts used for web scraping the data are written in python and not currently functional, they are being updated. - the JSON data files have been scraped from a new defunct project.
