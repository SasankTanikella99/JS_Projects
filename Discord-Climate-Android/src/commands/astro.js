const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const { fetchForecast } = require('../requests/forecast');

const data = new SlashCommandBuilder()
    .setName('astro')
    .setDescription('Resplies with the astronomical information!')
    .addStringOption((option) => {
        return option
            .setName('location')
            .setDescription("Set your location, it can be a city, a zip/postal code, or a latitude and longitude.")
            .setRequired(true)
    })
   

async function execute(interaction) {
    await interaction.deferReply();


    const location = interaction.options.getString('location');
    try {
        const { weatherData, locationName } = await fetchForecast(location)

        const embed = new EmbedBuilder()
            .setColor(0x3f704d)
            .setTitle(`Astronomical forecast for ${locationName} ...`)

            .setTimestamp()
            .setFooter(
                "This is from the API by weatherapi.com",
            )

        for (const day of weatherData) {
            embed.addFields({
                name: day.date,
                value: `🌄 Sunrise: ${day.sunriseTime}\n🌇 Sunset: ${day.sunsetTime}\n🌖 Moonrise: ${day.moonriseTime}\nMoon
                🌒
                Moonset: ${day.moonsetTime}`
            })
        }
        await interaction.editReply({
            embeds: [embed],
        })
    } catch (error) {
        await interaction.editReply(error)
    }



}

module.exports = {
    data,
    execute,
}
