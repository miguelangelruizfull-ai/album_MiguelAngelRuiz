# APP_JS_ALBUM_MIGUEL_2026

Archivo:
`app.js`

Repositorio:
`miguelangelruizfull-ai/album_MiguelAngelRuiz`

Estructura:

```
2026/
├── FOTOS/
└── VIDEOS/
```

```javascript
// =====================================================
// APP.JS
// ÁLBUM MIGUEL ÁNGEL 2026
//
// Repositorio:
// miguelangelruizfull-ai/album_MiguelAngelRuiz
//
// Multimedia:
// 2026/FOTOS
// 2026/VIDEOS
//
// Orden:
// Últimas entradas primero
//
// Formato recomendado:
// AAAA-MM-DD-descripcion.jpg
// AAAA-MM-DD-descripcion.mp4
// =====================================================



// ================================
// CONFIGURACIÓN DEL REPOSITORIO
// ================================


const repo = 
"miguelangelruizfull-ai/album_MiguelAngelRuiz";





// ================================
// CONEXIÓN GITHUB API
// ================================


async function getGitHubFolder(path){


const url =

`https://api.github.com/repos/${repo}/contents/${path}`;



const response = await fetch(url);



if(!response.ok){


console.error(
"Error cargando:",
path
);


return [];


}



return await response.json();



}








// ================================
// MENU DESPLEGABLE ÁLBUMES
// ================================


async function loadAlbumMenu(){


const albumList =
document.getElementById("albumList");



albumList.innerHTML = `


<div class="album-link"
onclick="loadImages()">

📷 FOTOS 2026

</div>



<div class="album-link"
onclick="loadVideos()">

🎥 VIDEOS 2026

</div>


`;



}









// ================================
// CARGAR FOTOS
// RUTA EDITABLE:
//
// 2026/FOTOS
//
// Si cambias carpeta,
// modifica solamente aquí.
// ================================


async function loadImages(){



const files =

await getGitHubFolder(
"2026/FOTOS"
);



const gallery =

document.getElementById(
"gallery"
);



gallery.innerHTML="";



// ORDEN FECHA:
// MÁS NUEVO PRIMERO


files.sort((a,b)=>{


let fechaA =
a.name.match(/\d+/g);


let fechaB =
b.name.match(/\d+/g);



return (

fechaB
?
fechaB.join("")
:
0

)

-

(

fechaA
?
fechaA.join("")
:
0

);



});







files.forEach(file=>{


if(

file.name.match(
/\.(jpg|jpeg|png|webp|gif)$/i

)

){



gallery.innerHTML += `



<div class="gallery-item">


<img

src="${file.download_url}"

alt="${file.name}"

loading="lazy"

onclick="openLightbox(
'img',
'${file.download_url}'
)"


>


</div>



`;



}



});



}










// ================================
// CARGAR VIDEOS
//
// RUTA EDITABLE:
// 2026/VIDEOS
// ================================


async function loadVideos(){



const files =

await getGitHubFolder(
"2026/VIDEOS"
);



const videoGrid =

document.getElementById(
"video-grid"
);



videoGrid.innerHTML="";





files.forEach(file=>{



if(

file.name.match(
/\.(mp4|webm|mov)$/i

)

){



videoGrid.innerHTML += `



<video controls>


<source

src="${file.download_url}"

type="video/mp4">


</video>



`;



}



});



}








// ================================
// BOTÓN ÁLBUMES
// ================================


function toggleAlbumMenu(){



const menu =

document.getElementById(
"albumMenu"
);




if(menu.style.display==="block"){


menu.style.display="none";


}

else{


menu.style.display="block";


}



}








// ================================
// LIGHTBOX
// ================================


function openLightbox(type,url){



const content =

document.getElementById(
"lightbox-content"
);




if(type==="img"){



content.innerHTML = `


<img src="${url}">


`;



}

else{



content.innerHTML = `


<video controls autoplay>


<source src="${url}">


</video>


`;



}




document.getElementById(
"lightbox"
).style.display="flex";



}







function closeLightbox(){



document.getElementById(
"lightbox"
).style.display="none";



document.getElementById(
"lightbox-content"
).innerHTML="";



}








// ================================
// INICIO DEL SISTEMA
// ================================


loadAlbumMenu();


loadImages();


loadVideos();

```