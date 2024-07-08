// ok so were going to read in the json file
// then were going to create a new array of only weapon names who's ammo / slot size matches that in the radio button filters
// were then going to set that as the select box options.

const weaponJSON = "./data-files/scrapedWeaponData.json";
const toolJSON = "./data-files/toolsData.json";
const consumablesJSON = "./data-files/consumablesData.json";
const premadeLoadoutsJSON = "./data-files/PremadeLoadouts.json";
let PrimaryWeaponSlotOptions = [];
let SecondaryWeaponSlotOptions = [];
let numberOfToolsSelected=0
let filterSettings ={
    primarySize: "Small",
    primaryCalibre: "Compact",
    secondarySize: "Small",
    secondaryCalibre: "Compact",
}
let equipmentData = {
    weapons: null,
    tools: null,
    consumables: null,
};
premadeList = []
    
window.addEventListener("load",function(){
    ///this calls the main scriptfunction once the html contained in the .html has fully loaded.
    organiseDataAndBuilding()
    weaponSlotsSetupRoutine()
    premadeListSetupRoutine()
})




/// this section is the file reading and population section///////////////////
async function readJsonfiles(filePath){
    try {response = await fetch(filePath);
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
            }
    
        return await response.json();
    }catch (error){
        throw new Error(error.message);
    } 
} 
async function organiseDataAndBuilding(){
    try{ 
        equipmentData.weapons = await readJsonfiles(weaponJSON)
        if (equipmentData.weapons){
            filterWeapons(PrimaryWeaponSlotOptions,"primary")
            filterWeapons(SecondaryWeaponSlotOptions,"secondary")
        }
        
    }catch  (error){
        throw new Error(error.message)
    }
    try{
        equipmentData.tools = await readJsonfiles(toolJSON)
        if (equipmentData.tools){
            makeToolCheckBoxes()
        }
    }catch  (error){
        throw new Error(error.message)
    }
    try{
        equipmentData.consumables = await readJsonfiles(consumablesJSON)
        if (equipmentData.consumables){
            populateConsumableLists()
        }
    }catch  (error){
        throw new Error(error.message)
    }
    try{
        premadeList= await readJsonfiles(premadeLoadoutsJSON)
        if (premadeList){
            console.log("premade list read", premadeList)
            populatePremadeList()
        }
    }catch  (error){
        throw new Error(error.message)
    }
}

async function makeToolCheckBoxes(){ // loops through tool
    let toolContainer = document.getElementById("toolContainer")
    let toolColumnContainer = document.createElement("div")
    toolContainer.appendChild(toolColumnContainer)
        for(i=0;i<equipmentData.tools.length;i++){
            /* every 5th item we create a new flex box that will hold the checkboxes and their labels in a new column */
            
            if (i%5==0&&i!=0){ 
                toolColumnContainer = document.createElement("div")
                toolColumnContainer.className = "flex flex-col flex-nowrap "
                toolContainer.appendChild(toolColumnContainer)
            }
            let inputAndLabelContainer = document.createElement("div");
            let newLabel = document.createElement("label");
            let newInput = document.createElement("input");

            //setting up input and label container
            inputAndLabelContainer.className = " flex flex-nowrap justify-between gap-2"
            //setting label values
            newLabel.textContent = equipmentData.tools[i].ToolName;
            newLabel.className = "font-Crimson-text text-white"
            //setting input values
            newInput.type = "checkbox";
            newInput.name = equipmentData.tools[i].ToolName;
            newInput.value = equipmentData.tools[i].ToolName;
            newInput.id = equipmentData.tools[i].ToolName;
            inputAndLabelContainer.appendChild(newLabel)
            inputAndLabelContainer.appendChild(newInput)
            toolColumnContainer.appendChild(inputAndLabelContainer)
        }  
        setupCheckBoxes()

}

