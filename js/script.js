const catagories = document.querySelectorAll(".catagory");

function redirect(source){
    window.location.href = `${source}.html`;
}

for(let i = 0;i<catagories.length;i++){

    catagories[i].addEventListener('click',function(){
        redirect(catagories[i].id);
    });
}
