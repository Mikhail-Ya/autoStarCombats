
function injected_main(){
        let testAuto = ()=>{
                
        let mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
        
        setInterval(()=>{
          mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
          let timer = new Date().getMinutes()
          mainOkno.querySelector('.btn_refresh').click()
          /*switch (Number(timer)) {
            case 0:
            case 20:
            case 40:*/
                if(mainOkno.querySelector('#they_sell a')){
                    mainOkno.querySelector('#they_sell a').click()
                    setTimeout(()=>{
                        mainOkno.querySelector('#dbox_yesno .btn_yes').click()
                    },1043)
                }
           /*  break
          }*/
          
        },5000)}
        
        setTimeout(testAuto,15000)
}
/*
 * function put_gift(id, new_name, is_use, container_id, code)
{
    if (code == 'true') code = 'alterGiftNameShow(true);';
    else code = 'useGiftForm.submit();';
    use_gift_id = id;
    eval(code);
};let using = 40; setInterval(()=>{ 
if(using>0){document.querySelector('.item:nth-of-type(35) tr:nth-of-type(2) td:nth-of-type(2) img').click(); 
using--}},3000)
  */
/**
 * setInterval(()=>{
    let main = document.getElementsByName('mainWindow')[0].contentDocument;
    let upmenu = document.getElementsByName('menuWindow')[0].contentDocument;
    let oknoMes = document.getElementsByName('chatbarWindow')[0].contentDocument;
    let messege = oknoMes.querySelector('#chatmessage');
    let sector = main.querySelector('#sector');
    let otp = oknoMes.querySelector('.chatbtn');
    let navigBtn = upmenu.querySelector('.right img:last-of-type')
        navigBtn.click()
    setTimeout(()=>{
        let main = document.getElementsByName('mainWindow')[0].contentDocument;
        let sector = main.querySelector('#sector');
       messege.value = sector.textContent;
    setTimeout(()=>{otp.click()},1000); 
    },2000)
},60000)
 * 
 * 
 * 
 * 
 * */