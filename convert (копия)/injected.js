
function injected_main(){
       let mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
       let oknoOtscheta = mainOko.getElementById('infoWindow');
       let triggerS = 1;

       let ustanovka=()=>{
        let timeRn = Math.floor(Math.random()*1000);
        mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
        let elementsSbor = mainOko.querySelectorAll('#items_div img');
        let dropElements = mainOko.querySelectorAll('#trash_div tr td');
            oknoOtscheta = mainOko.getElementById('infoWindow');
        // СБОРКИ
        let krupDetal = elementsSbor[0];
        let stroyMod = elementsSbor[1];
        let znakDarkGet = elementsSbor[2];
        let znakSvetGet = elementsSbor[3];
        // ЗАПЧАСТИ СБОРОК
        let melDet = Number(dropElements[7].textContent);
        let znakDark = Number(dropElements[1].textContent);
        let znakSvet = Number(dropElements[3].textContent);
        let biocard = Number(dropElements[5].textContent);
        let krupDet = Number(dropElements[9].textContent);
        let oblomAstron = Number(dropElements[13].textContent);
        let oblomok = Number(dropElements[15].textContent);

        if (oknoOtscheta.style.visibility === 'visible') {
            let timeSborki = oknoOtscheta.querySelector('#infoWindowMessage');
            if(timeSborki.textContent[0] === 'В'&&triggerS===0){
                    setTimeout(()=>{
                    let inBut = oknoOtscheta.querySelector('#infoButton .infoBtn')
                    inBut.click()
                        setTimeout(()=>{
                            triggerS = 1;
                            ustanovka();
                        },timeRn+2000)
                    },timeRn+1000)
                }
        } else {
             if (znakDark>0&&znakSvet>0&&biocard>4&&krupDet>0){
                stroyMod.click()
                setTimeout(()=>{
                    mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
                    let usingBtn = mainOko.querySelector('#but1');
                    usingBtn.click();
                   
                    setTimeout(()=>{
                       if (triggerS===1) { 
                            otsled()
                            }
                        },timeRn+2000);
                    
                },timeRn+4000)
            } else if (399<melDet) {
                krupDetal.click()
                setTimeout(()=>{
                    mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
                    let usingBtn = mainOko.querySelector('#but1');
                    usingBtn.click();
                    setTimeout(()=>{
                       if (triggerS===1) {
                        otsled()}
                        },timeRn+2000);
                    
                },timeRn+4000)
            } else if(oblomAstron > 9 && oblomok > 9){
                znakSvetGet.click()
                setTimeout(()=>{
                    mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
                    let usingBtn = mainOko.querySelector('#but1');
                    usingBtn.click();
                    setTimeout(()=>{
                       if (triggerS===1) {
                        otsled()}
                        },timeRn+2000);
                    
                },timeRn+4000)
            } else {
                //top.location.href="/exit.php?1"
            } 
        }
       }

       let otsled=()=>{
        let timeRnd = Math.floor(Math.random()*500);
        let kolDoObnov = 0;

        let intevalOtsled = setInterval(()=>{
            mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
            oknoOtscheta = mainOko.getElementById('infoWindow');
            if (oknoOtscheta.style.visibility === 'visible') {
                let timeSborki = oknoOtscheta.querySelector('#infoWindowMessage');
                
                if(timeSborki.textContent[0] === 'В'&&triggerS===0){
                    setTimeout(()=>{
                    let inBut = oknoOtscheta.querySelector('#infoButton .infoBtn')
                    inBut.click()
                        setTimeout(()=>{
                            triggerS = 1;
                            clearInterval(intevalOtsled)
                            ustanovka();
                        },timeRnd+2000)
                    },timeRnd+1000)
                } else if (timeSborki.textContent[0] === 'И'&&triggerS===1) {
                    triggerS=0;
                }
                
            } else {
                clearInterval(intevalOtsled);
                ustanovka();
            }
            if (kolDoObnov>=117){
                let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
                panelMenu.querySelector('.right img:last-child').click();
                kolDoObnov = 0;
            } else {
                kolDoObnov++
            }
            
        },timeRnd+9900);
        
       }
       setTimeout(otsled,10000)
}
