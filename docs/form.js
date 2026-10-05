

// 1. get references to the elements
const form      = document.getElementById('food-form')
const submitBtn = document.getElementById('submit-btn')
const nameInput = document.getElementById('food-name')
const descInput = document.getElementById('food-desc')
const imgInput  = document.getElementById('food-pic-url')
const rankInput = document.getElementById('food-rank')
const entryBox  = document.getElementById('food-entries')
// end of #1 ____________________________________________________________________________________________________________________



// 2. check if inputs have no empty fields and rank is a number
const isValid = (name, desc, img, rank) => {
    if (rankInput.validity.badInput) {    
      // browser alerts that the typed rank isn't a number  
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
// end of #2 ____________________________________________________________________________________________________________________



// 3. build an entry element from the inputted data
const createEntry = (name, desc, img, rank) => {
    // createElement() accepts tags and creates an element object with it 
    const entry = document.createElement('div')
    entry.className = 'form-entry'
    entry.setAttribute('data-rank', rank)     // remember the rank for sorting

    const rankTag = document.createElement('h4')
    rankTag.innerText = '#' + rank

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

    // append the new elements as child nodes of the div element
    entry.appendChild(rankTag)
    entry.appendChild(image)
    entry.appendChild(title)
    entry.appendChild(description)
    entry.appendChild(deleteBtn)
    return entry
}
// end of #3 ____________________________________________________________________________________________________________________



// 4. add the card, then keep the entries sorted by rank (ascending)
const addByRank = (entry, rank) => {
    const entries = entryBox.getElementsByClassName('form-entry')

    // remember the entries that must come AFTER the new one
    const higher = []
    for (let i = 0; i < entries.length; i++) {
        if (Number(entries[i].getAttribute('data-rank')) > rank) {
            higher.push(entries[i])
        }
    }

    // new entry goes to the end
    entryBox.appendChild(entry)               
    for (let i = 0; i < higher.length; i++) {
        // then the higher ranks are moved after it
        entryBox.appendChild(higher[i])       
    }
}
// end of #4 ____________________________________________________________________________________________________________________



// 5. when Submit is clicked
submitBtn.addEventListener('click', () => {
    // trim() removes extra spaces, so "   " counts as empty
    const name = nameInput.value.trim()
    const desc = descInput.value.trim()
    const img  = imgInput.value.trim()
    const rank = rankInput.value.trim()

    // if any one of the inputs are invalid, return
    if (!isValid(name, desc, img, rank)) return

    addByRank(createEntry(name, desc, img, rank), Number(rank))
    form.reset()                              // clear the inputs
})
// end of #5 ____________________________________________________________________________________________________________________