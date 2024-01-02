<template>
    <div class="container-fluid">
        <div class="card shadow-lg mb-2 color-geniee">
            <div class="card-body p-3">
                <div class="row gx-4">
                    <div class="col-auto my-auto">
                        <div class="h-100">
                            <h5 class="mb-1 text-geniee">GENIEE VPAID VIDEO CONFIG</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <VideoConfigCard @formData="formData = $event"/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import VideoConfigCard from "@/components/VideoConfig/VideoConfigCard.vue";

export default defineComponent({
    components: {
        VideoConfigCard,
    },
    data() {
        return {
            formData: null,
        };
    },
});
</script>

<style scoped>
.color-geniee{
    background-color:#07519c;
}

.text-geniee{
    color:#fff;
    font-weight:bold;
}
</style>
