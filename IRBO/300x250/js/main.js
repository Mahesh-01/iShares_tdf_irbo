var creative = {}


/* INITIALISE
************************************************** */

function checkIfAdKitReady(event) {
    adkit.onReady(init);
}

function init() {
  setupDom()
  addListeners()
  show()
}

/* DOM REFERENCES
************************************************** */
function setupDom() {
  creative.dom = {}
  creative.dom.mainContainer = document.getElementById('main-container')
}

function addListeners() {
    
    document.getElementById("up").addEventListener('click', clickUp);
    document.getElementById("up").addEventListener('mouseover', rolloverUp);
    document.getElementById("up").addEventListener('mouseout', rolloutUp);
    document.getElementById("up").addEventListener('touchstart', rolloverUp);
    document.getElementById("up").addEventListener('touchend', rolloutUp);
    document.getElementById("down").addEventListener('click', clickDown);
    document.getElementById("down").addEventListener('mouseover', rolloverDown);
    document.getElementById("down").addEventListener('mouseout', rolloutDown);
    document.getElementById("down").addEventListener('touchstart', rolloverDown);
    document.getElementById("down").addEventListener('touchend', rolloutDown);

    document.getElementById("background_exit").addEventListener('click', bgExit);
    document.getElementById('background_exit').addEventListener('mouseover', default_over);
    document.getElementById('background_exit').addEventListener('mouseout', default_out);

    document.getElementById('info').addEventListener('click', revealTerms);
    document.getElementById('close').addEventListener('click', hideTerms);
}

function bgExit(){
    //console.log("bgExit");
    adkit.clickthrough();
}

function revealTerms() {
    //event.stopPropagation();
    gsap.to([".text2", "#info", ".anim_container", ".anim", "#t1", ".hide","#cta"],0.3,  {autoAlpha:0});
    gsap.to(["#terms",], 0.6, { y: 0, ease:"power4.inOut", delay:0.3, autoAlpha: 1 });
    gsap.to("#terms_text", .2, { y: 0 });
  }
  
  function hideTerms() {
    //event.stopPropagation();
    
      
      gsap.to(["#terms"], 0.6, { y: 30, autoAlpha: 0, ease:"power4.inOut"});
      gsap.to([".text2", "#info", ".hide" ],0.3, {autoAlpha:1, delay: 0.6});
      gsap.to(["#cta",], 0.6, { y: 0, ease:"power4.inOut", delay:0.3, autoAlpha: 1 });
  }

function default_over(event) {
  gsap.to(["#cta"], .3, { scale: 1.05, ease:"power4.inOut" });
}

function default_out(event) {
  gsap.to(["#cta"], .3, { scale: 1, ease:"power4.inOut" });
}

function rolloverUp(ev) {
  ev.preventDefault();
  //gsap.set("#up", { y: -5 });
  gsap.set("#up", {backgroundPositionY:"top"});
  scrollInterval = setInterval(scrollUp, 500);
  console.log("upbtn roll over");
}

function rolloutUp(ev) {
  ev.preventDefault();
  //gsap.set("#up", { y: 0 });
  gsap.set("#up", {backgroundPositionY:"center"});
  clearInterval(scrollInterval);
  console.log("upbtn roll out");
}

function clickUp() {}

function rolloverDown(ev) {
  ev.preventDefault();
  //gsap.set("#down", { y: 5 });
 gsap.set("#down", {backgroundPositionY:"bottom"});
  scrollInterval = setInterval(scrollDown, 500);
  console.log("Downbtn roll over");
}

function rolloutDown(ev) {
  ev.preventDefault();
  //gsap.set("#down", { y: 0 });
    gsap.set("#down", {backgroundPositionY:"center"});
  clearInterval(scrollInterval);

  console.log("Downbtn roll out");
}

function clickDown() {}

