<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover"
                @ready="ready = true"
                ref="form">
                <template v-slot:actions
                    v-if="ready">
                    <a class="button is-warning"
                        @click="$router.push({
                            name: 'system.roles.configure',
                            params: { role: $refs.form.routeParam('role') }
                        })">
                        <span class="is-hidden-mobile">
                            {{ i18n('Configure') }}
                        </span>
                        <span class="icon">
                            <fa icon="sliders-h"/>
                        </span>
                        <span class="is-hidden-mobile"/>
                    </a>
                    <a class="button is-link"
                        @click="writeConfig">
                        <span class="is-hidden-mobile">
                            {{ i18n('File') }}
                        </span>
                        <span class="icon">
                            <fa icon="save"/>
                        </span>
                        <span class="is-hidden-mobile"/>
                    </a>
                </template>
            </enso-form>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSave, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { EnsoForm } from '@enso-ui/forms/bulma';

library.add([faSave, faSlidersH]);

export default {
    name: 'Edit',

    inject: ['errorHandler', 'i18n'],

    components: { EnsoForm },

    data: () => ({
        ready: false,
    }),

    methods: {
        writeConfig() {
            axios.post(route('system.roles.writeConfig', this.$refs.form.routeParam('role')))
                .then(({ data }) => this.$toastr.success(data.message))
                .catch(this.errorHandler);
        },
    },
};
</script>
