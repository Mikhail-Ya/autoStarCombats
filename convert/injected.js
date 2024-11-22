
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
        // ЗАПЧАСТИ СБОРОК
        let melDet = Number(dropElements[7].textContent);
        let znakDark = Number(dropElements[1].textContent);
        let znakSvet = Number(dropElements[3].textContent);
        let biocard = Number(dropElements[5].textContent);
        let krupDet = Number(dropElements[9].textContent);

        if (oknoOtscheta.style.visibility === 'visible') {
            let timeSborki = oknoOtscheta.querySelector('#infoWindowMessage');
            if(timeSborki.textContent[0] === 'В'&&triggerS===0){
                    setTimeout(()=>{
                    let inBut = oknoOtscheta.querySelector('#infoButton .infoBtn')
                    inBut.click()
                        setTimeout(()=>{
                            triggerS = 1;
                            ustanovka();
                            console.log('ustanovka1')
                        },timeRn+2000)
                    },timeRn+1000)
                }

        } else {
            if (99<melDet) {
                krupDetal.click()
                setTimeout(()=>{
                    console.log(triggerS)
                    mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
                    let usingBtn = mainOko.querySelector('#but1');
                    usingBtn.click();
                    let chatOkno = document.getElementsByName('chatWindow')[0].contentDocument
                           let soobsheniya = chatOkno.getElementById('content_rus')
                           let kolKrup = Math.floor(melDet/100-1);
                           let data = ' можно собрать крупных деталей ' + kolKrup;
                          
                          var div = document.createElement("div");
                            div.setAttribute("class", "postmessage");
                            div.innerHTML = data;
                            soobsheniya.appendChild(div)
                    setTimeout(()=>{
                       if (triggerS===1) { console.log('trigger ustanovka')
                        otsled()}
                        },timeRn+2000);
                    
                },timeRn+4000)
            } else if (znakDark>0&&znakSvet>0&&biocard>4&&krupDet>0){
                stroyMod.click()
                setTimeout(()=>{
                    console.log(triggerS)
                    mainOko = document.getElementsByName('mainWindow')[0].contentDocument;
                    let usingBtn = mainOko.querySelector('#but1');
                    usingBtn.click();
                   /** let chatOkno = document.getElementsByName('chatWindow')[0].contentDocument
                           let soobsheniya = chatOkno.getElementById('content_rus')
                           let kolKrup = Math.floor(melDet/100-1);
                           let data = ' можно собрать крупных деталей ' + kolKrup;
                          
                          var div = document.createElement("div");
                            div.setAttribute("class", "postmessage");
                            div.innerHTML = data;
                            soobsheniya.appendChild(div)*/
                    setTimeout(()=>{
                       if (triggerS===1) { console.log('trigger ustanovka')
                        otsled()}
                        },timeRn+2000);
                    
                },timeRn+4000)
            }
        }
       }

       let otsled=()=>{
        let timeRnd = Math.floor(Math.random()*1000);
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
                            console.log('otsled B')
                            clearInterval(intevalOtsled)
                            ustanovka();
                            clearTimeout()
                        },timeRnd+2000)
                    },timeRnd+1000)
                } else if (timeSborki.textContent[0] === 'И'&&triggerS===1) {
                    triggerS=0;
                }
                
            } else {
                clearInterval(intevalOtsled);
                ustanovka();
            }
            if (kolDoObnov>=59){
                let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
                panelMenu.querySelector('.right img:last-child').click();
                kolDoObnov = 0;
            } else {
                kolDoObnov++
            }
            
        },timeRnd+19500);
        
       }
       setTimeout(ustanovka,10000)
}
