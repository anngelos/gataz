export type LevelConfig = {
  id: number;

  width: number;

  background: string;

  platformTexture: string;

  groundTexture: string;

  playerStart: {
    x: number;
    y: number;
  };

  ground: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[];

  platforms: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[];

  enemies: {
    type: string;
    x: number;
    y: number;
  }[];

  collectibles: {
    type: string;
    x: number;
    y: number;
  }[];

  finish: {
    type: string;
    x: number;
    y: number;
  };
};

export const levels: Record<number, LevelConfig> = {
  1: {
    id: 1,

    width: 4000,

    background: "/assets/levels/level-1/level-1-background.png",

    platformTexture: "/assets/levels/level-1/level-1-grass-platform.png",

    groundTexture: "/assets/levels/level-1/level-1-ground.png",

    playerStart: {
      x: 130,
      y: 500,
    },

    finish: {
      type: "morciga",
      x: 3900,
      y: 550,
    },

    ground: [
      {
        x: 500,
        y: 680,
        width: 1000,
        height: 80,
      },

      {
        x: 1750,
        y: 680,
        width: 500,
        height: 80,
      },

      {
        x: 2500,
        y: 680,
        width: 1000,
        height: 80,
      },

      {
        x: 3800,
        y: 680,
        width: 400,
        height: 80,
      },
    ],

    platforms: [
      {
        x: 450,
        y: 550,
        width: 250,
        height: 40,
      },

      {
        x: 800,
        y: 450,
        width: 250,
        height: 40,
      },

      {
        x: 1200,
        y: 550,
        width: 250,
        height: 40,
      },

      {
        x: 1550,
        y: 470,
        width: 250,
        height: 40,
      },

      {
        x: 2000,
        y: 550,
        width: 250,
        height: 40,
      },

      {
        x: 2350,
        y: 440,
        width: 250,
        height: 40,
      },

      {
        x: 2750,
        y: 540,
        width: 250,
        height: 40,
      },

      {
        x: 3150,
        y: 450,
        width: 250,
        height: 40,
      },

      {
        x: 3500,
        y: 540,
        width: 250,
        height: 40,
      },
    ],

    enemies: [
      {
        type: "esporotricose",
        x: 500,
        y: 518,
      },

      {
        type: "esporotricose",
        x: 1200,
        y: 517,
      },

      {
        type: "esporotricose",
        x: 1900,
        y: 517,
      },

      {
        type: "esporotricose",
        x: 2350,
        y: 407,
      },

      {
        type: "esporotricose",
        x: 2350,
        y: 625,
      },

      {
        type: "esporotricose",
        x: 3450,
        y: 508,
      },

      {
        type: "esporotricose",
        x: 3750,
        y: 625,
      },
    ],

    collectibles: [
      {
        type: "coin",
        x: 800,
        y: 370,
      },

      {
        type: "coin",
        x: 1550,
        y: 550,
      },

      {
        type: "coin",
        x: 1550,
        y: 390,
      },

      {
        type: "coin",
        x: 2000,
        y: 470,
      },

      {
        type: "coin",
        x: 2700,
        y: 460,
      },

      {
        type: "coin",
        x: 2800,
        y: 460,
      },

      {
        type: "coin",
        x: 3150,
        y: 370,
      },

      {
        type: "coin",
        x: 3700,
        y: 460,
      },
    ],
  },

  2: {
    id: 2,

    width: 5000,

    background: "/assets/levels/level-2/level-2-background.png",

    platformTexture: "/assets/levels/level-2/level-2-dirt-platform.png",

    groundTexture: "/assets/levels/level-2/level-2-ground.png",

    playerStart: {
      x: 130,
      y: 500,
    },

    finish: {
      type: "morciga",
      x: 4350,
      y: 550,
    },

    ground: [
      {
        x: 450,
        y: 680,
        width: 900,
        height: 80,
      },

      {
        x: 1600,
        y: 680,
        width: 550,
        height: 80,
      },

      {
        x: 2350,
        y: 680,
        width: 700,
        height: 80,
      },

      {
        x: 3250,
        y: 680,
        width: 500,
        height: 80,
      },

      {
        x: 3950,
        y: 680,
        width: 550,
        height: 80,
      },
    ],

    platforms: [
      {
        x: 400,
        y: 550,
        width: 220,
        height: 40,
      },

      {
        x: 750,
        y: 470,
        width: 220,
        height: 40,
      },

      {
        x: 1100,
        y: 550,
        width: 220,
        height: 40,
      },

      {
        x: 1450,
        y: 450,
        width: 220,
        height: 40,
      },

      {
        x: 1800,
        y: 520,
        width: 220,
        height: 40,
      },

      {
        x: 2150,
        y: 420,
        width: 220,
        height: 40,
      },

      {
        x: 2500,
        y: 520,
        width: 220,
        height: 40,
      },

      {
        x: 2850,
        y: 440,
        width: 220,
        height: 40,
      },

      {
        x: 3200,
        y: 545,
        width: 220,
        height: 40,
      },

      {
        x: 3550,
        y: 450,
        width: 220,
        height: 40,
      },

      {
        x: 3900,
        y: 530,
        width: 220,
        height: 40,
      },

      {
        x: 4200,
        y: 450,
        width: 220,
        height: 40,
      },
    ],

    enemies: [
      {
        type: "rato",
        x: 650,
        y: 625,
      },

      {
        type: "rato",
        x: 1100,
        y: 518,
      },

      {
        type: "rato",
        x: 1750,
        y: 488,
      },

      {
        type: "rato",
        x: 1850,
        y: 488,
      },

      {
        type: "rato",
        x: 2600,
        y: 625,
      },

      {
        type: "rato",
        x: 3040,
        y: 625,
      },

      {
        type: "rato",
        x: 3350,
        y: 625,
      },

      {
        type: "rato",
        x: 3740,
        y: 625,
      },

      {
        type: "rato",
        x: 4050,
        y: 625,
      },
    ],

    collectibles: [
      {
        type: "coin",
        x: 400,
        y: 490,
      },

      {
        type: "coin",
        x: 750,
        y: 410,
      },

      {
        type: "coin",
        x: 1450,
        y: 390,
      },

      {
        type: "coin",
        x: 2150,
        y: 520,
      },

      {
        type: "coin",
        x: 2150,
        y: 360,
      },

      {
        type: "coin",
        x: 2500,
        y: 460,
      },

      {
        type: "coin",
        x: 2800,
        y: 380,
      },

      {
        type: "coin",
        x: 3200,
        y: 470,
      },

      {
        type: "coin",
        x: 3550,
        y: 390,
      },

      {
        type: "coin",
        x: 4200,
        y: 390,
      },
    ],
  },

  3: {
    id: 3,

    width: 6000,

    background: "/assets/levels/level-3/level-3-background.png",

    platformTexture: "/assets/levels/level-3/level-3-platform.png",

    groundTexture: "/assets/levels/level-3/level-3-ground.png",

    playerStart: {
      x: 130,
      y: 500,
    },

    finish: {
      type: "morciga",
      x: 5900,
      y: 550,
    },

    ground: [
      {
        x: 500,
        y: 680,
        width: 1000,
        height: 80,
      },

      {
        x: 1750,
        y: 680,
        width: 500,
        height: 80,
      },

      {
        x: 2500,
        y: 680,
        width: 1000,
        height: 80,
      },

      {
        x: 3800,
        y: 680,
        width: 800,
        height: 80,
      },

      {
        x: 4850,
        y: 680,
        width: 700,
        height: 80,
      },

      {
        x: 5750,
        y: 680,
        width: 500,
        height: 80,
      },
    ],

    platforms: [
      {
        x: 800,
        y: 450,
        width: 250,
        height: 40,
      },

      {
        x: 1200,
        y: 550,
        width: 250,
        height: 40,
      },

      {
        x: 1550,
        y: 500,
        width: 250,
        height: 40,
      },

      {
        x: 2000,
        y: 550,
        width: 250,
        height: 40,
      },

      {
        x: 2350,
        y: 440,
        width: 250,
        height: 40,
      },

      {
        x: 2750,
        y: 540,
        width: 250,
        height: 40,
      },

      {
        x: 3150,
        y: 450,
        width: 250,
        height: 40,
      },

      {
        x: 3500,
        y: 540,
        width: 250,
        height: 40,
      },

      {
        x: 4050,
        y: 450,
        width: 250,
        height: 40,
      },

      {
        x: 4400,
        y: 540,
        width: 250,
        height: 40,
      },

      {
        x: 5000,
        y: 450,
        width: 250,
        height: 40,
      },

      {
        x: 5420,
        y: 540,
        width: 250,
        height: 40,
      },
    ],

    enemies: [
      {
        type: "sick-cat",
        x: 480,
        y: 625,
      },

      {
        type: "sick-cat",
        x: 700,
        y: 625,
      },

      {
        type: "sick-cat",
        x: 1200,
        y: 517,
      },

      {
        type: "sick-cat",
        x: 1760,
        y: 625,
      },

      {
        type: "sick-cat",
        x: 2940,
        y: 625,
      },

      {
        type: "sick-cat",
        x: 3690,
        y: 625,
      },

      {
        type: "sick-cat",
        x: 4100,
        y: 625,
      },

      {
        type: "sick-cat",
        x: 4750,
        y: 625,
      },

      {
        type: "sick-cat",
        x: 5050,
        y: 625,
      },

      {
        type: "sick-cat",
        x: 5750,
        y: 625,
      },
    ],

    collectibles: [
      {
        type: "coin",
        x: 800,
        y: 350,
      },

      {
        type: "coin",
        x: 770,
        y: 380,
      },

      {
        type: "coin",
        x: 830,
        y: 380,
      },

      {
        type: "coin",
        x: 1550,
        y: 390,
      },

      {
        type: "coin",
        x: 2000,
        y: 470,
      },

      {
        type: "coin",
        x: 2350,
        y: 360,
      },

      {
        type: "coin",
        x: 3150,
        y: 370,
      },

      {
        type: "coin",
        x: 4050,
        y: 370,
      },

      {
        type: "coin",
        x: 4400,
        y: 460,
      },

      {
        type: "coin",
        x: 5000,
        y: 370,
      },

      {
        type: "coin",
        x: 5420,
        y: 460,
      },
    ],
  },

  4: {
    id: 4,
  
    width: 6000,
  
    background: "/assets/levels/level-4/level-4-background.png",
  
    platformTexture: "/assets/levels/level-4/level-4-platform.png",
  
    groundTexture: "/assets/levels/level-4/level-4-ground.png",
  
    playerStart: {
      x: 130,
      y: 500,
    },
  
    finish: {
      type: "morciga",
      x: 5900,
      y: 550,
    },
  
    ground: [
      {
        x: 500,
        y: 680,
        width: 1000,
        height: 80,
      },
  
      {
        x: 2400,
        y: 680,
        width: 850,
        height: 80,
      },
  
      {
        x: 4300,
        y: 680,
        width: 850,
        height: 80,
      },
  
      {
        x: 5350,
        y: 680,
        width: 650,
        height: 80,
      },
    ],
  
    platforms: [
      {
        x: 830,
        y: 550,
        width: 120,
        height: 40,
      },
  
      {
        x: 1090,
        y: 440,
        width: 250,
        height: 40,
      },
  
      {
        x: 1450,
        y: 520,
        width: 250,
        height: 40,
      },
  
      {
        x: 1800,
        y: 450,
        width: 250,
        height: 40,
      },
  
      {
        x: 2150,
        y: 360,
        width: 250,
        height: 40,
      },

      {
        x: 2350,
        y: 450,
        width: 50,
        height: 40,
      },
  
      {
        x: 2550,
        y: 550,
        width: 250,
        height: 40,
      },
  
      {
        x: 2900,
        y: 450,
        width: 250,
        height: 40,
      },
  
      {
        x: 3250,
        y: 520,
        width: 250,
        height: 40,
      },
  
      {
        x: 3650,
        y: 430,
        width: 250,
        height: 40,
      },
  
      {
        x: 4000,
        y: 350,
        width: 250,
        height: 40,
      },

      {
        x: 4200,
        y: 450,
        width: 80,
        height: 40,
      },

      {
        x: 4080,
        y: 550,
        width: 80,
        height: 40,
      },
  
      {
        x: 4450,
        y: 500,
        width: 250,
        height: 40,
      },
  
      {
        x: 4800,
        y: 420,
        width: 250,
        height: 40,
      },
  
      {
        x: 5200,
        y: 350,
        width: 250,
        height: 40,
      },
  
      {
        x: 5550,
        y: 500,
        width: 250,
        height: 40,
      },
    ],
  
    enemies: [
      {
        type: "pirate",
        x: 550,
        y: 630,
      },
  
      {
        type: "pirate",
        x: 855,
        y: 515,
      },
  
      {
        type: "pirate",
        x: 1540,
        y: 485,
      },
  
      {
        type: "pirate",
        x: 1900,
        y: 415,
      },
  
      {
        type: "pirate",
        x: 2650,
        y: 515,
      },
  
      {
        type: "pirate",
        x: 2780,
        y: 630,
      },
  
      {
        type: "pirate",
        x: 3700,
        y: 395,
      },
  
      {
        type: "pirate",
        x: 4400,
        y: 630,
      },
  
      {
        type: "pirate",
        x: 4550,
        y: 465,
      },
  
      
      {
        type: "pirate",
        x: 5300,
        y: 315,
      },
    ],
  
    collectibles: [
      {
        type: "coin",
        x: 925,
        y: 360,
      },
  
      {
        type: "coin",
        x: 925,
        y: 420,
      },
  
      {
        type: "coin",
        x: 925,
        y: 480,
      },
  
      {
        type: "coin",
        x: 1450,
        y: 440,
      },
  
      {
        type: "coin",
        x: 1800,
        y: 370,
      },
  
      {
        type: "coin",
        x: 2150,
        y: 280,
      },
      
      {
        type: "coin",
        x: 2550,
        y: 400,
      },
  
      {
        type: "coin",
        x: 2550,
        y: 465,
      },

      {
        type: "coin",
        x: 2900,
        y: 300,
      },
  
      {
        type: "coin",
        x: 2900,
        y: 350,
      },
  
      {
        type: "coin",
        x: 3250,
        y: 440,
      },
  
      {
        type: "coin",
        x: 3600,
        y: 350,
      },
  
      {
        type: "coin",
        x: 4000,
        y: 270,
      },
  
      {
        type: "coin",
        x: 4450,
        y: 420,
      },
  
      {
        type: "coin",
        x: 4800,
        y: 340,
      },
  
      {
        type: "coin",
        x: 5200,
        y: 270,
      },
  
      {
        type: "coin",
        x: 5550,
        y: 420,
      },
    ],
  },
};
