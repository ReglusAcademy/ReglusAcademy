<template>
    <NavReglus />
    <div id="account">
        <div class="descUser">
            <h1>Confira e atualize as informações da sua conta, <br> {{ userName }}.</h1>
            <div class="imgProfileContainer">
                <img :src="defaultProfileImage" alt="Imagem de perfil" class="imgProfile" @click="openModal" />
                <i class="fa fa-pencil edit-icon"></i>
            </div>
            <p>Email: {{ userEmail }}</p>
            <p>Nível educacional cadastrado: {{ translatedEducationLevel }}</p>
            <p>Data de nascimento: {{ userBirthDate }}</p>
            <p>Instituição de Ensino: {{ instituteName }}</p>
            <p>Deficiência: {{ translatedDisability }}</p>
        </div>

        <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <form id="uploadForm" enctype="multipart/form-data" @submit.prevent="handleSubmit">
                    <h2>Escolha sua nova foto</h2>

                    <div class="optionUpload">
                        <div class="avatars">
                            <div v-for="avatar in avatars" :key="avatar.id" class="avatar" @click="selectAvatar(avatar)"
                                :class="{ 'selected': selectedAvatar === avatar }">
                                <img :src="avatar.image" :alt="avatar.name" />
                            </div>
                        </div>

                        <div class="uploadImage">
                            <label for="profileImage">Ou selecione uma imagem do seu computador:</label>
                            <input type="file" id="profileImage" name="profileImage" accept="image/*"
                                @change="handleFileChange" ref="profileImage">

                            <div v-if="previewImage" class="imgPreview">
                                <h4>Pré-visualização da imagem:</h4>
                                <img :src="previewImage" alt="Imagem de preview" />
                            </div>
                        </div>
                    </div>

                    <button type="submit">Atualizar</button>
                    <button type="button" @click="closeModal">Cancelar</button>
                </form>
            </div>
        </div>

        <SocialAspects @show-success="showNotification('success')" @show-refresh="showNotification('refresh')" />
        <HealthWellbeing @show-success="showNotification('success')" @show-refresh="showNotification('refresh')" />
        <StudyHabits @show-success="showNotification('success')" @show-refresh="showNotification('refresh')" />
        <InterestHobby @show-success="showNotification('success')" @show-refresh="showNotification('refresh')" />
        <SelfAssessment @show-success="showNotification('success')" @show-refresh="showNotification('refresh')" />
    </div>
</template>

<script>
import NavReglus from "@/components/nav/NavIn.vue";
import SocialAspects from "@/components/card/ficha/SocialAspects.vue";
import HealthWellbeing from "@/components/card/ficha/HealthWellbeing.vue";
import StudyHabits from "@/components/card/ficha/StudyHabits.vue";
import InterestHobby from "@/components/card/ficha/InterestHobby.vue";
import SelfAssessment from "@/components/card/ficha/SelfAssessment.vue";

