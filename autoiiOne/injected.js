var last_reload = Date.now();
var timer_last_reload = false;

function put_complect(id, new_name) {

    var req = new Subsys_JsHttpRequest_Js();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            error = req.responseJS.error;
            if (error) show_error(error);
            else {
                document.getElementById('speed').innerHTML = req.responseJS.info.speed;
                document.getElementById('capacity').innerHTML = req.responseJS.info.capacity;
                if (document.getElementById('tactics'))
                    document.getElementById('tactics').innerHTML = req.responseJS.info.tactics;
                if (document.getElementById('intelligence'))
                    document.getElementById('intelligence').innerHTML = req.responseJS.info.intelligence;

                show_result('Комплект "' + new_name + '" был успешно установлен.');
            }
        }
    };

    req.open('POST', 'http://foggystation.starcombats.com/ajax/hold/hold_iskin_put_complect.php', true);
    req.send({id: id, ix: Math.random()});

}

function use_complect() {
    var req = new Subsys_JsHttpRequest_Js();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            show_complect = true;
            text = '';
            count = req.responseJS.count;
            if (count == 0) text += '';
            else {
                complect = req.responseJS.complect;
                var new_counter = 0;
                for (i = 0; new_counter < 5, i < complect.length; i++) {
                    if (complect[i] != null) {
                        if (complect[i].name[0] == '_') {
                            text += complect_tpl(complect[i].complect_id, complect[i].name);
                            new_counter++;
                        }
                    }
                }
            }
            document.getElementById('new_complects').innerHTML = text;
        }
    };

    req.open('POST', 'http://foggystation.starcombats.com/ajax/hold/hold_iskin_complects.php', true);
    req.send({ix: Math.random()});
}


function use_ability(position, data) {
    if (true) {
        if (abils[position]) {
            a = abils[position];
            if (a['has_ability'] == 0) {
                show_error('Вы еще не построили эту абилу!');
            } else if (parseInt(a['used']) >= parseInt(a['count'])) {
                show_error('Вы уже израсходовали количество использований, дождитесь перезарядки!');
            } else {
                if (data == '' && abils[position]['js_script'] != '') {
                    eval(abils[position]['js_script'] + '(' + position + ');');
                    return false;
                }
                var req = new Subsys_JsHttpRequest_Js()
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        error = req.responseJS.error;
                        if (error.error) {
                            show_error(error.text);
                        } else {
                            if (error.text) {
                                show_result(error.text);
                            } else if (error.eval) {
                                eval(error.eval);
                            }
                            abils[position].used++;
                            setEnergyInfo();
                        }
                        if (req.responseJS.eval) {
                            eval(req.responseJS.eval);
                        }
                    }
                }
                req.open('GET', 'http://foggystation.starcombats.com/ajax/bridge_use.php', true);
                req.send({ability_id: a['ability_id'], data: data, ix: Math.random()});
            }
        }
    }

}
function use_scroll(id) {
    if (true) {
        if (parseInt(_scrollsInfo[id].life_max) > 0) {
            var req = new Subsys_JsHttpRequest_Js();
            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.responseJS.error) {
                        if (req.responseJS.error.text) {
                            show_result(req.responseJS.error.text);
                        } else {
                            show_error(req.responseJS.error);
                        }
                    } else {
                        if (req.responseJS.text) {
                            show_result(req.responseJS.text);
                        }
                        load_scroll_info(id);
                    }
                }
            };
            req.open('POST', 'http://foggystation.starcombats.com/ajax/hold/hold_scroll_container.php', true);
            req.send({id: _scrollsInfo[id].current_id, ix: Math.random()});
        } else {
            show_error('Нет доступных использований программы!');
        }
    }
}

