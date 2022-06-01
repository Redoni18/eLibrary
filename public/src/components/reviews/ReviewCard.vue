<template>
    <b-card>
    <div class="review-add__container">
        <div class="review-add__info">
            <h1><b-badge variant="light">{{title}} by {{author}}</b-badge></h1>
                <p>Reviewed by: <b-badge variant="dark">{{username}}</b-badge></p>
                <p>{{review}}</p>
        </div>
        <div class="review-add__textarea">
            <b-form-textarea
            v-if="false"
                id="textarea"
                v-model="review"
                :state="review.length >= 10"
                placeholder="Change you're review.."
                rows="3"
                max-rows="6"/>
            <!-- <div class="textarea__buttons">
                <div class="buttons-cont">
                    <b-button :variant="variant" @click="validate()">{{button}}</b-button>
                    <b-button v-if="review.length >= 10" variant="success" @click="submit()">Submit</b-button>
                </div>
            </div> -->
        </div>
    </div>
</b-card>
</template>

<script>
export default{
    props:{
        title:{
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        review: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
        },
    }
}
</script>