export default {
    name: "ReglusConta",
    components: {
        NavReglus,
        SocialAspects,
        HealthWellbeing,
        StudyHabits,
        InterestHobby,
        SelfAssessment
    },
    data() {
        return {
            userName: '',
            userEmail: '',
            userEducationLevel: '',
            userBirthDate: '',
            instituteName: '',
            userDisability: 'Nada definido',
            userImage: null,
            defaultImageMale: require('@/assets/content/avatar/11.png'),
            defaultImageFemale: require('@/assets/content/avatar/10.png'),
            defaultImageOther: require('@/assets/content/avatar/12.png'),
            userRole: '',

            avatars: [
                { id: 1, name: 'Avatar 1', image: require('@/assets/content/avatar/1.png') },
                { id: 2, name: 'Avatar 2', image: require('@/assets/content/avatar/2.png') },
                { id: 3, name: 'Avatar 3', image: require('@/assets/content/avatar/3.png') },
                { id: 3, name: 'Avatar 4', image: require('@/assets/content/avatar/4.png') },
                { id: 3, name: 'Avatar 5', image: require('@/assets/content/avatar/5.png') },
                { id: 3, name: 'Avatar 6', image: require('@/assets/content/avatar/6.png') },
                { id: 3, name: 'Avatar 7', image: require('@/assets/content/avatar/7.png') },
                { id: 3, name: 'Avatar 8', image: require('@/assets/content/avatar/8.png') },
                { id: 3, name: 'Avatar 9', image: require('@/assets/content/avatar/9.png') },
            ],
            selectedAvatar: null,
            selectedFile: null,
            isModalOpen: false,
            previewImage: null,

            form: {
                livingWith: '',
                relationshipWithClassmates: "MUITO_BOA",
                relationshipWithTeachers: "MUITO_BOA",
                relationshipWithFamily: "MUITO_BOA"
            },
            selectedLivingWith: [],
            livingWithOptions: [
                { value: 'pais', label: 'Pais' },
                { value: 'avos', label: 'Avós' },
                { value: 'tios', label: 'Tios' },
                { value: 'irmaos', label: 'Irmãos' },
                { value: 'outros', label: 'Outros' },
            ],
            socialId: null
        };
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        const userType = localStorage.getItem('userType');

        console.log(user)

        this.userRole = userType || '';

        if (!user) {
            this.$router.push('/');
        } else {
            this.getProfileImage(user.userId);
            this.profileImage = user.profileImage;
            this.userName = user.name;
            this.userEmail = user.email;
            this.userEducationLevel = user.educationLevel;
            this.userBirthDate = this.formatDate(user.dateBirth);
            this.instituteName = user.instituteName;
            this.userDisability = user.disability === "false" ? "Nada definido" : user.disability;
        }

        if (user.gender === 'MALE') {
            this.userImage = this.defaultImageMale;
        } else if (user.gender === 'FEMALE') {
            this.userImage = this.defaultImageFemale;
        } else {
            this.userImage = this.defaultImageOther;
        }
    },
    computed: {
        defaultProfileImage() {
            if (this.userImage) {
                return this.userImage;
            }

            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.gender) {
                if (user.gender === 'MALE') {
                    return this.defaultImageMale;
                } else if (user.gender === 'FEMALE') {
                    return this.defaultImageFemale;
                } else {
                    return this.defaultImageOther;
                }
            }

            return this.defaultImageOther;
        },

        translatedEducationLevel() {
            const educationMap = {
                'Elementary': 'Ensino Fundamental',
                'Undergraduate': 'Superior Completo',
                'Incomplete': 'Superior Incompleto',
                'Graduate': 'Pós-graduação',
                'Master': 'Mestrado',
                'Doctorate': 'Doutorado',
            };
            return educationMap[this.userEducationLevel] || this.userEducationLevel;
        },

        translatedDisability() {
            const disabilityMap = {
                'YES': 'Sim',
                'NO': 'Não'
            };
            return disabilityMap[this.userDisability] || this.userDisability;
        }
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },

        closeModal() {
            this.isModalOpen = false;
        },

        formatDate(dateString) {
            const [year, month, day] = dateString.split('-');
            return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
        },

        showNotification(type) {
            const notificationId = type === 'success' ? 'success-message' : 'refresh-success-message';
            const notificationElement = document.getElementById(notificationId);

            if (notificationElement) {
                notificationElement.style.display = 'block';
                notificationElement.classList.add('show');

                setTimeout(() => {
                    notificationElement.classList.remove('show');
                    setTimeout(() => {
                        notificationElement.style.display = 'none';
                    }, 500);
                }, 3000);
            }
        },

        selectAvatar(avatar) {
            this.selectedAvatar = avatar;
            this.selectedFile = null;
        },

        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onloadend = () => {
                    this.previewImage = reader.result;
                };

                reader.readAsDataURL(file);

                this.selectedFile = file;
                this.selectedAvatar = null;
            } else {
                this.previewImage = null;
            }
        },

        async handleSubmit() {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user.userId;

            if (!this.selectedFile && !this.selectedAvatar) {
                alert("Selecione uma imagem ou um avatar.");
                return;
            }

            try {
                await this.uploadProfileImage(userId);
            } catch (error) {
                console.error("Erro ao enviar a imagem:", error);
                alert("Ocorreu um erro ao enviar a imagem.");
            }
        },

        async uploadProfileImage(userId) {
            let imageToUpload = null;

            if (this.selectedAvatar) {
                const response = await fetch(this.selectedAvatar.image);
                imageToUpload = await response.blob();
            } else if (this.selectedFile) {
                imageToUpload = this.selectedFile;
            } else {
                alert("Por favor, selecione uma imagem ou um avatar.");
                return;
            }

            const formData = new FormData();
            formData.append("profileImage", imageToUpload);

            try {
                const response = await fetch(`http://localhost:8080/api/users/${userId}/image`, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    alert("Imagem de perfil atualizada com sucesso.");
                    this.closeModal();
                    window.location.reload();
                } else {
                    alert("Erro ao atualizar a imagem de perfil.");
                }
            } catch (error) {
                console.error("Erro ao carregar imagem:", error);
                alert("Erro ao carregar imagem.");
            }
        },


        async getProfileImage(userId) {
            try {
                const savedBase64 = localStorage.getItem('profileImage');

                if (savedBase64) {
                    const response = await fetch(`http://localhost:8080/api/users/${userId}/image`);
                    const serverBlob = await response.blob();

                    if (response.ok) {
                        const serverBase64 = await this.blobToBase64(serverBlob);

                        if (savedBase64 === serverBase64) {
                            this.userImage = `data:image/jpeg;base64,${savedBase64}`;
                            return;
                        }
                    }
                }

                const response = await fetch(`http://localhost:8080/api/users/${userId}/image`);
                if (response.ok) {
                    const serverBlob = await response.blob();
                    const newBase64 = await this.blobToBase64(serverBlob);

                    this.userImage = `data:image/jpeg;base64,${newBase64}`;
                    localStorage.setItem('profileImage', newBase64);
                } else {
                    this.userImage = null;
                }
            } catch (error) {
                console.error("Erro ao carregar a imagem de perfil:", error);
                this.userImage = null;
            }
        },

        async blobToBase64(blob) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onloadend = () => {
                    resolve(reader.result.split(',')[1]);
                };

                reader.onerror = () => {
                    reject(new Error('Erro ao converter o Blob para Base64'));
                };

                reader.readAsDataURL(blob);
            });
        },

    }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 800px;
    max-width: 100%;
    text-align: center;
}

