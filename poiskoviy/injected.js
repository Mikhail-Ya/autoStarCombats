function clear_imps() {
  for (i = 1; i <= 5; i++) {
    techno_obj = document.getElementById("techno" + i);
    techno_obj.src = _text[lang]["img_path"] + "spacer.gif";
    techno_obj.scroll_id = 0;
    techno_obj.func = "";
    techno_obj.onclick = "";
    techno_obj.alt = "";
    techno_obj.title = "";
    techno_obj.style.cursor = "";
    tendency_obj = document.getElementById("tendency" + i);
    tendency_obj.src = _text[lang]["img_path"] + "spacer.gif";
    tendency_obj.scroll_id = 0;
    tendency_obj.func = "";
    tendency_obj.onclick = "";
    tendency_obj.alt = "";
    tendency_obj.title = "";
    tendency_obj.style.cursor = "";
    protection_obj = document.getElementById("protection" + i);
    protection_obj.src = _text[lang]["img_path"] + "spacer.gif";
    protection_obj.scroll_id = 0;
    protection_obj.func = "";
    protection_obj.alt = "";
    protection_obj.title = "";
  }
}

function use_thing(obj_id, id) {
  if (!block_set) set_block(1 + Math.floor(Math.random() * 4));
  form_block = block_zone[self["points_to_block"]][block_num];
  slot_obj = document.getElementById(obj_id);

  if (slot_obj.func === "true") {
    var onclick = function () {
      use_thing_name(obj_id, id);
      return false;
    };
    show_name_form(obj_id, id, onclick);
  } else if (slot_obj.func === "joker") {
    var onclick = function () {
      use_thing_name(obj_id, id);
      return false;
    };
    show_joker_form(obj_id, id, onclick);
  } else {
    var req = new Subsys_JsHttpRequest_Js();
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        clear_all();
        error = req.responseJS.error;
        if (error) show_error(error);
        else {
          if (req.responseJS.self) {
            show_info(req.responseJS.self);
            set_current_param(req.responseJS.self);
          }
          if (req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
          if (req.responseJS.things) load_things(req.responseJS.things);
          if (req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
          if (req.responseJS.enemy_things)
            load_enemy_things(req.responseJS.enemy_things);
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
    req.send({ thing_id: id, block: form_block, ix: Math.random() });
  }
}

function use_scroll(obj_id, id) {
  if (!block_set) set_block(1 + Math.floor(Math.random() * 4));
  form_block = block_zone[self["points_to_block"]][block_num];
  slot_obj = document.getElementById(obj_id);
  if (slot_obj.func === "true") {
    var onclick = function () {
      use_scroll_name(obj_id, id);
      return false;
    };
    show_name_form(obj_id, id, onclick);
  } else if (slot_obj.func === "joker") {
    var onclick = function () {
      use_scroll_name(obj_id, id);
      return false;
    };
    show_joker_form(obj_id, id, onclick);
  } else {
    var req = new Subsys_JsHttpRequest_Js();
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        clear_all();
        error = req.responseJS.error;
        if (error) show_error(error);
        else {
          if (req.responseJS.self) {
            show_info(req.responseJS.self);
            set_current_param(req.responseJS.self);
          }
          if (req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
          if (req.responseJS.things) load_things(req.responseJS.things);
          if (req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
          if (req.responseJS.enemy_things)
            load_enemy_things(req.responseJS.enemy_things);
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
    req.send({ scroll_id: id, block: form_block, ix: Math.random() });
  }
}

function use_ability(obj_id, id, func, new_name) {
  if (func == "true" && typeof new_name == "undefined") {
    var onclick = function () {
      use_ability(obj_id, id, func, 1);
      return false;
    };
    show_name_form(obj_id, id, onclick);
    return false;
  }

  if (new_name == 1 && document.getElementById("personage_name")) {
    new_name = document.getElementById("personage_name").value;
    document.getElementById("personage_name").value = "";
    hide_name_form();
  } else new_name = "";

  var req = new Subsys_JsHttpRequest_Js();
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      clear_all();
      error = req.responseJS.error;
      if (error) show_error(error);
      else {
        if (req.responseJS.self) {
          show_info(req.responseJS.self);
          set_current_param(req.responseJS.self);
        }
        if (req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
        if (req.responseJS.things) load_things(req.responseJS.things);
        if (req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
        if (req.responseJS.enemy_things)
          load_enemy_things(req.responseJS.enemy_things);
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
  req.send({ ability_id: id, name: new_name, ix: Math.random() });
}

function use_scroll_name(obj_id, id) {
  if (document.getElementById("personage_name")) {
    new_name = document.getElementById("personage_name").value;
    document.getElementById("personage_name").value = "";
  } else new_name = "";
  other_data = "";
  if (document.getElementById("joker_text")) {
    other_data = document.getElementById("joker_text").value;
    document.getElementById("joker_text").value = "";
  }

  hide_name_form();
  if (!block_set) set_block(1 + Math.floor(Math.random() * 4));
  form_block = block_zone[self["points_to_block"]][block_num];

  var req = new Subsys_JsHttpRequest_Js();
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      clear_all();
      error = req.responseJS.error;
      if (error) show_error(error);
      else {
        if (req.responseJS.self) {
          show_info(req.responseJS.self);
          set_current_param(req.responseJS.self);
        }
        if (req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
        if (req.responseJS.things) load_things(req.responseJS.things);
        if (req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
        if (req.responseJS.enemy_things)
          load_enemy_things(req.responseJS.enemy_things);
        else load_default_enemy_things();
        if (req.responseJS.seconds_before_end) {
          secondsBeforeEnd = req.responseJS.seconds_before_end;
        }
        if (req.responseJS.abilities) {
          virus_ability = req.responseJS.abilities;
          prepare_virus_ability();
        }
        if (req.responseJS.end_window)
          show_error(
            req.responseJS.end_window +
              '<br><br><a href="' +
              log_string +
              '" target="_blank">Полный лог боя</a>'
          );
        top.chatWindow.get_log();
      }
    }
  };

  req.open(
    "POST",
    _text[lang]["station_path"] + "ajax/combat/use_scroll.php",
    true
  );
  req.send({
    scroll_id: id,
    block: form_block,
    name: new_name,
    other_data: other_data,
    ix: Math.random(),
  });
}

function use_thing_name(obj_id, id) {
  if (document.getElementById("personage_name")) {
    new_name = document.getElementById("personage_name").value;
    document.getElementById("personage_name").value = "";
  } else new_name = "";
  other_data = "";
  if (document.getElementById("joker_text")) {
    other_data = document.getElementById("joker_text").value;
    document.getElementById("joker_text").value = "";
  }
  hide_name_form();
  if (!block_set) set_block(1 + Math.floor(Math.random() * 4));
  form_block = block_zone[self["points_to_block"]][block_num];

  var req = new Subsys_JsHttpRequest_Js();
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      clear_all();
      error = req.responseJS.error;
      if (error) show_error(error);
      else {
        if (req.responseJS.self) {
          show_info(req.responseJS.self);
          set_current_param(req.responseJS.self);
        }
        if (req.responseJS.scrolls) load_imps(req.responseJS.scrolls);
        if (req.responseJS.things) load_things(req.responseJS.things);
        if (req.responseJS.enemy) show_enemy_info(req.responseJS.enemy);
        if (req.responseJS.enemy_things)
          load_enemy_things(req.responseJS.enemy_things);
        else load_default_enemy_things();
        if (req.responseJS.seconds_before_end) {
          secondsBeforeEnd = req.responseJS.seconds_before_end;
        }
        if (req.responseJS.abilities) {
          virus_ability = req.responseJS.abilities;
          prepare_virus_ability();
        }
        if (req.responseJS.end_window)
          show_error(
            req.responseJS.end_window +
              '<br><br><a href="' +
              log_string +
              '" target="_blank">Полный лог боя</a>'
          );
        top.chatWindow.get_log();
      }
    }
  };

  req.open(
    "POST",
    _text[lang]["station_path"] + "ajax/combat/use_thing.php",
    true
  );
  req.send({
    thing_id: id,
    block: form_block,
    name: new_name,
    other_data: other_data,
    ix: Math.random(),
  });
}

function show_name_form(obj_id, id, onclick) {
  form_data =
    _text["rus"]["personage_name"] +
    ': <input type="text" style="width:200px;font" id="personage_name">';
  document.getElementById("f_but").onclick = onclick;
  document.getElementById("winmain").innerHTML = form_data;
  document.getElementById("ability_window").style.display = "block";
}

function show_joker_form(obj_id, id, onclick) {
  form_data =
    _text["rus"]["joker_text"] +
    ': <input type="text" style="width:200px;font" id="joker_text">';
  document.getElementById("f_but").onclick = onclick;
  document.getElementById("winmain").innerHTML = form_data;
  document.getElementById("ability_window").style.display = "block";
}

function hide_name_form() {
  document.getElementById("ability_window").style.display = "none";
}

function show_info(self) {
  is_dead = true;
  if (self["personage_id"] != undefined) {
    document.getElementById("combat_id").href =
      "/combats/logs.php?log=" + self["combat_id"];
    log_string = "/combats/logs.php?log=" + self["combat_id"];
    document.getElementById("avatar").src =
      _text[lang]["img_url"] +
      "avatars/" +
      self["sex"] +
      "/" +
      self["avatar_id"] +
      ".gif";
    document.getElementById("spacecraft").style.backgroundImage =
      "URL(" +
      _text[lang]["img_url"] +
      "crafts/" +
      self["spacecraft_img"] +
      ".gif)";
    document.getElementById("starttime").innerHTML = self["starttime"];
    document.getElementById("timeout").innerHTML = self["timeout"];
    document.getElementById("damage").innerHTML = self["damaged"];
    document.getElementById("def_points").innerHTML = self["def_points"];
    document.getElementById("attack_points").innerHTML = self["attack_points"];
    if (self["tendency"] == -2) {
      total_exp = Math.floor(
        (self["exp"] / 6) *
          (self["combat_percent"] / 100) *
          (self["personage_percent"] / 100)
      );
    } else {
      exp_combat = Math.floor((self["exp"] * self["combat_percent"]) / 100);
      exp_bonus = Math.floor(exp_combat * self["bonus"]) - exp_combat;
      exp_level = Math.floor(
        exp_combat * (1 + self["level"] * 0.05) - exp_combat
      );
      exp_virus = Math.floor(exp_combat * self["virus_level"] * 0.1);
      exp_respect = Math.floor(
        exp_combat * (500 - self["respect_count"]) * -0.001
      );
      total_exp = Math.floor(
        (exp_combat + exp_level + exp_virus + exp_respect + exp_bonus) *
          (self["personage_percent"] / 100)
      );
    }
    document.getElementById("exp").innerHTML = total_exp;
    document.getElementById("changes").innerHTML = self["changes"];
    if (self["reboot"] != 0)
      document.getElementById("reboot").style.display = "block";
    else document.getElementById("reboot").style.display = "none";
    if (self["geodriver"] != 0)
      document.getElementById("geodriver").style.display = "block";
    else document.getElementById("geodriver").style.display = "none";
    if (self["hp_current"] > 0) is_dead = false;
  } else {
    is_dead = false;
  }
}

function delete_other(id, new_name) {
  var req = new Subsys_JsHttpRequest_Js();
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      error = req.responseJS.error;
      if (error) show_error(error);
      else {
        inventory = req.responseJS.inventory;
        if (inventory) {
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
  req.send({ id: id, ix: Math.random() });
}

function injected_main() {
  let dubleSector;
  let dubleSectorPoint = 0;
  // номер поискового 386
  const poiskNom = 2; // номер поискового...
  const kakProhod = 1; // 1 = прохождение, 0 = дроп...
  const limitKont = 35; // сколько контенеров по квету до обмена
  let kolKont = 28;
  let trigger1 = 0;
  let trigger1_2 = 0;
  let trigger2 = 0;
  let trigger3 = 0;
  let trigger4 = 0;
  let trigger5 = 0;
  let triggerB = 0;
  let trigger6 = 0;
  let hod = () => {
//     clearInterval(dateInterval);
    let mainOkno = document.getElementsByName("mainWindow")[0].contentDocument;
    let panelMenu = document.getElementsByName("menuWindow")[0].contentDocument;
    let sector = mainOkno.querySelector("#sector").textContent;
    let dalshe = mainOkno.getElementById("fwd");
    let razvorot = mainOkno.getElementById("back");
    let pravo = mainOkno.getElementById("right");
    let levo = mainOkno.getElementById("left");
    let navigBtn = panelMenu.querySelector(".right img:last-of-type");
    let timeRand = Math.floor(Math.random() * 500) + 800;
    if (dubleSector !== sector) {
      dubleSector = sector;
      dubleSectorPoint = 0;
    } else if (dubleSector === sector) {
      dubleSectorPoint++;
    }

    if (dubleSectorPoint < 3) {
      if (poiskNom === 4) {
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
            pravo.click();
            setTimeout(obnovit, 1500);
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
            levo.click();
            setTimeout(obnovit, 1500);
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
            razvorot.click();
            setTimeout(obnovit, 1500);
            break;
          case "14169S":
            if (0 === trigger1) {
              levo.click();
              setTimeout(obnovit, 1500);
              trigger1++;
            } else {
              pravo.click();
              setTimeout(obnovit, 1500);
              trigger1--;
            }
            break;
          case "16169S":
            if (0 === trigger1_2) {
              levo.click();
              setTimeout(obnovit, 1500);
              trigger1_2 = 1;
            } else {
              pravo.click();
              setTimeout(obnovit, 1500);
              trigger1_2 = 0;
            }
            break;
          case "29170E":
          case "29172E":
            if (0 === trigger2) {
              levo.click();
              setTimeout(obnovit, 1500);
              trigger2 = 1;
            } else {
              dalshe.click();
              setTimeout(obnovit, 4500);
              trigger2 = 0;
            }
            break;
          case "29171E":
            if (0 === trigger3) {
              pravo.click();
              setTimeout(obnovit, 2000);
              trigger3 = 1;
            } else {
              dalshe.click();
              setTimeout(obnovit, 4000);
              trigger3 = 0;
            }
            break;
          default:
            dalshe.click();
            setTimeout(obnovit, 4000);
            break;
        }
      } else if (poiskNom === 3) {
        switch (sector) {
          case "17050N":
          case "17051E":
          case "20051S":
          case "21051E":
          case "21052N":
          case "20053N":
          case "20055N":
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
          case "23073S":
          case "23071S":
          case "24070S":
          case "24074N":
          case "24076E":
          case "24079N":
          case "24081E":
          case "26081S":
          case "24085N":
          case "24087E":
          case "28090S":
          case "28088W":
          case "26088N":
          case "24090E":
          case "25092N":
          case "24093N":
          case "24100E":
          case "26100S":
          case "27100E":
          case "29098W":
          case "28097S":
          case "28096W":
          case "30094S":
          case "30092W":
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
          case "29079W":
          case "27077N":
          case "27079E":
          case "31079S":
          case "31077S":
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
          case "27051W":
          case "26050W":
          case "25050N":
          case "24050W":
          case "23050N":
          case "24052E":
          case "25052S":
          case "26051E":
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
            pravo.click();
            setTimeout(obnovit, 1500);
            break;
          case "16050W":
          case "20050W":
          case "21050S":
          case "22051S":
          case "22052E":
          case "21053E":
          case "20057E":
          case "17057S":
          case "17058S":
          case "17061S":
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
          case "21071W":
          case "23070W":
          case "24072E":
          case "25072S":
          case "25074E":
          case "25076S":
          case "25079E":
          case "26083E":
          case "28083S":
          case "28085S":
          case "28087E":
          case "24087N":
          case "24085W":
          case "26087S":
          case "28088S":
          case "28090E":
          case "24090N":
          case "26090S":
          case "26091E":
          case "28091S":
          case "28092E":
          case "25093E":
          case "26099W":
          case "27099S":
          case "29100N":
          case "25098N":
          case "25097W":
          case "25096N":
          case "25094W":
          case "30090N":
          case "30089W":
          case "30087N":
          case "29086N":
          case "29084W":
          case "30081N":
          case "29080N":
          case "27079N":
          case "27077W":
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
          case "22054W":
          case "23054S":
          case "24053W":
          case "25053S":
          case "26054W":
          case "26051N":
          case "25052E":
          case "24052N":
          case "23050W":
          case "24050S":
          case "25050W":
          case "26050S":
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
            levo.click();
            setTimeout(obnovit, 1500);
            break;
          case "16052E":
          case "18050S":
          case "21055S":
          case "16057N":
          case "16058N":
          case "16061N":
          case "18065S":
          case "24067W":
          case "23072N":
          case "26075W":
          case "25083N":
          case "27085N":
          case "25085S":
          case "27090N":
          case "24088W":
          case "25091N":
          case "30100S":
          case "29092N":
          case "29083N":
          case "28077S":
          case "30077N":
          case "28075N":
          case "28065N":
          case "22061S":
          case "26056W":
          case "23051E":
          case "20060S":
            razvorot.click();
            setTimeout(obnovit, 1500);
            break;
          case "29170E":
          case "29172E":
          case "17058E":
          case "17061E":
          case "28085E":
          case "26090E":
            if (0 === trigger2) {
              levo.click();
              setTimeout(obnovit, 1500);
              trigger2 = 1;
            } else {
              dalshe.click();
              setTimeout(obnovit, 3500);
              trigger2 = 0;
            }
            break;
          case "20055E":
          case "17065E":
          case "26088E":
          case "31077W":
          case "21061E":
          case "21062E":
            if (0 === trigger3) {
              pravo.click();
              setTimeout(obnovit, 1500);
              trigger3 = 1;
            } else {
              dalshe.click();
              setTimeout(obnovit, 3500);
              trigger3 = 0;
            }
            break;
          default:
            dalshe.click();
            setTimeout(obnovit, 3500);
            break;
        }
      } else if (poiskNom === 2) {
        switch (sector) {
          case "1080E":
          case "2081W":
          case "3083E":
          case "2083S":
          case "5083S":
          case "5081W":
          case "4081E":
          case "6081N":
          case "6086E":
          case "7086S":
          case "8085E":
          case "9085S":
          case "12084S":
          case "12083W":
          case "10081W":
          case "9080N":
          case "9081E":
          case "10082E":
          case "13083E":
          case "14085E":
          case "15085S":
          case "16082S":
          case "12092E":
          case "14092S":
          case "14089W":
          case "11089N":
          case "11093E":
          case "15093S":
          case "15088W":
          case "10088N":
          case "10094E":
          case "16094S":
          case "16087W":
          case "9087N":
          case "9095E":
          case "15096E":
          case "16098E":
          case "15098W":
          case "13098N":
          case "12099N":
          case "11098S":
          case "13097S":
          case "11096W":
          case "9096N":
          case "8099N":
          case "8100S":
          case "8098W":
          case "7098N":
          case "4098S":
          case "4095W":
          case "2095N":
          case "2097E":
          case "5097S":
          case "6096S":
          case "7095W":
          case "5093W":
          case "6091S":
          case "7089S":
          case "6087W":
          case "2087N":
          case "1089N":
          case "3089S":
          case "4088S":
          case "4085W":
          case "2085N":
          case "4092S":
          case "3085E":
          case "5085S":
            pravo.click();
            setTimeout(hod, 2000);
            break;
          case "2080S":
          case "3081S":
          case "4081N":
          case "7085W":
          case "9084W":
          case "10083N":
          case "9081N":
          case "9080W":
          case "10081S":
          case "13082S":
          case "14083S":
          case "15082W":
          case "16081W":
          case "17081S":
          case "17086S":
          case "17095E":
          case "9095N":
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
          case "16096S":
          case "13099E":
          case "12100E":
          case "10100N":
          case "10098W":
          case "13097E":
          case "11097N":
          case "9099E":
          case "8100E":
          case "7099E":
          case "1099N":
          case "1098W":
          case "5096W":
          case "6095W":
          case "7095S":
          case "5095N":
          case "4093N":
          case "4091W":
          case "7089E":
          case "6089N":
          case "2089E":
          case "1089W":
          case "3088W":
            levo.click();
            setTimeout(hod, 2000);
            break;
          case "2086E":
          case "1083N":
          case "1081N":
          case "4080W":
          case "8081S":
          case "8084W":
          case "15080S":
          case "9086N":
          case "12090W":
          case "17098S":
          case "15099E":
          case "13096W":
          case "6100N":
          case "7096E":
          case "7088W":
          case "1090E":
          case "3092N":
            razvorot.click();
            setTimeout(hod, 2000);
            break;
          case "2083W":
          case "8085S":
          case "15098N":
          case "4092W":
            if (trigger1 === 0) {
              pravo.click();
              setTimeout(obnovit, 2000);
              trigger1 = 1;
            } else {
              dalshe.click();
              setTimeout(obnovit, 4000);
              trigger1 = 0;
            }
            break;
          case "17086E":
          case "11097W":
          case "6089W":
            if (trigger2 === 0) {
              levo.click();
              setTimeout(obnovit, 2000);
              trigger2 = 1;
            } else {
              dalshe.click();
              setTimeout(obnovit, 4000);
              trigger2 = 0;
            }
            break;
          case "15095N":
            if (trigger3 === 0) {
              pravo.click();
              setTimeout(obnovit, 2000);
              trigger3 = 1;
            } else {
              dalshe.click();
              setTimeout(obnovit, 4000);
              trigger3 = 0;
            }
            break;
          default:
            dalshe.click();
            setTimeout(obnovit, 4000);
            break;
        }
      } else if (poiskNom === 1) {
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
            pravo.click();
            setTimeout(hod, 1000+timeRand);
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
            levo.click();
            setTimeout(hod, 1000+timeRand);
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
            razvorot.click();
            setTimeout(hod, 1000+timeRand);
            break;
          case "2051S":
          case "4052E":
          case "6056E":
          case "9069W":
          case "8069E":
            if (trigger1 === 0) {
              pravo.click();
              setTimeout(hod, 1000+timeRand);
              trigger1 = 1;
            } else {
              dalshe.click();
              setTimeout(obnovit, 4000+timeRand);
              trigger1 = 0;
            }
            break;
          case "4069W":
          case "5069E":
            if (trigger2 === 0) {
              levo.click();
              setTimeout(hod, 1000+timeRand);
              trigger2 = 1;
            } else {
              dalshe.click();
              setTimeout(obnovit, 3500+timeRand);
              trigger2 = 0;
            }
            break;
          case "6056S":
            if (trigger3 === 0) {
              dalshe.click();
              setTimeout(obnovit, 3500+timeRand);
              trigger3 = 1;
            } else {
              levo.click();
              setTimeout(hod, 1000+timeRand);
              trigger3 = 0;
            }
            break;
          case "9072N":
            if (trigger6 === 0) {
              dalshe.click();
              setTimeout(obnovit, 3500+timeRand);
              trigger6 = 1;
            } else {
              pravo.click();
              setTimeout(hod, 1000+timeRand);
              trigger6 = 0;
            }
            break;
          case "6058N":
            if (trigger4 === 0) {
              dalshe.click();
              setTimeout(obnovit, 3500+timeRand);
              trigger4 = 1;
            } else {
              levo.click();
              setTimeout(hod, 1000+timeRand);
              trigger4 = 0;
            }
          case "2072N":
            if (trigger5 === 0) {
              dalshe.click();
              setTimeout(obnovit, 3500+timeRand);
              trigger5 = 1;
            } else {
              levo.click();
              setTimeout(hod, 1000+timeRand);
              trigger5 = 0;
            }
          default:
            dalshe.click();
            setTimeout(obnovit, 3500+timeRand);
            break;
        }
      }
    } else {
      dubleSectorPoint = 0;
      navigBtn.click();
      setTimeout(obnovit, 1000+timeRand);
    }
  };

  let boy = () => {
        clearTimeout()
    triggerB = 0;
    let mainOkno = document.getElementsByName("mainWindow")[0].contentDocument;
    let panelMenu = document.getElementsByName("menuWindow")[0].contentDocument;
    let scripts = mainOkno.getElementsByTagName("script").length;
    if (scripts < 8) {
      var script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.innerHTML =
        use_thing + "; " + use_scroll + "; " + use_ability + ";";
      mainOkno.getElementsByTagName("head")[0].appendChild(script);
    }
    let messageOkno = mainOkno.getElementById("infoWindow");
    let chat_top_win =
      document.getElementsByName("chatmenuWindow")[0].contentDocument;
    let chatBtnday = chat_top_win.getElementById("tabNameChat");
    let obnovRn = Math.floor(Math.random() * 500) + 1800;
    if (messageOkno && messageOkno.style.visibility === "visible") {
      let textInfoWin =
        mainOkno.getElementById("infoWindowMessage").textContent;
      let viborkaTexta = "";

      for (let t = 0; t < 2; t++) {
        viborkaTexta = viborkaTexta + textInfoWin[t];
      }

      switch (viborkaTexta) {
        case "Бо":
          panelMenu.querySelector(".right img:last-child").click();
          setTimeout(() => {
            chatBtnday.click();
          }, obnovRn);
          setTimeout(obnovit, obnovRn);
          break;
        case "Вы":
          panelMenu.querySelector(".right img:last-child").click();
          setTimeout(() => {
            chatBtnday.click();
          }, obnovRn);
          setTimeout(obnovit, obnovRn);
          break;
        case "Ож":
          panelMenu.querySelector(".right img:last-child").click();
          setTimeout(boy, 1000+obnovRn);
          break;
        default:
          setTimeout(obnovit, obnovRn);
          break;
      }
    } else {
      let mainOkno =
        document.getElementsByName("mainWindow")[0].contentDocument;
      let autoboy = mainOkno.querySelector(
        "#new_centerBlock_footer tr:nth-child(2) td:nth-child(2) img"
      );
      if(autoboy){autoboy.click()};
      setTimeout(obnovit, obnovRn);
    }
  };

  let testAuto = () => {
//     clearInterval(dateInterval);
    let mainOkno = document.getElementsByName("mainWindow")[0].contentDocument;
    let panelMenu = document.getElementsByName("menuWindow")[0].contentDocument;
    let navigBtn = panelMenu.querySelector(".right img:last-of-type");
    let iskomoe = new Array();
    let iskomoeKol = 0;
    let iskomoeName = "Контейнер с запчастями";
    let obshee = mainOkno.querySelectorAll(".item");

    let scripts = mainOkno.getElementsByTagName("script").length;

    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.innerHTML = delete_other;
    mainOkno.getElementsByTagName("head")[0].appendChild(script);

    for (var i = obshee.length - 1; i >= 0; i--) {
      var block = obshee[i];
      if (block.querySelector("h1").textContent === iskomoeName) {
        iskomoe.push(block);

        iskomoeKol++;
      }
    }
    let intervalDelet = setInterval(() => {
      if (iskomoeKol > 0) {
        var kont = iskomoe[iskomoeKol - 1];
        var delBtn = kont.querySelector("tr:nth-child(2) td:nth-child(4) img");
      } else {
        let chatOkno =
          document.getElementsByName("chatWindow")[0].contentDocument;
        let soobsheniya = chatOkno.getElementById("content_rus");
        let data = " удалил контейнеры, было " + iskomoe.length;
        var div = document.createElement("div");
        div.setAttribute("class", "postmessage");
        div.innerHTML = data;
        soobsheniya.appendChild(div);
        kolKont = iskomoeKol;
        setTimeout(obnovit, 1000);
        navigBtn.click();
        clearInterval(intervalDelet);
      }
      if (delBtn) {
        iskomoeKol--;
        console.log("удалил " + delBtn.attributes[6].textContent);
        delBtn.click();
      }
    }, 3000);
  };

  let obnovit = () => {
        clearTimeout()
    let timeRand = Math.floor(Math.random() * 500) + 1000;
//     let dateInterval = setInterval(() => {
      let mainOkno =
        document.getElementsByName("mainWindow")[0].contentDocument;
      let panelMenu =
        document.getElementsByName("menuWindow")[0].contentDocument;

      let navigBtn = panelMenu.querySelector(".right img:last-of-type");
      let sector = mainOkno.querySelector("#sector");
      if (kolKont >= limitKont && sector !== null && kakProhod === 0) {
        let trumeBtn = panelMenu.querySelector("#menu1 img:nth-child(8)");
        trumeBtn.click();
      } else if (sector != null || sector != undefined) {
        let oblomki = [
          mainOkno.querySelector("#obj_front"),
          mainOkno.querySelector("#obj_left"),
          mainOkno.querySelector("#obj_right"),
        ];
        let oblomok;
        for (var i = 0; i < oblomki.length; i++) {
          let imgObekt = oblomki[i].firstChild.src;
          var nonOblom = oblomki[i];
          if (
            nonOblom.style.display === "block" &&
            imgObekt === "http://img.starcombats.com/map/obj/chelnok_01.gif"
          ) {
            let chatOkno =
              document.getElementsByName("chatWindow")[0].contentDocument;
            let soobsheniya = chatOkno.getElementById("content_rus");
            let data = " обменник мелькнул " + sector.textContent;
            var div = document.createElement("div");
            div.setAttribute("class", "postmessage");
            div.innerHTML = data;
            soobsheniya.appendChild(div);
          }
          if (i === 0) {
            switch (imgObekt) {
              case "http://img.starcombats.com/map/obj/hunter.gif":
              case "http://img.starcombats.com/map/obj/dron01.gif":
              case "http://img.starcombats.com/map/obj/chelnok_01.gif":
                nonOblom = oblomki[i];
                if (nonOblom.style.display === "block") {
                  oblomok = nonOblom.firstChild;
                }
                break;
              default:
                if (nonOblom.style.display === "block") {
                  oblomok = nonOblom.firstChild;
                }
                break;
            }
          } else if (
            imgObekt !== "http://img.starcombats.com/map/obj/hunter.gif" &&
            imgObekt !== "http://img.starcombats.com/map/obj/dron01.gif" &&
            imgObekt !== "http://img.starcombats.com/map/obj/chelnok_01.gif"
          ) {
            nonOblom = oblomki[i];
            if (nonOblom.style.display === "block") {
              oblomok = nonOblom.firstChild;
            }
          }
        }

        let ataka = (oblomok) => {
          oblomok.click();
          setTimeout(() => {
            mainOkno =
              document.getElementsByName("mainWindow")[0].contentDocument;

            if (triggerB <= 1) {
              mainOkno.getElementById("item1").click();
            }
            setTimeout(() => {
              if (
                oblomok.src ===
                  "http://img.starcombats.com/map/obj/hunter.gif" ||
                oblomok.src ===
                  "http://img.starcombats.com/map/obj/broken_cargo.gif"
              ) {
                navigBtn.click();
                triggerB++;
              }
              setTimeout(obnovit, 2000+timeRand)
            }, timeRand);
          }, timeRand);
        };
        let ataka2 = (oblomok) => {
          oblomok.click();
          setTimeout(() => {
            let mainOkn =
              document.getElementsByName("mainWindow")[0].contentDocument;
            let activBtn;
            let activBtns = [
              mainOkn.getElementById("item3"),
              mainOkn.getElementById("item2"),
              mainOkn.getElementById("item1"),
            ];
            for (var i = 0; i < activBtns.length; i++) {
              let actBtn = activBtns[i];
              if (actBtn.textContent === "Обменять контейнеры") {
                activBtn = actBtn;
              }
            }
            if (activBtn !== null) {
              activBtn.click();
            }

            setTimeout(() => {
              if (
                oblomok.src ===
                  "http://img.starcombats.com/map/obj/hunter.gif" ||
                oblomok.src ===
                  "http://img.starcombats.com/map/obj/broken_cargo.gif"
              ) {
                navigBtn.click();
              }
            }, timeRand);
          }, timeRand);
        };

        if (!oblomok) {
          setTimeout(hod,timeRand);
        } else {
          if (
            oblomok.src === "http://img.starcombats.com/map/obj/broken_ship.gif"
          ) {
            kolKont++;
          }
          if (
            kolKont >= limitKont &&
            oblomok.src ===
              "http://img.starcombats.com/map/obj/chelnok_01.gif" &&
            kakProhod === 1
          ) {
            ataka2(oblomok);
          } else {
            ataka(oblomok);
          }
        }
      } else if (mainOkno.getElementById("achange")) {
        let mainOkno =
          document.getElementsByName("mainWindow")[0].contentDocument;
        let scripts = mainOkno.getElementsByTagName("script").length;

        if (scripts < 8) {
          var script = document.createElement("script");
          script.setAttribute("type", "text/javascript");
          script.innerHTML =
            use_thing + "; " + use_scroll + "; " + use_ability + ";";
          mainOkno.getElementsByTagName("head")[0].appendChild(script);
        }
        boy();
      } else if (mainOkno.getElementById("overall_damage_min")) {
        // clearInterval(dateInterval);
        setTimeout(() => {
          mainOkno =
            document.getElementsByName("mainWindow")[0].contentDocument;
          let gruze = mainOkno.querySelector(".cats a:last-child");
          gruze.click();
          setTimeout(() => {
            testAuto();
          }, 1000+timeRand);
        },timeRand);
      } else {
        // let navigBtn = panelMenu.querySelector(".right img:last-of-type");
        // navigBtn.click();
        setTimeout(obnovit, 5000+timeRand);
      }
//     }, timeRand);
      console.log('obnov')
  };
  setTimeout(obnovit, 5000);
}
