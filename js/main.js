

(() => {
  const hamburger = document.querySelector(".hamburger-btn"),
  navMenu = document.querySelector(".nav-menu"),
  closeBtn = document.querySelector(".close-nav-manu");

  hamburger.addEventListener("click", showNavMenu);
  closeBtn.addEventListener("click", hideNavMenu);

  function showNavMenu () {
    navMenu.classList.add("open")
    bodyScrollingToggle();
  }
  function hideNavMenu () {
    navMenu.classList.remove("open")
    fadeOutEffect ();
    bodyScrollingToggle();
  }
  function fadeOutEffect () {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout( () => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    },300)
  }

  // Attach An Event Handler To Document
  document.addEventListener("click", (event) => {
    if(event.target.classList.contains("link-item")){
      // Make Sure event.target.hash Has a value Before Overridding Default Behavior
      if(event.target.hash !== ""){
        // Prevent Default Anchor Click Behavior
        event.preventDefault();
        const hash = event.target.hash;
        // Deactivate Existing Active "Section"
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        // Activate New "section"
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        // Deactivate Existing active Navigation Menu "link-item"
        navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow"); 
        navMenu.querySelector(".active").classList.remove("active","inner-shadow"); 
        // If Clicked "link-item" Is Contained Within The Navigation Menu
        if(navMenu.classList.contains("open")){
          // Activate New Navigation Menu "link-item"
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow","hover-in-shadow");
          // Hide Navigation Menu
          hideNavMenu();
        }else{
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if(hash === item.hash){
              // Activate New Navigation Menu "link-item"
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow","hover-in-shadow");
            }
          })
          fadeOutEffect();
        }
        // Add Hash (#) To Url
        window.location.hash = hash;
      }
    }
  })
})();



/*=========================================================
  About Section Tab Menu Start
=========================================================*/

(() => {
      const aboutSection = document.querySelector(".about-section"),
      tabsContainer = document.querySelector(".about-tabs");

       tabsContainer.addEventListener("click", (event) => {
         /*if event target contains "tab-item" class & not contains
         "active" class */
         if(event.target.classList.contains("tab-item") &&
           !event.target.classList.contains("active")){
            const target = event.target.getAttribute("data-target");
            // deactivate existing active "tab-item"
            tabsContainer.querySelector(".active").classList.remove("outer-shadow","active");
            // Activate new "tab-item"
            event.target.classList.add("active", "outer-shadow");
            // deactivate existing active "tab-content"
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            // Activate new "tab-content"
            aboutSection.querySelector(target).classList.add("active");
           }
       })
})();


function bodyScrollingToggle () {
  document.body.classList.toggle("hidden-scrolling");
}

/*=========================================================
  About Section Tab Menu Start
=========================================================*/

/*=========================================================
  Portfolio Filter & Popup Start
=========================================================*/

