<template>
    <NavReglus />
    <main id="activity">
        <div v-if="!loading && activity">
            <h2>Detalhes da Atividade</h2>
            <p><strong>Título:</strong> {{ activity.title }}</p>
            <p><strong>Descrição:</strong> {{ activity.description }}</p>
            <p><strong>Pontuação Máxima:</strong> {{ activity.maxPoints }}</p>
            <p><strong>Prazo:</strong> {{ formattedDataLimit }}</p>
            <p><strong>Data de Criação:</strong> {{ formattedCreatedAt }}</p>
            <p><strong>Última Atualização:</strong> {{ formattedUpdatedAt }}</p>
    
            <div v-if="activity.fileData">
                <h3>Arquivo da Atividade</h3>
                <embed :src="pdfUrl" type="application/pdf" width="600" height="400" />
            </div>
        </div>
        <div v-else-if="!loading && !activity">
            <p>Atividade não encontrada.</p>
        </div>
        <div v-else>
            <p>Carregando...</p>
        </div>
    </main>

    <FooterReglus />
</template>

<script>
import NavReglus from "@/components/nav/NavIn.vue";
import FooterReglus from "@/components/nav/FooterReglus.vue";

export default {
    name: "ActivityDetails",
    components: {
        NavReglus,
        FooterReglus
    },
    data() {
        return {
            loading: true,
            activity: null,
            userRole: "",
            pdfUrl: ''
        };
    },
    computed: {
        formattedDataLimit() {
            return this.activity?.dataLimit
                ? new Date(this.activity.dataLimit).toLocaleString()
                : "Sem prazo definido";
        },
        formattedCreatedAt() {
            return this.activity?.createdAt
                ? new Date(this.activity.createdAt).toLocaleString()
                : "Não disponível";
        },
        formattedUpdatedAt() {
            return this.activity?.updatedAt
                ? new Date(this.activity.updatedAt).toLocaleString()
                : "Não disponível";
        }
    },
    

    created() {
        this.fetchActivity();
    },
    methods: {
        async fetchActivity() {
            const activityId = this.$route.params.activityId;
            try {
                const response = await fetch(`http://localhost:8080/api/activities/${activityId}`);
                const data = await response.json();
                this.activity = data;

                if (this.activity.fileData) {
                    this.createPdfUrl(this.activity.fileData);
                }

                this.loading = false;
            } catch (error) {
                console.error('Erro ao carregar atividade:', error);
                this.loading = false;
            }
        },
        createPdfUrl(fileData) {
            // Decodificando a string base64 para um arquivo binário
            const byteCharacters = atob(fileData); // Converte a string base64 para binário
            const byteArrays = [];

            for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
                const slice = byteCharacters.slice(offset, offset + 1024);
                const byteNumbers = new Array(slice.length);

                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            // Criando um objeto Blob com os dados binários
            const blob = new Blob(byteArrays, { type: 'application/pdf' });

            // Gerando um URL temporário para o arquivo
            this.pdfUrl = URL.createObjectURL(blob);
        }
    }

};
</script>


<style scoped>
#activity {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


</style>