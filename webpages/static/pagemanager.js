
document.addEventListener("DOMContentLoaded", function() {
    // dark color mode
    const colorBtn = document.querySelector(".color-mode");
    const dark = document.querySelector(".dark-mode");
    const light = document.querySelector(".light-mode");
    localStorage.removeItem("theme");
    let isClicked = false;
    
    colorBtn.addEventListener("click", function (event) {
      
      var text;
      var background;
      var primary;
      var secondary;
      var accent;
    
      if (!isClicked) {
        document.querySelector(".color-mode i").classList.replace("fa-moon" ,"fa-sun");
        text = dark.dataset.text;
        background = dark.dataset.background;
        primary = dark.dataset.primary;
        secondary = dark.dataset.secondary;
        accent = dark.dataset.accent;
        
        isClicked = true;
      } else {
        document.querySelector(".color-mode i").classList.replace("fa-sun" ,"fa-moon");
        text = light.dataset.text;
        background = light.dataset.background;
        primary = light.dataset.primary;
        secondary = light.dataset.secondary;
        accent = light.dataset.accent;
      
        isClicked = false;
      }
    
      localStorage.setItem(
        "theme",
        JSON.stringify({ text, background, primary, secondary, accent })
      );
    
      applyTheme({ text, background, primary, secondary, accent });
      event.stopPropagation();
    }); 
    
    function applyTheme(theme) {
      console.log(theme);
      document.documentElement.style.setProperty("--text", theme.text);
      document.documentElement.style.setProperty("--background", theme.background);
      document.documentElement.style.setProperty("--primary", theme.primary);
      document.documentElement.style.setProperty("--secondary", theme.secondary);
      document.documentElement.style.setProperty("--accent", theme.accent);
    };
    
    window.addEventListener("load", function () {
      var theme = localStorage.getItem("theme");
      if (theme) {
        applyTheme(JSON.parse(theme));
      }
    });
});