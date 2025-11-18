import { createCard } from "./modules/cardCreation"

const userLogger = document.getElementsByName('userLogger')[0]
const carousel = document.getElementById('carouselExampleIndicators')
const carouselInner = document.getElementsByClassName("carousel-inner")[0]

findGit.addEventListener('submit',(e)=>createCard(e,userLogger))

carousel.addEventListener('slide.bs.carousel', ()=>carouselInner.style.overflow = "hidden")
carousel.addEventListener('slid.bs.carousel', ()=>carouselInner.style.overflow = "visible")
