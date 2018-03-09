const button = document.querySelector(".js-open-text-modal")
const modal = document.querySelector(".js-text-modal")

button.addEventListener("click", function(e) {
  openModal()
})

modal.addEventListener("click", function(e) {
  if (
    e.target.classList.contains("js-text-modal") ||
    e.target.classList.contains("js-close-modal")
  ) {
    closeModal()
  }
})

const openModal = () => {
  modal.classList.add("modal--visible")
}

const closeModal = () => {
  modal.classList.remove("modal--visible")
}