function scrollDown() {
  var currentYPos = gsap.getProperty("#terms_text", "y");
  var termsMaxYPositionNegative = -Math.abs(termsMaxYPosition);
  if (currentYPos >= termsMaxYPositionNegative) {
      gsap.to("#terms_text", .2, { y: "-=60" });
  } else {
      gsap.to("#terms_text", .2, { y: termsMaxYPositionNegative - 30 });
      clearInterval(scrollInterval);
  }
}

function scrollUp() {
  var currentYPos = gsap.getProperty("#terms_text", "y");
  if (currentYPos <= 0) {
      gsap.to("#terms_text", .2, { y: "+=60" });
  } else {
      gsap.to("#terms_text", .2, { y: 0 });
      clearInterval(scrollInterval);
  }
}


/* SHOW AD
************************************************** */
function show() {
  animate()
}

/* ANIMATE AD
************************************************** */
function animate() {

  const promptDiv = document.querySelector(".prompt_inner");
  const prompt = "/PROMPT";

  const promptTokens = prompt.split("")
  let j = 0;


  const generatePrompt = () => {

    if(j >= promptTokens.length){
      return
    }

    promptDiv.innerHTML += promptTokens[j]

    j++;

    setTimeout(generatePrompt, gsap.utils.random(50, 100))
  }

  const generatedText = "LOOKING FOR A WAY TO INVEST IN AI?"
  const tokens = generatedText.split("");
  let i = 0;
  const div = document.querySelector(".generate_text")

      const generateText = () => {

        if(i >= tokens.length) return;

        if(i === 17){
          div.innerHTML += "<br>";
        }

        div.innerHTML += tokens[i];

        i++;

        setTimeout(generateText, gsap.utils.random(25, 50))
      }
    
    gsap.set("#terms", {y:"+=30px", autoAlpha: 0, ease: Power2.easeIn});
    gsap.set("#t2, #cta, #anim", {autoAlpha:0});

    
termsHolderHeight = document.getElementById("text_wrapper").offsetHeight;
  termsHeight = document.getElementById("terms_text").offsetHeight;
  termsCurrentPosition = document.getElementById("terms_text").offsetTop;
  termsMaxYPosition = termsHeight - termsHolderHeight;

    
    gsap.to("#main-container" , 0, {autoAlpha:1});
    
    //gsap.set(".gradbg", {scale:0.3, x:"-=650px", y:"-=600px"});

    //gsap.set(".imgholder", {transformOrigin:"0% 0%"});
 
    
   var mainTL = gsap.timeline();
    mainTL.addLabel("frame1", 0.0) 
    .addLabel("frame2", 6.5)  
    .addLabel("frame3", 10)  
   .addLabel("frame4", 11) 
    
 
    .from(["#main","#main_drop"], {duration:1, autoAlpha:0}, "frame1")
    .to("#anim", {x: 0,ease: Power2.easeOut, autoAlpha: 1})
    .add(generatePrompt)
    .add(generateText, "+=1")
    .to(["#main", "#main_drop", "#anim"], {duration:0.3, autoAlpha:0}, "frame2")

    .to(["#t2"], {duration:0.3, autoAlpha:1}, "frame2 + 0.15")
    .to(["#cta"], {duration:0.3, autoAlpha:1}, "frame2 + 0.4")
  
   
  // .add(revealTerms, "frame3")
    // .add(hideTerms, "frame4")
    
    // console.log(mainTL.labels["frame2"])

    //mainTL.seek("frame3+=0.5");
    //mainTL.seek("frame3");
    //mainTL.pause();
    
    //ease:"back.out(2)"

}

// }

/* WINDOW LOAD
************************************************** */
gsap.defaults({ease:"none"});
try {
  if (window.location.href !== window.parent.location.href) {
    addEventListener('load', init)
  } else {
    window.addEventListener('load', checkIfAdKitReady)
  }
} catch(error) {
  if (error.code === 18) {
    addEventListener('load', init)
  }
}