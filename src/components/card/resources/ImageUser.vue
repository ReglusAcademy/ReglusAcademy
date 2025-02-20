<template>
    <img :src="defaultProfileImage" alt="Imagem de perfil" class="imgProfile" />
</template>

<script>
export default {
    name: "UserImage",
    data() {
        return {
            userName: '',
            userImage: '',
            defaultImageMale: require('@/assets/content/avatar/11.png'),
            defaultImageFemale: require('@/assets/content/avatar/10.png'),
            defaultImageOther: require('@/assets/content/avatar/12.png'),
        };
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.userImage = null;
        this.userImage = user.userImage;
        this.getProfileImage(user.userId);
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
        }
    },
    methods: {
        async getProfileImage(userId) {
            try {
                const savedBase64 = localStorage.getItem('profileImage');

                if (savedBase64) {
                    const response = await fetch(`http://localhost:8080/api/users/${userId}/image`);

                    if (!response.ok) {
                        if (response.status !== 404) {
                            console.error("Erro ao tentar carregar a imagem do perfil:", response.statusText);
                        }
                        return;
                    }

                    const serverBlob = await response.blob();
                    const serverBase64 = await this.blobToBase64(serverBlob);

                    if (savedBase64 === serverBase64) {
                        this.userImage = `data:image/jpeg;base64,${savedBase64}`;
                        return;
                    }
                }

                const response = await fetch(`http://localhost:8080/api/users/${userId}/image`);

                if (response.ok) {
                    const serverBlob = await response.blob();
                    const newBase64 = await this.blobToBase64(serverBlob);

                    this.userImage = `data:image/jpeg;base64,${newBase64}`;
                    localStorage.setItem('profileImage', newBase64);
                } else if (response.status === 404) {
                    this.userImage = null;
                } else {
                    console.error("Erro inesperado ao carregar a imagem de perfil:", response.statusText);
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
<style>
.imgProfile {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
}

.image {
    width: 100px;
    height: auto;
}
</style>