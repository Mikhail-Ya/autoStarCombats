

function injected_main(){
  let dubleSector;
  let propusk;
//   let trigger1=false; 
//   let dubleVert=0;
//   let dubleGorez=0; 00:36:50
  let konecTime = 60;
        const deystvie =()=>{
                let main_win = document.getElementsByName('mainWindow')[0].contentDocument,
                 idSector = main_win.getElementById("sector"),
                 polSec = idSector.textContent,
                 vLevo = main_win.getElementById('left'),
                 vPravo = main_win.getElementById('right'),
                 dalshe = main_win.getElementById('fwd'),
                 razvorot = main_win.getElementById('back'),
                 napravlenie = '',
                 gorizont='',
                 vertical='',
                 nomerSektor = '',
                 centGor = 55,
                 centVer = 5;
                for (var i =0; i<= polSec.length - 1; i++) {
                      if (i===polSec.length-1) { 
                        napravlenie = polSec[i]
                        } else if (i>=polSec.length-3) {
                                gorizont += polSec[i]
                        } else if(i<polSec.length-4){
                                vertical += polSec[i]
                        }
                        if (i<polSec.length-1) {
                                nomerSektor+=polSec;
                        }
                }
                gorizont = Number(gorizont)
                vertical = Number(vertical)
               
                let imgObekt = [main_win.getElementById('img_left'),
                        main_win.getElementById('img_right'),
                        main_win.getElementById('img_front')]
                let pryamo = false,
                    pravo = false,   
                    levo = false;

                switch(imgObekt[1].src){
                case 'http://img.starcombats.com/map/cor/ost00.gif':
                case 'http://img.starcombats.com/map/cor/ost00s.gif':
                case 'http://img.starcombats.com/map/cor/ost01.gif':
                case 'http://img.starcombats.com/map/cor/ost01s.gif':
                case 'http://img.starcombats.com/map/cor/ost02.gif':
                case 'http://img.starcombats.com/map/cor/ost02s.gif':
                case 'http://img.starcombats.com/map/cor/ost03.gif':
                case 'http://img.starcombats.com/map/cor/ost03s.gif':
                        pravo=false
                        break
                default:
                        pravo=true
                        break
                }
                switch(imgObekt[0].src){
                case 'http://img.starcombats.com/map/cor/ost00.gif':
                case 'http://img.starcombats.com/map/cor/ost00s.gif':
                case 'http://img.starcombats.com/map/cor/ost01.gif':
                case 'http://img.starcombats.com/map/cor/ost01s.gif':
                case 'http://img.starcombats.com/map/cor/ost02.gif':
                case 'http://img.starcombats.com/map/cor/ost02s.gif':
                case 'http://img.starcombats.com/map/cor/ost03.gif':
                case 'http://img.starcombats.com/map/cor/ost03s.gif':
                        levo=false
                        break
                default:
                        levo=true
                        break
                }
                switch(imgObekt[2].src){
                case 'http://img.starcombats.com/map/cor/ost00.gif':
                case 'http://img.starcombats.com/map/cor/ost00s.gif':
                case 'http://img.starcombats.com/map/cor/ost01.gif':
                case 'http://img.starcombats.com/map/cor/ost01s.gif':
                case 'http://img.starcombats.com/map/cor/ost02.gif':
                case 'http://img.starcombats.com/map/cor/ost02s.gif':
                case 'http://img.starcombats.com/map/cor/ost03.gif':
                case 'http://img.starcombats.com/map/cor/ost03s.gif':

                        pryamo=false
                        break
                default:
                        pryamo=true
                        break
                }

                
                let oknoMes = document.getElementsByName('chatbarWindow')[0].contentDocument;

                let otp = oknoMes.querySelector('.chatbtn');
                let messege = oknoMes.querySelector('#chatmessage');

                let oblomki = [main_win.querySelector('#obj_left'),
                                        main_win.querySelector('#obj_front'),
                                        main_win.querySelector('#obj_right')]
                                let oblomok;
                                for (var i = 0; i < oblomki.length; i++) {
                                        let imgObekt = oblomki[i].firstChild.src
                                        var nonOblom = oblomki[i];
                                        if (nonOblom.style.display==='block') {
                                                if(imgObekt=== 'http://img.starcombats.com/map/obj/box08.gif'){
                                                messege.value = idSector.textContent;
                                                setTimeout(()=>{otp.click()},1000); 
                                                }
                                        }        
                                }
                for (var i = 0; i < imgObekt.length; i++) {
                        var imgOb = imgObekt[i]
                        
                }
                
                if(gorizont===centGor&&vertical===centVer){
                        obrabotka()
                        return
                }
                
                if (!pravo&&!levo&&!pryamo){
                        razvorot.click()
                    obrabotka()
                        return    
                }
                switch (napravlenie){
                        case 'N':
                                if (vertical>centVer&&pryamo) {
                                        dalshe.click()
                                } else if (gorizont>centGor&&levo) {
                                        vLevo.click()
                                } else if (gorizont<centGor&&pravo) {
                                        vPravo.click()
                                } else if(!levo&&!pravo){
                                 dalshe.click()} else if (levo) {
                                        vLevo.click()
                                 } else if(pryamo){dalshe.click()} else {vPravo.click()}
                                break
                        case 'W':
                                if (gorizont>centGor&&pryamo) {
                                        dalshe.click()
                                } else if (vertical<centVer&&levo) {
                                        vLevo.click()
                                } else if (vertical>centVer&&!pravo&&pryamo) {
                                        dalshe.click()
                                } else if (vertical>centVer&&pravo) {
                                        vPravo.click()
                                } else if(!levo&&!pravo){
                                 dalshe.click()} else if (levo) {
                                        vLevo.click()
                                 } else if(pryamo){dalshe.click()} else {vPravo.click()}
                                break
                        case 'S':
                                if (vertical<centVer&&pryamo) {
                                        dalshe.click()
                                } else if (gorizont<centGor&&levo) {
                                        vLevo.click()
                                } else if (gorizont>centGor&&pravo) {
                                        vPravo.click()
                                } else if(!levo&&!pravo){
                                 dalshe.click()} else if (levo) {
                                        vLevo.click()
                                 } else if(pryamo){dalshe.click()} else {vPravo.click()}
                                break
                        case 'E':
                                if (gorizont<centGor&&pryamo) {
                                        dalshe.click()
                                } else if (vertical>centVer&&levo) {
                                        vLevo.click()
                                } else if (vertical<centVer&&!pravo&&pryamo) {
                                        dalshe.click()
                                } else if (vertical<centVer&&pravo) {
                                        vPravo.click()
                                } else if(!levo&&!pravo){
                                 dalshe.click()} else if (levo) {
                                        vLevo.click()
                                 } else if(pryamo){dalshe.click()} else {vPravo.click()}
                                break
                        default:
                                break 
                        }

                obrabotka()
        }
        const obrabotka =()=>{
        let interRnd = Math.floor(Math.random()*1000)+3800;
            let obshiyCont = setInterval(()=>{
           
            let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
            let idSector = main_win.getElementById("sector");
            let time = Number(new Date().getMinutes());
                if(konecTime===time){
                        top.location.href="/exit.php?1"
                        return
                }
            if (null != idSector) {
                if ( propusk <= 2){
                        
                    if (idSector.textContent===dubleSector) {
                        propusk++
                    }
                    clearInterval(obshiyCont)
                    deystvie()
                } else {
                        let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
                panelMenu.querySelector('.right img:last-child').click()
                        propusk=0;
                }
                dubleSector = idSector.textContent;
            } else {
                let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
                panelMenu.querySelector('.right img:last-child').click()
            }
        },interRnd);
        }
obrabotka()

}
