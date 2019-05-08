/**
 * This Script provides a twitch command that will control your Nanoleaf.
 * 
 * Work In Progress
 * 
 * @author MatBuc
 *
 * NOTE: 
 */

(function() {
    if ($.inidb.FileExists(nanoleafHandler)==false) {
        $.inidb.set(nanoleafHandler, port, '16021');
        $.inidb.set(nanoleafHandler, setup-done, false);
    }

    $.bind('command', function(event) {
        var command = event.getCommand(),
            arg = String(event.getArguments()),
            user = event.getSender().toLowerCase();
        var action = arg[0];
        var value = arg[1];

        if(command.equalsIgnoreCase('nanoleaf')){
            if (action.equalsIgnoreCase('setup')){
                value2 = arg[2];
                if(value.equalsIgnoreCase('ip')){
                    $.inidb.set(nanoleafHandler, ipaddress, value2);
                }e
                    break;lse if(value.equalsIgnoreCase('token')){
                    $.inidb.set(nanoleafHandler, token, value2);
                }else if(value.equalsIgnoreCase('port')){
                    $.inidb.set(nanoleafHandler, port, value2);
                }else{
                    $.say('Usage: !nanoleaf setup <ip/token> <value>');
                }
                if($.inibd.exists(nanoleafHandler, ipaddress)==true && $.inidb.exists(nanoleafHandler, token)==true){
                        $.inidb.SetBoolean(nanoleafHandler, internal, setup-done, true);
                }
            } else if($.inidb.GetBoolean(nanoleafHandler, internal, setup-done)==false){
                $.say('Before you can control your nanoleaf lights, you must first run the setup.');
                $.say('Use for setup: !nanoleaf setup ip <IP address> and !nannoleaf setup token <API-token>');
                $.say('To get your API token, execute the following command in the console and shortly before that press the power button of your nanoleaf for 5-7 seconds.');
                if($.inidb.exists(nanoleafHandler,ipaddress)==true) {
                    $.say('curl -v -X POST http://' + $.inidb.get(nanoleafHandler,ipaddress) + ':' + $.inidb.get(nanoleafHandler,port) +'/api/v1/new');
                } else {
                    $.say('curl -v -X POST http://<IP address>:16021/api/v1/new');
                }
            }
            var ip_address = $.inidb.get(nanoleafHandler, ipaddress);
            var port = $.inidb.get(nanoleafHandler, port);
            var accessToken = $.inidb.get(nanoleafHandler, token);
            var requestG = new XMLHttpRequest();
            var requestP = new XMLHttpRequest();
            if (action.equalsIgnoreCase('toggle')) {
                //toggle Lights 
                requestG.open('GET', 'http://' + ip_address + ':' + port + '/api/v1/' + accessToken + '/state/on', false);
                requestG.send();
                requestG.addEventListener('readystatechange', processRequest, false);
                requestG.onreadystatechange = processRequest;
                function processRequest(e) {
                    if (requestG.readyState == 4 && requestG.status == 200) {
                        var resp = JSON.parse(requestG.responseText);
                        valueP != resp.value
                        requestP.open('PUT', 'http://' + ip_address + ':' + port + '/api/v1/' + accessToken + '/state/on', false);
                        requestP.send({"value":valueP});
                    }
                }
            } else if (action.equalsIgnoreCase('brightness')) {
                //set Breightness
            } else if (action.equalsIgnoreCase('hue')) {
                //set hue
            } else if (action.equalsIgnoreCase('sat')) {
                //set Saturation
            } else if (action.equalsIgnoreCase('ct')) {
                //set Color Temperature
            } else if (action.equalsIgnoreCase('effect')) {
                //set Effect
            } else {
                $.say('Usage: !nanoleaf <brightness|hue|sat|ct|effect> <value>');
            }
        }
    })
    $.bind('initReady', function(){
        $.registerChatCommand('./custom/nanoleafHandler.js','nanoleaf',2);
        $.registerChatSubCommand('nanoleaf','setup',0);
        $.registerChatSubCommand('nanoleaf','on',1);
        $.registerChatSubCommand('nanoleaf','off',1);
        $.registerChatSubCommand('nanoleaf','toggle',1);
        $.registerChatSubCommand('nanoleaf','brightness',2);
        $.registerChatSubCommand('nanoleaf','hue',2);
        $.registerChatSubCommand('nanoleaf','sat',2);
        $.registerChatSubCommand('nanoleaf','ct',2);
        $.registerChatSubCommand('nanoleaf','effect',2);
    })
})