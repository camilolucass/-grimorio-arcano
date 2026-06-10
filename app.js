(() => {
  "use strict";

  const STORAGE_KEY = "grimorio-arcano:v1";

  const ABILITIES = ["Inteligência", "Sabedoria", "Carisma"];
  const CASTER_TYPES = [
    ["full", "Conjurador completo"],
    ["half", "Meio conjurador"],
    ["third", "Terço conjurador"],
    ["pact", "Pacto"],
    ["custom", "Manual"],
  ];
  const CLASSES = [
    "Artífice",
    "Bardo",
    "Bruxo",
    "Clérigo",
    "Druida",
    "Feiticeiro",
    "Guardião",
    "Mago",
    "Paladino",
    "Patrulheiro",
    "Homebrew",
  ];
  const SCHOOLS = [
    "Abjuração",
    "Adivinhação",
    "Conjuração",
    "Encantamento",
    "Evocação",
    "Ilusão",
    "Necromancia",
    "Transmutação",
  ];
  const SCHOOL_CODES = {
    A: "Abjuração",
    C: "Conjuração",
    D: "Adivinhação",
    E: "Encantamento",
    V: "Evocação",
    I: "Ilusão",
    N: "Necromancia",
    T: "Transmutação",
  };
  const CLASS_TRANSLATIONS = {
    Artificer: "Artífice",
    Bard: "Bardo",
    Cleric: "Clérigo",
    Druid: "Druida",
    Paladin: "Paladino",
    Ranger: "Patrulheiro",
    Sorcerer: "Feiticeiro",
    Warlock: "Bruxo",
    Wizard: "Mago",
  };
  const SAVE_TRANSLATIONS = {
    strength: "Força",
    dexterity: "Destreza",
    constitution: "Constituição",
    intelligence: "Inteligência",
    wisdom: "Sabedoria",
    charisma: "Carisma",
  };
  const DAMAGE_TRANSLATIONS = {
    acid: "ácido",
    bludgeoning: "contusão",
    cold: "frio",
    fire: "fogo",
    force: "energia",
    lightning: "elétrico",
    necrotic: "necrótico",
    piercing: "perfurante",
    poison: "veneno",
    psychic: "psíquico",
    radiant: "radiante",
    slashing: "cortante",
    thunder: "trovejante",
  };
  const LEVEL_LABELS = [
    "Truque",
    "1º círculo",
    "2º círculo",
    "3º círculo",
    "4º círculo",
    "5º círculo",
    "6º círculo",
    "7º círculo",
    "8º círculo",
    "9º círculo",
  ];

  const FULL_CASTER_SLOTS = {
    1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
    2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
    3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
    4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
    5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
    6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
    7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
    8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
    9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
    10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
    11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
    18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
    19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
    20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
  };

  const PACT_SLOTS = {
    1: { level: 1, count: 1 },
    2: { level: 1, count: 2 },
    3: { level: 2, count: 2 },
    4: { level: 2, count: 2 },
    5: { level: 3, count: 2 },
    6: { level: 3, count: 2 },
    7: { level: 4, count: 2 },
    8: { level: 4, count: 2 },
    9: { level: 5, count: 2 },
    10: { level: 5, count: 2 },
    11: { level: 5, count: 3 },
    12: { level: 5, count: 3 },
    13: { level: 5, count: 3 },
    14: { level: 5, count: 3 },
    15: { level: 5, count: 3 },
    16: { level: 5, count: 3 },
    17: { level: 5, count: 4 },
    18: { level: 5, count: 4 },
    19: { level: 5, count: 4 },
    20: { level: 5, count: 4 },
  };

  const THEMES = {
    verdant: {
      name: "Verde arcano",
      accent: "#8ebf74",
      accentStrong: "#d6b35f",
      ink: "#221c16",
      paper: "#ead8ae",
      cover: "#1d3329",
    },
    crimson: {
      name: "Couro rubro",
      accent: "#c6635f",
      accentStrong: "#d2a84f",
      ink: "#211917",
      paper: "#e8d2aa",
      cover: "#3a1e24",
    },
    violet: {
      name: "Violeta astral",
      accent: "#a98cdb",
      accentStrong: "#d6be6b",
      ink: "#201a27",
      paper: "#e6d8b8",
      cover: "#27213b",
    },
    umbral: {
      name: "Tinta sombria",
      accent: "#7fb0b4",
      accentStrong: "#c1a060",
      ink: "#171717",
      paper: "#ddd2b4",
      cover: "#1d2226",
    },
  };

  const DEFAULT_SPELLS = [
    spell("spell-light", "Luz", 0, "Evocação", ["Bardo", "Clérigo", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "Toque",
      components: "V, M",
      duration: "1 hora",
      effect: "Um objeto tocado passa a emitir luz brilhante e penumbra ao redor.",
      tags: ["utilidade", "exploração"],
    }),
    spell("spell-mage-hand", "Mãos Mágicas", 0, "Conjuração", ["Bardo", "Bruxo", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "9 m",
      components: "V, S",
      duration: "1 minuto",
      effect: "Cria uma mão espectral capaz de manipular objetos leves à distância.",
      tags: ["utilidade", "controle"],
    }),
    spell("spell-prestidigitation", "Prestidigitação", 0, "Transmutação", ["Bardo", "Bruxo", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "3 m",
      components: "V, S",
      duration: "Até 1 hora",
      effect: "Produz pequenos truques sensoriais, limpeza, aquecimento, marcas ou efeitos inofensivos.",
      tags: ["utilidade", "social"],
    }),
    spell("spell-fire-bolt", "Raio de Fogo", 0, "Evocação", ["Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "36 m",
      components: "V, S",
      duration: "Instantânea",
      attack: "Ataque mágico à distância",
      damage: "1d10",
      damageType: "fogo",
      effect: "Um disparo flamejante atinge uma criatura ou objeto inflamável.",
      tags: ["dano", "ataque"],
    }),
    spell("spell-eldritch-blast", "Rajada Mística", 0, "Evocação", ["Bruxo"], {
      castingTime: "1 ação",
      range: "36 m",
      components: "V, S",
      duration: "Instantânea",
      attack: "Ataque mágico à distância",
      damage: "1d10",
      damageType: "energia",
      effect: "Um feixe de energia mística atinge o alvo.",
      tags: ["dano", "ataque"],
    }),
    spell("spell-sacred-flame", "Chama Sagrada", 0, "Evocação", ["Clérigo"], {
      castingTime: "1 ação",
      range: "18 m",
      components: "V, S",
      duration: "Instantânea",
      save: "Destreza",
      damage: "1d8",
      damageType: "radiante",
      effect: "Chamas radiantes descem sobre o alvo; cobertura não ajuda contra o teste.",
      tags: ["dano", "teste"],
    }),
    spell("spell-guidance", "Orientação", 0, "Adivinhação", ["Clérigo", "Druida"], {
      castingTime: "1 ação",
      range: "Toque",
      components: "V, S",
      duration: "Concentração, até 1 minuto",
      concentration: true,
      effect: "A criatura tocada recebe auxílio em um teste de atributo próximo.",
      tags: ["suporte", "concentração"],
    }),
    spell("spell-vicious-mockery", "Zombaria Viciosa", 0, "Encantamento", ["Bardo"], {
      castingTime: "1 ação",
      range: "18 m",
      components: "V",
      duration: "Instantânea",
      save: "Sabedoria",
      damage: "1d4",
      damageType: "psíquico",
      effect: "O alvo sofre dano psíquico e tem desvantagem no próximo ataque.",
      tags: ["dano", "debuff"],
    }),
    spell("spell-minor-illusion", "Ilusão Menor", 0, "Ilusão", ["Bardo", "Bruxo", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "9 m",
      components: "S, M",
      duration: "1 minuto",
      effect: "Cria um som ou imagem pequena que pode enganar observadores.",
      tags: ["utilidade", "social"],
    }),
    spell("spell-shocking-grasp", "Toque Chocante", 0, "Evocação", ["Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "Toque",
      components: "V, S",
      duration: "Instantânea",
      attack: "Ataque mágico corpo a corpo",
      damage: "1d8",
      damageType: "elétrico",
      effect: "O alvo atingido não pode fazer reações até o início do seu próximo turno.",
      tags: ["dano", "controle"],
    }),
    spell("spell-mage-armor", "Armadura Arcana", 1, "Abjuração", ["Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "Toque",
      components: "V, S, M",
      duration: "8 horas",
      effect: "Uma criatura sem armadura passa a ter uma base defensiva mágica.",
      tags: ["defesa", "buff"],
    }),
    spell("spell-shield", "Escudo", 1, "Abjuração", ["Feiticeiro", "Mago"], {
      castingTime: "1 reação",
      range: "Pessoal",
      components: "V, S",
      duration: "1 rodada",
      effect: "Aumenta a defesa contra um ataque ou efeito que acabou de atingir você.",
      tags: ["defesa", "reação"],
    }),
    spell("spell-magic-missile", "Mísseis Mágicos", 1, "Evocação", ["Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "36 m",
      components: "V, S",
      duration: "Instantânea",
      damage: "3d4+3",
      damageType: "energia",
      upcast: "1d4+1",
      effect: "Dardos de energia acertam automaticamente criaturas à escolha.",
      tags: ["dano", "precisão"],
    }),
    spell("spell-cure-wounds", "Curar Ferimentos", 1, "Evocação", ["Bardo", "Clérigo", "Druida", "Paladino", "Patrulheiro"], {
      castingTime: "1 ação",
      range: "Toque",
      components: "V, S",
      duration: "Instantânea",
      healing: "1d8",
      upcast: "1d8",
      effect: "A criatura tocada recupera pontos de vida.",
      tags: ["cura", "suporte"],
    }),
    spell("spell-healing-word", "Palavra Curativa", 1, "Evocação", ["Bardo", "Clérigo", "Druida"], {
      castingTime: "1 ação bônus",
      range: "18 m",
      components: "V",
      duration: "Instantânea",
      healing: "1d4",
      upcast: "1d4",
      effect: "Uma palavra restauradora recupera pontos de vida de uma criatura.",
      tags: ["cura", "ação bônus"],
    }),
    spell("spell-bless", "Benção", 1, "Encantamento", ["Clérigo", "Paladino"], {
      castingTime: "1 ação",
      range: "9 m",
      components: "V, S, M",
      duration: "Concentração, até 1 minuto",
      concentration: true,
      effect: "Aliados escolhidos recebem um bônus em ataques e testes de resistência.",
      tags: ["suporte", "concentração"],
    }),
    spell("spell-detect-magic", "Detectar Magia", 1, "Adivinhação", ["Bardo", "Clérigo", "Druida", "Feiticeiro", "Mago", "Paladino", "Patrulheiro"], {
      castingTime: "1 ação",
      range: "Pessoal",
      components: "V, S",
      duration: "Concentração, até 10 minutos",
      concentration: true,
      ritual: true,
      effect: "Você percebe a presença de magia e pode identificar escolas próximas.",
      tags: ["ritual", "exploração"],
    }),
    spell("spell-identify", "Identificar", 1, "Adivinhação", ["Bardo", "Mago"], {
      castingTime: "1 minuto",
      range: "Toque",
      components: "V, S, M",
      duration: "Instantânea",
      ritual: true,
      effect: "Revela propriedades mágicas de um item, magia ativa ou criatura tocada.",
      tags: ["ritual", "exploração"],
    }),
    spell("spell-sleep", "Sono", 1, "Encantamento", ["Bardo", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "27 m",
      components: "V, S, M",
      duration: "1 minuto",
      effect: "Criaturas em uma área podem cair inconscientes conforme seus pontos de vida.",
      tags: ["controle", "área"],
    }),
    spell("spell-thunderwave", "Onda Trovejante", 1, "Evocação", ["Bardo", "Druida", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "Pessoal",
      components: "V, S",
      duration: "Instantânea",
      save: "Constituição",
      damage: "2d8",
      damageType: "trovejante",
      upcast: "1d8",
      effect: "Uma onda sonora empurra criaturas e causa dano em uma área próxima.",
      tags: ["dano", "área"],
    }),
    spell("spell-guiding-bolt", "Raio Guiador", 1, "Evocação", ["Clérigo"], {
      castingTime: "1 ação",
      range: "36 m",
      components: "V, S",
      duration: "1 rodada",
      attack: "Ataque mágico à distância",
      damage: "4d6",
      damageType: "radiante",
      upcast: "1d6",
      effect: "O alvo atingido brilha, dando vantagem ao próximo ataque contra ele.",
      tags: ["dano", "buff"],
    }),
    spell("spell-charm-person", "Enfeitiçar Pessoa", 1, "Encantamento", ["Bardo", "Bruxo", "Druida", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "9 m",
      components: "V, S",
      duration: "1 hora",
      save: "Sabedoria",
      effect: "Um humanoide pode ficar amigável com você por um tempo.",
      tags: ["social", "controle"],
    }),
    spell("spell-misty-step", "Passo Nebuloso", 2, "Conjuração", ["Bruxo", "Feiticeiro", "Mago"], {
      castingTime: "1 ação bônus",
      range: "Pessoal",
      components: "V",
      duration: "Instantânea",
      effect: "Você se teleporta para um espaço desocupado que possa ver.",
      tags: ["mobilidade", "ação bônus"],
    }),
    spell("spell-invisibility", "Invisibilidade", 2, "Ilusão", ["Bardo", "Bruxo", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "Toque",
      components: "V, S, M",
      duration: "Concentração, até 1 hora",
      concentration: true,
      effect: "Uma criatura tocada fica invisível até atacar, conjurar ou a magia terminar.",
      tags: ["furtividade", "concentração"],
    }),
    spell("spell-suggestion", "Sugestão", 2, "Encantamento", ["Bardo", "Bruxo", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "9 m",
      components: "V, M",
      duration: "Concentração, até 8 horas",
      concentration: true,
      save: "Sabedoria",
      effect: "Uma criatura pode seguir uma sugestão razoável formulada por você.",
      tags: ["social", "controle"],
    }),
    spell("spell-web", "Teia", 2, "Conjuração", ["Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "18 m",
      components: "V, S, M",
      duration: "Concentração, até 1 hora",
      concentration: true,
      save: "Destreza",
      effect: "Teias espessas tornam uma área difícil e podem restringir criaturas.",
      tags: ["controle", "área"],
    }),
    spell("spell-hold-person", "Imobilizar Pessoa", 2, "Encantamento", ["Bardo", "Clérigo", "Druida", "Feiticeiro", "Mago", "Bruxo"], {
      castingTime: "1 ação",
      range: "18 m",
      components: "V, S, M",
      duration: "Concentração, até 1 minuto",
      concentration: true,
      save: "Sabedoria",
      effect: "Um humanoide pode ficar paralisado e repetir o teste ao fim dos turnos.",
      tags: ["controle", "concentração"],
    }),
    spell("spell-lesser-restoration", "Restauração Menor", 2, "Abjuração", ["Bardo", "Clérigo", "Druida", "Paladino", "Patrulheiro"], {
      castingTime: "1 ação",
      range: "Toque",
      components: "V, S",
      duration: "Instantânea",
      effect: "Remove uma condição ou doença comum de uma criatura tocada.",
      tags: ["cura", "suporte"],
    }),
    spell("spell-spiritual-weapon", "Arma Espiritual", 2, "Evocação", ["Clérigo"], {
      castingTime: "1 ação bônus",
      range: "18 m",
      components: "V, S",
      duration: "1 minuto",
      attack: "Ataque mágico corpo a corpo",
      damage: "1d8",
      damageType: "energia",
      upcast: "1d8/2",
      effect: "Cria uma arma mágica flutuante que pode atacar com sua ação bônus.",
      tags: ["dano", "ação bônus"],
    }),
    spell("spell-mirror-image", "Imagem Espelhada", 2, "Ilusão", ["Bruxo", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "Pessoal",
      components: "V, S",
      duration: "1 minuto",
      effect: "Duplicatas ilusórias dificultam que ataques atinjam você.",
      tags: ["defesa", "ilusão"],
    }),
    spell("spell-fireball", "Bola de Fogo", 3, "Evocação", ["Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "45 m",
      components: "V, S, M",
      duration: "Instantânea",
      save: "Destreza",
      damage: "8d6",
      damageType: "fogo",
      upcast: "1d6",
      effect: "Uma explosão flamejante atinge criaturas em uma grande área.",
      tags: ["dano", "área"],
    }),
    spell("spell-counterspell", "Contramágica", 3, "Abjuração", ["Bruxo", "Feiticeiro", "Mago"], {
      castingTime: "1 reação",
      range: "18 m",
      components: "S",
      duration: "Instantânea",
      effect: "Interrompe uma magia sendo conjurada, com teste quando necessário.",
      tags: ["reação", "controle"],
    }),
    spell("spell-dispel-magic", "Dissipar Magia", 3, "Abjuração", ["Bardo", "Clérigo", "Druida", "Feiticeiro", "Mago", "Bruxo", "Paladino"], {
      castingTime: "1 ação",
      range: "36 m",
      components: "V, S",
      duration: "Instantânea",
      effect: "Encerra efeitos mágicos em uma criatura, objeto ou área.",
      tags: ["utilidade", "controle"],
    }),
    spell("spell-hypnotic-pattern", "Padrão Hipnótico", 3, "Ilusão", ["Bardo", "Bruxo", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "36 m",
      components: "S, M",
      duration: "Concentração, até 1 minuto",
      concentration: true,
      save: "Sabedoria",
      effect: "Um padrão luminoso pode incapacitar criaturas em uma área.",
      tags: ["controle", "área"],
    }),
    spell("spell-revivify", "Revivificar", 3, "Necromancia", ["Clérigo", "Paladino"], {
      castingTime: "1 ação",
      range: "Toque",
      components: "V, S, M",
      duration: "Instantânea",
      effect: "Traz de volta uma criatura morta recentemente, se as condições forem atendidas.",
      tags: ["cura", "suporte"],
    }),
    spell("spell-lightning-bolt", "Relâmpago", 3, "Evocação", ["Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "Pessoal",
      components: "V, S, M",
      duration: "Instantânea",
      save: "Destreza",
      damage: "8d6",
      damageType: "elétrico",
      upcast: "1d6",
      effect: "Uma linha de eletricidade atravessa criaturas no caminho.",
      tags: ["dano", "área"],
    }),
    spell("spell-haste", "Velocidade", 3, "Transmutação", ["Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "9 m",
      components: "V, S, M",
      duration: "Concentração, até 1 minuto",
      concentration: true,
      effect: "Acelera uma criatura, melhorando movimento, defesa e ação limitada.",
      tags: ["buff", "concentração"],
    }),
    spell("spell-slow", "Lentidão", 3, "Transmutação", ["Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "36 m",
      components: "V, S, M",
      duration: "Concentração, até 1 minuto",
      concentration: true,
      save: "Sabedoria",
      effect: "Criaturas em uma área ficam debilitadas e com ações limitadas.",
      tags: ["debuff", "área"],
    }),
    spell("spell-spirit-guardians", "Espíritos Guardiões", 3, "Conjuração", ["Clérigo"], {
      castingTime: "1 ação",
      range: "Pessoal",
      components: "V, S, M",
      duration: "Concentração, até 10 minutos",
      concentration: true,
      save: "Sabedoria",
      damage: "3d8",
      damageType: "radiante/necrótico",
      upcast: "1d8",
      effect: "Espíritos reduzem o movimento e ferem inimigos ao seu redor.",
      tags: ["dano", "área", "concentração"],
    }),
    spell("spell-banishment", "Banimento", 4, "Abjuração", ["Clérigo", "Feiticeiro", "Bruxo", "Mago", "Paladino"], {
      castingTime: "1 ação",
      range: "18 m",
      components: "V, S, M",
      duration: "Concentração, até 1 minuto",
      concentration: true,
      save: "Carisma",
      effect: "Uma criatura pode ser enviada temporariamente a outro plano.",
      tags: ["controle", "concentração"],
    }),
    spell("spell-dimension-door", "Porta Dimensional", 4, "Conjuração", ["Bardo", "Bruxo", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "150 m",
      components: "V",
      duration: "Instantânea",
      effect: "Você se teleporta com um aliado para um destino descrito ou visto.",
      tags: ["mobilidade", "utilidade"],
    }),
    spell("spell-greater-invisibility", "Invisibilidade Maior", 4, "Ilusão", ["Bardo", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "Toque",
      components: "V, S",
      duration: "Concentração, até 1 minuto",
      concentration: true,
      effect: "Uma criatura permanece invisível mesmo atacando ou conjurando.",
      tags: ["buff", "furtividade"],
    }),
    spell("spell-polymorph", "Polimorfia", 4, "Transmutação", ["Bardo", "Druida", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "18 m",
      components: "V, S, M",
      duration: "Concentração, até 1 hora",
      concentration: true,
      save: "Sabedoria",
      effect: "Transforma uma criatura em uma besta, alterando suas estatísticas.",
      tags: ["controle", "buff"],
    }),
    spell("spell-wall-of-fire", "Muralha de Fogo", 4, "Evocação", ["Druida", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "36 m",
      components: "V, S, M",
      duration: "Concentração, até 1 minuto",
      concentration: true,
      save: "Destreza",
      damage: "5d8",
      damageType: "fogo",
      upcast: "1d8",
      effect: "Cria uma parede flamejante que bloqueia e queima uma região.",
      tags: ["dano", "área"],
    }),
    spell("spell-cone-of-cold", "Cone de Frio", 5, "Evocação", ["Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "Pessoal",
      components: "V, S, M",
      duration: "Instantânea",
      save: "Constituição",
      damage: "8d8",
      damageType: "frio",
      upcast: "1d8",
      effect: "Uma rajada gelada atinge criaturas em cone.",
      tags: ["dano", "área"],
    }),
    spell("spell-hold-monster", "Imobilizar Monstro", 5, "Encantamento", ["Bardo", "Bruxo", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "27 m",
      components: "V, S, M",
      duration: "Concentração, até 1 minuto",
      concentration: true,
      save: "Sabedoria",
      effect: "Uma criatura pode ficar paralisada e repetir o teste ao fim dos turnos.",
      tags: ["controle", "concentração"],
    }),
    spell("spell-greater-restoration", "Restauração Maior", 5, "Abjuração", ["Bardo", "Clérigo", "Druida"], {
      castingTime: "1 ação",
      range: "Toque",
      components: "V, S, M",
      duration: "Instantânea",
      effect: "Remove efeitos severos como exaustão, maldições, encantamentos ou reduções.",
      tags: ["cura", "suporte"],
    }),
    spell("spell-wall-of-stone", "Muralha de Pedra", 5, "Evocação", ["Druida", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "36 m",
      components: "V, S, M",
      duration: "Concentração, até 10 minutos",
      concentration: true,
      effect: "Ergue painéis de pedra que podem bloquear, proteger ou dividir terreno.",
      tags: ["controle", "área"],
    }),
    spell("spell-disintegrate", "Desintegrar", 6, "Transmutação", ["Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "18 m",
      components: "V, S, M",
      duration: "Instantânea",
      save: "Destreza",
      damage: "10d6+40",
      damageType: "energia",
      upcast: "3d6",
      effect: "Um raio destrutivo causa dano pesado e pode reduzir o alvo a pó.",
      tags: ["dano", "teste"],
    }),
    spell("spell-heal", "Cura Completa", 6, "Evocação", ["Clérigo", "Druida"], {
      castingTime: "1 ação",
      range: "18 m",
      components: "V, S",
      duration: "Instantânea",
      healing: "70",
      upcast: "10",
      effect: "Restaura uma grande quantidade de pontos de vida e remove certas condições.",
      tags: ["cura", "suporte"],
    }),
    spell("spell-globe-of-invulnerability", "Globo de Invulnerabilidade", 6, "Abjuração", ["Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "Pessoal",
      components: "V, S, M",
      duration: "Concentração, até 1 minuto",
      concentration: true,
      effect: "Uma barreira impede magias de círculos baixos de afetarem quem está dentro.",
      tags: ["defesa", "concentração"],
    }),
    spell("spell-teleport", "Teleporte", 7, "Conjuração", ["Bardo", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "3 m",
      components: "V",
      duration: "Instantânea",
      effect: "Transporta você e outras criaturas para um destino conhecido.",
      tags: ["mobilidade", "utilidade"],
    }),
    spell("spell-resurrection", "Ressurreição", 7, "Necromancia", ["Bardo", "Clérigo"], {
      castingTime: "1 hora",
      range: "Toque",
      components: "V, S, M",
      duration: "Instantânea",
      effect: "Retorna uma criatura morta à vida, respeitando limites do ritual.",
      tags: ["cura", "ritual"],
    }),
    spell("spell-fire-storm", "Tempestade de Fogo", 7, "Evocação", ["Clérigo", "Druida", "Feiticeiro"], {
      castingTime: "1 ação",
      range: "45 m",
      components: "V, S",
      duration: "Instantânea",
      save: "Destreza",
      damage: "7d10",
      damageType: "fogo",
      effect: "Chamas varrem áreas escolhidas, incendiando e ferindo criaturas.",
      tags: ["dano", "área"],
    }),
    spell("spell-maze", "Labirinto", 8, "Conjuração", ["Mago"], {
      castingTime: "1 ação",
      range: "18 m",
      components: "V, S",
      duration: "Concentração, até 10 minutos",
      concentration: true,
      effect: "Uma criatura é aprisionada em um labirinto extradimensional.",
      tags: ["controle", "concentração"],
    }),
    spell("spell-sunburst", "Explosão Solar", 8, "Evocação", ["Druida", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "45 m",
      components: "V, S, M",
      duration: "Instantânea",
      save: "Constituição",
      damage: "12d6",
      damageType: "radiante",
      effect: "Luz intensa fere e pode cegar criaturas em uma ampla área.",
      tags: ["dano", "área"],
    }),
    spell("spell-dominate-monster", "Dominar Monstro", 8, "Encantamento", ["Bardo", "Bruxo", "Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "18 m",
      components: "V, S",
      duration: "Concentração, até 1 hora",
      concentration: true,
      save: "Sabedoria",
      effect: "Uma criatura pode ficar enfeitiçada e obedecer comandos.",
      tags: ["controle", "social"],
    }),
    spell("spell-meteor-swarm", "Chuva de Meteoros", 9, "Evocação", ["Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "1,5 km",
      components: "V, S",
      duration: "Instantânea",
      save: "Destreza",
      damage: "20d6+20d6",
      damageType: "fogo/contusão",
      effect: "Múltiplos meteoros devastam grandes áreas.",
      tags: ["dano", "área"],
    }),
    spell("spell-time-stop", "Parar o Tempo", 9, "Transmutação", ["Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "Pessoal",
      components: "V",
      duration: "Instantânea",
      effect: "Você age por instantes extras enquanto o tempo parece parar para os demais.",
      tags: ["utilidade", "controle"],
    }),
    spell("spell-mass-heal", "Cura em Massa", 9, "Evocação", ["Clérigo"], {
      castingTime: "1 ação",
      range: "18 m",
      components: "V, S",
      duration: "Instantânea",
      healing: "700",
      effect: "Distribui uma enorme quantidade de cura entre criaturas escolhidas.",
      tags: ["cura", "suporte"],
    }),
    spell("spell-wish", "Desejo", 9, "Conjuração", ["Feiticeiro", "Mago"], {
      castingTime: "1 ação",
      range: "Pessoal",
      components: "V",
      duration: "Instantânea",
      effect: "Reproduz magias poderosas ou tenta alterar a realidade, com riscos definidos pelo mestre.",
      tags: ["utilidade", "especial"],
    }),
  ];

  const ui = {
    tab: "biblioteca",
    search: "",
    filters: {
      level: "all",
      className: "all",
      school: "all",
      tag: "all",
    },
    modal: null,
    notice: "",
  };

  let state = loadState();
  const root = document.querySelector("#app");

  render();

  document.addEventListener("click", onClick);
  document.addEventListener("input", onInput);
  document.addEventListener("change", onChange);
  document.addEventListener("submit", (event) => event.preventDefault());
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && ui.modal) {
      ui.modal = null;
      render();
    }
  });

  function spell(id, name, level, school, classes, extra) {
    return {
      id,
      name,
      level,
      school,
      classes,
      castingTime: "1 ação",
      range: "Pessoal",
      components: "V, S",
      duration: "Instantânea",
      concentration: false,
      ritual: false,
      attack: "",
      save: "",
      damage: "",
      healing: "",
      damageType: "",
      upcast: "",
      effect: "",
      tags: [],
      source: "SRD inicial",
      ...extra,
    };
  }

  function createDefaultState() {
    const character = createCharacter("Elora das Cinzas", "Jogador 1", "Mago", "full");
    character.level = 5;
    character.spellAbility = "Inteligência";
    character.spellSaveDc = 15;
    character.spellAttackBonus = 7;
    character.knownSpellIds = [
      "spell-light",
      "spell-mage-hand",
      "spell-prestidigitation",
      "spell-fire-bolt",
      "spell-mage-armor",
      "spell-shield",
      "spell-magic-missile",
      "spell-detect-magic",
      "spell-identify",
      "spell-misty-step",
      "spell-invisibility",
      "spell-web",
      "spell-fireball",
      "spell-counterspell",
      "spell-haste",
    ];
    character.preparedSpellIds = [
      "spell-mage-armor",
      "spell-shield",
      "spell-magic-missile",
      "spell-detect-magic",
      "spell-misty-step",
      "spell-web",
      "spell-fireball",
      "spell-counterspell",
    ];
    character.slots = slotsFromArray(FULL_CASTER_SLOTS[5]);

    return {
      version: 1,
      settings: {
        title: "Grimório Arcano",
        subtitle: "Mesa local",
        theme: "verdant",
        sigil: "✦",
      },
      activeCharacterId: character.id,
      characters: [character],
      spells: DEFAULT_SPELLS,
      log: [
        {
          id: uid("log"),
          at: new Date().toISOString(),
          text: "Grimório criado.",
        },
      ],
    };
  }

  function createCharacter(name = "Novo conjurador", player = "", className = "Mago", casterType = "full") {
    return {
      id: uid("char"),
      name,
      player,
      className,
      level: 1,
      casterType,
      spellAbility: "Inteligência",
      spellSaveDc: 13,
      spellAttackBonus: 5,
      knownSpellIds: [],
      preparedSpellIds: [],
      slots: slotsFromArray(FULL_CASTER_SLOTS[1]),
      concentration: null,
      effects: [],
      notes: "",
    };
  }

  function slotsFromArray(values = []) {
    const slots = {};
    for (let level = 1; level <= 9; level += 1) {
      slots[level] = {
        max: Number(values[level - 1] || 0),
        used: 0,
      };
    }
    return slots;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createDefaultState();
      return normalizeState(JSON.parse(raw));
    } catch (error) {
      console.warn(error);
      return createDefaultState();
    }
  }

  function normalizeState(nextState) {
    const fallback = createDefaultState();
    const normalized = {
      ...fallback,
      ...nextState,
      settings: { ...fallback.settings, ...(nextState.settings || {}) },
      spells: Array.isArray(nextState.spells) && nextState.spells.length ? nextState.spells : fallback.spells,
      characters:
        Array.isArray(nextState.characters) && nextState.characters.length
          ? nextState.characters
          : fallback.characters,
      log: Array.isArray(nextState.log) ? nextState.log : [],
    };
    normalized.characters = normalized.characters.map((character) => ({
      ...createCharacter(),
      ...character,
      slots: normalizeSlots(character.slots),
      knownSpellIds: unique(character.knownSpellIds || []),
      preparedSpellIds: unique(character.preparedSpellIds || []),
      effects: Array.isArray(character.effects) ? character.effects : [],
    }));
    if (!normalized.characters.some((character) => character.id === normalized.activeCharacterId)) {
      normalized.activeCharacterId = normalized.characters[0].id;
    }
    normalized.spells = normalized.spells.map(normalizeSpell);
    return normalized;
  }

  function normalizeSlots(slots) {
    const normalized = slotsFromArray([]);
    for (let level = 1; level <= 9; level += 1) {
      normalized[level] = {
        max: clamp(Number(slots?.[level]?.max || 0), 0, 99),
        used: clamp(Number(slots?.[level]?.used || 0), 0, 99),
      };
      normalized[level].used = Math.min(normalized[level].used, normalized[level].max);
    }
    return normalized;
  }

  function normalizeSpell(rawSpell) {
    const normalized = {
      ...spell(uid("spell"), "Magia sem nome", 0, "Evocação", [], {}),
      ...rawSpell,
      id: rawSpell.id || uid("spell"),
      level: clamp(Number(rawSpell.level || 0), 0, 9),
      classes: asList(rawSpell.classes),
      tags: asList(rawSpell.tags),
      concentration: Boolean(rawSpell.concentration),
      ritual: Boolean(rawSpell.ritual),
    };
    return normalized;
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function render() {
    const activeElement = document.activeElement;
    const activeId = activeElement?.id || "";
    const selectionStart = typeof activeElement?.selectionStart === "number" ? activeElement.selectionStart : null;
    const character = getActiveCharacter();
    const theme = THEMES[state.settings.theme] || THEMES.verdant;

    root.innerHTML = `
      <div class="app-shell" style="${cssVars(theme)}">
        <aside class="sidebar">
          ${renderSidebar(character)}
        </aside>
        <main class="main-panel">
          ${renderTopbar(character)}
          ${renderCharacterPanel(character)}
          ${renderTabs()}
          <section class="content-page">
            ${renderCurrentTab(character)}
          </section>
        </main>
      </div>
      ${ui.modal ? renderModal(character) : ""}
    `;

    if (activeId) {
      const nextActive = document.getElementById(activeId);
      if (nextActive) {
        nextActive.focus();
        if (selectionStart !== null && typeof nextActive.setSelectionRange === "function") {
          nextActive.setSelectionRange(selectionStart, selectionStart);
        }
      }
    }
  }

  function renderSidebar(character) {
    const prepared = character.preparedSpellIds.length;
    const known = character.knownSpellIds.length;
    const activeTheme = THEMES[state.settings.theme] || THEMES.verdant;

    return `
      <div class="brand">
        <div class="sigil" aria-hidden="true">${escapeHtml(state.settings.sigil || "✦")}</div>
        <div>
          <h1>${escapeHtml(state.settings.title || "Grimório Arcano")}</h1>
          <p>${escapeHtml(state.settings.subtitle || "Mesa local")}</p>
        </div>
      </div>

      <div class="book-cover" aria-hidden="true">
        <img src="assets/grimoire-bg.png" alt="" />
        <div class="cover-plate">
          <span>${escapeHtml(state.settings.sigil || "✦")}</span>
        </div>
      </div>

      <div class="sidebar-stats">
        <div><strong>${state.spells.length}</strong><span>magias</span></div>
        <div><strong>${known}</strong><span>no grimório</span></div>
        <div><strong>${prepared}</strong><span>preparadas</span></div>
      </div>

      <section class="sidebar-section">
        <div class="section-title">
          <span>Personagens</span>
          <button class="icon-button" data-action="add-character" title="Adicionar personagem">+</button>
        </div>
        <div class="character-list">
          ${state.characters
            .map(
              (item) => `
                <button class="character-pill ${item.id === character.id ? "active" : ""}" data-action="select-character" data-id="${item.id}">
                  <span>${escapeHtml(item.name)}</span>
                  <small>${escapeHtml(item.className)} ${escapeHtml(String(item.level))}</small>
                </button>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="sidebar-section">
        <div class="section-title"><span>Tema</span><small>${escapeHtml(activeTheme.name)}</small></div>
        <div class="theme-swatches">
          ${Object.entries(THEMES)
            .map(
              ([key, item]) => `
                <button class="swatch ${key === state.settings.theme ? "active" : ""}" style="--swatch:${item.cover};--swatch-accent:${item.accentStrong}" data-action="set-theme" data-id="${key}" title="${escapeHtml(item.name)}"></button>
              `,
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function renderTopbar(character) {
    return `
      <header class="topbar">
        <div>
          <p class="eyebrow">${escapeHtml(character.player || "Jogador")}</p>
          <h2>${escapeHtml(character.name)}</h2>
        </div>
        <div class="topbar-actions">
          <button class="ghost-button" data-action="long-rest">Descanso longo</button>
          <button class="ghost-button" data-action="short-rest">Descanso curto</button>
          <button class="primary-button" data-action="open-spell-editor">Nova magia</button>
        </div>
      </header>
      ${ui.notice ? `<div class="notice">${escapeHtml(ui.notice)}</div>` : ""}
    `;
  }

  function renderCharacterPanel(character) {
    return `
      <section class="character-panel">
        <div class="field-grid">
          ${inputField("Nome", "char-name", character.name, "name")}
          ${inputField("Jogador", "char-player", character.player, "player")}
          <label class="field">
            <span>Classe</span>
            <select id="char-class" data-character-field="className">
              ${CLASSES.map((name) => option(name, character.className)).join("")}
            </select>
          </label>
          <label class="field compact">
            <span>Nível</span>
            <input id="char-level" type="number" min="1" max="20" value="${escapeHtml(String(character.level))}" data-character-field="level" />
          </label>
          <label class="field">
            <span>Progressão</span>
            <select id="char-caster-type" data-character-field="casterType">
              ${CASTER_TYPES.map(([value, label]) => `<option value="${value}" ${value === character.casterType ? "selected" : ""}>${label}</option>`).join("")}
            </select>
          </label>
          <label class="field">
            <span>Atributo</span>
            <select id="char-ability" data-character-field="spellAbility">
              ${ABILITIES.map((name) => option(name, character.spellAbility)).join("")}
            </select>
          </label>
          <label class="field compact">
            <span>CD</span>
            <input id="char-dc" type="number" min="1" max="40" value="${escapeHtml(String(character.spellSaveDc))}" data-character-field="spellSaveDc" />
          </label>
          <label class="field compact">
            <span>Ataque</span>
            <input id="char-attack" type="number" min="-10" max="40" value="${escapeHtml(String(character.spellAttackBonus))}" data-character-field="spellAttackBonus" />
          </label>
        </div>

        <div class="slot-panel">
          <div class="section-title">
            <span>Espaços de magia</span>
            <button class="small-button" data-action="auto-slots">Calcular</button>
          </div>
          <div class="slot-grid">
            ${Array.from({ length: 9 }, (_, index) => renderSlot(character, index + 1)).join("")}
          </div>
        </div>

        <div class="concentration-panel ${character.concentration ? "active" : ""}">
          <div class="section-title">
            <span>Concentração</span>
            ${character.concentration ? `<button class="small-button danger" data-action="end-concentration">Encerrar</button>` : ""}
          </div>
          ${
            character.concentration
              ? `<strong>${escapeHtml(character.concentration.spellName)}</strong><small>${escapeHtml(character.concentration.startedAt)}</small>`
              : `<span class="muted">Nenhuma magia em concentração.</span>`
          }
        </div>
      </section>
    `;
  }

  function renderSlot(character, level) {
    const slot = character.slots[level] || { max: 0, used: 0 };
    const remaining = Math.max(0, slot.max - slot.used);
    return `
      <div class="slot-card ${remaining > 0 ? "ready" : ""}">
        <div class="slot-head">
          <strong>${level}</strong>
          <span>${remaining}/${slot.max}</span>
        </div>
        <div class="stepper">
          <button data-action="slot-used-down" data-level="${level}" title="Restaurar espaço">-</button>
          <input id="slot-${level}-used" type="number" min="0" max="${slot.max}" value="${slot.used}" data-slot-used="${level}" />
          <button data-action="slot-used-up" data-level="${level}" title="Gastar espaço">+</button>
        </div>
        <div class="stepper max-stepper">
          <button data-action="slot-max-down" data-level="${level}" title="Reduzir máximo">-</button>
          <input id="slot-${level}-max" type="number" min="0" max="99" value="${slot.max}" data-slot-max="${level}" />
          <button data-action="slot-max-up" data-level="${level}" title="Aumentar máximo">+</button>
        </div>
      </div>
    `;
  }

  function renderTabs() {
    const tabs = [
      ["biblioteca", "Biblioteca"],
      ["grimorio", "Grimório"],
      ["preparadas", "Preparadas"],
      ["efeitos", "Efeitos"],
      ["dados", "Dados"],
    ];
    return `
      <nav class="tabs">
        ${tabs
          .map(
            ([id, label]) => `
              <button class="${ui.tab === id ? "active" : ""}" data-action="set-tab" data-id="${id}">${label}</button>
            `,
          )
          .join("")}
      </nav>
    `;
  }

  function renderCurrentTab(character) {
    if (ui.tab === "grimorio") {
      return renderSpellBrowser(character, "known");
    }
    if (ui.tab === "preparadas") {
      return renderSpellBrowser(character, "prepared");
    }
    if (ui.tab === "efeitos") {
      return renderEffects(character);
    }
    if (ui.tab === "dados") {
      return renderDataTab(character);
    }
    return renderSpellBrowser(character, "library");
  }

  function renderSpellBrowser(character, mode) {
    const spells = getFilteredSpells(character, mode);
    return `
      <div class="browser-toolbar">
        <label class="search-field">
          <span>Busca</span>
          <input id="spell-search" type="search" placeholder="Nome, efeito, dano..." value="${escapeHtml(ui.search)}" />
        </label>
        <label class="field small-select">
          <span>Círculo</span>
          <select id="filter-level">
            <option value="all">Todos</option>
            ${LEVEL_LABELS.map((label, index) => `<option value="${index}" ${String(index) === ui.filters.level ? "selected" : ""}>${label}</option>`).join("")}
          </select>
        </label>
        <label class="field small-select">
          <span>Classe</span>
          <select id="filter-class">
            <option value="all">Todas</option>
            ${CLASSES.map((name) => option(name, ui.filters.className)).join("")}
          </select>
        </label>
        <label class="field small-select">
          <span>Escola</span>
          <select id="filter-school">
            <option value="all">Todas</option>
            ${SCHOOLS.map((name) => option(name, ui.filters.school)).join("")}
          </select>
        </label>
      </div>
      <div class="spell-grid">
        ${spells.length ? spells.map((item) => renderSpellCard(item, character)).join("") : renderEmptyState(mode)}
      </div>
    `;
  }

  function renderSpellCard(spellItem, character) {
    const known = character.knownSpellIds.includes(spellItem.id);
    const prepared = character.preparedSpellIds.includes(spellItem.id);
    const canCast = spellItem.level === 0 || known;
    const detailLine = [
      spellItem.castingTime,
      spellItem.range,
      spellItem.duration,
      spellItem.concentration ? "Concentração" : "",
      spellItem.ritual ? "Ritual" : "",
    ]
      .filter(Boolean)
      .join(" · ");
    const roll = spellItem.damage || spellItem.healing;
    return `
      <article class="spell-card">
        <div class="spell-card-head">
          <div>
            <span class="level-badge">${escapeHtml(LEVEL_LABELS[spellItem.level])}</span>
            <h3>${escapeHtml(spellItem.name)}</h3>
          </div>
          <button class="icon-button" data-action="edit-spell" data-id="${spellItem.id}" title="Editar magia">✎</button>
        </div>
        <div class="spell-meta">
          <span>${escapeHtml(spellItem.school)}</span>
          <span>${escapeHtml(spellItem.components)}</span>
        </div>
        <p class="spell-detail">${escapeHtml(detailLine)}</p>
        <p>${escapeHtml(spellItem.effect || "Sem descrição.")}</p>
        <div class="spell-tags">
          ${spellItem.attack ? `<span>${escapeHtml(spellItem.attack)}</span>` : ""}
          ${spellItem.save ? `<span>Teste: ${escapeHtml(spellItem.save)}</span>` : ""}
          ${spellItem.damage ? `<span>${escapeHtml(spellItem.damage)} ${escapeHtml(spellItem.damageType)}</span>` : ""}
          ${spellItem.healing ? `<span>Cura ${escapeHtml(spellItem.healing)}</span>` : ""}
          ${spellItem.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="spell-classes">${escapeHtml(spellItem.classes.join(", ") || "Todas / manual")}</div>
        <div class="spell-actions">
          ${
            known
              ? `<button class="small-button" data-action="forget-spell" data-id="${spellItem.id}">Esquecer</button>`
              : `<button class="small-button" data-action="learn-spell" data-id="${spellItem.id}">Aprender</button>`
          }
          ${
            known
              ? prepared
                ? `<button class="small-button" data-action="unprepare-spell" data-id="${spellItem.id}">Despreparar</button>`
                : `<button class="small-button" data-action="prepare-spell" data-id="${spellItem.id}">Preparar</button>`
              : ""
          }
          ${canCast ? `<button class="primary-button compact-button" data-action="cast-spell" data-id="${spellItem.id}">Conjurar</button>` : ""}
          ${roll ? `<button class="small-button" data-action="roll-spell" data-id="${spellItem.id}">Rolar</button>` : ""}
        </div>
      </article>
    `;
  }

  function renderEffects(character) {
    return `
      <div class="effects-layout">
        <section class="panel-block">
          <div class="section-title"><span>Efeitos ativos</span></div>
          <div class="effect-form">
            <input id="effect-name" type="text" placeholder="Nome do efeito" />
            <input id="effect-duration" type="text" placeholder="Duração" />
            <input id="effect-note" type="text" placeholder="Notas" />
            <button class="primary-button" data-action="add-effect">Adicionar</button>
          </div>
          <div class="effect-list">
            ${
              character.effects.length
                ? character.effects.map(renderEffect).join("")
                : `<div class="empty-state">Nenhum efeito ativo.</div>`
            }
          </div>
        </section>
        <section class="panel-block">
          <div class="section-title">
            <span>Registro</span>
            <button class="small-button" data-action="clear-log">Limpar</button>
          </div>
          <div class="log-list">
            ${
              state.log.length
                ? state.log
                    .slice()
                    .reverse()
                    .slice(0, 30)
                    .map((item) => `<div class="log-entry"><span>${escapeHtml(formatTime(item.at))}</span><p>${escapeHtml(item.text)}</p></div>`)
                    .join("")
                : `<div class="empty-state">Sem registros.</div>`
            }
          </div>
        </section>
      </div>
    `;
  }

  function renderEffect(effect) {
    const duration = [effect.duration, effect.remaining ? `${effect.remaining} rodadas` : ""].filter(Boolean).join(" · ");
    return `
      <article class="effect-card ${effect.concentration ? "concentration" : ""}">
        <div>
          <strong>${escapeHtml(effect.name)}</strong>
          <small>${escapeHtml(duration || "Duração livre")}</small>
          ${effect.note ? `<p>${escapeHtml(effect.note)}</p>` : ""}
        </div>
        <div class="effect-actions">
          ${effect.remaining ? `<button class="icon-button" data-action="tick-effect" data-id="${effect.id}" title="Passar rodada">-1</button>` : ""}
          <button class="icon-button danger" data-action="remove-effect" data-id="${effect.id}" title="Remover">×</button>
        </div>
      </article>
    `;
  }

  function renderDataTab(character) {
    return `
      <div class="data-layout">
        <section class="panel-block">
          <div class="section-title"><span>Livro</span></div>
          <div class="field-grid two">
            ${settingsField("Título", "setting-title", "title", state.settings.title)}
            ${settingsField("Subtítulo", "setting-subtitle", "subtitle", state.settings.subtitle)}
            ${settingsField("Selo", "setting-sigil", "sigil", state.settings.sigil)}
            <label class="field">
              <span>Tema</span>
              <select id="setting-theme" data-setting-field="theme">
                ${Object.entries(THEMES).map(([key, item]) => `<option value="${key}" ${key === state.settings.theme ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}
              </select>
            </label>
          </div>
        </section>

        <section class="panel-block">
          <div class="section-title">
            <span>Anotações de ${escapeHtml(character.name)}</span>
          </div>
          <textarea id="char-notes" class="notes-area" data-character-field="notes">${escapeHtml(character.notes || "")}</textarea>
        </section>

        <section class="panel-block">
          <div class="section-title"><span>Backup</span></div>
          <div class="button-row">
            <button class="primary-button" data-action="export-backup">Exportar JSON</button>
            <button class="ghost-button" data-action="trigger-import">Importar JSON</button>
            <button class="ghost-button danger" data-action="reset-app">Reiniciar demo</button>
            <input id="import-file" type="file" accept="application/json,.json" hidden />
          </div>
          <p class="legal-note">Conteúdo inicial inspirado no SRD aberto sob CC BY 4.0. O importador aceita backups do Grimório e JSONs próprios, inclusive formatos compatíveis com 5e.tools. Use apenas conteúdo que o grupo tenha direito de usar.</p>
        </section>
      </div>
    `;
  }

  function renderModal(character) {
    if (ui.modal.type === "cast") {
      return renderCastModal(character, getSpell(ui.modal.spellId));
    }
    if (ui.modal.type === "spell-editor") {
      return renderSpellEditor(ui.modal.spellId ? getSpell(ui.modal.spellId) : null);
    }
    return "";
  }

  function renderCastModal(character, spellItem) {
    if (!spellItem) return "";
    const availableSlots = Object.entries(character.slots)
      .map(([level, slot]) => ({ level: Number(level), ...slot }))
      .filter((slot) => slot.level >= spellItem.level && slot.max - slot.used > 0);
    const isCantrip = spellItem.level === 0;
    const formula = spellItem.damage || spellItem.healing || "";
    return `
      <div class="modal-backdrop" data-action="close-modal">
        <section class="modal" role="dialog" aria-modal="true" aria-labelledby="cast-title" data-modal-stop>
          <div class="modal-head">
            <div>
              <span class="level-badge">${escapeHtml(LEVEL_LABELS[spellItem.level])}</span>
              <h2 id="cast-title">${escapeHtml(spellItem.name)}</h2>
            </div>
            <button class="icon-button" data-action="close-modal" title="Fechar">×</button>
          </div>
          <div class="cast-summary">
            <p>${escapeHtml(spellItem.effect || "")}</p>
            <div class="spell-tags">
              ${spellItem.attack ? `<span>Ataque +${escapeHtml(String(character.spellAttackBonus))}</span>` : ""}
              ${spellItem.save ? `<span>CD ${escapeHtml(String(character.spellSaveDc))} · ${escapeHtml(spellItem.save)}</span>` : ""}
              ${formula ? `<span>${escapeHtml(formula)}${spellItem.upcast ? ` · escala ${escapeHtml(spellItem.upcast)}` : ""}</span>` : ""}
              ${spellItem.concentration ? `<span>Concentração</span>` : ""}
              ${spellItem.ritual ? `<span>Ritual</span>` : ""}
            </div>
          </div>
          <div class="cast-options">
            ${
              isCantrip
                ? `<button class="primary-button" data-action="confirm-cast" data-id="${spellItem.id}" data-level="0">Conjurar truque</button>`
                : availableSlots.length
                  ? availableSlots
                      .map(
                        (slot) => `
                          <button class="slot-cast-button" data-action="confirm-cast" data-id="${spellItem.id}" data-level="${slot.level}">
                            <strong>${slot.level}º</strong><span>${slot.max - slot.used}/${slot.max}</span>
                          </button>
                        `,
                      )
                      .join("")
                  : `<div class="empty-state">Sem espaços disponíveis para esta magia.</div>`
            }
            ${
              spellItem.ritual
                ? `<button class="ghost-button" data-action="confirm-cast" data-id="${spellItem.id}" data-level="ritual">Conjurar ritual</button>`
                : `<button class="ghost-button" data-action="confirm-cast" data-id="${spellItem.id}" data-level="free">Registrar sem gastar</button>`
            }
          </div>
        </section>
      </div>
    `;
  }

  function renderSpellEditor(spellItem) {
    const item = spellItem || spell("", "", 1, "Evocação", [], { source: "Manual" });
    return `
      <div class="modal-backdrop" data-action="close-modal">
        <section class="modal wide" role="dialog" aria-modal="true" aria-labelledby="spell-editor-title" data-modal-stop>
          <div class="modal-head">
            <h2 id="spell-editor-title">${spellItem ? "Editar magia" : "Nova magia"}</h2>
            <button class="icon-button" data-action="close-modal" title="Fechar">×</button>
          </div>
          <form class="spell-editor">
            <input id="edit-spell-id" type="hidden" value="${escapeHtml(item.id)}" />
            <div class="field-grid two">
              ${editorInput("Nome", "edit-name", item.name)}
              <label class="field">
                <span>Círculo</span>
                <select id="edit-level">
                  ${LEVEL_LABELS.map((label, index) => `<option value="${index}" ${index === item.level ? "selected" : ""}>${label}</option>`).join("")}
                </select>
              </label>
              <label class="field">
                <span>Escola</span>
                <select id="edit-school">
                  ${SCHOOLS.map((name) => option(name, item.school)).join("")}
                </select>
              </label>
              ${editorInput("Classes", "edit-classes", item.classes.join(", "))}
              ${editorInput("Tempo", "edit-casting", item.castingTime)}
              ${editorInput("Alcance", "edit-range", item.range)}
              ${editorInput("Componentes", "edit-components", item.components)}
              ${editorInput("Duração", "edit-duration", item.duration)}
              ${editorInput("Ataque", "edit-attack", item.attack)}
              ${editorInput("Teste", "edit-save", item.save)}
              ${editorInput("Dano", "edit-damage", item.damage)}
              ${editorInput("Cura", "edit-healing", item.healing)}
              ${editorInput("Tipo de dano", "edit-damage-type", item.damageType)}
              ${editorInput("Escala", "edit-upcast", item.upcast)}
              ${editorInput("Tags", "edit-tags", item.tags.join(", "))}
              ${editorInput("Fonte", "edit-source", item.source || "Manual")}
            </div>
            <div class="toggle-row">
              <label><input id="edit-concentration" type="checkbox" ${item.concentration ? "checked" : ""} /> Concentração</label>
              <label><input id="edit-ritual" type="checkbox" ${item.ritual ? "checked" : ""} /> Ritual</label>
            </div>
            <label class="field">
              <span>Efeito</span>
              <textarea id="edit-effect" class="notes-area">${escapeHtml(item.effect || "")}</textarea>
            </label>
            <div class="button-row">
              <button class="primary-button" data-action="save-spell">Salvar magia</button>
              ${spellItem && spellItem.source !== "SRD inicial" ? `<button class="ghost-button danger" data-action="delete-spell" data-id="${spellItem.id}">Excluir</button>` : ""}
            </div>
          </form>
        </section>
      </div>
    `;
  }

  function onClick(event) {
    const modalCard = event.target.closest("[data-modal-stop]");
    const actionTarget = event.target.closest("[data-action]");
    if (modalCard && (!actionTarget || !modalCard.contains(actionTarget))) return;
    if (!actionTarget) return;
    const action = actionTarget.dataset.action;
    const id = actionTarget.dataset.id;
    const character = getActiveCharacter();

    if (action === "close-modal") {
      ui.modal = null;
      render();
      return;
    }
    if (action === "add-character") {
      const next = createCharacter(`Conjurador ${state.characters.length + 1}`);
      state.characters.push(next);
      state.activeCharacterId = next.id;
      saveAndRender("Personagem criado.");
      return;
    }
    if (action === "select-character") {
      state.activeCharacterId = id;
      saveAndRender();
      return;
    }
    if (action === "set-theme") {
      state.settings.theme = id;
      saveAndRender();
      return;
    }
    if (action === "set-tab") {
      ui.tab = id;
      render();
      return;
    }
    if (action === "auto-slots") {
      character.slots = calculateSlots(character.level, character.casterType);
      saveAndRender("Espaços recalculados.");
      return;
    }
    if (action.startsWith("slot-")) {
      updateSlot(action, Number(actionTarget.dataset.level));
      saveAndRender();
      return;
    }
    if (action === "learn-spell") {
      character.knownSpellIds = unique([...character.knownSpellIds, id]);
      saveAndRender("Magia adicionada ao grimório.");
      return;
    }
    if (action === "forget-spell") {
      character.knownSpellIds = character.knownSpellIds.filter((spellId) => spellId !== id);
      character.preparedSpellIds = character.preparedSpellIds.filter((spellId) => spellId !== id);
      saveAndRender("Magia removida do grimório.");
      return;
    }
    if (action === "prepare-spell") {
      character.preparedSpellIds = unique([...character.preparedSpellIds, id]);
      if (!character.knownSpellIds.includes(id)) character.knownSpellIds.push(id);
      saveAndRender("Magia preparada.");
      return;
    }
    if (action === "unprepare-spell") {
      character.preparedSpellIds = character.preparedSpellIds.filter((spellId) => spellId !== id);
      saveAndRender("Magia despreparada.");
      return;
    }
    if (action === "cast-spell") {
      ui.modal = { type: "cast", spellId: id };
      render();
      return;
    }
    if (action === "confirm-cast") {
      castSpell(character, getSpell(id), actionTarget.dataset.level);
      ui.modal = null;
      saveAndRender();
      return;
    }
    if (action === "roll-spell") {
      rollSpell(character, getSpell(id), Math.max(0, getSpell(id)?.level || 0));
      saveAndRender();
      return;
    }
    if (action === "open-spell-editor") {
      ui.modal = { type: "spell-editor", spellId: null };
      render();
      return;
    }
    if (action === "edit-spell") {
      ui.modal = { type: "spell-editor", spellId: id };
      render();
      return;
    }
    if (action === "save-spell") {
      saveSpellFromEditor();
      return;
    }
    if (action === "delete-spell") {
      deleteSpell(id);
      return;
    }
    if (action === "long-rest") {
      for (let level = 1; level <= 9; level += 1) character.slots[level].used = 0;
      character.effects = [];
      character.concentration = null;
      addLog(`${character.name} completou descanso longo.`);
      saveAndRender("Descanso longo aplicado.");
      return;
    }
    if (action === "short-rest") {
      if (character.casterType === "pact") {
        for (let level = 1; level <= 9; level += 1) character.slots[level].used = 0;
      }
      addLog(`${character.name} completou descanso curto.`);
      saveAndRender("Descanso curto registrado.");
      return;
    }
    if (action === "end-concentration") {
      endConcentration(character);
      saveAndRender("Concentração encerrada.");
      return;
    }
    if (action === "add-effect") {
      addManualEffect(character);
      saveAndRender("Efeito adicionado.");
      return;
    }
    if (action === "remove-effect") {
      character.effects = character.effects.filter((effect) => effect.id !== id);
      saveAndRender("Efeito removido.");
      return;
    }
    if (action === "tick-effect") {
      tickEffect(character, id);
      saveAndRender();
      return;
    }
    if (action === "clear-log") {
      state.log = [];
      saveAndRender("Registro limpo.");
      return;
    }
    if (action === "export-backup") {
      exportBackup();
      return;
    }
    if (action === "trigger-import") {
      document.querySelector("#import-file")?.click();
      return;
    }
    if (action === "reset-app") {
      localStorage.removeItem(STORAGE_KEY);
      state = createDefaultState();
      saveAndRender("Demo reiniciada.");
    }
  }

  function onInput(event) {
    const target = event.target;
    const character = getActiveCharacter();
    if (target.id === "spell-search") {
      ui.search = target.value;
      render();
      return;
    }
    const characterField = target.dataset.characterField;
    if (characterField) {
      updateCharacterField(character, characterField, target.value);
      saveState();
      return;
    }
    const slotUsed = target.dataset.slotUsed;
    if (slotUsed) {
      const slot = character.slots[slotUsed];
      slot.used = clamp(Number(target.value || 0), 0, slot.max);
      saveState();
      render();
      return;
    }
    const slotMax = target.dataset.slotMax;
    if (slotMax) {
      const slot = character.slots[slotMax];
      slot.max = clamp(Number(target.value || 0), 0, 99);
      slot.used = Math.min(slot.used, slot.max);
      saveState();
      render();
      return;
    }
    const settingField = target.dataset.settingField;
    if (settingField) {
      state.settings[settingField] = target.value;
      saveState();
      render();
    }
  }

  function onChange(event) {
    const target = event.target;
    const character = getActiveCharacter();
    if (target.id === "filter-level") {
      ui.filters.level = target.value;
      render();
      return;
    }
    if (target.id === "filter-class") {
      ui.filters.className = target.value;
      render();
      return;
    }
    if (target.id === "filter-school") {
      ui.filters.school = target.value;
      render();
      return;
    }
    const characterField = target.dataset.characterField;
    if (characterField) {
      updateCharacterField(character, characterField, target.value);
      saveAndRender();
      return;
    }
    const settingField = target.dataset.settingField;
    if (settingField) {
      state.settings[settingField] = target.value;
      saveAndRender();
      return;
    }
    if (target.id === "import-file" && target.files?.[0]) {
      importBackup(target.files[0]);
    }
  }

  function updateCharacterField(character, field, value) {
    if (["level", "spellSaveDc", "spellAttackBonus"].includes(field)) {
      character[field] = clamp(Number(value || 0), field === "level" ? 1 : -20, field === "level" ? 20 : 60);
      return;
    }
    character[field] = value;
  }

  function updateSlot(action, level) {
    const character = getActiveCharacter();
    const slot = character.slots[level];
    if (!slot) return;
    if (action === "slot-used-up") slot.used = Math.min(slot.max, slot.used + 1);
    if (action === "slot-used-down") slot.used = Math.max(0, slot.used - 1);
    if (action === "slot-max-up") slot.max = Math.min(99, slot.max + 1);
    if (action === "slot-max-down") slot.max = Math.max(0, slot.max - 1);
    slot.used = Math.min(slot.used, slot.max);
  }

  function calculateSlots(level, casterType) {
    const safeLevel = clamp(Number(level || 1), 1, 20);
    if (casterType === "custom") return getActiveCharacter().slots;
    if (casterType === "pact") {
      const pact = PACT_SLOTS[safeLevel] || PACT_SLOTS[1];
      const values = Array(9).fill(0);
      values[pact.level - 1] = pact.count;
      return slotsFromArray(values);
    }
    if (casterType === "half") {
      if (safeLevel < 2) return slotsFromArray([]);
      const casterLevel = Math.max(1, Math.ceil(safeLevel / 2));
      return slotsFromArray(FULL_CASTER_SLOTS[casterLevel] || []);
    }
    if (casterType === "third") {
      if (safeLevel < 3) return slotsFromArray([]);
      const casterLevel = Math.max(1, Math.ceil(safeLevel / 3));
      return slotsFromArray(FULL_CASTER_SLOTS[casterLevel] || []);
    }
    return slotsFromArray(FULL_CASTER_SLOTS[safeLevel] || []);
  }

  function castSpell(character, spellItem, castLevelRaw) {
    if (!spellItem) return;
    const castLevel = castLevelRaw === "ritual" || castLevelRaw === "free" ? castLevelRaw : Number(castLevelRaw);
    if (typeof castLevel === "number" && castLevel > 0) {
      const slot = character.slots[castLevel];
      if (slot && slot.used < slot.max) slot.used += 1;
    }

    if (spellItem.concentration) {
      endConcentration(character, false);
      character.concentration = {
        spellId: spellItem.id,
        spellName: spellItem.name,
        startedAt: formatTime(new Date().toISOString()),
      };
    }

    const durationRounds = durationToRounds(spellItem.duration);
    if (spellItem.duration && !isInstant(spellItem.duration)) {
      character.effects.unshift({
        id: uid("effect"),
        name: spellItem.name,
        duration: spellItem.duration,
        remaining: durationRounds,
        note: spellItem.effect,
        concentration: spellItem.concentration,
        sourceSpellId: spellItem.id,
      });
    }

    const result = rollSpell(character, spellItem, typeof castLevel === "number" ? castLevel : spellItem.level, false);
    const suffix = result ? ` Resultado: ${result}.` : "";
    const levelText = castLevel === "ritual" ? "como ritual" : castLevel === "free" ? "sem gastar espaço" : `no ${castLevel || "truque"}º círculo`;
    addLog(`${character.name} conjurou ${spellItem.name} ${levelText}.${suffix}`);
  }

  function rollSpell(character, spellItem, castLevel = 0, shouldLog = true) {
    if (!spellItem) return "";
    const formula = getScaledFormula(spellItem, castLevel, character.level);
    if (!formula) return "";
    const result = rollFormula(formula);
    const label = spellItem.damage ? `${result.total} ${spellItem.damageType || "dano"}` : `${result.total} PV`;
    if (shouldLog) {
      addLog(`${character.name} rolou ${spellItem.name}: ${formula} = ${result.total} (${result.parts.join(", ")}).`);
    }
    return `${formula} = ${label}`;
  }

  function getScaledFormula(spellItem, castLevel, characterLevel) {
    const base = spellItem.damage || spellItem.healing || "";
    if (!base) return "";
    if (spellItem.level === 0) {
      const multiplier = characterLevel >= 17 ? 4 : characterLevel >= 11 ? 3 : characterLevel >= 5 ? 2 : 1;
      return scaleFirstDice(base, multiplier);
    }
    const numericCastLevel = Number(castLevel || spellItem.level);
    if (!spellItem.upcast || numericCastLevel <= spellItem.level) return base;
    const steps = numericCastLevel - spellItem.level;
    return addUpcast(base, spellItem.upcast, steps);
  }

  function addUpcast(base, upcast, steps) {
    if (upcast.includes("/2")) {
      const clean = upcast.replace("/2", "");
      const repeats = Math.floor(steps / 2);
      return repeats > 0 ? `${base}+${Array(repeats).fill(clean).join("+")}` : base;
    }
    return `${base}+${Array(steps).fill(upcast).join("+")}`;
  }

  function scaleFirstDice(formula, multiplier) {
    if (multiplier <= 1) return formula;
    return formula.replace(/(\d+)d(\d+)/, (_, count, die) => `${Number(count) * multiplier}d${die}`);
  }

  function rollFormula(formula) {
    const compact = formula.replace(/\s+/g, "");
    const tokens = compact.match(/[+-]?[^+-]+/g) || [];
    const parts = [];
    let total = 0;
    for (const token of tokens) {
      const sign = token.startsWith("-") ? -1 : 1;
      const clean = token.replace(/^[+-]/, "");
      const dice = clean.match(/^(\d*)d(\d+)$/i);
      if (dice) {
        const count = Number(dice[1] || 1);
        const sides = Number(dice[2]);
        const rolls = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * sides));
        const subtotal = rolls.reduce((sum, value) => sum + value, 0) * sign;
        total += subtotal;
        parts.push(`${sign < 0 ? "-" : ""}${count}d${sides}[${rolls.join(",")}]`);
      } else {
        const value = Number(clean || 0) * sign;
        total += value;
        parts.push(String(value));
      }
    }
    return { total, parts };
  }

  function addManualEffect(character) {
    const name = document.querySelector("#effect-name")?.value.trim();
    if (!name) return;
    const duration = document.querySelector("#effect-duration")?.value.trim();
    const note = document.querySelector("#effect-note")?.value.trim();
    character.effects.unshift({
      id: uid("effect"),
      name,
      duration,
      note,
      remaining: durationToRounds(duration),
      concentration: false,
    });
  }

  function tickEffect(character, id) {
    const effect = character.effects.find((item) => item.id === id);
    if (!effect || !effect.remaining) return;
    effect.remaining = Math.max(0, Number(effect.remaining) - 1);
    if (effect.remaining === 0) {
      character.effects = character.effects.filter((item) => item.id !== id);
      addLog(`${effect.name} terminou.`);
    }
  }

  function endConcentration(character, shouldLog = true) {
    const old = character.concentration;
    character.concentration = null;
    character.effects = character.effects.filter((effect) => !effect.concentration);
    if (old && shouldLog) addLog(`${character.name} encerrou concentração em ${old.spellName}.`);
  }

  function saveSpellFromEditor() {
    const id = valueOf("edit-spell-id") || uid("spell");
    const nextSpell = normalizeSpell({
      id,
      name: valueOf("edit-name") || "Magia sem nome",
      level: Number(valueOf("edit-level") || 0),
      school: valueOf("edit-school") || "Evocação",
      classes: asList(valueOf("edit-classes")),
      castingTime: valueOf("edit-casting"),
      range: valueOf("edit-range"),
      components: valueOf("edit-components"),
      duration: valueOf("edit-duration"),
      attack: valueOf("edit-attack"),
      save: valueOf("edit-save"),
      damage: valueOf("edit-damage"),
      healing: valueOf("edit-healing"),
      damageType: valueOf("edit-damage-type"),
      upcast: valueOf("edit-upcast"),
      tags: asList(valueOf("edit-tags")),
      source: valueOf("edit-source") || "Manual",
      concentration: document.querySelector("#edit-concentration")?.checked || false,
      ritual: document.querySelector("#edit-ritual")?.checked || false,
      effect: valueOf("edit-effect"),
    });
    const index = state.spells.findIndex((item) => item.id === id);
    if (index >= 0) {
      state.spells[index] = nextSpell;
    } else {
      state.spells.push(nextSpell);
    }
    ui.modal = null;
    saveAndRender("Magia salva.");
  }

  function deleteSpell(id) {
    state.spells = state.spells.filter((item) => item.id !== id);
    for (const character of state.characters) {
      character.knownSpellIds = character.knownSpellIds.filter((spellId) => spellId !== id);
      character.preparedSpellIds = character.preparedSpellIds.filter((spellId) => spellId !== id);
      character.effects = character.effects.filter((effect) => effect.sourceSpellId !== id);
      if (character.concentration?.spellId === id) character.concentration = null;
    }
    ui.modal = null;
    saveAndRender("Magia excluída.");
  }

  function exportBackup() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `grimorio-arcano-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    showNotice("Backup exportado.");
  }

  function importBackup(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || ""));
        if (Array.isArray(parsed)) {
          mergeSpells(parsed);
          showNotice("Magias importadas.");
        } else if (Array.isArray(parsed.spell)) {
          mergeSpells(parsed.spell.map(convertExternalSpell));
          showNotice("Magias importadas do JSON compatível.");
        } else if (Array.isArray(parsed.spells) && Array.isArray(parsed.characters)) {
          state = normalizeState(parsed);
          saveAndRender("Backup importado.");
        } else if (Array.isArray(parsed.spells)) {
          mergeSpells(parsed.spells.map(convertExternalSpell));
          showNotice("Biblioteca importada.");
        } else {
          showNotice("JSON sem formato reconhecido.");
        }
      } catch (error) {
        console.error(error);
        showNotice("Falha ao importar JSON.");
      }
    };
    reader.readAsText(file);
  }

  function convertExternalSpell(rawSpell) {
    if (!rawSpell || typeof rawSpell !== "object") return rawSpell;
    if (rawSpell.effect || rawSpell.castingTime || rawSpell.damageType) return rawSpell;

    const entries = entriesToText(rawSpell.entries);
    const higherLevel = entriesToText(rawSpell.entriesHigherLevel || rawSpell.higherLevel);
    const effect = [entries, higherLevel ? `Em círculos superiores: ${higherLevel}` : ""]
      .filter(Boolean)
      .join("\n\n");
    const school = SCHOOL_CODES[rawSpell.school] || rawSpell.school || "Evocação";
    const classes = extractExternalClasses(rawSpell);
    const duration = formatExternalDuration(rawSpell.duration);
    const damageType = asList(rawSpell.damageInflict)
      .map((type) => DAMAGE_TRANSLATIONS[type] || type)
      .join("/");

    return normalizeSpell({
      id: `import-${slugify(`${rawSpell.name || "spell"}-${rawSpell.source || "manual"}`)}`,
      name: rawSpell.name || "Magia importada",
      level: Number(rawSpell.level || 0),
      school,
      classes,
      castingTime: formatExternalTime(rawSpell.time),
      range: formatExternalRange(rawSpell.range),
      components: formatExternalComponents(rawSpell.components),
      duration,
      concentration: hasExternalConcentration(rawSpell),
      ritual: Boolean(rawSpell.meta?.ritual || rawSpell.ritual),
      attack: formatExternalAttack(rawSpell.spellAttack),
      save: asList(rawSpell.savingThrow)
        .map((save) => SAVE_TRANSLATIONS[save] || save)
        .join(", "),
      damage: extractFirstDice(rawSpell, effect),
      healing: "",
      damageType,
      upcast: extractUpcastDice(higherLevel),
      effect,
      tags: extractExternalTags(rawSpell),
      source: [rawSpell.source || "Importado", rawSpell.page ? `p. ${rawSpell.page}` : ""].filter(Boolean).join(" "),
    });
  }

  function extractExternalClasses(rawSpell) {
    const classes = [];
    const candidates = [
      rawSpell.classes?.fromClassList,
      rawSpell.classes?.fromClassListVariant,
      rawSpell.classes?.fromSubclass,
    ];
    for (const list of candidates) {
      if (!Array.isArray(list)) continue;
      for (const item of list) {
        const name = item.class?.name || item.name;
        if (name) classes.push(CLASS_TRANSLATIONS[name] || name);
      }
    }
    return unique(classes);
  }

  function extractExternalTags(rawSpell) {
    const tags = [];
    if (rawSpell.meta?.ritual || rawSpell.ritual) tags.push("ritual");
    if (hasExternalConcentration(rawSpell)) tags.push("concentração");
    tags.push(...asList(rawSpell.damageInflict).map((type) => DAMAGE_TRANSLATIONS[type] || type));
    tags.push(...asList(rawSpell.conditionInflict));
    return unique(tags.filter(Boolean));
  }

  function formatExternalTime(time) {
    if (!Array.isArray(time) || !time.length) return "1 ação";
    return time
      .map((item) => {
        const number = item.number || 1;
        const unit = translateTimeUnit(item.unit || "action");
        const condition = item.condition ? ` (${cleanExternalText(item.condition)})` : "";
        return `${number} ${unit}${condition}`;
      })
      .join(" ou ");
  }

  function translateTimeUnit(unit) {
    const units = {
      action: "ação",
      bonus: "ação bônus",
      reaction: "reação",
      round: "rodada",
      minute: "minuto",
      hour: "hora",
      day: "dia",
    };
    return units[unit] || unit;
  }

  function formatExternalRange(range) {
    if (!range) return "Pessoal";
    if (range.type === "special") return "Especial";
    if (range.type === "sight") return "Visão";
    if (range.type === "unlimited") return "Ilimitado";
    const distance = range.distance || {};
    if (distance.type === "self") return "Pessoal";
    if (distance.type === "touch") return "Toque";
    if (distance.type === "sight") return "Visão";
    if (distance.type === "unlimited") return "Ilimitado";
    if (distance.amount && distance.type === "feet") return `${formatNumberPt(distance.amount * 0.3)} m`;
    if (distance.amount && distance.type === "mile") return `${formatNumberPt(distance.amount * 1.5)} km`;
    if (distance.amount && distance.type === "miles") return `${formatNumberPt(distance.amount * 1.5)} km`;
    return distance.type || range.type || "Especial";
  }

  function formatExternalComponents(components) {
    if (!components) return "";
    const parts = [];
    if (components.v) parts.push("V");
    if (components.s) parts.push("S");
    if (components.m) {
      const material = typeof components.m === "string" ? components.m : components.m.text;
      parts.push(material ? `M (${cleanExternalText(material)})` : "M");
    }
    return parts.join(", ");
  }

  function formatExternalDuration(duration) {
    if (!Array.isArray(duration) || !duration.length) return "Instantânea";
    return duration
      .map((item) => {
        const prefix = item.concentration ? "Concentração, até " : "";
        if (item.type === "instant") return "Instantânea";
        if (item.type === "special") return "Especial";
        if (item.type === "permanent") return "Permanente";
        if (item.type === "timed") {
          const amount = item.duration?.amount || 1;
          const unit = translateTimeUnit(item.duration?.type || "minute");
          return `${prefix}${amount} ${unit}${amount > 1 && !unit.endsWith("s") ? "s" : ""}`;
        }
        return prefix + (item.type || "Especial");
      })
      .join(" ou ");
  }

  function hasExternalConcentration(rawSpell) {
    return Boolean(rawSpell.concentration || rawSpell.duration?.some((item) => item.concentration));
  }

  function formatExternalAttack(attack) {
    const attacks = asList(attack);
    const labels = attacks.map((item) => {
      if (item === "M") return "Ataque mágico corpo a corpo";
      if (item === "R") return "Ataque mágico à distância";
      return item;
    });
    return labels.join(", ");
  }

  function extractFirstDice(rawSpell, effect) {
    const scaling = rawSpell.scalingLevelDice?.scaling;
    if (scaling && typeof scaling === "object") {
      const first = Object.keys(scaling)
        .sort((a, b) => Number(a) - Number(b))
        .map((key) => scaling[key])
        .find(Boolean);
      if (first) return first;
    }
    const match = String(effect || "").match(/\b\d+d\d+(?:\s*[+-]\s*\d+)?\b/i);
    return match ? match[0].replace(/\s+/g, "") : "";
  }

  function extractUpcastDice(text) {
    const match = String(text || "").match(/\b\d+d\d+(?:\s*[+-]\s*\d+)?\b/i);
    return match ? match[0].replace(/\s+/g, "") : "";
  }

  function entriesToText(entries) {
    if (!entries) return "";
    const lines = [];
    walkExternalEntries(entries, lines);
    return lines.map(cleanExternalText).filter(Boolean).join("\n");
  }

  function walkExternalEntries(value, lines) {
    if (!value) return;
    if (typeof value === "string") {
      lines.push(value);
      return;
    }
    if (Array.isArray(value)) {
      for (const item of value) walkExternalEntries(item, lines);
      return;
    }
    if (value.type === "list" && Array.isArray(value.items)) {
      for (const item of value.items) walkExternalEntries(item, lines);
      return;
    }
    if (value.type === "entries" || value.type === "section") {
      if (value.name) lines.push(`${value.name}:`);
      walkExternalEntries(value.entries, lines);
      return;
    }
    if (value.type === "table" && Array.isArray(value.rows)) {
      if (value.caption) lines.push(value.caption);
      for (const row of value.rows) {
        const cells = Array.isArray(row) ? row : row.row;
        if (Array.isArray(cells)) lines.push(cells.map((cell) => cleanExternalText(String(cell))).join(" | "));
      }
      return;
    }
    if (value.entry) walkExternalEntries(value.entry, lines);
    if (value.entries) walkExternalEntries(value.entries, lines);
    if (value.items) walkExternalEntries(value.items, lines);
  }

  function cleanExternalText(text) {
    return String(text || "")
      .replace(/\{@(?:spell|item|creature|condition|class|filter|damage|sense|skill|action|status|variantrule|book|hit|dice|chance|dc|b|i|u|note|quickref|scaledice|scaledamage) ([^}|]+)(?:\|[^}]*)?\}/gi, "$1")
      .replace(/\{@(?:atk|h)\s*([^}]*)\}/gi, "$1")
      .replace(/\{@(?:recharge|recharge d) ([^}]+)\}/gi, "recarga $1")
      .replace(/\{@[^}]+}/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function mergeSpells(spells) {
    const incoming = spells.map(convertExternalSpell).map(normalizeSpell);
    const byId = new Map(state.spells.map((item) => [item.id, item]));
    for (const item of incoming) byId.set(item.id, item);
    state.spells = Array.from(byId.values()).sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
    saveState();
    render();
  }

  function getFilteredSpells(character, mode) {
    const query = normalizeText(ui.search);
    let spells = state.spells.slice();
    if (mode === "known") spells = spells.filter((item) => character.knownSpellIds.includes(item.id));
    if (mode === "prepared") spells = spells.filter((item) => character.preparedSpellIds.includes(item.id));
    if (ui.filters.level !== "all") spells = spells.filter((item) => String(item.level) === ui.filters.level);
    if (ui.filters.className !== "all") spells = spells.filter((item) => item.classes.includes(ui.filters.className));
    if (ui.filters.school !== "all") spells = spells.filter((item) => item.school === ui.filters.school);
    if (query) {
      spells = spells.filter((item) =>
        normalizeText(
          [
            item.name,
            item.school,
            item.classes.join(" "),
            item.tags.join(" "),
            item.effect,
            item.damage,
            item.damageType,
            item.save,
            item.attack,
          ].join(" "),
        ).includes(query),
      );
    }
    return spells.sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
  }

  function getActiveCharacter() {
    return state.characters.find((character) => character.id === state.activeCharacterId) || state.characters[0];
  }

  function getSpell(id) {
    return state.spells.find((item) => item.id === id);
  }

  function addLog(text) {
    state.log.push({
      id: uid("log"),
      at: new Date().toISOString(),
      text,
    });
    state.log = state.log.slice(-100);
  }

  function saveAndRender(notice = "") {
    if (notice) ui.notice = notice;
    saveState();
    render();
    if (notice) {
      window.clearTimeout(saveAndRender.noticeTimer);
      saveAndRender.noticeTimer = window.setTimeout(() => {
        ui.notice = "";
        render();
      }, 2400);
    }
  }

  function showNotice(notice) {
    ui.notice = notice;
    render();
    window.clearTimeout(showNotice.noticeTimer);
    showNotice.noticeTimer = window.setTimeout(() => {
      ui.notice = "";
      render();
    }, 2400);
  }

  function inputField(label, id, value, field) {
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <input id="${id}" type="text" value="${escapeHtml(value || "")}" data-character-field="${field}" />
      </label>
    `;
  }

  function settingsField(label, id, field, value) {
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <input id="${id}" type="text" value="${escapeHtml(value || "")}" data-setting-field="${field}" />
      </label>
    `;
  }

  function editorInput(label, id, value) {
    return `
      <label class="field">
        <span>${escapeHtml(label)}</span>
        <input id="${id}" type="text" value="${escapeHtml(value || "")}" />
      </label>
    `;
  }

  function option(value, selected) {
    return `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(value)}</option>`;
  }

  function renderEmptyState(mode) {
    const labels = {
      library: "Nenhuma magia encontrada.",
      known: "Nenhuma magia no grimório.",
      prepared: "Nenhuma magia preparada.",
    };
    return `<div class="empty-state">${labels[mode] || "Nada por aqui."}</div>`;
  }

  function cssVars(theme) {
    return [
      `--accent:${theme.accent}`,
      `--accent-strong:${theme.accentStrong}`,
      `--ink:${theme.ink}`,
      `--paper:${theme.paper}`,
      `--cover:${theme.cover}`,
    ].join(";");
  }

  function valueOf(id) {
    return document.getElementById(id)?.value.trim() || "";
  }

  function asList(value) {
    if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
    return String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function unique(values) {
    return Array.from(new Set(values));
  }

  function clamp(value, min, max) {
    if (Number.isNaN(value)) return min;
    return Math.min(max, Math.max(min, value));
  }

  function uid(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalizeText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function slugify(value) {
    return normalizeText(value)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }

  function formatNumberPt(value) {
    const rounded = Math.round(Number(value) * 10) / 10;
    return String(rounded).replace(".", ",");
  }

  function isInstant(duration) {
    return normalizeText(duration).includes("instant");
  }

  function durationToRounds(duration) {
    const text = normalizeText(duration);
    if (text.includes("1 minuto")) return 10;
    const rounds = text.match(/(\d+)\s*rodad/);
    if (rounds) return Number(rounds[1]);
    const minutes = text.match(/(\d+)\s*min/);
    if (minutes) return Number(minutes[1]) * 10;
    return 0;
  }

  function formatTime(value) {
    const date = value ? new Date(value) : new Date();
    return date.toLocaleString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    });
  }
})();
