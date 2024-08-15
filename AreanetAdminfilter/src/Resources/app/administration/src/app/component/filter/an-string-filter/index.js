import template from './an-string-filter.html.twig';
const { Component, Mixin } = Shopware;
const {Criteria} = Shopware.Data;

Component.register('an-string-filter', {
    template,

    props: {
        filter: {
            type: Object,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
        },
    },

    computed: {
        value() {
            return this.filter.value;
        },
    },

    methods: {
        changeValue(newValue) {
            if (!newValue) {
                this.resetFilter();
                return;
            }

            const filterCriteria = [
                Criteria.multi(
                    'OR',
                    [
                        Criteria.contains(this.filter.property, newValue),
                        Criteria.contains("children."+this.filter.property, newValue),
                    ]
                )
            ];

            this.$emit('filter-update', this.filter.name, filterCriteria, newValue);
        },

        resetFilter() {
            this.$emit('filter-reset', this.filter.name);
        },
    },
});