 function use_action(action_id, sector)
    {
      if (document.getElementById("check_input") != null) check_code = document.getElementById("check_input").value;
      else check_code = '';

      var req = new JsHttpRequest();
      req.onreadystatechange = function()
      {
        if(req.readyState == 4)
        {
          document.getElementById("use_div").style.visibility = "hidden";

          if (req.responseJS != null)
          {
            if (req.responseJS.error_msg != null)
            {
              error_msg = req.responseJS.error_msg;
              if (error_msg.length > 0)
              {
              }
            }

            if (req.responseJS.eval_msg != null)
            {
              eval_msg = req.responseJS.eval_msg;
              eval(eval_msg);
            }

            space_navigate('reload');
          }
        }
      }

      req.open('GET', '../ajax/space_action.php', true);
      req.send({ check_code: check_code, action_id: action_id, sector: sector, ix: Math.random()});
    }
function delete_other(id, new_name)
{
        
                var req = new Subsys_JsHttpRequest_Js()
                req.onreadystatechange = function()
                {
                        if (req.readyState == 4)
                        {
                                error = req.responseJS.error;
                                if (error) show_error(error);
                                else
                                {
                                        inventory = req.responseJS.inventory;
                                        if (inventory)
                                        {
                                                for (field in inventory) document.getElementById(field).innerHTML = inventory[field];
                                        }

                                        show_result(_text[lang]['item_name'] + ' "' + new_name + '" ' + _text[lang]['delete_success']);
                                        document.getElementById("item" + id).style.display = 'none';
                                }
                        }
                }

                req.open('GET', _text[lang]['station_path'] + 'ajax/hold/hold_delete_other.php', true);
                req.send({id: id, ix: Math.random()});
        
}

