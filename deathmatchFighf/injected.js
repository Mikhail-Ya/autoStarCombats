

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
                        var onclick = function () { use_thing_name(obj_id, id); return false; }
                        show_name_form(obj_id, id, onclick);
                }
                else if (slot_obj.func === 'joker')
                {
                        var onclick = function () { use_thing_name(obj_id, id); return false; }
                        show_joker_form(obj_id, id, onclick);
                }
                else
                {
                        var req = new Subsys_JsHttpRequest_Js();
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
                        var onclick = function () { use_scroll_name(obj_id, id); return false; };
                        show_name_form(obj_id, id, onclick);
                }
                else if (slot_obj.func === 'joker')
                {
                        var onclick = function () { use_scroll_name(obj_id, id); return false; };
                        show_joker_form(obj_id, id, onclick);
                }
                else
                {
                        var req = new Subsys_JsHttpRequest_Js();
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
                var onclick = function () { use_ability(obj_id, id, func, 1); return false; }
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

                var req = new Subsys_JsHttpRequest_Js();
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

        var req = new Subsys_JsHttpRequest_Js();
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

        var req = new Subsys_JsHttpRequest_Js();
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

        req.open('GET', '../ajax/hspace_action.php', true);
        req.send({ check_code: check_code, action_id: action_id, sector: sector, ix: Math.random()});
}
function pers_attack(pers_id, name)
{
                var req = new JsHttpRequest();

                req.onreadystatechange = function()
                {
                        if(req.readyState == 4)
                        {
                                document.getElementById("use_div").style.visibility = "hidden";

                                if (req.responseJS != null)
                                {
                                        if (req.responseJS.error.error_msg != null)
                                        {
                                                error_msg = req.responseJS.error.error_msg;
                                                if (error_msg.length > 0)
                                                {
                                                }
                                        }

                                        if (req.responseJS.error.eval_msg != null)
                                        {
                                                eval_msg = req.responseJS.error.eval_msg;
                                                eval(eval_msg);
                                        }

                                        space_navigate('reload');
                                }
                        }
                }

                req.open('GET', '../ajax/hspace_attack.php', true);
                req.send({enemy_id: pers_id, ix: Math.random()});
}

