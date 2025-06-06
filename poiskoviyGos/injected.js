
function use_thing(obj_id, id) {
    if(!block_set) set_block(1 + Math.floor(Math.random() * 4));
    form_block = block_zone[self["points_to_block"]][block_num];
    slot_obj = document.getElementById(obj_id);

    if(slot_obj.func === "true") {
        var onclick = function () {
            use_thing_name(obj_id, id);
            return false;
        };
        show_name_form(obj_id, id, onclick);
    } else if(slot_obj.func === "joker") {
        var onclick = function () {
            use_thing_name(obj_id, id);
            return false;
        };
        show_joker_form(obj_id, id, onclick);
    } else {
        var req = new Subsys_JsHttpRequest_Js();
        req.onreadystatechange = function () {
            if(req.readyState == 4) {
                clear_all();
                error = req.responseJS.error;
                if(error) show_error(error);
                else {
                    if(req.responseJS.self) {
                        show_info(req.responseJS.self);
                        set_current_param(req.responseJS.self);
                    }
                    if(req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
                    if(req.responseJS.things) load_things(req.responseJS.things);
                    if(req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
                    if(req.responseJS.enemy_things)
                        load_enemy_things(req.responseJS.enemy_things);
                    else load_default_enemy_things();
                    if(req.responseJS.seconds_before_end) {
                        secondsBeforeEnd = req.responseJS.seconds_before_end;
                    }
                    if(req.responseJS.abilities) {
                        virus_ability = req.responseJS.abilities;
                        prepare_virus_ability();
                    }
                    if(req.responseJS.end_window) {
                        show_button(false);
                        show_glass();
                        show_result(
                            req.responseJS.end_window +
                            '<br><br><a href="' +
                            log_string +
                            '" target="_blank">Полный лог боя</a>'
                        );
                    }
                    top.chatWindow.get_log();
                }
            }
        };

        req.open(
            "POST",
            _text[lang]["station_path"] + "ajax/combat/use_thing.php",
            true
        );
        req.send({thing_id: id, block: form_block, ix: Math.random()});
    }
}

function use_scroll(obj_id, id) {
    if(!block_set) set_block(1 + Math.floor(Math.random() * 4));
    form_block = block_zone[self["points_to_block"]][block_num];
    slot_obj = document.getElementById(obj_id);
    if(slot_obj.func === "true") {
        var onclick = function () {
            use_scroll_name(obj_id, id);
            return false;
        };
        show_name_form(obj_id, id, onclick);
    } else if(slot_obj.func === "joker") {
        var onclick = function () {
            use_scroll_name(obj_id, id);
            return false;
        };
        show_joker_form(obj_id, id, onclick);
    } else {
        var req = new Subsys_JsHttpRequest_Js();
        req.onreadystatechange = function () {
            if(req.readyState == 4) {
                clear_all();
                error = req.responseJS.error;
                if(error) show_error(error);
                else {
                    if(req.responseJS.self) {
                        show_info(req.responseJS.self);
                        set_current_param(req.responseJS.self);
                    }
                    if(req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
                    if(req.responseJS.things) load_things(req.responseJS.things);
                    if(req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
                    if(req.responseJS.enemy_things)
                        load_enemy_things(req.responseJS.enemy_things);
                    else load_default_enemy_things();
                    if(req.responseJS.seconds_before_end) {
                        secondsBeforeEnd = req.responseJS.seconds_before_end;
                    }
                    if(req.responseJS.abilities) {
                        virus_ability = req.responseJS.abilities;
                        prepare_virus_ability();
                    }
                    if(req.responseJS.end_window) {
                        show_button(false);
                        show_glass();
                        show_result(
                            req.responseJS.end_window +
                            '<br><br><a href="' +
                            log_string +
                            '" target="_blank">Полный лог боя</a>'
                        );
                    }
                    top.chatWindow.get_log();
                }
            }
        };

        req.open(
            "POST",
            _text[lang]["station_path"] + "ajax/combat/use_scroll.php",
            true
        );
        req.send({scroll_id: id, block: form_block, ix: Math.random()});
    }
}

function use_ability(obj_id, id, func, new_name) {
    if(func == "true" && typeof new_name == "undefined") {
        var onclick = function () {
            use_ability(obj_id, id, func, 1);
            return false;
        };
        show_name_form(obj_id, id, onclick);
        return false;
    }

    if(new_name == 1 && document.getElementById("personage_name")) {
        new_name = document.getElementById("personage_name").value;
        document.getElementById("personage_name").value = "";
        hide_name_form();
    } else new_name = "";

    var req = new Subsys_JsHttpRequest_Js();
    req.onreadystatechange = function () {
        if(req.readyState == 4) {
            clear_all();
            error = req.responseJS.error;
            if(error) show_error(error);
            else {
                if(req.responseJS.self) {
                    show_info(req.responseJS.self);
                    set_current_param(req.responseJS.self);
                }
                if(req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
                if(req.responseJS.things) load_things(req.responseJS.things);
                if(req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
                if(req.responseJS.enemy_things)
                    load_enemy_things(req.responseJS.enemy_things);
                else load_default_enemy_things();
                if(req.responseJS.seconds_before_end) {
                    secondsBeforeEnd = req.responseJS.seconds_before_end;
                }
                if(req.responseJS.abilities) {
                    virus_ability = req.responseJS.abilities;
                    prepare_virus_ability();
                }
                if(req.responseJS.end_window) {
                    show_button(false);
                    show_glass();
                    show_result(
                        req.responseJS.end_window +
                        '<br><br><a href="' +
                        log_string +
                        '" target="_blank">Полный лог боя</a>'
                    );
                }
                top.chatWindow.get_log();
            }
        }
    };

    req.open(
        "POST",
        _text[lang]["station_path"] + "ajax/combat/use_ability.php",
        true
    );
    req.send({ability_id: id, name: new_name, ix: Math.random()});
}

function delete_other(id, new_name) {
    var req = new Subsys_JsHttpRequest_Js();
    req.onreadystatechange = function () {
        if(req.readyState == 4) {
            error = req.responseJS.error;
            if(error) show_error(error);
            else {
                inventory = req.responseJS.inventory;
                if(inventory) {
                    for (field in inventory)
                        document.getElementById(field).innerHTML = inventory[field];
                }

                show_result(
                    _text[lang]["item_name"] +
                    ' "' +
                    new_name +
                    '" ' +
                    _text[lang]["delete_success"]
                );
                document.getElementById("item" + id).style.display = "none";
            }
        }
    };

    req.open(
        "GET",
        _text[lang]["station_path"] + "ajax/hold/hold_delete_other.php",
        true
    );
    req.send({id: id, ix: Math.random()});
}

function use_action(action_id, sector) {
    if(document.getElementById("check_input") != null)
        check_code = document.getElementById("check_input").value;
    else check_code = "";

    var req = new JsHttpRequest();
    req.onreadystatechange = function () {
        if(req.readyState == 4) {
            document.getElementById("use_div").style.visibility = "hidden";

            if(req.responseJS != null) {
                if(req.responseJS.error_msg != null) {
                    error_msg = req.responseJS.error_msg;
                    if(error_msg.length > 0) {
                    }
                }

                if(req.responseJS.eval_msg != null) {
                    eval_msg = req.responseJS.eval_msg;
                    eval(eval_msg);
                }

                space_navigate("reload");
            }
        }
    };

    req.open("GET", "../ajax/space_action.php", true);
    req.send({
        check_code: check_code,
        action_id: action_id,
        sector: sector,
        ix: Math.random(),
    });
}

function injected_main() {
    let dubleSector;
    let dubleSectorPoint = 0;
    // номер поискового
    const poiskNom = 2, // номер поискового...
        kakProhod = 0, // 1 = прохождение, 0 = дроп...
        limit = 5; // сколько контенеров по квету до обмена
    let kolKont = 0;
    let trigger1 = false,
        trigger2 = false,
        trigger3 = false,
        trigger4 = false,
        trigger5 = false,
        triggerB = false,
        trigger6 = false;
    let hod = () => {
        clearTimeout()
        const mainOkno = document.getElementsByName("mainWindow")[0].contentDocument,
            panelMenu = document.getElementsByName("menuWindow")[0].contentDocument,
            sector = mainOkno.querySelector("#sector").textContent,
            directions = {
                forward: mainOkno.getElementById("fwd"),
                back: mainOkno.getElementById("back"),
                right: mainOkno.getElementById("right"),
                left: mainOkno.getElementById("left"),
            },
            navigationBtn = panelMenu.querySelector(".right img:last-of-type"),
            rand = Math.floor(Math.random() * 1500);
        if(dubleSector !== sector) {
            dubleSector = sector;
            dubleSectorPoint = 0;
        } else if(dubleSector === sector) {
            dubleSectorPoint++;
        }
        const changeWay = (way, time = 1500) => {
            directions[way].click()
            if(way === 'forward') {
                setTimeout(updateHub, rand + 1000 + time)
            } else {
                setTimeout(hod, rand + time)
            }
        }

        if(dubleSectorPoint < 2) {
            if(poiskNom === 4) {
                switch (sector) {
                    case "1165E":
                    case "3166E":
                    case "4166S":
                    case "4167E":
                    case "4168N":
                    case "4170E":
                    case "4171N":
                    case "4173E":
                    case "6173S":
                    case "8171S":
                    case "8170W":
                    case "8168S":
                    case "8167W":
                    case "9166E":
                    case "10166S":
                    case "11168N":
                    case "10170N":
                    case "10173E":
                    case "13173S":
                    case "13170W":
                    case "14173E":
                    case "15173S":
                    case "15169E":
                    case "16173E":
                    case "17173S":
                    case "17167E":
                    case "19166E":
                    case "20166S":
                    case "22167S":
                    case "22165W":
                    case "20165N":
                    case "20168E":
                    case "22169E":
                    case "18171S":
                    case "18173E":
                    case "19173S":
                    case "20173E":
                    case "22173S":
                    case "22171W":
                    case "22170S":
                    case "24169S":
                    case "24172E":
                    case "27169S":
                    case "31171S":
                    case "29171N":
                    case "29173E":
                    case "29165W":
                    case "29167E":
                    case "30167S":
                    case "32171E":
                    case "30176W":
                    case "29176N":
                    case "29178E":
                    case "32178S":
                    case "32174W":
                    case "22174N":
                    case "21174W":
                    case "19174N":
                    case "19175W":
                    case "18175N":
                    case "17174W":
                    case "16174N":
                    case "15177N":
                    case "15176S":
                    case "15174W":
                    case "12174N":
                    case "10177W":
                    case "9177N":
                    case "7178W":
                    case "6178N":
                    case "4178W":
                    case "3178N":
                    case "2177S":
                    case "2176W":
                    case "2174S":
                    case "2173W":
                    case "2171S":
                    case "2170W":
                    case "2168S":
                    case "2167W":
                        changeWay('right');
                        break;
                    case "3165S":
                    case "5167S":
                    case "5168E":
                    case "5170S":
                    case "5171E":
                    case "6172W":
                    case "7172S":
                    case "7171W":
                    case "7170N":
                    case "7168W":
                    case "7167N":
                    case "7165W":
                    case "9165S":
                    case "10165W":
                    case "13165S":
                    case "13168E":
                    case "11170E":
                    case "12170N":
                    case "12169W":
                    case "14165W":
                    case "15165S":
                    case "15169W":
                    case "16165W":
                    case "17165S":
                    case "18167S":
                    case "18165W":
                    case "19165S":
                    case "20165W":
                    case "22165S":
                    case "22167E":
                    case "22168S":
                    case "17171W":
                    case "19172W":
                    case "20172S":
                    case "22171S":
                    case "22173E":
                    case "20173N":
                    case "20170W":
                    case "22169W":
                    case "25172N":
                    case "25169W":
                    case "27168W":
                    case "29168S":
                    case "29170S":
                    case "31171E":
                    case "29172S":
                    case "29173N":
                    case "29165S":
                    case "30165W":
                    case "33165S":
                    case "33168E":
                    case "32168N":
                    case "33171S":
                    case "33179E":
                    case "28179N":
                    case "28175W":
                    case "31175S":
                    case "31177E":
                    case "30177N":
                    case "22178E":
                    case "21178N":
                    case "18179E":
                    case "17179N":
                    case "16177E":
                    case "15179E":
                    case "14179N":
                    case "14176W":
                    case "12178E":
                    case "10178N":
                    case "9179E":
                    case "7179N":
                    case "6179E":
                    case "4179N":
                    case "3179E":
                    case "1179N":
                    case "1177W":
                    case "1176N":
                    case "1174W":
                    case "1173N":
                    case "1171W":
                    case "1170N":
                    case "1168W":
                    case "1167N":
                    case "1165W":
                        changeWay('left');
                        break;
                    case "4165W":
                    case "7173E":
                    case "18168E":
                    case "21167N":
                    case "18170W":
                    case "21171N":
                    case "24165W":
                    case "26172S":
                    case "28170N":
                    case "31170W":
                    case "27172N":
                    case "31173S":
                    case "27165N":
                    case "32167W":
                    case "19177E":
                        changeWay('back');
                        break;
                    case "14169S":
                        (trigger1)? changeWay('left') : changeWay('right')
                        break;
                    case "16169S":
                        (!trigger1)? changeWay('left') : changeWay('right')
                        trigger1 = !trigger1;
                        break;
                    case "29170E":
                    case "29172E":
                        (!trigger2) ? changeWay('left') : changeWay('forward');
                        trigger2 = !trigger2
                        break;
                    case "29171E":
                        (!trigger3) ? changeWay('right') : changeWay('forward');
                        trigger3 = !trigger3
                        break;
                    default:
                        if(sector !== 'undefined' && sector) changeWay('forward', 3000);
                        else setTimeout(updateHub, rand)
                        break;
                }
            } else if(poiskNom === 3) {
                switch (sector) {
                    case "17050N":
                    case "17051E":
                    case "20051S":
                    case "21051E":
                    case "21052N":
                    case "20053N":
                    case "17065N":
                    case "17071E":
                    case "17072N":
                    case "17073E":
                    case "18072S":
                    case "18071W":
                    case "19070S":
                    case "19071N":
                    case "19072E":
                    case "21072S":
                    case "23072N":
                    case "23071S":
                    case "23074E":
                    case "24076E":
                    case "24079N":
                    case "24081E":
                    case "26081S":
                    case "24083N":
                    case "26087N":
                    case "24087E":
                    case "25092N":
                    case "24093N":
                    case "24100E":
                    case "26100S":
                    case "28099S":
                    case "30099E":
                    case "31099S":
                    case "31096W":
                    case "31095S":
                    case "31093W":
                    case "28097S":
                    case "28096W":
                    case "30094S":
                    case "31092S":
                    case "31090W":
                    case "31089S":
                    case "31087W":
                    case "30086W":
                    case "30084S":
                    case "30083W":
                    case "31083S":
                    case "31081W":
                    case "30080W":
                    case "27079E":
                    case "31079S":
                    case "31075W":
                    case "29075S":
                    case "29074W":
                    case "31073S":
                    case "31069W":
                    case "27069N":
                    case "25070N":
                    case "25071E":
                    case "27071W":
                    case "31068S":
                    case "31065W":
                    case "31061S":
                    case "31055W":
                    case "30055N":
                    case "29058N":
                    case "29066N":
                    case "27065S":
                    case "27059W":
                    case "21059N":
                    case "21061N":
                    case "28062S":
                    case "28057W":
                    case "24057W":
                    case "23056W":
                    case "23055E":
                    case "24055S":
                    case "25055E":
                    case "26055S":
                    case "27054S":
                    case "21062N":
                    case "21065E":
                    case "21067S":
                    case "21066W":
                    case "20065S":
                    case "20064W":
                    case "20063S":
                    case "20061W":
                    case "19058S":
                    case "19057W":
                        changeWay('right');
                        break;
                    case "16050W":
                    case "20050W":
                    case "21050S":
                    case "22051S":
                    case "22052E":
                    case "21053E":
                    case "20057E":
                    case "17057S":
                    case "18071S":
                    case "18072E":
                    case "22073S":
                    case "22074E":
                    case "17074N":
                    case "17072W":
                    case "17071N":
                    case "17070W":
                    case "19069W":
                    case "23069S":
                    case "23071E":
                    case "24070S":
                    case "21071W":
                    case "23070W":
                    case "24072E":
                    case "24074S":
                    case "25076S":
                    case "25079E":
                    case "28083S":
                    case "28087E":
                    case "24087N":
                    case "26091E":
                    case "28091S":
                    case "28092E":
                    case "25093E":
                    case "26099W":
                    case "25098N":
                    case "30098S":
                    case "30096N":
                    case "30095W":
                    case "30093N":
                    case "25097W":
                    case "25096N":
                    case "25094W":
                    case "30092W":
                    case "30090N":
                    case "30089W":
                    case "30087N":
                    case "29086N":
                    case "29084W":
                    case "30081N":
                    case "29080N":
                    case "27079N":
                    case "27075W":
                    case "28074N":
                    case "28073W":
                    case "27070E":
                    case "29071S":
                    case "29072E":
                    case "27072N":
                    case "25071N":
                    case "25068W":
                    case "30065N":
                    case "30061W":
                    case "30058E":
                    case "29065E":
                    case "31065S":
                    case "31066E":
                    case "29067E":
                    case "25067N":
                    case "25065W":
                    case "26057N":
                    case "26058E":
                    case "24058N":
                    case "23057N":
                    case "22056N":
                    case "27051W":
                    case "22054W":
                    case "23054S":
                    case "24053W":
                    case "25053S":
                    case "26054W":
                    case "28051S":
                    case "28062E":
                    case "23065S":
                    case "23068E":
                    case "17068N":
                    case "17067W":
                    case "19066N":
                    case "19065W":
                    case "19064N":
                    case "19063W":
                    case "19061N":
                    case "19060W":
                    case "18060N":
                    case "18058W":
                        changeWay('left');
                        break;
                    case "16057N":
                    case "26078W":
                    case "18050S":
                    case "16052E":
                    case "25091N":
                    case "29083N":
                    case "28075N":
                    case "28065N":
                    case "22061S":
                    case "26056W":
                    case "20060S":
                        changeWay('back');
                        break;
                    case "21062E":
                        (!trigger1) ? changeWay('right') : changeWay('forward');
                        trigger1 = !trigger1
                        break;
                    case "21061E":
                        (!trigger1) ? changeWay('right') : changeWay('forward', 5000);
                        trigger1 = !trigger1
                        break;
                    case "26083E":
                    case "29098W":
                    case "29079W":
                        (!trigger1) ? changeWay('right') : changeWay('left');
                        trigger1 = !trigger1
                        break;
                    default:
                        if(sector !== 'undefined' && sector) changeWay('forward', 3000);
                        else setTimeout(updateHub, rand)
                        break;
                }
            } else if(poiskNom === 2) {
                switch (sector) {
                    case "1081E":
                    case "3083E":
                    case "5085E":
                    case "6086E":
                    case "7086S":
                    case "9085S":
                    case "10083E":
                    case "14085E":
                    case "15085S":
                    case "16082S":
                    case "5095N":
                    case "9087N":
                    case "16087W":
                    case "16094S":
                    case "10094E":
                    case "10088N":
                    case "15088W":
                    case "15093S":
                    case "11093E":
                    case "11089N":
                    case "14089W":
                    case "14092S":
                    case "12092E":
                    case "4093S":
                    case "4085W":
                    case "2085N":
                    case "2080W":
                    case "1080N":
                    case "14096N":
                    case "10098N":
                    case "9097W":
                    case "8097N":
                    case "7098N":
                    case "4098S":
                    case "4095W":
                        changeWay('right')
                        break;
                    case "3081S":
                    case "5083S":
                    case "6085S":
                    case "7085W":
                    case "9082W":
                    case "10082S":
                    case "14083S":
                    case "15082W":
                    case "16081W":
                    case "17081S":
                    case "17086S":
                    case "17095E":
                    case "9087W":
                    case "16087S":
                    case "16094E":
                    case "10094N":
                    case "10088W":
                    case "15088S":
                    case "15093E":
                    case "11093N":
                    case "11089W":
                    case "14089S":
                    case "14092E":
                    case "12092N":
                    case "15095S":
                    case "9095E":
                    case "5097E":
                    case "2097N":
                    case "2093W":
                    case "15096E":
                    case "14097E":
                    case "11097N":
                    case "11098E":
                    case "10100E":
                    case "9100N":
                    case "8098E":
                    case "7099E":
                    case "1099N":
                    case "1098W":
                    case "2095N":
                        changeWay('left')
                        break;
                    case "12090W":
                    case "9086N":
                    case "2086E":
                    case "11096W":
                        changeWay('back')
                        break;
                    case "20803W":
                        (!trigger1) ? changeWay('right') : changeWay('forward');
                        trigger1 = !trigger1
                        break;
                    case "17086E":
                        (!trigger2) ? changeWay('left') : changeWay('forward');
                        trigger2 = !trigger2
                        break;
                    case "9095N":
                        (!trigger4) ? changeWay('left') : changeWay('forward');
                        trigger4 = !trigger4
                        break;
                    case "15095N":
                        (!trigger3) ? changeWay('right') : changeWay('forward');
                        trigger3 = !trigger3
                        break;
                    default:
                        if(sector !== 'undefined' && sector) changeWay('forward');
                        else updateHub()
                        break;
                }
            } else if(poiskNom === 1) {
                switch (sector) {
                    case "1051E":
                    case "2051E":
                    case "1052N":
                    case "1053E":
                    case "1055N":
                    case "1056E":
                    case "3056S":
                    case "4054S":
                    case "6052S":
                    case "6050W":
                    case "5050N":
                    case "4052N":
                    case "4053E":
                    case "7056S":
                    case "7051N":
                    case "5058N":
                    case "4058W":
                    case "2057W":
                    case "1057N":
                    case "1065E":
                    case "2065S":
                    case "4061E":
                    case "7061S":
                    case "9060N":
                    case "8062W":
                    case "6061W":
                    case "5061N":
                    case "4064N":
                    case "3065N":
                    case "2066N":
                    case "1067N":
                    case "1068E":
                    case "2071N":
                    case "1072N":
                    case "1073E":
                    case "3073N":
                    case "3074E":
                    case "6074S":
                    case "9073S":
                    case "9072W":
                    case "9069S":
                    case "5071E":
                    case "9071S":
                    case "9067W":
                    case "5067N":
                    case "8069N":
                    case "6073N":
                    case "3072W":
                    case "2068W":
                    case "2067S":
                    case "9064S":
                    case "10060S":
                    case "8056N":
                    case "6053W":
                    case "3066S":
                    case "10054W":
                        changeWay('right');
                        break;
                    case "3051S":
                    case "3052E":
                    case "2053S":
                    case "2055E":
                    case "3054W":
                    case "5052E":
                    case "6053S":
                    case "7051W":
                    case "7056E":
                    case "5059E":
                    case "4059N":
                    case "2058N":
                    case "2060W":
                    case "4060S":
                    case "7059W":
                    case "10059S":
                    case "10060E":
                    case "9063E":
                    case "8063N":
                    case "6062N":
                    case "5064E":
                    case "4065E":
                    case "3066E":
                    case "2067E":
                    case "2068S":
                    case "2069E":
                    case "3069S":
                    case "3071E":
                    case "2072E":
                    case "6073W":
                    case "4072N":
                    case "4069N":
                    case "5069S":
                    case "4066W":
                    case "10066S":
                    case "10072E":
                    case "9073E":
                    case "6074E":
                    case "3074N":
                    case "1068N":
                    case "1067W":
                    case "2066W":
                    case "7065N":
                    case "7064W":
                    case "9060W":
                    case "3065W":
                    case "9056E":
                    case "8058E":
                    case "1053N":
                    case "6058E":
                    case "8070E":
                    case "6070N":
                    case "6068W":
                    case "8068S":
                    case "9054N":
                        changeWay('left');
                        break;
                    case "2050W":
                    case "4051W":
                    case "10051S":
                    case "4056N":
                    case "1069N":
                    case "4073S":
                    case "8065S":
                    case "9053W":
                    case "1050W":
                        changeWay('back');
                        break;
                    case "2051S":
                    case "4052E":
                    case "6056E":
                    case "9069W":
                    case "8069E":
                        (!trigger1) ? changeWay('right') : changeWay('forward');
                        trigger1 = !trigger1
                        break;
                    case "4069W":
                    case "5069E":
                        (!trigger2) ? changeWay('left') : changeWay('forward');
                        trigger2 = !trigger2
                        break;
                    case "6056S":
                        (trigger3) ? changeWay('left') : changeWay('forward');
                        trigger3 = !trigger3
                        break;
                    case "9072N":
                        (trigger6) ? changeWay('right') : changeWay('forward');
                        trigger6 = !trigger6
                        break;
                    case "6058N":
                        (trigger4) ? changeWay('left') : changeWay('forward');
                        trigger4 = !trigger4
                        break;
                    case "2072N":
                        (trigger5) ? changeWay('left') : changeWay('forward');
                        trigger5 = !trigger5
                        break;
                    default:
                        if(sector !== 'undefined' && sector) changeWay('forward');
                        else updateHub()
                        break;
                }
            }
        } else {
            dubleSectorPoint = 0;
            navigationBtn.click();
            setTimeout(updateHub, 2000 + rand)
        }
    };

    let boy = () => {
        triggerB = 0;
        const mainOkno = document.getElementsByName("mainWindow")[0].contentDocument,
            panelMenu = document.getElementsByName("menuWindow")[0].contentDocument,
            chat_top_win = document.getElementsByName("chatmenuWindow")[0].contentDocument,
            scripts = mainOkno.getElementsByTagName("script").length;
        if(scripts < 8) {
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.innerHTML =
                use_thing + "; " + use_scroll + "; " + use_ability + ";";
            mainOkno.getElementsByTagName("head")[0].appendChild(script);
        }
        const activPer = mainOkno.getElementById("reboot"),
            messageOkno = mainOkno.getElementById("infoWindow"),
            chatBtnday = chat_top_win.getElementById("tabNameChat"),
            obnovRn = Math.floor(Math.random() * 500) + 1500;
        if(messageOkno && messageOkno.style.visibility === "visible") {
            let textInfoWin = mainOkno.getElementById('infoWindowMessage').textContent,
                viborkaTexta = textInfoWin?.split(' ', 1).join();

            switch (viborkaTexta) {
                case "Бой":
                    panelMenu.querySelector(".right img:last-child").click();
                    setTimeout(() => {chatBtnday.click()}, obnovRn);
                    setTimeout(updateHub, obnovRn);
                    break;
                case "Вы":
                    panelMenu.querySelector(".right img:last-child").click();
                    setTimeout(() => {chatBtnday.click()}, obnovRn);
                    setTimeout(boy, obnovRn);
                    break;
                case "Использование":
                    const autoboy = mainOkno.querySelector(
                        "#new_centerBlock_footer tr:nth-child(2) td:nth-child(2) img"
                    );
                    autoboy.click();
                    setTimeout(boy, obnovRn);
                    break;
                case "Ожидание":
                    setTimeout(updateHub, obnovRn);
                    break;
                case "Перезагрузка":
                    mainOkno.querySelector(".infobtn").click();
                    panelMenu.querySelector(".right img:last-child").click();
                    setTimeout(boy, obnovRn);
                    break;
                default:
                    panelMenu.querySelector(".right img:last-child").click();
                    setTimeout(() => {
                        chatBtnday.click();
                    }, obnovRn);
                    setTimeout(updateHub, obnovRn + 2000);
                    break;
            }
        } else if(
            activPer?.style.display === "block" ||
            mainOkno?.querySelector(".name_out b")?.textContent ===
            "---Daktaklakpak---" ||
            mainOkno?.querySelector(".name_out b")?.textContent === "Охранный дрон"
        ) {
            const mainOkno = document.getElementsByName("mainWindow")[0].contentDocument,
                autoboy = mainOkno.querySelector(
                    "#new_centerBlock_footer tr:nth-child(2) td:nth-child(2) img"
                );
            autoboy.click();
            setTimeout(boy, obnovRn);
        } else {
            setTimeout(() => {
                const perezagruz = mainOkno.querySelector("#reactor");
                if(perezagruz) {
                    perezagruz.click();
                }
                setTimeout(() => {
                    if(messageOkno?.style.visibility !== "visible") {
                        mainOkno
                        .querySelector("#new_centerBlock_footer img:first-child")
                        .click();
                    }
                }, 500);
                setTimeout(updateHub, obnovRn + 1000);
            }, obnovRn);
        }
    };

    let delete_boxes = () => {
        const mainOkno = document.getElementsByName("mainWindow")[0].contentDocument,
         panelMenu = document.getElementsByName("menuWindow")[0].contentDocument,
         navigationBtn = panelMenu.querySelector(".right img:last-of-type"),
         requiredElement = "Контейнер с запчастями";


        let obshee = mainOkno.querySelectorAll(".item");

        // let scripts = mainOkno.getElementsByTagName("script").length;

        let script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = delete_other;
        mainOkno.getElementsByTagName("head")[0].appendChild(script);
        let iskomoe = new Array(...obshee).filter(el => el.querySelector('h1').textContent === requiredElement)
        let iskomoeKol = iskomoe.length;
        let delBtn;
        let intervalDelet = setInterval(() => {
            if(iskomoeKol > 0) {
                let kont = iskomoe[iskomoeKol - 1];
                delBtn = kont.querySelector("tr:nth-child(2) td:nth-child(4) img");
            } else {
                let chatOkno =
                    document.getElementsByName("chatWindow")[0].contentDocument;
                let soobsheniya = chatOkno.getElementById("content_rus");
                let data = " удалил контейнеры, было " + iskomoe.length;
                let div = document.createElement("div");
                div.setAttribute("class", "postmessage");
                div.innerHTML = data;
                soobsheniya.appendChild(div);
                kolKont = iskomoeKol;
                updateHub();
                navigationBtn.click();
                clearInterval(intervalDelet);
            }
            if(delBtn) {
                iskomoeKol--;
                delBtn.click();
            }
        }, 3000);
    };

    let updateHub = () => {
        let timeRand = Math.floor(Math.random() * 1000) + 3000,
            mainOkno = document.getElementsByName("mainWindow")[0].contentDocument,
            panelMenu = document.getElementsByName("menuWindow")[0].contentDocument,
            navigationBtn = panelMenu.querySelector(".right img:last-of-type"),
            sector = mainOkno?.querySelector("#sector");

        if(kolKont >= limit && sector !== null && kakProhod === 0) {
            panelMenu.querySelector("#menu1 img:nth-child(8)").click();
            setTimeout(updateHub, timeRand)
        } else if(sector != null) {
            let oblomki = [
                mainOkno.querySelector("#obj_left"),
                mainOkno.querySelector("#obj_front"),
                mainOkno.querySelector("#obj_right"),
            ];
            let itemChange;
            if(mainOkno.querySelectorAll("script").length < 9) {
                let script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.innerHTML = use_action;
                mainOkno.getElementsByTagName("body")[0].appendChild(script);
            }
            for (let i = 0; i < oblomki.length; i++) {
                let imgObekt = oblomki[i]?.firstChild?.src;
                let nonOblom = oblomki[i];
                if(
                    nonOblom?.style?.display === "block" &&
                    imgObekt === "http://img.starcombats.com/map/obj/chelnok_01.gif"
                ) {
                    let chatOkno =
                        document.getElementsByName("chatWindow")[0].contentDocument;
                    let soobsheniya = chatOkno.getElementById("content_rus");
                    let data = " обменник мелькнул " + sector.textContent;
                    let div = document.createElement("div");
                    div.setAttribute("class", "postmessage");
                    div.innerHTML = data;
                    soobsheniya.appendChild(div);
                }
                if(i === 1) {
                    switch (imgObekt) {
                        case "http://img.starcombats.com/map/obj/hunter.gif":
                        case "http://img.starcombats.com/map/obj/dron01.gif":
                        case "http://img.starcombats.com/map/obj/chelnok_01.gif":

                            if(nonOblom?.style?.display === "block") {
                                itemChange = nonOblom.firstChild;
                            }
                            break;
                        default:
                            if(nonOblom?.style?.display === "block") {
                                itemChange = nonOblom.firstChild;
                            }
                            break;
                    }
                } else if(
                    imgObekt !== "http://img.starcombats.com/map/obj/hunter.gif" &&
                    imgObekt !== "http://img.starcombats.com/map/obj/dron01.gif" &&
                    imgObekt !== "http://img.starcombats.com/map/obj/chelnok_01.gif"
                ) {
                    if(nonOblom?.style?.display === "block") {
                        itemChange = nonOblom.firstChild;
                    }
                }
            }
            let change1 = (itemChange) => {
                itemChange.click();
                setTimeout(() => {
                    let mainOkno =
                        document.getElementsByName("mainWindow")[0].contentDocument;

                    if(triggerB <= 1) {
                        mainOkno.getElementById("item1")?.click();
                    }
                    setTimeout(() => {
                        if(
                            itemChange.src ===
                            "http://img.starcombats.com/map/obj/hunter.gif" ||
                            itemChange.src ===
                            "http://img.starcombats.com/map/obj/broken_cargo.gif"
                        ) {
                            navigationBtn.click();
                            triggerB++;
                        }
                        setTimeout(updateHub, timeRand)
                    }, 1000);
                }, 1500);
            };
            let change2 = (itemChange) => {
                itemChange.click();
                setTimeout(() => {
                    let mainOkn =
                        document.getElementsByName("mainWindow")[0].contentDocument;
                    let activBtn;
                    let activBtns = [
                        mainOkn.getElementById("item3"),
                        mainOkn.getElementById("item2"),
                        mainOkn.getElementById("item1"),
                    ];
                    for (let btn of activBtns) {
                        if(btn.textContent === "Обменять контейнеры") {
                            activBtn = btn;
                        }
                    }
                    if(activBtn !== null) {
                        activBtn.click();
                    }

                    setTimeout(() => {
                        if(
                            itemChange.src ===
                            "http://img.starcombats.com/map/obj/hunter.gif" ||
                            itemChange.src ===
                            "http://img.starcombats.com/map/obj/broken_cargo.gif"
                        ) {
                            navigationBtn.click();
                        }
                        setTimeout(updateHub, timeRand)
                    }, 1000);
                }, 1500);
            };

            if(!itemChange) {
                hod();
                clearInterval()
            } else {
                if(
                    itemChange.src === "http://img.starcombats.com/map/obj/broken_ship.gif"
                ) {
                    kolKont++;
                }
                if(
                    kolKont >= limit &&
                    itemChange?.src ===
                    "http://img.starcombats.com/map/obj/chelnok_01.gif" &&
                    kakProhod === 1
                ) {
                    change2(itemChange);
                } else {
                    change1(itemChange);
                }
            }
        } else if(mainOkno.getElementById("achange")) {
            let mainOkno =
                document.getElementsByName("mainWindow")[0].contentDocument;
            let scripts = mainOkno.getElementsByTagName("script").length;

            if(scripts < 8) {
                var script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.innerHTML =
                    use_thing + "; " + use_scroll + "; " + use_ability + ";";
                mainOkno.getElementsByTagName("head")[0].appendChild(script);
            }
            boy();
            clearTimeout()
        } else if(mainOkno.getElementById("overall_damage_min")) {
            setTimeout(() => {
                mainOkno =
                    document.getElementsByName("mainWindow")[0].contentDocument;
                let gruze = mainOkno.querySelector(".cats a:last-child");
                gruze?.click()
                // if (!gruze) return;
                setTimeout(() => {
                    delete_boxes();
                }, 2000);
            }, 2000);
        } else {
            let navigationBtn = panelMenu.querySelector(".right img:last-of-type");
            navigationBtn.click();
            setTimeout(updateHub, timeRand)
        }

    };
    setTimeout(updateHub, 5000);
}
