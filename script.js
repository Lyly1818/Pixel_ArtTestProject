let container =  document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid'");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn =  document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let width = document.getElementById("width-value");
let height = document.getElementById("height-value");


//creating  event object
let events = {
    mouse:{
        down:"mousedown",
        move : "mousemove",
        up: "mouseup"
    },
    touch:{
        down:"touchstart",
        move : "touchmove",
        up: "touchend"
    }
};

let device = "";
let draw = false;
let erase  = false;
 const isTouchDevice = () => {

     try{

         document.createEvent("TouchEvent");
         deviceType = "touch";
         return true;

     } catch (e) {

         deviceType = "mouse";
         return false;

     }


 };


// test
console.log( isTouchDevice());

//Creating the grid

gridButton.addEventListener("click", () =>{
    container.innerHTML = "";
    let  count = 0;
    //creating rows
    for (let i = 0; i < gridHeight.value; i++){
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow");

    //    creating column
        for (let j = 0; j < gridWidth.value; j++){
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");

        //    creating unique id for touch
            col.setAttribute("id", `gridCol${count}`);
            col.addEventListener(events[deviceType].down,() => {

            //     user start drawing
                draw  = true;
                if (erase){
                    col.style.backgroundColor = "transparent";
                }
                else
                {
                    col.style.backgroundColor = colorButton.value;
                }

            } );

            col.addEventListener(events[deviceType].move, (e) =>{

                let elementId = document.elementFromPoint(

                    !isTouchDevice() ? e.clientX: e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY: e.touches[0].clientY
                ).id;
                checker(elementId);
            });
            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });
            div.appendChild(col);

        }
        container.appendChild(div);
    }

});

function checker(elementId){
    let gridColomn =  document.querySelectorAll(".gridCol");

    gridColomn.forEach((element) =>{
        if (elementId === element.id){
            if (draw && !erase){
                element.style.backgroundColor = colorButton.value;
            }
            else if( draw && erase){
                element.style.backgroundColor = "transparent"
            }
        }
    });

}


