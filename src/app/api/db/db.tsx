interface Reply {
  id: number;
  img: string;
  pseudo: string;
  date: string;
  comment: string;
  quantity: number;
}

interface Comments {
  id: number;
  img: string;
  pseudo: string;
  date: string;
  comment: string;
  quantity: number;
  reply: Reply[]; // Tableau de réponses de type Reply
}

export const comments: Comments[] = [
  {
    id: 1,
    img: "/assets/avatars/image-amyrobson.webp",
    pseudo: "amyrobson",
    date: "1 month ago",
    comment:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakooints works reallv well",
    quantity: 12,
    reply: [],
  },
  {
    id: 2,
    img: "/assets/avatars/image-maxblagun.webp",
    pseudo: "maxblagun",
    date: "2 weeks ago",
    comment:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    quantity: 5,
    reply: [
      {
        id: 3,
        img: "/assets/avatars/image-ramsesmiron.webp",
        pseudo: "ramsesmiron",
        date: "1 week ago",
        comment:
          "@maxblagun If you're still new. I'd recommend focusing on the fundamentals of HTML, CSS, and JS before cons ering React. It's very tempting to jump ahead but lay a sol fondation first.",
        quantity: 4,
      },
      {
        id: 4,
        img: "/assets/avatars/image-juliusomo.png",
        pseudo: "juliusomo",
        date: "2 days ago",
        comment:
          "@ramsesmiron I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/ tramework But the fundamentals are whar stav constant",
        quantity: 2,
      },
    ],
  },
];
