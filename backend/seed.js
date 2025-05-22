const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json"); // certifique-se que está correto

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const perguntas = [
  {
    "texto": {
      "id": "texto_1",
      "titulo": "No Man Is an Island",
      "autor": "John Donne",
      "conteudo": "No man is an island, entire of itself; every man is a piece of the continent, a part of the main. If a clod be washed away by the sea, Europe is the less, as well as if a promontory were, as well as if a manor of thy friend’s or of thine own were; any man’s death diminishes me, because I am involved in mankind, and therefore never send to know for whom the bell tolls; it tolls for thee."
    },
    "pergunta": "No poema 'No man is an island', a expressão ressalta o(a):",
    "opcoes": {
      "0": "medo da morte.",
      "1": "ideia de conexão.",
      "2": "conceito de solidão.",
      "3": "risco de devastação.",
      "4": "necessidade de empatia."
    },
    "correta": 1,
    "materia": "Língua Inglesa",
    "explicacao": "A expressão 'No man is an island' ressalta a ideia de que nenhum ser humano é totalmente independente ou isolado, pois todos fazem parte de uma coletividade. O poema enfatiza a interconexão entre os indivíduos e como a perda de um afeta a todos."
  },
  {
    "texto": {
      "id": "texto_2",
      "conteudo": "Don’t write in English, they said,\nEnglish is not your mother tongue…\n…The language I speak\nBecomes mine, its distortions, its queerness\nAll mine, mine alone, it is half English, half\nIndian, funny perhaps, but it is honest,\nIt is as human as I am human…\n…It voices my joys, my longings my\nHopes…"
    },
    "pergunta": "No poema de Kamala Das, a autora demonstra:",
    "opcoes": {
      "0": "uso humorístico do inglês.",
      "1": "consciência de sua identidade linguística.",
      "2": "crítica ao inglês britânico.",
      "3": "desejo de abandonar o inglês.",
      "4": "preferência pelo hindi."
    },
    "correta": 1,
    "materia": "Língua Inglesa",
    "explicacao": "A autora expressa que, embora o inglês não seja sua língua materna, ela o torna seu, com todas as suas peculiaridades e mistura com o indiano. Isso demonstra consciência de sua identidade linguística."
  },
  {
    "texto": {
      "id": "texto_3",
      "conteudo": "British Government to Recruit Teens as Next Generation of Spies\nIn the 50 years since the first James Bond movie created a lasting impression of a British secret agent, a completely different character is about to emerge.\nBritain’s intelligence agencies are to recruit their next generation of cyber spies by harnessing the talents of the “Xbox generation”.\nIn an expansion of a pilot program, Foreign Secretary William Hague announced Thursday that up to 100 18-year-olds will be given the chance to train for a career in Britain’s secret services. The move to recruit school-leavers marks a break with the past, when agencies mainly drew their staff from among university graduates.\n“Young people are the key to our country’s future success, just as they were during the War”, Hague said. “Today we are not at war, but I see evidence every day of deliberate, organized attacks against intellectual property and government networks in the United Kingdom.”\nThe new recruitment program, called the Single Intelligence Account apprenticeship scheme will enable students with suitable qualifications in science, technology or engineering, to spend two years learning about communications, security and engineering through formal education, technical training and work placements."
    },
    "pergunta": "Sobre o texto, o objetivo principal da notícia é:",
    "opcoes": {
      "0": "anunciar uma nova série de TV.",
      "1": "divulgar uma campanha de recrutamento.",
      "2": "criticar o governo britânico.",
      "3": "relatar um escândalo de espionagem.",
      "4": "informar sobre um programa estudantil."
    },
    "correta": 1,
    "materia": "Língua Inglesa",
    "explicacao": "O texto divulga uma campanha real de recrutamento de jovens para o serviço secreto britânico, com foco em jovens com formação técnica em ciência, tecnologia ou engenharia."
  },
  {
    "texto": {
      "id": "texto_4",
      "conteudo": "Um estudante olha para o colega segurando um livro impresso e pergunta: \"Can you turn this thing on?\""
    },
    "pergunta": "No cartum, o estudante faz uma pergunta usando “turn this thing on” por:",
    "opcoes": {
      "0": "suspeitar que o colega está com seu material por engano.",
      "1": "duvidar que o colega possa se tornar um bom aluno.",
      "2": "desconfiar que o livro levado é de outra matéria.",
      "3": "entender como desligada a postura do colega.",
      "4": "desconhecer como usar um livro impresso."
    },
    "correta": "4",
    "explicacao": "O estudante usa um termo típico de aparelhos eletrônicos para um livro impresso, mostrando desconhecimento do uso do livro físico."
  },
  {
    "texto": {
      "id": "texto_5",
      "conteudo": "Instagram is made up of all photos and videos. There is the home page that showcases the posts from people you follow, an explore tab which offers posts from accounts all over the world, and your own page, with a notification tab to show who likes and comments on your posts."
    },
    "pergunta": "A função do texto é:",
    "opcoes": {
      "0": "ensinar como criar uma conta.",
      "1": "descrever funcionalidades da rede social.",
      "2": "apresentar riscos do uso excessivo.",
      "3": "comparar com outras redes sociais.",
      "4": "relatar experiências negativas."
    },
    "correta": "1",
    "explicacao": "O texto explica as funções básicas do Instagram, como feed, explore e notificações."
  },
  {
    "texto": {
      "id": "texto_6",
      "conteudo": "Last Monday was a really awful day. I woke up late, missed the bus, and forgot my homework at home. Then, I spilled coffee on my shirt and lost my wallet."
    },
    "pergunta": "O narrador utiliza o texto para:",
    "opcoes": {
      "0": "justificar sua ausência na escola.",
      "1": "relatar um dia de problemas.",
      "2": "lamentar a perda da aula.",
      "3": "reclamar do atraso do ônibus.",
      "4": "contar uma história engraçada."
    },
    "correta": "1",
    "explicacao": "O texto descreve sucessivos problemas, caracterizando um dia ruim."
  },
  {
    "texto": {
      "id": "texto_7",
      "conteudo": "Know what you’re putting in your body. Read the labels before you buy food products."
    },
    "pergunta": "O objetivo do texto é:",
    "opcoes": {
      "0": "incentivar a leitura de rótulos alimentares.",
      "1": "promover uma marca de alimentos.",
      "2": "ensinar a cozinhar.",
      "3": "criticar a indústria alimentícia.",
      "4": "sugerir dietas restritivas."
    },
    "correta": "0",
    "explicacao": "O texto orienta o leitor a ler rótulos para saber o que consome."
  },
  {
    "texto": {
      "id": "texto_8",
      "conteudo": "Depois de 27 selfies, eu percebi que a beleza da alma é mais importante."
    },
    "pergunta": "O recurso expressivo utilizado é:",
    "opcoes": {
      "0": "hipérbole.",
      "1": "pleonasmo.",
      "2": "ambiguidade.",
      "3": "paradoxo.",
      "4": "eufemismo."
    },
    "gabarito": "0",
    "explicacao": "O exagero na quantidade de selfies caracteriza a hipérbole, gerando humor e crítica."
  },
  {
    "texto": {
      "id": "texto_9",
      "conteudo": "Learning idioms is essential if you want to master the English language."
    },
    "pergunta": "O que significa “idioms”?",
    "opcoes": {
      "a": "ideias",
      "b": "expressões idiomáticas",
      "c": "palavras difíceis",
      "d": "frases longas",
      "e": "textos antigos"
    },
    "gabarito": "b",
    "explicacao": "“Idioms” são expressões idiomáticas, importantes para fluência."
  },
  {
    "texto": {
      "id": "texto_10",
      "conteudo": "I’m starving! I didn’t have time to have lunch today, so I just ate a snack."
    },
    "pergunta": "A palavra “starving” significa:",
    "opcoes": {
      "0": "cansado",
      "1": "doente",
      "2": "faminto",
      "3": "atrasado",
      "4": "animado"
    },
    "gabarito": "2",
    "explicacao": "“Starving” indica estar com muita fome."
  },
  {
    "texto": {
      "id": "texto_11",
      "conteudo": "She works at a fabric factory."
    },
    "pergunta": "“Fabric factory” significa:",
    "opcoes": {
      "0": "fábrica de tecidos.",
      "1": "fábrica de móveis.",
      "2": "fábrica de brinquedos.",
      "3": "fábrica de plásticos.",
      "4": "fábrica de roupas."
    },
    "gabarito": "0",
    "explicacao": "“Fabric” é tecido; logo, “fabric factory” é fábrica de tecidos."
  },
  {
    "texto": {
      "id": "texto_12",
      "conteudo": "I’m going to visit my relatives this weekend."
    },
    "pergunta": "“Relatives” significa:",
    "opcoes": {
      "0": "amigos",
      "1": "vizinhos",
      "2": "parentes",
      "3": "colegas",
      "4": "conhecidos"
    },
    "gabarito": "2",
    "explicacao": "“Relatives” são parentes."
  },
  {
    "texto": {
      "id": "texto_13",
      "conteudo": "We must fight against prejudice in society."
    },
    "pergunta": "Prejudice significa:",
    "opcoes": {
      "0": "orgulho",
      "1": "preconceito",
      "2": "respeito",
      "3": "inveja",
      "4": "simpatia"
    },
    "correta": "1",
    "explicacao": "\"Prejudice\" é preconceito."
  },
  {
    "texto": {
      "id": "texto_14",
      "conteudo": "The child pretended to be a superhero."
    },
    "pergunta": "“Pretend” significa:",
    "opcoes": {
      "0": "pretender",
      "1": "fingir",
      "2": "tentar",
      "3": "desejar",
      "4": "permitir"
    },
    "gabarito": "1",
    "explicacao": "“Pretend” é um falso cognato, significando “fingir”."
  },
  {
    "pergunta": "Qual das seguintes características NÃO corresponde à agricultura de jardinagem (ou rizicultura intensiva)?",
    "opcoes": {
      "0": "Utilização intensiva de mão de obra.",
      "1": "Pequena propriedade familiar.",
      "2": "Monocultura de arroz.",
      "3": "Elevada mecanização das atividades."
    },
    "correta": 3,
    "materia": "Geografia",
    "explicacao": "A agricultura de jardinagem, típica de áreas densamente povoadas da Ásia, caracteriza-se pelo uso intensivo de mão de obra e técnicas manuais, com baixa mecanização."
  },
  {
    "pergunta": "O conceito de 'reforma agrária' refere-se principalmente à:",
    "opcoes": {
      "0": "Modernização das técnicas agrícolas.",
      "1": "Redistribuição de terras com o objetivo de promover maior equidade social e produtividade.",
      "2": "Expansão das áreas de monocultura para exportação.",
      "3": "Criação de grandes latifúndios voltados para a pecuária extensiva."
    },
    "correta": 1,
    "materia": "Geografia",
    "explicacao": "A reforma agrária busca alterar a estrutura fundiária, democratizando o acesso à terra e promovendo o desenvolvimento social e econômico no meio rural."
  },
  {
    "pergunta": "Qual sistema agrícola é caracterizado pela produção em larga escala, voltada para a exportação, com uso intensivo de tecnologia e, frequentemente, monocultura?",
    "opcoes": {
      "0": "Agricultura familiar.",
      "1": "Agricultura orgânica.",
      "2": "Agribusiness (ou agronegócio).",
      "3": "Agricultura de subsistência."
    },
    "correta": 2,
    "materia": "Geografia",
    "explicacao": "O agribusiness engloba toda a cadeia produtiva do agronegócio, desde a produção agrícola em larga escala até a industrialização e comercialização, com forte orientação para o mercado."
  },
  {
    "pergunta": "A agricultura itinerante (ou de corte e queima) é praticada principalmente em áreas de:",
    "opcoes": {
      "0": "Clima temperado com solos férteis.",
      "1": "Clima semiárido com escassez de água.",
      "2": "Florestas tropicais com solos relativamente pobres.",
      "3": "Planícies aluviais com alta fertilidade natural."
    },
    "correta": 2,
    "materia": "Geografia",
    "explicacao": "A agricultura itinerante é adaptada a áreas de floresta tropical, onde a fertilidade do solo é rapidamente esgotada, exigindo o deslocamento periódico das áreas de cultivo."
  },
  {
    "pergunta": "Qual das seguintes atividades NÃO faz parte do setor primário da economia?",
    "opcoes": {
      "0": "Pecuária.",
      "1": "Agricultura.",
      "2": "Indústria têxtil.",
      "3": "Extrativismo vegetal."
    },
    "correta": 2,
    "materia": "Geografia",
    "explicacao": "A indústria têxtil pertence ao setor secundário, que transforma matérias-primas em produtos manufaturados. O setor primário é voltado para a extração e produção de recursos naturais."
  },
  {
    "pergunta": "O efeito estufa é um fenômeno natural essencial para a vida na Terra, pois:",
    "opcoes": {
      "0": "Impede a entrada de raios ultravioleta prejudiciais.",
      "1": "Regula a temperatura global, mantendo o planeta aquecido.",
      "2": "Aumenta a concentração de oxigênio na atmosfera.",
      "3": "Neutraliza a poluição atmosférica."
    },
    "correta": 1,
    "materia": "Geografia",
    "explicacao": "O efeito estufa retém parte da radiação solar refletida pela Terra, mantendo a temperatura média global em níveis adequados para a existência da vida."
  },
  {
    "pergunta": "Qual das seguintes atividades humanas é considerada a principal causa do aumento do efeito estufa e do aquecimento global?",
    "opcoes": {
      "0": "Prática de agricultura orgânica.",
      "1": "Utilização de energias renováveis, como a solar e a eólica.",
      "2": "Queima de combustíveis fósseis (petróleo, carvão e gás natural).",
      "3": "Implementação de programas de reflorestamento."
    },
    "correta": 2,
    "materia": "Geografia",
    "explicacao": "A queima de combustíveis fósseis libera grandes quantidades de gases de efeito estufa na atmosfera, intensificando o fenômeno natural e levando ao aumento da temperatura global."
  },
  {
    "pergunta": "A destruição da camada de ozônio na estratosfera tem como uma das principais consequências:",
    "opcoes": {
      "0": "O aumento da incidência de chuvas ácidas.",
      "1": "A intensificação do efeito estufa.",
      "2": "O aumento da radiação ultravioleta que atinge a superfície terrestre.",
      "3": "O aumento da poluição sonora nas grandes cidades."
    },
    "correta": 2,
    "materia": "Geografia",
    "explicacao": "A camada de ozônio filtra grande parte da radiação ultravioleta (UV) emitida pelo Sol. Sua destruição aumenta a exposição aos raios UV, que são prejudiciais à saúde humana e ao meio ambiente."
  },
  {
    "pergunta": "Qual dos seguintes problemas ambientais está diretamente relacionado ao desmatamento de grandes áreas florestais?",
    "opcoes": {
      "0": "Aumento da biodiversidade local.",
      "1": "Redução da erosão do solo e do assoreamento de rios.",
      "2": "Perda de habitat de espécies e aumento da emissão de gases de efeito estufa.",
      "3": "Diminuição da ocorrência de inundações."
    },
    "correta": 2,
    "materia": "Geografia",
    "explicacao": "O desmatamento causa a perda de habitat para diversas espécies, contribuindo para a extinção, e libera o carbono armazenado nas árvores na forma de dióxido de carbono, um importante gás de efeito estufa."
  },
  {
    "pergunta": "O conceito de 'desenvolvimento sustentável' busca:",
    "opcoes": {
      "0": "Priorizar o crescimento econômico a qualquer custo.",
      "1": "Explorar os recursos naturais de forma ilimitada para atender às necessidades presentes.",
      "2": "Conciliar o desenvolvimento econômico e social com a preservação ambiental para as gerações futuras.",
      "3": "Interromper o desenvolvimento econômico para garantir a preservação total do meio ambiente."
    },
    "correta": 2,
    "materia": "Geografia",
    "explicacao": "O desenvolvimento sustentável propõe um modelo de desenvolvimento que atenda às necessidades do presente sem comprometer a capacidade das futuras gerações de atenderem às suas próprias necessidades."
  },
   {
    "pergunta": "Qual das seguintes características NÃO é típica de uma economia globalizada?",
    "opcoes": {
      "0": "Aumento do fluxo de capitais entre os países.",
      "1": "Expansão do comércio internacional de bens e serviços.",
      "2": "Diminuição da importância das empresas multinacionais.",
      "3": "Maior interdependência econômica entre as nações."
    },
    "correta": 2,
    "materia": "Geografia",
    "explicacao": "As empresas multinacionais desempenham um papel central na economia globalizada, atuando em diversos países e integrando cadeias produtivas em escala mundial."
  },
  {
    "pergunta": "O termo 'Neoliberalismo' se refere a um conjunto de políticas econômicas que defendem principalmente:",
    "opcoes": {
      "0": "A forte intervenção do Estado na economia.",
      "1": "O aumento dos gastos públicos em programas sociais.",
      "2": "A liberalização dos mercados, a privatização de empresas estatais e a redução do papel do Estado na economia.",
      "3": "A proteção da indústria nacional através de barreiras tarifárias."
    },
    "correta": 2,
    "materia": "Geografia",
    "explicacao": "O neoliberalismo é uma doutrina econômica que enfatiza a liberdade de mercado, a mínima intervenção estatal e a abertura econômica como motores do crescimento."
  },
  {
    "pergunta": "Qual das seguintes organizações NÃO é um exemplo de bloco econômico regional?",
    "opcoes": {
      "0": "União Europeia (UE).",
      "1": "Mercado Comum do Sul (Mercosul).",
      "2": "Organização dos Países Exportadores de Petróleo (OPEP).",
      "3": "Acordo de Livre Comércio da América do Norte (NAFTA/USMCA)."
    },
    "correta": 2,
    "materia": "Geografia",
    "explicacao": "A OPEP é uma organização de países produtores de petróleo com o objetivo de coordenar políticas de produção e preços, não sendo um bloco econômico regional com foco na integração comercial abrangente."
  },
  {
    "pergunta": "O conceito de 'Divisão Internacional do Trabalho' (DIT) descreve:",
    "opcoes": {
      "0": "A distribuição de tarefas dentro de uma mesma empresa multinacional.",
      "1": "A especialização de diferentes países em determinadas atividades econômicas no contexto da economia global.",
      "2": "A migração de trabalhadores entre países em busca de melhores oportunidades.",
      "3": "A criação de sindicatos internacionais para defender os direitos dos trabalhadores."
    },
    "correta": 1,
    "materia": "Geografia",
    "explicacao": "A DIT reflete a especialização produtiva de diferentes nações, onde alguns países se concentram na produção de matérias-primas, outros na industrialização e outros em serviços, dentro do sistema econômico global."
  },
  {
    "pergunta": "Qual dos seguintes indicadores é frequentemente utilizado para medir o nível de desenvolvimento econômico e social de um país?",
    "opcoes": {
      "0": "Taxa de natalidade.",
      "1": "Densidade demográfica.",
      "2": "Produto Interno Bruto (PIB) per capita e Índice de Desenvolvimento Humano (IDH).",
      "3": "Nível de urbanização."
    },
    "correta": 2,
    "materia": "Geografia",
    "explicacao": "O PIB per capita mede a riqueza média por habitante e o IDH considera fatores como expectativa de vida, educação e renda, oferecendo uma visão mais abrangente do desenvolvimento."
  },
   {
    "pergunta": "A globalização financeira é caracterizada principalmente por:",
    "opcoes": {
      "0": "O aumento das barreiras alfandegárias entre os países.",
      "1": "A restrição da movimentação de capitais internacionais.",
      "2": "A intensa circulação de dinheiro e investimentos em escala mundial.",
      "3": "A diminuição da importância dos bancos e instituições financeiras."
    },
    "correta": 2,
    "materia": "Geografia",
    "explicacao": "A globalização financeira facilitou a movimentação de capitais, investimentos e transações financeiras entre diferentes países, integrando os mercados financeiros em nível global."
  },
  {
    "pergunta": "Qual dos seguintes fenômenos NÃO está diretamente relacionado ao processo de globalização cultural?",
    "opcoes": {
      "0": "A disseminação de hábitos alimentares e estilos de vestimenta globais.",
      "1": "O aumento da diversidade linguística em escala mundial.",
      "2": "A influência de filmes, músicas e séries de outros países.",
      "3": "A maior facilidade de acesso a informações e diferentes formas de expressão cultural."
    },
    "correta": 1,
    "materia": "Geografia",
    "explicacao": "A globalização cultural pode, em alguns casos, levar à homogeneização cultural e ao enfraquecimento de línguas e tradições locais, embora também possa promover o intercâmbio cultural."
  },
  {
    "pergunta": "O protecionismo econômico é uma prática que consiste em:",
    "opcoes": {
      "0": "Estimular a livre entrada de produtos estrangeiros no mercado nacional.",
      "1": "Reduzir os impostos sobre as exportações.",
      "2": "Adotar medidas para proteger a indústria nacional da concorrência estrangeira, como tarifas e cotas de importação.",
      "3": "Promover a integração econômica com outros países através de acordos comerciais."
    },
    "correta": 2,
    "materia": "Geografia",
    "explicacao": "O protecionismo visa proteger a produção nacional, tornando os produtos importados mais caros ou limitando sua entrada no mercado interno."
  },
  {
    "pergunta": "Qual das seguintes instituições internacionais tem como principal objetivo promover a estabilidade financeira global?",
    "opcoes": {
      "0": "Organização Mundial do Comércio (OMC).",
      "1": "Fundo Monetário Internacional (FMI).",
      "2": "Banco Mundial.",
      "3": "Organização das Nações Unidas (ONU)."
    },
    "correta": 1,
    "materia": "Geografia",
    "explicacao": "O FMI atua na cooperação monetária internacional, oferecendo assistência financeira e aconselhamento a países com dificuldades econômicas, buscando a estabilidade do sistema financeiro global."
  },
  {
    "pergunta": "O conceito de 'cadeia global de valor' descreve:",
    "opcoes": {
      "0": "O processo de produção de um bem ou serviço realizado inteiramente em um único país.",
      "1": "A fragmentação da produção em diferentes etapas realizadas em diversos países, buscando maior eficiência e menores custos.",
      "2": "A concentração da produção industrial em grandes polos tecnológicos.",
      "3": "A produção artesanal e local de bens de consumo."
    },
    "correta": 1,
    "materia": "Geografia",
    "explicacao": "As cadeias globais de valor são uma característica da economia globalizada, onde diferentes partes do processo produtivo são realizadas em locais estratégicos ao redor do mundo."
  },
  {
    "pergunta": "Qual dos seguintes problemas ambientais globais está mais diretamente associado ao aumento do nível do mar?",
    "opcoes": {
      "0": "Aumento da poluição atmosférica nas áreas urbanas.",
      "1": "Derretimento das calotas polares e geleiras.",
      "2": "Diminuição da biodiversidade em florestas tropicais.",
      "3": "Intensificação de fenômenos climáticos extremos como furacões e tornados."
    },
    "correta": 1,
    "materia": "Geografia",
    "explicacao": "O aumento da temperatura global acelera o derretimento do gelo polar e das geleiras, contribuindo para a elevação do nível do mar e ameaçando áreas costeiras."
  },
  {
    "pergunta": "A agricultura familiar no Brasil se caracteriza principalmente por:",
    "opcoes": {
      "0": "Utilização de grandes extensões de terra e monocultura para exportação.",
      "1": "Produção diversificada, uso intensivo de mão de obra familiar e forte ligação com o mercado local.",
      "2": "Elevado grau de mecanização e uso de tecnologia de ponta.",
      "3": "Predomínio de arrendatários e parceria agrícola."
    },
    "correta": 1,
    "materia": "Geografia",
    "explicacao": "A agricultura familiar é um modelo de produção que se baseia no trabalho da família, geralmente em pequenas e médias propriedades, com diversidade de culturas e foco no abastecimento do mercado interno."
  },
  {
    "pergunta": "Qual dos seguintes acordos internacionais visa reduzir as emissões de gases de efeito estufa pelos países signatários?",
    "opcoes": {
      "0": "Protocolo de Kyoto e Acordo de Paris.",
      "1": "Convenção de Ramsar sobre Zonas Úmidas.",
      "2": "Convenção sobre Diversidade Biológica.",
      "3": "Declaração do Rio sobre Meio Ambiente e Desenvolvimento."
    },
    "correta": 0,
    "materia": "Geografia",
    "explicacao": "O Protocolo de Kyoto e o Acordo de Paris são importantes instrumentos internacionais que estabelecem metas e compromissos para a redução das emissões de gases responsáveis pelo aquecimento global."
  },
  {
    "pergunta": "O conceito de 'soberania alimentar' se refere ao direito dos povos de:",
    "opcoes": {
      "0": "Importar alimentos de qualquer lugar do mundo sem restrições.",
      "1": "Produzir alimentos exclusivamente para exportação, visando o lucro máximo.",
      "2": "Definir suas próprias políticas agrícolas e alimentares, priorizando a produção local e o acesso a alimentos saudáveis e culturalmente apropriados.",
      "3": "Depender da ajuda alimentar internacional em situações de crise."
    },
    "correta": 2,
    "materia": "Geografia",
    "explicacao": "A soberania alimentar defende o controle dos sistemas alimentares pelas comunidades locais, garantindo o direito à alimentação adequada e a autonomia na produção."
  },
  {
    "pergunta": "Qual dos seguintes fatores contribuiu para a expansão da globalização econômica nas últimas décadas?",
    "opcoes": {
      "0": "O aumento das barreiras comerciais e a fragmentação dos mercados.",
      "1": "O desenvolvimento de novas tecnologias de comunicação e transporte.",
      "2": "A diminuição do fluxo de investimentos estrangeiros diretos.",
      "3": "O fortalecimento das políticas protecionistas em nível global."
    },
    "correta": 1,
    "materia": "Geografia",
    "explicacao": "Os avanços tecnológicos nas áreas de comunicação (internet, telefonia) e transporte (contêineres, aviões) facilitaram a integração dos mercados, a circulação de bens, serviços e informações em escala global."
  },
    {
    "pergunta": "Um carro se move em linha reta com velocidade constante. Qual das seguintes afirmações sobre a força resultante atuando sobre o carro é verdadeira?",
    "opcoes": {
      "0": "A força resultante é constante e diferente de zero.",
      "1": "A força resultante é nula.",
      "2": "A força resultante está aumentando com o tempo.",
      "3": "A força resultante é proporcional à velocidade do carro."
    },
    "correta": 1,
    "materia": "Física",
    "explicacao": "Pela Primeira Lei de Newton (Lei da Inércia), um corpo em movimento retilíneo uniforme permanece nesse estado se a força resultante sobre ele for nula."
  },
  {
    "pergunta": "Um objeto é lançado verticalmente para cima. Desprezando a resistência do ar, qual das seguintes grandezas permanece constante durante todo o movimento?",
    "opcoes": {
      "0": "A velocidade.",
      "1": "A aceleração.",
      "2": "A força resultante.",
      "3": "A energia potencial gravitacional."
    },
    "correta": 1,
    "materia": "Física",
    "explicacao": "A única força atuando sobre o objeto é a força gravitacional, que produz uma aceleração constante para baixo (a aceleração da gravidade)."
  },
  {
    "pergunta": "Qual das seguintes unidades NÃO é uma unidade de energia?",
    "opcoes": {
      "0": "Joule (J).",
      "1": "Watt (W).",
      "2": "Caloria (cal).",
      "3": "Quilowatt-hora (kWh)."
    },
    "correta": 1,
    "materia": "Física",
    "explicacao": "Watt (W) é a unidade de potência, que é a taxa de transferência ou conversão de energia por unidade de tempo (W = J/s)."
  },
  {
    "pergunta": "Dois corpos de massas diferentes caem livremente da mesma altura, no vácuo. Qual deles atingirá o solo primeiro?",
    "opcoes": {
      "0": "O corpo de maior massa.",
      "1": "O corpo de menor massa.",
      "2": "Ambos atingirão o solo simultaneamente.",
      "3": "Depende da forma dos corpos."
    },
    "correta": 2,
    "materia": "Física",
    "explicacao": "Na ausência de resistência do ar, a aceleração de queda livre é a mesma para todos os objetos, independentemente de suas massas (Galileu Galilei)."
  },
  {
    "pergunta": "Um bloco desliza sobre uma superfície horizontal com atrito. Qual das seguintes afirmações sobre o trabalho realizado pela força de atrito é verdadeira?",
    "opcoes": {
      "0": "O trabalho é positivo.",
      "1": "O trabalho é nulo.",
      "2": "O trabalho é negativo.",
      "3": "O trabalho depende da velocidade do bloco."
    },
    "correta": 2,
    "materia": "Física",
    "explicacao": "A força de atrito sempre se opõe ao movimento, portanto, o ângulo entre a força e o deslocamento é de 180°, e o trabalho realizado (W = F.d.cosθ) é negativo (cos 180° = -1)."
  },
   {
    "pergunta": "Qual das seguintes partículas subatômicas possui carga elétrica negativa?",
    "opcoes": {
      "0": "Próton.",
      "1": "Neutro.",
      "2": "Elétron.",
      "3": "Positrão."
    },
    "correta": 2,
    "materia": "Física",
    "explicacao": "O elétron é uma partícula fundamental com carga elétrica elementar negativa."
  },
  {
    "pergunta": "A Lei de Ohm relaciona três grandezas elétricas fundamentais. Quais são elas?",
    "opcoes": {
      "0": "Força, massa e aceleração.",
      "1": "Energia, trabalho e potência.",
      "2": "Tensão (voltagem), corrente elétrica e resistência elétrica.",
      "3": "Carga elétrica, campo elétrico e potencial elétrico."
    },
    "correta": 2,
    "materia": "Física",
    "explicacao": "A Lei de Ohm estabelece que a tensão (V) através de um condutor é diretamente proporcional à corrente (I) que passa por ele, sendo a constante de proporcionalidade a resistência (R): V = R.I."
  },
  {
    "pergunta": "Qual dos seguintes dispositivos transforma energia elétrica em energia mecânica?",
    "opcoes": {
      "0": "Lâmpada incandescente.",
      "1": "Resistor.",
      "2": "Motor elétrico.",
      "3": "Gerador elétrico."
    },
    "correta": 2,
    "materia": "Física",
    "explicacao": "Um motor elétrico utiliza a interação entre campos magnéticos e correntes elétricas para produzir movimento mecânico."
  },
  {
    "pergunta": "Qual das seguintes associações de resistores resulta na menor resistência equivalente?",
    "opcoes": {
      "0": "Dois resistores em série.",
      "1": "Dois resistores em paralelo.",
      "2": "Três resistores em série.",
      "3": "Três resistores em paralelo."
    },
    "correta": 3,
    "materia": "Física",
    "explicacao": "Em uma associação em paralelo, a resistência equivalente é sempre menor que a menor resistência individual. Adicionar mais resistores em paralelo diminui ainda mais a resistência equivalente."
  },
  {
    "pergunta": "Qual das seguintes unidades é utilizada para medir a potência elétrica?",
    "opcoes": {
      "0": "Coulomb (C).",
      "1": "Ampère (A).",
      "2": "Volt (V).",
      "3": "Watt (W)."
    },
    "correta": 3,
    "materia": "Física",
    "explicacao": "Watt (W) é a unidade de potência elétrica, que representa a taxa na qual a energia elétrica é convertida em outra forma de energia."
  },
  {
    "pergunta": "Qual dos seguintes processos de transferência de calor NÃO ocorre no vácuo?",
    "opcoes": {
      "0": "Condução.",
      "1": "Convecção.",
      "2": "Irradiação.",
      "3": "Radiação."
    },
    "correta": 0,
    "materia": "Física",
    "explicacao": "A condução requer um meio material para a transferência de calor através da colisão de partículas. No vácuo, não há partículas para conduzir o calor."
  },
  {
    "pergunta": "A temperatura de um corpo está diretamente relacionada a:",
    "opcoes": {
      "0": "A quantidade de calor contida no corpo.",
      "1": "A energia cinética média das partículas que o constituem.",
      "2": "A energia potencial das partículas que o constituem.",
      "3": "Ao estado físico do corpo (sólido, líquido ou gasoso)."
    },
    "correta": 1,
    "materia": "Física",
    "explicacao": "A temperatura é uma medida da energia cinética média das moléculas ou átomos em um sistema. Quanto maior a energia cinética média, maior a temperatura."
  },
  {
    "pergunta": "Qual das seguintes escalas termométricas possui o mesmo valor numérico para o ponto de fusão do gelo e o ponto de ebulição da água?",
    "opcoes": {
      "0": "Celsius (°C).",
      "1": "Fahrenheit (°F).",
      "2": "Kelvin (K).",
      "3": "Nenhuma das anteriores."
    },
    "correta": 3,
    "materia": "Física",
    "explicacao": "Na escala Celsius, os pontos são 0°C e 100°C. Na Fahrenheit, 32°F e 212°F. Na Kelvin, 273,15 K e 373,15 K. Nenhuma delas tem os mesmos valores."
  },
  {
    "pergunta": "Qual das seguintes transformações físicas libera calor para o ambiente?",
    "opcoes": {
      "0": "Fusão.",
      "1": "Vaporização.",
      "2": "Sublimação.",
      "3": "Condensação."
    },
    "correta": 3,
    "materia": "Física",
    "explicacao": "A condensação é a passagem do estado gasoso para o líquido, um processo exotérmico que libera energia térmica para o ambiente."
  },
  {
    "pergunta": "A capacidade térmica de um corpo representa:",
    "opcoes": {
      "0": "A quantidade de calor necessária para elevar a temperatura de toda a massa do corpo em 1 grau Celsius.",
      "1": "A quantidade de calor necessária para elevar a temperatura de 1 grama da substância em 1 grau Celsius.",
      "2": "A temperatura máxima que o corpo pode atingir.",
      "3": "A taxa de transferência de calor entre o corpo e o ambiente."
    },
    "correta": 0,
    "materia": "Física",
    "explicacao": "Capacidade térmica (C) é a razão entre a quantidade de calor (Q) fornecida a um corpo e a variação de temperatura (ΔT) resultante: C = Q/ΔT."
  },
   {
    "pergunta": "Um objeto de massa m é acelerado por uma força resultante F. Se a massa for dobrada e a força resultante permanecer a mesma, qual será a nova aceleração?",
    "opcoes": {
      "0": "4F/m",
      "1": "2F/m",
      "2": "F/(2m)",
      "3": "F/(4m)"
    },
    "correta": 2,
    "materia": "Física",
    "explicacao": "Pela Segunda Lei de Newton (F = ma), se F é constante e m dobra, a aceleração (a = F/m) se reduz pela metade."
  },
  {
    "pergunta": "Qual das seguintes fontes de energia é considerada não renovável?",
    "opcoes": {
      "0": "Energia solar.",
      "1": "Energia eólica.",
      "2": "Petróleo.",
      "3": "Energia hidrelétrica."
    },
    "correta": 2,
    "materia": "Física",
    "explicacao": "O petróleo é um combustível fóssil, cuja formação leva milhões de anos, sendo considerado um recurso não renovável em escala humana."
  },
  {
    "pergunta": "Qual dos seguintes fenômenos está relacionado com a conversão de energia mecânica em energia elétrica?",
    "opcoes": {
      "0": "Efeito Joule.",
      "1": "Efeito fotoelétrico.",
      "2": "Indução eletromagnética.",
      "3": "Termoeletricidade."
    },
    "correta": 2,
    "materia": "Física",
    "explicacao": "A indução eletromagnética, descoberta por Faraday, é o princípio de funcionamento dos geradores elétricos, onde a variação do fluxo magnético através de um circuito induz uma corrente elétrica."
  },
  {
    "pergunta": "Qual das seguintes grandezas físicas é escalar?",
    "opcoes": {
      "0": "Velocidade.",
      "1": "Força.",
      "2": "Aceleração.",
      "3": "Temperatura."
    },
    "correta": 3,
    "materia": "Física",
    "explicacao": "Uma grandeza escalar é aquela que possui apenas magnitude (valor numérico) e unidade, como a temperatura. Velocidade, força e aceleração são grandezas vetoriais, pois possuem magnitude, direção e sentido."
  },
  {
    "pergunta": "Um corpo em equilíbrio térmico com outro possui a mesma:",
    "opcoes": {
      "0": "Energia interna.",
      "1": "Quantidade de calor.",
      "2": "Temperatura.",
      "3": "Capacidade térmica."
    },
    "correta": 2,
    "materia": "Física",
    "explicacao": "O equilíbrio térmico ocorre quando dois ou mais corpos em contato atingem a mesma temperatura, não havendo mais troca líquida de calor entre eles (Lei Zero da Termodinâmica)."
  },
  {
    "pergunta": "Qual das seguintes situações representa um aumento da energia potencial gravitacional de um objeto?",
    "opcoes": {
      "0": "Um livro caindo de uma prateleira.",
      "1": "Um avião pousando na pista.",
      "2": "Uma bola sendo lançada verticalmente para cima.",
      "3": "Um carro freando em uma ladeira."
    },
    "correta": 2,
    "materia": "Física",
    "explicacao": "A energia potencial gravitacional (Ep = mgh) é diretamente proporcional à altura (h) do objeto em relação a um referencial. Ao ser lançado para cima, a altura da bola aumenta."
  },
  {
    "pergunta": "Qual dos seguintes materiais é considerado um bom condutor de eletricidade?",
    "opcoes": {
      "0": "Borracha.",
      "1": "Vidro.",
      "2": "Cobre.",
      "3": "Plástico."
    },
    "correta": 2,
    "materia": "Física",
    "explicacao": "Metais como o cobre possuem elétrons livres que podem se mover facilmente, permitindo a passagem da corrente elétrica."
  },
  {
    "pergunta": "A primeira lei da termodinâmica é uma aplicação do princípio da:",
    "opcoes": {
      "0": "Conservação da massa.",
      "1": "Conservação da energia.",
      "2": "Conservação do momento linear.",
      "3": "Conservação da carga elétrica."
    },
    "correta": 1,
    "materia": "Física",
    "explicacao": "A primeira lei da termodinâmica estabelece que a variação da energia interna de um sistema é igual à diferença entre o calor adicionado ao sistema e o trabalho realizado pelo sistema (ΔU = Q - W), expressando a conservação da energia."
  },
  {
    "pergunta": "Qual dos seguintes fenômenos está relacionado com a propagação de ondas eletromagnéticas?",
    "opcoes": {
      "0": "Condução térmica.",
      "1": "Convecção térmica.",
      "2": "Radiação térmica.",
      "3": "Dilatação térmica."
    },
    "correta": 2,
    "materia": "Física",
    "explicacao": "A radiação térmica é a transferência de calor através de ondas eletromagnéticas, que podem se propagar no vácuo."
  },
  {
    "pergunta": "Um pêndulo simples oscila com pequena amplitude. Qual das seguintes grandezas NÃO permanece constante durante o movimento?",
    "opcoes": {
      "0": "O período.",
      "1": "A frequência.",
      "2": "A energia mecânica total (desprezando o atrito).",
      "3": "A velocidade."
    },
    "correta": 3,
    "materia": "Física",
    "explicacao": "A velocidade do pêndulo varia continuamente durante a oscilação, sendo máxima no ponto mais baixo e nula nos pontos de maior afastamento. O período, a frequência e a energia mecânica total (na ausência de atrito) permanecem constantes para pequenas amplitudes."
  },
    {
    "pergunta": "Para Aristóteles, a virtude ética reside em:",
    "opcoes": {
      "0": "Agir sempre conforme a lei.",
      "1": "Buscar o prazer em todas as ações.",
      "2": "Encontrar o justo meio entre dois extremos.",
      "3": "Desenvolver habilidades intelectuais superiores."
    },
    "correta": 2,
    "materia": "Filosofia",
    "explicacao": "Aristóteles desenvolveu a teoria da virtude como uma mediana entre o excesso e a falta. A coragem, por exemplo, é o justo meio entre a covardia e a temeridade."
  },
  {
    "pergunta": "Qual dos seguintes filósofos é considerado um dos principais representantes da Filosofia Antiga, conhecido por seu método dialético?",
    "opcoes": {
      "0": "Immanuel Kant",
      "1": "Jean-Paul Sartre",
      "2": "Sócrates",
      "3": "Friedrich Nietzsche"
    },
    "correta": 2,
    "materia": "Filosofia",
    "explicacao": "Sócrates é famoso por seu método de questionamento, a dialética, que buscava a verdade através do diálogo e da contraposição de ideias."
  },
  {
    "pergunta": "A ética utilitarista, amplamente discutida na Filosofia Contemporânea, defende que uma ação é considerada moralmente correta se:",
    "opcoes": {
      "0": "For baseada em princípios universais e imutáveis.",
      "1": "Promover a maior felicidade para o maior número de pessoas.",
      "2": "Estiver de acordo com os costumes e tradições de uma sociedade.",
      "3": "For motivada por boas intenções, independentemente de suas consequências."
    },
    "correta": 1,
    "materia": "Filosofia",
    "explicacao": "O utilitarismo, defendido por filósofos como John Stuart Mill, avalia a moralidade de uma ação por suas consequências, visando o bem-estar coletivo."
  },
  {
    "pergunta": "O conceito de justiça distributiva, que discute a alocação equitativa de bens e oportunidades, é central na obra de qual filósofo contemporâneo?",
    "opcoes": {
      "0": "Michel Foucault",
      "1": "John Rawls",
      "2": "Jürgen Habermas",
      "3": "Simone de Beauvoir"
    },
    "correta": 1,
    "materia": "Filosofia",
    "explicacao": "John Rawls, em sua obra 'Uma Teoria da Justiça', propõe princípios para uma sociedade justa, incluindo a distribuição equitativa de recursos e oportunidades."
  },
  {
    "pergunta": "Para os filósofos helenísticos, como os estoicos e epicuristas, o principal objetivo da vida era:",
    "opcoes": {
      "0": "Acumular riquezas e poder político.",
      "1": "Alcançar a ataraxia, um estado de tranquilidade da alma.",
      "2": "Dedicar-se à contemplação da natureza e do cosmos.",
      "3": "Seguir rigorosamente os preceitos religiosos."
    },
    "correta": 1,
    "materia": "Filosofia",
    "explicacao": "As filosofias helenísticas, como o estoicismo e o epicurismo, enfatizavam a busca pela paz interior e pela ausência de perturbações como o caminho para a felicidade."
  },
  {
    "pergunta": "Qual filósofo antigo defendia que o ser humano é um 'animal político'?",
    "opcoes": {
      "0": "Platão",
      "1": "Aristóteles",
      "2": "Sócrates",
      "3": "Epicuro"
    },
    "correta": 1,
    "materia": "Filosofia",
    "explicacao": "Aristóteles acreditava que a natureza do ser humano se realiza na vida em comunidade e na participação na pólis (cidade-estado)."
  },
  {
    "pergunta": "O existencialismo, corrente filosófica contemporânea, enfatiza principalmente:",
    "opcoes": {
      "0": "A busca por leis universais da moralidade.",
      "1": "A importância da razão para alcançar a verdade.",
      "2": "A liberdade, a responsabilidade individual e a angústia da existência.",
      "3": "A determinação da história sobre a consciência humana."
    },
    "correta": 2,
    "materia": "Filosofia",
    "explicacao": "Filósofos existencialistas como Sartre e Beauvoir colocam a experiência individual, a liberdade de escolha e a responsabilidade como centrais para a compreensão da existência."
  },
  {
    "pergunta": "Para Immanuel Kant, uma ação só é moralmente válida se puder ser universalizada, ou seja:",
    "opcoes": {
      "0": "Se trouxer felicidade para o maior número de pessoas.",
      "1": "Se estiver de acordo com os costumes da sociedade.",
      "2": "Se a máxima que a guia puder valer para todos os seres racionais.",
      "3": "Se for motivada por sentimentos nobres e altruístas."
    },
    "correta": 2,
    "materia": "Filosofia",
    "explicacao": "O imperativo categórico kantiano exige que ajamos de tal maneira que a máxima de nossa ação possa se tornar uma lei universal."
  },
  {
    "pergunta": "Qual das escolas filosóficas da antiguidade clássica pregava a indiferença em relação aos prazeres e às dores externas como caminho para a felicidade?",
    "opcoes": {
      "0": "Hedonismo",
      "1": "Estoicismo",
      "2": "Ceticismo",
      "3": "Sofismo"
    },
    "correta": 1,
    "materia": "Filosofia",
    "explicacao": "Os estoicos valorizavam a autodisciplina, a razão e a aceitação do destino como meios para alcançar a tranquilidade interior."
  },
  {
    "pergunta": "A filosofia de Friedrich Nietzsche é marcada pela crítica à moralidade tradicional e pela valorização:",
    "opcoes": {
      "0": "Da submissão à autoridade divina.",
      "1": "Do desenvolvimento do espírito científico.",
      "2": "Da 'vontade de poder' e da afirmação da vida.",
      "3": "Da busca pela paz interior através da negação dos desejos."
    },
    "correta": 2,
    "materia": "Filosofia",
    "explicacao": "Nietzsche questionava os valores morais estabelecidos e propunha uma filosofia da afirmação da vida, da força e da individualidade."
  },
   {
    "pergunta": "O conceito de 'contrato social', fundamental para diversas teorias políticas e éticas, busca explicar:",
    "opcoes": {
      "0": "A origem divina do poder dos governantes.",
      "1": "O desenvolvimento natural da sociedade humana.",
      "2": "A justificação racional da autoridade política e das obrigações dos cidadãos.",
      "3": "A inevitabilidade da luta de classes na história."
    },
    "correta": 2,
    "materia": "Filosofia",
    "explicacao": "Teóricos como Hobbes, Locke e Rousseau utilizaram a ideia de um contrato social para fundamentar a legitimidade do governo e os direitos e deveres dos indivíduos na sociedade."
  },
  {
    "pergunta": "Qual filósofo da antiguidade é conhecido por suas reflexões sobre a natureza do ser e a imutabilidade do mundo das Ideias?",
    "opcoes": {
      "0": "Heráclito",
      "1": "Parmênides",
      "2": "Demócrito",
      "3": "Protágoras"
    },
    "correta": 1,
    "materia": "Filosofia",
    "explicacao": "Parmênides defendia a ideia de que o ser é uno, imutável e eterno, em contraste com a visão do fluxo constante de Heráclito."
  },
  {
    "pergunta": "A filosofia contemporânea frequentemente aborda questões relacionadas à tecnologia, à linguagem e ao poder. Qual filósofo é conhecido por sua análise das relações entre poder e conhecimento?",
    "opcoes": {
      "0": "Jean-François Lyotard",
      "1": "Michel Foucault",
      "2": "Gilles Deleuze",
      "3": "Jacques Derrida"
    },
    "correta": 1,
    "materia": "Filosofia",
    "explicacao": "Michel Foucault investigou como o poder se manifesta em diversas instituições e como ele molda o conhecimento e as práticas sociais."
  },
  {
    "pergunta": "Para os sofistas, importantes pensadores da Grécia Antiga, a verdade era considerada:",
    "opcoes": {
      "0": "Absoluta e universal, podendo ser alcançada pela razão.",
      "1": "Relativa e dependente da perspectiva de cada indivíduo.",
      "2": "Inatingível para o conhecimento humano.",
      "3": "Revelada apenas através da fé e da experiência religiosa."
    },
    "correta": 1,
    "materia": "Filosofia",
    "explicacao": "Os sofistas eram conhecidos por seu relativismo, argumentando que a verdade e a moralidade eram construções sociais e dependiam do ponto de vista."
  },
  {
    "pergunta": "Qual corrente da filosofia contemporânea se caracteriza pela crítica às grandes narrativas e pela valorização da pluralidade e da diferença?",
    "opcoes": {
      "0": "Positivismo",
      "1": "Marxismo",
      "2": "Pós-estruturalismo",
      "3": "Fenomenologia"
    },
    "correta": 2,
    "materia": "Filosofia",
    "explicacao": "O pós-estruturalismo, com autores como Lyotard e Derrida, questiona as estruturas fixas de significado e enfatiza a contingência e a diversidade."
  },
  {
    "pergunta": "A ética deontológica, como a de Kant, enfatiza o dever e as regras morais, independentemente das consequências das ações. Qual das seguintes afirmações melhor representa essa perspectiva?",
    "opcoes": {
      "0": "O fim justifica os meios.",
      "1": "Age de tal maneira que a tua ação produza o maior bem para o maior número.",
      "2": "Age apenas segundo aquela máxima pela qual possas ao mesmo tempo querer que ela se torne uma lei universal.",
      "3": "A moralidade de uma ação reside nos sentimentos e intenções do agente."
    },
    "correta": 2,
    "materia": "Filosofia",
    "explicacao": "A formulação do imperativo categórico kantiano é a base da ética deontológica, focada no dever e na universalidade das máximas."
  },
  {
    "pergunta": "Qual filósofo antigo desenvolveu a alegoria da caverna para ilustrar a distinção entre o mundo sensível e o mundo das Ideias?",
    "opcoes": {
      "0": "Zenão de Eleia",
      "1": "Pitágoras",
      "2": "Platão",
      "3": "Anaxágoras"
    },
    "correta": 2,
    "materia": "Filosofia",
    "explicacao": "Na alegoria da caverna, Platão descreve prisioneiros que confundem sombras com a realidade, simbolizando a nossa percepção do mundo sensível em contraste com o mundo inteligível das Ideias."
  },
  {
    "pergunta": "A filosofia contemporânea tem se dedicado a analisar as implicações éticas do desenvolvimento tecnológico. Qual questão ética emerge com o avanço da inteligência artificial?",
    "opcoes": {
      "0": "A obsolescência programada de bens de consumo.",
      "1": "A privacidade e o uso de dados pessoais.",
      "2": "A possibilidade de máquinas superarem a inteligência humana e tomarem decisões autônomas.",
      "3": "O impacto ambiental da produção de dispositivos eletrônicos."
    },
    "correta": 2,
    "materia": "Filosofia",
    "explicacao": "A autonomia das máquinas e a possibilidade de superinteligência levantam questões éticas complexas sobre controle, responsabilidade e o futuro da relação entre humanos e IA."
  },
  {
    "pergunta": "Para os céticos da antiguidade, a postura mais sábia diante do conhecimento era:",
    "opcoes": {
      "0": "A busca incessante pela verdade absoluta.",
      "1": "A aceitação dogmática das doutrinas filosóficas estabelecidas.",
      "2": "A suspensão do juízo e a dúvida constante.",
      "3": "A valorização da experiência sensorial como fonte principal de conhecimento."
    },
    "correta": 2,
    "materia": "Filosofia",
    "explicacao": "O ceticismo antigo defendia a impossibilidade de alcançar a certeza e propunha a suspensão do juízo (epoché) como forma de alcançar a ataraxia."
  },
  {
    "pergunta": "Qual filósofa contemporânea é conhecida por sua análise da condição feminina e por sua defesa da igualdade de gênero?",
    "opcoes": {
      "0": "Hannah Arendt",
      "1": "Simone de Beauvoir",
      "2": "Judith Butler",
      "3": "Martha Nussbaum"
    },
    "correta": 1,
    "materia": "Filosofia",
    "explicacao": "Simone de Beauvoir, em sua obra 'O Segundo Sexo', realizou uma análise profunda da opressão feminina e influenciou o desenvolvimento do pensamento feminista."
  },
   {
    "pergunta": "A filosofia política de John Locke defendia, entre outros, o direito à propriedade privada e:",
    "opcoes": {
      "0": "A soberania absoluta do monarca.",
      "1": "A separação dos poderes do Estado.",
      "2": "A igualdade econômica entre todos os cidadãos.",
      "3": "A subordinação do indivíduo ao Estado."
    },
    "correta": 1,
    "materia": "Filosofia",
    "explicacao": "Locke é um dos principais teóricos do liberalismo político e defendia a divisão do poder em legislativo, executivo e judiciário para evitar a tirania."
  },
  {
    "pergunta": "Qual dos pré-socráticos buscava o princípio fundamental (arché) de todas as coisas na água?",
    "opcoes": {
      "0": "Anaximandro",
      "1": "Heráclito",
      "2": "Tales de Mileto",
      "3": "Anaxímenes"
    },
    "correta": 2,
    "materia": "Filosofia",
    "explicacao": "Tales de Mileto é considerado o primeiro filósofo e acreditava que a água era a substância primordial da qual tudo se originava."
  },
  {
    "pergunta": "A ética aplicada é um ramo da filosofia contemporânea que se dedica a analisar questões morais específicas em áreas como a bioética, a ética ambiental e a ética nos negócios. Qual questão é central na bioética?",
    "opcoes": {
      "0": "A responsabilidade das empresas em relação ao meio ambiente.",
      "1": "Os dilemas morais relacionados ao início, ao desenvolvimento e ao fim da vida humana.",
      "2": "A justiça na distribuição de recursos econômicos.",
      "3": "O papel da mídia na formação da opinião pública."
    },
    "correta": 1,
    "materia": "Filosofia",
    "explicacao": "A bioética lida com as implicações éticas das ciências da vida e da saúde, abrangendo temas como aborto, eutanásia, pesquisa com células-tronco, entre outros."
  },
  {
    "pergunta": "Para Epicuro e os epicuristas, o principal objetivo da vida feliz era:",
    "opcoes": {
      "0": "A busca incessante por prazeres intensos.",
      "1": "A prática da virtude e do dever.",
      "2": "A ausência de dor física (aponia) e de perturbação da alma (ataraxia).",
      "3": "A contemplação da perfeição do cosmos."
    },
    "correta": 2,
    "materia": "Filosofia",
    "explicacao": "O epicurismo valorizava os prazeres simples e a tranquilidade como o caminho para a felicidade, evitando os excessos e as fontes de sofrimento."
  },
  {
    "pergunta": "Qual filósofo contemporâneo desenvolveu o conceito de 'comunicação não violenta' como uma forma de promover o diálogo e a resolução pacífica de conflitos?",
    "opcoes": {
      "0": "Jürgen Habermas",
      "1": "Marshall Rosenberg",
      "2": "Noam Chomsky",
      "3": "Paul Ricoeur"
    },
    "correta": 1,
    "materia": "Filosofia",
    "explicacao": "Marshall Rosenberg criou a Comunicação Não Violenta (CNV), um processo de comunicação que enfatiza a empatia, a honestidade e a busca por atender às necessidades de todas as partes envolvidas em um conflito."
  },
    {
    "pergunta": "Qual das seguintes alternativas representa uma mudança física?",
    "opcoes": {
      "0": "Queima de um pedaço de madeira.",
      "1": "Fermentação do açúcar para produzir álcool.",
      "2": "Dissolução de sal de cozinha em água.",
      "3": "Enferrujamento de um prego de ferro."
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "A dissolução do sal em água altera apenas o estado físico da substância (sólido para solução), sem formar novas substâncias."
  },
  {
    "pergunta": "Qual das seguintes substâncias é um exemplo de mistura heterogênea?",
    "opcoes": {
      "0": "Água e sal dissolvido.",
      "1": "Ar atmosférico.",
      "2": "Água e óleo.",
      "3": "Álcool hidratado."
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "Uma mistura heterogênea apresenta fases distintas visíveis, como a água e o óleo que não se misturam."
  },
  {
    "pergunta": "O número de prótons no núcleo de um átomo define o seu:",
    "opcoes": {
      "0": "Número de massa.",
      "1": "Número de nêutrons.",
      "2": "Número atômico.",
      "3": "Número de elétrons (em um íon)."
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "O número atômico (Z) é igual ao número de prótons no núcleo de um átomo, sendo o que identifica um elemento químico."
  },
  {
    "pergunta": "Qual das seguintes ligações químicas é predominantemente iônica?",
    "opcoes": {
      "0": "Ligação entre dois átomos de hidrogênio (H₂).",
      "1": "Ligação entre um átomo de carbono e quatro átomos de hidrogênio (CH₄).",
      "2": "Ligação entre um átomo de sódio e um átomo de cloro (NaCl).",
      "3": "Ligação entre dois átomos de oxigênio (O₂)."
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "A ligação iônica ocorre entre átomos com grande diferença de eletronegatividade, como um metal (sódio) e um não metal (cloro), com transferência de elétrons."
  },
  {
    "pergunta": "Qual das seguintes equações químicas representa uma reação de síntese (ou adição)?",
    "opcoes": {
      "0": "CaCO₃(s) → CaO(s) + CO₂(g)",
      "1": "Zn(s) + 2 HCl(aq) → ZnCl₂(aq) + H₂(g)",
      "2": "2 H₂(g) + O₂(g) → 2 H₂O(l)",
      "3": "CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(g)"
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "Uma reação de síntese é aquela em que duas ou mais substâncias reagem para formar um único produto."
  },
   {
    "pergunta": "Qual dos seguintes fatores NÃO afeta a velocidade de uma reação química?",
    "opcoes": {
      "0": "Concentração dos reagentes.",
      "1": "Temperatura.",
      "2": "Presença de um catalisador.",
      "3": "Estado físico dos produtos."
    },
    "correta": 3,
    "materia": "Química",
    "explicacao": "O estado físico dos produtos não influencia a velocidade com que os reagentes se transformam em produtos."
  },
  {
    "pergunta": "Em uma solução aquosa ácida, a concentração de íons hidrogênio (H⁺) é:",
    "opcoes": {
      "0": "Igual à concentração de íons hidroxila (OH⁻).",
      "1": "Menor que a concentração de íons hidroxila (OH⁻).",
      "2": "Maior que a concentração de íons hidroxila (OH⁻).",
      "3": "Igual a zero."
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "Soluções ácidas possuem um excesso de íons H⁺ em relação aos íons OH⁻, resultando em um pH menor que 7."
  },
  {
    "pergunta": "Qual dos seguintes gases é o principal componente do ar atmosférico?",
    "opcoes": {
      "0": "Oxigênio (O₂).",
      "1": "Dióxido de carbono (CO₂).",
      "2": "Nitrogênio (N₂).",
      "3": "Argônio (Ar)."
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "O nitrogênio representa aproximadamente 78% da composição do ar atmosférico seco."
  },
  {
    "pergunta": "Qual das seguintes alternativas apresenta a fórmula molecular do benzeno?",
    "opcoes": {
      "0": "CH₄",
      "1": "C₂H₆",
      "2": "C₆H₆",
      "3": "C₂H₄"
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "A fórmula molecular do benzeno é C₆H₆, representando um anel hexagonal de átomos de carbono com um hidrogênio ligado a cada um."
  },
  {
    "pergunta": "Qual das seguintes funções orgânicas contém o grupo funcional -OH ligado diretamente a um átomo de carbono saturado?",
    "opcoes": {
      "0": "Aldeído.",
      "1": "Cetona.",
      "2": "Álcool.",
      "3": "Ácido carboxílico."
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "Um álcool possui o grupo hidroxila (-OH) ligado a um carbono que não faz parte de um anel aromático ou de uma ligação dupla carbono-oxigênio."
  },
  {
    "pergunta": "Qual das seguintes afirmações sobre a pressão de vapor de um líquido é verdadeira?",
    "opcoes": {
      "0": "A pressão de vapor não depende da temperatura.",
      "1": "A pressão de vapor diminui com o aumento da temperatura.",
      "2": "A pressão de vapor aumenta com o aumento da temperatura.",
      "3": "A pressão de vapor é constante para todos os líquidos na mesma temperatura."
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "O aumento da temperatura fornece mais energia cinética às moléculas do líquido, facilitando sua passagem para a fase gasosa e, consequentemente, aumentando a pressão de vapor."
  },
  {
    "pergunta": "Qual das seguintes propriedades dos gases ideais é descrita pela Lei de Boyle?",
    "opcoes": {
      "0": "A relação entre volume e temperatura a pressão constante.",
      "1": "A relação entre pressão e temperatura a volume constante.",
      "2": "A relação entre pressão e volume a temperatura constante.",
      "3": "A relação entre o número de mols e o volume a pressão e temperatura constantes."
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "A Lei de Boyle estabelece que, para uma quantidade fixa de gás a temperatura constante, a pressão é inversamente proporcional ao volume (P₁V₁ = P₂V₂)."
  },
  {
    "pergunta": "Qual das seguintes substâncias é um exemplo de polímero sintético?",
    "opcoes": {
      "0": "Celulose.",
      "1": "Amido.",
      "2": "Borracha natural.",
      "3": "Polietileno (plástico)."
    },
    "correta": 3,
    "materia": "Química",
    "explicacao": "O polietileno é um plástico produzido industrialmente a partir da polimerização do etileno, sendo um polímero sintético."
  },
  {
    "pergunta": "Qual dos seguintes processos é utilizado para separar os componentes de uma mistura homogênea de líquidos com diferentes pontos de ebulição?",
    "opcoes": {
      "0": "Filtração.",
      "1": "Decantação.",
      "2": "Destilação.",
      "3": "Evaporação."
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "A destilação explora as diferentes volatilidades dos líquidos, permitindo a separação através do aquecimento e condensação seletiva dos vapores."
  },
  {
    "pergunta": "Qual das seguintes alternativas apresenta um hidrocarboneto insaturado?",
    "opcoes": {
      "0": "Etano (C₂H₆).",
      "1": "Propano (C₃H₈).",
      "2": "Etileno (C₂H₄).",
      "3": "Metano (CH₄)."
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "Hidrocarbonetos insaturados possuem ligações duplas ou triplas entre os átomos de carbono. O etileno (C₂H₄) contém uma ligação dupla carbono-carbono."
  },
   {
    "pergunta": "Qual das seguintes espécies químicas atua como um oxidante em uma reação redox?",
    "opcoes": {
      "0": "Aquela que perde elétrons.",
      "1": "Aquela que ganha elétrons.",
      "2": "Aquela que não altera seu número de oxidação.",
      "3": "Aquela que doa prótons."
    },
    "correta": 1,
    "materia": "Química",
    "explicacao": "Um oxidante é uma espécie química que causa a oxidação de outra espécie ao receber elétrons, diminuindo seu próprio número de oxidação."
  },
  {
    "pergunta": "Qual das seguintes unidades é utilizada para expressar a concentração molar de uma solução?",
    "opcoes": {
      "0": "g/L",
      "1": "% (m/v)",
      "2": "mol/L",
      "3": "ppm"
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "A concentração molar (M) é definida como o número de mols do soluto dissolvidos por litro de solução (mol/L)."
  },
  {
    "pergunta": "Qual dos seguintes fatores desloca o equilíbrio químico para a direita em uma reação exotérmica (ΔH < 0)?",
    "opcoes": {
      "0": "Aumento da temperatura.",
      "1": "Diminuição da temperatura.",
      "2": "Aumento da pressão (se houver mais mols de gás nos reagentes).",
      "3": "Adição de um catalisador."
    },
    "correta": 1,
    "materia": "Química",
    "explicacao": "Em uma reação exotérmica, o calor é um 'produto'. Diminuir a temperatura desloca o equilíbrio no sentido de liberar mais calor, ou seja, para a direita."
  },
  {
    "pergunta": "Qual das seguintes funções orgânicas possui o grupo funcional -COOH?",
    "opcoes": {
      "0": "Álcool.",
      "1": "Aldeído.",
      "2": "Cetona.",
      "3": "Ácido carboxílico."
    },
    "correta": 3,
    "materia": "Química",
    "explicacao": "O grupo carboxila (-COOH) é característico dos ácidos carboxílicos."
  },
  {
    "pergunta": "Qual das seguintes reações orgânicas é um exemplo de reação de adição?",
    "opcoes": {
      "0": "Substituição de um hidrogênio do benzeno por um cloro.",
      "1": "Quebra de uma ligação dupla em um alceno com a adição de hidrogênio.",
      "2": "Eliminação de água de um álcool para formar um alceno.",
      "3": "Oxidação de um álcool primário para formar um aldeído."
    },
    "correta": 1,
    "materia": "Química",
    "explicacao": "Uma reação de adição envolve a quebra de uma ligação pi (em duplas ou triplas ligações) e a adição de átomos aos carbonos envolvidos."
  },
  {
    "pergunta": "Qual das seguintes alternativas descreve corretamente a entalpia de uma reação?",
    "opcoes": {
      "0": "A energia total dos reagentes.",
      "1": "A energia total dos produtos.",
      "2": "A variação de calor a pressão constante.",
      "3": "A variação de energia interna a volume constante."
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "A entalpia (H) é uma função de estado termodinâmica, e a variação de entalpia (ΔH) em uma reação química a pressão constante é igual ao calor absorvido ou liberado pelo sistema."
  },
  {
    "pergunta": "Qual das seguintes substâncias é um eletrólito forte em solução aquosa?",
    "opcoes": {
      "0": "Água pura (H₂O).",
      "1": "Glicose (C₆H₁₂O₆).",
      "2": "Ácido acético (CH₃COOH).",
      "3": "Cloreto de sódio (NaCl)."
    },
    "correta": 3,
    "materia": "Química",
    "explicacao": "Um eletrólito forte se dissocia completamente em íons quando dissolvido em água, tornando a solução altamente condutora de eletricidade. O NaCl é um sal solúvel que se dissocia em Na⁺ e Cl⁻."
  },
  {
    "pergunta": "Qual das seguintes alternativas apresenta a nomenclatura IUPAC correta para o composto CH₃CH₂CH₂OH?",
    "opcoes": {
      "0": "Metanol.",
      "1": "Etanol.",
      "2": "Propanol.",
      "3": "Butanol."
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "A cadeia principal possui três átomos de carbono (prop-) e o grupo funcional álcool (-ol) está ligado ao primeiro carbono (implícito), resultando em propan-1-ol, comumente chamado de propanol."
  },
  {
    "pergunta": "Qual das seguintes reações orgânicas é utilizada para produzir sabão?",
    "opcoes": {
      "0": "Esterificação.",
      "1": "Saponificação.",
      "2": "Polimerização.",
      "3": "Fermentação."
    },
    "correta": 1,
    "materia": "Química",
    "explicacao": "A saponificação é a reação de hidrólise de ésteres de ácidos graxos (presentes em óleos e gorduras) com uma base forte (como NaOH ou KOH) para produzir sabão (sal de ácido graxo) e glicerol."
  },
  {
    "pergunta": "Qual das seguintes alternativas representa a Lei de Hess?",
    "opcoes": {
      "0": "A velocidade de uma reação é diretamente proporcional à concentração dos reagentes.",
      "1": "A pressão total de uma mistura de gases é igual à soma das pressões parciais dos gases componentes.",
      "2": "A variação de entalpia de uma reação depende apenas dos estados inicial e final, e não do caminho percorrido.",
      "3": "A massa total dos reagentes é igual à massa total dos produtos em uma reação química."
    },
    "correta": 2,
    "materia": "Química",
    "explicacao": "A Lei de Hess afirma que a variação de entalpia de uma reação é constante, independentemente de ser realizada em uma única etapa ou em várias etapas."
  },
    {
    "pergunta": "Qual das seguintes transformações NÃO está diretamente associada ao processo de globalização no mundo do trabalho?",
    "opcoes": {
      "0": "Aumento da terceirização e flexibilização das relações de trabalho.",
      "1": "Crescimento do setor de serviços em detrimento do setor industrial.",
      "2": "Fortalecimento dos sindicatos em nível global.",
      "3": "Maior competitividade entre trabalhadores de diferentes países."
    },
    "correta": 2,
    "materia": "Sociologia",
    "explicacao": "A globalização, em geral, enfraqueceu o poder dos sindicatos em nível nacional e global, devido à descentralização da produção e à maior mobilidade do capital."
  },
  {
    "pergunta": "O conceito de 'alienação' no trabalho, proposto por Karl Marx, refere-se principalmente à:",
    "opcoes": {
      "0": "Falta de reconhecimento social do trabalhador.",
      "1": "Exaustão física e mental causada pelo excesso de trabalho.",
      "2": "Separação do trabalhador do produto do seu trabalho, do processo de produção, de seus colegas e de sua própria potencialidade humana.",
      "3": "Baixa remuneração e más condições de trabalho."
    },
    "correta": 2,
    "materia": "Sociologia",
    "explicacao": "A alienação, para Marx, é a perda de autonomia e controle do trabalhador sobre o seu trabalho e seus resultados, levando a um sentimento de estranhamento e desumanização."
  },
  {
    "pergunta": "Qual das seguintes características descreve melhor o modelo de produção fordista?",
    "opcoes": {
      "0": "Produção artesanal e personalizada.",
      "1": "Produção em massa, com linhas de montagem e padronização.",
      "2": "Produção flexível, adaptada às demandas do mercado.",
      "3": "Produção baseada no conhecimento e na inovação tecnológica."
    },
    "correta": 1,
    "materia": "Sociologia",
    "explicacao": "O fordismo é caracterizado pela produção em larga escala de bens padronizados, utilizando a linha de montagem para aumentar a eficiência e reduzir custos."
  },
  {
    "pergunta": "O que se entende por 'divisão social do trabalho'?",
    "opcoes": {
      "0": "A distribuição de tarefas e funções entre diferentes indivíduos e grupos na sociedade.",
      "1": "A separação entre trabalho manual e trabalho intelectual.",
      "2": "A desigualdade salarial entre homens e mulheres no mercado de trabalho.",
      "3": "A organização dos trabalhadores em sindicatos e associações de classe."
    },
    "correta": 0,
    "materia": "Sociologia",
    "explicacao": "A divisão social do trabalho é a forma como as diferentes atividades produtivas são distribuídas entre os membros de uma sociedade, gerando interdependência e especialização."
  },
  {
    "pergunta": "A precarização do trabalho no contexto contemporâneo é marcada por:",
    "opcoes": {
      "0": "Aumento da segurança no emprego e dos direitos trabalhistas.",
      "1": "Crescimento do trabalho formal e da proteção social.",
      "2": "Expansão de formas de trabalho instáveis, com baixos salários e poucos benefícios.",
      "3": "Fortalecimento da legislação trabalhista e da fiscalização."
    },
    "correta": 2,
    "materia": "Sociologia",
    "explicacao": "A precarização se manifesta através da informalidade, da terceirização excessiva, dos contratos temporários e da perda de direitos trabalhistas, tornando o trabalho mais vulnerável."
  },
  {
    "pergunta": "Qual das seguintes afirmações sobre o conceito de cultura em Sociologia é INCORRETA?",
    "opcoes": {
      "0": "Cultura abrange os conhecimentos, crenças, valores, normas e costumes de um grupo social.",
      "1": "Cultura é estática e imutável ao longo do tempo.",
      "2": "Diferentes grupos sociais podem ter culturas distintas.",
      "3": "A cultura influencia a forma como as pessoas pensam, agem e interagem."
    },
    "correta": 1,
    "materia": "Sociologia",
    "explicacao": "A cultura é dinâmica e está em constante transformação, influenciada por diversos fatores como contato entre grupos, avanços tecnológicos e mudanças sociais."
  },
  {
    "pergunta": "O termo 'indústria cultural', cunhado por Theodor Adorno e Max Horkheimer, refere-se ao processo de:",
    "opcoes": {
      "0": "Valorização das manifestações artísticas populares.",
      "1": "Produção em massa de bens culturais com o objetivo de lucro e homogeneização do gosto.",
      "2": "Apoio governamental a artistas e produtores culturais independentes.",
      "3": "Criação de espaços para a livre expressão cultural e artística."
    },
    "correta": 1,
    "materia": "Sociologia",
    "explicacao": "A indústria cultural, segundo Adorno e Horkheimer, transforma a cultura em mercadoria, padronizando produtos culturais e influenciando o pensamento e o comportamento das massas."
  },
  {
    "pergunta": "Um exemplo de produto da indústria cultural é:",
    "opcoes": {
      "0": "Uma peça de teatro experimental com público limitado.",
      "1": "Um livro de poesia de um autor desconhecido.",
      "2": "Um filme de super-heróis com grande investimento em marketing e distribuição.",
      "3": "Uma manifestação folclórica local transmitida oralmente."
    },
    "correta": 2,
    "materia": "Sociologia",
    "explicacao": "Filmes de grande sucesso, com ampla divulgação e distribuição, são típicos produtos da indústria cultural, visando o consumo em massa."
  },
  {
    "pergunta": "A crítica da indústria cultural à cultura de massa reside principalmente na:",
    "opcoes": {
      "0": "Sua incapacidade de gerar lucro para os produtores culturais.",
      "1": "Sua tendência a promover a diversidade de expressões artísticas.",
      "2": "Sua função de entretenimento e lazer para a população.",
      "3": "Sua capacidade de alienar e manipular o público, enfraquecendo o pensamento crítico."
    },
    "correta": 3,
    "materia": "Sociologia",
    "explicacao": "Os críticos da indústria cultural argumentam que ela simplifica e padroniza os produtos culturais, limitando a capacidade das pessoas de refletir criticamente sobre a realidade."
  },
  {
    "pergunta": "O conceito de 'hegemonia cultural', de Antonio Gramsci, descreve:",
    "opcoes": {
      "0": "A dominação de uma cultura sobre outras pela força militar.",
      "1": "O consenso e a aceitação das ideias e valores da classe dominante pela sociedade como um todo.",
      "2": "A resistência das culturas minoritárias à cultura dominante.",
      "3": "A coexistência pacífica de diversas culturas em uma mesma sociedade."
    },
    "correta": 1,
    "materia": "Sociologia",
    "explicacao": "A hegemonia cultural ocorre quando a visão de mundo da classe dominante se torna a visão de mundo 'natural' e aceita pela maioria, mesmo que não sirva aos seus próprios interesses."
  },
  {
    "pergunta": "Qual dos seguintes fatores contribuiu significativamente para o surgimento da cultura de massas?",
    "opcoes": {
      "0": "O declínio da produção industrial e o crescimento do setor de serviços.",
      "1": "A expansão da educação formal e o aumento do acesso à cultura erudita.",
      "2": "O desenvolvimento dos meios de comunicação de massa, como o rádio e a televisão.",
      "3": "O fortalecimento das tradições locais e a valorização das manifestações culturais populares."
    },
    "correta": 2,
    "materia": "Sociologia",
    "explicacao": "Os meios de comunicação de massa permitiram a disseminação de informações e produtos culturais para um grande número de pessoas simultaneamente, moldando a cultura de massas."
  },
  {
    "pergunta": "A internet e as redes sociais representam uma transformação nos meios de comunicação, caracterizada por:",
    "opcoes": {
      "0": "Uma comunicação unidirecional, do emissor para o receptor.",
      "1": "Um controle centralizado da informação por grandes corporações midiáticas.",
      "2": "Uma maior interatividade e participação dos usuários na produção e disseminação de conteúdo.",
      "3": "Uma diminuição da influência da mídia tradicional."
    },
    "correta": 2,
    "materia": "Sociologia",
    "explicacao": "A internet e as redes sociais democratizaram parcialmente a produção e o consumo de informação, permitindo que os usuários se tornem também produtores de conteúdo e interajam de forma mais direta."
  },
  {
    "pergunta": "O conceito de 'sociedade da informação' refere-se a uma sociedade em que:",
    "opcoes": {
      "0": "A produção agrícola é a principal atividade econômica.",
      "1": "O conhecimento e a informação são os principais recursos econômicos, sociais e culturais.",
      "2": "A indústria manufatureira é o setor mais importante da economia.",
      "3": "As relações sociais são baseadas principalmente na comunicação face a face."
    },
    "correta": 1,
    "materia": "Sociologia",
    "explicacao": "Na sociedade da informação, o acesso, o processamento e a disseminação da informação são cruciais para o desenvolvimento econômico e social."
  },
  {
    "pergunta": "Um dos desafios da cultura de massas mediada pela tecnologia é:",
    "opcoes": {
      "0": "A dificuldade de acesso à informação e ao entretenimento por grande parte da população.",
      "1": "A supervalorização da cultura local em detrimento da cultura global.",
      "2": "O risco de homogeneização cultural e a perda da diversidade.",
      "3": "O excesso de conteúdo educativo e a falta de opções de lazer."
    },
    "correta": 2,
    "materia": "Sociologia",
    "explicacao": "A ampla disseminação de produtos culturais padronizados pode levar à perda de identidades culturais específicas e à uniformização de gostos e valores."
  },
  {
    "pergunta": "O fenômeno das 'fake news' (notícias falsas) está relacionado com:",
    "opcoes": {
      "0": "A crescente credibilidade das fontes de informação tradicionais.",
      "1": "A facilidade de produção e disseminação de informações não verificadas através das mídias digitais.",
      "2": "O aumento do interesse da população por notícias factuais e bem apuradas.",
      "3": "A diminuição do impacto das redes sociais na formação da opinião pública."
    },
    "correta": 1,
    "materia": "Sociologia",
    "explicacao": "A velocidade e a falta de filtros nas mídias digitais facilitam a propagação de informações falsas, com potenciais impactos na opinião pública e nos processos democráticos."
  },
  {
    "pergunta": "Qual das seguintes características NÃO corresponde ao modelo de produção toyotista?",
    "opcoes": {
      "0": "Produção flexível e adaptada à demanda.",
      "1": "Estoque mínimo (\"just-in-time\").",
      "2": "Ênfase na produção em massa e na padronização.",
      "3": "Trabalho em equipe e multifuncionalidade dos trabalhadores."
    },
    "correta": 2,
    "materia": "Sociologia",
    "explicacao": "O toyotismo se diferencia do fordismo justamente por priorizar a flexibilidade e a produção sob demanda, em contraposição à produção em massa e aos grandes estoques."
  },
  {
    "pergunta": "O conceito de 'indústria do entretenimento' pode ser considerado um ramo da indústria cultural que se dedica principalmente a:",
    "opcoes": {
      "0": "Promover a reflexão crítica e a transformação social através da arte.",
      "1": "Produzir bens culturais com foco no lazer e no consumo imediato.",
      "2": "Preservar e divulgar as manifestações culturais tradicionais.",
      "3": "Apoiar artistas independentes e produções alternativas."
    },
    "correta": 1,
    "materia": "Sociologia",
    "explicacao": "A indústria do entretenimento visa principalmente o divertimento e o consumo, muitas vezes com menor preocupação com o conteúdo crítico ou a profundidade cultural."
  },
  {
    "pergunta": "A 'cultura participativa' no ambiente digital se caracteriza por:",
    "opcoes": {
      "0": "Uma audiência passiva que apenas consome o conteúdo produzido por outros.",
      "1": "A possibilidade de os usuários criarem, compartilharem e interagirem com o conteúdo de forma ativa.",
      "2": "Um controle rígido das informações por grandes empresas de mídia.",
      "3": "Uma separação clara entre produtores e consumidores de conteúdo."
    },
    "correta": 1,
    "materia": "Sociologia",
    "explicacao": "A cultura participativa é marcada pela descentralização da produção de conteúdo e pelo engajamento ativo dos usuários nas plataformas digitais."
  },
  {
    "pergunta": "Qual dos seguintes fatores NÃO contribui para a formação da cultura de massas?",
    "opcoes": {
      "0": "A concentração da propriedade dos meios de comunicação.",
      "1": "A padronização dos produtos culturais.",
      "2": "A valorização das particularidades culturais locais.",
      "3": "O uso intensivo de estratégias de marketing e publicidade."
    },
    "correta": 2,
    "materia": "Sociologia",
    "explicacao": "A cultura de massas tende a homogeneizar gostos e valores, o que pode ir de encontro à valorização das particularidades culturais de cada local."
  },
  {
    "pergunta": "O conceito de 'alfabetização midiática' é importante na sociedade da informação porque visa desenvolver a capacidade de:",
    "opcoes": {
      "0": "Utilizar todas as ferramentas tecnológicas disponíveis.",
      "1": "Consumir passivamente todo o tipo de conteúdo midiático.",
      "2": "Analisar criticamente as mensagens veiculadas pelos diferentes meios de comunicação.",
      "3": "Produzir conteúdo para as diversas plataformas digitais."
    },
    "correta": 2,
    "materia": "Sociologia",
    "explicacao": "A alfabetização midiática capacita os indivíduos a compreenderem a complexidade dos meios de comunicação e a avaliarem criticamente as informações que recebem."
  },
  {
    "pergunta": "No contexto do mundo do trabalho, o termo 'uberização' se refere a:",
    "opcoes": {
      "0": "Aumento da formalização dos contratos de trabalho.",
      "1": "Expansão do trabalho autônomo mediado por plataformas digitais.",
      "2": "Fortalecimento dos direitos trabalhistas em setores tecnológicos.",
      "3": "Diminuição da desigualdade salarial entre diferentes profissões."
    },
    "correta": 1,
    "materia": "Sociologia",
    "explicacao": "A 'uberização' caracteriza-se pela intermediação digital entre trabalhadores e consumidores, muitas vezes com relações de trabalho flexíveis e sem os mesmos direitos do emprego tradicional."
  },
  {
    "pergunta": "Qual das seguintes alternativas NÃO representa uma característica da indústria cultural?",
    "opcoes": {
      "0": "Produção em série de bens simbólicos.",
      "1": "Busca pela inovação radical e pela experimentação artística.",
      "2": "Lógica do lucro como principal motor da produção.",
      "3": "Tentativa de alcançar o maior público possível."
    },
    "correta": 1,
    "materia": "Sociologia",
    "explicacao": "A indústria cultural tende a evitar a experimentação radical que possa não ser facilmente assimilada pelo grande público, priorizando fórmulas de sucesso e produtos de fácil consumo."
  },
  {
    "pergunta": "A 'bolha de filtro' (filter bubble) nas redes sociais se refere a:",
    "opcoes": {
      "0": "Um espaço virtual onde todas as opiniões são igualmente consideradas.",
      "1": "A tendência de os algoritmos mostrarem aos usuários apenas informações que confirmam suas crenças e opiniões.",
      "2": "A dificuldade de encontrar informações relevantes em meio ao grande volume de dados.",
      "3": "Um ambiente online seguro e livre de notícias falsas."
    },
    "correta": 1,
    "materia": "Sociologia",
    "explicacao": "A bolha de filtro pode limitar a exposição a diferentes perspectivas, reforçando vieses e dificultando o debate plural."
  },
  {
    "pergunta": "Um dos principais desafios da tecnologia no mundo do trabalho é:",
    "opcoes": {
      "0": "A falta de ferramentas digitais para otimizar a produção.",
      "1": "O aumento da demanda por trabalhadores com baixa qualificação.",
      "2": "O potencial para o aumento do desemprego devido à automação e à inteligência artificial.",
      "3": "A dificuldade de comunicação entre trabalhadores remotos."
    },
    "correta": 2,
    "materia": "Sociologia",
    "explicacao": "A automação de tarefas e a crescente capacidade da inteligência artificial levantam preocupações sobre a substituição de trabalhadores humanos em diversas áreas."
  },
  {
    "pergunta": "A relação entre cultura de massas e identidade cultural pode ser caracterizada por:",
    "opcoes": {
      "0": "Um fortalecimento automático das identidades locais frente à cultura global.",
      "1": "Uma influência da cultura de massas na construção de identidades, por meio de modelos e representações.",
      "2": "Uma completa separação entre os produtos da cultura de massas e as manifestações culturais identitárias.",
      "3": "Uma resistência homogênea das culturas locais aos produtos da mídia de massa."
    },
    "correta": 1,
    "materia": "Sociologia",
    "explicacao": "A cultura de massas, através de seus produtos e narrativas, oferece referências e modelos que podem influenciar a forma como os indivíduos e grupos constroem suas identidades."
  },
    {
    "pergunta": "Lee el siguiente fragmento: 'El sol se escondía tras las montañas, tiñendo el cielo de tonos naranjas y rojizos. Un silencio casi absoluto envolvía el valle, roto solo por el canto lejano de un pájaro.' ¿Qué sensación predomina en la descripción?",
    "opcoes": {
      "0": "Alegría y vitalidad.",
      "1": "Misterio y temor.",
      "2": "Paz y tranquilidad.",
      "3": "Urgencia y movimiento."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "As imagens do sol se pondo, os tons quentes do céu e o silêncio quebrado por um canto distante evocam uma atmosfera de calma e serenidade.."
  },
  {
    "pergunta": "En la frase 'El nuevo empleado demostró ser muy hábil en su trabajo.', ¿cuál es un sinónimo de la palabra destacada?",
    "opcoes": {
      "0": "Lento.",
      "1": "Torpe.",
      "2": "Experto.",
      "3": "Desinteresado."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": " 'Hábil' se refere a alguém que tem destreza e capacidade para realizar uma tarefa, portanto 'experiente' é um sinônimo adequado."
  },
  {
    "pergunta": "Lee el siguiente titular de noticia: 'Aumento del desempleo juvenil preocupa al gobierno.' ¿Cuál es la función principal de este texto?",
    "opcoes": {
      "0": "Entretener al lector con una historia.",
      "1": "Informar sobre un hecho relevante.",
      "2": "Persuadir al lector de una opinión.",
      "3": "Dar instrucciones sobre cómo actuar."
    },
    "correcta": 1,
    "materia": "Espanhol",
    "explicacao": "Uma manchete de notícia tem como objetivo principal comunicar um fato de interesse público de maneira concisa."
  },
  {
    "pergunta": "En la oración 'Aunque llovía a cántaros, decidimos salir a pasear.', la conjunción 'aunque' introduce una idea de:",
    "opcoes": {
      "0": "Causa.",
      "1": "Consecuencia.",
      "2": "Condición.",
      "3": "Contraste u oposición."
    },
    "correta": 3,
    "materia": "Espanhol",
    "explicacao": "A conjunção 'aunque' (embora) é utilizada para expressar uma dificuldade ou um obstáculo que não impede a realização da ação principal, introduzindo uma ideia de contraste."
  },
  {
    "pergunta": "Lee el siguiente microcuento: 'El dinosaurio ya no estaba allí. Solo quedaba el letrero: 'Se fue a comprar tabaco y vuelve en un millón de años'. ¿Cuál es la intención comunicativa principal del autor?",
    "opcoes": {
      "0": "Informar sobre la extinción de los dinosaurios.",
      "1": "Criticar los hábitos de consumo de tabaco.",
      "2": "Provocar humor e ironía.",
      "3": "Describir un paisaje prehistórico."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "A situação absurda de um dinossauro saindo para comprar tabaco e demorando um milhão de anos sugere uma intenção humorística e a utilização da ironia."
  },
   {
    "pergunta": "En la frase 'Su rostro reflejaba una amargura profunda tras la decepción.', ¿cuál es el significado de la palabra destacada?",
    "opcoes": {
      "0": "Alegría intensa.",
      "1": "Satisfacción plena.",
      "2": "Sentimiento de pena y aflicción.",
      "3": "Indiferencia total."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "Amargura descreve um sentimento profundo de desgosto, pena ou ressentimento, geralmente causado por uma decepção."
  },
  {
    "pergunta": "Lee el siguiente fragmento de un poema: 'Las olas besan la arena con suave murmullo.' ¿Qué figura retórica se utiliza principalmente?",
    "opcoes": {
      "0": "Metáfora.",
      "1": "Hipérbole.",
      "2": "Personificación.",
      "3": "Símil."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "Atribui-se uma ação humana ('beijar') a um elemento da natureza ('as ondas', o que caracteriza a figura de linguagem personificação."
  },
  {
    "pergunta": "¿Cuál de las siguientes palabras tiene un significado opuesto a 'optimista'?",
    "opcoes": {
      "0": "Alegre.",
      "1": "Positivo.",
      "2": "Pesimista.",
      "3": "Entusiasmado."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "'Otimista' se refere a uma pessoa que tende a ver o lado bom das coisas, enquanto 'pessimista' é o contrário, esperando resultados negativos."
  },
  {
    "pergunta": "Lee el siguiente texto breve: 'Se ruega a los pasajeros mantener la calma y seguir las instrucciones del personal de a bordo.' ¿Cuál es la función principal de este texto?",
    "opcoes": {
      "0": "Narrar un evento ocurrido en un avión.",
      "1": "Describir las características de un vuelo.",
      "2": "Dar indicaciones y normas de comportamiento.",
      "3": "Expresar los sentimientos de los pasajeros."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "O uso da forma verbal 'se ruega' (roga-se) indica um pedido formal ou uma instrução dirigida a um público específico, com o objetivo de dar indicações."
  },
  {
    "pergunta": "En la frase 'El caudaloso río inundó las tierras bajas.', ¿qué nos dice el adjetivo destacado sobre el río?",
    "opcoes": {
      "0": "Que es poco profundo.",
      "1": "Que tiene mucha corriente y volumen de agua.",
      "2": "Que está contaminado.",
      "3": "Que es de color claro."
    },
    "correta": 1,
    "materia": "Espanhol",
    "explicacao": "'Caudaloso' descreve um rio com uma grande quantidade de água que flui com força, indicando um volume e correnteza significativos."
  },
   {
    "pergunta": "Lee el siguiente fragmento: 'Si hubiera estudiado más, habría aprobado el examen.' ¿Qué expresa esta oración?",
    "opcoes": {
      "0": "Una certeza sobre el pasado.",
      "1": "Una condición real en el presente.",
      "2": "Una hipótesis o condición irreal en el pasado.",
      "3": "Una orden para el futuro."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "O uso do condicional composto ('habría aprobado' - teria aprovado) e o pretérito mais-que-perfeito do subjuntivo ('hubiera estudiado' - tivesse estudado) indica uma situação hipotética que não ocorreu no passado,expressando uma condição irreal."
  },
  {
    "pergunta": "¿Cuál de las siguientes palabras es un antónimo de 'generoso'?",
    "opcoes": {
      "0": "Bondadoso.",
      "1": "Altruista.",
      "2": "Tacaño.",
      "3": "Benévolo."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "'Generoso' se refere a alguém que compartilha o que tem, enquanto 'tacaño' (mesquinho) é alguém que não gosta de dar ou compartilhar."
  },
  {
    "pergunta": "Lee el siguiente texto: 'La deforestación continúa a un ritmo alarmante, poniendo en peligro la biodiversidad y contribuyendo al cambio climático.' ¿Cuál es la principal preocupación expresada en el texto?",
    "opcoes": {
      "0": "El aumento de la producción agrícola.",
      "1": "La expansión de las áreas urbanas.",
      "2": "Las consecuencias negativas de la pérdida de bosques.",
      "3": "La falta de recursos naturales."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "O texto expressa uma preocupação principal com as consequências negativas da perda de florestas, mencionando o perigo para a biodiversidade e a contribuição para a mudança climática."
  },
  {
    "pergunta": "En la frase 'El público aplaudió efusivamente la actuación.', ¿qué indica el adverbio destacado sobre la acción de aplaudir?",
    "opcoes": {
      "0": "Que fue breve y discreta.",
      "1": "Que fue larga y ruidosa.",
      "2": "Que fue hecha con gran emoción e intensidad.",
      "3": "Que fue realizada de mala gana."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "'Efusivamente' significa com grande entusiasmo e demonstração de sentimento, indicando que o público aplaudiu com muita emoção e intensidade."
  },
  {
    "pergunta": "Lee el siguiente fragmento de una crítica de cine: 'La película, a pesar de su ambicioso guion, adolece de un ritmo irregular y actuaciones poco convincentes.' ¿Cuál es la opinión general del crítico sobre la película?",
    "opcoes": {
      "0": "Es una obra maestra del cine contemporáneo.",
      "1": "Es una película entretenida y bien lograda.",
      "2": "Tiene potencial pero presenta fallas importantes.",
      "3": "Es una película completamente decepcionante."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "O crítico reconhece o potencial do roteiro (';ambicioso guion') mas aponta falhas significativas ('adolece de un ritmo irregular y actuaciones poco convincentes'), indicando uma opinião mista com críticas importantes."
  },
   {
    "pergunta": "¿Cuál de las siguientes palabras tiene un significado similar a 'persuadir'?",
    "opcoes": {
      "0": "Informar.",
      "1": "Disuadir.",
      "2": "Convencer.",
      "3": "Narrar."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "'Persuadir' e ';convencer' se referem à ação de influenciar alguém para que acredite ou faça algo."
  },
  {
    "pergunta": "Lee el siguiente texto instructivo: 'Para activar el dispositivo, pulse el botón de encendido y manténgalo presionado durante tres segundos.' ¿Cuál es la función principal de este texto?",
    "opcoes": {
      "0": "Describir las características del dispositivo.",
      "1": "Explicar la historia del dispositivo.",
      "2": "Dar instrucciones para el uso del dispositivo.",
      "3": "Promocionar la venta del dispositivo."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "O texto utiliza verbos no imperativo ('pulse', 'manténgalo' - pressione, mantenha) e fornece passos específicos para realizar uma ação, caracterizando um texto com função de dar instruções."
  },
  {
    "pergunta": "En la frase 'Sintió un escalofrío al escuchar el ruido en la oscuridad.', ¿qué describe la palabra destacada?",
    "opcoes": {
      "0": "Una sensación de calor intenso.",
      "1": "Una punzada de dolor agudo.",
      "2": "Una sensación repentina de frío y temor.",
      "3": "Una sensación de profunda alegría."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "Um 'escalofrío' (calafrio) é uma sensação repentina de frio acompanhada frequentemente de temor ou nervosismo, geralmente causada por medo ou excitação."
  },
  {
    "pergunta": "Lee el siguiente fragmento de un cuento: 'La vieja casa permanecía en silencio, como esperando un secreto que nunca sería revelado.' ¿Qué atmósfera se crea principalmente?",
    "opcoes": {
      "0": "Alegría y celebración.",
      "1": "Misterio y melancolía.",
      "2": "Acción y aventura.",
      "3": "Humor y ligereza."
    },
    "correta": 1,
    "materia": "Espanhol",
    "explicacao": "O silêncio da casa e a ideia de um segredo não revelado ('como esperando un secreto que nunca sería revelado') geram uma atmosfera de mistério e melancolia."
  },
  {
    "pergunta": "¿Cuál de las siguientes palabras es un sinónimo de 'astuto'?",
    "opcoes": {
      "0": "Ingenuo.",
      "1": "Sincero.",
      "2": "Inteligente y hábil para engañar.",
      "3": "Torpe."
    },
    "correta": 2,
    "materia": "Español",
    "explicacao": "'Astuto' refere a alguém que utiliza a inteligência e a habilidade para conseguir seus propósitos, frequentemente de maneira sutil ou enganosa."
  },
   {
    "pergunta": "Lee el siguiente cartel: '¡Gran liquidación! Todos los artículos al 50% de descuento.' ¿Cuál es la función principal de este texto?",
    "opcoes": {
      "0": "Informar sobre las características de los productos.",
      "1": "Contar una historia sobre la tienda.",
      "2": "Persuadir al público para que compre.",
      "3": "Dar instrucciones sobre cómo llegar a la tienda."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "O uso da exclamação ('¡Gran liquidación!') e a menção de um grande desconto (50%) têm como objetivo persuadir o público a comprar os produtos."
  },
  {
    "pergunta": "En la frase 'A pesar de su elocuencia, no logró convencer al jurado.', ¿qué significa la palabra destacada?",
    "opcoes": {
      "0": "Falta de claridad al hablar.",
      "1": "Gran habilidad para hablar con fluidez y persuasión.",
      "2": "Timidez al expresarse.",
      "3": "Dificultad para articular las palabras."
    },
    "correta": 1,
    "materia": "Espanhol",
    "explicacao": "';Elocuencia' se refere à grande habilidade de falar com fluidez, persuasão e graça, mostrando domínio da palavra."
  },
  {
    "pergunta": "Lee el siguiente fragmento de un artículo de opinión: 'Es imperativo que los gobiernos tomen medidas urgentes para combatir el cambio climático.' ¿Qué tipo de texto es principalmente?",
    "opcoes": {
      "0": "Narrativo.",
      "1": "Descriptivo.",
      "2": "Argumentativo.",
      "3": "Instructivo."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "O autor expressa uma opinião ('Es imperativo que los gobiernos tomen medidas urgentes...') e busca influenciar a do leitor sobre a necessidade de tomar ações contra o cambio climático, caracterizando um texto argumentativo."
  },
  {
    "pergunta": "¿Cuál de las siguientes palabras tiene un significado opuesto a 'valiente'?",
    "opcoes": {
      "0": "Audaz.",
      "1": "Intrépido.",
      "2": "Cobarde.",
      "3": "Osado."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "'Valiente' (valente) se refere a alguém que mostra coragem, enquanto 'cobarde' (covarde) é alguém que tem falta de valor."
  },
  {
    "pergunta": "Lee el siguiente mensaje de correo electrónico: 'Estimado cliente, le informamos que su pedido ha sido enviado y llegará en un plazo de 3 a 5 días hábiles.' ¿Cuál es la función principal de este texto?",
    "opcoes": {
      "0": "Expresar una opinión personal.",
      "1": "Contar una experiencia de compra.",
      "2": "Proporcionar información sobre el estado de un pedido.",
      "3": "Solicitar información al cliente."
    },
    "correta": 2,
    "materia": "Espanhol",
    "explicacao": "A mensagem tem como objetivo principal fornecer informações ao cliente sobre o estado do seu pedido (enviado e prazo de entrega)."
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