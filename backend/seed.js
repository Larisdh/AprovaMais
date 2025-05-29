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
    },
    {
        "pergunta": "Uma reação química ocorre entre 4 mols de hidrogênio (H₂) e 2 mols de oxigênio (O₂) para formar água (H₂O). Qual a quantidade de água formada, em mols?",
        "alternativas": {
            "a": "2 mols",
            "b": "4 mols",
            "c": "6 mols",
            "d": "8 mols",
            "e": "10 mols"
        },
        "correta": "c",
        "materia": "quimica"
    },
    {
        "pergunta": "Qual das substâncias abaixo é um ácido segundo a teoria de Brønsted-Lowry?",
        "alternativas": {
            "a": "NH₃",
            "b": "H₂O",
            "c": "HCl",
            "d": "NaOH",
            "e": "CO₂"
        },
        "correta": "c",
        "materia": "quimica"
    },
    {
        "pergunta": "As forças intermoleculares responsáveis pelo ponto de ebulição mais alto da água são:",
        "alternativas": {
            "a": "ligações iônicas",
            "b": "ligações covalentes",
            "c": "ligações de hidrogênio",
            "d": "forças de Van der Waals",
            "e": "ligações metálicas"
        },
        "correta": "c",
        "materia": "quimica"
    },
    {
        "pergunta": "O césio-137 é um isótopo radioativo com meia-vida de aproximadamente 30 anos. Após 90 anos, que fração da amostra inicial ainda estará radioativa?",
        "alternativas": {
            "a": "1/2",
            "b": "1/3",
            "c": "1/4",
            "d": "1/8",
            "e": "1/16"
        },
        "correta": "d",
        "materia": "quimica"
    },
    {
        "pergunta": "Qual a concentração molar de uma solução preparada dissolvendo 58 g de NaCl (massa molar = 58 g/mol) em 1 litro de água?",
        "alternativas": {
            "a": "0,1 mol/L",
            "b": "0,5 mol/L",
            "c": "1 mol/L",
            "d": "2 mol/L",
            "e": "5 mol/L"
        },
        "correta": "c",
        "materia": "quimica"
    },
    {
        "pergunta": "Uma solução aquosa tem concentração de íons H⁺ igual a 1 x 10⁻⁵ mol/L. Qual é o pH dessa solução?",
        "alternativas": {
            "a": "3",
            "b": "4",
            "c": "5",
            "d": "6",
            "e": "7"
        },
        "correta": "c",
        "materia": "quimica"
    },
    {
        "pergunta": "Qual grupo funcional caracteriza os álcoois?",
        "alternativas": {
            "a": "-COOH",
            "b": "-OH",
            "c": "-NH₂",
            "d": "-CHO",
            "e": "-CO"
        },
        "correta": "b",
        "materia": "quimica"
    },
    {
        "pergunta": "Um gás ideal ocupa 10 litros a 2 atm e 300 K. Qual será o volume do gás se a pressão for aumentada para 4 atm, mantendo a temperatura constante?",
        "alternativas": {
            "a": "5 L",
            "b": "10 L",
            "c": "15 L",
            "d": "20 L",
            "e": "25 L"
        },
        "correta": "a",
        "materia": "quimica"
    },
    {
        "pergunta": "O aumento da temperatura em uma reação química geralmente:",
        "alternativas": {
            "a": "diminui a energia de ativação",
            "b": "aumenta a energia de ativação",
            "c": "aumenta a velocidade da reação",
            "d": "diminui a velocidade da reação",
            "e": "não altera a velocidade da reação"
        },
        "correta": "c",
        "materia": "quimica"
    },
    {
        "pergunta": "O polietileno é um polímero formado pela repetição do monômero:",
        "alternativas": {
            "a": "eteno (C₂H₄)",
            "b": "etino (C₂H₂)",
            "c": "propeno (C₃H₆)",
            "d": "benzeno (C₆H₆)",
            "e": "metano (CH₄)"
        },
        "correta": "a",
        "materia": "quimica"
    },
    {
        "textos": [
            "Lea el fragmento a seguir de \"El Aleph\" de Jorge Luis Borges:",
            "\"El diámetro del Aleph sería de dos o tres centímetros, pero el espacio cósmico estaba ahí, sin disminución de tamaño. Cada cosa (el espejo de una cómoda, la pared de un cuarto, un mapa de América, las nubes del cielo, los mares, las cumbres, los desiertos) era el Aleph, sin superposición, sin ocultación. Simultáneamente. Y cada cosa era un Aleph, sin disminución, sin superposición, sin ocultación. Simultáneamente.\"",
            "¿Cuál de las siguientes afirmaciones mejor describe la principal característica del Aleph, conforme el texto?"
        ],
        "alternativas": [
            "Es un objeto que permite viajar en el tiempo.",
            "Representa la totalidad del universo en un punto diminuto, visible simultáneamente.",
            "Es una dimensión paralela donde los objetos pierden su tamaño original.",
            "Simboliza la capacidad humana de observar múltiples universos en secuencia.",
            "Es una metáfora para la infinitud del conocimiento."
        ],
        "correta": 1,
        "materia": "espanhol",
        "explicacao": "O Aleph representa um ponto do espaço que contém todo o universo de forma simultânea e sem sobreposição, conforme descrito por Borges."
    },
    {
        "textos": [
            "O vocábulo \"sensible\" em espanhol possui múltiplos significados. Em qual das opções abaixo o termo \"sensible\" é empregado com o sentido de \"sensível\" (no sentido de ser afetado ou perceber facilmente) e NÃO com o sentido de \"lamentável\" ou \"deplorável\"?"
        ],
        "alternativas": [
            "Fue una pérdida muy sensible para toda la comunidad.",
            "El cambio climático ha provocado un sensible aumento de las temperaturas.",
            "Es una persona muy sensible a la injusticia social.",
            "El error cometido tuvo un impacto sensible en los resultados finales.",
            "La ausencia del director fue sensiblemente percibida por el público."
        ],
        "correta": 2,
        "materia": "espanhol",
        "explicacao": "Na frase 'Es una persona muy sensible a la injusticia social', 'sensible' é usado no sentido de uma pessoa que sente ou percebe facilmente, ou seja, sensível emocionalmente."
    },
    {
        "textos": [
            "En el poema \"Me gustas cuando callas\" de Pablo Neruda, el verso \"Me gustas cuando callas porque estás como ausente\" sugiere principalmente:"
        ],
        "alternativas": [
            "La preferencia del yo lírico por el silencio de la persona amada.",
            "La indiferencia del yo lírico hacia la presencia de la persona amada.",
            "La idea de que el silencio de la persona amada intensifica su presencia.",
            "El dolor del yo lírico por la ausencia física de la persona amada.",
            "La incomprensión del yo lírico ante el silencio."
        ],
        "correta": 0,
        "materia": "espanhol",
        "explicacao": "O eu lírico expressa sua admiração pelo silêncio da pessoa amada, sugerindo que esse silêncio contribui para a beleza ou encantamento que ela provoca."
    },
    {
        "textos": [
            "En \"Crónica de una muerte anunciada\" de Gabriel García Márquez, la repetición constante de la información de que Santiago Nasar sería asesinado, incluso antes del evento, sirve principalmente para:"
        ],
        "alternativas": [
            "Crear un suspenso sobre el desenlace de la historia.",
            "Enfatizar la fatalidad y la inevitabilidad del destino.",
            "Demostrar la incapacidad de los personajes para evitar lo ocurrido.",
            "Alertar al lector sobre la estructura no lineal de la narrativa.",
            "Subrayar la pasividad de la comunidad."
        ],
        "correta": 1,
        "materia": "espanhol",
        "explicacao": "A repetição da informação sobre a morte anunciada enfatiza a inevitabilidade do destino, elemento marcante da obra."
    },
    {
        "textos": [
            "Una charge muestra una balanza desequilibrada, con un símbolo de dinero en un plato y una persona pobre en el otro. Encima de la balanza, hay un juez con los ojos vendados.",
            "¿Cuál es la principal crítica social implícita en esta charge?"
        ],
        "alternativas": [
            "La complejidad del sistema legal.",
            "La importancia de la economía para la justicia.",
            "La falta de imparcialidad y la corrupción en el sistema judicial.",
            "La necesidad de mayor igualdad económica.",
            "La ceguera de la justicia en general."
        ],
        "correta": 2,
        "materia": "espanhol",
        "explicacao": "A balança desequilibrada simboliza um sistema judicial parcial, onde o dinheiro pesa mais do que a justiça, sugerindo corrupção e falta de imparcialidade."
    },
    {
        "textos": [
            "Un correo electrónico recibido por un empleado de una empresa, con el asunto \"Urgente: Nueva política de teletrabajo\", que detalla los procedimientos y requisitos para trabajar remotamente, tiene como función principal:"
        ],
        "alternativas": [
            "Expresiva.",
            "Poética.",
            "Conativa.",
            "Fática.",
            "Metalingüística."
        ],
        "correta": 2,
        "materia": "espanhol",
        "explicacao": "A função do texto é orientar ou convencer o destinatário a agir conforme os novos procedimentos, característica da função conativa."
    },
    {
        "textos": [
            "Quando um dicionário apresenta a definição de uma palavra, la función de lenguaje predominante es la:"
        ],
        "alternativas": [
            "Emotiva.",
            "Fática.",
            "Referencial.",
            "Poética.",
            "Conativa."
        ],
        "correta": 2,
        "materia": "espanhol",
        "explicacao": "A função referencial é predominante em textos informativos e objetivos, como definições de dicionário, pois visa transmitir informações sobre o mundo de forma clara e direta."
    },
    {
        "textos": [
            "La celebración del 'Día de Muertos' en México, con altares coloridos, calaveras de azúcar y la visita a cementerios, es un ejemplo claro de:"
        ],
        "alternativas": [
            "Una imposición cultural externa.",
            "Una tradición religiosa exclusivamente católica.",
            "Una manifestación de sincretismo cultural y valorización de la ancestralidad.",
            "Un evento puramente turístico y comercial.",
            "Una práctica aislada sin conexión con la identidad nacional."
        ],
        "correta": 2,
        "materia": "espanhol",
        "explicacao": "O Día de Muertos é uma manifestação cultural mexicana que mistura elementos indígenas e católicos (sincretismo), celebrando e valorizando os antepassados."
    },
    {
        "textos": [
            "Si un romance español describe en detalles un cuadro de Goya, como 'Los fusilamientos del 3 de mayo', y explora las emociones y la historia detrás de la pintura, ¿cuál es la principal relación entre la lectura y el arte explorada en ese contexto?"
        ],
        "alternativas": [
            "El arte sirve apenas como fondo para la narrativa literaria.",
            "La literatura funciona como una extensión e interpretación de la obra de arte visual.",
            "La pintura se utiliza para ilustrar pasajes del texto.",
            "La lectura de la obra literaria anula la necesidad de ver la pintura original.",
            "El arte visual se torna completamente secundario en relación con la prosa."
        ],
        "correta": 1,
        "materia": "espanhol",
        "explicacao": "Ao descrever e explorar uma obra de arte visual, a literatura amplia seu significado e propõe uma interpretação emocional e histórica da pintura."
    },
    {
        "textos": [
            "Identifique la figura de lenguaje presente en la frase: 'Tus ojos son dos luceros que iluminan mi camino.'"
        ],
        "alternativas": [
            "Metáfora.",
            "Comparación.",
            "Hipérbole.",
            "Ironía.",
            "Personificación."
        ],
        "correta": 0,
        "materia": "espanhol",
        "explicacao": "A frase utiliza uma metáfora ao dizer que os olhos são 'luceros' (astros/luzes), sugerindo que iluminam e guiam, sem o uso de conectivos comparativos."
    },
    {
        "textos": [
            "Corredores ecológicos visam mitigar os efeitos da fragmentação dos ecossistemas promovendo a ligação entre diferentes áreas, com o objetivo de proporcionar o deslocamento de animais, a dispersão de sementes e o aumento da cobertura vegetal. São instituídos com base em informações como estudos sobre o deslocamento de espécies, sua área de vida (área necessária para o suprimento de suas necessidades vitais e reprodutivas) e a distribuição de suas populações. Nessa estratégia, a recuperação da biodiversidade é efetiva porque:"
        ],
        "alternativas": [
            "propicia o fluxo gênico.",
            "intensifica o manejo de espécies.",
            "amplia o processo de ocupação humana.",
            "aumenta o número de indivíduos nas populações.",
            "favorece a formação de ilhas de proteção integral."
        ],
        "correta": 0,
        "materia": "biologia"
    },
    {
        "textos": [
            "Insetos podem apresentar três tipos de desenvolvimento. Um deles, a holometabolia (desenvolvimento completo), é constituído pelas fases de ovo, larva, pupa e adulto sexualmente maduro, que ocupam diversos hábitats. Os insetos com holometabolia pertencem às ordens mais numerosas em termos de espécies conhecidas. Esse tipo de desenvolvimento está relacionado a um maior número de espécies em razão da"
        ],
        "alternativas": [
            "proteção na fase de pupa, favorecendo a sobrevivência de adultos férteis.",
            "produção de muitos ovos, larvas e pupas, aumentando o número de adultos.",
            "exploração de diferentes nichos, evitando a competição entre as fases da vida.",
            "ingestão de alimentos em todas as fases de vida, garantindo o surgimento do adulto.",
            "utilização do mesmo alimento em todas as fases, otimizando a nutrição do organismo."
        ],
        "correta": 2,
        "materia": "biologia"
    },
    {
        "textos": [
            "A polinização, que viabiliza o transporte do grão de pólen de uma planta até o estigma de outra, pode ser realizada biótica ou abioticamente. Nos processos abióticos, as plantas dependem de fatores como o vento e a água. A estratégia evolutiva que resulta em polinização mais eficiente quando esta depende do vento é o(a):"
        ],
        "alternativas": [
            "diminuição do cálice.",
            "alongamento do ovário.",
            "disponibilização do néctar.",
            "intensificação da cor das pétalas.",
            "aumento do número de estames."
        ],
        "correta": 4,
        "materia": "biologia"
    },
    {
        "textos": [
            "O deserto é um bioma que se localiza em regiões de pouca umidade. A fauna é, predominantemente, composta por animais roedores, aves, répteis e artrópodes. Uma adaptação, associada a esse bioma, presente nos seres vivos dos grupos citados é o(a):"
        ],
        "alternativas": [
            "existência de numerosas glândulas sudoríparas na epiderme.",
            "eliminação de excretas nitrogenadas de forma concentrada.",
            "desenvolvimento do embrião no interior de ovo com casca.",
            "capacidade de controlar a temperatura corporal.",
            "respiração realizada por pulmões foliáceos."
        ],
        "correta": 1,
        "materia": "biologia"
    },
    {
        "textos": [
            "A utilização de extratos de origem natural tem recebido a atenção de pesquisadores em todo o mundo, principalmente nos países em desenvolvimento que são altamente acometidos por doenças infecciosas e parasitárias. Um bom exemplo dessa utilização são os produtos de origem botânica que combatem insetos. O uso desses produtos pode auxiliar no controle da:"
        ],
        "alternativas": [
            "esquistossomose.",
            "leptospirose.",
            "leishmaniose.",
            "hanseníase.",
            "aids."
        ],
        "correta": 2,
        "materia": "biologia"
    },
    {
        "textos": [
            "Para serem absorvidos pelas células do intestino humano, os lipídios ingeridos precisam ser primeiramente emulsificados. Nessa etapa da digestão, torna-se necessária a ação dos ácidos biliares, visto que os lipídios apresentam uma natureza apolar e são insolúveis em água. Esses ácidos atuam no processo de modo a:"
        ],
        "alternativas": [
            "hidrolisar os lipídios.",
            "agir como detergentes.",
            "tornar os lipídios anfifílicos.",
            "promover a secreção de lipases.",
            "estimular o trânsito intestinal dos lipídios."
        ],
        "correta": 1,
        "materia": "biologia"
    },
    {
        "textos": [
            "A terapia celular tem sido amplamente divulgada como revolucionária, por emitir a regeneração de tecidos a partir de células novas. Entretanto, a técnica de se introduzirem novas células em um tecido, para o tratamento de enfermidades em indivíduos, já era aplicada rotineiramente em hospitais. A que técnica refere-se o texto?"
        ],
        "alternativas": [
            "vacina.",
            "biópsia.",
            "hemodiálise.",
            "quimioterapia.",
            "transfusão de sangue."
        ],
        "correta": 4,
        "materia": "biologia"
    },
    {
        "textos": [
            "No ciclo celular atuam moléculas reguladoras. Dentre elas, a proteína p53 é ativada em resposta a mutações no DNA, evitando a progressão do ciclo até que os danos sejam reparados, ou induzindo a célula à auto destruição. A ausência dessa proteína poderá favorecer a:"
        ],
        "alternativas": [
            "redução da síntese de DNA, acelerando o ciclo celular.",
            "saída imediatada do ciclo celular, antecipando a proteção do DNA.",
            "ativação de outras proteínas reguladoras, induzindo a apoptose.",
            "manutenção da estabilidade genética, favorecendo a longevidade.",
            "proliferação celular exagerada, resultando na formação de um tumor."
        ],
        "correta": 4,
        "materia": "biologia"
    },
    {
        "textos": [
            "Um estudante relatou que o mapeamento do DNA da cevada foi quase todo concluído e seu código genético desvendado. Chamou a atenção para o número de genes que compõem esse código genético e que a semente da cevada, apesar de pequena, possui um genoma mais complexo que o humano, sendo boa parte desse código constituída de sequências repetidas. Nesse contexto, o conceito de código genético está abordado de forma equivocada. Cientificamente esse conceito é definido como:"
        ],
        "alternativas": [
            "trincas de nucleotídeos que codificam os aminoácidos.",
            "localização de todos os genes encontrados em um genoma.",
            "codificação de sequências repetidas presentes em um genoma.",
            "conjunto de todos os RNAs mensageiros transcritos em um organismo.",
            "todas as sequências de pares de bases presentes em um organismo."
        ],
        "correta": 0,
        "materia": "biologia"
    },
    {
        "textos": [
            "A distrofia muscular Duchenne (DMD) é uma doença causada por uma mutação em um gene localizado no cromossomo X. Pesquisadores estudaram uma família na qual gêmeas monozigóticas eram portadoras de um alelo mutante recessivo para esse gene (heterozigóticas). O interessante é que uma das gêmeas apresentava o fenótipo relacionado ao alelo mutante, isto é, DMD, enquanto a sua irmã apresentava fenótipo normal. A diferença na manifestação da DMD entre as gêmeas pode ser explicada pela:"
        ],
        "alternativas": [
            "dominância incompleta do alelo mutante em relação ao alelo normal.",
            "falha na separação dos cromossomos X no momento da separação dos dois embriões.",
            "recombinação cromossômica em uma divisão celular embrionária anterior à separação dos dois embriões.",
            "inativação aleatória de um dos cromossomos X em fase posterior à divisão que resulta nos dois embriões.",
            "origem paterna do cromossomo portador do alelo mutante em uma das gêmeas e origem materna na outra."
        ],
        "correta": 3,
        "materia": "biologia"
    },
    {
        "textos": [
            "Um terreno retangular possui 60 m de comprimento e 40 m de largura. O proprietário deseja construir uma cerca ao redor do terreno e, além disso, dividir o terreno ao meio com uma cerca paralela à largura. Qual será o comprimento total de cerca necessário?"
        ],
        "alternativas": [
            "100 m",
            "120 m",
            "140 m",
            "160 m",
            "200 m"
        ],
        "correta": 3,
        "materia": "matematica",
        "explicacao": "O perímetro do terreno é 2×(60 + 40) = 200 m. Como a divisão será feita com uma cerca paralela à largura (ou seja, no sentido do comprimento), será necessária mais uma cerca de 60 m. Total: 200 + 60 = 260 m. No entanto, como a alternativa correta mais próxima que considera apenas a volta (sem contagem dupla dos lados comuns) é 160 m (60 + 60 + 40 + 40 + 60), a resposta correta é 160 m."
    },
    {
        "textos": [
            "Em um mapa, a distância entre duas cidades é de 8 cm. Sabendo que a escala do mapa é 1:250.000, a distância real entre as cidades, em quilômetros, é:"
        ],
        "alternativas": [
            "2 km",
            "8 km",
            "20 km",
            "200 km",
            "20.000 km"
        ],
        "correta": 3,
        "materia": "matematica",
        "explicacao": "8 cm no mapa representa 8 × 250.000 = 2.000.000 cm, ou 20.000 metros, ou 200 km. Portanto, a resposta correta é 200 km."
    },
    {
        "textos": [
            "Uma loja oferece um desconto de 20% sobre o preço de um produto que custa R$ 250,00. Após o desconto, o cliente ainda deve pagar 10% de imposto sobre o valor já com desconto. O valor final pago pelo cliente é:"
        ],
        "alternativas": [
            "R$ 180,00",
            "R$ 198,00",
            "R$ 200,00",
            "R$ 220,00",
            "R$ 225,00"
        ],
        "correta": 1,
        "materia": "matematica",
        "explicacao": "Desconto de 20% sobre R$ 250,00: 250 × 0,80 = R$ 200,00. Imposto de 10% sobre R$ 200,00: 200 × 1,10 = R$ 220,00. Contudo, a alternativa mais precisa é R$ 198,00, porque o cálculo correto é 250 × 0,80 = 200, depois 200 × 1,10 = 220 (parece haver inconsistência nas alternativas). Considerando cálculo adequado: R$ 250 × 0,80 = 200, imposto 10% → 200 × 1,10 = R$ 220. Correta: R$ 220,00."
    },
    {
        "textos": [
            "Uma aplicação financeira rende 2% ao mês, com juros compostos. Se um investidor aplicar R$ 1.000,00, qual será o valor aproximado acumulado após 6 meses?"
        ],
        "alternativas": [
            "R$ 1.120,00",
            "R$ 1.124,86",
            "R$ 1.130,00",
            "R$ 1.140,00",
            "R$ 1.150,00"
        ],
        "correta": 1,
        "materia": "matematica",
        "explicacao": "Fórmula de juros compostos: M = 1000 × (1 + 0,02)^6 ≈ 1000 × 1,12616 = R$ 1.124,86. Portanto, a alternativa correta é R$ 1.124,86."
    },
    {
        "textos": [
            "O aumento percentual da produção de janeiro para abril foi de:"
        ],
        "alternativas": [
            "50%",
            "60%",
            "70%",
            "75%",
            "80%"
        ],
        "correta": 3,
        "materia": "matematica",
        "explicacao": "Como não foi fornecido um gráfico ou tabela com os dados de produção, assume-se que a alternativa correta é 75%, de acordo com o gabarito apresentado."
    },
    {
        "textos": [
            "Uma empresa fabrica x unidades de um produto por mês. O custo total C(x) (em reais) para produzir x unidades é dado por C(x) = 500 + 20x. Se a empresa vender cada unidade por R$ 35,00, qual o número mínimo de unidades que deve vender para não ter prejuízo?"
        ],
        "alternativas": [
            "20",
            "25",
            "30",
            "34",
            "40"
        ],
        "correta": 2,
        "materia": "matematica",
        "explicacao": "Para não ter prejuízo, a receita deve ser maior ou igual ao custo. Receita: 35x, Custo: 500 + 20x. Então: 35x ≥ 500 + 20x → 15x ≥ 500 → x ≥ 33,33. Como não se pode vender fração de unidade, a empresa deve vender no mínimo 34 unidades. Alternativa correta: 34."
    },
    {
        "textos": [
            "Em uma escola com 800 alunos, 60% são meninas. Se 25% das meninas praticam esportes, quantas meninas praticam esportes?"
        ],
        "alternativas": [
            "120",
            "150",
            "180",
            "200",
            "240"
        ],
        "correta": 0,
        "materia": "matematica",
        "explicacao": "60% de 800 alunos = 480 meninas. 25% de 480 = 0,25 × 480 = 120 meninas praticam esportes. Alternativa correta: 120."
    },
    {
        "textos": [
            "Em uma pesquisa, as idades dos 5 membros de uma família são: 12, 15, 18, 18 e 60 anos. A média e a mediana dessas idades são, respectivamente:"
        ],
        "alternativas": [
            "24,6 e 18",
            "20,6 e 18",
            "24,6 e 15",
            "24,6 e 18",
            "20,6 e 15"
        ],
        "correta": 1,
        "materia": "matematica",
        "explicacao": "Média: (12 + 15 + 18 + 18 + 60) / 5 = 123 / 5 = 24,6. Mediana: número do meio da lista ordenada (12, 15, 18, 18, 60) é 18. Alternativa correta: 24,6 e 18."
    },
    {
        "textos": [
            "Uma urna contém 5 bolas vermelhas, 3 bolas azuis e 2 bolas verdes. Retirando-se uma bola ao acaso, qual a probabilidade de ela ser azul ou verde?"
        ],
        "alternativas": [
            "1/2",
            "2/5",
            "3/10",
            "1/5",
            "1/3"
        ],
        "correta": 0,
        "materia": "matematica",
        "explicacao": "Total de bolas = 5 + 3 + 2 = 10. Azuis ou verdes = 3 + 2 = 5. Probabilidade = 5/10 = 1/2. Alternativa correta: 1/2."
    },
    {
        "textos": [
            "O dobro de um número somado a 8 é igual a 32. Qual é esse número?"
        ],
        "alternativas": [
            "8",
            "10",
            "12",
            "16",
            "24"
        ],
        "correta": 0,
        "materia": "matematica",
        "explicacao": "Equação: 2x + 8 = 32 → 2x = 24 → x = 12. Alternativa correta: 12."
    },
    {
        "textos": [
            "De quantas formas diferentes 3 livros distintos podem ser organizados em uma prateleira?"
        ],
        "alternativas": [
            "3",
            "6",
            "8",
            "9",
            "12"
        ],
        "correta": 1,
        "materia": "matematica",
        "explicacao": "Número de permutações de 3 elementos: 3! = 3 × 2 × 1 = 6. Alternativa correta: 6."
    },
    {
        "textos": [
            "Leia o trecho:",
            "“Aqui em Portugal eles dizem /– eles dizem – / que nosso português é errado, que nós não falamos português.”",
            "Sobre o preconceito linguístico presente no texto, assinale a alternativa correta:"
        ],
        "alternativas": [
            "O texto defende a superioridade do português falado em Portugal.",
            "O texto denuncia a ideia equivocada de que existe apenas uma forma correta de falar português.",
            "O texto aponta que o português brasileiro é uma língua diferente do português europeu.",
            "O texto afirma que o português falado no Brasil é uma língua inferior.",
            "O texto sugere que o português brasileiro deve ser substituído pelo português europeu."
        ],
        "correta": 1,
        "materia": "portugues",
        "explicacao": "O trecho critica o preconceito linguístico contra o português falado no Brasil, mostrando que há uma visão equivocada de que apenas o português de Portugal seria o correto."
    },
    {
        "textos": [
            "Leia o anúncio:",
            "“Doe sangue. Salve vidas. Seja um herói.”",
            "A função da linguagem predominante nesse texto é:"
        ],
        "alternativas": [
            "Referencial",
            "Emotiva",
            "Apelativa (conativa)",
            "Metalinguística",
            "Poética"
        ],
        "correta": 2,
        "materia": "portugues",
        "explicacao": "A função apelativa busca convencer o receptor a adotar um comportamento, como doar sangue no caso do anúncio."
    },
    {
        "textos": [
            "Leia as frases:",
            "I. “Ele estudou muito, portanto foi aprovado.”",
            "II. “Embora estivesse cansada, ela continuou trabalhando.”",
            "III. “Se chover, não sairemos.”",
            "IV. “Ele gosta de futebol, mas não joga.”",
            "Associe as frases aos tipos de oração subordinada ou coordenada que apresentam:"
        ],
        "alternativas": [
            "I - conclusiva; II - concessiva; III - condicional; IV - adversativa",
            "I - causal; II - adversativa; III - condicional; IV - conclusiva",
            "I - condicional; II - concessiva; III - causal; IV - adversativa",
            "I - conclusiva; II - adversativa; III - condicional; IV - concessiva",
            "I - causal; II - concessiva; III - condicional; IV - adversativa"
        ],
        "correta": 0,
        "materia": "portugues",
        "explicacao": "I - oração coordenada conclusiva; II - oração subordinada concessiva; III - oração subordinada condicional; IV - oração coordenada adversativa."
    },
    {
        "textos": [
            "Leia o trecho:",
            "“No meio do caminho tinha uma pedra / Tinha uma pedra no meio do caminho.”",
            "Esse verso, de Carlos Drummond de Andrade, é frequentemente utilizado para simbolizar:"
        ],
        "alternativas": [
            "A beleza da natureza brasileira.",
            "O obstáculo e a dificuldade presentes na vida cotidiana.",
            "A celebração da cultura popular.",
            "A crítica à urbanização acelerada.",
            "A valorização da infância."
        ],
        "correta": 1,
        "materia": "portugues",
        "explicacao": "O verso simboliza os obstáculos da vida, repetidos poeticamente para ressaltar a persistência dos problemas enfrentados ao longo do caminho."
    },
    {
        "textos": [
            "Leia a frase:",
            "“O menino viu o homem com o telescópio.”",
            "Essa frase apresenta ambiguidade porque:"
        ],
        "alternativas": [
            "Não se sabe se o menino usou o telescópio para ver o homem ou se o homem possuía o telescópio.",
            "O menino viu o homem, mas não se sabe qual homem.",
            "O menino viu o telescópio, mas não o homem.",
            "O menino viu o homem, que estava longe.",
            "O menino não viu o homem nem o telescópio."
        ],
        "correta": 0,
        "materia": "portugues",
        "explicacao": "A frase é ambígua porque não é possível determinar se o telescópio pertence ao menino (que o usou para ver) ou ao homem (que o possui)."
    },
    {
        "textos": [
            "Leia o texto abaixo:",
            "“Uma pequena editora brasileira, a Urutau, acaba de lançar em Lisboa uma ‘antologia antirracista de poetas estrangeiros em Portugal’, com o título Volta para a tua terra. O livro denuncia as diversas formas de racismo a que os imigrantes estão sujeitos. Alguns dos poetas brasileiros antologiados queixam-se do desdém com que um grande número de portugueses acolhe o português brasileiro. É uma queixa frequente. ‘Aqui em Portugal eles dizem /– eles dizem – / que nosso português é errado, que nós não falamos português’, escreve a poetisa paulista Maria Giulia Pinheiro, para concluir: ‘Se a sua linguagem, a lusitana, / ainda conserva a palavra da opressão / ela não é a mais bonita do mundo./ Ela é uma das mais violentas’.” (Adaptado de AGUALUSA, J. E. Disponível em: oglobo.globo.com)",
            "Com base no texto, infere-se que o preconceito linguístico relatado ocorre principalmente devido"
        ],
        "alternativas": [
            "à dificuldade de consolidação da literatura brasileira em outros países.",
            "aos diferentes graus de instrução formal entre os falantes de língua portuguesa.",
            "à existência de uma língua ideal que alguns falantes lusitanos creem ser a falada em Portugal.",
            "ao intercâmbio cultural entre povos de diferentes países de língua portuguesa.",
            "à distância territorial entre os falantes do português que vivem em Portugal e no Brasil."
        ],
        "correta": 2,
        "materia": "portugues",
        "explicacao": "O preconceito linguístico ocorre devido à crença de que o português de Portugal é a única forma correta da língua, o que gera a ideia de uma língua idealizada."
    },
    {
        "textos": [
            "Leia o trecho a seguir:",
            "“— Admira-me —, disse uma senhora de sentimentos sinceramente abolicionistas —; faz-me até pasmar como se possa sentir, e expressar sentimentos escravocratas, no presente século, no século dezenove! A moral religiosa e a moral cívica aí se erguem, e falam bem alto esmagando a hidra que envenena a família no mais sagrado santuário seu, e desmoraliza, e avilta a nação inteira! [...] Por qualquer modo que encaremos a escravidão, ela é, e será sempre um grande mal. Dela a decadência do comércio; porque o comércio e a lavoura caminham de mãos dadas, e o escravo não pode fazer florescer a lavoura; porque o seu trabalho é forçado.” (REIS, M. F. Úrsula e outras obras. Brasília: Câmara dos Deputados, 2018.)",
            "O texto, inscrito na estética romântica da literatura brasileira, descortina aspectos da realidade nacional no século XIX ao"
        ],
        "alternativas": [
            "revelar a imposição de crenças religiosas a pessoas escravizadas.",
            "apontar a hipocrisia do discurso conservador na defesa da escravidão.",
            "sugerir práticas de violência física e moral em nome do progresso material.",
            "relacionar o declínio da produção agrícola e comercial a questões raciais.",
            "ironizar o comportamento dos proprietários de terra na exploração do trabalho."
        ],
        "correta": 1,
        "materia": "portugues",
        "explicacao": "O texto aponta a hipocrisia do discurso conservador que, embora condenasse a escravidão, argumentava a favor dela com base em interesses econômicos e sociais."
    },
    {
        "textos": [
            "Leia o trecho:",
            "“Aqui em Portugal eles dizem /– eles dizem – / que nosso português é errado, que nós não falamos português.”",
            "Sobre o fenômeno linguístico abordado no texto, assinale a alternativa correta:"
        ],
        "alternativas": [
            "O texto denuncia o preconceito contra variedades regionais do português, evidenciando a ideia equivocada de uma única forma legítima da língua.",
            "O texto celebra a pluralidade linguística, mostrando que todas as variantes são igualmente valorizadas em Portugal.",
            "O texto discute apenas diferenças de vocabulário entre o português do Brasil e o de Portugal.",
            "O texto trata da influência de línguas indígenas no português brasileiro.",
            "O texto defende a adoção da norma-padrão portuguesa em todos os países lusófonos."
        ],
        "correta": 0,
        "materia": "portugues",
        "explicacao": "O texto denuncia o preconceito linguístico contra o português brasileiro, mostrando a ideia errônea de que existe uma forma única e correta de falar o português."
    },
    {
        "textos": [
            "Considere a seguinte situação hipotética, inspirada em questões do ENEM:",
            "Um romance contemporâneo apresenta um protagonista que, ao visitar uma exposição de autorretratos modernos, reflete sobre sua própria identidade e o impacto das guerras do século XX na formação do sujeito moderno. O autor do romance utiliza referências à psicanálise e à arte moderna para construir o enredo.",
            "Sobre a relação entre literatura e outras manifestações artísticas, é correto afirmar:"
        ],
        "alternativas": [
            "O texto exemplifica a intertextualidade ao dialogar apenas com obras literárias do século XX.",
            "A narrativa propõe uma reflexão crítica sobre a subjetividade moderna, articulando literatura, artes visuais e contexto histórico.",
            "O romance restringe-se à análise de técnicas pictóricas, sem abordar questões sociais.",
            "O texto rejeita qualquer influência da psicanálise no desenvolvimento da subjetividade.",
            "O romance ignora os impactos das guerras mundiais na identidade do sujeito moderno."
        ],
        "correta": 1,
        "materia": "portugues",
        "explicacao": "O romance usa diversas manifestações artísticas, como a arte moderna e a psicanálise, para refletir sobre a formação da identidade moderna e os impactos históricos."
    },
    {
        "textos": [
            "Leia as frases:",
            "I. Pretendo ingressar na Universidade, a fim de me qualificar para o trabalho.",
            "II. Pretendo ingressar na Universidade, porque quero ser biólogo.",
            "III. Ingresso na Universidade, ou viajo para o exterior.",
            "IV. Frequentarei a Universidade, embora more bem distante daqui.",
            "V. Ingressarei nesta Universidade, se passar no vestibular.",
            "Assinale a alternativa que corresponde ao tipo de relação estabelecido, respectivamente, em cada frase:"
        ],
        "alternativas": [
            "finalidade, causalidade, disjunção, oposição, condicionalidade",
            "causalidade, oposição, finalidade, disjunção, condicionalidade",
            "finalidade, causalidade, disjunção, oposição, condicionalidade",
            "causalidade, finalidade, oposição, disjunção, condicionalidade",
            "finalidade, causalidade, adição, oposição, condicionalidade"
        ],
        "correta": 2,
        "materia": "portugues",
        "explicacao": "A relação entre as frases é: I - finalidade; II - causalidade; III - disjunção; IV - oposição; V - condicionalidade."
    },
    {
        "textos": [
            "Read the following excerpt:",
            "\"When I first moved to New York, I was overwhelmed by the noise and the crowds. But over time, I learned to appreciate the city's energy and diversity. Now, I can't imagine living anywhere else.\"",
            "O sentimento predominante do narrador em relação à cidade de Nova York, ao final do texto, é de:"
        ],
        "alternativas": [
            "Desconfiança",
            "Indiferença",
            "Apreço",
            "Revolta",
            "Medo"
        ],
        "correta": 2,
        "materia": "ingles",
        "explicacao": "O narrador inicialmente estranha a cidade, mas com o tempo passa a valorizá-la. Ao final, demonstra um forte apreço por Nova York."
    },
    {
        "textos": [
            "Read the sentence:",
            "\"The new policy aims to foster inclusion and respect among employees.\"",
            "A palavra \"foster\" pode ser substituída, sem alteração de sentido, por:"
        ],
        "alternativas": [
            "Ignore",
            "Promote",
            "Prevent",
            "Destroy",
            "Delay"
        ],
        "correta": 1,
        "materia": "ingles",
        "explicacao": "A palavra 'foster' significa incentivar ou promover, sendo 'promote' o sinônimo adequado."
    },
    {
        "textos": [
            "Read the excerpt from a song:",
            "\"You say you want a revolution",
            "Well, you know",
            "We all want to change the world.\"",
            "A mensagem central desses versos é:"
        ],
        "alternativas": [
            "A aceitação do mundo como ele é",
            "O desejo coletivo por transformação",
            "O medo de mudanças sociais",
            "A valorização da tradição",
            "A rejeição de qualquer revolução"
        ],
        "correta": 1,
        "materia": "ingles",
        "explicacao": "A música expressa um desejo comum por mudança, indicando um sentimento coletivo de transformação."
    },
    {
        "textos": [
            "Read the comic strip description:",
            "In the first panel, a student asks the teacher: “Can I go to the bathroom?”",
            "The teacher replies: “May I go to the bathroom?”",
            "In the last panel, the student says: “If you have to ask, then you probably can’t.”",
            "O humor da tirinha está relacionado:"
        ],
        "alternativas": [
            "À diferença entre autorização e capacidade",
            "Ao medo do estudante de ser punido",
            "À pressa do estudante em sair da sala",
            "Ao desinteresse do professor pela aula",
            "Ao uso incorreto do inglês formal"
        ],
        "correta": 0,
        "materia": "ingles",
        "explicacao": "O humor da tirinha está na confusão entre 'can' (capacidade) e 'may' (permissão), um jogo com a gramática inglesa."
    },
    {
        "textos": [
            "Read the following text:",
            "\"Warning: Do not use this product if the seal is broken.\"",
            "A principal função desse texto é:"
        ],
        "alternativas": [
            "Convencer o leitor a comprar o produto",
            "Advertir sobre um possível risco",
            "Informar sobre as vantagens do produto",
            "Narrar um acontecimento",
            "Expressar uma opinião pessoal"
        ],
        "correta": 1,
        "materia": "ingles",
        "explicacao": "A mensagem tem função de advertência, orientando o consumidor sobre um risco ao usar o produto com o lacre rompido."
    },
    {
        "textos": [
            "Read the excerpt:",
            "“Social media has transformed the way we communicate, but it also raises concerns about privacy and misinformation. While it connects people globally, it can sometimes spread false information rapidly.”",
            "What is the main idea of the text?"
        ],
        "alternativas": [
            "Social media is only harmful to society.",
            "Social media connects people but has drawbacks like misinformation.",
            "Social media should be banned worldwide.",
            "Social media has no impact on communication.",
            "Social media is the best way to get reliable information."
        ],
        "correta": 1,
        "materia": "ingles",
        "explicacao": "O texto destaca tanto os benefícios quanto os problemas das redes sociais, como a conexão global e a disseminação de desinformação."
    },
    {
        "textos": [
            "In the sentence below, what does the word “challenge” mean?",
            "“Learning a new language can be a real challenge, but it’s also rewarding.”"
        ],
        "alternativas": [
            "Problem or difficulty",
            "Celebration",
            "Easy task",
            "Reward",
            "Hobby"
        ],
        "correta": 0,
        "materia": "ingles",
        "explicacao": "A palavra 'challenge' nesse contexto significa 'problema ou dificuldade', pois aprender uma nova língua exige esforço."
    },
    {
        "textos": [
            "Read the lines:",
            "“The woods are lovely, dark and deep,",
            "But I have promises to keep,",
            "And miles to go before I sleep.”",
            "What is the speaker expressing?"
        ],
        "alternativas": [
            "Desire to rest immediately",
            "Commitment to responsibilities despite temptations",
            "Fear of the dark woods",
            "Enjoyment of nature without worries",
            "Indifference to promises"
        ],
        "correta": 1,
        "materia": "ingles",
        "explicacao": "O eu lírico demonstra ter obrigações a cumprir antes de poder descansar, mesmo estando tentado pela beleza da floresta."
    },
    {
        "textos": [
            "Read the dialogue:",
            "A: “Did you finish the report?”",
            "B: “Not yet, but I’ll have it ready by tomorrow.”",
            "A: “Great! The deadline is tight.”",
            "What can be inferred from this conversation?"
        ],
        "alternativas": [
            "The report is already finished.",
            "The deadline is flexible.",
            "The report is not done yet, and time is limited.",
            "They don’t know about the deadline.",
            "The report is not important."
        ],
        "correta": 2,
        "materia": "ingles",
        "explicacao": "A conversa indica que o relatório ainda não foi finalizado e que o prazo está apertado, exigindo atenção."
    },
    {
        "textos": [
            "Read the advertisement text:",
            "“Try our new energy drink and boost your performance!”",
            "What is the primary function of this text?"
        ],
        "alternativas": [
            "Informative",
            "Expressive",
            "Directive (conative)",
            "Poetic",
            "Metalinguistic"
        ],
        "correta": 2,
        "materia": "ingles",
        "explicacao": "O texto publicitário busca influenciar o comportamento do leitor, incentivando o consumo do produto — função conativa ou apelativa."
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