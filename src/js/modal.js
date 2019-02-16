const flickity = require("flickity");
const htmlspecialchars = require("htmlspecialchars");
import Player from "@vimeo/player";

const modalSlider = new flickity(".js-modal-slider", {
  lazyLoad: 1,
  pageDots: false,
  prevNextButtons: true,
  percentPosition: true,
  setGallerySize: false,
  arrowShape: "M50,99.94,0,50,50,0,65,15,40.64,39.35H100V60.58H40.64L65,84.93Z"
});

const projects = document.getElementsByClassName("js-project");
const modal = document.querySelector(".js-modal");
const captionTitle = document.querySelector(".modal-caption__title");
const captionText = document.querySelector(".modal-caption__text");

Array.from(projects).forEach(element => {
  element.addEventListener("click", function(e) {
    openModal(this.dataset.slides);
    setModalTitle(this.dataset.project);
  });
});

//prettier-ignore
const renderSlides = (slides) => {

    return slides.map((slide, i) => {

        const el = document.createElement('div'),
            fileType = slide.file.contentType

        el.className = 'modal-slider__slide'

        if (fileType === "video/mp4") {

            el.innerHTML = /* html */`
              <video 
                class="js-slide-item modal-slider__image" 
                src="${ slide.file.url }" 
                ${ slide.description && `data-desc="${ htmlspecialchars(slide.description) }"` } 
                autoplay 
                loop 
                muted 
                playsinline>`

        } else if (fileType === 'text/plain') {

            el.innerHTML = /* html */`
              <div class="js-slide-item modal-slider__video" 
                ${ slide.description && `data-desc="${ htmlspecialchars(slide.description) }"` }>
                  <iframe 
                      class="modal-slider__video-inner js-vimeo-player"
                      src="https://player.vimeo.com/video/${
                        slide.title
                      }?title=0&byline=0&portrait=0"
                      frameborder="0" 
                      webkitallowfullscreen 
                      mozallowfullscreen 
                      allowfullscreen>
                  </iframe>
              </div>`

        } else {

            el.innerHTML = /* html */`
              <img 
                class="js-slide-item modal-slider__image"
                data-flickity-lazyload="${ slide.file.url }?fm=jpg&w=1800&q=75" 
                ${ slide.description && `data-desc="${ htmlspecialchars(slide.description) }"` }
              >`

        }
        return el
    })
}

const openModal = slides => {
  const data = JSON.parse(slides);
  if (data) {
    modal.classList.add("modal--visible");
    modalSlider.prepend(renderSlides(data));
    modalSlider.resize();
  }
};

const setModalTitle = title => {
  captionTitle.textContent = title;
};

const caption = document.querySelector(".js-modal-caption");
const closeModal = () => {
  modal.classList.remove("modal--visible");
  const cells = modalSlider.getCellElements();
  modalSlider.remove(cells);
};

modal.addEventListener("click", e => {
  if (
    e.target.classList.contains("js-modal") ||
    e.target.classList.contains("js-close-modal")
  ) {
    closeModal();
  }
});

modalSlider.on("select", function() {
  const slide = modalSlider.selectedElement.querySelector(".js-slide-item");
  captionText.innerHTML = slide.dataset.desc || "";
});

// turn off vimeo video when navigating to new slide
let selectedEl = modalSlider.selectedElement;

modalSlider.on("settle", () => {
  if (modalSlider.selectedElement != selectedEl) {
    if (selectedEl) {
      const iframe = selectedEl.querySelector(".js-vimeo-player");
      if (iframe) {
        const player = new Player(iframe);
        player.pause();
      }
    }
    selectedEl = modalSlider.selectedElement;
  }
});
