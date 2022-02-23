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
    const root=document.getElementById('root');
    const changeBtn=document.getElementById('change-color');
    const output=document.getElementById('output');
    const output2=document.getElementById('output2');
    const copyBtn=document.getElementById('copy-btn');
    const copyBtn2=document.getElementById('copy-btn2');
    changeBtn.addEventListener('click',function(){
        const decimalColor=generatorDecimalColor();
        const bgHexColor=generatorHEXColor(decimalColor).toUpperCase();
        const bgRGBColor=generatorRGBColor(decimalColor);
        output.value=bgHexColor;
        output2.value=bgRGBColor;
        root.style.backgroundColor=bgHexColor;
    })

    copyBtn.addEventListener('click',function(){

        const color=output.value;
        if(color[0]==='#'){
            window.navigator.clipboard.writeText(color)
        }
        else{
            window.navigator.clipboard.writeText(`#${color}`)
        }

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
    })

    copyBtn2.addEventListener('click',function(){
        const color=output2.value;
        window.navigator.clipboard.writeText(color)
        generateToastMessage(`${color} copied`)
    })

    output.addEventListener('keyup',function(e){
        let color=e.target.value;
        if(color){
            output.value=color.toUpperCase();
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
                output2.value=generatorRGBColor(decimalColor)
                root.style.backgroundColor=`#${color}`;
            }
            
        }
        
    })
}

function generatorDecimalColor(){
    const red= Math.round(Math.random()*255+1);
    const green= Math.round(Math.random()*255+1);
    const blue= Math.round(Math.random()*255+1);
    return {
        red,
        green,
        blue
    }
}
function generatorHEXColor({red, green, blue}){
    const validHexCode=(color)=>{
        let hex=color.toString(16);
        return hex.length==1 ? `0${hex}`:hex;
    }
    return `#${validHexCode(red)}${validHexCode(green)}${validHexCode(blue)}`;
}
function generatorRGBColor({red, green, blue}){
    return `rgb(${red}, ${green}, ${blue})`;
}

function generateToastMessage(message){
    const div=document.createElement('div')
    div.className='toast-message  toast-message-slide-in';
    div.innerText=message;
    
    div.addEventListener('click',function(){
        div.classList.remove('toast-message-slide-in');
        div.classList.add('toast-message-slide-out');

        div.addEventListener('animationend',function(){
            div.remove();
        })

    })
    setTimeout(function(){
        div.classList.remove('toast-message-slide-in');
        div.classList.add('toast-message-slide-out');

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