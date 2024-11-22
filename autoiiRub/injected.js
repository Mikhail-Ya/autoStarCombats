var last_reload = Date.now();
var timer_last_reload = false;

function request_op()
{
    var req = new Subsys_JsHttpRequest_Js()
    req.onreadystatechange = function()
    {
        if(req.readyState == 4)
        {
            if(req.responseJS.error)
            {
                error = req.responseJS.error;
                if(error.error)
                {
                    show_error(error.text);
                }
                else
                {
                    show_result(error.text);
                    if(req.responseJS.del_request)
                    {
                        top.chatbarWindow.deactive_ai();
                    }
                    else
                    {
                        top.chatbarWindow.active_ai();
                    }
                    reload();
                }
            }
        }
    }
    req.open('GET', 'http://foggystation.starcombats.com/ajax/hackrequest_new.php', true);
    req.send({ix: Math.random()});
}

function reload()
{
    if (Date.now() - last_reload < 1500) {
        timer_last_reload = setTimeout(reload, 300);
        return false;
    } else {
        last_reload = Date.now();
        clearTimeout(timer_last_reload);
    }
    var req = new Subsys_JsHttpRequest_Js()
    req.onreadystatechange = function()
    {
        if(req.readyState == 4)
        {
            load_lvls();
            vinfo = req.responseJS.vinfo;
            if(vinfo.level != document.getElementById("iskin_level").innerHTML)
            {
                top.mainWindow.document.location.href = '/locations/hackrequests_new.php';
            }
            else
            {
                VreloadParameters(parseInt(vinfo.energy_max),parseInt(vinfo.energy_current),parseInt(vinfo.energy_regenerationspeed)/100);
                if(req.responseJS.has_request)
                {
                    document.getElementById("start_but").innerHTML = 'Отозвать заявку';
                }
                else
                {
                    document.getElementById("start_but").innerHTML = 'Подать заявку';
                }
                if (old_victories < 10 && req.responseJS.victories >= 10)
                {
                    top.mainWindow.document.location.href = '/locations/hackrequests_new.php';
                } else {
                    document.getElementById("total_req").innerHTML = req.responseJS.total_req;
                    document.getElementById("viods").innerHTML = req.responseJS.things;
                    document.getElementById("victories").innerHTML = req.responseJS.victories;
                    document.getElementById("experience_change").innerHTML = req.responseJS.experience;
                    document.getElementById("loses").innerHTML = req.responseJS.loses;
                    if (req.responseJS.feature_level > 0) {
                        document.getElementById("feature").innerHTML = _features[req.responseJS.feature];
                        document.getElementById("experience_features_current").innerHTML = req.responseJS.feature_experience;
                        document.getElementById("experience_features_need").innerHTML = "(" + _nextLvl[req.responseJS.feature_level] + ")";
                        document.getElementById("feature_level").innerHTML = "(" + req.responseJS.feature_level + ")";
                    }
                }
            }
        }
    }
    req.open('GET', 'http://foggystation.starcombats.com/ajax/hackrequest_reload.php', true);
    req.send({ix: Math.random()});
}

var _features = {
    1: 'Перехватчик',
    2: 'Корвет',
    3: 'Эсминец',
    4: 'Крейсер',
    5: 'Техномаг',
    6: 'Старатель',
    7: 'Пират',
    8: 'механик',
    9: 'крафтер'
};
var _nextLvl = {
    0: 100,
    1: 300,
    2: 700,
    3: 1500,
    4: 3000,
    5: 6000,
    6: 10000,
    7: 20000,
    8: 50000,
    9: 80000,
}

var _virus_info = {}

var _energyInfo = {}

function drop_all() {
    if (true) {
        var req = new Subsys_JsHttpRequest_Js();
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                error = req.responseJS.error;
                if (error) show_error(error);
                else {
                    reload();
                    document.getElementById('speed').innerHTML = req.responseJS.info.speed;
                    document.getElementById('capacity').innerHTML = req.responseJS.info.capacity;
                    if (document.getElementById('tactics'))
                        document.getElementById('tactics').innerHTML = req.responseJS.info.tactics;
                    if (document.getElementById('intelligence'))
                        document.getElementById('intelligence').innerHTML = req.responseJS.info.intelligence;

                    show_result('Все программы были успешно сняты.');
                }
            }
        };

        req.open('POST', 'http://foggystation.starcombats.com/ajax/hold/hold_iskin_drop_all.php', true);
        req.send({ix: Math.random()});
    }
}

