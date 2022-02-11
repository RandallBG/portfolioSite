//a class used to store the infromation for each project
//image - text link to image location
//techStack - array of strings of the tech stack used
//links - text links to website the project is located at and github
// the links will be a javascript object with key value pairs of the name of the link and the link itself
class Project {
  constructor(name, description, techStack, image, links) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.techStack = techStack;
    this.links = links;
  }
}

//create an array of projects
const projectsArr = [];

//fill the projects array with projects
//Portfolio site
projectsArr.push(
  new Project(
    "Portfolio",
    "This website",
    ["HTML", "CSS", "SASS", "JavaScript", "PHP"],
    "./images/RandallPortfolio.jpeg",
    [
      { Name: "Site", Link: "https://www.randallgosnell.com" },
      { Name: "Github", Link: "https://github.com/RandallBG/portfolioSite" },
    ]
  )
);
//Au Jus website
projectsArr.push(
  new Project(
    "Au Jus",
    "A website created for a local business. Created figma files and then used them to create the css and html for the website. We then used php mailer as a means to send emails from their contact us page",
    ["HTML", "CSS", "JavaScript", "PHP", "Figma"],
    "./images/Aujus.jpeg",
    [
      { Name: "Site", Link: "https://www.aujus.Randallgosnell.com" },
      { Name: "Github", Link: "https://github.com/RandallBG/Aujus" },
    ]
  )
);
projectsArr.push(
  new Project(
    "Discord Bot",
    "A discord bot I created to play music and send messages to a discord server.",
    ["Javascript", "Node.js", "Discord.js"],
    "./images/discordlogo.png",
    [{ Name: "Github", Link: "https://github.com/RandallBG/DiscordBot" }]
  )
);

//list of all projects based on class name
let projectCards = document.getElementsByClassName("projectCard");
//loop through the projects and give them click events
for (let i = 0; i < projectCards.length; i++) {
  projectCards[i].addEventListener("click", (e) => {
    if (
      window.getComputedStyle(document.getElementById("modalWrapper"))
        .visibility === "hidden"
    ) {
      fillModal(projectsArr[e.currentTarget.dataset.id]);
      //setting html elements overflow to hidden will stop scrolling while modal is open
      //also gets rid of scroll bar and causes page to shift a bit. Maybe look into a better solution at a later date
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
      document.getElementById("modalWrapper").classList.toggle("modalOpen");
    }
  });
}

//event listener to click out of the modal to close it
document.getElementById("modalWrapper").addEventListener("click", (e) => {
  if (e.target != document.getElementById("modalWrapper")) {
    return;
  }
  document.getElementById("modalWrapper").classList.toggle("modalOpen");
  document.getElementsByTagName("html")[0].style.overflow = "auto";
});

//this is a function that will fill the modal with the correct project information
const fillModal = (project) => {
  document.getElementById("projectName").innerHTML = project.name;
  document.getElementById("projectDescription").innerHTML = project.description;
  document.getElementById("projectImage").src = project.image;
  document.getElementById("projectLink").href = project.link;
  //create the elements for each tech stack
  let techStack = document.getElementById("techStack");
  //clear the tech stack
  techStack.innerHTML = "";
  //loop through the tech stack and create a new element for each one
  for (i = 0; i < project.techStack.length; i++) {
    let tech = document.createElement("div");
    tech.innerText = project.techStack[i];
    tech.classList.add("techCard");
    techStack.appendChild(tech);
  }
  //create the links for the project
  let links = document.getElementById("linksToProject");
  //clear links used by the previous modal call
  links.innerHTML = "";
  //loop through the links and create a new element for each one
  for (let i = 0; i < project.links.length; i++) {
    let link = document.createElement("a");
    link.href = project.links[i].Link;
    link.innerText = project.links[i].Name;
    link.setAttribute("target", "_blank");
    link.classList.add("btn");
    link.classList.add("btn-primary");
    links.appendChild(link);
  }
};

//event listener for modal close button
document.getElementById("modalCloseBtn").addEventListener("click", (e) => {
  document.getElementById("modalWrapper").classList.toggle("modalOpen");
  //really should stop setting the html overflow in js and create a class to toggle between. But this works for now
  document.getElementsByTagName("html")[0].style.overflow = "auto";
});
//navigation toggle
let isNavToggled = false;

const navToggle = () => {
  let nav = document.getElementById("navBar");
  let hamburger = document.getElementById("hamburger");
  if (!isNavToggled) {
    nav.style.left = "0em";
    hamburger.classList.add("menuShown");
    isNavToggled = !isNavToggled;
    document.getElementById("navClickedOutside").style.visibility = "visible";
  } else {
    nav.style.left = "-25em";
    hamburger.classList.remove("menuShown");
    isNavToggled = !isNavToggled;
    document.getElementById("navClickedOutside").style.visibility = "hidden";
  }
};

// clicking outside of navbar on mobile will close it
document.getElementById("navClickedOutside").addEventListener("click", () => {
  navToggle();
});

//set up click events for the navigation bar links
let navLinks = document.getElementsByClassName("navLink");
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", () => {
    console.log(window.innerWidth);
    if (window.innerWidth < 1000) {
      console.log("clicked and smallscreen");
      navToggle();
    }
  });
}
//smoothScroll - get the offset of the passed in section name to the
//top of the page and scroll down that far.
const smoothScroll = (sectionName) => {
  window.scroll({
    top: document.getElementById(sectionName).offsetTop,
    behavior: "smooth",
  });
};

//window resize event
//show and hide navbar on smaller resizes
window.addEventListener("resize", (e) => {
  if (window.innerWidth > 1000) {
    document.getElementById("navBar").style.left = 0;
    document.getElementById("hamburger").classList.add("menuShown");
    isNavToggled = true;
    document.getElementById("navClickedOutside").style.visibility = "hidden";
  } else if (window.innerWidth < 1000) {
    document.getElementById("navBar").style.left = "-25em";
    document.getElementById("hamburger").classList.remove("menuShown");
    isNavToggled = false;
  }
});
