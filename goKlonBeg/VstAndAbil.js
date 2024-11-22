function use_ability(obj_id, id, func, new_name) {
    if (func == "true" && typeof (new_name) == "undefined") {
        var onclick = function () {
            use_ability(obj_id, id, func, 1);
            return false;
        }
        show_name_form(obj_id, id, onclick);
        return false;
    }
    if (new_name == 1 && document.getElementById("personage_name")) {
        new_name = document.getElementById("personage_name").value;
        document.getElementById("personage_name").value = "";
        hide_name_form();} else new_name = "";
    var req = new Subsys_JsHttpRequest_Js();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            clear_all();
            error = req.responseJS.error;
            if (error) prot.show_error(error);
            else {
                if (req.responseJS.self) {
                    show_info(req.responseJS.self);
                    set_current_param(req.responseJS.self);
                }
                if (req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
                if (req.responseJS.things) load_things(req.responseJS.things);
                if (req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
                if (req.responseJS.enemy_things) load_enemy_things(req.responseJS.enemy_things);
                else load_default_enemy_things();
                if (req.responseJS.seconds_before_end) {
                    secondsBeforeEnd = req.responseJS.seconds_before_end;
                }
                if (req.responseJS.abilities) {
                    virus_ability = req.responseJS.abilities;
                    prepare_virus_ability();
                }
                if (req.responseJS.end_window) {
                    show_button(false);
                    show_glass();
                    show_result(req.responseJS.end_window + '<br><br><a href="' +  log_string  + '" target="_blank">Полный лог боя</a>');
                }
                top.chatWindow.get_log();
            }
        }
    }
    req.open("POST", "http://space.starcombats.com/ajax/combat/use_ability.php", true);
    req.send({ability_id: id, name: new_name, ix: Math.random()});
}
function use_thing(obj_id, id)
{
    if (!block_set) set_block(1 + Math.floor(Math.random() * 4));
    form_block = block_zone[self["points_to_block"]][block_num];
    slot_obj = document.getElementById(obj_id);
    if (slot_obj.func === 'true') {
        var onclick = function () { use_thing_name(obj_id, id); return false; }
        show_name_form(obj_id, id, onclick);
    }
    else if (slot_obj.func === "joker")
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
        req.open("POST", "http://space.starcombats.com/ajax/combat/use_thing.php", true);
        req.send({thing_id: id, block: form_block, ix: Math.random()});
    }
}