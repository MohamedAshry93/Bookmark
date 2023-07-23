var siteNameInp = document.getElementById("siteName");
var siteUrlInp = document.getElementById("siteUrl");
var allSite;
var commonIndex;
var update = document.getElementById("update");

if (localStorage.getItem("sites") != null) {
    allSite = JSON.parse(localStorage.getItem("sites"));
    displaySite();
} else {
    allSite = [];
}

function addAndUpdateSite() {
    if (validateSiteName() && validateSiteUrl()) {
        var site = {
            name: siteNameInp.value,
            url: siteUrlInp.value,
        };
        if (update.innerHTML == "Submit") {
            allSite.push(site);
        } else {
            // allSite.splice(commonIndex,1,site)
            allSite[commonIndex] = site;
            update.innerHTML = "Submit";
        }
        localStorage.setItem("sites", JSON.stringify(allSite));
        displaySite();
        clearData();
    } else if (validateSiteName() == false) {
        alert(
            "please enter any character from a to z or A to Z and containing any number from 0 to 9 with min 3 & max 16"
        );
    } else {
        alert("Please enter valid URL must start with www or http://");
    }
}
function displaySite() {
    var list = ``;
    for (var i = 0; i < allSite.length; i++) {
        list += `<tr>
        <td>${i}</td>
        <td>${allSite[i].name}</td>
        <td><a href="${allSite[i].url}" target="_blank"><button class="btn btn-info btn-sm"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a>
        </td>
        <td><button class="btn btn-warning text-black btn-sm" onclick="returnData(${i})"><i
                    class="fa-solid fa-pen-to-square pe-2"></i>Update</button>
        <td><button class="btn btn-danger btn-sm" onclick="deleteSite(${i})"><i
                    class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
    </tr>`;
    }
    document.getElementById("mySite").innerHTML = list;
}
function clearData() {
    siteNameInp.value = "";
    siteUrlInp.value = "";
}
function deleteSite(index) {
    allSite.splice(index, 1);
    localStorage.setItem("sites", JSON.stringify(allSite));
    displaySite();
}
function returnData(index) {
    update.innerHTML = "Update";
    commonIndex = index;
    siteNameInp.value = allSite[index].name;
    siteUrlInp.value = allSite[index].url;
}
function searchSite(term) {
    var list = ``;
    for (var i = 0; i < allSite.length; i++) {
        if (allSite[i].name.toLowerCase().includes(term.toLowerCase())) {
            list += `<tr>
        <td>${i}</td>
        <td>${allSite[i].name.replace(
                term,
                `<span class="bg-warning">${term}</span>`
            )}</td>
        <td><a href="${allSite[i].url
                }" target="_blank"><button class="btn btn-info btn-sm"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a>
        </td>
        <td><button class="btn btn-warning text-black btn-sm" onclick="returnData(${i})"><i
                    class="fa-solid fa-pen-to-square pe-2"></i>Update</button>
        <td><button class="btn btn-danger btn-sm" onclick="deleteSite(${i})"><i
                    class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
    </tr>`;
        }
    }
    document.getElementById("mySite").innerHTML = list;
}
function validateSiteName() {
    var nameRegex = /^[A-Za-z_]{3,16}$/;
    return nameRegex.test(siteNameInp.value);
}
function validateSiteUrl() {
    var siteRegex = /^(http:\/\/)(www\.)[a-zA-Z0-9]{3,}\.[a-z]{3}$/;
    return siteRegex.test(siteUrlInp.value);
}