function put_complect(id, new_name) {

    var req = new Subsys_JsHttpRequest_Js();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            error = req.responseJS.error;
            if (error) show_error(error);
            else {
                reload();
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

function complect_tpl(id, name) {
    return '<li id="complect_' + id + '" onclick="put_complect(' + id + ', \'' + name + '\'); return false;" title="' + name + '">' + name[1] + '</li>';
}

function virus_tpl(param) {
    var put_function = 'put_virus(' + param.stored_virus_id + ', \'' + param.name + ' (' + param.level + ')\');';

    var temp = '';

    if (parseInt(param.capacity) + parseInt(param.speed) + parseInt(param.tactics) + parseInt(param.intelligence) < parseInt(param.totalsum)) {
        temp = '<br /><b style="color: darkred;">Есть нераспределённые характеристики!</b><br />';
    }

    _virus_info[param.stored_virus_id] = '<h3>ИскИн ' + param.name + ' (' + param.level + ')</h3>' +
        'Емкость: ' + param.capacity + '<br />' +
        'Скорость: ' + param.speed + '<br />' +
        (param.level > 3 ? 'Тактика: ' + param.tactics + '<br />' : '') +
        (param.level > 4 ? 'Интеллект: ' + param.intelligence + '<br />' : '') +
        temp +
        '<br /><b>Опыт ИскИна</b>:<br /> ' + param.experience + ' (' + _nextLvl[param.level] + ')<br /><br />' +
        (param.feature == 0 ? '<b>Побед</b>: ' + param.victories + '<br /><br />' : '') +
        // (param.feature == 0 ? 'Поражений: ' + param.loses + '<br /><br />' : '') +
        (param.feature > 0 ? '<b>Специализация</b>:<br /> ' + _features[param.feature] + ' (' + param.feature_level + ')<br />' : '') +
        (param.feature > 0 ? 'Опыт: ' + param.feature_experience + ' (' + _nextLvl[param.feature_level] + ')<br /><br />' : '') +
        '<b>Ядра</b>: x' + param.core;

    return '<li class="iskin__tpl" id="item' + param.stored_virus_id + '" onclick="setShowHide();' + put_function + '" style="cursor: pointer;" onmouseover="setDescription(' + param.stored_virus_id + ');setShowVisible();" onmouseout="setShowHide();">' +
        '<img src="http://img.starcombats.com/avatars/2/' + param.avatar + 'sm.gif" alt="' + param.name + '" />' +
        '<span class="iskin__all-lvl">' + param.level + '</span>' +
        '</li>';
}

function setDescription(id) {
    if (showElement) {
        showElement.innerHTML = _virus_info[id];
    }
}

function setShowVisible() {
    document.getElementById('show').style.visibility = 'visible';
}

function setShowHide() {
    document.getElementById('show').style.visibility = 'hidden';
}

function setShowMove(evt) {
    document.getElementById('show').style.bottom = window.innerHeight - evt.clientY + 20 + 'px';
    if (evt.clientX < window.innerWidth - 300) {
        document.getElementById('show').style.left = evt.clientX - 160 + 'px';
    } else {
        document.getElementById('show').style.left = window.innerWidth - 300 + 'px';
    }
}

function put_virus(id, name) {
    var req = new Subsys_JsHttpRequest_Js();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            error = req.responseJS.error;
            if (error) show_error(error);
            else {
                document.location.reload();
            }
        }
    };
    req.open('POST', 'http://foggystation.starcombats.com/ajax/hold/hold_put_virus.php', true);
    req.send({id: id, ix: Math.random()});
}

function load_viruses() {
    var req = new Subsys_JsHttpRequest_Js();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.responseJS.error != null && req.responseJS.error) {
                show_error('Ошибка загрузки!');
            } else {
                var count = req.responseJS.count;
                var items = req.responseJS.items;
                var text = '<ul id="iskinAllList1" class="iskin__all-list active">';
                var is_separator = false;

                if (count > 6) {
                    document.getElementById('iskinAllList').classList.add('big');
                    is_separator = true;
                }
                for (var i = 0; i < count; i++) {
                    if (is_separator && i === 5) {
                        text += '</ul><ul id="iskinAllList2" class="iskin__all-list">';
                    }
                    text += virus_tpl(items[i], 'inner_items');
                }
                text += '</ul>';
                document.getElementById("iskinAllList").innerHTML = text;
            }
        }
    };

    req.open('POST', 'http://foggystation.starcombats.com/ajax/hold/hold_load_viruses.php', true);
    req.send({ix: Math.random()});
}

