const slider=document.querySelector("#slider");
const length=document.querySelector("#length");
const result=document.querySelector("#textToCopy");
const generateBtn= document.querySelector("#generateBtn");
const strengthColor=document.querySelector("#strength");
const cpyAlert=document.querySelector("#copyAlert");
const redAlert=document.querySelector("#redAlert");


//custom alerts!
let redTimeout;let cpyTimeout;
function customAlert(varAlert,varTimeout){
    if(varTimeout){clearTimeout(varTimeout);}
    varAlert.classList.remove("hidden");
    return setTimeout(()=>{
        varAlert.classList.add("hidden");
    },2000);
}


//checkbox values
const checks={
    upper:document.querySelector("#upper"),
    lower:document.querySelector("#lower"),
    numbers:document.querySelector("#numbers"),
    symbols:document.querySelector("#symbols")
}
//charPooL
const char={
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-="
}

//generating password
function generatePassword(){
    let validchar="";let count=0;
    if(checks.upper.checked){validchar+=char.upper;count++;}
    if(checks.lower.checked){validchar+=char.lower;count++;}
    if(checks.numbers.checked){validchar+=char.numbers;count++;}
    if(checks.symbols.checked){validchar+=char.symbols;count++;}

    const len=slider.value;
    let password="";

    if (validchar==""){
        redTimeout= customAlert(redAlert,redTimeout);return;
    }
    for(let i=0;i<len;i++){
        let randIdx=Math.floor(Math.random()*validchar.length);
        password+=validchar[randIdx];
    }
    
    //strength
    strengthColor.className="w-4 h-4 rounded-full ";
    if(len>=10&&count>=3){
        //green
        strengthColor.className+=`bg-[#22c55e] shadow-[0_0_10px_#22c55e]`;
    }else if(len>=8&&count>=2){
        //yellow
        strengthColor.className+=`bg-[#eab308] shadow-[0_0_10px_#eab308]`;
    }else if(len>=6&&count>=2){
        //orange
        strengthColor.className+=`bg-[#f97316] shadow-[0_0_10px_#f97316]`;
    }else{
        strengthColor.className+=`bg-[#ef4444] shadow-[0_0_10px_#ef4444]`;
    }
    
    result.innerText=password;
    console.log(password);
    return;
}

generateBtn.addEventListener("click",generatePassword);


//copying the result
function copyText(){
    const text=document.querySelector("#textToCopy").innerText;
    navigator.clipboard.writeText(text).then(()=>{
        cpyTimeout=customAlert(cpyAlert,cpyTimeout);
    }).catch(err=>{
        console.error("Failed to copy: ", err);
    })}
window.copyText=copyText;

//reading the length from slider.
slider.addEventListener("input",(e)=>{
    length.innerText=e.target.value;
})




