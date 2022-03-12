/**
 * Version:1.0.0
 * Author: Tasnim Ahmed
 * Title : Color Picker application
 */

//Globals


//Onlaod handler
window.onload = ()=>{
    main();
}

//Main or boot function

function main(){

    const randomColorGeneratorBtn=document.getElementById('random-color');
    
    const copyColorBtn=document.getElementById('copy-btn');

    const hexInput=document.getElementById('input-hex')

    randomColorGeneratorBtn.addEventListener('click',randomColorGenerator)

    copyColorBtn.addEventListener('click',copyRandomColor)

    hexInput.addEventListener('keyup',hexInputColor)
    
    document.getElementById('color-slider-red').addEventListener('change',sliderColorChange);
    document.getElementById('color-slider-green').addEventListener('change',sliderColorChange);
    document.getElementById('color-slider-blue').addEventListener('change',sliderColorChange);
    
}

//Event functions

function randomColorGenerator(){
    
    const decimalColor=generatorDecimalColor();
    updateColorCodeToDOM(decimalColor)

}

function hexInputColor(e){
    
    let color=e.target.value;

    e.target.value=color.toUpperCase();
    
    if(color[0]==='#'){
        color=color.substring(1)
    }

    if(isValidHexCode(color)){
        let arrayColor=color.match(/.{1,2}/g);
        const decimalColor={
            red:parseInt(arrayColor[0],16),
            green:parseInt(arrayColor[1],16),
            blue:parseInt(arrayColor[2],16)
        }
        updateColorCodeToDOM(decimalColor)
    }
}


function sliderColorChange(){
    const color ={
        red:parseInt(document.getElementById('color-slider-red').value),
        green:parseInt(document.getElementById('color-slider-green').value),
        blue:parseInt(document.getElementById('color-slider-blue').value)
    }
    updateColorCodeToDOM(color)
}

function copyRandomColor(){

    const hexColorMode=document.getElementById('hex-color-mode');
    const hexInput=document.getElementById('input-hex')
    const rgbInput=document.getElementById('input-rgb')

    if(hexColorMode.checked){
        const color=hexInput.value;
        if(color[0]==='#'){
            window.navigator.clipboard.writeText(color)
        }
        else{
            window.navigator.clipboard.writeText(`#${color}`)
        }

        //Generate toast message
        if(isValidHexCode(color)){
            if(color[0]==='#'){
                generateToastMessage(`${color} copied`)
            }
            else{
                generateToastMessage(`#${color} copied`)
            }
        }
        else{
            alert("Invalid Color Code.");
        }
    }
    else{
        const color=rgbInput.value;
        window.navigator.clipboard.writeText(color)
        generateToastMessage(`${color} copied`)
    }

}



//DOM functions

function updateColorCodeToDOM(color){

    console.log(color)

    const hexColor=generateHexColor(color).toUpperCase();
    const rgbColor=generateRGBColor(color);

    document.getElementById('color-display').style.backgroundColor=hexColor;

    document.getElementById('input-hex').value=hexColor;
    document.getElementById('input-rgb').value=rgbColor;

    document.getElementById('color-slider-red').value=color.red;
    document.getElementById('color-slider-green').value=color.green;
    document.getElementById('color-slider-blue').value=color.blue;

    document.getElementById('color-slider-red-label').innerText=color.red;
    document.getElementById('color-slider-green-label').innerText=color.green;
    document.getElementById('color-slider-blue-label').innerText=color.blue;

}


// Generate toast message

function generateToastMessage(message){
    const div=document.createElement('div')
    div.className='toast__message  toast__message-slide-in';
    div.innerText=message;
    
    div.addEventListener('click',function(){
        div.classList.remove('toast__message-slide-in');
        div.classList.add('toast__message-slide-out');

        div.addEventListener('animationend',function(){
            div.remove();
        })

    })
    setTimeout(function(){
        div.classList.remove('toast__message-slide-in');
        div.classList.add('toast__message-slide-out');

        div.addEventListener('animationend',function(){
            div.remove();
        })
    },1500)
    
    document.body.appendChild(div);
}



//Utilitis functions


/**
 * @title Generate Decimal Color
 * @returns {Object}
 */

function generatorDecimalColor(){
    const red= Math.floor(Math.random()*255+1);
    const green= Math.floor(Math.random()*255+1);
    const blue= Math.floor(Math.random()*255+1);
    return {
        red,
        green,
        blue
    }
}

/**
 * @title Generate Hex Color
 * @param {Object} color 
 * @returns {String}
 */

function generateHexColor({red, green, blue}){
    const validHexCode=(color)=>{
        let hex=color.toString(16);
        return hex.length==1 ? `0${hex}`:hex;
    }
    return `#${validHexCode(red)}${validHexCode(green)}${validHexCode(blue)}`;
}

/**
 * 
 * @param {Object} Color
 * @returns {String}
 * 
 */

function generateRGBColor({red, green, blue}){
    return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * 
 * @title Check valid Hex code
 * @param {string} color 
 * @returns {boolean}
 * 
 */

function isValidHexCode(color){
    if(color[0]=='#'){
        if(color.length!==7) return false;
        color=color.substring(1)
    }else{
        if(color.length!==6) return false;
    }
    return /^[0-9A-Fa-f]{6}$/i.test(color); //Regex
}

