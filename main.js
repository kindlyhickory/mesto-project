(()=>{"use strict";var e=document.querySelectorAll(".popup"),t=document.querySelector(".popup_edit"),n=document.querySelector(".profile__edit-button"),r=t.querySelector(".popup__data"),o=t.querySelector(".popup__name"),c=t.querySelector(".popup__famed"),a=document.querySelector(".profile__add-button"),u=document.querySelector(".popup_add"),i=u.querySelector(".popup__data"),l=u.querySelector(".popup__place-title"),s=u.querySelector(".popup__image-link"),d=document.querySelector(".popup_image"),p=d.querySelector(".popup__image"),f=d.querySelector(".popup__image-title"),_=document.querySelector(".profile__image"),v=document.querySelector(".profile__name"),m=document.querySelector(".profile__description"),y=document.querySelector(".profile__image-container"),h=document.querySelector(".popup_avatar-change"),b=h.querySelector(".popup__data"),S=h.querySelector(".popup__avatar");function g(e){"Escape"===e.key&&L(document.querySelector(".popup_opened"))}function q(e){document.addEventListener("keydown",g),e.classList.add("popup_opened")}function L(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",g)}var k={baseUrl:"https://nomoreparties.co/v1/plus-cohort-8",headers:{authorization:"c89b1818-4cda-41d9-880f-b53f0e3aae65","Content-type":"application/json"}};function E(e){return e.ok?e.json():Promise.reject("Ошибка запроса: ".concat(e.status,". Запрос: ").concat(e.url))}var A,C,x,U,w,D,O,T,j,P=document.querySelector(".card-template").content,I=document.querySelector(".cards");function B(e,t){e.textContent=t}function N(e,t,n,r,o,c,a){var u=P.querySelector(".cards__item").cloneNode("true"),i=u.querySelector(".cards__image"),l=u.querySelector(".cards__title"),s=u.querySelector(".cards__like-counter"),_=u.querySelector(".cards__like-button"),v=u.querySelector(".cards__delete-button");return o.forEach((function(e){a===e._id&&_.classList.add("cards__like-button_activated")})),c!==a?v.remove():v.addEventListener("click",(function(){var e;(e=r,fetch("".concat(k.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:k.headers}).then(E)).then((function(){return u.remove()})).catch((function(e){return console.log(e)}))})),s.textContent=n,_.addEventListener("click",(function(e){return function(e,t,n){e.target.classList.contains("cards__like-button_activated")?function(e){return fetch("".concat(k.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:k.headers}).then(E)}(t).then((function(t){e.target.classList.toggle("cards__like-button_activated"),B(n,t.likes.length)})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(k.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:k.headers}).then(E)}(t).then((function(t){e.target.classList.toggle("cards__like-button_activated"),B(n,t.likes.length)})).catch((function(e){return console.log(e)}))}(e,r,s)})),u.querySelector(".cards__image").addEventListener("click",(function(){!function(e,t){p.setAttribute("src",e),p.setAttribute("alt",t),f.textContent=t}(i.src,l.textContent),q(d)})),i.setAttribute("src",t),i.setAttribute("alt",e),l.textContent=e,u}function J(e,t){e.prepend(t)}function M(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove("".concat(n)),t.removeAttribute("disabled")):(t.classList.add("".concat(n)),t.setAttribute("disabled",""))}function H(e,t,n,r,o,c){r.textContent=e,o.textContent=t,z(c,n,e)}function z(e,t,n){e.setAttribute("src",t),e.setAttribute("alt",n)}function $(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранить",o=e.target.querySelector(".popup__save");o.textContent=t?"Сохранение...":r}function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}e.forEach((function(e){console.log(e),e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&L(e),t.target.classList.contains("popup__close-button")&&L(e)}))})),n.addEventListener("click",(function(){o.setAttribute("value",v.textContent),c.setAttribute("value",m.textContent),q(t)})),a.addEventListener("click",(function(){q(u),M(Array.from(u.querySelectorAll("".concat(".popup__item"))),u.querySelector("".concat(".popup__save")),"popup__save_type_inactive")})),r.addEventListener("submit",(function(e){$(e,!0,t),function(e){var n,r;e.preventDefault(),(n=o.value,r=c.value,fetch("".concat(k.baseUrl,"/users/me"),{method:"PATCH",headers:k.headers,body:JSON.stringify({name:n,about:r})}).then(E)).then((function(e){H(e.name,e.about,e.avatar,v,m,_),L(t)})).catch((function(e){return console.log(e)})).finally((function(){$(e,!1,t,"Сохранить")}))}(e)})),i.addEventListener("submit",(function(e){$(e,!0,u),function(e){var t,n;e.preventDefault(),(t=l.value,n=s.value,fetch("".concat(k.baseUrl,"/cards"),{method:"POST",headers:k.headers,body:JSON.stringify({name:t,link:n})}).then(E)).then((function(t){J(I,N(t.name,t.link,t.likes.length,t._id,t.likes,t.owner._id,A)),L(u),e.target.reset()})).catch((function(e){return console.log(e)})).finally((function(){$(e,!1,u,"Создать")}))}(e)})),b.addEventListener("submit",(function(e){$(e,!0,h),function(e){var t;e.preventDefault(),(t=S.value,fetch("".concat(k.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:k.headers,body:JSON.stringify({avatar:t})}).then(E)).then((function(t){z(_,t.avatar,t.name),L(h),e.target.reset()})).catch((function(e){return console.log(e)})).finally((function(){$(e,!1,h,"Сохранить")}))}(e)})),y.addEventListener("click",(function(){return q(h)})),document.addEventListener("DOMContentLoaded",(function(){Promise.all([fetch("".concat(k.baseUrl,"/users/me"),{headers:k.headers}).then(E),fetch("".concat(k.baseUrl,"/cards"),{headers:k.headers}).then(E)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return F(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?F(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];A=o._id,H(o.name,o.about,o.avatar,v,m,_,o._id),c.forEach((function(e){J(I,N(e.name,e.link,e.likes.length,e._id,e.likes,e.owner._id,A))}))})).catch((function(e){return console.log(e)}))})),x=(C={formSelector:".popup__data",inputSelector:".popup__item",submitButtonSelector:".popup__save",disabledButtonClass:"popup__save_type_inactive",inputInvalidClass:".popup__item_type_active",errorActiveClass:".form__input-error_active",errorClass:"popup__input-error"}).formSelector,U=C.inputSelector,w=C.submitButtonSelector,D=C.disabledButtonClass,O=C.inputInvalidClass,T=C.errorActiveClass,j=C.errorClass,Array.from(document.querySelectorAll("".concat(x))).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t,n,r,o,c,a){var u=Array.from(e.querySelectorAll("".concat(t))),i=e.querySelector("".concat(n));M(u,i,r),u.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,r,o){t.validity.valid?function(e,t,n,r,o){var c=e.querySelector(".".concat(r,"_").concat(t.id));t.classList.remove("".concat(o)),c.classList.remove("".concat(n)),c.textContent=""}(e,t,n,r,o):function(e,t,n,r,o,c){var a=e.querySelector(".".concat(o,"_").concat(t.id));t.classList.add("".concat(c)),a.textContent=n,a.classList.add("".concat(r))}(e,t,t.validationMessage,n,r,o)}(e,t,c,a,o),M(u,i,r)}))}))}(e,U,w,D,O,T,j)}))})();