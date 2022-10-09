
function filter(arrays,query,type){
    document.getElementsByClassName('tollsEntries')[0].innerHTML="";
    if (query) {
        arrays = arrays.filter((array) => (array[type]).toUpperCase().includes(query.toUpperCase()));
        return arrays;
    }
    return arrays;
}

function filterVehicle(e){
    let vehicleEntries= filter(filterEntries,e.value.trim(),"vehicle Number");
    addTable(vehicleEntries,entriesTH);
}

function filterToll(e){
    dropTollSelected = e.target.innerText;
    filterEntries=filter(entries, (dropTollSelected != "All") ? dropTollSelected : "",
          "toll Name");
    filterVehicle(document.getElementById('searchVehicle'));
}

function searchToll(e){
    addTable(filter(modifiedTolls,e.value.trim(),"toll Name"),tollsTH);
}

//add drop option (filter by tollname)
function dropTolls(){
    let dropdown=document.getElementsByClassName('dropdown-content')[0];
    if(drop){
    let div = document.createElement('div'),
        a=document.createElement('a'),
        i=document.createElement('i');
    div.className = "triangle";
    dropdown.appendChild(div);
    a.innerText = "All";
    a.onclick = filterToll;
    i.className = "fa fa-check";
    (dropTollSelected == "All") ? i.style.display = "block" : i.style.display = "none";
    a.appendChild(i);
    dropdown.appendChild(a);
    for(let j=0;j<tolls.length;j++){
        a=document.createElement('a');
        a.innerText=tolls[j].tollName;
        a.onclick=filterToll;
        i=document.createElement('i');
        i.className = "fa fa-check";
        (dropTollSelected == tolls[j].tollName) ? i.style.display = "block" : "none" ;
        a.appendChild(i);
        dropdown.appendChild(a);
    }
    dropdown.style.display = "block";
    drop=false;
    (dropdown.clientHeight>=220) ? dropdown.style.overflow = "scroll" : dropdown.style.overflow = "";
    }
    else{ 
        dropdown.innerHTML = "";
        dropdown.style.display = "none";
        drop=true;
    }
}

//show tolls or entries and filter previous selected inputs
function tollOrEntry(e){
    if(buttonTracker){
        buttonTracker=false;
        document.getElementsByClassName("entries")[0].style.display = "none";
        document.getElementsByClassName("tolls")[0].style.display = "block";
        modifier();
        searchToll(document.getElementById('searchTollAction'));
        e.innerText="Back to vehicle logs"; 
    }
    else{ 
        buttonTracker=true;
        document.getElementsByClassName("entries")[0].style.display = "block";
        document.getElementsByClassName("tolls")[0].style.display = "none";
        filterToll({target:{innerText:dropTollSelected}});
        e.innerText="View all tolls";
    }
}

//modifier is used for tolls data to change table structured
function modifier(){
    modifiedTolls=[];
    for(let i=0; i<tolls.length;i++){
        let sortVehicleType= tolls[i].vehicleFare.sort((a,b) => (a.type > b.type) ? 1 : ((b.type > a.type) ? -1 : 0));
        modifiedTolls[i]= {"toll Name":tolls[i].tollName};
        for(let element of sortVehicleType){
            modifiedTolls[i][element.type] = element.singleJourney+"/"+element.returnJourney;
        } 
    }
}