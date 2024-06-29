// ok so were going to read in the json file
// then were going to create a new array of only weapon names who's ammo / slot size matches that in the radio button filters
// were then going to set that as the select box options.

const weaponJSON = "./scrapedWeaponData.json";
const toolJSON = "./toolsData.json";
const consumablesJSON = "./consumablesData.json"
let PrimaryWeaponSlotOptions = [];
let SecondaryWeaponSlotOptions = [];
let filterSettings ={
    primarySize: "Small",
    primaryCalibre: "Compact",
    secondarySize: "Large",
    secondaryCalibre: "Long",
}
let equipmentData = {
    weapons: null,
    tools: null,
    consumables: null,
};    

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
        console.log(equipmentData.weapons)
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
            newInput.name = "tools";
            newInput.value = equipmentData.tools[i].ToolName;
            newInput.id = equipmentData.tools[i].ToolName;
            inputAndLabelContainer.appendChild(newLabel)
            inputAndLabelContainer.appendChild(newInput)
            toolColumnContainer.appendChild(inputAndLabelContainer)
        }
    

}
function filterUpdated(filterName,filterValue){ 
// this updates the filter settings and the calls to update the filtered result in the appropriate slot select element
    console.log("filterkey = ",filterName,"filtersetting value = ",filterSettings.filterName)    
    filterSettings[filterName] = filterValue;
    console.log(filterSettings.filterName)
    if(filterName=="primarySize"||filterName=="primaryCalibre"){
        filterWeapons(PrimaryWeaponSlotOptions,"primary");//need to pass primary filter values here
        console.log("primary updated")
    }else{
        filterWeapons(SecondaryWeaponSlotOptions,"secondary"); //need to pass secondary filter values here
        console.log("secondary updated")
    }
}
    
function filterWeapons(slotOptions,slot){ // called on start and again on each radio button click.
    slotOptions.length = 0 //clears previous content
    console.log(slotOptions)

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
    console.log("updating: ",slot," with: ",slotOptions)
    updateOptions(slot,slotOptions);
}

function updateOptions(slot,slotOptions){
    console.log("updateoptions Called proper with slotoptions: ",slotOptions)
    const slotSelect = document.getElementById(slot);
    slotSelect.innerHTML = ""; // clears previous options by deleting html (seems intense??)
    for(i=0;i<slotOptions.length;i++){
        let newOption = document.createElement("option");
        newOption.value = slotOptions[i];
        newOption.text = slotOptions[i];
        slotSelect.appendChild(newOption)
        console.log("appending: ", newOption.innerText, "to: ", slotSelect)
    }

}
function populateConsumableLists(){
    const consumableSelectElements = document.getElementsByName("consumables");
        for(i=0;i<consumableSelectElements.length;i++){
            for(j=0;j<equipmentData["consumables"].length;j++){
                let newOption = document.createElement("option")
                newOption.value = equipmentData["consumables"][j]["ConsumableName"];
                newOption.text = equipmentData["consumables"][j]["ConsumableName"];
                consumableSelectElements[i].appendChild(newOption)
            }
        }


}
organiseDataAndBuilding()