.optionUpload {
    display: flex;
    flex-direction: row;
}

.uploadImage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.imgProfileContainer {
    position: relative;
    display: inline-block;
}

.imgProfile {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
    transition: filter 0.3s ease;
}

.imgProfile:hover {
    filter: brightness(50%);
}

.edit-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.imgProfileContainer:hover .edit-icon {
    opacity: 1;
}

.avatars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 1em;
}

.avatar {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

.avatar.selected {
    transform: scale(1.1);
}

.avatar img,
.imgPreview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
}

.imgPreview img {
    width: 200px;
    height: 200px;
}

.avatar.selected img {
    border: 2px solid #4caf50;
}

.avatar:hover {
    transform: scale(1.05);
}

#account,
#uploadForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.descUser {
    text-align: center;
}

h1 {
    text-align: center;
}

#ficha {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    width: 100%;
    font-size: 1.1em;
}

label {
    margin-bottom: 5px;
}

input,
select {
    transition: 0.3s;
}

input:focus,
input:active,
select:focus,
select:active {
    border: 1px solid var(--branco);
    box-shadow: 0 1px 0 0 var(--branco);
    color: var(--lilas);
    font-weight: bold;
    transition: 0.3s;
}

input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-bottom: -5px;
    border: none;
    border-radius: 3px;
    background-color: #fff;
    appearance: none;
    transition: background-color 0.3s, border-color 0.3s;
}

input[type="checkbox"]:checked {
    background-color: var(--lilas);
    border-color: #fff;
}

.form-group {
    padding-bottom: 10px;
}

.btn {
    display: flex;
    justify-content: center;
}

.notification {
    display: none;
    background-color: #4caf50;
    color: white;
    padding: 10px;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: opacity 0.5s ease, transform 0.5s ease;
    opacity: 0;
    transform: translateY(-10px);
}

.notification.show {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

.notification-success {
    background-color: #4caf50;
}

.notification-refresh {
    background-color: #2196f3;
}
</style>