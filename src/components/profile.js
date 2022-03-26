export function setDOMUserData(name, about, image, nameElement, aboutElement, imageElement) {
  nameElement.textContent = name;
  aboutElement.textContent = about;
  setAvatar(imageElement, image, name);
}

export function setAvatar(imageElement, image, alt) {
  imageElement.setAttribute("src", image);
  imageElement.setAttribute("alt", alt);
}
