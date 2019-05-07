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
    if($.inidb.FileExists(nanoleafHandler)==false){
        $.inidb.AddFile(nanoleafHandler);
        $.inidb.SetBoolean(nanoleafHandler, internal, neu, true)
    }        
    $.bind('command', function(event) {
        var command = event.getCommand(),
            arg = String(event.getArguments()),
            user = event.getSender().toLowerCase();
            action = arg[0];
            value = arg[1];
            value2 = arg[2];

        if(command.equalsIgnoreCase('nanoleaf')){
            if(action.equalsIgnoreCase('set')){
                $.inidb.set(nanoleafHandler, ipaddress, )
            }
            if($.inidb.GetBoolean(nanoleafHandler, internal, neu)==true){
                $.say("")
            }
            var ip_address = $.inidb.get(nanoleafHandler, ipaddress)
            var accessToken = $.inidb.get(nanoleafHandler, token)
            var request = new XMLHttpRequest();

            
        }
    })
    $.bind('initReady', function(){
        $.registerChatCommand('./custom/nanoleafHandler.js','nanoleaf',0);
        $.registerChatSubCommand('nanoleaf','set',0);
        $.registerChatSubCommand('nanoleaf','on',0);
        $.registerChatSubCommand('nanoleaf','off',0);
        $.registerChatSubCommand('nanoleaf','brightness',0);
        $.registerChatSubCommand('nanoleaf','hue',0);
        $.registerChatSubCommand('nanoleaf','sat',0);
        $.registerChatSubCommand('nanoleaf','ct',0);
        $.registerChatSubCommand('nanoleaf','effects',0);
    })
})
