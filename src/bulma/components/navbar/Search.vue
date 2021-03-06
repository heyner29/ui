<template>
    <core-search>
        <template v-slot:default="{
                selected, tags, toggle, redirect, bindings, events
            }">
            <div class="navbar-item search">
                <typeahead is-rounded
                    v-bind="bindings"
                    v-on="events"
                    @selected="clear"
                    ref="typeahead">
                    <template v-slot:controls="{ items }">
                        <template v-if="items.length">
                            <div v-if="tags(items).length < 6"
                                class="dropdown-item has-text-centered">
                                <a v-for="(tag, index) in tags(items)"
                                    :key="index"
                                    class="tag control-list is-uppercase is-bold"
                                    :class="{ 'is-warning': selected(tag) }"
                                    @click.stop="toggle(tag)">
                                    {{ i18n(tag ) }}
                                </a>
                            </div>
                            <div v-else
                                class="has-text-centered">
                                <p class="title is-6">
                                    {{ i18n('Categories found') }}: {{ tags(items).length }}
                                </p>
                            </div>
                        </template>
                    </template>
                    <template v-slot:option="{ highlight, item }">
                        <span>
                            <span class="tag is-bold is-warning is-uppercase">
                                {{ i18n(item['group']) }}
                            </span>
                            <span v-html="highlight(item['label'])"/>
                            <span v-if="item.routes.length"
                                class="route-controls">
                                <span v-for="itemRoute in item.routes"
                                    :key="itemRoute.name"
                                    class="icon is-small route-control"
                                    @mousedown.stop="redirect(item, itemRoute.name); clear()">
                                    <fa :icon="itemRoute.icon" size="sm"/>
                                </span>
                            </span>
                        </span>
                    </template>
                </typeahead>
            </div>
        </template>
    </core-search>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faPencilAlt, faListUl } from '@fortawesome/free-solid-svg-icons';
import { Typeahead } from '@enso-ui/bulma';
import CoreSearch from '../../../core/components/navbar/Search.vue';

library.add(faEye, faPencilAlt, faListUl);

export default {
    name: 'Search',

    components: { CoreSearch, Typeahead },

    inject: ['i18n'],

    methods: {
        clear() {
            this.$nextTick(this.$refs.typeahead.clear());
        },
    },
};
</script>

<style lang="scss">
    .navbar-item.search {
        position: absolute;

        @media screen and (min-width: 1024px) {
            width: 34em;
            [dir='ltr'] & {
                left: calc(50% - 17em);
            }
            [dir='rtl'] & {
                right:calc(50% - 17em);
            }
        }
        @media screen and (min-width: 768px) and (max-width: 1023px) {
            width: 24em;
            [dir='ltr'] & {
                left: calc(50% - 13em);
            }
            [dir='rtl'] & {
                right:calc(50% - 13em);
            }
        }
        @media screen and (max-width: 767px) {
            width: 22em;
            [dir='ltr'] & {
                left: calc(50% - 11em);
            }
            [dir='rtl'] & {
                right:calc(50% - 11em);
            }
        }

        .tag {
            padding: 0.5em;
            height: 1.6em;
            opacity: .7;
            -webkit-box-shadow: 0 1px 1px rgba(10, 10, 10, 0.2);
            box-shadow: 0 1px 1px rgba(10, 10, 10, 0.2);
            &.control-list:hover {
                text-decoration: none;
            }
            &.control-list:not(:first-child) {
                [dir='ltr'] & {
                    margin-left: .5em;
                }
                [dir='rtl'] & {
                    margin-right: .5em;
                }
            }
        }
        .route-controls {
            position: absolute;
            margin-top: .15em;
            [dir='ltr'] & {
                right: 1em;
            }
            [dir='rtl'] & {
                left: 1em;
            }
            .route-control {
                z-index: 4;
                opacity: 0.8;
                cursor: pointer;
                [dir='ltr'] & {
                    margin-right: 0.2em;
                }
                [dir='rtl'] & {
                    margin-left: 0.2em;
                }
                &:hover {
                    opacity: 1;
                }
            }
        }
    }

</style>