async function populatePremadeList(){ 
      //we have readall the premades in previously into premadeList
    //we then create an element for each of our menu options with a <p> tag
    //we then attach the event listener for click that fills the form
    // we then append this to the id = premadeButton element 

    /// the event listener function that fills the form is quite large
    // essentially just updates the values but also notably has to apply the filters to the weapon slots before updating the select value
  
    let menuButton = document.getElementById("premadeMenu")
    for(i=0;i<premadeList.length;i++){
        let newPremade = document.createElement("p")
        newPremade.innerHTML = `${(premadeList[i]["premadeName"])}`
        newPremade.className = " text-white text-3xl hidden m-2"
        newPremade.id = premadeList[i]["premadeName"]
        console.log(premadeList[i]["premadeName"] , " = premadeName")
        newPremade.addEventListener("click",function(event){
            //we match the id to the name in the premadelist
            for(j=0;j<premadeList.length;j++){
                console.log("you selected a loadtout, premade name = ", premadeList[j]["premadeName"], "this name = ", this.id)
                if(premadeList[j]["premadeName"]==this.id){ // now for each parameter in the premade loadout we update the settings of the form
                    document.getElementById("consumable1").value = premadeList[j]["consumable1"];
                    document.getElementById("consumable2").value = premadeList[j]["consumable2"];
                    document.getElementById("consumable3").value = premadeList[j]["consumable3"];
                    document.getElementById("consumable4").value = premadeList[j]["consumable4"];
                   // document.getElementById("primaryCalibre").value = premadeList[i]["primaryCalibre"]
                   // document.getElementById("primarySize").value = premadeList[i]["primarySize"]
                   // document.getElementById("secondaryCalibre").value = premadeList[i]["secondaryCalibre"]
                    //document.getElementById("secondarySize").value = premadeList[i]["secondarySize"]
                    filterSettings.primaryCalibre = premadeList[j]["primaryCalibre"];
                    filterSettings.secondaryCalibre = premadeList[j]["secondaryCalibre"];
                    filterSettings.primarySize = premadeList[j]["primarySize"];  
                    filterSettings.secondarySize = premadeList[j]["secondarySize"];
                    

                    filterWeapons(PrimaryWeaponSlotOptions,"primary");
                    filterWeapons(SecondaryWeaponSlotOptions,"secondary")
                    ///^^we need to apply the filter values before picking the actual option vlaue in our premade list
                    console.log("premade list primary = ",premadeList[j]["primary"])
                    document.getElementById("primary").value = premadeList[j]["primary"];
                    document.getElementById("secondary").value = premadeList[j]["secondary"];
                     // logically this should go after updating the radio buttons below... it seems more appropriate
                     // but it breaks if i do that
                     // premadelist[j] becomes undefined. i dont know why... it shouldnt. but this works in this order.

                    ///creating a paired list of radio buttons - will apply desired settering with respect to filtersettings object in a for loop
                    let radioList = []
                    let settingListValues = [filterSettings.primarySize,filterSettings.secondarySize,filterSettings.primaryCalibre,filterSettings.secondaryCalibre]
                    radioList.push(document.getElementsByName("primarySize"))
                    radioList.push(document.getElementsByName("secondarySize"))
                    radioList.push(document.getElementsByName("primaryCalibre"))
                    radioList.push(document.getElementsByName("secondaryCalibre"))
                    for(k=0;k<radioList.length;k++){ // for each of our radio lists
                        for(l=0;l<radioList[k].length;l++){ // check each radio button in the radio list
                            if(radioList[k][l].value == settingListValues[k]){
                                // this checks if a radio buttons value matches the corresponding filter settings value
                                radioList[k][l].checked = true // and we check it if it does.
                                if (radioList[k][l].id == "largeSizePrimary"){ // check if its a large size primary and if so disable largesizesecondary radio
                                    document.getElementById("largeSizeSecondary").disabled = true}
                                else if (radioList[k][l].id == "mediumSizePrimary" || radioList[k][l].id == "smallSizePrimary"){ // check if its a large size primary and if so disable largesizesecondary radio
                                        document.getElementById("largeSizeSecondary").disabled = false
                                }
                                if (radioList[k][l].id == "largeSizeSecondary"){ // check if its a large size primary and if so disable largesizesecondary radio
                                    document.getElementById("largeSizePrimary").disabled = true}
                                else if (radioList[k][l].id == "mediumSizeSecondary" || radioList[k][l].id == "smallSizeSecondary"){ // check if its a large size primary and if so disable largesizesecondary radio
                                        document.getElementById("largeSizePrimary").disabled = false
                                } 
                            }
                        }
                    }
                    /// need to check the right radio buttons and disable one of the Large if its opponent is selected
                    /// need to match the radio buttons by value
                    //checking it will automatically uncheck its sibling

                }

            }

        })
        menuButton.appendChild(newPremade)
    }
}
/////////////////////////this section is the weapon slot section that dynamically filters///////////////////////////////////
function filterUpdated(filterName,filterValue){ 
// this updates the filter settings and the calls to update the filtered result in the appropriate slot select element   
    filterSettings[filterName] = filterValue;
    if(filterName=="primarySize"||filterName=="primaryCalibre"){
        filterWeapons(PrimaryWeaponSlotOptions,"primary");//need to pass primary filter values here
    }else{
        filterWeapons(SecondaryWeaponSlotOptions,"secondary"); //need to pass secondary filter values here
    }
}
    