function init() {
    setShowHide();
    // Выводятся сервером
    // use_complect();
    setEnergyInfo();
    init_all_scrolls_info();
    showElement = document.getElementById('showtd');
    window.addEventListener('mousemove', setShowMove);
}

function iskinNewSliderNext() {
    if (document.getElementById('iskinAllList1').classList.contains('active')) {
        document.getElementById('iskinAllList1').classList.remove('active');
        document.getElementById('iskinAllList2').classList.add('active');
    } else {
        document.getElementById('iskinAllList1').classList.add('active');
        document.getElementById('iskinAllList2').classList.remove('active');
    }

}

function energyNewSliderNext() {
    if (document.getElementById('energyAllList1').classList.contains('active')) {
        document.getElementById('energyAllList1').classList.remove('active');
        document.getElementById('energyAllList2').classList.add('active');
    } else {
        document.getElementById('energyAllList1').classList.add('active');
        document.getElementById('energyAllList2').classList.remove('active');
    }
}

function showEnergyInfo(id) {
    if (showElement) {
        showElement.innerHTML = _energyInfo[id];
    }
}

function resetButtons() {
    document.getElementById('iskinButtonEnergy').classList.remove('active');
    document.getElementById('iskinIIList').classList.remove('active');
    document.getElementById('iskinButtonII').classList.remove('active');
    document.getElementById('iskinEnergy').classList.remove('active');
    document.getElementById('iskinButtonLvls').classList.remove('active');
    document.getElementById('iskinLvls').classList.remove('active');
}

function setActiveButton(button) {
    if ('energy' == button) {
        document.getElementById('iskinButtonEnergy').classList.add('active');
        document.getElementById('iskinEnergy').classList.add('active');
    }
    if ('lvls' == button) {
        load_lvls();

        document.getElementById('iskinButtonLvls').classList.add('active');
        document.getElementById('iskinLvls').classList.add('active');
    }
    if ('ii' == button) {
        document.getElementById('iskinButtonII').classList.add('active');
        document.getElementById('iskinIIList').classList.add('active');

        if (!flag_ii) {
            load_viruses();
            flag_ii = true;
        }
    }
}


function setClanAbilityIskinInfo() {
    var ability = clan_ability_iskin;
    _energyInfo[60] = '<h3>Клан: ' + ability.description + '</h3>' +
        'Полностью восстанавливает энергию Искина' +
        '<br /><br />' +
        'Использований: ' + (parseInt(ability.used) < parseInt(ability.amount) ? '<b style="color: green;">' : '<b style="color: darkred;">') + ability.used + '/' + ability.amount + '</b>' +
        '<br />' +
        'Цена: <b>' + ability.money + ' кр.</b>' +
        (ability.useafter.length > 0 ? '<br /><br /><b style="color: darkred;">Недоступно ещё ' + ability.useafter + '</b>' : '');
}

function load_clan_ability_reload() {
    var req = new Subsys_JsHttpRequest_Js();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.responseJS.error != null && req.responseJS.error) {
                show_error('Ошибка загрузки!');
            } else {
                var temp_data = req.responseJS.data;

                clan_ability_iskin.amount = temp_data.amount;
                clan_ability_iskin.used = temp_data.used;
                clan_ability_iskin.useafter = temp_data.useafter;

                setClanAbilityIskinInfo();
            }
        }
    };
    req.open('GET', 'http://foggystation.starcombats.com/ajax/new_clan_energy_ii_reload.php', true);
    req.send({ix: Math.random()});
}

function setEnergyInfo() {
    for (abil in abils) {
        abil = abils[abil];
        _energyInfo[parseInt(abil.ability_id) + 3] = '<h3>' + abil.name + '</h3>' +
            abil.description + '<br /><br />';

        if (abil.has_ability == '1') {
            _energyInfo[parseInt(abil.ability_id) + 3] +=
                'Уровень: <b>' + abil.level + '</b><br />' +
                'Использований: ' + (parseInt(abil.used) < parseInt(abil.level) + 1 ? '<b style="color: green;">' : '<b style="color: darkred;">') + abil.used + '/' + (parseInt(abil.level) + 1) + '</b><br />' +
                '<br /><b>Перезарядка через ' + abil.wait_time + ' ч.' + '</b><br />';
        } else {
            _energyInfo[parseInt(abil.ability_id) + 3] += '<b style="color: darkred;">Абила не построена!</b>';
        }
    }

    if (clan_ability_iskin) {
        setClanAbilityIskinInfo();
    }
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
        reload();
    }
}

