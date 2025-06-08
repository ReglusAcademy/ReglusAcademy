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
body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa; 
  color: #343a40;
  margin: 0;
  padding: 0;
}

h2 {
  font-size: 2.5em;
  color: var(--roxo); 
  margin-bottom: 1.5em;
  text-align: center;
  width: 100%; 
}

h3 {
  font-size: 1.8em;
  color: #495057; 
  margin-top: 2em;
  margin-bottom: 1em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #e9ecef;
  text-align: center;
}

p {
  line-height: 1.6;
  margin-bottom: 0.8em;
}

strong {
  color: #212529; 
}

#activity {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2em;
  margin: 2em auto;
  max-width: 800px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.12);
  border: 1px solid #e0e0e0;
}

#activity > div {
  width: 100%;
  padding: 0 1em;
  box-sizing: border-box;
}

embed {
  width: 100%;
  height: 500px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  margin-top: 1.5em;
  display: block;
}

p {
  text-align: left;
}

#activity > p {
  text-align: center;
  font-style: italic;
  color: #6c757d;
  margin-top: 1.5em;
}

#activity > div[v-else-if]:first-of-type {
  text-align: center;
  font-weight: bold;
  color: #dc3545;
  margin-top: 2em;
  font-size: 1.2em;
}
</style>