// form.js - makes the food form functional using the DOM

// 1. Get references to the elements
const form      = document.getElementById('food-form')
const submitBtn = document.getElementById('submit-btn')
const nameInput = document.getElementById('food-name')
const descInput = document.getElementById('food-desc')
const imgInput  = document.getElementById('food-pic-url')
const rankInput = document.getElementById('food-rank')
const entryBox  = document.getElementById('food-entries')

// 2. Check the inputs: no empty fields, and rank must be a number
const isValid = (name, desc, img, rank) => {
    if (rankInput.validity.badInput) {      // browser says the typed rank isn't a number
        alert('Rank must be a number.')
        return false
    }
    if (name === '' || desc === '' || img === '' || rank === '') {
        alert('Please fill in all fields.')
        return false
    }
    if (isNaN(rank)) {
        alert('Rank must be a number.')
        return false
    }
    return true
}

// 3. Build a card element from the inputted data
const createCard = (name, desc, img, rank) => {
    const entry = document.createElement('div')
    entry.className = 'form-entry'
    entry.setAttribute('data-rank', rank)     // remember the rank for sorting

    const image = document.createElement('img')
    image.src = img
    image.alt = name

    const title = document.createElement('h3')
    title.innerText = name

    const description = document.createElement('p')
    description.innerText = desc

    // each card gets its own Delete button
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = 'Delete'
    deleteBtn.addEventListener('click', () => {
        entry.parentNode.removeChild(entry)
    })

    entry.appendChild(image)
    entry.appendChild(title)
    entry.appendChild(description)
    entry.appendChild(deleteBtn)
    return entry
}

// 4. Add the card, then keep the entries ordered by rank (ascending)
const addByRank = (entry, rank) => {
    const entries = entryBox.getElementsByClassName('form-entry')

    // remember the entries that must come AFTER the new one
    const higher = []
    for (let i = 0; i < entries.length; i++) {
        if (Number(entries[i].getAttribute('data-rank')) > rank) {
            higher.push(entries[i])
        }
    }

    entryBox.appendChild(entry)               // new entry goes to the end...
    for (let i = 0; i < higher.length; i++) {
        entryBox.appendChild(higher[i])       // ...then the higher ranks are moved after it
    }
}

// 5. When Submit is clicked
submitBtn.addEventListener('click', () => {
    // trim() removes extra spaces, so "   " counts as empty
    const name = nameInput.value.trim()
    const desc = descInput.value.trim()
    const img  = imgInput.value.trim()
    const rank = rankInput.value.trim()

    if (!isValid(name, desc, img, rank)) return

    addByRank(createCard(name, desc, img, rank), Number(rank))
    form.reset()                              // clear the inputs
})
