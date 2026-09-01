export type LevelConfig = {
  id: number;

  width: number;

  background: string;

  platformTexture: string;

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

    background:
      "/assets/levels/level-1/level-1-background.png",

    platformTexture:
      "/assets/levels/level-1/level-1-grass-platform.png",

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

    // TEMPORARIAMENTE usamos os assets da fase 1.
    // Depois criamos os assets próprios da fase 2.
    background:
      "/assets/levels/level-1/level-1-background.png",

    platformTexture:
      "/assets/levels/level-1/level-1-grass-platform.png",

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
        x: 500,
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
        y: 530,
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
        type: "esporotricose",
        x: 650,
        y: 625,
      },

      {
        type: "esporotricose",
        x: 1100,
        y: 518,
      },

      {
        type: "esporotricose",
        x: 1800,
        y: 488,
      },

      {
        type: "esporotricose",
        x: 2150,
        y: 388,
      },

      {
        type: "esporotricose",
        x: 2600,
        y: 625,
      },

      {
        type: "esporotricose",
        x: 2850,
        y: 408,
      },

      {
        type: "esporotricose",
        x: 3350,
        y: 625,
      },

      {
        type: "esporotricose",
        x: 3550,
        y: 418,
      },

      {
        type: "esporotricose",
        x: 4050,
        y: 625,
      },
    ],

    collectibles: [
      {
        type: "coin",
        x: 750,
        y: 410,
      },

      {
        type: "coin",
        x: 1100,
        y: 490,
      },

      {
        type: "coin",
        x: 1450,
        y: 390,
      },

      {
        type: "coin",
        x: 1800,
        y: 460,
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
        x: 2850,
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
};