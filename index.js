//chrome://extensions/
const inputEl = document.getElementById('input-el')
const buttonEl = document.getElementById('button-el')
const resultEl = document.getElementById('result-el')
const clearEl = document.getElementById('clear-el')
const tabEl = document.getElementById('tab-el')

let myLeads = []

let getLeadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))
if (getLeadsFromLocalStorage) {
    myLeads = getLeadsFromLocalStorage
    displayLeads()
}

function saveLead() {
    let lead = inputEl.value
    if (lead.length > 0){
        myLeads.push(lead)
    }
    localStorage.setItem('myLeads',JSON.stringify(myLeads))
    displayLeads()
    inputEl.value=""
}

function displayLeads() {
    let listItems = ""
    for(let i=0; i < myLeads.length; i++) {
        listItems +=`<li>
            <a target='_blank' href='${myLeads[i]}'>
            ${myLeads[i]}
            </a>
        </li>`
    }
    resultEl.innerHTML=listItems
}

function clearLocalStorage() {
    localStorage.clear()
    myLeads=[]
    displayLeads()
}

function addCurrentTabURL() {
    let url = chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url
        myLeads.push(url)
        localStorage.setItem('myLeads',JSON.stringify(myLeads))
        displayLeads()
    })
}

buttonEl.addEventListener("click", function(){
    saveLead()
})

clearEl.addEventListener("dblclick", function() {
    clearLocalStorage()
})

tabEl.addEventListener("click", function(){
    addCurrentTabURL()
})