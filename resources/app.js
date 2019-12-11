// Disable the context menu to have a more native feel
document.addEventListener("contextmenu", e => e.preventDefault())

// All inputs
let allInputs = []
;[
  "gridHorizontalSpace",
  "gridVerticalSpace",
  "renameArtboards",
  "arrangeSymbols",
  "arrangeSymbolsPage",
  "excludePattern"
].forEach(id => {
  allInputs.push(document.getElementById(id))
})

window.populateSettings = () => {
  allInputs.forEach(input => {
    if (input.type === "checkbox") {
      input.checked = window.settings[input.id]
    } else {
      input.value = window.settings[input.id]
    }
  })
}

const generateSettings = () => {
  let obj = {}
  allInputs.forEach(input => {
    let val = Number(input.value)

    if (input.type === "checkbox") {
      val = Boolean(input.checked)
    } else if (input.type === "text") {
      val = input.value
    }

    obj[input.id] = val
  })

  return obj
}

document.getElementById("submit").addEventListener("click", function() {
  window.postMessage('updateSettings', generateSettings())
})
