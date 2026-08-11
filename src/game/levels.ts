export type LevelConfig = {
  id: number;

  width: number;

  playerStart: {
    x: number;
    y: number;
  };

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
};

export const levels: Record<number, LevelConfig> = {
  1: {
    id: 1,

    width: 2000,

    playerStart: {
      x: 300,
      y: 500,
    },

    platforms: [
      {
        x: 640,
        y: 680,
        width: 1280,
        height: 80,
      },

      {
        x: 400,
        y: 550,
        width: 250,
        height: 40,
      },

      {
        x: 750,
        y: 450,
        width: 250,
        height: 40,
      },

      {
        x: 1100,
        y: 550,
        width: 250,
        height: 40,
      },

      {
        x: 1450,
        y: 480,
        width: 250,
        height: 40,
      },
    ],

    enemies: [
      {
        type: "esporotricose",
        x: 650,
        y: 620,
      },
    ],
  },
};