/**
 * @Title Change the background color by generating Hex color
 */

/**
 * @step1
 */
window.onload = ()=>{
    main();
}
function main(){

    const colorDisplay=document.getElementById('color-display');
    const randomColor=document.getElementById('random-color');

    const hexInput=document.getElementById('input-hex');
    const rgbInput=document.getElementById('input-rgb');
    
    const copyBtn=document.getElementById('copy-btn');
    
    const hexColorMode=document.getElementById('hex-color-mode');

    const colorSliderRed=document.getElementById('color-slider-red');
    const colorSliderGreen=document.getElementById('color-slider-green');
    const colorSliderBlue=document.getElementById('color-slider-blue');

    const redValue=document.getElementById('red-value')
    const greenValue=document.getElementById('green-value')
    const blueValue=document.getElementById('blue-value')

    randomColor.addEventListener('click',function(){
        const decimalColor=generatorDecimalColor();
        const bgHexColor=generateHexColor(decimalColor).toUpperCase();
        const bgRGBColor=generateRGBColor(decimalColor);
        adjustRGBColor(decimalColor)
        hexInput.value=bgHexColor;
        rgbInput.value=bgRGBColor;
        colorDisplay.style.backgroundColor=bgHexColor;
    })

    copyBtn.addEventListener('click',function(){
        console.log(hexColorMode.checked)
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

    })

    hexInput.addEventListener('keyup',function(e){
        let color=e.target.value;
        if(color){
            hexInput.value=color.toUpperCase();
            if(color[0]==='#'){
                color=color.substring(1)
            }
            if(isValidHexCode(color)){
                const arrayColor=color.match(/.{1,2}/g);
                const decimalColor={
                    red:parseInt(arrayColor[0],16),
                    green:parseInt(arrayColor[1],16),
                    blue:parseInt(arrayColor[2],16),
                }
                rgbInput.value=generateRGBColor(decimalColor)
                colorDisplay.style.backgroundColor=`#${color}`;
            }
            
        }

    })

    colorSliderRed.addEventListener('change',function(e){

        const red=parseInt(e.target.value)
        const green=parseInt(colorSliderGreen.value)
        const blue=parseInt(colorSliderBlue.value)
        

        adjustRGBColor({red,green,blue})

    })

    colorSliderGreen.addEventListener('change',function(e){
        const red=parseInt(colorSliderRed.value)
        const green=parseInt(e.target.value)
        const blue=parseInt(colorSliderBlue.value)
        

        adjustRGBColor({red,green,blue})

    })
    colorSliderBlue.addEventListener('change',function(e){
        const red=parseInt(colorSliderRed.value)
        const green=parseInt(colorSliderGreen.value)
        const blue=parseInt(e.target.value)
        

        adjustRGBColor({red,green,blue})

    })

    function adjustRGBColor(colors){

        redValue.innerText=colors.red
        greenValue.innerText=colors.green
        blueValue.innerText=colors.blue

        colorSliderRed.value=colors.red
        colorSliderGreen.value=colors.green
        colorSliderBlue.value=colors.blue


        hexInput.value=generateHexColor(colors).toUpperCase()
        rgbInput.value=generateRGBColor(colors)
        colorDisplay.style.backgroundColor=hexInput.value;
    }

    
}


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


function generateHexColor({red, green, blue}){
    const validHexCode=(color)=>{
        let hex=color.toString(16);
        return hex.length==1 ? `0${hex}`:hex;
    }
    return `#${validHexCode(red)}${validHexCode(green)}${validHexCode(blue)}`;
}


function generateRGBColor({red, green, blue}){
    return `rgb(${red}, ${green}, ${blue})`;
}

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






function isValidHexCode(color){
    if(color[0]=='#'){
        if(color.length!==7) return false;
        color=color.substring(1)
    }else{
        if(color.length!==6) return false;
    }
    return /^[0-9A-Fa-f]{6}$/i.test(color); //Regex
}