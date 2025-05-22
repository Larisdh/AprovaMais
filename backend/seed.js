const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json"); // certifique-se que está correto

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const perguntas = [
  {
    "textos": ["(UFPE) Ao dizer onde uma espécie pode ser encontrada e o que faz no lugar onde vive, estamos informando respectivamente:"],
    "alternativas": [
        "Nicho ecológico e habitat",
        "Habitat e nicho ecológico",
        "Habitat e biótopo",
        "Nicho ecológico e ecossistema",
        "Habitat e ecossistema"
    ],
    "correta": 1,
    "materia": "biologia",
    "explicacao": "Habitat é o local onde a espécie vive, enquanto nicho ecológico é o papel que ela desempenha nesse ambiente."
},
{
    "textos": ["(PUC) Em uma floresta ocorrem três espécies de árvores, igualmente bem-sucedidas e numerosas. Essas árvores constituem:"],
    "alternativas": [
        "Três populações",
        "Um ecossistema",
        "Duas comunidades",
        "Três comunidades",
        "Uma população"
    ],
    "correta": 0,
    "materia": "biologia",
    "explicacao": "Cada espécie forma uma população distinta, portanto são três populações convivendo no mesmo ambiente."
},
{
    "textos": ["Considere as seguintes definições:\nI. Conjunto de todos os indivíduos de uma mesma espécie, vivendo em uma mesma área em um mesmo intervalo de tempo;\nII. Conjunto de todas as populações que ocorrem em uma determinada área;\nIII. Conjunto de todos os ecossistemas terrestres.\nAssinale a opção correta:"],
    "alternativas": [
        "População, comunidade e bioma",
        "Raça, biocenose e biosfera",
        "Tribo, ecossistema e biocenose",
        "População, comunidade e biosfera"
    ],
    "correta": 3,
    "materia": "biologia",
    "explicacao": "As definições correspondem, respectivamente, a população, comunidade e biosfera."
},
{
    "textos": ["(CESGRANRIO) Um ecossistema tanto terrestre como aquático se define:"],
    "alternativas": [
        "Exclusivamente por todas as associações de seres vivos",
        "Pelos fatores ambientais, especialmente climáticos",
        "Pela interação de todos os seres vivos",
        "Pela interação dos fatores físicos e químicos",
        "Pela interação dos fatores abióticos e bióticos"
    ],
    "correta": 4,
    "materia": "biologia",
    "explicacao": "Ecossistemas são definidos pela interação entre os componentes vivos (bióticos) e não vivos (abióticos)."
},
{
    "textos": ["(FATEC) Observe a cadeia alimentar: Capim → preá → lobo guará → onça. Podemos dizer que:"],
    "alternativas": [
        "O preá é o consumidor primário e, portanto, representa o primeiro nível trófico.",
        "O lobo guará e a onça ocupam o terceiro e o quarto níveis tróficos, respectivamente.",
        "O lobo guará é consumidor terciário e representa o segundo nível trófico.",
        "O capim é o produtor e representa o segundo nível trófico.",
        "A onça é consumidor terciário e representa o terceiro nível trófico."
    ],
    "correta": 1,
    "materia": "biologia",
    "explicacao": "Na cadeia, capim (produtor), preá (consumidor primário), lobo guará (consumidor secundário) e onça (consumidor terciário)."
},
{
    "textos": ["(ENEM) Cada espécie de ser vivo apresenta um modo de vida único e peculiar no ambiente em que vive, com atividades como tipo de alimento, reprodução, moradia, hábitos, inimigos naturais e estratégias de sobrevivência. Este conjunto de atividades denomina-se:"],
    "alternativas": [
        "Comunidade",
        "População",
        "Habitat",
        "Nicho ecológico",
        "Ecossistema"
    ],
    "correta": 3,
    "materia": "biologia",
    "explicacao": "Nicho ecológico refere-se ao conjunto de atividades e funções que a espécie desempenha no ecossistema, incluindo alimentação, reprodução e interações com outras espécies."
},
{
    "textos": ["O estudo da comunidade biótica do ecossistema marinho de uma determinada faixa litorânea revelou uma teia alimentar. Pode-se afirmar que ocupam o segundo nível trófico nessa teia alimentar:"],
    "alternativas": [
        "Algas marinhas e crustáceos",
        "Golfinhos e moluscos",
        "Moluscos e gaivotas",
        "Crustáceos e peixes",
        "Peixes e golfinhos"
    ],
    "correta": 3,
    "materia": "biologia",
    "explicacao": "O segundo nível trófico é ocupado pelos consumidores primários, que se alimentam dos produtores (como as algas). Crustáceos e peixes se alimentam dessas algas e, portanto, estão nesse nível."
},
{
    "textos": ["Considere as seguintes afirmativas sobre a dinâmica de populações:\nI. Uma população em crescimento rápido frequentemente possui grande proporção de indivíduos velhos.\nII. Uma população estacionária possui distribuição uniforme das classes de idade.\nIII. Uma população em declínio frequentemente possui uma grande proporção de indivíduos velhos.\nIV. Uma população em crescimento rápido frequentemente possui uma grande proporção de indivíduos jovens.\nV. Uma população em declínio frequentemente possui uma grande proporção de indivíduos jovens.\nAssinale a alternativa correta:"],
    "alternativas": [
        "II, III e IV",
        "I, II e V",
        "II, III e V",
        "II, III e IV"
    ],
    "correta": 3,
    "materia": "biologia",
    "explicacao": "Populações em crescimento têm muitos indivíduos jovens; as estacionárias possuem equilíbrio etário; populações em declínio têm muitos indivíduos velhos. Assim, II, III e IV estão corretas."
},
{
    "textos": ["As mudanças climáticas impactam os ecossistemas do Brasil, afetando a fotossíntese em plantas e quimiossíntese dos microrganismos. Como essas alterações podem afetar o metabolismo energético em relação aos componentes celulares?"],
    "alternativas": [
        "Reduzindo a produção de ATP",
        "Aumentando a produção de proteínas",
        "Diminuindo a síntese de DNA",
        "Aumentando a taxa de respiração celular"
    ],
    "correta": 0,
    "materia": "biologia",
    "explicacao": "Alterações na fotossíntese e quimiossíntese reduzem a produção de energia, resultando em menor geração de ATP, essencial para o metabolismo celular."
},
{
    "textos": ["Sobre a relação entre habitat e nicho ecológico, é correto afirmar:"],
    "alternativas": [
        "Habitat é o papel funcional da espécie no ecossistema",
        "Nicho ecológico é o local físico onde a espécie vive",
        "Habitat refere-se ao local físico e nicho ecológico ao papel funcional",
        "Ambos são sinônimos"
    ],
    "correta": 2,
    "materia": "biologia",
    "explicacao": "Habitat é o local onde uma espécie vive, enquanto o nicho ecológico corresponde ao papel que ela desempenha nesse ambiente."
},
{
    "textos": ["(ENEM - 2021) Os búfalos são deixados no campo sem controle reprodutivo, o que favorece a consanguinidade e o surgimento de enfermidades. Qual procedimento biotecnológico prévio é recomendado nessa situação?"],
    "alternativas": [
        "Transgenia",
        "Terapia gênica",
        "Vacina de DNA",
        "Clonagem terapêutica",
        "Mapeamento genético"
    ],
    "correta": 4,
    "materia": "biologia",
    "explicacao": "O mapeamento genético permite identificar genes ligados a doenças hereditárias, ajudando a evitar cruzamentos consanguíneos indesejados."
},
{
    "textos": ["(ENEM - 2021) Com o aumento da população de suínos no Brasil, é necessário reduzir o potencial poluidor dos resíduos. A utilização desses resíduos para obtenção de combustíveis permite:"],
    "alternativas": [
        "Diversificar a matriz energética nacional",
        "Aumentar a poluição dos recursos hídricos",
        "Diminuir a produção de energia",
        "Reduzir a produção de alimentos"
    ],
    "correta": 0,
    "materia": "biologia",
    "explicacao": "O uso dos resíduos da suinocultura como fonte de biocombustível é uma alternativa sustentável que contribui para a diversificação energética."
},
{
    "textos": ["(ENEM - 2019) O projeto 'The Kidney Project' visa desenvolver um rim biônico que execute funções biológicas do órgão. Esse dispositivo promoverá diretamente a:"],
    "alternativas": [
        "Remoção de ureia",
        "Excreção de lipídios",
        "Síntese de vasopressina",
        "Transformação de amônia",
        "Fabricação de aldosterona"
    ],
    "correta": 0,
    "materia": "biologia",
    "explicacao": "A função principal do rim é filtrar o sangue e remover resíduos nitrogenados como a ureia, o que o rim biônico visa replicar."
},
{
    "textos": ["(ENEM - 2018) Companhias de jeans estão substituindo o cloro por peróxidos, degradados por peroxidases. Genes dessas enzimas foram inseridos em leveduras para produção. Essa técnica é um exemplo de:"],
    "alternativas": [
        "Seleção artificial",
        "Mutação induzida",
        "Transgenia",
        "Clonagem",
        "Hibridização"
    ],
    "correta": 2,
    "materia": "biologia",
    "explicacao": "Transgenia é a inserção de genes de um organismo em outro, como no caso da introdução do gene da peroxidase em leveduras."
},
{
    "textos": ["Sobre as aplicações da biotecnologia, marque a alternativa correta:"],
    "alternativas": [
        "A biotecnologia só é aplicada na medicina",
        "A biotecnologia é utilizada apenas na produção de alimentos",
        "A biotecnologia pode ser aplicada na saúde, agricultura, indústria e meio ambiente",
        "A biotecnologia não utiliza organismos vivos"
    ],
    "correta": 2,
    "materia": "biologia",
    "explicacao": "A biotecnologia tem aplicações amplas, desde o desenvolvimento de medicamentos até a biorremediação ambiental e produção agrícola."
},
{
    "textos": ["Assinale a alternativa correta sobre organismos transgênicos:"],
    "alternativas": [
        "São organismos que tiveram genes de outra espécie inseridos em seu genoma.",
        "São organismos que sofreram mutações naturais.",
        "São organismos idênticos aos seus progenitores.",
        "São organismos que não possuem DNA."
    ],
    "correta": 0,
    "materia": "biologia",
    "explicacao": "Organismos transgênicos recebem genes de outras espécies em seu genoma por técnicas de engenharia genética, expressando características que não possuíam naturalmente."
},
{
    "textos": ["Sobre as técnicas de clonagem, é correto afirmar:"],
    "alternativas": [
        "Clonagem é a produção de organismos geneticamente diferentes.",
        "Clonagem é a produção de organismos geneticamente idênticos ao organismo original.",
        "Clonagem só ocorre em plantas.",
        "Clonagem não utiliza células-tronco."
    ],
    "correta": 1,
    "materia": "biologia",
    "explicacao": "A clonagem é um processo de reprodução assexuada que gera cópias geneticamente idênticas de um organismo original."
},
{
    "textos": ["Sobre a produção de insulina por meio da engenharia genética, marque a alternativa correta:"],
    "alternativas": [
        "Utiliza-se bactérias geneticamente modificadas para produzir insulina humana.",
        "Utiliza-se apenas células vegetais.",
        "Não é possível produzir insulina por engenharia genética.",
        "Utiliza-se vírus para produção de insulina."
    ],
    "correta": 0,
    "materia": "biologia",
    "explicacao": "Bactérias transgênicas com genes humanos são usadas para produzir insulina em larga escala, substituindo métodos anteriores baseados em animais."
},
{
    "textos": ["Sobre o uso de biotecnologia na agricultura, é correto afirmar:"],
    "alternativas": [
        "Não existem plantas transgênicas.",
        "Plantas transgênicas são resistentes a pragas e herbicidas.",
        "Plantas transgênicas não são cultivadas no Brasil.",
        "Plantas transgênicas não apresentam vantagens econômicas."
    ],
    "correta": 1,
    "materia": "biologia",
    "explicacao": "Plantas transgênicas são geneticamente modificadas para resistir a pragas e herbicidas, aumentando a produtividade e reduzindo perdas agrícolas."
},
{
    "textos": ["Sobre a utilização de microrganismos na produção de antibióticos, marque a alternativa correta:"],
    "alternativas": [
        "A biotecnologia não utiliza microrganismos.",
        "Microrganismos são utilizados para produção de antibióticos em larga escala.",
        "Apenas plantas produzem antibióticos.",
        "Antibióticos são produzidos apenas por síntese química."
    ],
    "correta": 1,
    "materia": "biologia",
    "explicacao": "Microrganismos, como fungos e bactérias, são amplamente utilizados na biotecnologia para produção industrial de antibióticos, como a penicilina."
},
{
    "textos": ["Sobre a terapia gênica, é correto afirmar:"],
    "alternativas": [
        "Consiste na introdução de genes normais em células para corrigir defeitos genéticos.",
        "Não utiliza vetores virais.",
        "Não é utilizada em seres humanos.",
        "É uma técnica exclusiva de plantas."
    ],
    "correta": 0,
    "materia": "biologia",
    "explicacao": "A terapia gênica introduz genes funcionais em células de um organismo para corrigir mutações causadoras de doenças genéticas."
},
{
    "textos": ["Sobre o uso de plasmídeos na engenharia genética, marque a alternativa correta:"],
    "alternativas": [
        "Plasmídeos são fragmentos de RNA.",
        "Plasmídeos são utilizados como vetores na transferência de genes.",
        "Plasmídeos não são utilizados em biotecnologia.",
        "Plasmídeos são exclusivos de vírus."
    ],
    "correta": 1,
    "materia": "biologia",
    "explicacao": "Plasmídeos são pequenas moléculas de DNA circular usadas como vetores para inserir genes de interesse em organismos-alvo."
},
{
    "textos": ["Sobre a produção de biocombustíveis, é correto afirmar:"],
    "alternativas": [
        "Não utiliza organismos vivos.",
        "Utiliza microrganismos para fermentar matéria orgânica e produzir álcool.",
        "Biocombustíveis são produzidos apenas por processos físicos.",
        "Não há produção de biocombustíveis no Brasil."
    ],
    "correta": 1,
    "materia": "biologia",
    "explicacao": "A produção de biocombustíveis envolve microrganismos como leveduras na fermentação de biomassa para gerar etanol."
},
{
    "textos": ["Sobre a biotecnologia ambiental, marque a alternativa correta:"],
    "alternativas": [
        "Não contribui para o tratamento de resíduos.",
        "Utiliza microrganismos para degradar poluentes.",
        "Não tem aplicação prática.",
        "É exclusiva da área médica."
    ],
    "correta": 1,
    "materia": "biologia",
    "explicacao": "A biotecnologia ambiental emprega microrganismos para a biorremediação, tratando resíduos e poluentes de forma sustentável."
},
{
    "textos": ["Sobre a produção de vacinas por engenharia genética, é correto afirmar:"],
    "alternativas": [
        "Não existem vacinas produzidas por engenharia genética.",
        "Vacinas recombinantes são produzidas utilizando genes de patógenos.",
        "Vacinas só podem ser produzidas por métodos tradicionais.",
        "Vacinas recombinantes não são seguras."
    ],
    "correta": 1,
    "materia": "biologia",
    "explicacao": "Vacinas recombinantes usam genes de patógenos inseridos em outros organismos para produzir antígenos seguros e eficazes."
}
];

// Função para inserir
async function inserirPerguntas() {
  const batch = db.batch();

  perguntas.forEach((pergunta) => {
    const docRef = db.collection("perguntas").doc(); // ID automático
    batch.set(docRef, pergunta);
  });

  await batch.commit();
  console.log("✅ Perguntas inseridas com sucesso!");
}

inserirPerguntas().catch(console.error);