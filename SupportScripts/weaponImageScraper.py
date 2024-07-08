from bs4 import BeautifulSoup
from urllib.request import urlopen
import re 
import csv

scraperTargetURL = "https://huntshowdown.fandom.com/wiki/Weapons"
#outputCsv = "WeaponImagePaths.csv "
#this shouldnt be output yet - what actually needs to happen is to add the image url to the appropriate weapon DB

#pseudocode - ID the table via 

targetTableClass = "sortable fandom-table mw-collapsible jquery-tablesorter mw-made-collapsible"
#each <TR> tag (table row) has a several td tags, the first contains the image, the second contains the url to the weapon page.
#could then pass the link to the normal scraper actually.
page = urlopen(scraperTargetURL)
html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")
table = soup.find("table",class_ = targetTableClass)
tableRows = soup.find_all("tr")
weapons = []
#print(tableRows[0]," new row ",tableRows[1]," new row ",tableRows[2]," new row ",tableRows[3]," new row ",)
del tableRows[0]
for tableRow in tableRows:
    
    image = tableRow.find("img")
    if image:
        print(image)
        weaponLinkElement = tableRow.find("a")
        name = weaponLinkElement.text
        weaponPageURL = weaponLinkElement["href"]
        weapon = { "name" : name,
                "image" : image,
                "page" : weaponPageURL}
        weapons.append(weapon)
    print(weapons[0])
    