function load_lvls() {
    var req = new Subsys_JsHttpRequest_Js();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.responseJS.error != null && req.responseJS.error) {
                show_error('Ошибка загрузки!');
            } else {
                document.getElementById("iskinLvls").innerHTML = '';
                var lvls_data = req.responseJS.lvls;
                var text = "";
                var lvl_counter = 0;

                for (lvl in lvls_data) {
                    text += lvls_tpl(lvls_data[lvl], lvl);
                }
                document.getElementById("iskinLvls").innerHTML = text;
            }
        }
    };
    req.open('POST', 'http://foggystation.starcombats.com/ajax/hackrequest_lvls.php', true);
    req.send({ix: Math.random()});
}

function lvls_tpl(lvl_count, lvl) {
    return '<div class="iskin__lvls-item">' +
        '<span class="iskin__lvls-item-lvl">' + lvl + '</span>' +
        '<span class="iskin__lvls-item-dop">уровень</span>' +
        '<span class="iskin__lvls-item-count" title="Количество участников">' + parseInt(lvl_count) + '</span>' +
        '</div>';
}

function use_clan_ability() {
    if (true) {

        var req = new Subsys_JsHttpRequest_Js();
        // req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.responseJS.error) {
                    show_error(req.responseJS.error);
                } else {
                    if (req.responseJS.info) {
                        show_result(req.responseJS.info);
                        reload();
                        load_clan_ability_reload();
                    } else if (error.eval) {
                        eval(error.eval);
                    }
                }
                if (req.responseJS.eval) {
                    eval(req.responseJS.eval);
                }
            }
        }
        req.open('GET', 'http://foggystation.starcombats.com/ajax/new_clan_energy_ii.php', true);
        req.send({act: 'energy_iskin_all', ix: Math.random()});
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

function load_scroll_info(id) {
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
                _scrollsInfo[id] = req.responseJS.info;
                _scrollsInfo[id].current_id = req.responseJS.use;
                set_scroll_info(id);
            }
        }
    };
    req.open('POST', 'http://foggystation.starcombats.com/ajax/hackrequest_load_energy_info.php', true);
    req.send({id: id, ix: Math.random()});
}

function set_scroll_info(id) {
    if (_scrollsInfo[id]) {
        _energyInfo[id] = '<h3>' + _scrollsInfo[id].name + '</h3>' +
            _scrollsInfo[id].description +
            '<br /><br />' +
            '<b style="display: inline-block;margin-bottom: 5px">Использований</b>: ' + (parseInt(_scrollsInfo[id].life_max) > parseInt(_scrollsInfo[id].life_current) ? '<b style="color: green;">' : '<b style="color: darkred;">') + (isNaN(parseInt(_scrollsInfo[id].life_current)) ? '0' : parseInt(_scrollsInfo[id].life_max) - parseInt(_scrollsInfo[id].life_current)) + '</b><br />' +
            'Сгораемость: ' + (_scrollsInfo[id].collapse_min < _scrollsInfo[id].collapse_max ? _scrollsInfo[id].collapse_min + '-' + _scrollsInfo[id].collapse_max + '%' : '100%') + '<br /><br />' +
            '<b style="display: inline-block;margin-bottom: 5px">Требования:</b><br />' +
            '- ' + (parseInt(_userInfo.level) < parseInt(_scrollsInfo[id].need_level) ? '<span style="color: darkred;font-weight: bold;">Уровень: ' : '<span>Уровень: ') + _scrollsInfo[id].need_level + '</span><br />' +
            '- ' + (parseInt(_userInfo.energycapacity) < parseInt(_scrollsInfo[id].need_energycapacity) ? '<span style="color: darkred;font-weight: bold;">Энергоемкость: ' : '<span>Энергоемкость: ') + _scrollsInfo[id].need_energycapacity + '</span><br />' +
            '- ' + (parseInt(_userInfo.intelligence) < parseInt(_scrollsInfo[id].need_intelligence) ? '<span style="color: darkred;font-weight: bold;">Интеллект: ' : '<span>Интеллект: ') + _scrollsInfo[id].need_intelligence + '</span>';
        reload();
    }
}

function init_all_scrolls_info() {
    set_scroll_info(365);
    set_scroll_info(457);
    set_scroll_info(586);
}

