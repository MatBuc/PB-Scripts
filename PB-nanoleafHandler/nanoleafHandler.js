/**
 * This Script provides a twitch command that will control your Nanoleaf.
 * 
 * Work In Progress
 * 
 * @author MatBuc
 *
 */

(function () {
    if ($.inidb.FileExists(nanoleafHandler) === false) {
        $.inidb.set(nanoleafHandler, port, '16021');
        $.inidb.set(nanoleafHandler, setup-done, false);
    }

    function request(type, dest, data) {
        var ip_address = $.inidb.get(nanoleafHandler, ipaddress),
            port = $.inidb.get(nanoleafHandler, port),
            accessToken = $.inidb.get(nanoleafHandler, token);
    } 

    $.bind('command', function (event) {
        var command = event.getCommand(),
            arg = String(event.getArguments()),
            user = event.getSender().toLowerCase(),
            action = arg[0],
            value = arg[1],
            value2 = arg[2];

        if (command.equalsIgnoreCase('nanoleaf')) {
            if (action.equalsIgnoreCase('setup')) {
                if (value.equalsIgnoreCase('ip')) {
                    $.inidb.set(nanoleafHandler, ipaddress, value2);
                } else if (value.equalsIgnoreCase('token')) {
                    $.inidb.set(nanoleafHandler, token, value2);
                } else if (value.equalsIgnoreCase('port')) {
                    $.inidb.set(nanoleafHandler, port, value2);
                } else {
                    $.say('Usage: !nanoleaf setup <ip/token> <value>');
                }
                if ($.inibd.exists(nanoleafHandler, ipaddress) && $.inidb.exists(nanoleafHandler, token)) {
                    $.inidb.SetBoolean(nanoleafHandler, internal, setup-done, true);
                }
            } else if ($.inidb.GetBoolean(nanoleafHandler, internal, setup-done) === false) {
                $.say('Before you can control your nanoleaf lights, you must first run the setup.');
                $.say('Use for setup: !nanoleaf setup ip <IP address> and !nanoleaf setup token <API-token>');
                $.say('To get your API token, execute the following command in the console and shortly before that press the power button of your nanoleaf for 5-7 seconds.');
                if ($.inidb.exists(nanoleafHandler, ipaddress)) {
                    $.say('curl -v -X POST http://' + $.inidb.get(nanoleafHandler, ipaddress) + ':' + $.inidb.get(nanoleafHandler, port) +'/api/v1/new');
                } else {
                    $.say('curl -v -X POST http://<IP address>:16021/api/v1/new');
                }
            } else if ($.isOnline('MatBuc')) {
                var ip_address = $.inidb.get(nanoleafHandler, ipaddress);
                var port = $.inidb.get(nanoleafHandler, port);
                var accessToken = $.inidb.get(nanoleafHandler, token);
                var requestG = new XMLHttpRequest();
                var requestP = new XMLHttpRequest();
                if (action.equalsIgnoreCase('toggle')) {
                    requestG.open('GET', 'http://' + ip_address + ':' + port + '/api/v1/' + accessToken + '/state/on', true);
                    requestG.send();
                    requestG.addEventListener('readystatechange', processRequest, false);
                    requestG.onreadystatechange = processRequest;
                    function processRequest(e) {
                        if (requestG.readyState == 4 && requestG.status == 200) {
                            var resp = JSON.parse(requestG.responseText);
                            if (value === undefined) {
                                var valueP !== resp.value;
                            } else if (value.equalsIgnoreCase('on') && resp.value !== true) {
                                var valueP = true;
                            } else if (value.equalsIgnoreCase('on') && resp.value === true) {
                                $.say('The Nanoleaf are already on.');
                            } else if (value.equalsIgnoreCase('off') && resp.value !== false) {
                                var valueP = false;
                            } else if (value.equalsIgnoreCase('on') && resp.value === false) {
                                $.say('The Nanoleaf are already off.');
                            } else {
                                $.say('Usage: !nanoleaf toggle [on/off]');
                            }
                        }
                        if (valueP !== undefined) {
                            requestP.open('PUT', 'http://' + ip_address + ':' + port + '/api/v1/' + accessToken + '/state/on', false);
                            requestP.send({"value":valueP});
                            if (valueP === true) {
                                var NLstate = 'on';
                            } else {
                                var NLstate = 'off';
                            }
                            $.say('Nanoleaf switched ' + NLstate);
                        }
                    }
                } else if (action.equalsIgnoreCase('brightness')) {
                    requestG.open('GET', 'http://' + ip_address + ':' + port + '/api/v1/' + accessToken + '/state/brightness', true);
                    requestG.send();
                    requestG.addEventListener('readystatechange', processRequest, false);
                    requestG.onreadystatechange = processRequest;
                    function processRequest(e) {
                        if (requestG.readyState == 4 && requestG.status == 200) {
                            var resp = JSON.parse(requestG.responseText);
                            if (value === undefined) {
                                $.say('Brightness of the Nanoleaf: ' + resp.value);
                            } else if (/[0-9]+/i.test(value) && value == resp.value) {
                                $.say('Brightness of Nanoleaf is already set to ' + resp.value);
                            } else if (/[0-9]+/i.test(value) && value > resp.max) {
                                $.say('Brightness must not exceed ' + resp.max);
                            } else if (/[0-9]+/i.test(value) && value > resp.min) {
                                $.say('Brightness must be at least ' + resp.min);
                            } else if (/[0-9]+/i.test(value)) {
                                var valueP = value;
                            } else {
                                $.say('Usage: !nanoleaf brightness <' + resp.min + '-' + resp.max + '>');
                            }
                        }
                        if (valueP !== undefined) {
                            requestP.open('PUT', 'http://' + ip_address + ':' + port + '/api/v1/' + accessToken + '/state/brightness', false);
                            requestP.send({"value":valueP});
                            $.say('Brightness set to ' + valueP);
                        }
                    }
                } else if (action.equalsIgnoreCase('hue')) {
                    requestG.open('GET', 'http://' + ip_address + ':' + port + '/api/v1/' + accessToken + '/state/hue', true);
                    requestG.send();
                    requestG.addEventListener('readystatechange', processRequest, false);
                    requestG.onreadystatechange = processRequest;
                    function processRequest(e) {
                        if (requestG.readyState == 4 && requestG.status == 200) {
                            var resp = JSON.parse(requestG.responseText);
                            if (value === undefined) {
                                $.say('Hue of the Nanoleaf: ' + resp.value);
                            } else if (/[0-9]+/i.test(value) && value == resp.value) {
                                $.say('Hue of Nanoleaf is already set to ' + resp.value);
                            } else if (/[0-9]+/i.test(value) && value > resp.max) {
                                $.say('Hue must not exceed ' + resp.max);
                            } else if (/[0-9]+/i.test(value) && value > resp.min) {
                                $.say('Hue must be at least ' + resp.min);
                            } else if (/[0-9]+/i.test(value)) {
                                var valueP = value;
                            } else {
                                $.say('Usage: !nanoleaf hue <' + resp.min + '-' + resp.max + '>');
                            }
                        }
                        if (valueP !== undefined) {
                            requestP.open('PUT', 'http://' + ip_address + ':' + port + '/api/v1/' + accessToken + '/state/hue', false);
                            requestP.send({"value":valueP});
                            $.say('Hue set to ' + valueP);
                        }
                    }
                } else if (action.equalsIgnoreCase('sat')) {
                    requestG.open('GET', 'http://' + ip_address + ':' + port + '/api/v1/' + accessToken + '/state/sat', true);
                    requestG.send();
                    requestG.addEventListener('readystatechange', processRequest, false);
                    requestG.onreadystatechange = processRequest;
                    function processRequest(e) {
                        if (requestG.readyState == 4 && requestG.status == 200) {
                            var resp = JSON.parse(requestG.responseText);
                            if (value === undefined) {
                                $.say('Saturation of the Nanoleaf: ' + resp.value);
                            } else if (/[0-9]+/i.test(value) && value == resp.value) {
                                $.say('Saturation of Nanoleaf is already set to ' + resp.value);
                            } else if (/[0-9]+/i.test(value) && value > resp.max) {
                                $.say('Saturation must not exceed ' + resp.max);
                            } else if (/[0-9]+/i.test(value) && value > resp.min) {
                                $.say('Saturation must be at least ' + resp.min);
                            } else if (/[0-9]+/i.test(value)) {
                                var valueP = value;
                            } else {
                                $.say('Usage: !nanoleaf sat <' + resp.min + '-' + resp.max + '>');
                            }
                        }
                        if (valueP !== undefined) {
                            requestP.open('PUT', 'http://' + ip_address + ':' + port + '/api/v1/' + accessToken + '/state/sat', false);
                            requestP.send({"value":valueP});
                            $.say('Saturation set to ' + valueP);
                        }
                    }
                } else if (action.equalsIgnoreCase('ct')) {
                    requestG.open('GET', 'http://' + ip_address + ':' + port + '/api/v1/' + accessToken + '/state/ct', true);
                    requestG.send();
                    requestG.addEventListener('readystatechange', processRequest, false);
                    requestG.onreadystatechange = processRequest;
                    function processRequest(e) {
                        if (requestG.readyState == 4 && requestG.status == 200) {
                            var resp = JSON.parse(requestG.responseText);
                            if (value === undefined) {
                                $.say('Color Temperature of the Nanoleaf: ' + resp.value);
                            } else if (/[0-9]+/i.test(value) && value == resp.value) {
                                $.say('Color Temperature of Nanoleaf is already set to ' + resp.value);
                            } else if (/[0-9]+/i.test(value) && value > resp.max) {
                                $.say('Color Temperature must not exceed ' + resp.max);
                            } else if (/[0-9]+/i.test(value) && value > resp.min) {
                                $.say('Color Temperature must be at least ' + resp.min);
                            } else if (/[0-9]+/i.test(value)) {
                                var valueP = value;
                            } else {
                                $.say('Usage: !nanoleaf ct <' + resp.min + '-' + resp.max + '>');
                            }
                        }
                        if (valueP !== undefined) {
                            requestP.open('PUT', 'http://' + ip_address + ':' + port + '/api/v1/' + accessToken + '/state/ct', false);
                            requestP.send({"value":valueP});
                            $.say('Color Temperature set to ' + valueP);
                        }
                    }
                } else if (action.equalsIgnoreCase('effect')) {
                    requestG.open('GET', 'http://' + ip_address + ':' + port + '/api/v1/' + accessToken + '/effects', true);
                    requestG.send();
                    requestG.addEventListener('readystatechange', processRequest, false);
                    requestG.onreadystatechange = processRequest;
                    function processRequest(e) {
                        if (requestG.readyState == 4 && requestG.status == 200) {
                            var resp = JSON.parse(requestG.responseText);
                            var effects = resp.effectsList;
                            if (value === undefined) {
                                $.say('Effect currently set: ' + resp.select);
                            } else if (value.equalsIgnoreCase('list')) {
                                $.say('Effects available: ' + effects.sort().join(', '));
                            } else if (value.equalsIgnoreCase(resp.select)) {
                                $.say('Effect "' + resp.select + '" already set.');
                            } else if (effects.equalsIgnoreCase.indexOf(value) == -1) {
                                $.say('No effect named "' + value + '" found!');
                            } else {
                                var valueP = effects[effects.findIndex(item => value.toLowerCase() === item.toLowerCase())];
                            }
                        }
                        if (valueP !== undefined) {
                            requestP.open('PUT', 'http://' + ip_address + ':' + port + '/api/v1/' + accessToken + '/effects', false);
                            requestP.send({"select":valueP});
                            $.say('Effect set to ' + valueP);
                        }
                    }
                } else {
                    $.say('Usage: !nanoleaf <brightness|hue|sat|ct|effect> <value>');
                }
            }
        }
    })
    $.bind('initReady', function () {
        $.registerChatCommand('./custom/nanoleafHandler.js','nanoleaf',2);
        $.registerChatSubCommand('nanoleaf','setup',0);
        $.registerChatSubCommand('nanoleaf','toggle',1);
        $.registerChatSubCommand('nanoleaf','brightness',2);
        $.registerChatSubCommand('nanoleaf','hue',2);
        $.registerChatSubCommand('nanoleaf','sat',2);
        $.registerChatSubCommand('nanoleaf','ct',2);
        $.registerChatSubCommand('nanoleaf','effect',2);
    })
})
