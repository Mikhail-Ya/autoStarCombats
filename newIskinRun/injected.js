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
// "editor.unicodeHighlight.ambiguousCharacters": false 660 - 270 =  
function injected_main(){
    let abils50 = 80,
    abils100 = 50,
    abils200 = 60,
    gos = 0,
    euro = 0,
    stavim = 0,// каким ставим
    nonAbils = true,// ждать пока энка восстановится
    complect = false,
    downup = true,// ставить от stavim
    proba = 1,
    trigger = false,
    started = 56,
    main;
    const obnovScript = () => {
        main = document.getElementsByName('mainWindow')[0].contentDocument
        let scripts = main.getElementsByTagName('script').length    
        // main.insertAdjacentHTML('beforebegin','работает')
        // document.querySelector('div').insertAdjacentHTML('beforebegin','<p>privet</p>')
        if (scripts<10){
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.innerHTML = use_ability + '; ' + use_complect + '; ' + put_complect + ';' + use_scroll + ';';
            main.getElementsByTagName('body')[0].appendChild(script);
        }
        setTimeout(()=>{
            resetMain()
        },2500)
    }

    const iskEnerg = () => {
        return new Promise((resolve)=>{
            main = document.getElementsByName('mainWindow')[0].contentDocument
            main.getElementById('reload').click()
            setTimeout(()=>{
                main = document.getElementsByName('mainWindow')[0].contentDocument;
                let enkaIsk = Number(main.getElementById('Venergy').getAttribute('width'))
                if(enkaIsk > 200){ resolve(true) } else { resolve(false) }
            },1220)})
    }
    
    const iskRun =()=>{
        return new Promise((resolve)=>{
            main = document.getElementsByName('mainWindow')[0].contentDocument;
            let kol = main.getElementById('total_req').textContent
                kol=Number(kol)
            let podatKnop = main.getElementById('start_but')
            let podatString = podatKnop.textContent
            if(kol >= stavim && downup || !downup && kol === stavim || trigger && kol <= proba){
                if(podatString === 'Подать заявку') {
                    if(complect){
                        main.getElementById('new_complects').querySelector('li:nth-child(4)').click();
                        setTimeout(()=>{
                            resolve(true)}, 1522)
                    } else {
                        setTimeout(()=>{
                             main.getElementById('reload').click()
                             main = document.getElementsByName('mainWindow')[0].contentDocument
                            resolve(true)
                        },1245)
                    }
                } else {
                    resolve(false)
                }
            } else {
                resolve(false)
            }
        })
    }

    const energHil = () =>{
        return new Promise((resolve)=>{
            main = document.getElementsByName('mainWindow')[0].contentDocument;
            setTimeout(()=>{
                    if (0 < abils50){
                        main.getElementById('img16').click()
                        abils50--
                    } else if (0 < abils100){
                        main.getElementById('img17').click()
                        abils100--
                    }else if (0 < abils200){
                        main.getElementById('img18').click()
                        abils200--
                    }else if(gos > 0){
                        main.getElementById('scroll_365').click()
                        gos--
                    } else if(euro > 0){
                        main.getElementById('scroll_586').click()
                        euro--
                    } else if(nonAbils){
                    }
                       setTimeout(resolve,500)
                    
            },1654)
        })
    }

    async function resetMain() {
        main = document.getElementsByName('mainWindow')[0].contentDocument;
        if(main.getElementById('reload')){
            await main.getElementById('reload').click()
            let result = await iskRun()
            if(result){
               let energ = await iskEnerg()
               if(energ){
                let kol = main.getElementById('total_req').textContent
                kol=Number(kol)
                if(kol >= stavim && downup || !downup && kol === stavim || trigger && kol <= proba){
                    let podatKnop = main.getElementById('start_but')
                    let podatString = podatKnop.textContent
                    if(podatString === 'Подать заявку') {
                    await main.getElementById('start_but').click()
                    }
                }
                    obnovScript()
               } else {
                    await energHil()
                    resetMain()
               }
            } else {
                obnovScript()
            }
        } else {
            obnovScript()
        }
    }
    let zapusc = setInterval(()=>{
        var tekMin = new Date().getMinutes()
         if(Number(tekMin)===started){
            clearInterval(zapusc)
            obnovScript()
            }
     },2000)
}