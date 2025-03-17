

function clear_imps()
{
        for (i = 1; i <= 5; i++)
        {
                techno_obj = document.getElementById('techno' + i);
                techno_obj.src = _text[lang]['img_path'] + 'spacer.gif';
                techno_obj.scroll_id = 0;
                techno_obj.func = '';
                techno_obj.onclick = '';
                techno_obj.alt = '';
                techno_obj.title = '';
                techno_obj.style.cursor = '';
                tendency_obj = document.getElementById('tendency' + i);
                tendency_obj.src = _text[lang]['img_path'] + 'spacer.gif';
                tendency_obj.scroll_id = 0;
                tendency_obj.func = '';
                tendency_obj.onclick = '';
                tendency_obj.alt = '';
                tendency_obj.title = '';
                tendency_obj.style.cursor = '';
                protection_obj = document.getElementById('protection' + i);
                protection_obj.src = _text[lang]['img_path'] + 'spacer.gif';
                protection_obj.scroll_id = 0;
                protection_obj.func = '';
                protection_obj.alt = '';
                protection_obj.title = '';
        }
}


function use_thing(obj_id, id)
{
        
                if (!block_set) set_block(1 + Math.floor(Math.random() * 4));
                form_block = block_zone[self['points_to_block']][block_num];
                slot_obj = document.getElementById(obj_id);

                if (slot_obj.func === 'true')
                {
                        let onclick = function () { use_thing_name(obj_id, id); return false; }
                        show_name_form(obj_id, id, onclick);
                }
                else if (slot_obj.func === 'joker')
                {
                        let onclick = function () { use_thing_name(obj_id, id); return false; }
                        show_joker_form(obj_id, id, onclick);
                }
                else
                {
                        let req = new Subsys_JsHttpRequest_Js();
                        req.onreadystatechange = function()
                        {
                                if (req.readyState == 4)
                                {
                                        clear_all();
                                        error = req.responseJS.error;
                                        if (error) show_error(error);
                                        else
                                        {
                                                if (req.responseJS.self)
                                                {
                                                        show_info(req.responseJS.self);
                                                        set_current_param(req.responseJS.self);
                                                }
                                                if (req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
                                                if (req.responseJS.things) load_things(req.responseJS.things);
                                                if (req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
                                                if (req.responseJS.enemy_things) load_enemy_things(req.responseJS.enemy_things);
                                                else load_default_enemy_things();
                                                if (req.responseJS.seconds_before_end)
                                                {
                                                        secondsBeforeEnd = req.responseJS.seconds_before_end;
                                                }
                                                if(req.responseJS.abilities)
                                                {
                                                        virus_ability = req.responseJS.abilities;
                                                        prepare_virus_ability();
                                                }
                                                if (req.responseJS.end_window)
                                                {
                                                        show_button(false);
                                                        show_glass();
                                                        show_result(req.responseJS.end_window+'<br><br><a href="' + log_string + '" target="_blank">Полный лог боя</a>');
                                                }
                                                top.chatWindow.get_log();
                                        }
                                }
                        }

                        req.open('POST', _text[lang]['station_path'] + 'ajax/combat/use_thing.php', true);
                        req.send({thing_id: id, block: form_block, ix: Math.random()});
                }
        
}

function use_scroll(obj_id, id)
{
        
                if (!block_set) set_block(1 + Math.floor(Math.random() * 4));
                form_block = block_zone[self['points_to_block']][block_num];
                slot_obj = document.getElementById(obj_id);
                if (slot_obj.func === 'true')
                {
                        let onclick = function () { use_scroll_name(obj_id, id); return false; };
                        show_name_form(obj_id, id, onclick);
                }
                else if (slot_obj.func === 'joker')
                {
                        let onclick = function () { use_scroll_name(obj_id, id); return false; };
                        show_joker_form(obj_id, id, onclick);
                }
                else
                {
                        let req = new Subsys_JsHttpRequest_Js();
                        req.onreadystatechange = function()
                        {
                                if (req.readyState == 4)
                                {
                                        clear_all();
                                        error = req.responseJS.error;
                                        if (error) show_error(error);
                                        else
                                        {
                                                if (req.responseJS.self)
                                                {
                                                        show_info(req.responseJS.self);
                                                        set_current_param(req.responseJS.self);
                                                }
                                                if (req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
                                                if (req.responseJS.things) load_things(req.responseJS.things);
                                                if (req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
                                                if (req.responseJS.enemy_things) load_enemy_things(req.responseJS.enemy_things);
                                                else load_default_enemy_things();
                                                if (req.responseJS.seconds_before_end)
                                                {
                                                        secondsBeforeEnd = req.responseJS.seconds_before_end;
                                                }
                                                if(req.responseJS.abilities)
                                                {
                                                        virus_ability = req.responseJS.abilities;
                                                        prepare_virus_ability();
                                                }
                                                if (req.responseJS.end_window)
                                                {
                                                        show_button(false);
                                                        show_glass();
                                                        show_result(req.responseJS.end_window+'<br><br><a href="' + log_string + '" target="_blank">Полный лог боя</a>');
                                                }
                                                top.chatWindow.get_log();
                                        }
                                }
                        }

                        req.open('POST', _text[lang]['station_path'] + 'ajax/combat/use_scroll.php', true);
                        req.send({scroll_id: id, block: form_block, ix: Math.random()});
                }
        
}

function use_ability(obj_id, id, func, new_name)
{
        if (func == 'true' && typeof(new_name) == 'undefined')
        {
                let onclick = function () { use_ability(obj_id, id, func, 1); return false; }
                show_name_form(obj_id, id, onclick);
                return false;
        }

        if(new_name == 1 && document.getElementById('personage_name'))
        {
                new_name = document.getElementById('personage_name').value;
                document.getElementById('personage_name').value = '';
                hide_name_form();
        }
        else new_name = '';

                let req = new Subsys_JsHttpRequest_Js();
                req.onreadystatechange = function()
                {
                        if (req.readyState == 4)
                        {
                                clear_all();
                                error = req.responseJS.error;
                                if (error) show_error(error);
                                else
                                {
                                        if (req.responseJS.self)
                                        {
                                                show_info(req.responseJS.self);
                                                set_current_param(req.responseJS.self);
                                        }
                                        if (req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
                                        if (req.responseJS.things) load_things(req.responseJS.things);
                                        if (req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
                                        if (req.responseJS.enemy_things) load_enemy_things(req.responseJS.enemy_things);
                                        else load_default_enemy_things();
                                        if (req.responseJS.seconds_before_end)
                                        {
                                                secondsBeforeEnd = req.responseJS.seconds_before_end;
                                        }
                                        if(req.responseJS.abilities)
                                        {
                                                virus_ability = req.responseJS.abilities;
                                                prepare_virus_ability();
                                        }
                                        if (req.responseJS.end_window)
                                        {
                                                show_button(false);
                                                show_glass();
                                                show_result(req.responseJS.end_window+'<br><br><a href="' + log_string + '" target="_blank">Полный лог боя</a>');
                                        }
                                        top.chatWindow.get_log();
                                }
                        }
                }

                req.open('POST', _text[lang]['station_path'] + 'ajax/combat/use_ability.php', true);
                req.send({ability_id: id, name: new_name,ix: Math.random()});
        
}

function use_scroll_name(obj_id, id)
{
        if(document.getElementById('personage_name'))
        {
                new_name = document.getElementById('personage_name').value;
                document.getElementById('personage_name').value = '';
        }
        else new_name = '';
        other_data = '';
        if(document.getElementById('joker_text'))
        {
                other_data = document.getElementById('joker_text').value;
                document.getElementById('joker_text').value = '';
        }

        hide_name_form();
        if (!block_set) set_block(1 + Math.floor(Math.random() * 4));
        form_block = block_zone[self['points_to_block']][block_num];

        let req = new Subsys_JsHttpRequest_Js();
        req.onreadystatechange = function()
        {
                if (req.readyState == 4)
                {
                        clear_all();
                        error = req.responseJS.error;
                        if (error) show_error(error);
                        else
                        {
                                if (req.responseJS.self)
                                {
                                        show_info(req.responseJS.self);
                                        set_current_param(req.responseJS.self);
                                }
                                if (req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
                                if (req.responseJS.things) load_things(req.responseJS.things);
                                if (req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
                                if (req.responseJS.enemy_things) load_enemy_things(req.responseJS.enemy_things);
                                else load_default_enemy_things();
                                if (req.responseJS.seconds_before_end)
                                {
                                        secondsBeforeEnd = req.responseJS.seconds_before_end;
                                }
                                if(req.responseJS.abilities)
                                {
                                        virus_ability = req.responseJS.abilities;
                                        prepare_virus_ability();
                                }
                                if (req.responseJS.end_window) show_error(req.responseJS.end_window+'<br><br><a href="' + log_string + '" target="_blank">Полный лог боя</a>');
                                top.chatWindow.get_log();
                        }
                }
        }

        req.open('POST', _text[lang]['station_path'] + 'ajax/combat/use_scroll.php', true);
        req.send({scroll_id: id, block: form_block, name: new_name,other_data:other_data, ix: Math.random()});
}

function use_thing_name(obj_id, id)
{
        if(document.getElementById('personage_name'))
        {
                new_name = document.getElementById('personage_name').value;
                document.getElementById('personage_name').value = '';
        }
        else new_name = '';
        other_data = '';
        if(document.getElementById('joker_text'))
        {
                other_data = document.getElementById('joker_text').value;
                document.getElementById('joker_text').value = '';
        }
        hide_name_form();
        if (!block_set) set_block(1 + Math.floor(Math.random() * 4));
        form_block = block_zone[self['points_to_block']][block_num];

        let req = new Subsys_JsHttpRequest_Js();
        req.onreadystatechange = function()
        {
                if (req.readyState == 4)
                {
                        clear_all();
                        error = req.responseJS.error;
                        if (error) show_error(error);
                        else
                        {
                                if (req.responseJS.self)
                                {
                                        show_info(req.responseJS.self);
                                        set_current_param(req.responseJS.self);
                                }
                                if (req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
                                if (req.responseJS.things) load_things(req.responseJS.things);
                                if (req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
                                if (req.responseJS.enemy_things) load_enemy_things(req.responseJS.enemy_things);
                                else load_default_enemy_things();
                                if (req.responseJS.seconds_before_end)
                                {
                                        secondsBeforeEnd = req.responseJS.seconds_before_end;
                                }
                                if(req.responseJS.abilities)
                                {
                                        virus_ability = req.responseJS.abilities;
                                        prepare_virus_ability();
                                }
                                if (req.responseJS.end_window) show_error(req.responseJS.end_window+'<br><br><a href="' + log_string + '" target="_blank">Полный лог боя</a>');
                                top.chatWindow.get_log();
                        }
                }
        }

        req.open('POST', _text[lang]['station_path'] + 'ajax/combat/use_thing.php', true);
        req.send({thing_id: id, block: form_block, name: new_name,other_data:other_data, ix: Math.random()});
}

function show_name_form(obj_id, id, onclick)
{
        form_data = _text['rus']['personage_name'] + ': <input type="text" style="width:200px;font" id="personage_name">';
        document.getElementById('f_but').onclick = onclick;
        document.getElementById("winmain").innerHTML = form_data;
        document.getElementById('ability_window').style.display = 'block';
}

function show_joker_form(obj_id, id, onclick)
{
        form_data = _text['rus']['joker_text'] + ': <input type="text" style="width:200px;font" id="joker_text">';
        document.getElementById('f_but').onclick = onclick;
        document.getElementById("winmain").innerHTML = form_data;
        document.getElementById('ability_window').style.display = 'block';
}

function hide_name_form()
{
        document.getElementById('ability_window').style.display = 'none';
}

function show_info(self)
{
        is_dead = true;
        if (self['personage_id'] != undefined)
        {
                document.getElementById('combat_id').href = '/combats/logs.php?log=' + self['combat_id'];
                log_string = '/combats/logs.php?log=' + self['combat_id'];
                document.getElementById('avatar').src = _text[lang]['img_url']  + 'avatars/' + self['sex'] + '/' + self['avatar_id'] + '.gif';
                document.getElementById('spacecraft').style.backgroundImage = 'URL(' + _text[lang]['img_url'] + 'crafts/' + self['spacecraft_img'] + '.gif)';
                document.getElementById('starttime').innerHTML = self['starttime'];
                document.getElementById('timeout').innerHTML = self['timeout'];
                document.getElementById('damage').innerHTML = self['damaged'];
                document.getElementById('def_points').innerHTML = self['def_points'];
                document.getElementById('attack_points').innerHTML = self['attack_points'];
                if (self['tendency'] == -2)
                {
                        total_exp = Math.floor((self['exp'] / 6) * (self['combat_percent'] / 100) * (self['personage_percent'] / 100));
                }
                else
                {
                        exp_combat = Math.floor(self['exp'] * self['combat_percent'] / 100);
                        exp_bonus = Math.floor(exp_combat * self['bonus']) - exp_combat;
                        exp_level = Math.floor((exp_combat * (1 + self['level'] * 0.05)) - exp_combat);
                        exp_virus = Math.floor(exp_combat * self['virus_level'] * 0.1);
                        exp_respect = Math.floor(exp_combat * (500 - self['respect_count']) * -0.001);
                        total_exp = Math.floor((exp_combat + exp_level + exp_virus + exp_respect + exp_bonus) * (self['personage_percent'] / 100));
                }
                document.getElementById('exp').innerHTML = total_exp;
                document.getElementById('changes').innerHTML = self['changes'];
                if (self['reboot'] != 0) document.getElementById('reboot').style.display = 'block';
                else document.getElementById('reboot').style.display = 'none'
                if (self['geodriver'] != 0) document.getElementById('geodriver').style.display = 'block';
                else document.getElementById('geodriver').style.display = 'none';
                if (self['hp_current'] > 0) is_dead = false;
        }
        else
        {
                is_dead = false;
        }
}
 function use_action(action_id, sector)
    {
      if (document.getElementById("check_input") != null) check_code = document.getElementById("check_input").value;
      else check_code = '';

      let req = new JsHttpRequest();
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
        
                let req = new Subsys_JsHttpRequest_Js()
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
  let propusk=0;

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
                setTimeout(prohod,2000)
        } else if (imgObekt[0].src==='http://img.starcombats.com/map/cor/left_on.gif'){
                vLevo.click()
                setTimeout(prohod,2000)
        }

    }

    let udalenie =()=>{
        let mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
        let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
        let iskomoe;
        let iskomoeName = "Пустой контейнер";
        let obshee = mainOkno.querySelectorAll('.item');
                                 let script = document.createElement("script");
                                 script.setAttribute("type", "text/javascript");
                                 script.innerHTML = delete_other ;
                                 mainOkno.getElementsByTagName('head')[0].appendChild(script);
        setTimeout(()=>{
        for (let i = obshee.length - 1; i >= 0; i--) {

          let block = obshee[i]
          if (block.querySelector('h1').textContent === iskomoeName){
            iskomoe = block;
            }
        }   
         let delBtn = iskomoe.querySelector('tr:nth-child(2) td:nth-child(4) img')
          
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
        let script = document.createElement("script");
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
            let down_bar = document.getElementsByName('chatbarWindow')[0].contentDocument;
        let mostik = down_bar.getElementById('bridge_btn')
        mostik.click()
        setTimeout(() => {
                let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                
                let chansClick = main_win.getElementById('img22')
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
        let interRnd = Math.floor(Math.random()*2000);
        let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
        let compMenu = main_win.querySelectorAll('.item a')
        compMenu[4].click()
        setTimeout(()=>{
                main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                let vyborZadan = main_win.querySelectorAll('#items_div img')
                if (vyborZadan.length===1) {
                        vyborZadan[0].click()
                        setTimeout(()=>{
                                main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                             main_win.getElementById('button').click();   
                             rubkaZadanie()
                        },2143)
                } else {
                compMenu[0].click()
                setTimeout(()=>{
                        main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                   vyborZadan = main_win.querySelectorAll('#items_div img')
                   vyborZadan[10]?.click();     
                },1062)
                setTimeout(()=>{
                        main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                        main_win.getElementById('button')?.click();
                        setTimeout(()=>{
                                main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                                main_win?.querySelector('a')?.click();
                                zadanie=true;
                                obrabotka();
                        },interRnd+1523)
                },interRnd+2132)
                }
        },interRnd+2561)   
    }

    const obrabotka =()=>{
let interRnd = Math.floor(Math.random()*1500)+4500;
        
       let obshiyCont = setInterval(()=>{
           
            let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
            let menu_win = document.getElementsByName('menuWindow')[0].contentDocument;
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
                if (astron) {
                        checkAs = false;
                        if (astron.src==='http://img.starcombats.com/map/obj/dron01.gif') {
                                astron.click()
                                setTimeout(()=>{
                                        main_win.getElementById('item1').click()
                                },2000)
                        } else {
                        clearInterval(obshiyCont)
                        setTimeout(obhodSdacha,2000)}
                    }
                let textSektor = idSector.textContent
                
                let obnovRnd = Math.floor(Math.random()*1000)+1000;
                if (checkAs && propusk <= 2){
                       
                    if (textSektor===dubleSector) {
                        propusk++
                    } else { 
                        propusk=0
                        }
                    clearInterval(obshiyCont)
                    prohod()
                } else if(checkAs && 4>= propusk >= 3){ 
                    setTimeout(()=>{main_win.getElementById('refresh').click()},obnovRnd) 
                } else if(checkAs){     
                        let navigBtn = menu_win.querySelector('.right img:last-of-type')
                                navigBtn.click()
                                propusk=0;            
                }
                dubleSector = idSector.textContent; 
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
                let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                let locationsMain = main_win.querySelectorAll(".menu a");
                let locatSeych = [...locationsMain].map(elem => elem.textContent);
                let triggerComp = main_win.querySelectorAll('img')[9]
                 triggerTele = main_win.querySelector('#title img')

                if (zadanie && locatSeych.length > 0) {
                        if (main_win.location.href === 'http://foggystation.starcombats.com/locations/teleport.php') {
                                let loc4 = locationsMain[0]
                                loc4.click()
                        } else if (main_win.location.href === 'http://foggystation.starcombats.com/locations/mainsquare.php') {
                                let loc5 = locationsMain[6]
                                loc5.click()
                        } else if (main_win.location.href === 'http://foggystation.starcombats.com/locations/engineering.php') {
                                let loc6 = locationsMain[4]
                                loc6.click()
                        } 
                } else if (locatSeych.length > 0) {
                        if (locatSeych[2]==='Орбита Станции') {
                                let loc1 = locationsMain[2]
                                loc1.click()
                        } else if (locatSeych[0]==='Периметр') {
                                let loc2 = locationsMain[4]
                                loc2.click()
                        } else if (locatSeych[1]==='Центральный Компьютер') {
                                let loc3 = locationsMain[1]
                                loc3.click()
                        }
                        
                } else if (triggerComp.src==="http://img.starcombats.com/locations/computer/head_rus.jpg") {
                             clearInterval(obshiyCont);
                             rubkaZadanie();   
                } else if (triggerTele.src === 'http://img.starcombats.com/locations/varp/title_rus.gif') {
                        let teleportOtpravki = main_win.querySelectorAll('.forlink a')
                        for (let i = 0; i < teleportOtpravki.length; i++) {
                                let otpravka = teleportOtpravki[i]
                                if (otpravka.textContent === 'Миссия "Спасение торговца"') {
                                       otpravka.click();
                                        return   
                                }
                        }
                } 
                
                
            } else { let navigBtn = menu_win.querySelector('.right img:last-of-type')
                                navigBtn.click()}
            
        },interRnd);
    }
obrabotka()
}