function injected_main(){
  let dubleSector;
  let propusk;
  let zadanie = false;
  let sdahaSadania = false;
    const prohod =()=>{
        let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
        let dalshe = main_win.getElementById('fwd')
        let vLevo = main_win.getElementById('left')
        let vPravo = main_win.getElementById('right')
        let imgObekt = [main_win.getElementById('img_left'),
                        main_win.getElementById('img_right'),
                        main_win.getElementById('img_front')]
        if (imgObekt[2].src==='http://img.starcombats.com/map/cor/front_on.gif'){
                dalshe.click()
                obrabotka()
        } else if (imgObekt[1].src==='http://img.starcombats.com/map/cor/right_on.gif'){
                vPravo.click()
                obrabotka()
        } else if (imgObekt[0].src==='http://img.starcombats.com/map/cor/left_on.gif'){
                vLevo.click()
                obrabotka()
        }
    }

    let udalenie =()=>{
        let mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
        let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
        let navigBtn = panelMenu.querySelector('.right img:last-of-type')
        let iskomoe;
        let iskomoeKol = 0;
        let iskomoeName = "Пустой контейнер";
        let obshee = mainOkno.querySelectorAll('.item');

                        let scripts = mainOkno.getElementsByTagName('script').length        
                                 var script = document.createElement("script");
                                 script.setAttribute("type", "text/javascript");
                                 script.innerHTML = delete_other ;
                                 mainOkno.getElementsByTagName('head')[0].appendChild(script);
        setTimeout(()=>{
        for (var i = obshee.length - 1; i >= 0; i--) {

          var block = obshee[i]
          if (block.querySelector('h1').textContent === iskomoeName){
            iskomoe = block;
            }
        }   
         var delBtn = iskomoe.querySelector('tr:nth-child(2) td:nth-child(4) img')
          
          if (delBtn) {
          delBtn.click()
                }
                setTimeout(teleporEnd,2354)
                },3535)
        }

    let obhodSdacha =()=>{
        let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
        let menu_win = document.getElementsByName('menuWindow')[0].contentDocument;
        if (main_win.querySelectorAll('script').length<9){
        var script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.innerHTML = use_action ; 
                main_win.getElementsByTagName('body')[0].appendChild(script);
        }
        setTimeout(()=>{
                main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                menu_win = document.getElementsByName('menuWindow')[0].contentDocument;
                let korabl = main_win.querySelector('#obj_front img')
                korabl.click()
                setTimeout(()=>{
                        main_win.getElementById('item1').click()
                        setTimeout(()=>{
                                let trumeBtn = menu_win.querySelector('#menu1 img:nth-child(8)')
                                trumeBtn.click()
                                obrabotka();
                        },1590)
                },2150)
        },2230)
    }
    let teleporEnd =()=> {
        let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
            let menu_win = document.getElementsByName('menuWindow')[0].contentDocument;
            let down_bar = document.getElementsByName('chatbarWindow')[0].contentDocument;
        let mostik = down_bar.getElementById('bridge_btn')
        mostik.click()
        setTimeout(() => {
            let chat_top_win = document.getElementsByName('chatmenuWindow')[0].contentDocument;
            let chatBtnday = chat_top_win.getElementById('tabNameChat')
                var main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                
                var chansClick = main_win.getElementById('img22')
                chansClick.click()
                setTimeout(() => {
                    let useChans = main_win.querySelector('#info_div_content a:first-of-type')
                    if (useChans) {
                        useChans.click()
                        setTimeout(()=>{
                                let podtverdit = main_win.querySelector('#info_div_content a:first-of-type')
                                podtverdit.click()
                        }, 2500)
                    }
                }, 2000)
        }, 10000)
    }
    const rubkaZadanie =()=>{
        let interRnd = Math.floor(Math.random()*3000);
        let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
        let compMenu = main_win.querySelectorAll('.item a')
        compMenu[4].click()
        let obrabotkaZadan = setInterval(()=>{
                main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                let vyborZadan = main_win.querySelectorAll('#items_div img')
                if (vyborZadan.length===1) {
                        vyborZadan[0].click()
                        setTimeout(()=>{
                                main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                             main_win.getElementById('button').click();   
                        },2143)
                } else {
                compMenu[0].click()
                setTimeout(()=>{
                        vyborZadan = main_win.querySelectorAll('#items_div img')
                   vyborZadan[10].click();     
                },1362)
                setTimeout(()=>{
                        main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                        main_win.getElementById('button').click();
                        setTimeout(()=>{
                                main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                                clearInterval(obrabotkaZadan);
                                main_win.querySelector('a').click();
                                zadanie=true;
                                obrabotka();
                        },interRnd+1423)
                },interRnd+2132)
                }
        },interRnd+4561)
        
    }
    const obrabotka =()=>{
        let interRnd = Math.floor(Math.random()*2500)+3500;
        
       let obshiyCont = setInterval(()=>{
           
            let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
            let menu_win = document.getElementsByName('menuWindow')[0].contentDocument;
            let down_bar = document.getElementsByName('chatbarWindow')[0].contentDocument;
            let idSector = main_win.getElementById("sector");
            let triggerTrume = main_win.getElementById("inventory_current");
            let triggerMost = main_win.getElementById("mostik");
            let triggerFoggy = main_win.getElementById("show");
            let triggerTele = main_win.querySelector('#title img')

            if (null != idSector) {
                let obekt = main_win.getElementById('obj_front')
                let astron;
                    if (obekt) {
                        if (obekt.style.display === 'block') {
                            astron = obekt.querySelector('img');
                        }
                    }
                
                let checkAs = true;
                let proigral = main_win.getElementById('loser').src;
                if (astron) {
                        checkAs = false;
                        if (astron.src==='http://img.starcombats.com/map/obj/dron01.gif') {
                                //astron.click()
                                //setTimeout(()=>{
                                //        main_win.getElementById('item1').click()
                                //},2000)
                        } else if (astron.src==='http://img.starcombats.com/map/obj/transport.gif'){
                        clearInterval(obshiyCont)
                        setTimeout(obhodSdacha,2000)} else {
                                astron.click()
                                setTimeout(()=>{
                                        main_win.getElementById('item1').click()
                                },2000)
                        }
                    }

                
                let obnovRnd = Math.floor(Math.random()*1000)+1000;
                if (checkAs && propusk <= 2){
                        dubleSector = idSector;
                    if (idSector===dubleSector) {
                        propusk++
                    }
                    clearInterval(obshiyCont)
                    prohod()
                } else { 
                    setTimeout(()=>{main_win.getElementById('refresh').click()},obnovRnd) 
                    propusk = 0;
                }
            } else if(triggerTrume||triggerMost){
                if(triggerTrume&&!sdahaSadania){
                                setTimeout(()=>{
                                        mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
                                        let gruze = mainOkno.querySelector('.cats a:last-child')
                                        gruze.click()
                                        setTimeout(()=>{
                                                clearInterval(obshiyCont)
                                                udalenie();
                                        },2000)
                                },2000) 
                        } else if(triggerTrume&&sdahaSadania){
                                clearInterval(obshiyCont)
                                teleporEnd();
                        }

            } else if (triggerFoggy||triggerTele) {
                main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                let locationsMain = main_win.querySelectorAll(".menu a");
                let locatSeych = [];
                for (var i = 0;i <= locationsMain.length-1; i++) {
                       var locname = locationsMain[i]
                       locatSeych.push(locname.textContent)
                }
                let triggerComp = main_win.querySelectorAll('img')[9]
                 triggerTele = main_win.querySelector('#title img')

                if (zadanie) {
                        
                        if (locatSeych[2]==='Орбита Станции') {
                                var loc4 = locationsMain[0]
                                loc4.click()
                        } else if (locatSeych[0]==='Периметр') {
                                var loc5 = locationsMain[6]
                                loc5.click()
                        } else if (locatSeych[1]==='Центральный Компьютер') {
                                var loc6 = locationsMain[4]
                                loc6.click()
                        } else if (triggerTele.src==='http://img.starcombats.com/locations/varp/title_rus.gif') {
                                
                                let teleportOtpravki = main_win.querySelectorAll('.forlink a')
                                for (var i = 0; i < teleportOtpravki.length; i++) {
                                        var otpravka = teleportOtpravki[i]
                                        if (otpravka.textContent === 'Миссия "Спасение торговца"') {
                                               otpravka.click();
                                                return   
                                        }
                                }
                        }
                } else {
                        if (locatSeych[2]==='Орбита Станции') {
                                var loc1 = locationsMain[2]
                                loc1.click()
                        } else if (locatSeych[0]==='Периметр') {
                                var loc2 = locationsMain[4]
                                loc2.click()
                        } else if (locatSeych[1]==='Центральный Компьютер') {
                                var loc3 = locationsMain[1]
                                loc3.click()
                        } else if (triggerComp.src==="http://img.starcombats.com/locations/computer/head_rus.jpg"
) {
                             clearInterval(obshiyCont);
                             rubkaZadanie();   
                        } 
                }
                
            } else { let navigBtn = menu_win.querySelector('.right img:last-of-type')
                                navigBtn.click()
                        }    
        },interRnd);
    }
obrabotka()
}
