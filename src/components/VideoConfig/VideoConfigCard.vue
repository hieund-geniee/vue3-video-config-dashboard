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
                                    v-model="formData.selectedType"
                                    :options="arrType"
                                    class="text-capitalize"
                                />
                            </div>
                            <div class="col-md-4">
                                <BaseSelect
                                    label="Position"
                                    v-model="formData.selectedPosition"
                                    :options="arrPosition"
                                    class="text-capitalize"
                                />
                            </div>
                            <div class="col-md-4">
                                <BaseInput
                                    label="Tag Call Time"
                                    v-model="formData.tagCallTime"

                                />
                            </div>
                            <div class="col-md-4">
                                <BaseSelect
                                    label="Ad Time Position"
                                    v-model="formData.selectedAdTimePosition"
                                    :options="arrAdTimePosition"
                                    class="text-capitalize"
                                />
                            </div>
                            <div class="col-md-4">
                                <BaseSelect
                                    label="Passback Mode"
                                    v-model="formData.selectedPassBackMode"
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
                                    <input type="text"
                                           class="form-control"
                                           v-model="item.tag"
                                           :class="{
                                                'is-invalid': v$.fields.$each.$response.$errors[index].tag.length >= 1,
                                                'is-valid': v$.fields.$each.$response.$invalid
                                              }"
                                    >
                                    <div class="invalid-feedback mb-2">
                                      <span v-for="error in v$.fields.$each.$response.$errors[index].tag"
                                            :key="error">
                                        {{ error.$message }}
                                      </span>
                                    </div>
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
                                class="btn btn-primary btn-lg"
                                @click="generateTag()"
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
                                v-html="adsContent"
                            ></textarea>
                        </div>
                        <p></p>
                        <button
                            type="button"
                            class="btn btn-primary btn-lg"
                            @click="copyToClipBoard(adsContent)"
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
import {required, minLength, helpers, url} from "@vuelidate/validators";

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
                selectedType:  'vslider',
                selectedPosition: 'bottom-left',
                tagCallTime: "",
                selectedAdTimePosition: 'mid-roll',
                selectedPassBackMode: 'banner',
                urlSourceVideo: "",
            },
            fields: [
                {tag: ''}
            ],
            adsContent: ""

        };
    },
    validations() {
        return {
            formData: {
                zoneID: {required, minLength: minLength(4)},
                urlSourceVideo: {required, minLength: minLength(4)},
            },
            fields: {
                $each: helpers.forEach({
                    tag: {
                        required, url
                    }
                })
            }
        };
    },
    methods: {
        async generateTag() {
            const isFormCorrect = await this.v$.$validate()
            if (!isFormCorrect) return
            let arrayTag: string[] = [];
            this.fields.forEach((value) => {
                arrayTag.push(`"` + value.tag + `"`);
            });
            let config = `
                var gniVSConfigs = {
                    zoneID          : "${this.formData.zoneID}",
                    type            : "${this.formData.selectedType}",
                    position        : "${this.formData.selectedPosition}",
                    adTimePosition  : "${this.formData.selectedAdTimePosition}",
                    passbackMode    : "${this.formData.selectedPassBackMode}",
                    urlSourceVideo  : "${this.formData.urlSourceVideo}",
                    tags            : [${arrayTag}],
                    `;

            if(this.formData.tagCallTime) {
                config += `tagCallTime : "${this.formData.tagCallTime}",`
            }
            config += `\n}\n`

            let sourceScript = `&lt;script&gt; src="./video-adx.js" &lt;/script&gt;`;

            this.adsContent = "&lt;script&gt;" + config + "&lt;/script&gt;\n" + sourceScript;
        },
        addField() {
            this.fields.push({tag: ''});
        },
        removeField() {
            if (this.fields.length > 1) {
                this.fields.pop();
            }

            this.generateTag()
        },
    },
});
</script>

