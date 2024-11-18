const exercises = [
  {
    title: "Cirkel om elke vingertop",
    description: "Teken een cirkel rond elke vingertop met een straal van 10 pixels. Verwijder de oude code en plak de nieuwe code in de code-editor ter vervanging. Klik vervolgens op [Run] om het uit te voeren.",
    code: `
ctx.beginPath();
ctx.arc(x, y, 10, 0, 2 * Math.PI);
ctx.strokeStyle = 'blue';
ctx.lineWidth = 2;
ctx.stroke();
`
  },
  {
    title: "Verbind vingertoppen",
    description: "Verbind de vingertoppen van elke vinger met een lijn.  Verwijder de oude code en plak de nieuwe code in de code-editor ter vervanging. Klik vervolgens op [Run] om het uit te voeren.",
    code: `
ctx.beginPath();
ctx.moveTo(landmarks[4].x * canvasElement.width, landmarks[4].y * canvasElement.height);
for (let j = 8; j <= 20; j += 4) {
  ctx.lineTo(landmarks[j].x * canvasElement.width, landmarks[j].y * canvasElement.height);
}
ctx.strokeStyle = 'green';
ctx.lineWidth = 3;
ctx.stroke();
`
  },
  {
    title: "Rechthoek rond vingertoppen",
    description: "Teken een rechthoek rond elke vingertop.  Verwijder de oude code en plak de nieuwe code in de code-editor ter vervanging. Klik vervolgens op [Run] om het uit te voeren.",
    code: `
const rectSize = 20;
ctx.beginPath();
ctx.rect(x - rectSize / 2, y - rectSize / 2, rectSize, rectSize);
ctx.strokeStyle = 'purple';
ctx.lineWidth = 2;
ctx.stroke();
`
  },
  {
    title: "Verander de kleur van de cirkel",
    description: "Pas de kleur van de cirkel aan. Experimenteer met verschillende kleuren door de waarde van `strokeStyle` te wijzigen. Verwijder de oude code en plak de nieuwe code in de code-editor ter vervanging. Klik vervolgens op [Run] om het uit te voeren.",
    code: `
ctx.beginPath();
ctx.arc(x, y, 10, 0, 2 * Math.PI);
ctx.strokeStyle = 'red'; // Verander de kleur hier
ctx.lineWidth = 2;
ctx.stroke();
`
  },
  {
    title: "Teken een letter tussen duim en wijsvinger",
    description: "Teken de letter 'A' wanneer de afstand tussen de duim (landmark 4) en de wijsvinger (landmark 8) kleiner is dan 50 pixels. Experimenteer met deze waarde door bijvoorbeeld 100 in te stellen. Verwijder de oude code en plak de nieuwe code in de code-editor ter vervanging. Klik daarna op [Run] om het uit te voeren.",
    code: `
const thumbX = landmarks[4].x * canvasElement.width;
const thumbY = landmarks[4].y * canvasElement.height;
const indexX = landmarks[8].x * canvasElement.width;
const indexY = landmarks[8].y * canvasElement.height;

const distance = Math.sqrt(Math.pow(thumbX - indexX, 2) + Math.pow(thumbY - indexY, 2));

if (distance < 50) {
  ctx.font = '30px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('A', (thumbX + indexX) / 2, (thumbY + indexY) / 2);
}
`
  }
];