function filterWeapons(slotOptions,slot){ // called on start and again on each radio button click.
    slotOptions.length = 0 //clears previous slotoption list data

/// this id's what slot has had filteres changed then generates a new list of slotoptions that conform to the new filter settings
    for(i=0;i<equipmentData.weapons.length;i++){
        if (slot=="primary"){
            if (equipmentData.weapons[i].Category==filterSettings.primarySize && equipmentData.weapons[i]["Ammunition Name"] ==filterSettings.primaryCalibre){
                slotOptions.push(equipmentData.weapons[i].WeaponName);
            }
        }
        else{  
            if (equipmentData.weapons[i].Category==filterSettings.secondarySize && equipmentData.weapons[i]["Ammunition Name"] ==filterSettings.secondaryCalibre){
                slotOptions.push(equipmentData.weapons[i].WeaponName);
            }        
        } 
    }
    updateOptions(slot,slotOptions);
}
//// this generates the new slot option elements and using the new slot option list in the weapon slot drop down that had its filter altered.
function updateOptions(slot,slotOptions){
    const slotSelect = document.getElementById(slot);
    slotSelect.innerHTML = "<option value = \"\" text = \"\" ></\"option>"; // clears previous options and adds a blank one
    for(i=0;i<slotOptions.length;i++){
        let newOption = document.createElement("option");
        newOption.value = slotOptions[i];
        newOption.text = slotOptions[i];
        newOption.className = "font-Crimson-text text-sm"
        slotSelect.className = "font-Crimson-text text-red text-sm"
        slotSelect.appendChild(newOption)
            }
/// this  populates the consumables list with option elements read from the json data
}
function populateConsumableLists(){
    const consumableSelectElements = [document.getElementById("consumable1"),document.getElementById("consumable2"),document.getElementById("consumable3"),document.getElementById("consumable4")]
        for(i=0;i<consumableSelectElements.length;i++){
            consumableSelectElements[i].innerHTML = "<option value = \"\" text = \"\" ></\"option>";
            for(j=0;j<equipmentData["consumables"].length;j++){
                let newOption = document.createElement("option")
                newOption.value = equipmentData["consumables"][j]["ConsumableName"];
                newOption.text = equipmentData["consumables"][j]["ConsumableName"];
                newOption.className = "font-Crimson-text text-red text-sm"
                consumableSelectElements[i].className = "font-Crimson-text text-sm"
                consumableSelectElements[i].appendChild(newOption)
            }
        }
}

