import Description from "./components/layout/Description.vue"
import PreviewSliders from "./components/layout/PreviewSlider.vue"

export default {}

if (import.meta.env.DEV) {
  window.postMessage({
    event: 'updateLang',
  })

  window.postMessage({
    event: 'updateMenu',
    menu: {
      id: 'home',
      title: 'Main title',
      subtitle: 'The menu title',
      numberOnScreen: 8,
      items: [
        {
          title: 'This is the title',
          price: 4,
          previewSlider: true,
          description: `Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans. Un professeur du Hampden-Sydney College, en Virginie, s'est intéressé à un des mots latins les plus obscurs, consectetur, extrait d'un passage du Lorem Ipsum, et en étudiant tous les usages de ce mot dans la littérature classique, découvrit la source incontestable du Lorem Ipsum. Il provient en fait des sections 1.10.32 et 1.10.33 du "De Finibus Bonorum et Malorum" (Des Suprêmes Biens et des Suprêmes Maux) de Cicéron. Cet ouvrage, très populaire pendant la Renaissance, est un traité sur la théorie de l'éthique. Les premières lignes du Lorem Ipsum, "Lorem ipsum dolor sit amet...", proviennent de la section 1.10.32.`
        },
        {
          title: 'This is the title',
          price: 4,
          previewSlider: true,
        },
        {
          title: 'This is the title',
          price: 4,
          previewSlider: true,
        },
        {
          title: 'This is the title',
          price: 4,
          previewSlider: true,
        }, {
          title: 'This is the title',
          price: 4,
          previewSlider: true,
        },
        {
          title: 'This is the title',
          price: 4,
          previewSlider: true,
        },
        {
          title: 'This is the title',
          price: 4,
          previewSlider: true,
        },
        {
          title: 'This is the title',
          price: 4,
          previewSlider: true,
        },
      ],
    }
  })

  window.postMessage({
    event: 'setCurrentMenu',
    menu: 'home',
    keepHistoric: true
  })

  setTimeout(function () {
    window.postMessage({
      event: "updateShow",
      show: true
    })
  }, 200)
}