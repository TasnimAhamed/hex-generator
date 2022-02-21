/**
 * @Title Change the background color by generating Hex color
 * @feature Add a button to Copy the hex code
 * @steps
 * @step1 => Create onload Handler
 * @step2 => Random Color Generator function
 * @step3 => Collect all necessary references
 * @step4 => Handle the click event
 * @step5 => Handle the click event
 * @step6 => Add a toast message when color copied
 * @step7 => User can Type Hex Code
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
    const copyBtn=document.getElementById('copy-btn');
    changeBtn.addEventListener('click',function(){
        const bgColor=generatorHEXColor();
        output.value=bgColor.toUpperCase();
        root.style.backgroundColor=bgColor;
    })
    copyBtn.addEventListener('click',function(){
        color=output.value;
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
    output.addEventListener('keyup',function(e){
        const color=e.target.value;
        if(color){
            output.value=color.toUpperCase();
            if(color[0]==='#' && isValidHexCode(color)){
                root.style.backgroundColor=color;
            }
            else{
                if(isValidHexCode(color)){
                    root.style.backgroundColor=`#${color}`;
                }
            }
            
        }
        
    })
}


/**
 * @step2
 */

function generatorHEXColor(){
    const red= Math.round(Math.random()*255+1).toString(16);
    const green= Math.round(Math.random()*255+1).toString(16);
    const blue= Math.round(Math.random()*255+1).toString(16);
    return `#${red}${green}${blue}`;
}


/**
*@step6
*/
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

