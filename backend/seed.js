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
},
 {
        "textos": [
            "No Brasil, a reforma agrária tem como prioridade a distribuição de terras:"
        ],
        "alternativas": [
            "Exclusivamente para grandes latifúndios produtivos",
            "Para terras devolutas ocupadas ilegalmente e latifúndios improdutivos",
            "Para áreas urbanas consolidadas",
            "Para propriedades indígenas e quilombolas apenas",
            "Para áreas de mineração"
        ],
        "correta": 1,
        "materia": "geografia",
        "explicacao": "A reforma agrária prioriza terras improdutivas ou ocupadas ilegalmente para cumprir a função social da terra e reduzir a concentração fundiária."
    },
    {
        "textos": [
            "O modelo agrícola predominante em 90% dos municípios brasileiros com até 20 mil habitantes é:"
        ],
        "alternativas": [
            "Agricultura familiar, com pequena escala e uso restrito de capital",
            "Agronegócio, com alta mecanização e capital intensivo",
            "Agricultura orgânica, sem uso de agroquímicos",
            "Agricultura patronal, baseada em mão de obra qualificada",
            "Sistema agroflorestal, baseado no extrativismo"
        ],
        "correta": 0,
        "materia": "geografia",
        "explicacao": "A agricultura familiar é a base da economia rural em grande parte do Brasil, sendo responsável por grande parte da mão de obra no campo."
    },
    {
        "textos": [
            "A expansão da produção de soja no Brasil nas últimas décadas está associada a:"
        ],
        "alternativas": [
            "Prioridade ao pequeno produtor rural",
            "Avanços tecnológicos e manejo eficiente",
            "Redução da mecanização",
            "Restrição ao uso de agroquímicos",
            "Crescimento da agricultura orgânica"
        ],
        "correta": 1,
        "materia": "geografia",
        "explicacao": "O crescimento da soja se deve à mecanização, uso de agroquímicos e técnicas modernas de cultivo."
    },
    {
        "textos": [
            "Um dos principais impactos ambientais causados pela expansão da fronteira agrícola no Brasil é:"
        ],
        "alternativas": [
            "Aumento da biodiversidade",
            "Desmatamento e perda de áreas naturais",
            "Recuperação de áreas degradadas",
            "Redução da poluição do solo",
            "Diminuição da emissão de gases do efeito estufa"
        ],
        "correta": 1,
        "materia": "geografia",
        "explicacao": "A expansão agrícola tem provocado desmatamento, principalmente na Amazônia, causando perda ambiental significativa."
    },
    {
        "textos": [
            "A “Revolução Verde” refere-se a:"
        ],
        "alternativas": [
            "Um movimento ambientalista global",
            "A modernização da agricultura com uso de tecnologias, fertilizantes e sementes melhoradas",
            "O fim da agricultura tradicional",
            "A substituição da agricultura pela indústria",
            "A agricultura orgânica"
        ],
        "correta": 1,
        "materia": "geografia",
        "explicacao": "A Revolução Verde promoveu aumento da produtividade agrícola por meio de tecnologias e insumos químicos."
    },
    {
        "textos": [
            "A globalização econômica é caracterizada por:"
        ],
        "alternativas": [
            "Isolamento dos países em suas economias nacionais",
            "Integração dos mercados e circulação global de capitais, mercadorias e informações",
            "Restrição do comércio internacional",
            "Exclusão das economias emergentes",
            "Aumento do protecionismo"
        ],
        "correta": 1,
        "materia": "geografia",
        "explicacao": "A globalização envolve a interdependência econômica entre países via comércio, investimentos e tecnologia."
    },
    {
        "textos": [
            "O agronegócio brasileiro é importante para a economia porque:"
        ],
        "alternativas": [
            "Produz apenas para o mercado interno",
            "É um dos maiores exportadores de commodities agrícolas do mundo",
            "Não utiliza tecnologia em sua produção",
            "Depende exclusivamente da agricultura familiar",
            "Não gera emprego no campo"
        ],
        "correta": 1,
        "materia": "geografia",
        "explicacao": "O Brasil é líder mundial na exportação de soja, milho, carne e outras commodities, graças ao agronegócio moderno."
    },
    {
        "textos": [
            "A função social da terra, prevista na Constituição Federal brasileira, implica que:"
        ],
        "alternativas": [
            "A terra deve ser usada exclusivamente para produção agrícola intensiva",
            "A terra deve cumprir um papel social, garantindo uso produtivo e acesso à população",
            "A terra deve ser propriedade privada sem restrições",
            "A terra deve ser destinada apenas à preservação ambiental",
            "A terra deve ser usada para mineração"
        ],
        "correta": 1,
        "materia": "geografia",
        "explicacao": "A função social da terra busca evitar a concentração e o uso improdutivo, promovendo justiça social no campo."
    },
    {
        "textos": [
            "Um dos principais conflitos no meio rural brasileiro decorre de:"
        ],
        "alternativas": [
            "Concentração fundiária e ausência de reforma agrária efetiva",
            "Igualdade na distribuição de terras",
            "Ausência de produção agrícola",
            "Exclusão da agricultura familiar",
            "Falta de tecnologia no campo"
        ],
        "correta": 0,
        "materia": "geografia",
        "explicacao": "A concentração de terras provoca desigualdade e conflitos entre grandes proprietários, posseiros e pequenos agricultores."
    },
    {
        "textos": [
            "O avanço da tecnologia na agricultura contribui para:"
        ],
        "alternativas": [
            "Reduzir a produtividade",
            "Aumentar a eficiência e a produção agrícola",
            "Diminuir o uso de insumos agrícolas",
            "Eliminar o agronegócio",
            "Reduzir a exportação de alimentos"
        ],
        "correta": 1,
        "materia": "geografia",
        "explicacao": "A tecnologia, como mecanização e biotecnologia, eleva a produtividade e competitividade da agricultura."
    },
    {
        "textos": [
            "A divisão social do trabalho, segundo Émile Durkheim, contribui para:"
        ],
        "alternativas": [
            "Aumentar o desemprego estrutural",
            "Promover a solidariedade social",
            "Eliminar as desigualdades sociais",
            "Impedir o desenvolvimento tecnológico",
            "Reduzir a coesão social"
        ],
        "correta": 1,
        "materia": "sociologia",
        "explicacao": "Durkheim afirma que a divisão do trabalho é fundamental para a solidariedade e integração social nas sociedades modernas."
    },
    {
        "textos": [
            "O conceito de “alienação” no trabalho, segundo Karl Marx, refere-se:"
        ],
        "alternativas": [
            "À satisfação plena do trabalhador",
            "À autonomia total do indivíduo",
            "À perda do sentido do trabalho pelo trabalhador",
            "À igualdade nas relações de trabalho",
            "Ao aumento do lazer"
        ],
        "correta": 2,
        "materia": "sociologia",
        "explicacao": "Para Marx, a alienação ocorre quando o trabalhador não reconhece mais o produto do seu trabalho como algo próprio."
    },
    {
        "textos": [
            "A precarização do trabalho na contemporaneidade está relacionada:"
        ],
        "alternativas": [
            "Ao aumento dos direitos trabalhistas",
            "À estabilidade no emprego",
            "À flexibilização das leis e à informalidade",
            "À diminuição da tecnologia",
            "Ao crescimento do setor público"
        ],
        "correta": 2,
        "materia": "sociologia",
        "explicacao": "A precarização envolve contratos temporários, terceirização e falta de garantias, fenômenos comuns no mundo atual."
    },
    {
        "textos": [
            "Segundo Theodor Adorno e Max Horkheimer, a indústria cultural:"
        ],
        "alternativas": [
            "Incentiva a autonomia crítica dos indivíduos",
            "Promove a criatividade popular",
            "Padroniza produtos culturais e manipula o consumo",
            "Valoriza a diversidade cultural",
            "É neutra em relação à sociedade"
        ],
        "correta": 2,
        "materia": "sociologia",
        "explicacao": "Para Adorno e Horkheimer, a indústria cultural transforma cultura em mercadoria, promovendo homogeneização e alienação."
    },
    {
        "textos": [
            "O conceito de “cultura de massa” está relacionado:"
        ],
        "alternativas": [
            "À produção artesanal de bens culturais",
            "À difusão de produtos culturais para grandes públicos",
            "À exclusividade da cultura erudita",
            "À rejeição das mídias",
            "À ausência de influência social"
        ],
        "correta": 1,
        "materia": "sociologia",
        "explicacao": "Cultura de massa refere-se à produção e consumo em larga escala, geralmente mediada pelos meios de comunicação."
    },
    {
        "textos": [
            "O termo “globalização cultural” refere-se:"
        ],
        "alternativas": [
            "À preservação das culturas locais sem influências externas",
            "À circulação mundial de valores, símbolos e produtos culturais",
            "À eliminação de todas as tradições",
            "Ao isolamento das sociedades",
            "À rejeição da tecnologia"
        ],
        "correta": 1,
        "materia": "sociologia",
        "explicacao": "A globalização cultural é marcada pela troca e circulação de elementos culturais entre diferentes sociedades."
    },
    {
        "textos": [
            "A influência dos meios de comunicação de massa pode ser observada:"
        ],
        "alternativas": [
            "Apenas na economia",
            "Na formação de opiniões, comportamentos e valores sociais",
            "Exclusivamente na política",
            "Apenas na cultura erudita",
            "Só em sociedades tradicionais"
        ],
        "correta": 1,
        "materia": "sociologia",
        "explicacao": "Os meios de comunicação de massa moldam comportamentos, opiniões e valores em larga escala."
    },
    {
        "textos": [
            "O conceito de “aldeia global”, proposto por Marshall McLuhan, refere-se:"
        ],
        "alternativas": [
            "Ao isolamento das comunidades",
            "À interconexão mundial promovida pelos meios de comunicação",
            "À rejeição da tecnologia",
            "Ao fim da comunicação instantânea",
            "À volta das sociedades tribais"
        ],
        "correta": 1,
        "materia": "sociologia",
        "explicacao": "McLuhan usou o termo para descrever como a tecnologia conecta pessoas globalmente, tornando o mundo mais integrado."
    },
    {
        "textos": [
            "A chamada “sociedade da informação” caracteriza-se por:"
        ],
        "alternativas": [
            "Priorizar o trabalho manual",
            "Valorizar o acesso e a produção de conhecimento e tecnologia",
            "Rejeitar a comunicação digital",
            "Depender apenas de recursos naturais",
            "Manter as formas tradicionais de comunicação"
        ],
        "correta": 1,
        "materia": "sociologia",
        "explicacao": "Na sociedade da informação, o conhecimento e a tecnologia são centrais para a economia e as relações sociais."
    },
    {
        "textos": [
            "O trabalho informal é caracterizado por:"
        ],
        "alternativas": [
            "Garantia de direitos trabalhistas",
            "Registro em carteira",
            "Ausência de proteção social e instabilidade",
            "Estabilidade e benefícios",
            "Exclusividade do setor público"
        ],
        "correta": 2,
        "materia": "sociologia",
        "explicacao": "O trabalho informal não oferece garantias legais nem estabilidade, sendo uma das marcas da precarização do trabalho."
    },
       {
        "textos": [
            "Segundo Aristóteles, a virtude ética está relacionada:"
        ],
        "alternativas": [
            "À obediência cega às leis",
            "Ao excesso de prazer",
            "Ao equilíbrio entre os extremos (justo meio)",
            "À busca da riqueza",
            "À negação da razão"
        ],
        "correta": 2,
        "materia": "filosofia",
        "explicacao": "Aristóteles defendia que a virtude está no equilíbrio, ou seja, no meio-termo entre os excessos e as faltas."
    },
    {
        "textos": [
            "Para Immanuel Kant, uma ação é moralmente correta quando:"
        ],
        "alternativas": [
            "Produz felicidade à maioria",
            "É motivada pelo dever e pela razão",
            "Segue os costumes locais",
            "Busca o prazer individual",
            "Depende das consequências"
        ],
        "correta": 1,
        "materia": "filosofia",
        "explicacao": "Para Kant, a moralidade está em agir por dever, de acordo com princípios racionais universais, não pelas consequências."
    },
    {
        "textos": [
            "O conceito de justiça para John Rawls está baseado:"
        ],
        "alternativas": [
            "No mérito individual",
            "Na igualdade de oportunidades e no “véu da ignorância”",
            "No poder do Estado",
            "Na tradição religiosa",
            "Na supremacia da maioria"
        ],
        "correta": 1,
        "materia": "filosofia",
        "explicacao": "Rawls propõe que princípios de justiça devem ser escolhidos sem saber a posição social que se ocupará, garantindo imparcialidade."
    },
    {
        "textos": [
            "Para Sócrates, o conhecimento verdadeiro é alcançado por meio:"
        ],
        "alternativas": [
            "Da tradição",
            "Da retórica",
            "Do diálogo e da maiêutica",
            "Da revelação divina",
            "Da força"
        ],
        "correta": 2,
        "materia": "filosofia",
        "explicacao": "Sócrates utilizava o diálogo (maiêutica) para estimular o autoconhecimento e a busca pela verdade."
    },
    {
        "textos": [
            "Platão defendia que o mundo sensível:"
        ],
        "alternativas": [
            "É a única realidade",
            "É uma ilusão, sendo o mundo das ideias a verdadeira realidade",
            "Deve ser rejeitado totalmente",
            "É superior ao mundo das ideias",
            "Não tem importância filosófica"
        ],
        "correta": 1,
        "materia": "filosofia",
        "explicacao": "Para Platão, o mundo sensível é imperfeito e transitório, enquanto o mundo das ideias é eterno e verdadeiro."
    },
    {
        "textos": [
            "O pensamento de Epicuro está relacionado principalmente:"
        ],
        "alternativas": [
            "Ao ascetismo",
            "À busca do prazer moderado e da ausência de perturbação (ataraxia)",
            "À defesa do Estado forte",
            "Ao niilismo",
            "Ao ceticismo radical"
        ],
        "correta": 1,
        "materia": "filosofia",
        "explicacao": "Epicuro defendia a busca racional do prazer e a tranquilidade da alma como o caminho para a felicidade."
    },
    {
        "textos": [
            "Segundo Nietzsche, os valores morais tradicionais:"
        ],
        "alternativas": [
            "São eternos e universais",
            "Devem ser questionados e superados pelo “além-do-homem” (Übermensch)",
            "Garantem a evolução da humanidade",
            "São impostos pela natureza",
            "Não têm relação com a cultura"
        ],
        "correta": 1,
        "materia": "filosofia",
        "explicacao": "Nietzsche critica a moral tradicional e propõe a criação de novos valores pelo indivíduo livre."
    },
    {
        "textos": [
            "O existencialismo de Sartre afirma que:"
        ],
        "alternativas": [
            "O ser humano nasce com uma essência definida",
            "A existência precede a essência",
            "Os valores são impostos por Deus",
            "O destino é inalterável",
            "A liberdade é uma ilusão"
        ],
        "correta": 1,
        "materia": "filosofia",
        "explicacao": "Sartre defende que o ser humano existe primeiro e só depois constrói sua essência por meio de escolhas livres."
    },
    {
        "textos": [
            "Para Michel Foucault, o poder:"
        ],
        "alternativas": [
            "Está concentrado apenas no Estado",
            "Circula por toda a sociedade e está presente nas relações sociais",
            "É sempre negativo",
            "Não influencia o conhecimento",
            "É apenas repressivo"
        ],
        "correta": 1,
        "materia": "filosofia",
        "explicacao": "Foucault entende o poder como algo difuso, presente em todas as relações sociais, e não apenas centralizado."
    },
    {
        "textos": [
            "O utilitarismo, defendido por Jeremy Bentham e John Stuart Mill, afirma que:"
        ],
        "alternativas": [
            "O valor moral de uma ação depende de sua intenção",
            "O valor moral de uma ação depende de suas consequências para a felicidade geral",
            "A moralidade é determinada pela tradição",
            "O dever é mais importante que o resultado",
            "O sofrimento deve ser buscado"
        ],
        "correta": 1,
        "materia": "filosofia",
        "explicacao": "Para os utilitaristas, uma ação é correta se promove o maior bem para o maior número de pessoas."
    },
        {
        "textos": [
            "A Revolução Francesa foi um marco da Idade Contemporânea porque:"
        ],
        "alternativas": [
            "Restaurou o absolutismo na França",
            "Defendeu os privilégios do clero",
            "Propagou ideias de liberdade, igualdade e fraternidade",
            "Manteve a escravidão como base econômica",
            "Fortaleceu o feudalismo europeu"
        ],
        "correta": 2,
        "materia": "historia",
        "explicacao": "A Revolução Francesa difundiu ideais iluministas que influenciaram movimentos sociais e políticos em todo o mundo."
    },
    {
        "textos": [
            "Durante a Guerra Fria, um dos principais conflitos indiretos foi:"
        ],
        "alternativas": [
            "Revolução Industrial",
            "Guerra da Coreia",
            "Revolução Francesa",
            "Primeira Guerra Mundial",
            "Conferência de Berlim"
        ],
        "correta": 1,
        "materia": "historia",
        "explicacao": "A Guerra da Coreia foi um conflito entre o bloco capitalista e o socialista, representando a disputa indireta entre EUA e URSS."
    },
    {
        "textos": [
            "A Revolução Industrial alterou a sociedade europeia ao:"
        ],
        "alternativas": [
            "Reduzir a urbanização",
            "Eliminar a classe operária",
            "Intensificar o trabalho fabril e a urbanização",
            "Manter o trabalho artesanal como predominante",
            "Impedir o surgimento de novas tecnologias"
        ],
        "correta": 2,
        "materia": "historia",
        "explicacao": "O processo industrial promoveu o crescimento das cidades e o surgimento da classe operária."
    },
    {
        "textos": [
            "O neocolonialismo europeu no século XIX resultou em:"
        ],
        "alternativas": [
            "Independência imediata das colônias",
            "Exploração econômica e dominação política na África e Ásia",
            "Fortalecimento das culturas locais",
            "Fim da escravidão mundial",
            "Redução das desigualdades sociais globais"
        ],
        "correta": 1,
        "materia": "historia",
        "explicacao": "O neocolonialismo intensificou a exploração e a dependência das regiões colonizadas."
    },
    {
        "textos": [
            "A sociedade colonial brasileira era estruturada principalmente:"
        ],
        "alternativas": [
            "Pela igualdade social",
            "Pelo sistema escravocrata",
            "Pela democracia direta",
            "Pela ausência de hierarquia",
            "Pela industrialização"
        ],
        "correta": 1,
        "materia": "historia",
        "explicacao": "A escravidão foi fundamental para a economia e organização social do Brasil Colônia."
    },
    {
        "textos": [
            "O ciclo do açúcar no Brasil Colônia caracterizou-se por:"
        ],
        "alternativas": [
            "Predomínio do trabalho livre",
            "Exportação para o mercado europeu",
            "Uso de mão de obra indígena assalariada",
            "Industrialização das cidades",
            "Comércio apenas interno"
        ],
        "correta": 1,
        "materia": "historia",
        "explicacao": "O açúcar era produzido para exportação, principalmente para a Europa, com uso intensivo de mão de obra escrava."
    },
    {
        "textos": [
            "A influência indígena e africana na cultura brasileira pode ser vista:"
        ],
        "alternativas": [
            "Apenas na arquitetura",
            "Na alimentação, língua, religiosidade e festas populares",
            "Exclusivamente na política",
            "Só na economia",
            "Apenas na literatura"
        ],
        "correta": 1,
        "materia": "historia",
        "explicacao": "A cultura brasileira foi profundamente marcada por elementos indígenas e africanos em diversos aspectos."
    },
    {
        "textos": [
            "O pacto colonial estabelecia que:"
        ],
        "alternativas": [
            "O Brasil podia comercializar livremente",
            "Toda produção deveria ser vendida à metrópole",
            "O Brasil era independente economicamente",
            "Não havia restrições comerciais",
            "O Brasil exportava apenas para a África"
        ],
        "correta": 1,
        "materia": "historia",
        "explicacao": "O pacto colonial restringia o comércio colonial à metrópole, mantendo a dependência econômica."
    },
    {
        "textos": [
            "No Segundo Reinado, a economia cafeeira e a resistência à escravidão contribuíram para:"
        ],
        "alternativas": [
            "Fortalecer o absolutismo",
            "Surgimento de movimentos abolicionistas e republicanos",
            "Redução do trabalho livre",
            "Manutenção da monarquia sem oposição",
            "Fim da imigração europeia"
        ],
        "correta": 1,
        "materia": "historia",
        "explicacao": "A expansão do café e a luta contra a escravidão impulsionaram movimentos sociais e políticos que levaram ao fim da monarquia."
    },
    {
        "textos": [
            "A Proclamação da República, em 1889, ocorreu principalmente devido:"
        ],
        "alternativas": [
            "Ao apoio popular à monarquia",
            "À estabilidade política do Império",
            "À insatisfação de militares, elites e abolicionistas com a monarquia",
            "Ao fim da economia cafeeira",
            "Ao apoio da Inglaterra à monarquia"
        ],
        "correta": 2,
        "materia": "historia",
        "explicacao": "Diversos grupos estavam insatisfeitos com a monarquia, o que levou à proclamação da República."
    },
      {
    "textos": [
      "Durante o inverno, em uma região onde a temperatura ambiente é de 10°C, uma pessoa com massa corporal de 70 kg permanece ao ar livre por um longo período. Sabendo que o corpo humano mantém uma temperatura interna de aproximadamente 37°C e que o calor específico médio do corpo humano é de c = 3470 J/kg°C, considere que o corpo troca calor com o ambiente apenas por condução e convecção. Despreze outras formas de perda de calor, como radiação ou evaporação do suor. Com base nessas informações, analise as afirmativas a seguir:\n\nI. Se a temperatura corporal da pessoa diminuir em 2°C, o corpo terá perdido cerca de 485,800 J de energia para o ambiente.\nII. A quantidade de energia perdida pelo corpo, em calorias, se a temperatura corporal variar 5ºC, será de aproximadamente 290 kcal.\nIII. O corpo humano, para repor a perda de calor mencionada, precisaria metabolizar cerca de 29 g de gordura, considerando que 1 g de gordura libera 9 kcal.\nIV. Para cada 1°C de variação na temperatura corporal, o corpo dessa pessoa perde aproximadamente 242,900 J.\n\nAssinale a alternativa que apresenta as afirmativas CORRETAS."
    ],
    "alternativas": [
      "I e IV.",
      "I e III.",
      "I, II e IV.",
      "Somente a IV.",
      "II e III."
    ],
    "correta": 2,
    "materia": "fisica"
  },
  {
    "textos": [
      "Termologia é a área da física que estuda os fenômenos relacionados ao calor, temperatura e suas interações com a matéria. Termometria é o ramo da termologia que se dedica à medição da temperatura, utilizando instrumentos como termômetros para quantificar o grau de agitação térmica das partículas de um corpo. Em relação a esse tema, considere as seguintes afirmativas:\n\nI. A temperatura de um corpo é uma medida da energia cinética média das partículas que o compõem.\nII. A dilatação térmica dos materiais ocorre devido ao aumento da agitação das partículas quando a temperatura aumenta.\nIII. Todos os materiais se expandem igualmente quando aquecidos.\nIV. O zero absoluto, na escala Kelvin, é a menor temperatura possível e corresponde a 273,15°C.\n\nAssinale a alternativa que contém as afirmativas INCORRETAS."
    ],
    "alternativas": [
      "III e IV.",
      "I, II e III.",
      "II e IV.",
      "I e II.",
      "Somente a IV."
    ],
    "correta": 0,
    "materia": "fisica"
  },
  {
    "textos": [
      "Vasos comunicantes são sistemas compostos por dois ou mais recipientes interligados na base, preenchidos por um ou mais líquidos. Dois vasos comunicantes em forma de “U” contêm água e óleo, ambos líquidos imiscíveis. As alturas das colunas de água e óleo em equilíbrio, medidas em relação à interface entre os dois líquidos, são respectivamente, hágua e hóleo. Se a densidade da água é 1000 kg/m³ e a do óleo é 800 kg/m³ qual das alternativas a seguir representa CORRETAMENTE a relação entre essas alturas?"
    ],
    "alternativas": [
      "hágua = hóleo",
      "hágua = 1,25 hóleo",
      "hágua = 0,8 hóleo",
      "hágua = 2 hóleo",
      "hágua = 0,5 hóleo"
    ],
    "correta": 1,
    "materia": "fisica"
  },
  {
    "textos": [
      "Na aviação em geral um sério problema que causa uma preocupação significativa é o choque de pássaros com as aeronaves. Mesmo uma colisão com uma ave de tamanho médio pode causar danos consideráveis devido à grande variação da quantidade de movimento, conhecida na Física como Impulso. Considere um avião, voando a 720 km/h, quando um pássaro de 2 kg se choca perpendicularmente à sua fuselagem, ficando preso a ela. Como a velocidade do avião é muito maior que a do pássaro, podemos considerar que ele estava em repouso antes de colidir. Se o choque aconteceu num tempo de 0,001 s, assinale a alternativa CORRETA que mostra a força média que o pássaro exerce na fuselagem do avião."
    ],
    "alternativas": [
      "720 N",
      "2x10^5 N",
      "4x10^5 N",
      "2000 N",
      "3,6x10^6 N"
    ],
    "correta": 2,
    "materia": "fisica"
  },
  {
    "textos": [
      "Um pai faz um balanço utilizando dois segmentos paralelos e iguais da mesma corda para fixar uma tábua a uma barra horizontal. Por segurança, opta por um tipo de corda cuja tensão de ruptura seja 25% superior à tensão máxima calculada nas seguintes condições:\n• O ângulo máximo atingido pelo balanço em relação à vertical é igual a 90º;\n• Os filhos utilizarão o balanço até que tenham uma massa de 24 kg.\nAlém disso, ele aproxima o movimento do balanço para o movimento circular uniforme, considera que a aceleração da gravidade é igual a 10 m/s² e despreza forças dissipativas.\n\nQual é a tensão de ruptura da corda escolhida?"
    ],
    "alternativas": [
      "120 N",
      "300 N",
      "360 N",
      "450 N",
      "900 N"
    ],
    "correta": 3,
    "materia": "fisica"
  },
  {
    "textos": [
      "Uma lanterna funciona com três pilhas de resistência interna igual a 0,5 Ω cada, ligadas em série. Quando posicionadas corretamente, devem acender a lâmpada incandescente de especificações 4,5 W e 4,5 V. Cada pilha na posição correta gera uma f.e.m. (força eletromotriz) de 1,5 V. Uma pessoa ao trocar as pilhas da lanterna, comete o equívoco de inverter a posição de uma das pilhas. Considere que as pilhas mantêm contato independentemente da posição. Com esse equívoco, qual é a intensidade de corrente que passa pela lâmpada ao se ligar a lanterna?"
    ],
    "alternativas": [
      "0,25 A",
      "0,33 A",
      "0,75 A",
      "1,00 A",
      "1,33 A"
    ],
    "correta": 0,
    "materia": "fisica"
  },
  {
    "textos": [
      "O sonorizador é um dispositivo físico implantado sobre a superfície de uma rodovia de modo que provoque uma trepidação e ruído quando da passagem de um veículo sobre ele, alertando para a situação atípica à frente, como obras, pedágios ou travessia de pedestres. Ao passar sobre os sonorizadores, a suspensão do veículo sofre vibrações que produzem ondas sonoras, resultando em um barulho peculiar. Considere um veículo que passe com velocidade constante igual a 108 km/h sobre um sonorizador cujas faixas são separadas por uma distância de 8 cm. A frequência da vibração do automóvel percebida pelo condutor durante a passagem nesse sonorizador é mais próxima de:"
    ],
    "alternativas": [
      "8,6 hertz",
      "13,5 hertz",
      "375 hertz",
      "1350 hertz",
      "4860 hertz"
    ],
    "correta": 2,
    "materia": "fisica"
  },
  {
    "textos": [
      "Em um manual de instruções de uma geladeira, constam as seguintes recomendações:\n• Mantenha a porta de seu refrigerador aberta apenas o tempo necessário;\n• É importante não obstruir a circulação do ar com a má distribuição dos alimentos nas prateleiras;\n• Deixe um espaço de, no mínimo, 5 cm entre a parte traseira do produto (dissipador serpentinado) e a parede.\n\nCom base nos princípios da termodinâmica, as justificativas para essas recomendações são, respectivamente:"
    ],
    "alternativas": [
      "Reduzir a saída de frio do refrigerador para o ambiente, garantir a transmissão do frio entre os alimentos na prateleira e permitir a troca de calor entre o dissipador de calor e o ambiente.",
      "Reduzir a saída de frio do refrigerador para o ambiente, garantir a convecção do ar interno, garantir o isolamento térmico entre a parte interna e a externa.",
      "Reduzir o fluxo de calor do ambiente para a parte interna do refrigerador, garantir a convecção do ar interno e permitir a troca de calor entre o dissipador e o ambiente.",
      "Reduzir o fluxo de calor do ambiente para a parte interna do refrigerador, garantir a transmissão do frio entre os alimentos na prateleira e permitir a troca de calor entre o dissipador e o ambiente.",
      "Reduzir o fluxo de calor do ambiente para a parte interna do refrigerador, garantir a convecção do ar interno e garantir o isolamento térmico entre as partes interna e externa."
    ],
    "correta": 2,
    "materia": "fisica"
  },
  {
    "textos": [
      "Alguns cinemas apresentam uma tecnologia em que as imagens dos filmes parecem tridimensionais, baseada na utilização de óculos 3D. Após atravessar cada lente dos óculos, as ondas luminosas, que compõem as imagens do filme, emergem vibrando apenas na direção vertical ou apenas na direção horizontal. Com base nessas informações, o funcionamento dos óculos 3D ocorre por meio do fenômeno ondulatório de:"
    ],
    "alternativas": [
      "difração",
      "dispersão",
      "reflexão",
      "refração",
      "polarização"
    ],
    "correta": 4,
    "materia": "fisica"
  },
  {
    "textos": [
      "A palavra força é usada em nosso cotidiano com diversos significados. Em física, essa mesma palavra possui um significado próprio, diferente daqueles da linguagem do nosso dia a dia. As cinco frases seguintes, todas encontradas em textos literários ou jornalísticos, contêm a palavra força empregada em diversos contextos.\n\nI. “As Forças Armadas estão de prontidão para defender as nossas fronteiras.”\nII. “Por motivo de força maior, o professor não poderá dar aula hoje.”\nIII. “A força do pensamento transforma o mundo.”\nIV. “A bola bateu na trave e voltou com mais força ainda.”\nV. “Tudo é atraído para o centro da Terra pela força da gravidade.”\n\nA abordagem científica do termo força aparece na frase:"
    ],
    "alternativas": [
      "I.",
      "II.",
      "III.",
      "IV.",
      "V."
    ],
    "correta": 4,
    "materia": "fisica"
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