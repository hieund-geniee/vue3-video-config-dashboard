<template>
    <div class="create-employee container-fluid">
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <p class="text-uppercase text-sm">Config Tag Information</p>
                        <div class="row">
                            <div class="col-md-4">
                                <BaseInput
                                    label="Zone Id"
                                    v-model="v$.formData.zoneID.$model"
                                    :errors="v$.formData.zoneID.$errors"
                                    :isValidData="!v$.formData.zoneID.$invalid"
                                />
                            </div>
                            <div class="col-md-4">
                                <BaseSelect
                                    label="Type"
                                    v-model="v$.formData.selectedType.$model"
                                    :errors="v$.formData.selectedType.$errors"
                                    :isValidData="!v$.formData.selectedType.$invalid"
                                    :options="arrType"
                                    class="text-capitalize"
                                />
                            </div>
                            <div class="col-md-4">
                                <BaseSelect
                                    label="Position"
                                    v-model="v$.formData.selectedPosition.$model"
                                    :errors="v$.formData.selectedPosition.$errors"
                                    :isValidData="!v$.formData.selectedPosition.$invalid"
                                    :options="arrPosition"
                                    class="text-capitalize"
                                />
                            </div>
                            <div class="col-md-4">
                                <BaseInput
                                    label="Tag Call Time"
                                    v-model="v$.formData.tagCallTime.$model"
                                    :errors="v$.formData.tagCallTime.$errors"
                                    :isValidData="!v$.formData.tagCallTime.$invalid"
                                />
                            </div>
                            <div class="col-md-4">
                                <BaseSelect
                                    label="Ad Time Position"
                                    v-model="v$.formData.selectedAdTimePosition.$model"
                                    :errors="v$.formData.selectedAdTimePosition.$errors"
                                    :isValidData="!v$.formData.selectedAdTimePosition.$invalid"
                                    :options="arrAdTimePosition"
                                    class="text-capitalize"
                                />
                            </div>
                            <div class="col-md-4">
                                <BaseSelect
                                    label="Passback Mode"
                                    v-model="v$.formData.selectedPassBackMode.$model"
                                    :errors="v$.formData.selectedPassBackMode.$errors"
                                    :isValidData="!v$.formData.selectedPassBackMode.$invalid"
                                    :options="arrPassBackMode"
                                    class="text-capitalize"
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <BaseInput
                                    label="URL source video"
                                    v-model="v$.formData.urlSourceVideo.$model"
                                    :errors="v$.formData.urlSourceVideo.$errors"
                                    :isValidData="!v$.formData.urlSourceVideo.$invalid"
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div v-for="(item,index) in fields" :key="item">
                                <label for="tag" class="form-control-label">
                                    Tag {{ index + 1 }}
                                </label>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="item.tag">
                                </div>
                            </div>
                            <div>
                                <button type="button" class="btn btn-danger btn-sm" @click="removeField">
                                    <i class="fas fa-ban"></i>
                                </button>&nbsp;
                                <button type="button" class="btn btn-success btn-sm" @click="addField">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>

                        <div class="d-flex justify-content-center">
                            <button
                                type="button"
                                :disabled="v$.$invalid"
                                class="btn btn-primary btn-lg"
                                @click="clickHandler"
                            >
                                Generate Tag
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card card-profile">
                    <div class="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3">
                        <div class="col-md-12">
                            <label class="form-control-label">
                                Ads Tag
                            </label>
                            <textarea
                                class="form-control"
                                rows="15"
                            ></textarea>
                        </div>
                        <p></p>
                        <button
                            type="button"
                            class="btn btn-primary btn-lg"
                            @click="clickHandler"
                        >
                            Copy Tag
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import useVuelidate from "@vuelidate/core";
import {required, email, minLength} from "@vuelidate/validators";

import BaseInput from "@/components/Forms/BaseInput.vue";
import BaseSelect from "@/components/Forms/BaseSelect.vue";

export default defineComponent({
    name: "VideoConfigCard",
    components: {
        BaseInput,
        BaseSelect,
    },
    setup() {
        let isAlertShow = false;
        const copyToClipBoard = (textToCopy: string) => {
            isAlertShow = !isAlertShow
            textToCopy = decodeHtml(textToCopy)
            navigator.clipboard.writeText(textToCopy);
            setTimeout(() => isAlertShow = false, 1300)
        }

        const decodeHtml = (html: string) => {
            let txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        }
        return {
            v$: useVuelidate(),
            copyToClipBoard,
            decodeHtml,
            isAlertShow
        };
    },
    watch: {
        formData: {
            handler(value) {
                this.$emit("formData", value);
            },
            deep: true,
            immediate: true,
        },
    },
    data() {
        return {
            arrType: [
                'vslider',
                'inread',
                'sticky'
            ],
            arrPosition: [
                'bottom-left',
                'top-right',
                'top-left',
                'bottom-right',
            ],
            arrAdTimePosition: [
                'mid-roll',
                'post-roll',
            ],
            arrPassBackMode: [
                'banner',
                'video',
            ],
            formData: {
                zoneID: "",
                selectedType: "",
                selectedPosition: "",
                tagCallTime: "",
                selectedAdTimePosition: "",
                selectedPassBackMode: "",
                urlSourceVideo: "",
            },
            fields: [
                {tag: ''}
            ],
        };
    },
    validations() {
        return {
            formData: {
                zoneID: {required, minLength: minLength(4)},
                urlSourceVideo: {required, minLength: minLength(4)},
                selectedType: {required},
                selectedPosition: {required},
                selectedAdTimePosition: {required},
                selectedPassBackMode: {required},
                tagCallTime: {required},
            },
        };
    },
    methods: {
        clickHandler() {
            if (this.v$.$invalid) {
                return;
            }
            console.log(this.formData);
        },
        addField() {
            this.fields.push({tag: ''});
        },
        removeField() {
            if (this.fields.length > 1) {
                this.fields.pop();
            }
        },
    },
});
</script>
