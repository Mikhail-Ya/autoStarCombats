
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
                                                //alert(error_msg);
                                        }
                                }

                                if (req.responseJS.eval_msg != null)
                                {
                                        eval_msg = req.responseJS.eval_msg;
                                       // eval(eval_msg);
                                }

                                space_navigate('reload');
                        }
                }
        }

        req.open('GET', '../ajax/space_action.php', true);
        req.send({ check_code: check_code, action_id: action_id, sector: sector, ix: Math.random()});
}
function injected_main(){
        let asterSectors, dubleSector, propusk = 0, message = [], astReady = [], trigger = false, trigger2 = 0;
        asterSectors = []; // массив астеров для бурения
        let mainWin = document.getElementsByName('mainWindow')[0].contentDocument;
        let trigger1=0,timeSectors=12000,typeChange=0,maxAsters=0;
        const timeOver= 30;//44160,38155,43134,44124 // '44160','38155','43134','44124'
        let asters =[['30266','31268','31271','29274','31276','29277','30279','33280','33277','33270','34268','33266','36265','37269','37273','35273','36276','36281','35283','40284','38282','39279','39275','40272','40270','41267','39265','42265','43273','42275','42278','42281','45282','48281','45279','48277','45276','46274','48272','46271','45268','45265'],
                [],
                ['36247','34246','32244','30241','33240','36243','36251','37255','33255','32252','30250','43251','47251','45254','42256','42241','46242','48245','43245'],
                ['38052','41052','44052','43055','39055','41058','38060','44061','42062','40062','39065','42066','44066','39068','41069','43070','38071','41072','43073','39074','44075','42076','40077','41079','38079','37081','43081','40082','38085','41085','43085','44087','41088','43091','39092','41095','43095','39097','42098'],
                ['40108','42108','43107','43110','42113','44113','40114','43116','41117','40119','43120','41122','44124','40125','42126','40128','42131','44131','40133','43134','42137','41140','44140','41144','39145','43147','41148','43151','39152','41153','38155','40157','44155','44160'],
                ['41169','40173','43173','44176','41178','43180','41183','44186','40187','39191','41193','44195','40197','43200','40202','43204','41207','39209','42212','40214','43215','43218','40218','38220','42221','40223','42225','39226','44228','38230'],
        ]// 1 - железный пояс, 2 - никелевый, 3 - ледяной, 4 - титановый, 5 - золотой, 6 - иридиевый
        let goingAster =(aster)=>{
                mainWin = document.getElementsByName('mainWindow')[0].contentDocument;
                let sectorBlock = mainWin.getElementById('sector');
                let going = mainWin.getElementById('fwd');
                let left = mainWin.getElementById('left');
                let right = mainWin.getElementById('right');
                let numSector;
                if (sectorBlock){numSector = sectorBlock.innerText;} else {
                                        update()
                        return }
                let napravlenie = '';
                let gorizont='';
                let vertical='';
                let strGor = '';
                let strVer = '';
                for (let a = 0;a < aster.length; a++){
                        if(a < 2){ strGor += aster[a] }
                        else if(2 < a){ strVer += aster[a] }
                }
                let centGor = Number(strGor)
                let centVer = Number(strVer)
                for (let l =0; l<= numSector.length - 1; l++) {
                        if(l < 2){ gorizont += numSector[l] }
                        if(2 < l && l < 5){ vertical += numSector[l] }
                        napravlenie = numSector[5]
                }
                gorizont = Number(gorizont)
                vertical = Number(vertical)

                let imgObekt = [mainWin.getElementById('img_left'),
                        mainWin.getElementById('img_right'),
                        mainWin.getElementById('img_front')]
                let pryamo,pravo,levo = true;

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
                if(sectorBlock.textContent==='39248W'){
                        right.click()
                        update()
                        return
                } /**else if(sectorBlock.textContent==='36248E'){
                        right.click()
                        update()
                        return
                }*/
                let front = mainWin.getElementById('obj_front')
                if (front.style.display==='block'){
                       object(aster)
                } else {
                        if (trigger1<5) {
                                switch (napravlenie) {
                                        case 'W':
                                                if (vertical > centVer && pryamo) {
                                                        going.click()
                                                } else if (gorizont <= centGor && levo) {
                                                        left.click()
                                                } else if (gorizont >= centGor && pravo) {
                                                        right.click()
                                                } else if (pryamo) {
                                                        going.click()
                                                } else {
                                                        right.click()
                                                }
                                                break
                                        case 'N':
                                                if (gorizont > centGor && pryamo) {
                                                        going.click()
                                                } else if (vertical >= centVer && levo) {
                                                        left.click()
                                                } else if (vertical <= centVer && pravo) {
                                                        right.click()
                                                } else if (pryamo) {
                                                        going.click()
                                                } else {
                                                        right.click()
                                                }
                                                break
                                        case 'E':
                                                if (vertical < centVer && pryamo) {
                                                        going.click()
                                                } else if (gorizont <= centGor && pravo) {
                                                        right.click()
                                                } else if (gorizont >= centGor && levo) {
                                                        left.click()
                                                } else if (pryamo) {
                                                        going.click()
                                                } else {
                                                        right.click()
                                                }
                                                break
                                        case 'S':
                                                if (gorizont < centGor && pryamo) {
                                                        going.click()
                                                } else if (vertical >= centVer && pravo) {
                                                        right.click()
                                                } else if (vertical <= centVer && levo) {
                                                        left.click()
                                                } else if (pryamo) {
                                                        going.click()
                                                } else {
                                                        right.click()
                                                }
                                                break
                                        default:
                                                break
                                }
                                trigger1++
                        } else {
                                mainWin.getElementById('refresh').click()
                                trigger1=0
                        }
                        update()
                }
        };
        let mainChatInfo=()=>{
                let mainChatWindow = document.getElementsByName('chatWindow')[0].contentDocument,
                    messageBlock = mainChatWindow.getElementById('content_rus'),
                    messageArray = messageBlock.querySelectorAll('.postmessage');
                for (let i = 0; i < messageArray.length; i++) {
                        var text = messageArray[i].innerText;
                        var arrayText = text.split(' ')
                        if (arrayText[4] === 'Разработка') {
                                //когда готов бур
                                let sectorBur = arrayText[8];
                                if (astReady.indexOf(sectorBur) < 0){
                                        astReady.push(sectorBur)
                                }
                        } else if (arrayText[10]==='завершена.'){
                                // бур снят
                                let sectorBur = arrayText[9];
                                if (astReady.indexOf(sectorBur) >= 0)
                                        astReady.splice(astReady.indexOf(sectorBur),1)

                        }
                }

        };
        setInterval(mainChatInfo,15468);
        let object =(aster)=>{
                let mainWin = document.getElementsByName('mainWindow')[0].contentDocument;
                let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
                let navBtn = panelMenu.querySelector('.right img:last-child');
                let front = mainWin.getElementById('obj_front');
                let numSector = mainWin.getElementById('sector').innerText;
                let pRnd = Math.floor(Math.random()*500)
                let sectorFrontToggle;
                let sectorFront= '';
                let napr = '';
                for (let l =0; l<= numSector.length - 1; l++) {
                        if(l<5){sectorFront += numSector[l]}
                        napr=numSector[5]
                }
                sectorFrontToggle = Number(sectorFront)
                if (napr==='E'){sectorFrontToggle+=1} else if (napr==='W'){sectorFrontToggle -= 1
                } else if (napr==='S'){sectorFrontToggle+=1000} else if (napr==='N'){sectorFrontToggle-=1000}
                sectorFront = String(sectorFrontToggle)

                switch (front.querySelector('img').src) {
                        case 'http://img.starcombats.com/map/obj/ost1.gif':
                        case 'http://img.starcombats.com/map/obj/ost2.gif':
                        case 'http://img.starcombats.com/map/obj/ost3.gif':
                        case 'http://img.starcombats.com/map/obj/ost4.gif':
                        case 'http://img.starcombats.com/map/obj/ost5.gif':
                        case 'http://img.starcombats.com/map/obj/ost6.gif':
                                if (aster === sectorFront && !trigger) {
                                        front.querySelector('img').click()
                                        let imgAst = front.querySelector('img').src;
                                        setTimeout(()=>{
                                                 mainWin = document.getElementsByName('mainWindow')[0].contentDocument;
                                                const activBtn = mainWin.getElementById('item2');
                                                activBtn.click()
                                                setTimeout(()=>{
                                                        if (message.indexOf(sectorFront) === -1 && !trigger){
                                                                message.push(sectorFront)
                                                                trigger2++
                                                        }
                                                },1000+pRnd)
                                        },1000+pRnd)
                                } else {
                                        front.querySelector('img').click()
                                        setTimeout(()=>{
                                                mainWin = document.getElementsByName('mainWindow')[0].contentDocument;
                                                mainWin.getElementById('item1').click()
                                        },1462)
                                }
                                break
                        case 'http://img.starcombats.com/map/obj/ost1_drill.gif':
                        case 'http://img.starcombats.com/map/obj/ost2_drill.gif':
                        case 'http://img.starcombats.com/map/obj/ost3_drill.gif':
                        case 'http://img.starcombats.com/map/obj/ost4_drill.gif':
                        case 'http://img.starcombats.com/map/obj/ost5_drill.gif':
                        case 'http://img.starcombats.com/map/obj/ost6_drill.gif':
                                if (aster === sectorFront && trigger) {
                                        front.querySelector('img').click()
                                        setTimeout(()=>{
                                                mainWin = document.getElementsByName('mainWindow')[0].contentDocument;
                                                mainWin.getElementById('item2').click()
                                                if (message.indexOf(sectorFront) !== -1){
                                                        message.splice(message.indexOf(sectorFront),1)
                                                }
                                                if (astReady.indexOf(sectorFront) !== -1){
                                                        astReady.splice(astReady.indexOf(sectorFront),1)
                                                }
                                        },1000+pRnd)
                                } else if (aster === sectorFront && !trigger) { trigger2++ } else {
                                        front.querySelector('img').click()
                                        setTimeout(()=>{
                                                mainWin = document.getElementsByName('mainWindow')[0].contentDocument;
                                                mainWin.getElementById('item1').click()
                                        },1000+pRnd)

                                }
                                break
                        case 'http://img.starcombats.com/map/obj/space_craft1_broken.gif':
                        case 'http://img.starcombats.com/map/obj/ast_astron.gif':
                                front.querySelector('img').click()
                                setTimeout(()=>{
                                        mainWin.getElementById('item1').click()
                                        setTimeout(()=>{
                                                navBtn.click()},735)
                                },1000+pRnd)
                                break
                        case 'http://img.starcombats.com/map/obj/taksyak_3.gif':
                                let left = mainWin.getElementById('left');
                                left.click();
                        default:
                                let going = mainWin.getElementById('fwd');
                                going.click();
                                break
                }
                setTimeout(update,pRnd);
        };
        let combat =()=>{
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
                var obnovRn = Math.floor(Math.random()*500)+1000;
                var limitoj = 0;
                var boyInterval = setInterval(()=>{
                        triggerB=0
                        let main_win = document.getElementsByName('mainWindow')[0].contentDocument;
                        let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
                        let scripts = main_win.getElementsByTagName('script').length
                        if (scripts<9){
                                var script = document.createElement("script");
                                script.setAttribute("type", "text/javascript");
                                script.innerHTML = use_thing + '; ' + use_scroll + '; ' + use_ability + ';';
                                main_win.getElementsByTagName('body')[0].appendChild(script);}

                        let activPer = main_win.getElementById('reboot');
                        let messageOkno = main_win.getElementById('infoWindow');
                        let chat_top_win = document.getElementsByName('chatmenuWindow')[0].contentDocument;
                        let chatBtnday = chat_top_win.getElementById('tabNameChat')

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
                                                clearInterval(boyInterval)
                                                setTimeout(update,obnovRn+1000)
                                                break
                                        case "Вы":
                                                panelMenu.querySelector('.right img:last-child').click()
                                                setTimeout(()=>{chatBtnday.click()}, obnovRn)
                                                break
                                        case "Ис":
                                                let autoboy = main_win.querySelector('#new_centerBlock_footer tr:nth-child(2) td:nth-child(2) img')
                                                autoboy.click()
                                                break
                                        case "Пе":
                                                main_win.querySelector('.infobtn').click()
                                                panelMenu.querySelector('.right img:last-child').click()
                                                break
                                        case "Ож":
                                                if(limitoj>=100){
                                                        main_win.querySelector('.infobtn').click()
                                                        //panelMenu.querySelector('.right img:last-child').click()
                                                        limitoj=0
                                                } else {
                                                        limitoj++
                                                }
                                                break
                                        default:
                                                break
                                }
                        } else if (activPer&&activPer.style.display==='block') {
                                let autoboy = main_win.querySelector('#new_centerBlock_footer tr:nth-child(2) td:nth-child(2) img')
                                autoboy.click()
                        } else {
                                setTimeout(()=>{
                                        let perezagruzMod = main_win.querySelector('#reactor');
                                        perezagruzMod.click()
                                        setTimeout(()=>{
                                                if(messageOkno.style.visibility!=="visible"){
                                                        main_win.querySelector('#new_centerBlock_footer img:first-child').click()}},500)
                                },obnovRn)
                        }
                        let fightBool = mainWin.getElementById('new_centerBlock')
                        if (!fightBool){
                                panelMenu.querySelector('.right img:last-child').click()
                                clearInterval(boyInterval)
                                setTimeout(update,obnovRn+1241)
                        }
                },obnovRn)
        };
        let update =()=>{
                let mainWin = document.getElementsByName('mainWindow')[0].contentDocument;
                let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
                let front, sectorBool, fightBool;
                let procRnd = Math.floor(Math.random()*1000)
                if (asterSectors.length===0){
                        let barChat = document.getElementsByName('chatbarWindow')[0].contentDocument;
                        let chatMessage = barChat.getElementById('chatmessage').value;
                        let codeChat = chatMessage.split(/[^0-9]/)
                        if (codeChat.length<=2){
                                typeChange = Number(codeChat[0]);
                                asterSectors = asters[typeChange-1];
                                maxAsters = Number(codeChat[1]);
                        } else {
                                for (let c=0;c<codeChat.length;c++){
                                        asterSectors.push(codeChat[c])
                                }
                        }
                }
                setTimeout(()=>{
                        let processing = setInterval(() => {
                                fightBool = mainWin.getElementById('new_centerBlock')
                                if (message.length === asterSectors.length || message.length === maxAsters){
                                        trigger = astReady.length !== 0;
                                        if (!trigger){propusk=0}
                                }
                                if (mainWin.querySelectorAll('script').length<9){
                                        var script = document.createElement("script");
                                        script.setAttribute("type", "text/javascript");
                                        script.innerHTML = use_action;
                                        mainWin.getElementsByTagName('body')[0].appendChild(script);
                                }
                                front = mainWin.getElementById('img_obj_front');
                                sectorBool = mainWin.getElementById('sector');
                                if (Boolean(sectorBool)) {
                                        if (propusk <= 3) {
                                                if (sectorBool.textContent === dubleSector) {
                                                        propusk++
                                                } else if (sectorBool.textContent !== dubleSector){
                                                        propusk=0
                                                }
                                                if (trigger){
                                                        console.log(trigger)
                                                        if (astReady.length>0){
                                                        clearInterval(processing)
                                                        goingAster(astReady[0])
                                                        } else if (message.length === 0){
                                                                console.log('ожид')
                                                                clearInterval(processing)
                                                                let timeout = setTimeout(()=>{
                                                                        chat_clean();
                                                                        message = [];
                                                                        astReady = [];
                                                                        trigger2=0;
                                                                        trigger=false;
                                                                        clearTimeout(timeout);
                                                                        update();
                                                                }, timeOver*61000)
                                                        }
                                                } else if (message.length < asterSectors.length && typeChange===0|| message.length < maxAsters){
                                                        if (asterSectors[trigger2]){
                                                                console.log(trigger2)
                                                                clearInterval(processing)
                                                                goingAster(asterSectors[trigger2])
                                                        }
                                                }
                                        } else {
                                                panelMenu.querySelector('.right img:last-child').click()
                                                propusk = 0;
                                        }
                                        dubleSector = sectorBool.textContent;
                                } else if (Boolean(fightBool)) {
                                        clearInterval(processing)
                                        combat()
                                } else {
                                        panelMenu.querySelector('.right img:last-child').click()
                                        propusk = 0;
                                }
                        }, 4000 + procRnd)
                },procRnd)
        }
        /**let timeline = setInterval(()=>{
                let mintim = new Date().getMinutes()
                if (mintim>=32){clearInterval(timeline)
                        update()}
        },60000)*/
        setTimeout(update,timeSectors)
}