function injected_main(){
    let ispolzAbil50 = 120,
     ispolzAbil100 = 60,
     ispolzAbil200 = 40,
     abilkaGos = 0,
     abilkaEkr = 0,
     stoperInd = true,
     provPL = false,
     plaginOff = true,
        kakimStavit = 2,
        minZapuska = 19,
        main = document.getElementsByName('mainWindow')[0].contentDocument,
        timeRnd=0;

    
    let dannye=()=>{
        let timeRnd = Math.floor(Math.random()*500)+3000
        let obnovData = setInterval(()=>{
            let mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
            let enkaIsk = mainOkno.getElementById('Venergy').getAttribute('width')
            let enIsk = Number(enkaIsk)
            if (mainOkno.getElementById('reload')){
                    mainOkno.getElementById('reload').click()
                    mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
                    let kol = mainOkno.getElementById('total_req').textContent
                    kol=Number(kol)
                    let podatKnop = mainOkno.getElementById('start_but')
                    let podatString = podatKnop.textContent
                    if (kakimStavit <= kol && 'Подать заявку' === podatString && 200 < enIsk){
                        //clearInterval(obnovData)
                        setTimeout(()=>{
                        mainOkno.getElementById('start_but').click()},1000)
                    } else if('Подать заявку' === podatString && 200 > enIsk) {
                        clearInterval(obnovData)
                        plag()
                    }
        }
        },timeRnd)}
    let plag =()=>{

        if(!plaginOff){ provPlags() } else { hilkaEn() }
        timeRnd = Math.floor(Math.random()*500)
        main = document.getElementsByName('mainWindow')[0].contentDocument;
    }
    let  provPlags =()=> {
               let main = document.getElementsByName('mainWindow')[0].contentDocument;
                       var plaginy = main.querySelectorAll('.viod img')
                       for (var pl = 0; pl < plaginy.length; pl++) {
                          if (plaginy[pl].src !== 'http://img.starcombats.com/programs/void.gif') {
                               provPL = true;
                          } else {
                             //top.location.href="/exit.php?1";
                               komplectIskin()
                               provPL = false;
                              return
                          }
                       }
               
                   if(provPL){hilkaEn}
           }
    let komplectIskin=()=>{
           if (main.getElementById('iskin_level') && !plaginOff) {
             urovIsk = main.getElementById('iskin_level').textContent}
                main.getElementById('new_complects').querySelector('li:nth-child(4)').click()
                setTimeout(()=>{provPlags()},timeRnd)
    }
        
    let hilkaEn =()=>{
        main = document.getElementsByName('mainWindow')[0].contentDocument;
        if (plaginOff&&0<ispolzAbil50){
             main.getElementById('img16').click()
            ispolzAbil50--
            } else if(0<ispolzAbil100){
                    main.getElementById('img17').click()
                    ispolzAbil100--
                } else if(ispolzAbil200>0){
                        main.getElementById('img18').click()
                        ispolzAbil200--
                    }else if(abilkaGos>0){
                            main.getElementById('scroll_365').click()
                            abilkaGos--
                        }else if(abilkaEkr>0){
                                main.getElementById('scroll_586').click()
                                abilkaEkr--
                            } else {
                                stoperInd=false;
                            }
                            if (stoperInd) {
                            setTimeout(()=>{main.getElementById('reload').click()},1000)
                            setTimeout(dannye,2000+timeRnd)
                            }
        }
    let kontZamena=()=>{
        let mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
          if (mainOkno.getElementById('iskinButtonII')){ mainOkno.getElementById('iskinButtonII').click()
            let scripts = mainOkno.getElementsByTagName('script').length
        if (scripts<10){
                var script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.innerHTML = use_ability + '; ' + use_complect + '; ' + put_complect + ';' + use_scroll + ';';
                mainOkno.getElementsByTagName('body')[0].appendChild(script);
            }

            setTimeout(()=>{
                mainOkno.getElementById('iskinButtonLvls').click()
                let kol = mainOkno.getElementById('total_req').textContent
                   if (kakimStavit===kol) {
                       proverka()
                   } else {
                       dannye()
                   }
        },1000)} else {dannye()}
     }
    let zapusc = setInterval(()=>{
        var tekMin = new Date().getMinutes()
         if(Number(tekMin)===minZapuska){
            clearInterval(zapusc)
            kontZamena()}
     },2000)
}
   // onclick="let kol=0;setInterval(()=>{if(100>kol){document.getElementById('but1').click(); kol++}else{clearInterval()}},1000)" сборки имплов или кристаллов в конверторе
//&& iskDup[1]!==urovIs && iskDup[2]!==urovIs && iskDup[0]!==urovIs

/* scupca:
    setInterval(()=>{
        let timer = new Date().getMinutes()
        document.querySelector('.btn_refresh').click()
        switch (Number(timer)) {
            case 0:
            case 20:
            case 40:
                if(document.querySelector('#they_sell a')){
                    document.querySelector('#they_sell a').click()
                    setTimeout(()=>{
                        document.querySelector('#dbox_yesno .btn_yes').click()
                    },1043)
                }
             break
        }
    },60000)
*/