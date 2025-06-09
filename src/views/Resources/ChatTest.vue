<template>
  <div class="chat-test-container">
    <h2>Teste de Conexão WebSocket</h2>
    <p v-if="isConnected" style="color: green;">Conectado ao WebSocket!</p>
    <p v-else style="color: red;">Desconectado ou conectando...</p>

    <div class="messages" ref="messagesContainer">
      <h3>Mensagens Recebidas:</h3>
      <div
        v-for="(msg, index) in receivedMessages"
        :key="index"
        :class="['message-item', { 'my-message': msg.senderId === myUserId }]"
      >
        <div class="message-header">
          <strong>{{ msg.senderName || msg.senderId }}</strong>
          <span class="message-timestamp">{{ formatTimestamp(msg.timestamp) }}</span>
        </div>
        <div class="message-content">{{ msg.content }}</div>
      </div>
    </div>

    <div class="input-area">
      <input
        v-model="messageContent"
        placeholder="Digite uma mensagem..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Enviar</button>
    </div>

    <div class="info-area">
      <p>Seu ID: <input v-model="myUserId" placeholder="Seu User ID" /></p>
      <p>ID Destino: <input v-model="targetUserId" placeholder="Target User ID" /></p>
      <button @click="getConversationAndConnect">Obter/Criar Conversa e Conectar</button>
      <p v-if="conversationId">ID da Conversa: {{ conversationId }}</p>
    </div>

    <p v-if="error" style="color: red;">Erro: {{ error }}</p>
  </div>
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

export default {
  name: 'ChatTest',
  data() {
    return {
      stompClient: null,
      isConnected: false,
      receivedMessages: [], // Aqui serão armazenadas as mensagens do histórico + as novas via WebSocket
      messageContent: '',
      myUserId: '3', // PREENCHA COM SEU ID DE TESTE (Educador)
      targetUserId: '1', // PREENCHA COM OUTRO ID DE TESTE (Estudante)
      conversationId: null,
      error: null,
    };
  },
  async mounted() {
    // Chamamos a função combinada no mounted
    await this.getConversationAndConnect();
  },
  beforeUnmount() {
    if (this.stompClient && this.isConnected) {
      this.stompClient.disconnect();
    }
  },
  watch: {
    // Observa mudanças nas mensagens para rolar para o final
    receivedMessages: {
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      deep: true, // Observa mudanças profundas dentro do array
    },
  },
  methods: {
    async getConversationAndConnect() {
      // 1. Obter/Criar a Conversa
      await this.getConversationId();

      // 2. Se a conversa foi obtida com sucesso, buscar o histórico
      if (this.conversationId) {
        await this.fetchChatHistory();
        // 3. Conectar ao WebSocket somente após o histórico ser carregado
        this.connectWebSocket();
      }
    },

    async getConversationId() {
      this.error = null;
      if (!this.myUserId || !this.targetUserId) {
        this.error = 'Por favor, preencha ambos os User IDs.';
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/api/chat/conversation/${this.myUserId}/${this.targetUserId}`);
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        this.conversationId = data.conversationId;
        console.log('Conversa obtida/criada:', data);
      } catch (err) {
        this.error = `Erro ao obter/criar conversa: ${err.message}`;
        console.error(this.error, err);
      }
    },

    async fetchChatHistory() {
      if (!this.conversationId) {
        this.error = 'Conversation ID não disponível para buscar histórico.';
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/api/chat/history/${this.conversationId}`);
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
        }
        const history = await response.json();
        // Adiciona as mensagens do histórico ao array, garantindo que sejam objetos completos
        this.receivedMessages = history;
        console.log('Histórico de chat carregado:', history);
      } catch (err) {
        this.error = `Erro ao carregar histórico: ${err.message}`;
        console.error(this.error, err);
      }
    },

    connectWebSocket() {
      this.error = null;
      if (!this.conversationId) {
        this.error = 'Conversation ID não disponível. Obtenha a conversa primeiro.';
        return;
      }

      const socket = new SockJS('http://localhost:8080/ws-chat');
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect(
        {},
        frame => {
          this.isConnected = true;
          console.log('Conectado ao WebSocket:', frame);
          this.error = null;

          this.stompClient.subscribe(`/user/${this.myUserId}/queue/private`, message => {
            const receivedMsg = JSON.parse(message.body);
            // Adiciona a nova mensagem ao final da lista de mensagens
            this.receivedMessages.push(receivedMsg);
            console.log('Mensagem recebida via WebSocket:', receivedMsg);
            // Marcar como lida, se a mensagem for do outro usuário e não for de status
            if (receivedMsg.senderId !== this.myUserId && receivedMsg.type === 'CHAT') {
                // Você pode coletar IDs e marcar em lote ou marcar um a um
                // this.markMessageAsRead([receivedMsg.id], this.myUserId);
            }
          });

          this.stompClient.send(
            "/app/joinChat",
            JSON.stringify({
              senderId: this.myUserId,
              senderName: `Usuário ${this.myUserId}`,
              type: 'JOIN',
              conversationId: this.conversationId, // Envia o ID da conversa no JOIN
            }),
            {}
          );
        },
        error => {
          this.isConnected = false;
          this.error = `Erro de conexão WebSocket: ${error.reason || error}`;
          console.error('Erro de conexão WebSocket:', error);
          setTimeout(() => this.connectWebSocket(), 5000);
        }
      );
    },

    sendMessage() {
      if (!this.stompClient || !this.isConnected) {
        this.error = 'Não conectado ao WebSocket. Por favor, conecte-se primeiro.';
        return;
      }
      if (!this.messageContent.trim()) {
        return;
      }
      if (!this.conversationId) {
        this.error = 'Conversation ID não disponível. Obtenha a conversa primeiro.';
        return;
      }

      const chatMessage = {
        type: 'CHAT',
        content: this.messageContent.trim(),
        senderId: this.myUserId,
        senderName: `Usuário ${this.myUserId}`,
        receiverId: this.targetUserId,
        conversationId: this.conversationId,
      };

      this.stompClient.send("/app/privateMessage", JSON.stringify(chatMessage), {});
      this.messageContent = '';
    },

    formatTimestamp(isoString) {
      if (!isoString) return '';
      // Cria um objeto Date a partir da string ISO
      const date = new Date(isoString);
      // Formata a data e hora para um formato legível (DD/MM/AAAA HH:MM)
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },

    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },

    // Opcional: Implementar markMessageAsRead
    // async markMessageAsRead(messageIds, readerId) {
    //   if (messageIds && messageIds.length > 0) {
    //     try {
    //       const response = await fetch(`http://localhost:8080/api/chat/messages/read/${readerId}`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(messageIds),
    //       });
    //       if (!response.ok) throw new Error('Falha ao marcar mensagens como lidas.');
    //       console.log('Mensagens marcadas como lidas:', messageIds);
    //     } catch (err) {
    //       console.error('Erro ao marcar mensagens como lidas:', err);
    //     }
    //   }
    // }
  },
};
</script>