function weaponSlotsSetupRoutine(){
        /// this sets up our event listeners handling elements getting disabled and form submission
        // THIS WILL NEED TO BE ENTIRELY REWRITEN TO MANUALLY HANDLE FORM DATA BECAUSE OF VARIABLE # OF CHECKBOXES AND NO UNIQUE KEYS.
        // get select box values for weapons.
        //for loop to find which check boxes are checked and assign to a 4 length list. 4 if checkes elements truthy the write as tool1 tool2... etc
        //then menually get consumable select values
    document.getElementById("loadout").addEventListener("submit",function(event){
        event.preventDefault(); /// so first thing we prevent the default submit behaviour that would fire off a html post
        let manualData = {}
        manualData.primary = document.getElementById("primary").value
        manualData.secondary = document.getElementById("secondary").value
        let consumablesList = []
        let consumableKeys = ["consumable1","consumable2","consumable3","consumable4"]
        // we create a list of descending elements and sort it so that empty options are at the bottom. might make analysis easier down the line
        consumablesList.push(document.getElementById("consumable1").value)
        consumablesList.push(document.getElementById("consumable2").value)
        consumablesList.push(document.getElementById("consumable3").value)
        consumablesList.push(document.getElementById("consumable4").value)
        consumablesList.sort()
        consumablesList.reverse()
        for(i=0;i<4;i++){
            manualData[consumableKeys[i]] = consumablesList[i]
        }


        checkedToolBoxes = []   
        toolKeys = ["tool1","tool2","tool3","tool4"]
        const checkbuttonsfield = document.getElementById("toolContainer")
        const toolCheckBoxes = checkbuttonsfield.querySelectorAll("input")
        for(i=0;i<toolCheckBoxes.length;i++){ // for each checkbox, check if it is checked and add it to a list
            if (toolCheckBoxes[i].checked){

                checkedToolBoxes.push(toolCheckBoxes[i].value)
                
            }
        }
        for(i=0;i<4;i++){ // this adds tool keys and entries to the data js object for the number that have been checked
            if (checkedToolBoxes[i]){
            manualData[toolKeys[i]] = checkedToolBoxes[i]
        }else{manualData[toolKeys[i]] = ""} // we fill empty tool slots with "" so its easier to update the DB

        }
        console.log(manualData, " ==== manual data")

        
       // const form = event.target; // so define what the form activated was... could also do it bit get elementbyid
        //const formData = new FormData(form); // we create form data from the form
        // formdata is a js object using the input names as keys.
        //console.log(formData)
        //const data = Object.fromEntries(formData.entries());
        ////this has converted the formdata object to a js object suitable for sending via fetch 
        //console.log(data)

        
    })  
    let primarySizeList = document.getElementsByName("primarySize")
    for(i=0;i<primarySizeList.length;i++){
    primarySizeList[i].addEventListener("click",function(event){
        if (event.target.disabled == false){}
        let secondaryLargeSlotButton = document.getElementById("largeSizeSecondary")
            if (event.target.value == "Large"){

                secondaryLargeSlotButton.disabled = true
            }else{ secondaryLargeSlotButton.disabled = false}   
    })
    }
    let secondarySizeList = document.getElementsByName("secondarySize")
    for(i=0;i<secondarySizeList.length;i++){
        secondarySizeList[i].addEventListener("click",function(event){
        if (event.target.disabled == false){}
        let primaryLargeSlotButton = document.getElementById("largeSizePrimary")
            if (event.target.value == "Large"){

                primaryLargeSlotButton.disabled = true
            }else{ primaryLargeSlotButton.disabled = false}
    })
    }

}
function premadeListSetupRoutine(){
    // firstly this sets up the menu as something we mouse over to drop down.
    // it does this by adding event listeners for mouse over and mouse out
    // it then adjusts the display to none (hidden in tailwind) for all the children of the menubutton  

    let menuButton = document.getElementById("premadeMenu")
    menuItems = menuButton.children
    menuButton.addEventListener("mouseover",function(event){




        //for child of the menubutton set visiblity... normal??
        for(i=0;i<menuItems.length;i++){
            if (menuItems[i].id!="premadeButton"){
            menuItems[i].classList.remove("hidden")
            console.log(menuItems[i], " = menuitem as mouseover")
            }
        }})
        menuButton.addEventListener("mouseout",function(event){
            //for child of the menubutton set visiblity... normal??
            for(i=0;i<menuItems.length;i++){
                if (menuItems[i].id!="premadeButton"){
                menuItems[i].classList.add("hidden")
                console.log(menuItems[i], " = menuitem as mouseover")
                }
            }})
    

    
}


async function setupCheckBoxes(){ /// async cos it depends on the check box to be generated.
    const checkbuttonsfield = document.getElementById("toolContainer")
    console.log(checkbuttonsfield)
    // this is a way to isolate checkboxes specifically when they all have unique names - cos we need that for the form submission.
    const toolCheckBoxes = checkbuttonsfield.querySelectorAll("input")
    console.log(toolCheckBoxes)
    for(i=0;i<toolCheckBoxes.length;i++){
    
    toolCheckBoxes[i].addEventListener("click", function(event){
        console.log("checkbox ticked", toolCheckBoxes)
        let box = event.target;
        if (box.checked){ // this occurs after the box has been checked so its kind of counter intuative...
            ///we just toggled a boxes state and now were checking if its ok to have done that
            if (numberOfToolsSelected>=4){
                alert("You can only select 4 tools at a time")
                box.checked = false;
            }
            else{
                box.checked = true;
                numberOfToolsSelected++
            }

        }else{
            box.checked = false;
            numberOfToolsSelected--;
        }        
    })    
    }
}
