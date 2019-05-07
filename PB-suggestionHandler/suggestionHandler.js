/**
 * suggestionHandler.js
 *
 * This script provides a twitch and discord command that will post an embed with a message into a hardcoded discord channel.
 *
 * NOTE: The discord channel name is hardcoded and must be adjusted
 * Script must be in /scripts/custom/ to work
 *
 * @author MatBuc
 */
(function() {
    $.bind('command', function(event) {
        var command = event.getCommand(),
            arg = String(event.getArguments()),
            user = event.getSender().toLowerCase();

        if(command.equalsIgnoreCase('suggestion')) {
            var target = $.twitch.GetChannel(user);
            var targetLogo = String(target.getString("logo"));
            
            if(arg=="") {
                $.say("Usage: !note text here");
                return;
            }
            
            message = new Packages.sx.blah.discord.util.EmbedBuilder()
                .withTitle("Vorschlag von " + user )
                .withColor(204,204,0)
                .withDesc(arg)
                .withTimestamp(Date.now())
                .withFooterText(user)
                .withFooterIcon(targetLogo)
            .build();
<<<<<<< HEAD
            $.discordAPI.sendMessageEmbed("vorschläge", message);//** change moderator-room to whatever channel you want **//
=======
            $.discordAPI.sendMessageEmbed("vorschläge",message);//** change moderator-room to whatever channel you want **//
>>>>>>> 47ce32c812aaeb1c76e2e8da3b162de48865297a
            $.say("Suggestion saved!");
        }
    });
    
    $.bind('discordChannelCommand', function(event) {
        var command = event.getCommand(),
            arg = event.getArgs(),
            channel = event.getChannel(),
            sender = event.getSender();

        if(command.equalsIgnoreCase('suggestion')){

            if(arg=="") {
                $.discord.say(channel, "Usage: !suggestion text here");
                return;
            }

            message = new Packages.sx.blah.discord.util.EmbedBuilder()
                .withTitle("Vorschlag von " + sender )
                .withColor(204,204,0)
                .withDesc(arg)
                .withTimestamp(Date.now())
                .withFooterText(sender)
<<<<<<< HEAD
                .withFooterIcon(sender.getProfilePicture())
            .build();
            $.discordAPI.sendMessageEmbed("vorschläge", message);
=======
                .withFooterIcon(targetLogo)
            .build();
            $.discordAPI.sendMessageEmbed("vorschläge",message);
>>>>>>> 47ce32c812aaeb1c76e2e8da3b162de48865297a
            $.discord.say(channel, "Suggestion saved!");
        }
    });

    $.bind('initReady', function(){
        $.registerChatCommand('./custom/suggestionHandler.js', 'suggestion', 7);//Permission level: 2 (Moderator), change to 1 for Admin or 0 for Caster
        $.discord.registerCommand('./custom/suggestionHandler.js', 'suggestion', 0);
    });
})();