<style scoped>
.chat-test-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 550px; /* Altura mínima para o container do chat */
}

h2, h3 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.messages {
  flex-grow: 1; /* Faz com que a área de mensagens ocupe o espaço disponível */
  height: 300px; /* Altura padrão, mas o flex-grow vai expandir */
  border: 1px solid #eee;
  overflow-y: auto; /* Rolagem automática para mensagens */
  padding: 10px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
  display: flex; /* Para flexbox interno das mensagens */
  flex-direction: column; /* Mensagens em coluna */
}

.message-item {
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 15px; /* Bordas mais arredondadas para estilo de balão */
  max-width: 70%; /* Limita a largura do balão da mensagem */
  word-wrap: break-word; /* Quebra palavras longas */
  background-color: #e6e6e6; /* Cor padrão para mensagens */
  align-self: flex-start; /* Mensagens do outro usuário à esquerda */
}

.message-item.my-message {
  background-color: #dcf8c6; /* Cor diferente para suas próprias mensagens (verde claro) */
  align-self: flex-end; /* Suas mensagens à direita */
  margin-left: auto; /* Empurra para a direita */
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.message-header strong {
  font-weight: bold;
  color: #007bff; /* Azul para o nome do remetente */
  font-size: 0.9em;
}

.my-message .message-header strong {
  color: #218838; /* Verde para o nome do remetente das suas mensagens */
}

.message-timestamp {
  font-size: 0.75em;
  color: #888;
  margin-left: 10px;
}

.message-content {
  font-size: 1em;
  color: #333;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-top: 15px; /* Espaçamento após a área de mensagens */
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.input-area input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
}

.input-area button {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.input-area button:hover {
  background-color: #218838;
}

.info-area {
  background-color: #eaf6ff;
  border: 1px solid #b3e0ff;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

.info-area input {
  padding: 8px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.info-area button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.info-area button:hover {
  background-color: #0056b3;
}
</style>