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
    $.bind('command', function(event) {
        var command = event.getCommand(),
            arg = String(event.getArguments()),
            user = event.getSender().toLowerCase();

        if(command.equalsIgnoreCase('nanoleaf')){
            var ip_address = ''
            var accessToken = ''
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