function reload()
{
  if (Date.now() - last_reload < 1500) {
    timer_last_reload = setTimeout(reload, 300);
    return false;
  } else {
    last_reload = Date.now();
    clearTimeout(timer_last_reload);
  }
  var req = new Subsys_JsHttpRequest_Js()
  req.onreadystatechange = function()
  {
    if(req.readyState == 4)
    {
      load_lvls();
      vinfo = req.responseJS.vinfo;
      if(vinfo.level != document.getElementById("iskin_level").innerHTML)
      {
        top.mainWindow.document.location.href = '/locations/hackrequests_new.php';
      }
      else
      {
        VreloadParameters(parseInt(vinfo.energy_max),parseInt(vinfo.energy_current),parseInt(vinfo.energy_regenerationspeed)/100);
        if(req.responseJS.has_request)
        {
          document.getElementById("start_but").innerHTML = 'Отозвать заявку';
        }
        else
        {
          document.getElementById("start_but").innerHTML = 'Подать заявку';
        }
        if (old_victories < 10 && req.responseJS.victories >= 10)
        {
          top.mainWindow.document.location.href = '/locations/hackrequests_new.php';
        } else {
          document.getElementById("total_req").innerHTML = req.responseJS.total_req;
          document.getElementById("viods").innerHTML = req.responseJS.things;
          document.getElementById("victories").innerHTML = req.responseJS.victories;
          document.getElementById("experience_change").innerHTML = req.responseJS.experience;
          document.getElementById("loses").innerHTML = req.responseJS.loses;
          if (req.responseJS.feature_level > 0) {
            document.getElementById("feature").innerHTML = _features[req.responseJS.feature];
            document.getElementById("experience_features_current").innerHTML = req.responseJS.feature_experience;
            document.getElementById("experience_features_need").innerHTML = "(" + _nextLvl[req.responseJS.feature_level] + ")";
            document.getElementById("feature_level").innerHTML = "(" + req.responseJS.feature_level + ")";
          }
        }
      }
    }
  }
  req.open('GET', 'http://foggystation.starcombats.com/ajax/hackrequest_reload.php', true);
  req.send({ix: Math.random()});
}

