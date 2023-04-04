// chrome://extensions/
const inputBtn = document.querySelector("#input-btn")
let myLeads = []
const inputEl = document.querySelector("#input-el")
const ulEl = document.querySelector("#ul-el")
let listItems = ""
clearBtn = document.querySelector("#clear-btn")
tabBtn = document.querySelector("#tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


inputBtn.addEventListener("click", function() {
    if (inputEl.value !== ""){
        myLeads.push(inputEl.value)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
        inputEl.value = ""
    }
})

clearBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

tabBtn.addEventListener("click", function(tabs) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads) 
    })
})

function render(leads) {
    if (leads.length === 0){
        listItems = ""
    } else {
        listItems = "SAVED LEADS:"
    }
    for (let i = 0; i < leads.length; i+=1) {
        listItems += `
        <li>
            <a target='_blank' href=' ${leads[i]}'>
                ${leads[i]}
            </a>
        </li>`
    }
    
    ulEl.innerHTML = listItems
}