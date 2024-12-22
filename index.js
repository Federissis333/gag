const { Client, GatewayIntentBits, AttachmentBuilder } = require("discord.js");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.content === "!perfil") {
    try {
      // Dimensões da imagem final
      const canvas = createCanvas(1024, 768);
      const ctx = canvas.getContext("2d");

      // Carregar a imagem de fundo
      const background = await loadImage("./background.png"); // Substitua pelo caminho correto
      ctx.drawImage(background, 0, 0, canvas.width, 300); // Fundo no topo

      // Mensagem abaixo do banner
      ctx.fillStyle = "#d1d1d1";
      ctx.fillRect(0, 300, canvas.width, 70); // Fundo da mensagem
      ctx.fillStyle = "#000000";
      ctx.font = "25px Arial";
      ctx.fillText("Digite !sobremim para mudar o seu sobremim", 50, 345);

      // Cor de fundo para as caixas
      ctx.fillStyle = "#d1d1d1";
      ctx.fillRect(50, 380, 924, 350); // Caixa principal

      // Espaços para os ícones e texto à esquerda
      const items = [
        { icon: "💰", label: "Coins:", value: "250" },
        { icon: "⭐", label: "Level:", value: "12" },
        { icon: "🏅", label: "Badge:", value: "Gold" },
        { icon: "👍", label: "Rep:", value: "150" },
      ];

      const startX = 80;
      let startY = 400;

      items.forEach(({ icon, label, value }) => {
        ctx.fillStyle = "#0074cc";
        ctx.fillRect(startX, startY, 60, 60); // Fundo do ícone
        ctx.fillStyle = "#ffffff";
        ctx.font = "40px Arial";
        ctx.fillText(icon, startX + 15, startY + 45); // Ícone
        ctx.fillStyle = "#000000";
        ctx.font = "30px Arial";
        ctx.fillText(label, startX + 80, startY + 40); // Texto do rótulo
        ctx.fillText(value, startX + 300, startY + 40); // Valor
        startY += 80;
      });

      // Avatar acima do username
      const avatar = await loadImage(
        message.author.displayAvatarURL({ extension: "png" })
      ); // Avatar do usuário
      const avatarX = 820;
      const avatarY = 380;
      const avatarSize = 100;

      ctx.save();
      ctx.beginPath();
      ctx.arc(
        avatarX + avatarSize / 2,
        avatarY + avatarSize / 2,
        avatarSize / 2,
        0,
        Math.PI * 2
      ); // Criar avatar circular
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
      ctx.restore();

      // Nome do usuário abaixo do avatar
      ctx.fillStyle = "#000000";
      ctx.font = "35px Arial";
      ctx.fillText(message.author.username, 820, 520); // Nome do usuário

      // Converter para imagem e enviar
      const attachment = new AttachmentBuilder(canvas.toBuffer(), {
        name: "profile.png",
      });
      message.reply({ files: [attachment] });
    } catch (error) {
      console.error("Erro ao gerar o perfil:", error);
      message.reply(
        "Ocorreu um erro ao gerar seu perfil. Tente novamente mais tarde."
      );
    }
  }
});

client.login(
  "MTMxOTcwNjg0ODA5NzYwMzY1NA.G8CJ9O.u2uSb9K3QxGZv_MKiaHyXnQ25mVvnD6IwAp0pA"
); // Substitua pelo token do seu bot
