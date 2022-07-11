<template>
    <div>
        <li v-for="(membership,index) in memberships" :index="index" :key="membership.id">        
            <b-card bg-variant="dark" text-variant="white" :title="`${membership.userType.userType} Membership`">
            <b-card-text>
                {{ membership.description }}
            </b-card-text>
            <b-card-text>
                {{ membership.price }}€
            </b-card-text>
            <b-button  v-b-modal.modal-1 @click="getIndex(index)">Become a member</b-button>
                <b-modal v-if="selectedIndex == index" id="modal-1" title="Credit Card Information" ref="modal" @ok="handleOk">
                    <form ref="form" @submit.stop.prevent="handleSubmit">
                        <b-form-group
                        label="Card Holder"
                        label-for="name-input"
                        :invalid-feedback="nameFeedback"
                        :state="nameState"
                        >
                        <b-form-input
                            id="name-input"
                            v-model="name"
                            :state="nameState"
                            required
                        ></b-form-input>
                        </b-form-group>
                        <b-form-group
                        label="Card Number"
                        label-for="number-input"
                        :invalid-feedback="numberFeedback"
                        :state="numberState"
                        >
                        <b-form-input
                            id="number-input"
                            v-model="number"
                            :state="numberState"
                            required
                        ></b-form-input>
                        </b-form-group>
                        <b-form-group
                        label="CVV"
                        label-for="cvv-input"
                        :invalid-feedback="cvvFeedback"
                        :state="cvvState"
                        >
                        <b-form-input
                            id="cvv-input"
                            v-model="cvv"
                            :state="cvvState"
                            required
                        ></b-form-input>
                        </b-form-group>
                    </form>
                </b-modal> 
            </b-card>
        </li>
</div>

</template>

<script>
import axios from 'axios'
export default {
    name: "Memberships",
    data() {
        return {
            user: JSON.parse(window.localStorage.getItem('user')),
            memberships: [],
            myModal: '',
            selectedIndex: '',
            name: '',
            nameState: null,
            number:'',
            numberState: null,
            cvv: '',
            cvvState: null,
            nameFeedback: '',
            numberFeedback: '',
            cvvFeedback: '',
        }
    },
    computed: {
        allMemberships() {
            return this.memberships
        }
    },

    async mounted(){
        await this.fetchMemberships()
    },

    methods: {

        async fetchMemberships(){
            this.$validator.validateAll().then( async (result) => {
                if (result) {
                    const response = await axios.get("http://localhost:8000/api/memberships")
                    this.memberships = response.data
                }
            });
        },
        getIndex(i){
            this.selectedIndex = i
        },
        checkFormValidity() {
            const valid = this.$refs.form[0].checkValidity()
            if(!this.name){
                this.nameState = valid
                this.nameFeedback = "Card holder is required"
            }else{
                this.nameState = null
            }
            if(!this.number || !(/^[0-9]{16}$/.test(this.number))){
                this.numberState = !valid
                this.numberFeedback = "Invalid card number"  
            }
            else{
                this.numberState = null
            }
            if(!this.cvv || !(/^[0-9]{3}$/.test(this.cvv))){
                this.cvvState = !valid
                this.cvvFeedback = "Invalid cvv"
            }
             else{
                this.cvvState = null
            }   
            return valid
            
        },
        handleOk(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        async handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
            return
            }
            await axios.put(`http://localhost:8000/api/updateMembership/${this.user.data.id}`, {_id:this.user.data.id,isMember: true})
            console.log(this.user.data)
            // this.$router.push({path:"/memberships"})
        },
        
    }
}
</script>

<style scoped>
li{
    list-style-type: none;
    margin-bottom: 5px;  
}
</style>