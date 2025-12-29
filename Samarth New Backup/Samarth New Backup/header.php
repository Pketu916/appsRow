<div class="header">
  <nav class="navbar navbar-expand-xxl">
    <div class="navbar-logo">

      <a href="index" class="navbar-brand"><img src="images/samarthwhitelogo.svg" alt="Samarth E-Mobility" fetchpriority="high"></a>
    </div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse links" id="navbarNavDropdown">
      <ul class="navbar-nav ml-auto link-effect-2" id="link-effect-2">
        <li class="nav-item"> 
          <a href="#about" class="nav-link-new"><span data-hover="About Us">About Us</span></a>
        </li>
        <li class="nav-item"> 
          <a href="#features" class="nav-link-new" ><span data-hover="Features">Features</span></a>
        </li> 
        <li class="nav-item"> 
          <a href="#life" class="nav-link-new"><span data-hover="life at smarth">Life at Samarth</span></a>
        </li>
        <li class="nav-item"> 
          <a href="#faqs" class="nav-link-new"><span data-hover="FAQ's">FAQ's</span></a>
        </li>
        <li class="nav-item"> 
          <a href="#career" class="nav-link-new"><span data-hover="Career">Career</span></a>
        </li>
        <li class="nav-item"> 
          <a href="#contact-us" class="nav-link-new"><span data-hover="Contact Us">Contact Us</span></a>
        </li>
      </ul> 
    </div>
  </nav>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    const navbarCollapse = document.getElementById("navbarNavDropdown");
    const navLinks = document.querySelectorAll(".nav-link-new");

    // Add click event listener to each nav-link
    navLinks.forEach(link => {
      link.addEventListener("click", function() {
        // Close the navbar-collapse if it's open
        const isCollapsed = navbarCollapse.classList.contains("show");
        if (isCollapsed) {
          $(navbarCollapse).collapse("hide");
        }
      });
    });
  });
</script>
