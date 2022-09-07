module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Готов к работе: ${client.user.tag}`);
	},
};