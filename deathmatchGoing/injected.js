

function injected_main(){
  let dubleSector, propusk;
  const centGor = 54,
        centVer = 3;
  let exception = '24559S';
  const konecTime = 60;
        const deystvie =()=>{
                const main_win = document.getElementsByName('mainWindow')[0].contentDocument,
                 idSector = main_win.getElementById("sector"),
                 polSec = idSector.textContent,
                 vLevo = main_win.getElementById('left'),
                 vPravo = main_win.getElementById('right'),
                 dalshe = main_win.getElementById('fwd'),
                 razvorot = main_win.getElementById('back');
                let napravlenie = '',
                 gorizont='',
                 vertical='',
                 nomerSektor = '';
                 
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
               
                const imgObekt = [main_win.getElementById('img_left'),
                        main_win.getElementById('img_right'),
                        main_win.getElementById('img_front')]
                const array_blocked = [ 'http://img.starcombats.com/map/cor/ost00.gif',
                                        'http://img.starcombats.com/map/cor/ost00s.gif',
                                        'http://img.starcombats.com/map/cor/ost01.gif',
                                        'http://img.starcombats.com/map/cor/ost01s.gif',
                                        'http://img.starcombats.com/map/cor/ost02.gif',
                                        'http://img.starcombats.com/map/cor/ost02s.gif',
                                        'http://img.starcombats.com/map/cor/ost03.gif',
                                        'http://img.starcombats.com/map/cor/ost03s.gif']
                const pryamo = !array_blocked.includes(imgObekt[2].src),
                    pravo = !array_blocked.includes(imgObekt[1].src),   
                    levo = !array_blocked.includes(imgObekt[0].src);
                
                const message_window = document.getElementsByName('chatbarWindow')[0].contentDocument,
                        otp = message_window.querySelector('.chatbtn'),
                        messege = message_window.querySelector('#chatmessage');

                const oblomki = [main_win.querySelector('#obj_left'),
                                main_win.querySelector('#obj_front'),
                                main_win.querySelector('#obj_right')]
                        oblomki.forEach(elem => {
                                if (elem.style.display==='block') {
                                        if(elem.firstChild.src === 'http://img.starcombats.com/map/obj/box08.gif'){
                                                messege.value = idSector.textContent;
                                                setTimeout(()=>{otp.click()},5000); 
                                        }
                                }        
                        })
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
                                if (vertical>centVer&&pryamo|| exception === polSec) {
                                        dalshe.click()
                                } else if (gorizont>centGor&&levo) {
                                        vLevo.click()
                                } else if (gorizont>centVer&&!pravo&&pryamo) {
                                        dalshe.click()
                                } else if (gorizont<centGor&&pravo) {
                                        vPravo.click()
                                } else if(!levo&&!pravo){
                                 dalshe.click()} else if (levo) {
                                        vLevo.click()
                                 } else if(pryamo){dalshe.click()} else {vPravo.click()}
                                break
                        case 'W':
                                if (gorizont>centGor&&pryamo|| exception === polSec) {
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
                                if (vertical<centVer&&pryamo|| exception === polSec) {
                                        dalshe.click()
                                } else if (gorizont<centGor&&levo) {
                                        vLevo.click()
                                } else if (gorizont<centVer&&!pravo&&pryamo) {
                                        dalshe.click()
                                } else if (gorizont>centGor&&pravo) {
                                        vPravo.click()
                                } else if(!levo&&!pravo){
                                 dalshe.click()} else if (levo) {
                                        vLevo.click()
                                 } else if(pryamo){dalshe.click()} else {vPravo.click()}
                                break
                        case 'E':
                                if (gorizont<centGor&&pryamo|| exception === polSec) {
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
          const interRnd = Math.floor(Math.random()*1000)+3000,
                obshiyCont = setInterval(()=>{
                const main_win = document.getElementsByName('mainWindow')[0].contentDocument,
                 idSector = main_win.getElementById("sector"),
                 time = Number(new Date().getMinutes());
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
