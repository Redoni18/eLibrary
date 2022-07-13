<template>

<div>
<mdb-card-group deck>
    <li v-for="(membership,index) in memberships" :index="index" :key="membership.id"> 
        <mdb-card>
            <mdb-card-body>
                <mdb-card-title>{{membership.userType.userType}} Membership</mdb-card-title>
                <mdb-card-text>{{membership.description}} </mdb-card-text>
                <mdb-card-text>Price: {{membership.price}}</mdb-card-text>
                <mdb-card-text>Duration: {{membership.duration}}</mdb-card-text>

                <mdb-btn size="md" v-b-modal.modal-1 :disabled="changedMembership" @click.native="showModal=true;" color="primary">{{!changedMembership ? 'Become a member' : 'You have a membership'}} </mdb-btn>
            </mdb-card-body>
        </mdb-card>
    </li>    
</mdb-card-group>

    <b-modal v-if="showModal" id="modal-1" title="Credit Card Information" ref="modal" @ok="handleOk">
        <form ref="form" @submit.stop.prevent="handleSubmit">
            <div class="form-group row">
                <label for="name" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Card Holder</label>
                <div class="col-sm-9 col-md-9 col-lg-9">
                    <input type="text" class="form-control form-control-sm" id="name" name="name" placeholder="Enter name"
                        v-model="name"
                        v-validate="'required|min:2|max:20'"
                        :class="{'name': true, 'is-invalid': errors.has('name') }">
                    <small v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</small>
                </div>
            </div>
            <div class="form-group row">
                <label for="number" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Card number</label>
                <div class="col-sm-9 col-md-9 col-lg-9">
                    <input type="text" class="form-control form-control-sm" id="number" name="number" placeholder="Enter card number"
                        v-model="number"
                        v-validate="'required|digits:16'"
                        :class="{'number': true, 'is-invalid': errors.has('number') }">
                    <small v-show="errors.has('number')" class="help is-danger">{{ errors.first('number') }}</small>
                </div>
            </div>
            <div class="form-group row">
                <label for="cvv" class="col-sm-3 col-md-3 col-lg-3 col-form-label">CVV</label>
                <div class="col-sm-9 col-md-9 col-lg-9">
                    <input type="password" class="form-control form-control-sm" id="cvv" name="cvv" placeholder="Enter cvv"
                        v-model="cvv"
                        v-validate="'required|digits:3'"
                        :class="{'cvv': true, 'is-invalid': errors.has('cvv') }">
                    <small v-show="errors.has('cvv')" class="help is-danger">{{ errors.first('cvv') }}</small>
                </div>
            </div>
        </form>
    </b-modal>
</div>


</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardImage, mdbCardHeader, mdbCardBody, mdbCardTitle, mdbCardText, mdbCardFooter, mdbCardUp, mdbCardAvatar, mdbCardGroup, mdbBtn, mdbView, mdbMask, mdbIcon } from 'mdbvue';
export default {
		name: 'Membership',
		components: {
			mdbContainer,
			mdbRow,
			mdbCol,
			mdbCard,
			mdbCardImage,
			mdbCardHeader,
			mdbCardBody,
			mdbCardTitle,
			mdbCardText,
			mdbCardFooter,
			mdbCardUp,
			mdbCardAvatar,
			mdbCardGroup,
			mdbBtn,
			mdbView,
			mdbMask,
			mdbIcon,
		},
        data() {
            return {
                showModal: false,
                changedMembership:null,
                memberships: [],
                myModal: '',
                selectedIndex: '',
                name: '',
                number:'',
                cvv: '',
            }
        },
        computed: {
            allMemberships() {
                return this.memberships
            },
            ...mapGetters({
                user: 'getUser'
            })
        },
        async mounted(){
            await this.fetchMemberships()
            const response = await this.get_membership(this.user.data.id)
            this.changedMembership = response.data.isMember
        }, 
        methods: {
            ...mapActions({
                get_membership: 'get_membership'
            }),
            async fetchMemberships(){
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        const response = await axios.get("http://localhost:8000/api/memberships")
                        this.memberships = response.data
                    }
                });
            },
            async handleOk() {
                await this.$validator.validateAll().then((result) => {
                    if (result) {
                        axios.put(`http://localhost:8000/api/updateMembership/${this.user.data.id}`, {_id:this.user.data.id,isMember: true})
                    }
                });
                const response = await this.get_membership(this.user.data.id)
                this.changedMembership = response.data.isMember
                this.$router.push('/')
            },
        }    
    }
</script>