(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
  portfolioItemsContainer = document.querySelector(".portfolio-items"),
  portfolioItems = document.querySelectorAll(".portfolio-item"),
  popup = document.querySelector(".portfolio-popup"),
  prevBtn = popup.querySelector(".pp-prev"),
  nextBtn = popup.querySelector(".pp-next"),
  closeBtn = popup.querySelector(".pp-close"),
  projectDetailsContainer = popup.querySelector(".pp-details"),
  projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

  let itemIndex, slideIndex, screenshots;

  // Filter Protfolio Items

  filterContainer.addEventListener("click", (event) =>{
    if(event.target.classList.contains("filter-item") &&
    !event.target.classList.contains("active")){
      // Deactivate existing active "filter-items"
      filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
      // Active New "filter-item"
      event.target.classList.add( "active","outer-shadow");
      const target = event.target.getAttribute("data-target");
      portfolioItems.forEach((item) =>{
        if(target === item.getAttribute("data-category") || target === "all"){
          item.classList.remove("hide");
          item.classList.add("show");
        }else{
          item.classList.add("hide");
          item.classList.remove("show");
        }
      })
    }
  })

  portfolioItemsContainer.addEventListener("click", (event) => {
    if(event.target.closest(".portfolio-item-inner")){
      const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
      // Get The Portfolio ItemIndex
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);

      screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
      // Convert Screenshort into array
      screenshots = screenshots.split(",");
      if(screenshots.length === 1){
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      }else{
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideShow();
      popupDetails();
    }
  })

  closeBtn.addEventListener("click", () => {
    popupToggle();
    if(projectDetailsContainer.classList.contains("active")){
      popupDetailsToggle();
    }
  })


  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupSlideShow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    // Active Loader Until The popupImg Loaded
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      // Deactivate Loader After The popupImg Loaded
      popup.querySelector(".pp-loader").classList.remove("active");
    }
    popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " for" + screenshots.length;
  }

  // Next Slide 
  nextBtn.addEventListener("click", () => {
    if(slideIndex === screenshots.length-1){
      slideIndex = 0;
    }else{
      slideIndex++;
    }
    popupSlideShow();
  })

  // Prev Slide 
  prevBtn.addEventListener("click", () => {
    if(slideIndex === 0){
      slideIndex = screenshots.length-1;
    }else{
      slideIndex--;
    }
    popupSlideShow();
  })

  function popupDetails() {
    //If portfolio-item-details Not Exists
    if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
      projectDetailsBtn.style.display = "none";
      return; /** End Function Execution**/
    }
    projectDetailsBtn.style.display = "block";
    // Get The Project Details
    const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
    // Set The Project Details
    popup.querySelector(".pp-project-details").innerHTML = details;
    // Get The Project Title
    const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
    // Set The Project Title
    popup.querySelector(".pp-title h2").innerHTML = title;
    // Get The Project Category
    const category = portfolioItems[itemIndex].getAttribute("data-category");
    // Set The Project Category
    popup.querySelector(".pp-project-category").innerHTML = category.split("-").join();
  }

  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  })

  function popupDetailsToggle () {
    if(projectDetailsContainer.classList.contains("active")){
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    }else{
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }

})();

/*=========================================================
  Portfolio Filter & Popup End
=========================================================*/

/*=========================================================
  Testimonial Slider Start
=========================================================*/
 (() => {
   const sliderContainer = document.querySelector(".testi-slider-container"),
   slides = sliderContainer.querySelectorAll(".testi-item"),
   slideWidth = sliderContainer.offsetWidth,
   prevBtn = document.querySelector(".testi-slider-nav .prev"),
   nextBtn = document.querySelector(".testi-slider-nav .next"),
   activeSlide = sliderContainer.querySelector(".testi-item.active");

   let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

  //  Set Width of all slides

  slides.forEach((slide) =>{
    slide.style.width = slideWidth + "px";
  })

  // Set Width of sliderContainer

  sliderContainer.style.width = slideWidth * slides.length + "px";

  nextBtn.addEventListener("click", (event) =>{
    if(slideIndex === slides.length-1){
      slideIndex = 0;
    }else{
      slideIndex++;
    }
    slider();
  })

  prevBtn.addEventListener("click", (event) =>{
    if(slideIndex === 0){
      slideIndex = slides.length-1;
    }else{
      slideIndex--;
    }
    slider();
  })

  function slider() {
    // Deactivate existing active slides
    sliderContainer.querySelector(".testi-item.active").classList.remove("active");
    // Activate New Slides
    slides[slideIndex].classList.add("active");
    sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
  }

  slider(); 

 })();
/*=========================================================
  Testimonial Slider End
=========================================================*/

/*=========================================================
  Hide All Section Expect active Class Js Start
=========================================================*/

// (() => {

//   const sections = document.querySelectorAll(".section");
//   sections.forEach((section) => {
//     if(!section.classList.contains("active")){
//       section.classList.add("hide");
//     }
//   })
// })();


window.addEventListener("load", () => {
  // Preloader
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  },600)
})

/*=========================================================
  Hide All Section Expect active Class Js Start
=========================================================*/