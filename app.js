/**
 * @Title Change the background color by generating Hex color
 * @feature Add a button to Copy the hex code
 * @steps
 * @step1 => Create onload Handler
 * @step2 => Random Color Generator function
 * @step3 => Collect all necessary references
 * @step4 => Handle the click event
 * @step5 => Handle the click event
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
    const outputBtn=document.getElementById('output');
    const copyBtn=document.getElementById('copy-btn');
    changeBtn.addEventListener('click',function(){
        const bgColor=generatorHEXColor();
        outputBtn.value=bgColor;
        root.style.backgroundColor=bgColor;
    })
    copyBtn.addEventListener('click',function(){
        window.navigator.clipboard.writeText(outputBtn.value)
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
*@step5 
*/

