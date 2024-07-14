<template>
    <div id="raiz">
        <div class="leftCard">
            <div class="cardDescription">
                <div class="iconDescription">
                    <img :src="livroIcon" alt="icon">
                </div>
                <div class="textDescription">
                    <h3>ESTUDE GRATUITAMENTE</h3>
                    <p>Criar um ambiente e comunidade que seja inclusivo através de uma comunidade virtual de estudos, 
                        visando a educação diária e/ou contínua de pessoas para pessoas de determinado nível de vulnerabilidade socioeconômica 
                        e para pessoas neurodivergentes.</p>
                </div>
            </div>

            <div class="cardDescription">
                <div class="iconDescription">
                    <img :src="livroIcon" alt="icon">
                </div>
                <div class="textDescription">
                    <h3>SEJA ACOMPANHADO POR UM TUTOR</h3>
                    <p>Proporcionar visibilidade ao papel fundamental do pedagogo no processo educativo, 
                        utilizando um sistema de salas virtuais que ofereça acompanhamento pedagógico personalizado.
                    </p>
                </div>
            </div>

            <div class="cardDescription">
                <div class="iconDescription">
                    <img :src="livroIcon" alt="icon">
                </div>
                <div class="textDescription">
                    <h3>ORGANIZE SEUS ESTUDOS</h3>
                    <p>Se organize através de agendas, calendários e criação de pastas 
                        e/ou arquivos dividindo-se em disciplinas ou áreas de estudo.</p>
                </div>
            </div>
        </div>

        <div class="rightCard">
            <p>Planeje seus estudos, Estude em grupo com salas virtuais, Seja direcionado por um tutor, Compartilhe suas
                ideias e conhecimentos com demais usuários, tudo em um único ambiente de aprendizagem. </p>
            <h2>Descubra uma educação inclusiva e gratuita conosco.</h2>
        </div>


    </div>
</template>

<script>
export default {
    name: "HomeHeadSync",
    data() {
        return {
            livroIcon: require("@/assets/livro.png"),
        };
    }
}
</script>

<style scoped>
#raiz {
    margin: 2em;
    display: flex;
}

.cardDescription {
    display: flex;
    background-color: #000;
    width: 45em;
    border-radius: 10px;
    margin: 1em;
}

.textDescription {
    display: flex;
    flex-direction: column;
    color: #fff;
    justify-content: center;
    margin-left: 2em;
    margin-right: 2em;
}

.iconDescription {
    width: 15em;
    height: 10em;
    background-color: #8C52FF;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}

.rightCard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2em;
}

h2 {
    font-size: 4em;
    width: 102%;
}

.rightCard > p {
    font-size: 1.1em;
    text-align: justify;
}
</style>