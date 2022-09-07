module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        if (!interaction.isCommand()) return;

	    const command = interaction.client.commands.get(interaction.commandName);

	    if (!command) return;



	    try {
		    command.execute(interaction);
	    } catch (error) {
		    console.error(error);
		    interaction.reply({ content: 'При выполнении этой команды произошла ошибка!', ephemeral: true });
	    }
	},
};