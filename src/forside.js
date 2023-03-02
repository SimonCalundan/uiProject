// NÅR DER TRYKKES PÅ BURGERIKONET (menu åbnes)
function showMenu() {
  // I css er translateX sat til -100%, den ændres nu til 0% med transistion fra css
  // transistion virker både på translateX og opacity, da "all"
  document.getElementById("menu").style.transform = "translateX(0%)";
  document.getElementById("backdrop").style.opacity = "0.6";
  document.getElementById("backdrop").style.visibility = "visible";

  // Der må kun scrolles i menuen, når den er åben (ikke i baggrunden)
  document.getElementById("body_forside").style.overflow = "hidden";
  document.getElementById("menu").style.overflow = "auto";
}

// NÅR DER TRYKKES PÅ KRYDSET INDE I MENUEN (menu lukkes)
function closeMenu() {
  document.getElementById("menu").style.transform = "translateX(-100%)";
  document.getElementById("backdrop").style.opacity = "0";
  document.getElementById("backdrop").style.visibility = "hidden";

  document.getElementById("body_forside").style.overflow = "auto";
}
