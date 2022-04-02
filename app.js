/**
 * Version:1.0.0
 * Author: Tasnim Ahmed
 * Title : Color Picker application
 */

//Globals

const defaultPresetColors = [
	'#ffcdd2',
	'#f8bbd0',
	'#e1bee7',
	'#ff8a80',
	'#ff80ab',
	'#ea80fc',
	'#b39ddb',
	'#9fa8da',
	'#90caf9',
	'#b388ff',
	'#8c9eff',
	'#82b1ff',
	'#03a9f4',
	'#00bcd4',
	'#009688',
	'#80d8ff',
	'#84ffff',
	'#a7ffeb',
	'#c8e6c9',
	'#dcedc8',
	'#f0f4c3',
	'#b9f6ca',
	'#ccff90',
	'#ffcc80',
];

const copySound= new Audio('./copy-sound.wav')
console.log(copySound)

//Onlaod handler
window.onload = ()=>{
    main();
    presetColorParent(defaultPresetColors)
}

//Main or boot function

function main(){

    const randomColorGeneratorBtn=document.getElementById('random-color');
    const hexInput=document.getElementById('input-hex')
    const copyColorBtn=document.getElementById('copy-btn');
    const presetColorParentBtn=document.getElementById('preset-colors')

    randomColorGeneratorBtn.addEventListener('click',randomColorGenerator)
    hexInput.addEventListener('keyup',hexInputColor)
    copyColorBtn.addEventListener('click',copyRandomColor)
    presetColorParentBtn.addEventListener('click', presetColorCopy)
    
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

function copyRandomColor(){

    copySound.volume=.1
    copySound.play()

    const hexColorMode=document.getElementById('hex-color-mode');
    const hexInput=document.getElementById('input-hex')
    const rgbInput=document.getElementById('input-rgb')

    if(hexColorMode.checked){
        const color=hexInput.value;
        if(color[0]==='#' && isValidHexCode(color)){
            window.navigator.clipboard.writeText(color)
            generateToastMessage(`${color} copied`)
        }
        else if(color[0]!=='#' && isValidHexCode(color)){
            window.navigator.clipboard.writeText(`#${color}`)
            generateToastMessage(`#${color} copied`)
        }
        else{
            generateToastMessage("Invalid Color Code.");
        }
        
    }
    else{
        window.navigator.clipboard.writeText(rgbInput.value)
        generateToastMessage(`${rgbInput.value} copied`)
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

function presetColorParent(colors){
    const presetParent=document.getElementById('preset-colors')
    colors.forEach((color)=>{
        const colorBox=generateColorBox(color)
        presetParent.appendChild(colorBox)
    })
}


function presetColorCopy(e){
    const child=e.target
    if(child.className === 'color__box'){
        window.navigator.clipboard.writeText(child.getAttribute('data-color'))
        generateToastMessage(`${child.getAttribute('data-color')} Copied`)
        copySound.volume=.1
        copySound.play()
    }
}


//DOM functions

function updateColorCodeToDOM(color){

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

//Generate Color Box

function generateColorBox(color){
    const div=document.createElement('div')
    div.className='color__box'
    div.style.backgroundColor=color
    div.setAttribute('data-color', color)

    return div
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

