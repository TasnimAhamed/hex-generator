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
        output.value=bgColor;
        root.style.backgroundColor=bgColor;
    })
    copyBtn.addEventListener('click',function(){
        window.navigator.clipboard.writeText(output.value)
        generateToastMessage(`${output.value} copied`)
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
    },2500)
    
    document.body.appendChild(div);
}

