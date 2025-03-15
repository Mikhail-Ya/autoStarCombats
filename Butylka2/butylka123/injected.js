

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


function injected_main(){
    let hil5000 = 0,
     hil3000 = 0,
     shansInd = 0,
     dubleSector='',
     propusk = 0,
     krugi = 7,
     triggerB = 0,
     energyHub = 0,
     firstTurn = true,
     secondTurn = true,
     dubleTime = 24;
    const funShans =()=>{
        let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
            let menu_win = document.getElementsByName('menuWindow')[0].contentDocument;
            let down_bar = document.getElementsByName('chatbarWindow')[0].contentDocument;
        if (12 >= shansInd) {
            let mostik = down_bar.getElementById('bridge_btn')
            mostik.click()
            setTimeout(() => {
                main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                var chansClick = main_win.getElementById('img14')
                chansClick.click()
                let useShansBtn = setTimeout(() => {
                    let useChans = main_win.querySelector('#info_div_content a:first-of-type')
                    if (useChans) {
                        useChans.click()
                        clearTimeout(useShansBtn)
                    }
                }, 2000)
                var otvet = main_win.getElementById('infoWindow')
                let winUseShans = setInterval(() => {
                    if ("visible" === otvet.style.visibility) {
                        menu_win.querySelector('.right img:last-child').click()
                        clearInterval(winUseShans)
                        shansInd++
                        obrabotka()
                    }
                }, 2000)
            }, 6000)
        } 
    }

    const hilka =()=> {
        const main_win = document.getElementsByName('mainWindow')[0].contentDocument,
            menu_win = document.getElementsByName('menuWindow')[0].contentDocument,
            down_bar = document.getElementsByName('chatbarWindow')[0].contentDocument,
            mostik = down_bar.getElementById('bridge_btn');
            mostik.click()
        setTimeout(() => {
            let chat_top_win = document.getElementsByName('chatmenuWindow')[0].contentDocument;
            let chatBtnday = chat_top_win.getElementById('tabNameChat')
            let indHpDiv2 = menu_win.getElementById('hptext').textContent.split('/').map(Number).reduce((a,b)=>a/b)*100;
            if ( 30 >= indHpDiv2) {
                let ability = ""
                if (19 >= hil5000) {
                    ability = 'img3'
                    hil5000++
                } else if(19 >= hil3000) {
                    ability = 'img2'
                    hil3000++
                }
                if(ability != ''){
                let chansClick = main_win.getElementById(ability)
                chansClick.click()
                    setTimeout(() => {
                    let useChans = main_win.querySelector('#info_div_content a:first-of-type')
                        if (useChans) {
                            useChans.click()
                            setTimeout(()=>{chatBtnday.click()}, 2500)
                        }
                    }, 2000)
                    setTimeout(() => {
                        
                         menu_win.querySelector('.right img:last-child').click()
                         setTimeout(obrabotka,1000)
                        
                    }, 2000)
                } else {
                    setTimeout(()=>{
                        setTimeout(obrabotka,1000)
                        menu_win.querySelector('.right img:last-child').click()
                    },66000)
                }
            } else {
                console.log('time out hilth')
                setTimeout(obrabotka,4000)
                menu_win.querySelector('.right img:last-child').click() 
            }
        }, 10000)
    }

    const boy=()=>{
                triggerB=0
                const mainOkno = document.getElementsByName('mainWindow')[0].contentDocument,
                 panelMenu = document.getElementsByName('menuWindow')[0].contentDocument,
                 vipset = mainOkno.getElementById('radar'),
                 vBoyHilk = mainOkno.getElementById('computer'),
                 activPer = mainOkno.getElementById('reboot'),
                 messageOkno = mainOkno.getElementById('infoWindow'),
                 chat_top_win = document.getElementsByName('chatmenuWindow')[0].contentDocument,
                 chatBtnday = chat_top_win.getElementById('tabNameChat'),
                 obnovRn = Math.floor(Math.random()*1500)+1500,
                 scripts = mainOkno.getElementsByTagName('script').length
                        if (scripts<8){
                            let script = document.createElement("script");
                                script.setAttribute("type", "text/javascript");
                                script.innerHTML = use_thing + '; ' + use_scroll + '; ' + use_ability + ';';
                                mainOkno.getElementsByTagName('head')[0].appendChild(script);
                        }
            if(!mainOkno.getElementById('achange')){
                // panelMenu.querySelector('.right img:last-child').click()
                setTimeout(obrabotka,1000+obnovRn)
                return
            }
            if(messageOkno&&messageOkno.style.visibility === "visible"){
                let textInfoWin = mainOkno.getElementById('infoWindowMessage').textContent
                let viborkaTexta = textInfoWin?.split(' ', 1).join();
                
                switch (viborkaTexta) {
                    case "Бой":
                        panelMenu.querySelector('.right img:last-child').click()
                        setTimeout(()=>{chatBtnday.click()}, obnovRn)
                        setTimeout(obrabotka,300+obnovRn)
                        break
                    case "Вы":
                        panelMenu.querySelector('.right img:last-child').click()
                        setTimeout(()=>{chatBtnday.click()}, obnovRn)
                        setTimeout(obrabotka,300+obnovRn)
                        break
                    case "Использование":
                        const autoboy = mainOkno.querySelector('#new_centerBlock_footer tr:nth-child(2) td:nth-child(2) img')
                        autoboy.click()
                        setTimeout(boy,obnovRn)
                        break
                    case "Ожидание":
                        panelMenu.querySelector('.right img:last-child').click()
                        setTimeout(boy,obnovRn)
                        break
                    default:
                        panelMenu.querySelector('.right img:last-child').click()
                        setTimeout(()=>{chatBtnday.click()}, obnovRn)
                        setTimeout(obrabotka,1000+obnovRn)
                        break
                }
            } else if (activPer&&activPer.style.display==='block') {
                        let hpDiv = panelMenu.getElementById('hptext').textContent.split('/').map(Number).reduce((a,b)=>a/b)*100;
                        // mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
                        let naborHilok = mainOkno.querySelectorAll('#imps tr:nth-child(2) img');
                        let hilkaBoy;
                        for (let i = naborHilok.length - 1; i >= 0; i--) {
                            if(naborHilok[i].src==='http://img.starcombats.com/scrolls/p_automech_inf.gif'){
                                hilkaBoy=naborHilok[i]
                                break
                            } 
                        }
                        if (hpDiv<=60&&hilkaBoy){
                            hilkaBoy.click()
                            setTimeout(()=>{
                                mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
                                let ispol = mainOkno.getElementById('f_but')
                                ispol.click()
                            },1000)
                        } else if(hpDiv<=60&&!hilkaBoy){
                            vBoyHilk.click()
                            setTimeout(()=>{
                                mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
                                let ispol = mainOkno.getElementById('f_but')
                                ispol.click()
                            },1000)
                        } else {
                            vipset.click()
                        }
                        setTimeout(boy,obnovRn)
                } else { 
                    setTimeout(()=>{
                        const perezagruz = mainOkno.querySelector('#ability3 a');
                        //  mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
                        //  activPer = mainOkno.getElementById('reboot');
                        if (perezagruz && activPer?.style?.display !== 'block') {
                            perezagruz.click()
                        }
                        setTimeout(()=>{
                            if(messageOkno.style.visibility!=="visible"){
                                mainOkno.querySelector('#new_centerBlock_footer img:first-child').click()
                            }
                            boy()
                        },500)
                    },obnovRn)
                }
        }
    const dvijenie =()=>{
                const main_win = document.getElementsByName('mainWindow')[0].contentDocument,
                    menu_win = document.getElementsByName('menuWindow')[0].contentDocument,
                    idSector = main_win.getElementById("sector"),
                    dalshe = main_win.getElementById('fwd'),
                    vLevo = main_win.getElementById('left'),
                    vPravo = main_win.getElementById('right'),
                    razvorot = main_win.getElementById('back'),
                    vremyaChasy = Number(new Date().getHours());
                if (!idSector){
                    obrabotka() 
                    return} 
                if(dubleSector === idSector.innerText){
                    propusk++
                } else if(dubleSector === '2450S'){ 
                    krugi++
                } else if (dubleSector!==idSector.textContent) {
                    propusk=0;
                };
                let obnovRnd = Math.floor(Math.random()*800)+1800;
                if (propusk <= 2){
                    
                    dubleSector = idSector.innerText
                    let numSektor = idSector.innerText
                    if(krugi < 7) {
                        switch (numSektor) {
                            case '33449S':
                            case '33462E':
                            case '1462N':
                            case '1450W':
                            case '11450S':
                            case '11460E':
                            case '9460N':
                            case '5445W':
                            case '9444W':
                            case '10439W':
                            case '11439S':
                            case '11448E':
                            case '6459N':
                            case '6458W':
                            case '18444N':
                            case '14443N':
                                vLevo.click()
                                setTimeout(dvijenie,obnovRnd)
                                break
                            case '14439W':
                            case '13439N':
                            case '13447E':
                            case '22447S':
                            case '22437W':
                            case '2437N':
                            case '2447E':
                            case '5447S':
                            case '18443W':
                            case '9459W':
                            case '9445S':
                            case '10444S':
                                vPravo.click()
                                setTimeout(dvijenie,obnovRnd)
                                break
                            default :
                                dalshe.click()
                                setTimeout(obrabotka,3000+obnovRnd)
                                break
                        }
                    } else {
                        switch (numSektor) {
                            case '11450S':
                            case '11460E':
                            case '9460N':
                            case '6453E':
                            case '5453N':
                            case '9454N':
                            case '9452S':
                            case '3454E':
                            case '2454N':
                            case '2451W':
                            case '5450W':
                            case '8457N':
                            case '7456N':  
                            case '6454W':
                            case '5455E':
                            case '4460N':
                            case '4459W':  
                            case '5457W':
                            case '6457S':
                                vLevo.click()
                                setTimeout(dvijenie,obnovRnd)
                                break
                            case '10457S':
                            case '10454W':
                            case '10453S':
                            case '10451W':
                            case '6451N':
                            case '3451N':
                            case '5451S':
                            case '7455W':
                            case '6455N':
                            case '8456W':
                            case '5454N':
                            case '3455N':
                            case '3460E':
                            case '9460S':
                            case '5459S':
                            case '6459E':
                            case '9459S':
                            case '9453E':
                            case '9452W':
                                vPravo.click()
                                setTimeout(dvijenie,obnovRnd)
                                break
                            case '9457W' :
                                (firstTurn)? vLevo.click() : vPravo.click();
                                firstTurn = !firstTurn
                                setTimeout(dvijenie,obnovRnd)
                                break
                            case '5451W':
                                if(secondTurn){
                                    vPravo.click()
                                    energyHub++
                                }else{
                                    dalshe.click() 
                                }
                                secondTurn = !secondTurn
                                setTimeout(dvijenie,3000+obnovRnd)
                                break
                            case '7454S':
                            case '6456E':
                            case '7452N':
                            case '8460S':
                                razvorot.click()
                                setTimeout(dvijenie,obnovRnd)
                                break
                            case '9453W':   
                                if(energyHub <= 5){ vLevo.click() } 
                                else {
                                    dalshe.click()
                                    energyHub = 0;
                                }
                                setTimeout(dvijenie,1000+obnovRnd)
                                break
                            case '5460S':
                                (energyHub <= 5)? dalshe.click() : razvorot.click();
                                setTimeout(obrabotka,3000+obnovRnd) 
                                break
                            default :
                                dalshe.click()
                                setTimeout(obrabotka,3000+obnovRnd)
                                break
                        }
                    }
                } else if (dubleTime!==vremyaChasy) {
                        menu_win.querySelector('.right img:last-child').click();
                        dubleTime = vremyaChasy;
                        propusk = 0;
                        setTimeout(obrabotka,3000+obnovRnd)
                } else { 
                    setTimeout(()=>{main_win.getElementById('refresh').click()},obnovRnd) 
                    propusk = 0;
                    setTimeout(obrabotka,3000+obnovRnd)
                }
                
                
        }
    function obrabotka (){
            let vremyaMin = Number(new Date().getMinutes()),
            vremyaChas = Number(new Date().getHours());
            if( 6 === vremyaChas && 0 === vremyaMin ){
                hil5000 = 0;
                hil3000 = 0;
            } else if (16 === vremyaChas && 0 === vremyaMin){
                shansInd = 0
            }
            const main_win = document.getElementsByName('mainWindow')[0].contentDocument,
                menu_win = document.getElementsByName('menuWindow')[0].contentDocument,
                idSector = main_win?.getElementById("sector"),
                navigBtn = menu_win.querySelector('.right img:last-of-type'),
                hpDiv = menu_win.getElementById('hptext').textContent.split('/').map(Number).reduce((a,b)=>a/b)*100;
           
            if (null != idSector || idSector) {
                const obekty = [main_win.getElementById('obj_left'),
                    main_win.getElementById('obj_front'),
                    main_win.getElementById('obj_right'),]
                let astron;
                for (let a = 0; a < obekty.length; a++) {
                    let obekt = obekty[a]
                    if (obekt) {
                        if (obekt.style.display === 'block') {
                            astron = obekt.querySelector('img')
                        }
                    }
                }
                
                const proigral = main_win.getElementById('loser').src
                if ('http://img.starcombats.com/map/loser1.gif' === proigral
                    ||'http://img.starcombats.com/map/loser2.gif' === proigral) {
                    funShans()
                } else if (hpDiv < 30) {
                    hilka()
                } else if (astron) {
                        astron.click()
                        setTimeout(() => {
                            if(triggerB===0){
                                main_win.getElementById('item1').click()
                                triggerB=1
                            };
                            navigBtn.click()
                            setTimeout(boy,2000)
                        },1000)
                } else {
                       setTimeout(dvijenie,1352)
                }
                
                
            } else if (!main_win){ 
                navigBtn.click()
                setTimeout(obrabotka,14000)
            } else if(main_win.getElementById('radar')) {
                                let mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
                                let scripts = mainOkno.getElementsByTagName('script').length
                                
                                 if (scripts<8){
                                         var script = document.createElement("script");
                                         script.setAttribute("type", "text/javascript");
                                         script.innerHTML = use_thing + '; ' + use_scroll + '; ' + use_ability + ';';
                                        mainOkno.getElementsByTagName('head')[0].appendChild(script);}
                                boy()
            } else { 
                navigBtn.click()
                setTimeout(obrabotka,14000)
            }
    }
setTimeout(obrabotka,10000)
}