init();
function injected_main(){
    let ispolzAbil50 = 50;
    let ispolzAbil100 = 220;
    let ispolzAbil200 = 100;
    let abilkaGos = 0;
    let abilkaEkr = 1000;
    let stoperInd = true;
    let zapiska = {'5':0,'6':0,'7':0,'8':0,'9':0}//список забегов искинов по порядку
	let povtorVrem = 24;
    let povtorVrem1 = 24;
    let last_minuty = 0;
    let isklyuchit = [14,17,18];// искинов какого уровня не ищем
    let iskDup = [9,7,8];// какие искины ставятся третьими
    let limit = 23;
    let iskinLimit = '13';
    let ustanovitAnti = true;

    let perezIskin = 5;

    let boy=()=>{

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
                triggerB=0
                let mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
                let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
                                let scripts = mainOkno.getElementsByTagName('script').length
                                if (scripts<8){
                                    var script = document.createElement("script");
                                    script.setAttribute("type", "text/javascript");
                                    script.innerHTML = use_thing + '; ' + use_scroll + '; ' + use_ability + ';';
                                    mainOkno.getElementsByTagName('head')[0].appendChild(script);
                                }
                let activPer = mainOkno.getElementById('reboot');
                let messageOkno = mainOkno.getElementById('infoWindow');
                let chat_top_win = document.getElementsByName('chatmenuWindow')[0].contentDocument;
                let chatBtnday = chat_top_win.getElementById('tabNameChat')
                let obnovRn = Math.floor(Math.random()*500)+1000;
                if(messageOkno&&messageOkno.style.visibility === "visible"){
                    let textInfoWin = mainOkno.getElementById('infoWindowMessage').textContent
                    let viborkaTexta = ""
                    for (let t=0;t<2;t++){
                        viborkaTexta = viborkaTexta + textInfoWin[t]
                    }
                    switch (viborkaTexta) {
                        case "Бо":
                            panelMenu.querySelector('.right img:last-child').click()
                            setTimeout(()=>{chatBtnday.click()}, obnovRn)
                            setTimeout(dannye,obnovRn)
                            break
                        case "Вы":
                            panelMenu.querySelector('.right img:last-child').click()
                            setTimeout(()=>{chatBtnday.click()}, obnovRn)
                            setTimeout(dannye,obnovRn)
                            break
                        case "Ис":
                            let autoboy = mainOkno.querySelector('#new_centerBlock_footer tr:nth-child(2) td:nth-child(2) img')
                            autoboy.click()
                            setTimeout(dannye,obnovRn)
                            break
                        case "Ож":
                            setTimeout(dannye,obnovRn)
                            break
                        case "Пе":
                            mainOkno.querySelector('.infobtn').click()
                            panelMenu.querySelector('.right img:last-child').click()
                            setTimeout(dannye,obnovRn)
                            break
                        default:
                            panelMenu.querySelector('.right img:last-child').click()
                            setTimeout(()=>{chatBtnday.click()}, obnovRn)
                            setTimeout(dannye,obnovRn)
                            break
                    }
                } else if (activPer.style.display==='block') {
                        let autoboy = mainOkno.querySelector('#new_centerBlock_footer tr:nth-child(2) td:nth-child(2) img')
                        autoboy.click()
                        setTimeout(dannye,obnovRn)
                } else { 
                       setTimeout(()=>{ let perezagruz = mainOkno.querySelector('#ability3 a');
                        let perezagruzMod = mainOkno.querySelector('#module_left');
                        if (perezagruz&&perezIskin>0) {
                        perezagruz.click()
                        perezIskin--
                        } else {
                            perezagruzMod.click()
                        }
                         setTimeout(()=>{
                         if(messageOkno.style.visibility!=="visible"){
                            mainOkno.querySelector('#new_centerBlock_footer img:first-child').click()}},500)
                       kontZamena()},obnovRn)
                }
        }
    let useAnti=()=>{
        console.log('anti')
        let mainOk = document.getElementsByName('mainWindow')[0].contentDocument;
        mainOk.getElementById('img15').click()
        setTimeout(()=>{
            mainOk = document.getElementsByName('mainWindow')[0].contentDocument;
            mainOk.querySelector('.da').click()
            let panelMenu = document.getElementsByName('menuWindow')[0].contentDocument;
            setTimeout(()=>{
                panelMenu.querySelector('.right img:last-child').click()
                setTimeout(kontZamena,4358)
            },1364)
        },2265)
    }
    let dannye=()=>{
        let vremya = Number(new Date().getHours())
        let minuty = Number(new Date().getMinutes())
        
        
	if (povtorVrem !== vremya){
		if (25 === vremya){
         	   ispolzAbil100 = 0;
      		  }
                if (7 === vremya){
                    ispolzAbil50 = 0;
                    }
                    if (10 === vremya){
                        ispolzAbil200 = 0;
                        }
		let chatOkno = document.getElementsByName('chatWindow')[0].contentDocument
                           let soobsheniya = chatOkno.getElementById('content_rus')
                           let data = ' '+ vremya +' часов, забеги по искинам: '+zapiska[5]+' - '+zapiska[6]+' - '+zapiska[7]+' - '+zapiska[8]+' - '+zapiska[9];
                          
                          var div = document.createElement("div");
                            div.setAttribute("class", "postmessage");
                            div.innerHTML = data;
                            soobsheniya.appendChild(div)
		povtorVrem = vremya;

	    }
        if (povtorVrem1 !== vremya&&last_minuty < minuty&&ustanovitAnti) {
            
         let mainOk = document.getElementsByName('mainWindow')[0].contentDocument;
            top.mainWindow.location.replace('/bridge.php');
            
            povtorVrem1 = vremya;
        }
        
        let timeRnd = Math.floor(Math.random()*1000)+1500
        let obnovDate = setInterval(()=>{
            
        let mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
        if (mainOkno.getElementById('reload')){mainOkno.getElementById('reload').click()
           perezIskin = 5;
           mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
            let urovIs = Number(mainOkno.getElementById('iskin_level').textContent)
        let kol = Number(mainOkno.getElementById('total_req').textContent)
            let podatKnop = mainOkno.getElementById('start_but')
            let podatString = podatKnop.textContent
            if('Подать заявку'!==podatString&&1===kol||'Подать заявку'!==podatString&&2===kol){
                podatKnop.click()
                clearInterval(obnovDate)
                kontZamena()
                return;
            }
            if (3===kol&&iskDup[1]===urovIs||3===kol&&iskDup[0]===urovIs||3===kol&&iskDup[2]===urovIs){

            }
            
        if (3===kol&&'Подать заявку'===podatString||iskDup[0]===urovIs&&2<=kol&&'Подать заявку'===podatString||iskDup[1]===urovIs&&2<=kol&&'Подать заявку'===podatString||iskDup[2]===urovIs&&2<=kol&&'Подать заявку'===podatString){
            mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
            let scripts = mainOkno.getElementsByTagName('script').length
            if (scripts>9){
                clearInterval(obnovDate)
                proverka()
            }else{
                clearInterval(obnovDate)
                kontZamena()}
        } else if('Отозвать заявку'===podatString){

        } else{
            let iskinUrovList = mainOkno.querySelectorAll('.iskin__lvls-item-lvl')
            let kolZayavka = mainOkno.querySelectorAll('.iskin__lvls-item-count')
            let iscinPerekl = mainOkno.querySelectorAll('.iskin__tpl')
            let posled;
            iskiny:for (var i = 0; i < iskinUrovList.length; i++) {
                var urovIsk = Number(iskinUrovList[i].textContent)
                var kolZa = Number(kolZayavka[i].textContent)
                for (var j = 0; j < iscinPerekl.length; j++) {
                    var juk = Number(iscinPerekl[j].textContent)
                    if (kolZa === 3 && juk === urovIsk && urovIsk !== isklyuchit[0]&& urovIsk !== isklyuchit[1]&& urovIsk !== isklyuchit[2]||iskDup[0]===urovIsk&&2<=kolZa&& juk === urovIsk||iskDup[1]===urovIsk&&2<=kolZa&& juk === urovIsk||iskDup[2]===urovIsk&&2<=kolZa&& juk === urovIsk) {
                       posled = iscinPerekl[j]
                       break iskiny;
                    }
                }
            }
            if (posled){
                posled.click()
                    clearInterval(obnovDate)
                    kontZamena()
            }
        }
        }else if(mainOkno.getElementById('achange')) {    
                                clearInterval(obnovDate)
                                boy() 
            } else if (mainOkno.getElementById('mostik')&&ustanovitAnti) {
                clearInterval(obnovDate)
                useAnti()
                last_minuty=minuty; 
            }

    },timeRnd)
    
    }
    let proverka =()=> {
        let timeRnd = Math.floor(Math.random()*500)
        let main = document.getElementsByName('mainWindow')[0].contentDocument;
           var provPL = false;
           let provEnki =(provPL)=>{
               if(provPL){
                   let enkaIsk = main.getElementById('Venergy').getAttribute('width')
                   let enIsk = Number(enkaIsk)
                            main = document.getElementsByName('mainWindow')[0].contentDocument;
                            main.getElementById('iskinButtonII').click()
                            let scripts = main.getElementsByTagName('script').length
                    if (scripts<9){kontZamena()
                        return
                    }
                   if (200 <= enIsk){
                       setTimeout(()=>{
                           let main = document.getElementsByName('mainWindow')[0].contentDocument;
                           let kol = main.getElementById('total_req').textContent
                           let urovIs = Number(main.getElementById('iskin_level').textContent)
                           if ('3'===kol||iskDup[0]===urovIs&&'2'===kol||iskDup[1]===urovIs&&'2'===kol||iskDup[2]===urovIs&&'2'===kol){
                           main.getElementById('start_but').click()
                           let vremyaM = new Date().getMinutes()
                           let vremyaS = new Date().getSeconds()
                           zapiska[urovIsk]++
                            }
                           },500)
                       setTimeout(dannye,1000+timeRnd)
                   }else{
                       let main = document.getElementsByName('mainWindow')[0].contentDocument;
                       let kol = main.getElementById('total_req').textContent
                       let urovIs = Number(main.getElementById('iskin_level').textContent)
                       if ('3'===kol||iskDup[0]===urovIs&&'2'===kol||iskDup[1]===urovIs&&2<=kol||iskDup[2]===urovIs&&2<=kol){
                       var opredAbil = main.getElementById('iskin_level').textContent
                       if ('4'===opredAbil||'18'===opredAbil){
                           if (200>ispolzAbil200){
                           main.getElementById('img18').click()
                               ispolzAbil200++
                           }else if(abilkaGos>0){
                               main.getElementById('scroll_365').click()
                               abilkaGos--
                           } else if(abilkaEkr>0){
                               main.getElementById('scroll_586').click()
                               abilkaEkr--
                           }
                       }else if('8'===opredAbil||'9'===opredAbil||'7'===opredAbil){
                            if (50>ispolzAbil50){
                           main.getElementById('img16').click()
                                ispolzAbil50++
                            } else if (220>ispolzAbil100){
                           main.getElementById('img17').click()
                               ispolzAbil100++
                           }else if (200>ispolzAbil200){
                            main.getElementById('img18').click()
                                ispolzAbil200++
                            }else if(abilkaGos>0){
                               main.getElementById('scroll_365').click()
                               abilkaGos--
                           } else if(abilkaEkr>0){
                               main.getElementById('scroll_586').click()
                               abilkaEkr--
                           }
                       } else {
                        if(220>ispolzAbil100){
                           main.getElementById('img17').click()
                        ispolzAbil100++
                        } else if(ispolzAbil200<200){
                           main.getElementById('img18').click()
                           ispolzAbil200++
                        }else if(abilkaGos>0){
                           main.getElementById('scroll_365').click()
                           abilkaGos--
                        }else if(abilkaEkr>0){
                           main.getElementById('scroll_586').click()
                           abilkaEkr--
                        } else {
                            stoperInd=false;
                        }
                       }
                      setTimeout(()=>{
                           main.getElementById('start_but').click()
                           
                        //   let vremyaM = new Date().getMinutes()
                        //   let vremyaS = new Date().getSeconds()
                        //     
                           zapiska[urovIsk]++
                        if (urovIsk===iskinLimit) {
                            limit--
                            console.log(urovIsk +' : лимит '+ limit)
                             if (limit<=0) {
                             isklyuchit[2] = Number(urovIsk)
                             }
                        }
                           },400)}
                       if (stoperInd) {
                       setTimeout(dannye,800+timeRnd)}
                   }
               }
           }
           let  provPlags =()=> {
               /**     let main = document.getElementsByName('mainWindow')[0].contentDocument;
                       var plaginy = main.querySelectorAll('.viod img')
                       for (var pl = 0; pl < plaginy.length; pl++) {
                           if (plaginy[pl].src !== 'http://img.starcombats.com/programs/void.gif') {
                               provPL = true;
                           } else {
                               dannye()
                               return
                           }
                       }*/
               setTimeout(()=>{provPL=true
                   provEnki(provPL)
               },200)
           }
           let urovIsk='';
           if (main.getElementById('iskin_level')) {
         urovIsk = main.getElementById('iskin_level').textContent}
         main = document.getElementsByName('mainWindow')[0].contentDocument;
         let scripts = main.getElementsByTagName('script').length
         if (scripts<9){
                var script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.innerHTML = use_ability + '; ' + use_complect + '; ' + put_virus + '; ' + put_complect + ';' + use_scroll + '; ';
                main.getElementsByTagName('body')[0].appendChild(script);}
        switch (urovIsk) {
            case '4':
                main.getElementById('new_complects').querySelector('li:nth-child(1)').click()
                setTimeout(provPlags,1500+timeRnd)
                break
            case '5':
                main.getElementById('new_complects').querySelector('li:nth-child(2)').click()
                setTimeout(provPlags,1500+timeRnd)
                break
            case '6':
                main.getElementById('new_complects').querySelector('li:nth-child(3)').click()
                setTimeout(provPlags,2500+timeRnd)
                break
            case '7':
                //main.getElementById('new_complects').querySelector('li:nth-child(4)').click()
                setTimeout(provPlags,2500+timeRnd)
                break
            case '8':
                //main.getElementById('new_complects').querySelector('li:nth-child(5)').click()
                setTimeout(provPlags,2500+timeRnd)
                break
            case '0':
                setTimeout(()=>{provEnki(true)},2000+timeRnd)
                break
            default:
                setTimeout(()=>{provEnki(true)},2000+timeRnd)
                break
                
        }
        
    }


    let kontZamena=()=>{
        let mainOkno = document.getElementsByName('mainWindow')[0].contentDocument;
          if (mainOkno.getElementById('iskinButtonII')){ mainOkno.getElementById('iskinButtonII').click()
            let scripts = mainOkno.getElementsByTagName('script').length
        if (scripts<10){
                var script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.innerHTML = use_ability + '; ' + use_complect + '; ' + put_virus + '; ' + put_complect + ';' + use_scroll + '; ';
                mainOkno.getElementsByTagName('body')[0].appendChild(script);}
                
                
            setTimeout(()=>{
                mainOkno.getElementById('iskinButtonLvls').click()
                let kol = Number(mainOkno.getElementById('total_req').textContent)
               let urovIs = Number(mainOkno.getElementById('iskin_level').textContent)

                   if (3===kol || iskDup[0]===urovIs && 2<=kol || iskDup[1]===urovIs && 2<=kol || iskDup[2]===urovIs && 2<=kol) {
                       proverka()
                   } else {
                       dannye()
                   }
        },1000)} else {dannye()}
     }
    setTimeout(kontZamena,4000)
}
   // onclick="let kol=0;setInterval(()=>{if(100>kol){document.getElementById('but1').click(); kol++}else{clearInterval()}},1000)" сборки имплов или кристаллов в конверторе
//&& iskDup[1]!==urovIs && iskDup[2]!==urovIs && iskDup[0]!==urovIs
