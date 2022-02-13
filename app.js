/**
 * @Title Change the background color by generating Hex color
 * @feature Copy the hex code
 * @Steps
 * @first => Create onload Handler
 * @second => Random Color Generator function
 * @Third => Collect all necessary references
 * @fourth => Handle the click event
 */

/**
 * @first
 */
window.onload = ()=>{
    main();
}
function main(){
    const root=document.getElementById('root');
    const btn=document.getElementById('change-color');
    const output=document.getElementById('output');
    btn.addEventListener('click',function(){
        const bgColor=generatorHEXColor();
        output.value=bgColor;
        root.style.backgroundColor=bgColor;
    })
}


/**
 * @second
 */

function generatorHEXColor(){
    const red= Math.round(Math.random()*255+1).toString(16);
    const green= Math.round(Math.random()*255+1).toString(16);
    const blue= Math.round(Math.random()*255+1).toString(16);
    return `#${red}${green}${blue}`;
}


