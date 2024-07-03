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
print(tableRows[1])