function injected_main(){
        
  let dubleSector;
  let propusk;
        const autoBoy =()=>{
                let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
                                let scripts = main_win.getElementsByTagName('script').length
                                 if (scripts<8){
                                 var script = document.createElement("script");
                                 script.setAttribute("type", "text/javascript");
                                 script.innerHTML = use_thing + '; ' + use_scroll + '; ' + use_ability + ';';
                                 main_win.getElementsByTagName('head')[0].appendChild(script);}
                let perezagruz = main_win.querySelector('#ability3 a');
                let vipset = main_win.getElementById('radar');
                let activPer = main_win.getElementById('reboot');
                let perezImg = main_win.getElementById('');
                let messageOkno = main_win.getElementById('infoWindow');
                let chat_top_win = document.getElementsByName('chatmenuWindow')[0].contentDocument;
                let chatBtnday = chat_top_win.getElementById('tabNameChat')
                let obnovRn = Math.floor(Math.random()*500)+2000;
                if(messageOkno&&messageOkno.style.visibility === "visible"){
                let textInfoWin = main_win.getElementById('infoWindowMessage').textContent
                let viborkaTexta = ""

                for (let t=0;t<2;t++){
                    viborkaTexta = viborkaTexta + textInfoWin[t]
                }
                
                switch (viborkaTexta) {
                    case "Бо":
                        panelMenu.querySelector('.right img:last-child').click()
                        setTimeout(()=>{chatBtnday.click()}, obnovRn)
                        setTimeout(obrabotka,obnovRn)
                        break
                    case "Вы":
                        panelMenu.querySelector('.right img:last-child').click()
                        setTimeout(()=>{chatBtnday.click()}, obnovRn)
                        setTimeout(obrabotka,obnovRn)
                        break
                    case "Ож":
                        panelMenu.querySelector('.right img:last-child').click()
                        setTimeout(obrabotka,obnovRn)
                        break
                    case "Пе":
                        main_win.querySelector('.infobtn').click()
                        panelMenu.querySelector('.right img:last-child').click()
                        setTimeout(obrabotka,obnovRn)
                        break
                    default:
                        panelMenu.querySelector('.right img:last-child').click()
                        setTimeout(()=>{chatBtnday.click()}, obnovRn)
                        setTimeout(obrabotka,obnovRn)
                        break
                }
            } else {
                        let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                                vipset.click() 
                        setTimeout(obrabotka,obnovRn)
                } 
        }
        const deystvie =()=>{
                let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                let vLevo = main_win.getElementById('left')
                let vPravo = main_win.getElementById('right')
                let intRnd = Math.floor(Math.random()*10)
                if (intRnd<3){
                        vPravo.click()
                        
                } if (3<intRnd<6) {
                        vLevo.click()
                        
                } else {
                        main_win.getElementById('refresh').click()
                }
        }
        const obrabotka =()=>{
        let interRnd = Math.floor(Math.random()*1000)+1500;
       let obshiyCont = setInterval(()=>{
                let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                if (main_win.querySelectorAll('script').length<9){
                var script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.innerHTML = use_action+'; ' + pers_attack ; 
                main_win.getElementsByTagName('body')[0].appendChild(script);
                }
            
            let menu_win = document.getElementsByName('menuWindow')[0].contentDocument;
            let down_bar = document.getElementsByName('chatbarWindow')[0].contentDocument;
            let idSector = main_win.getElementById("sector");
            let triggerTrume = main_win.getElementById("inventory_current");
            let triggerMost = main_win.getElementById("mostik");

            if (null != idSector) {
               let oblomki = [main_win.querySelector('#obj_left'),
                                        main_win.querySelector('#obj_front'),
                                        main_win.querySelector('#obj_right')]
                                let oblomok;
                                for (var i = 0; i < oblomki.length; i++) {
                                        let imgObekt = oblomki[i].firstChild.src
                                        var nonOblom = oblomki[i];
                                        
                                        
                                        if (nonOblom.style.display==='block') {
                                                        
                                                oblomok = nonOblom.firstChild
                                         }
                                        if(imgObekt!=='http://img.starcombats.com/map/obj/hunter.gif'){
                                                nonOblom = oblomki[i]
                                                if (nonOblom.style.display==='block') {    
                                                        oblomok = nonOblom.firstChild;
                                                }     
                                                
                                        }        
                                }
                let checkAs = true;
                if (oblomok) {
                        checkAs = false;
                    }

                
                let obnovRnd = Math.floor(Math.random()*700)+200;
                if (checkAs){
                        dubleSector = idSector;
                    if (idSector===dubleSector) {
                        propusk++
                    }
                    let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                let vLevo = main_win.getElementById('left')
                let vPravo = main_win.getElementById('right')
               
                        main_win.getElementById('refresh').click()
        
                } else if(oblomok){
                        oblomok.click()
                        setTimeout(()=>{
                                main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                                if(main_win.querySelector('#personage_list a')){
                                       main_win.querySelector('#personage_list a').click()
                                       setTimeout(()=>{
                                        let navigBtn = menu_win.querySelector('.right img:last-of-type')
                                                navigBtn.click()
                                        },200) 
                                } else if (main_win.getElementById('use_div').style.visibility ==='visible'){
                                        main_win.getElementById('item1').click()
                                        main_win.getElementById('refresh').click()
                                } else { main_win.getElementById('refresh').click()}

                        },obnovRnd)
                } else { main_win.getElementById('refresh').click()}
            } else if(main_win.getElementById('achange')) {    
                                clearInterval(obshiyCont)
                                autoBoy() 
            } else {
                let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
                panelMenu.querySelector('.right img:last-child').onclick()
            }
              
        },interRnd);}
obrabotka()

}
