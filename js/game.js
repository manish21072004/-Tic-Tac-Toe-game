let symbol = document.getElementById('symbol');
let currplayer = document.getElementById('player');
let winDeclare = document.getElementById('win');
let resetbtn = document.getElementById('reset');
let box = document.querySelectorAll('.box');
let sign = 'X';
let play = true;
const changeTurn=()=>{
    return sign == 'X' ? '0':'X';
}
const curr_player=()=>{
    if(sign =='X'){
        symbol.innerText='X';
        currplayer.innerText = 'player 1';
    } else{
          symbol.innerText='0';
        currplayer.innerText = 'player 2';
    }
}
Array.from(box).forEach((value) => {
    value.addEventListener('click',(e)=>{
        if(!play) {
            return
        }
        if (e.target.innerText ==''){
            e.target.innerText=sign;
            e.target.classList.add('grey');
            sign= changeTurn();
            // draw function call
            draw();
            WinChoice();
            curr_player();
        }
    })
})
let WinChoice=()=>{
    let block = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        
    ];
    block.forEach((e) =>{
        if (
            box[e[0]].innerText === box[e[1]]
            .innerText &&
        box[e[1]].innerText === box[e[2]]
            .innerText &&
            box[e[0]].innerText!==''
        )
            {
                winDeclare.style.display='block';
                winDeclare.innerText= currplayer
                .innerText+ ' (' + sign + ') wins!';
                resetbtn.style.display='inline-block';
                 play=false;
            }
    })
}
resetbtn.addEventListener('click',()=>{
    winDeclare.style.display='none';
    resetbtn.style.display='none';
    Array.from(box).forEach((value)=>{
        value.innerText='';
        value.classList.remove('grey');
       
    })
     play=true;
     sign='X';
})
let draw=()=>{
    if(
        (box[0].innerText!=='')&&
        (box[1].innerText!=='')&&
        (box[2].innerText!=='')&&
        (box[3].innerText!=='')&&
        (box[4].innerText!=='')&&
        (box[5].innerText!=='')&&
        (box[6].innerText!=='')&&
        (box[7].innerText!=='')&&
        (box[8].innerText!=='')
    ){
        winDeclare.style.display='block';
        winDeclare.innerText='draw';
        resetbtn.style.display='inline-block';
    }
}